import dotenv from 'dotenv';
dotenv.config();
import { defineConfig, passthroughImageService } from 'astro/config';
// import vercel from '@astrojs/vercel';  // Removed - using pure static deployment
import mdx from '@astrojs/mdx';
import { remarkBasePathLinks } from './src/plugins/remarkBasePathLinks';

const siteUrl = process.env.GITHUB_PAGES ? 'https://bdenham.github.io' : 'https://bruuce.com';

export default defineConfig({
    // Pure static site deployment (no adapter needed)
    output: 'static',
    // adapter removed - using pure static files for Vercel

    // Site configuration - GitHub Pages compatible
    site: siteUrl,
    base: undefined, // Always use root path for bruuce.com
    trailingSlash: 'always',
    outDir: './dist',

    // Performance: Inline all CSS for fastest initial render
    build: {
        inlineStylesheets: 'always',
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