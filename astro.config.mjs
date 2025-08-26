import dotenv from 'dotenv';
dotenv.config();
import { defineConfig, passthroughImageService } from 'astro/config';
// import vercel from '@astrojs/vercel';  // Removed - using pure static deployment
import mdx from '@astrojs/mdx';
import { remarkBasePathLinks } from './src/plugins/remarkBasePathLinks';

// https://astro.build/config
export default defineConfig({
    // Pure static site deployment (no adapter needed)
    output: 'static',
    // adapter removed - using pure static files for Vercel

    // Site configuration - GitHub Pages compatible
    site: process.env.GITHUB_PAGES
        ? 'https://bdenham.github.io'
        : 'https://bruuce.com',
    base: process.env.GITHUB_PAGES
        ? '/bruuce/'
        : undefined,
    trailingSlash: 'ignore',
    outDir: './dist',

    // SIMPLE FIX: Single CSS bundle to eliminate render-blocking waterfall
    vite: {
        build: {
            cssCodeSplit: false, // Force single CSS file instead of 5 separate files
        },
    },

    // Image optimization
    image: {
        service: passthroughImageService(),
    },

    // Markdown configuration
    markdown: {
        remarkPlugins: [remarkBasePathLinks],
        syntaxHighlight: {
            type: 'shiki',
            excludeLangs: ['mermaid'],
            themes: {
                light: 'github-light',
                dark: 'github-dark'
            }
        },
    },

    // Integrations
    integrations: [
        mdx(), // MDX support for blog content
    ],
});