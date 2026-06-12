import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['draft', 'published']),
    platform: z.enum(['medium', 'devto', 'substack']),
    publication: z.enum([
      'sre', 'cpp', 'tensorflow', 'golang', 'quantum', 'ai', 'bitcoin',
      'papers',
      'ceiba', 'stuff', 'coporo',
    ]),
    tags: z.array(z.string()),
    description: z.string(),
    canonicalUrl: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['github', 'website']),
    url: z.string().url(),
    tech: z.array(z.string()),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()),
    url: z.string().url().optional(),
    type: z.enum(['paper', 'article', 'note', 'thesis']),
    status: z.enum(['draft', 'published']),
  }),
});

export const collections = { posts, projects, research };
