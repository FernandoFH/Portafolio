// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
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
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['github', 'website']),
    url: z.string().url(),
    tech: z.array(z.string()),
  }),
});

export const collections = { posts, projects };
