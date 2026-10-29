import { getCollection } from 'astro:content';

// Drafts show up in `npm run dev` but never in the deployed site.
export async function getPosts() {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
