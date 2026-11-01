# yuvalherman.co.il

Personal website of Yuval Herman, built with [Astro](https://astro.build) and deployed to GitHub Pages on every push to `main`.

## Editing

- Profile, jobs, skills, projects: `src/data.ts`
- Talking points: edit `talks` in `src/data.ts`
- CV PDF: `public/Yuval_Herman_CV.pdf`. Regenerate it by printing `/cv/` from Chrome while `npm run preview` is running.

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
```
