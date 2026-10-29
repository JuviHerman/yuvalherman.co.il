import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'Yuval Herman: writing',
    description: 'Notes on credit risk, model evaluation, causal inference and applied AI.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/writing/${p.id}/`,
    })),
  });
}
