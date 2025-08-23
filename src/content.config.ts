import { z as zod } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

// Blog collection for our custom Astro pages
const blog = defineCollection({
  type: 'content',
  schema: zod.object({
    title: zod.string(),
    date: zod.date(),
    excerpt: zod.string(),
  }),
});

// Minimal docs collection to satisfy Starlight (even though we use custom pages)
const docs = defineCollection({
  schema: docsSchema(),
});

export const collections = { blog, docs };
