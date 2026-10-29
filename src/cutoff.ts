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

export const nBad = applicants.filter((a) => a.bad).length;
export const nGood = applicants.length - nBad;

// ROC points from strictest to most lenient cutoff.
export const roc: [number, number][] = (() => {
  const pts: [number, number][] = [[0, 0]];
  let tp = 0, fp = 0;
  for (const a of [...applicants].sort((x, y) => y.s - x.s)) {
    a.bad ? tp++ : fp++;
    pts.push([fp / nGood, tp / nBad]);
  }
  return pts;
})();

export const auc = roc.reduce((sum, [f, t], i) => (i ? sum + (f - roc[i - 1][0]) * (t + roc[i - 1][1]) / 2 : 0), 0);

// Everyone scoring at or above the cutoff is declined.
export function rates(cut: number) {
  let tp = 0, fp = 0;
  for (const a of applicants) if (a.s >= cut) a.bad ? tp++ : fp++;
  return {
    missedDefaults: nBad - tp,
    declinedGood: fp,
    tpr: tp / nBad,
    fpr: fp / nGood,
    approved: (applicants.length - tp - fp) / applicants.length,
  };
}

export const MIN_CUT = 0.05;
export const MAX_CUT = 0.95;
export const cutoffs = Array.from({ length: 91 }, (_, i) => Math.round((MIN_CUT + i * 0.01) * 100) / 100);

export function cost(cut: number, lossPerDefault: number, profitPerGood: number) {
  const r = rates(cut);
  return r.missedDefaults * lossPerDefault + r.declinedGood * profitPerGood;
}

export function costCurve(lossPerDefault: number, profitPerGood: number) {
  const values = cutoffs.map((c) => cost(c, lossPerDefault, profitPerGood));
  let bestIndex = 0;
  values.forEach((v, i) => { if (v < values[bestIndex]) bestIndex = i; });
  return { values, best: cutoffs[bestIndex], bestCost: values[bestIndex], max: Math.max(...values, 1) };
}

// Vertical position on the cost chart, scaled from just under the minimum so the dip is visible.
export function costY(v: number, curve: { bestCost: number; max: number }, top: number, height: number) {
  const lo = curve.bestCost * 0.9;
  return top + height * (1 - (v - lo) / Math.max(curve.max - lo, 1));
}

export const money = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;
export const pct = (v: number) => `${Math.round(v * 100)}%`;
