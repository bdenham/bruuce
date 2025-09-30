// @ts-nocheck
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import { remarkBasePathLinks } from './src/plugins/remarkBasePathLinks';

export default defineConfig({
    output: 'static',
    site: 'https://bruuce.com',
    trailingSlash: 'always',

    build: {
        inlineStylesheets: 'always',
    },

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