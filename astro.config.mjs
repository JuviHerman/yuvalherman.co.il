import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.yuvalherman.co.il',
  integrations: [sitemap()],
  // About lives on the home page now.
  redirects: {
    '/about': '/#about',
    '/writing': '/#topics',
    '/writing/roc-curve-as-a-lending-decision': '/#topics',
    '/rss.xml': '/',
  },
});
