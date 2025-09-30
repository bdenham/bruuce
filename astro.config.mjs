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
    base: undefined, // Always use root path for bruuce.com
    trailingSlash: 'always',
    outDir: './dist',

    // Performance: Inline all CSS to eliminate render-blocking resources
    // Trade-off: Larger HTML but faster initial render (no CSS network requests)
    build: {
        inlineStylesheets: 'always',
    },
    vite: {
        css: {
            devSourcemap: true, // Enable CSS source maps in development
        },
        build: {
            cssCodeSplit: false, // Single CSS bundle
            sourcemap: true, // Enable source maps for production
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