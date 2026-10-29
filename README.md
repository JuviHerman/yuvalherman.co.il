# yuvalherman.co.il

Personal website of Yuval Herman, built with [Astro](https://astro.build) and deployed to GitHub Pages on every push to `main`.

## Editing

- Profile, jobs, skills, projects: `src/data.ts`
- Articles: add a Markdown file to `src/content/writing/` (set `draft: true` to keep it off the live site)
- CV PDF: `public/Yuval_Herman_CV.pdf`. Regenerate it by printing `/cv/` from Chrome while `npm run preview` is running.

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
```
