import { z as zod } from 'astro/zod';
import { defineCollection } from 'astro:content';

// Blog collection for our custom Astro pages
const blog = defineCollection({
  type: 'content',
  // Include both .md and .mdx files
  glob: '**/*.{md,mdx}',
  schema: zod.object({
    title: zod.string(),
    date: zod.coerce.date(), // More flexible date parsing
    excerpt: zod.string(),
  }),
});

export const collections = { blog };
