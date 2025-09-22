import { z as zod } from 'astro/zod';
import { defineCollection } from 'astro:content';

// Enhanced blog collection with categories, tags, and SEO support
const blog = defineCollection({
  type: 'content',
  // Include both .md and .mdx files
  glob: '**/*.{md,mdx}',
  schema: zod.object({
    title: zod.string(),
    date: zod.coerce.date(), // More flexible date parsing
    excerpt: zod.string(),
    
    // Content organization
    category: zod.string().optional(),
    tags: zod.array(zod.string()).optional(),
    
    // SEO and metadata
    image: zod.string().optional(),
    imageAlt: zod.string().optional(),
    author: zod.string().default('Bruce Denham'),
    
    // Publishing control
    draft: zod.boolean().default(false),
    featured: zod.boolean().default(false),
    
    // SEO metadata
    seo: zod.object({
      title: zod.string().optional(),
      description: zod.string().optional(),
      canonical: zod.string().url().optional(),
      noindex: zod.boolean().optional(),
      ogImage: zod.string().optional(),
    }).optional(),
  }),
});

export const collections = { blog };
