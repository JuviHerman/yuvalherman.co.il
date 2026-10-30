// Fetches every game for the chess.com account and writes a compact snapshot to
// src/data/chess-games.json. No login needed: the chess.com published-data API is public.
// Run: node scripts/update-chess.mjs
import { writeFileSync } from 'node:fs';

const USER = 'juvinherm';
const HEADERS = { 'User-Agent': 'yuvalherman.co.il chess stats (yuvalherm@gmail.com)' };
const DRAWS = new Set(['agreed', 'repetition', 'stalemate', 'insufficient', '50move', 'timevsinsufficient']);

async function get(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}

const { archives } = await get(`https://api.chess.com/pub/player/${USER}/games/archives`);
const games = [];
for (const url of archives) {
  for (const g of (await get(url)).games) {
    if (g.rules !== 'chess' || !g.rated) continue;
    const me = g.white.username.toLowerCase() === USER ? g.white : g.black;
    games.push({
      t: g.end_time,
      s: me.result === 'win' ? 1 : DRAWS.has(me.result) ? 0.5 : 0,
      r: me.rating,
      tc: g.time_class,
    });
  }
}
games.sort((a, b) => a.t - b.t);

writeFileSync(
  new URL('../src/data/chess-games.json', import.meta.url),
  JSON.stringify({ user: USER, fetchedAt: new Date().toISOString(), games }, null, 0) + '\n',
);
console.log(`Saved ${games.length} rated games for ${USER}.`);
