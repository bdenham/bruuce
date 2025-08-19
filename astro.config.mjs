import dotenv from 'dotenv';
dotenv.config();
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightImageZoom from 'starlight-image-zoom';
import { remarkBasePathLinks } from './src/plugins/remarkBasePathLinks';
import starlightHeadingBadges from 'starlight-heading-badges';

// https://astro.build/config
async function config() {
    return defineConfig({
        image: {
            service: passthroughImageService(),
        },
        site: 'https://bdenham.github.io/sanity-check',
        base: process.env.VITE_GITHUB_BASE_PATH || '',
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
                        link: '/'
                    },
                    {
                        label: 'Blog Posts',
                        link: '/blog/'
                    },
                    {
                        label: 'About Me',
                        link: '/about/'
                    },
                    {
                        label: 'My Projects',
                        link: '/projects/'
                    },
                ],
                plugins: [
                    starlightHeadingBadges(),
                    starlightLinksValidator({
                        errorOnFallbackPages: false,
                        errorOnInconsistentLocale: true
                    }),
                    starlightImageZoom({
                        showCaptions: false
                    })
                ],
                // Component overrides
                components: {
                    CallToAction: './src/components/overrides/CallToAction.astro',
                    // Footer: './src/components/overrides/Footer.astro',
                    Icon: './src/components/overrides/Icon.astro',
                    // Header: './src/components/overrides/Header.astro',
                    // Hero: './src/components/overrides/Hero.astro',
                    // PageTitle: './src/components/overrides/PageTitle.astro',
                    // SiteTitle: './src/components/overrides/SiteTitle.astro',
                    // SocialIcons: './src/components/overrides/SocialIcons.astro',
                    LinkCard: './src/components/LinkCard.astro',
                    ContentPanel: './src/components/overrides/ContentPanel.astro',
                    CardGrid: './src/components/CardGrid.astro',
                    Pagination: './src/components/overrides/Pagination.astro',
                    PageFrame: './src/components/overrides/PageFrame.astro',
                    PageSidebar: './src/components/overrides/PageSidebar.astro',
                },
                customCss: [
                    './src/styles/reset.css',
                    './src/fonts/font-face.css',
                    './src/styles/colors.css',
                    './src/styles/badge.css',
                    './src/styles/asides.css',
                    './src/styles/layout.css',
                    './src/styles/text.css',
                    './src/styles/custom.css',
                ],
                // logo: {
                //     src: './src/assets/sitelogo.svg',
                //     replacesTitle: false
                // },
                social: [
                    { icon: 'github', label: 'GitHub', href: 'https://github.com/bdenham' },
                ],
                head: [
                    // Search Highlighting Scripts (external files)
                    {
                        tag: 'script',
                        attrs: { src: `${process.env.VITE_GITHUB_BASE_PATH || ''}/scripts/search-highlighter.js` }
                    },
                    {
                        tag: 'script',
                        attrs: { src: `${process.env.VITE_GITHUB_BASE_PATH || ''}/scripts/search-click-handler.js` }
                    },
                ],
            })
        ]
    });
}

export default config();
