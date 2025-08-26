import dotenv from 'dotenv';
dotenv.config();
import { defineConfig, passthroughImageService } from 'astro/config';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import { remarkBasePathLinks } from './src/plugins/remarkBasePathLinks';

// https://astro.build/config
export default defineConfig({
    // Vercel adapter for optimal performance
    output: 'static',
    adapter: vercel({
        webAnalytics: { enabled: false }, // Disable to fix MIME type issues
        speedInsights: { enabled: false }, // Disable to prevent console errors
        isr: true, // Enable incremental static regeneration for better performance
    }),

    // Site configuration - GitHub Pages compatible
    site: process.env.GITHUB_PAGES
        ? 'https://bdenham.github.io'
        : 'https://bruuce.com',
    base: process.env.GITHUB_PAGES
        ? '/bruuce/'
        : undefined,
    trailingSlash: 'ignore',
    outDir: './dist',

    // TRUE 0.9s Speed Index optimizations - aggressive CSS inlining
    build: {
        inlineStylesheets: 'auto', // Inline critical CSS to eliminate render-blocking
        assets: '_astro',
        assetsInlineLimit: 4096, // Larger inlining threshold
        cssCodeSplit: false, // Single CSS bundle to reduce requests
        rollupOptions: {
            output: {
                entryFileNames: '_astro/[name].[hash].js',
                chunkFileNames: '_astro/[name].[hash].js',
                assetFileNames: '_astro/[name].[hash][extname]'
            }
        }
    },

    vite: {
        build: {
            cssCodeSplit: false, // Single CSS bundle for 0.9s Speed Index
            assetsInlineLimit: 4096, // Aggressive asset inlining
            target: 'es2022',
            cssMinify: 'esbuild', // Fast CSS minification
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