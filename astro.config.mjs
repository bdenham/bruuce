import dotenv from 'dotenv';
dotenv.config();
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import { remarkBasePathLinks } from './src/plugins/remarkBasePathLinks';
import starlightHeadingBadges from 'starlight-heading-badges';
import starlightBlog from 'starlight-blog'

// https://astro.build/config
async function config() {
    const basePath = process.env.VITE_GITHUB_BASE_PATH || '/sanity-check/';

    return defineConfig({
        image: {
            service: passthroughImageService(),
        },
        site: 'https://bdenham.github.io/sanity-check',
        base: basePath,
        markdown: {
            remarkPlugins: [remarkBasePathLinks],
            syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
        },
        trailingSlash: 'ignore',
        outDir: './dist',
        build: {
            assets: '_astro',
            assetsInlineLimit: 0, // Ensure assets are hashed and externalized
            cssCodeSplit: true, // Enable CSS code splitting for better caching
            rollupOptions: {
                output: {
                    // Ensure consistent hashing for better caching
                    entryFileNames: '_astro/[name].[hash].js',
                    chunkFileNames: '_astro/[name].[hash].js',
                    assetFileNames: '_astro/[name].[hash][extname]'
                }
            }
        },

        integrations: [
            starlight({
                editLink: {
                    baseUrl: 'https://github.com/bdenham/sanity-check/edit/main/'
                },
                expressiveCode: {
                    themes: ['github-light', 'github-dark'],
                    styleOverrides: {
                        frames: {
                            frameBoxShadowCssValue: 'none',
                        },
                    },
                    defaultProps: {
                        // Disable window frames for all code blocks
                        frame: 'none',
                    },
                },
                title: 'Sanity Check',
                favicon: 'favicon.svg',
                lastUpdated: true,
                sidebar: [
                    {
                        label: 'Home',
                        link: `${basePath}/`
                    },
                    {
                        label: 'All Posts',
                        link: `${basePath}/blog/`
                    },
                    {
                        label: 'About Me',
                        link: `${basePath}/about/`
                    },
                    {
                        label: 'My Projects',
                        link: `${basePath}/projects/`
                    },
                ],
                plugins: [
                    starlightBlog({
                        title: 'Blog',
                        navigation: 'header-start',
                        metrics: {
                            readingTime: true,
                            words: 'total',
                        },
                    }),
                    starlightHeadingBadges(),
                    starlightLinksValidator({
                        errorOnFallbackPages: false,
                        errorOnInconsistentLocale: true,
                        exclude: [
                            // All possible path variations for GitHub Pages
                            '/sanity-check/blog/',
                            '/sanity-check/about/',
                            '/sanity-check/projects/',
                            '/sanity-check/work/',
                            '/sanity-check/resume/',
                            '/sanity-check/blog/**',
                            '/sanity-check/',
                            // Root paths for custom domain
                            '/blog/',
                            '/about/',
                            '/projects/',
                            '/work/',
                            '/resume/',
                            '/blog/**',
                            '/',
                            // Dynamic basePath versions
                            `${basePath}blog/`,
                            `${basePath}about/`,
                            `${basePath}projects/`,
                            `${basePath}work/`,
                            `${basePath}resume/`,
                            `${basePath}blog/**`,
                            basePath,
                        ]
                    }),
                    starlightImageZoom({
                        showCaptions: false
                    })
                ],
                // Component overrides (most components now use custom architecture)
                components: {
                    // Only keeping components that still exist
                    CardGrid: './src/components/CardGrid.astro',
                },
                customCss: [
                    './src/styles/reset.css',
                    './src/styles/theme.css',
                ],
                // logo: {
                //     src: './src/assets/sitelogo.svg',
                //     replacesTitle: false
                // },
                social: [
                    { icon: 'github', label: 'GitHub', href: 'https://github.com/bdenham' },
                ],
                head: [
                    // Font preloads for better LCP performance (with GitHub base path)
                    // Preload 400 weight first with high priority - used by h1 LCP element
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'preload',
                            href: `${basePath}/fonts/adobe-clean-400.woff2`,
                            as: 'font',
                            type: 'font/woff2',
                            crossorigin: '',
                            fetchpriority: 'high'
                        }
                    },
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'preload',
                            href: `${basePath}/fonts/adobe-clean-300.woff2`,
                            as: 'font',
                            type: 'font/woff2',
                            crossorigin: ''
                        }
                    },
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'preload',
                            href: `${basePath}/fonts/adobe-clean-700.woff2`,
                            as: 'font',
                            type: 'font/woff2',
                            crossorigin: ''
                        }
                    },
                ],
            })
        ]
    });
}

export default config();
