# Bruce Denham - Personal Blog & Component Library

A modern personal blog built with [Astro](https://astro.build/) featuring a custom component library and beautiful dark/light theme system.

## 🚀 Features

- **🎨 Custom Theme System**: Beautiful dark/light mode with CSS custom properties
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **⚡ Fast Performance**: Static site generation with Astro
- **🧩 Rich Component Library**: 17 powerful interactive components
- **📝 MDX Content**: Write blog posts with Markdown and custom components
- **🔍 Interactive Elements**: Click-to-zoom images, tooltips, progress tracking
- **♿ Accessible**: Focus states, ARIA labels, keyboard navigation

## 🛠️ Component Library

This blog includes a comprehensive set of **17 custom components** designed for technical writing and documentation:

### 1. 🧩 Tooltip Component

Interactive tooltips with multiple positioning options.

```astro
<!-- Basic tooltip -->
<Tooltip text="This explains the concept in detail">
  <span>Hover me for info!</span>
</Tooltip>

<!-- Positioned tooltip with custom width -->
<Tooltip text="Detailed technical explanation that might be longer" position="top" maxWidth="300px">
  <strong>Technical term</strong>
</Tooltip>
```

**Features**: Top/bottom/left/right positioning, custom width, smooth animations, keyboard accessible

### 2. 📷 Screenshot Component

Click-to-zoom image viewer perfect for showcasing UI and code examples.

```astro
<!-- Basic screenshot with zoom -->
<Screenshot src="/images/demo-ui.png" alt="Demo user interface" />

<!-- With caption and custom sizing -->
<Screenshot
  src="/images/code-example.png"
  alt="Code example screenshot"
  caption="Click to zoom for better readability"
  width="80%"
/>

<!-- Disable zoom if needed -->
<Screenshot src="/images/small-icon.png" alt="App icon" clickToZoom={false} />
```

**Features**: Click-to-zoom modal, loading states, captions, responsive sizing

### 3. 🖼️ IFrame Component

Enhanced embedded content with loading states and error handling.

```astro
<!-- Basic iframe -->
<IFrame src="https://example.com/demo" title="Interactive Demo" />

<!-- Customized sizing and sandbox -->
<IFrame
  src="/local-demo.html"
  title="Local Demo"
  height="600px"
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
/>

<!-- Legacy Storybook integration -->
<IFrame src="button--primary" />
```

**Features**: Loading spinners, error handling, responsive height, Storybook support

### 4. 📊 Diagram Component

Powerful diagram renderer supporting both Mermaid diagrams and regular images with zoom.

```astro
<!-- Mermaid diagram -->
<Diagram
  type="mermaid"
  code="graph TD; A[Start] --> B[Process]; B --> C[End];"
  caption="System workflow diagram"
/>

<!-- Sequence diagram -->
<Diagram
  type="mermaid"
  code="sequenceDiagram
    participant U as User
    participant A as App  
    participant D as Database
    U->>A: Request data
    A->>D: Query database
    D-->>A: Return results
    A-->>U: Display data"
  caption="Data flow sequence"
/>

<!-- Regular image with zoom -->
<Diagram caption="Architecture overview">
  <img src="/images/architecture.svg" alt="System architecture" />
</Diagram>
```

**Features**: Mermaid rendering, theme-aware colors, click-to-zoom, error handling

### 5. ✅ Checklist Component

Interactive progress-tracking checklists with localStorage persistence.

```astro
<!-- Basic checklist -->
<Checklist checklistKey="getting-started">
  <ul>
    <li>[ ] Install Node.js and pnpm</li>
    <li>[ ] Clone the repository</li>
    <li>[x] Set up development environment</li>
    <li>[ ] Run first build</li>
  </ul>
</Checklist>

<!-- Tutorial checklist with custom title -->
<Checklist checklistKey="react-tutorial" title="React Learning Path" showProgress={true}>
  <ul>
    <li>[ ] Learn JSX syntax</li>
    <li>[ ] Understand components</li>
    <li>[ ] Master state management</li>
    <li>[ ] Build a complete app</li>
  </ul>
</Checklist>
```

**Features**: Progress tracking, localStorage persistence, automatic markdown parsing

### 6. 📋 Prerequisites Component

Visual display of required skills and technologies with tooltips.

```astro
<!-- Basic prerequisites -->
<Prerequisites
  prerequisites={{
    html: true,
    css: true,
    javascript: true,
    react: true,
  }}
/>

<!-- Custom title and expanded prerequisites -->
<Prerequisites
  prerequisites={{
    node: true,
    typescript: true,
    docker: true,
    git: true,
  }}
  title="Advanced Requirements"
  showTitle={true}
/>

<!-- Minimal version -->
<Prerequisites prerequisites={{ python: true }} showTitle={false} />
```

**Features**: 20+ technology icons, hover tooltips, responsive layout, emoji-based icons

### 7. 📁 FileTree Component

Interactive file structure display with collapsible directories.

```astro
<!-- Project structure -->
<FileTree title="Project Structure">
  <ul>
    <li>
      src/
      <ul>
        <li>
          components/
          <ul>
            <li>Header.astro</li>
            <li>Footer.astro</li>
            <li>ThemeToggle.astro</li>
          </ul>
        </li>
        <li>
          pages/
          <ul>
            <li>index.astro</li>
            <li>
              blog/
              <ul>
                <li>index.astro</li>
                <li>[slug].astro</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          styles/
          <ul>
            <li>theme.css</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>package.json</li>
    <li>astro.config.mjs</li>
    <li>README.md</li>
  </ul>
</FileTree>

<!-- Simple file list -->
<FileTree title="Configuration Files" showRoot={false}>
  <ul>
    <li>.env.example</li>
    <li>tailwind.config.js</li>
    <li>tsconfig.json</li>
    <li>package.json</li>
  </ul>
</FileTree>
```

**Features**: 30+ file type icons, collapsible directories, tree visualization, monospace font

### 8. 🗂️ CardGrid Component

Responsive grid layout system perfect for showcasing projects or organizing content cards.

```astro
<!-- Basic 2-column grid -->
<CardGrid>
  <div class="card">
    <h3>Project One</h3>
    <p>Description of the first project</p>
  </div>
  <div class="card">
    <h3>Project Two</h3>
    <p>Description of the second project</p>
  </div>
</CardGrid>

<!-- 3-column grid with custom spacing -->
<CardGrid columns={3} gap="2rem">
  <div class="project-card">
    <h3>🚀 Website</h3>
    <p>Modern responsive website</p>
  </div>
  <div class="project-card">
    <h3>📱 Mobile App</h3>
    <p>Cross-platform mobile application</p>
  </div>
  <div class="project-card">
    <h3>🎨 Design System</h3>
    <p>Comprehensive UI components</p>
  </div>
</CardGrid>

<!-- Staggered layout for visual interest -->
<CardGrid stagger={true} minWidth="250px">
  <div class="blog-post">
    <h3>Latest Article</h3>
    <p>Recent thoughts on development</p>
  </div>
  <div class="blog-post">
    <h3>Tutorial Series</h3>
    <p>Step-by-step learning guide</p>
  </div>
</CardGrid>
```

**Features**: Auto-responsive columns, stagger effects, customizable gaps, hover animations

### 9. 📐 Flex Component

Powerful flexible layout system with precise column control and alignment options.

```astro
<!-- Equal 3-column layout -->
<Flex columns={3}>
  <div class="flex-item">Column 1</div>
  <div class="flex-item">Column 2</div>
  <div class="flex-item">Column 3</div>
</Flex>

<!-- Custom alignment and spacing -->
<Flex columns={2} gap="2.5rem" align="center" justify="space-between">
  <div>
    <h3>Feature List</h3>
    <ul>
      <li>Fast performance</li>
      <li>Easy to use</li>
      <li>Fully responsive</li>
    </ul>
  </div>
  <div>
    <h3>Benefits</h3>
    <ul>
      <li>Save time</li>
      <li>Better UX</li>
      <li>Modern design</li>
    </ul>
  </div>
</Flex>

<!-- Vertical layout -->
<Flex direction="column" gap="1rem" align="start">
  <div>Step 1: Setup</div>
  <div>Step 2: Configure</div>
  <div>Step 3: Deploy</div>
</Flex>

<!-- Non-responsive horizontal scroll -->
<Flex columns={4} wrap={false} responsive={false}>
  <div class="flex-item">Card 1</div>
  <div class="flex-item">Card 2</div>
  <div class="flex-item">Card 3</div>
  <div class="flex-item">Card 4</div>
  <div class="flex-item">Card 5</div>
</Flex>
```

**Features**: Flexible columns, custom alignment, responsive behavior, scrollable layouts

### 10. 📏 FullWidthContainer Component

Break out of content constraints with full-viewport-width containers, perfect for hero sections.

```astro
<!-- Basic full-width section -->
<FullWidthContainer background="var(--bg-secondary)">
  <div class="hero-content">
    <h1>Welcome to My Blog</h1>
    <p>Sharing insights on modern web development and technology</p>
  </div>
</FullWidthContainer>

<!-- Full-width image showcase -->
<FullWidthContainer padding="0">
  <img src="/images/hero-banner.jpg" alt="Hero banner" />
</FullWidthContainer>

<!-- Accent background with custom alignment -->
<FullWidthContainer background="accent" align="left" maxWidth="1200px" padding="3rem 2rem">
  <h2>Featured Content</h2>
  <p>This section stands out with an accent background</p>
</FullWidthContainer>

<!-- Gradient background -->
<FullWidthContainer background="gradient">
  <div class="hero-content">
    <h1>Beautiful Gradients</h1>
    <p>Eye-catching full-width sections</p>
  </div>
</FullWidthContainer>

<!-- Bordered section -->
<FullWidthContainer background="tertiary" padding="2rem">
  <h3>Important Notice</h3>
  <p>This content is highlighted with borders and special background</p>
</FullWidthContainer>
```

**Features**: Viewport-width breakout, background variants, custom alignment, hero content styling

### 11. 🔗 ExternalLink Component

Smart external link component with automatic security attributes and visual indicators.

```astro
<!-- Basic external link (auto-detects and adds security) -->
<ExternalLink href="https://astro.build/"> Astro Documentation </ExternalLink>

<!-- Internal link (no icon, no new tab) -->
<ExternalLink href="/about/"> About Page </ExternalLink>

<!-- Force new tab for internal link -->
<ExternalLink href="/projects/" openInNewTab={true}> My Projects </ExternalLink>

<!-- Disable external icon -->
<ExternalLink href="https://github.com/" showIcon={false}> GitHub (no icon) </ExternalLink>

<!-- Button-style external link -->
<ExternalLink href="https://docs.astro.build/" class="button-style">
  📚 Read the Docs
</ExternalLink>

<!-- Inline style in text -->
<p>
  Check out this
  <ExternalLink href="https://example.com/" class="inline"> awesome resource </ExternalLink>
  for more information.
</p>

<!-- In headings -->
<h2>
  <ExternalLink href="https://webdev.com/"> Web Development Guide </ExternalLink>
</h2>
```

**Features**: Auto-detection, security attributes, visual icons, accessibility, print-friendly

### Additional Components

**12. 📄 PDFViewer** - Full-featured PDF viewer with zoom modal  
**13. 📝 Summary** - Highlighted summary and callout boxes  
**14. 📚 Vocabulary** - Term definition boxes with highlighting  
**15. 📋 Tasks** - Task list container with numbering  
**16. ✓ Task** - Individual numbered task items  
**17. 🎨 Callouts** - Multi-column callout system

## 🎨 Theme System

The site features a comprehensive dark/light theme system controlled by CSS custom properties:

```css
/* Dark theme (default) */
:root {
  --bg-primary: #0b1020;
  --text-primary: #ffffff;
  --accent-primary: #a78bfa;
  /* ... */
}

/* Light theme */
:root.light {
  --bg-primary: #fef7ff;
  --text-primary: #1e293b;
  --accent-primary: #7c3aed;
  /* ... */
}
```

Toggle between themes using the header button or programmatically:

```javascript
// Switch to light mode
document.documentElement.classList.add('light');

// Switch to dark mode
document.documentElement.classList.remove('light');
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/bdenham/bruuce.git
cd bruuce

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Adding Blog Posts

Create new posts in `src/content/blog/`:

```markdown
---
title: 'My New Post'
date: 2024-01-15
excerpt: 'A brief description of the post content'
---

# My New Post

Content here with any of the components:

<Tooltip text="Helpful explanation">hover this</Tooltip>

<Prerequisites prerequisites={{ javascript: true, react: true }} />

<Checklist checklistKey="post-tutorial">
  <ul>
    <li>[ ] Read the introduction</li>
    <li>[ ] Try the code examples</li>
    <li>[ ] Complete the exercises</li>
  </ul>
</Checklist>
```

## 📁 Project Structure

```
bruuce/
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── Header.astro     # Site header with theme toggle
│   │   ├── Footer.astro     # Site footer
│   │   ├── Tooltip.astro    # Interactive tooltips
│   │   ├── Screenshot.astro # Click-to-zoom images
│   │   └── ...              # All other components
│   ├── content/
│   │   └── blog/            # Blog posts (MDX files)
│   ├── layouts/
│   │   └── BaseLayout.astro # Main site layout
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro  # Blog listing
│   │   │   └── [slug].astro # Individual blog posts
│   │   ├── about/
│   │   └── projects/
│   └── styles/
│       └── theme.css        # Theme system CSS
├── public/                  # Static assets
├── astro.config.mjs        # Astro configuration
└── package.json
```

## 🎯 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Maintenance
pnpm lint             # Run linting
```

## 🚀 Deployment

Deploy to any static hosting service:

- **Netlify**: Connect repository for auto-deploy
- **Vercel**: Import project for seamless deployment
- **GitHub Pages**: Use Actions workflow
- **Cloudflare Pages**: Deploy from repository

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ using [Astro](https://astro.build/)
Auto-deploy test comment
Auto-deployment test 2
// Pure static deployment - no adapter cache
// SEO Enhancement: Added comprehensive meta tags, structured data, sitemap.xml
// PERFORMANCE FIX: Optimized SEO for 0.8s Speed Index - moved JSON-LD to bottom, streamlined meta tags
