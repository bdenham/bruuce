// Component Library Exports
// Centralized exports for all UI components

export { default as ActionCard } from './ActionCard.astro';
export { default as Button } from './Button.astro';
export { default as Card } from './Card.astro';
export { default as Grid } from './Grid.astro';
export { default as LighthouseGauge } from './LighthouseGauge.astro';
export { default as PageHeader } from './PageHeader.astro';
export { default as Section } from './Section.astro';

// Component Types (for TypeScript support)
// Note: Only export types for components that explicitly export Props interface
export type { Props as ButtonProps } from './Button.astro';
export type { Props as CardProps } from './Card.astro';
export type { Props as GridProps } from './Grid.astro';
export type { Props as SectionProps } from './Section.astro';
