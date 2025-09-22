# UnifiedCard Component Examples

The `UnifiedCard` component is a flexible, reusable component that can replace many different card-like elements across the site. Here are examples of how to use it:

## 1. Navigation Cards (Homepage)

**Before:**

```astro
<ActionCard
  icon="📋"
  title="My Resume"
  description="Explore my 30+ years of experience in technical writing and developer experience"
  href="/resume/"
  ariaLabel="View my complete resume"
/>
```

**After:**

```astro
<UnifiedCard
  variant="content"
  icon="📋"
  title="My Resume"
  description="Explore my 30+ years of experience in technical writing and developer experience"
  href="/resume/"
  ariaLabel="View my complete resume"
  animateIn={true}
  animationDelay="50"
/>
```

## 2. Content Cards (About Page - Recognition Items)

**Before:**

```astro
<div class="recognition-item">
  <h3>🏆 Adobe Awards</h3>
  <p>
    Nominated for both the Adobe Founders Award and Extreme Ownership Award for excellence in
    technical writing and developer experience innovation.
  </p>
</div>
```

**After:**

```astro
<UnifiedCard
  variant="content"
  icon="🏆"
  title="Adobe Awards"
  description="Nominated for both the Adobe Founders Award and Extreme Ownership Award for excellence in technical writing and developer experience innovation."
  animateIn={true}
  animationDelay="50"
/>
```

## 3. Project Cards (Work Page)

**Before:**

```astro
<div class="project-card">
  <div class="project-header">
    <h3>Adobe Commerce Documentation</h3>
    <div class="project-tags">
      <span class="tag">Technical Writing</span>
      <span class="tag">Documentation Architecture</span>
      <span class="tag">GitHub</span>
    </div>
  </div>
  <p class="project-description">
    Leading the comprehensive documentation site for Adobe Storefront Commerce...
  </p>
  <div class="project-links">
    <a href="https://example.com" class="project-link primary">📚 Live Documentation Site →</a>
    <a href="https://github.com/example" class="project-link">View Source Repo →</a>
  </div>
  <div class="project-impact">
    <strong>Impact:</strong> Reduced developer onboarding time and support tickets...
  </div>
</div>
```

**After:**

```astro
<UnifiedCard
  variant="project"
  title="Adobe Commerce Documentation"
  description="Leading the comprehensive documentation site for Adobe Storefront Commerce, managing content strategy, information architecture, and maintaining the GitHub repository that serves thousands of developers daily."
  tags={[
    { text: 'Technical Writing', variant: 'default' },
    { text: 'Documentation Architecture', variant: 'default' },
    { text: 'GitHub', variant: 'default' },
  ]}
  links={[
    {
      href: 'https://experienceleague.adobe.com/developer/commerce/storefront/',
      text: '📚 Live Documentation Site →',
      variant: 'primary',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      href: 'https://github.com/commerce-docs/microsite-commerce-storefront',
      text: 'View Source Repo →',
      variant: 'secondary',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ]}
  animateIn={true}
  animationDelay="100"
>
  <div class="project-impact">
    <strong>Impact:</strong> Reduced developer onboarding time and support tickets through clear, actionable
    guides
  </div>
</UnifiedCard>
```

## 4. Documentation Cards with Status

```astro
<UnifiedCard
  variant="project"
  title="API Playground"
  description="Interactive documentation with live code examples and real-time API testing capabilities."
  status="🚀 Live"
  tags={[
    { text: 'Interactive', variant: 'primary' },
    { text: 'API', variant: 'default' },
  ]}
  primaryAction={{
    href: 'https://example.com/playground',
    text: 'Try it Live →',
    variant: 'primary',
    target: '_blank',
    rel: 'noopener noreferrer',
  }}
  featured={true}
/>
```

## 5. Simple Contact Items

**Before:**

```astro
<div class="contact-item">
  <strong>Email:</strong>
  <a href="mailto:brucedenham@mac.com">brucedenham@mac.com</a>
</div>
```

**After:**

```astro
<UnifiedCard
  variant="simple"
  title="Email"
  content='<a href="mailto:brucedenham@mac.com">brucedenham@mac.com</a>'
/>
```

## Component Props

### Core Props

- `variant`: 'content' | 'project' | 'simple'
- `href`: Makes entire card clickable
- `title`: Main heading
- `description`: Main text content
- `icon`: Emoji or icon for the card
- `content`: Raw HTML content (alternative to description)

### Advanced Props

- `tags`: Array of tag objects with `text` and `variant`
- `links`: Array of link objects with `href`, `text`, `variant`, etc.
- `primaryAction`: Single primary action link
- `status`: Status badge text
- `featured`: Boolean for special styling
- `animateIn`: Enable entrance animation
- `animationDelay`: Stagger animation timing (e.g., "50", "100", "150" - creates `animate-delay-{n}` classes)

### Styling Props

- `background`: Custom background color
- `padding`: 'small' | 'medium' | 'large'

## Benefits

1. **Consistency**: All cards use the same base styling and behavior
2. **Flexibility**: Props allow for many different card types
3. **Maintainability**: Changes to card styling happen in one place
4. **Performance**: Single component reduces CSS duplication
5. **Accessibility**: Built-in ARIA support and focus management
6. **Animation**: Consistent entrance animations across all cards
7. **Responsive**: Mobile-first responsive design built-in
