// Two-armed bandit over my chess games: "Mac, at night" vs "Phone, by day".
// Each arm's win rate gets a Beta posterior (uniform prior, draws count half).
// The recommendation is Bayes-UCB: play the arm whose 90th percentile is higher.
import snapshot from './data/chess-games.json';
import synthetic from './data/chess-synthetic.json';

export const NIGHT_FROM = 21; // 21:00 local time onwards counts as night (Mac)
export const NIGHT_UNTIL = 6; // until 05:59
export const QUANTILE = 0.9;
const TZ = 'Asia/Jerusalem';

export type ArmId = 'night' | 'day';
export const ARMS: Record<ArmId, { label: string; short: string; hours: string }> = {
  night: { label: 'Mac, at night', short: 'Mac', hours: '21:00–06:00' },
  day: { label: 'Phone, by day', short: 'Phone', hours: '06:00–21:00' },
};

// ---- Beta distribution helpers ----

function lgamma(x: number): number {
  const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
  x -= 1;
  let a = 0.99999999999980993;
  const t = x + 7.5;
  for (let i = 0; i < 8; i++) a += g[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
const lbeta = (a: number, b: number) => lgamma(a) + lgamma(b) - lgamma(a + b);

export function betaPdf(x: number, a: number, b: number) {
  if (x <= 0 || x >= 1) return 0;
  return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - lbeta(a, b));
}

// Continued fraction for the regularized incomplete beta (Numerical Recipes).
function betacf(x: number, a: number, b: number) {
  const EPS = 1e-12, TINY = 1e-300;
  let c = 1, d = 1 - ((a + b) * x) / (a + 1);
  d = 1 / (Math.abs(d) < TINY ? TINY : d);
  let h = d;
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));
    d = 1 + aa * d; d = 1 / (Math.abs(d) < TINY ? TINY : d);
    c = 1 + aa / c; c = Math.abs(c) < TINY ? TINY : c;
    h *= d * c;
    aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));
    d = 1 + aa * d; d = 1 / (Math.abs(d) < TINY ? TINY : d);
    c = 1 + aa / c; c = Math.abs(c) < TINY ? TINY : c;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return h;
}

export function betaCdf(x: number, a: number, b: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const front = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - lbeta(a, b));
  return x < (a + 1) / (a + b + 2) ? (front * betacf(x, a, b)) / a : 1 - (front * betacf(1 - x, b, a)) / b;
}

export function betaQuantile(p: number, a: number, b: number) {
  let lo = 0, hi = 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    betaCdf(mid, a, b) < p ? (lo = mid) : (hi = mid);
  }
  return (lo + hi) / 2;
}

// ---- Arms and posteriors ----

const parts = (t: number) => {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' });
  const o = Object.fromEntries(f.formatToParts(new Date(t * 1000)).map((p) => [p.type, p.value]));
  return { date: `${o.year}-${o.month}-${o.day}`, hour: Number(o.hour) };
};

export const armOf = (hour: number): ArmId => (hour >= NIGHT_FROM || hour < NIGHT_UNTIL ? 'night' : 'day');

export type Posterior = { n: number; wins: number; draws: number; losses: number; a: number; b: number; mean: number; ucb: number };

function posterior(scores: number[]): Posterior {
  const wins = scores.filter((s) => s === 1).length;
  const draws = scores.filter((s) => s === 0.5).length;
  const losses = scores.length - wins - draws;
  const a = 1 + wins + draws / 2;
  const b = 1 + losses + draws / 2;
  return { n: scores.length, wins, draws, losses, a, b, mean: a / (a + b), ucb: betaQuantile(QUANTILE, a, b) };
}

export type Decision = { explore: ArmId; exploit: ArmId; agree: boolean };
const decide = (p: Record<ArmId, Posterior>): Decision => {
  const explore: ArmId = p.night.ucb >= p.day.ucb ? 'night' : 'day';
  const exploit: ArmId = p.night.mean >= p.day.mean ? 'night' : 'day';
  return { explore, exploit, agree: explore === exploit };
};

// Simulated warm-up history (scripts/make-synthetic-chess.mjs) always precedes the live games.
const liveStart = Math.min(...snapshot.games.map((g) => g.t));
const merged = [
  ...synthetic.games.filter((g) => g.t < liveStart).map((g) => ({ ...g, sim: true })),
  ...snapshot.games.map((g) => ({ ...g, sim: false })),
].sort((a, b) => a.t - b.t);

export const games = merged.map((g) => ({ ...g, ...parts(g.t), arm: armOf(parts(g.t).hour) }));

const byArm = (list: typeof games) => ({
  night: posterior(list.filter((g) => g.arm === 'night').map((g) => g.s)),
  day: posterior(list.filter((g) => g.arm === 'day').map((g) => g.s)),
});

export const current = byArm(games);
export const decision = decide(current);
export const rating = games.at(-1)?.r ?? null;
export const fetchedAt = snapshot.fetchedAt;
export const user = snapshot.user;

// ---- Probability of being best, by Monte Carlo ----

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Marsaglia-Tsang gamma sampler (shape >= 1, which every posterior here is).
function gamma(k: number, rand: () => number) {
  const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x: number, v: number;
    do {
      x = Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = rand();
    if (Math.log(u) < 0.5 * x * x + d - d * v + d * Math.log(v)) return d * v;
  }
}
const betaDraw = (a: number, b: number, rand: () => number) => {
  const x = gamma(a, rand);
  return x / (x + gamma(b, rand));
};

export const DRAWS = 1000;
export const DECIDE_AT = 0.95;

// Share of DRAWS rounds in which the Mac's sampled win rate beats the phone's.
function probNightBest(p: Record<ArmId, Posterior>, seed: number) {
  const rand = mulberry32(seed);
  let wins = 0;
  for (let i = 0; i < DRAWS; i++) if (betaDraw(p.night.a, p.night.b, rand) > betaDraw(p.day.a, p.day.b, rand)) wins++;
  return wins / DRAWS;
}

// Posterior state at the end of each day that had games.
export const timeline = [...new Set(games.map((g) => g.date))].map((date, i) => {
  const p = byArm(games.filter((g) => g.date <= date));
  const night = probNightBest(p, 1000 + i);
  return { date, ...p, decision: decide(p), best: { night, day: 1 - night } };
});

// The first day either setup reached DECIDE_AT: the official call. Play continues on both.
export const declared = (() => {
  const i = timeline.findIndex((d) => Math.max(d.best.night, d.best.day) >= DECIDE_AT);
  if (i < 0) return null;
  const d = timeline[i];
  return { index: i, date: d.date, arm: (d.best.night >= d.best.day ? 'night' : 'day') as ArmId };
})();

// Sampled density curve for plotting, as [x, y] pairs on a 0..1 grid.
export const densityPoints = (a: number, b: number, steps = 200) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const x = i / steps;
    return [x, betaPdf(Math.min(Math.max(x, 1e-4), 1 - 1e-4), a, b)] as [number, number];
  });

export const pct = (v: number) => `${Math.round(v * 100)}%`;
