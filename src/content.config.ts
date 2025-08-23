import { z as zod } from 'astro/zod';
import { defineCollection } from 'astro:content';

// Blog collection for our custom Astro pages
const blog = defineCollection({
  type: 'content',
  schema: zod.object({
    title: zod.string(),
    date: zod.date(),
    excerpt: zod.string(),
  }),
});

export const collections = { blog };
