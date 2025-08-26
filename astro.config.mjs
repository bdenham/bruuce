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
        webAnalytics: { enabled: true },
        speedInsights: { enabled: true },
    }),

    // Site configuration
    site: 'https://bruuce.com',
    trailingSlash: 'ignore',
    outDir: './dist',

    // Performance optimizations
    build: {
        inlineStylesheets: 'auto',
        assets: '_astro',
        assetsInlineLimit: 2048,
        cssCodeSplit: true,
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
            cssCodeSplit: true,
            assetsInlineLimit: 2048,
            target: 'es2022',
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