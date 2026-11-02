# yuvalherman.co.il

Personal site of Yuval Herman. Astro 5 + @astrojs/sitemap, static, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main` (plus a daily cron that refreshes chess games first).

## Commands

```sh
npm install          # node_modules is not kept (folder syncs to OneDrive); install before building
npm run dev          # http://localhost:4321
npx astro build && npx astro preview --port 4329
```

After a push, watch the deploy with `gh run watch <id> --exit-status`, then curl https://www.yuvalherman.co.il to verify. Clean up `node_modules`, `dist`, `.astro` afterwards.

## Where things live

- `src/data.ts`: all content. `profile`, `domains`, `jobs`, `skills` (CV), `talks` (Topics cards), `skillAreas` (project cards; wrap verbs in `*asterisks*` to highlight them).
- `src/pages/index.astro`: one-page home. Sections: hero, #projects, #experience, #about, #topics, #contact. Nav in `src/layouts/Base.astro`.
- `src/components/SkillMap.astro`: tabbed project-card grid; the chess card expands in place (`#chess`).
- `src/chess.ts` + `ChessAnalysis/ChessDensity/ChessMonitor.astro`: the chess bandit (Beta posteriors, Bayes-UCB at the 90th percentile, P(best) from 1,000 draws a day, winner declared at 95%).
- `scripts/update-chess.mjs`: fetches games for chess.com user `juvinherm` into `src/data/chess-games.json` (run by the cron).
- `src/pages/cv.astro` + `public/Yuval_Herman_CV.pdf`: printable CV.
- `astro.config.mjs`: redirects for removed pages (/about, /writing, /rss.xml).

## Style

- Theme tokens in `src/styles/global.css` (Fraunces headings, Commissioner UI, periwinkle accent); always check light and dark.
- Cards: surface background, 1px rule border, 14px radius. Keep copy short and plain; no em-dash-heavy prose.
- Screenshots: headless Chrome against `astro preview`; for a section, put a temporary same-origin iframe page in `dist/` and remove it after.

## Rules

- No phone number on the site or CV.
- Do not add a custom domain to `JuviHerman/juviherman.github.io` (it serves The Global Min app links).
- Never sign in to Apple ID or the DNS registrar (LiveDNS) on Yuval's behalf.
- Commit and push to `main` only when asked; that deploys the site.
- See `CLAUDE.local.md` (not in git) for private content rules.
