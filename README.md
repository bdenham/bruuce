# Personal Blog Starter

A beautiful and modern personal blog built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/). This starter includes all the powerful components from the Starlight ecosystem while providing a clean foundation for your personal blog.

## Features

✨ **Modern Stack**: Built with Astro and Starlight for optimal performance
🎨 **Beautiful Design**: Clean, responsive design with dark/light mode support
📝 **MDX Support**: Write content with Markdown and JSX components
🔧 **All Starlight Components**: Access to the full Starlight component library
⚡ **Fast & SEO-friendly**: Optimized for performance and search engines
📱 **Mobile-first**: Responsive design that works on all devices

## Quick Start

### Prerequisites

- Node.js 20.13.1 or later
- pnpm 9.x or later (install from [pnpm.io](https://pnpm.io/installation))

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

3. Open [http://localhost:4321](http://localhost:4321) in your browser

## Content Structure

Your blog content is organized in `src/content/docs/`:

```
src/content/docs/
├── index.mdx          # Homepage
├── blog/              # Blog posts
│   └── index.mdx      # Blog index
├── about/             # About section
│   └── index.mdx      # About page
└── projects/          # Projects showcase
    └── index.mdx      # Projects page
```

## Adding Content

### Writing Blog Posts

Create new blog posts in `src/content/docs/blog/`. Each post should have frontmatter:

```markdown
---
title: Your Post Title
description: A brief description of your post
date: 2024-01-01
tags: [tag1, tag2]
---

Your content here...
```

### Organizing Content

- **Blog posts**: Add to `src/content/docs/blog/`
- **About content**: Update `src/content/docs/about/index.mdx`
- **Projects**: Add to `src/content/docs/projects/`
- **Images**: Place in `public/images/`

## Customization

### Site Configuration

Update `astro.config.mjs` to customize:

- Site title and description
- Social links
- Edit links to your repository

### Personal Information

1. Update `package.json` with your details
2. Modify the navigation in `astro.config.mjs`
3. Replace social links and repository URLs
4. Update the site logo in `src/assets/sitelogo.svg`

### Styling

The project uses Starlight's built-in styling with custom CSS in:

- `src/styles/` - Custom styles
- `src/components/overrides/` - Component overrides

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Maintenance
pnpm lint             # Run linting and formatting
pnpm clean            # Clean build artifacts and reinstall
```

## Deployment

This blog can be deployed to any static hosting service:

- **Netlify**: Connect your repository for automatic deployments
- **Vercel**: Import your project for seamless deployment
- **GitHub Pages**: Use the built-in GitHub Actions workflow
- **Cloudflare Pages**: Deploy directly from your repository

## Components Available

Thanks to Starlight, you have access to powerful components:

- **Cards and Grids**: Organize content beautifully
- **Code Blocks**: Syntax highlighted code with copy buttons
- **Callouts**: Highlight important information
- **Tabs**: Organize related content
- **Images**: Optimized image handling with zoom
- **Links**: Smart internal and external linking

## Need Help?

- [Astro Documentation](https://docs.astro.build/)
- [Starlight Documentation](https://starlight.astro.build/)
- [MDX Documentation](https://mdxjs.com/docs/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy blogging! 🚀
Test deployment comment
Test notification routing
