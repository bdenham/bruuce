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
    // No base path for clean URLs, but we'll handle assets separately
    const basePath = process.env.VITE_GITHUB_BASE_PATH || '';

    return defineConfig({
        // Performance optimizations
        build: {
            inlineStylesheets: 'auto', // Inline small CSS files
            assetsPrefix: basePath, // Proper asset prefixing
        },
        vite: {
            build: {
                cssCodeSplit: true, // Split CSS by route
                assetsInlineLimit: 2048, // Inline assets smaller than 2KB
                target: 'es2022', // Modern browser optimization with top-level await support
            },
        },
        image: {
            service: passthroughImageService(),
        },
        site: 'https://bruuce.com',
        base: basePath,
        markdown: {
            remarkPlugins: [remarkBasePathLinks],
            syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
        },
        trailingSlash: 'ignore',
        outDir: './dist',

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
                            // Root paths (current structure)
                            `/blog/`,
                            `/about/`,
                            `/projects/`,
                            `/work/`,
                            `/resume/`,
                            `/blog/**`,
                            `/`,
                            // Legacy paths with base prefix (for GitHub Actions compatibility)
                            `/sanity-check/blog/`,
                            `/sanity-check/about/`,
                            `/sanity-check/projects/`,
                            `/sanity-check/work/`,
                            `/sanity-check/resume/`,
                            `/sanity-check/blog/**`,
                            `/sanity-check/`,
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
                    // Minimal resource hints - only critical fonts
                    // Critical font preloading - only the 2 essential fonts
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'preload',
                            href: `${basePath}/fonts/adobe-clean-400.woff2`,
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
                    // Bold weight (700) loads on demand for better initial performance
                    // Search scripts now loaded lazily when search is used
                ],
            })
        ]
    });
}

export default config();
