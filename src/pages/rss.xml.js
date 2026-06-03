import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allPosts = await getCollection('posts');
  const posts = allPosts
    .filter(p => p.data.status === 'published')
    .sort((a, b) => b.data.date - a.data.date);

  return rss({
    title: 'Fernando H — Blog',
    description: 'SRE · Telecom · Financial Research',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
