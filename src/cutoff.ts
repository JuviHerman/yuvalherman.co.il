// Synthetic loan book and threshold economics, shared by the build-time render
// and the browser script so both always agree.

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20200);
const normal = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

// Risk score: higher means more likely to default.
export const applicants = [
  ...Array.from({ length: 400 }, () => ({ s: sigmoid(normal() * 1.05 - 0.75), bad: 0 })),
  ...Array.from({ length: 96 }, () => ({ s: sigmoid(normal() * 1.05 + 0.55), bad: 1 })),
].map((a) => ({ s: Math.round(a.s * 1000) / 1000, bad: a.bad }));

// Positive = flagged as a defaulter and declined (everyone scoring at or above the cutoff).
export function confusion(cut: number) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (const a of applicants) {
    if (a.s >= cut) a.bad ? tp++ : fp++;
    else a.bad ? fn++ : tn++;
  }
  return { tp, fp, fn, tn };
}

export type Values = { tp: number; fp: number; fn: number; tn: number };
// Money per case, signed: gains on the correct calls, costs on the mistakes.
export const DEFAULT_VALUES: Values = { tp: 1000, fp: -250, fn: -1000, tn: 250 };

export function net(cut: number, v: Values) {
  const m = confusion(cut);
  return m.tp * v.tp + m.fp * v.fp + m.fn * v.fn + m.tn * v.tn;
}

export const MIN_CUT = 0.05;
export const MAX_CUT = 0.95;
export const cutoffs = Array.from({ length: 91 }, (_, i) => Math.round((MIN_CUT + i * 0.01) * 100) / 100);
export const cutIndex = (c: number) => Math.round((c - MIN_CUT) * 100);

export function netCurve(v: Values) {
  const values = cutoffs.map((c) => net(c, v));
  return { values, max: Math.max(...values), min: Math.min(...values) };
}

export const money = (v: number) => `${v < 0 ? '−' : ''}$${Math.abs(Math.round(v)).toLocaleString('en-US')}`;
export const signed = (v: number) => (v > 0 ? '+' : '') + money(v);
