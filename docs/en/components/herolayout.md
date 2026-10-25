# HeroLayout

Landing page for product launches and signups: a hero (eyebrow, title, description, calls to action, media), followed by the page sections. The title has a fluid size that follows the container width.

## Usage

### Centered hero

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuHeroLayout title-tag="h3" gap="lg">
      <template #eyebrow><SuBadge variant="secondary">New · version 3</SuBadge></template>
      <template #title>Ship your product faster</template>
      <template #description>A clear pitch, a single call to action and a visual: the journey stays simple.</template>
      <template #actions>
        <SuButton variant="primary">Get started</SuButton>
        <SuButton variant="outline">Watch the demo</SuButton>
      </template>
      <template #media>
        <LayoutBox label="Product screenshot" height="180px" accent />
      </template>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: 0.75rem;">
        <LayoutBox label="Feature 1" height="90px" />
        <LayoutBox label="Feature 2" height="90px" />
        <LayoutBox label="Feature 3" height="90px" />
      </div>
    </SuHeroLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuHeroLayout>
    <template #eyebrow>
      <SuBadge variant="secondary">New · version 3</SuBadge>
    </template>
    <template #title>Ship your product faster</template>
    <template #description>
      <p>A clear pitch, a single call to action and a visual.</p>
    </template>
    <template #actions>
      <SuButton variant="primary">Get started</SuButton>
      <SuButton variant="outline">Watch the demo</SuButton>
    </template>
    <template #media>
      <img src="/screenshot.png" alt="Product dashboard" width="1200" height="720" />
    </template>

    <FeaturesSection />
    <PricingSection />
  </SuHeroLayout>
</template>
```

### Media beside the text

With `media-position="end"`, the media moves next to the text from 1024px and the text aligns left.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuHeroLayout media-position="end" align="start" title-tag="h3">
      <template #title>An interface built for your teams</template>
      <template #description>Text on the left, media on the right on large screens.</template>
      <template #actions><SuButton variant="primary">Try it</SuButton></template>
      <template #media>
        <LayoutBox label="Media" height="200px" accent />
      </template>
    </SuHeroLayout>
  </LayoutFrame>
</div>

```vue
<SuHeroLayout media-position="end" align="start">…</SuHeroLayout>
```

### Full height

`full-height` gives the hero at least the screen height, with content vertically centered.

```vue
<SuHeroLayout full-height>…</SuHeroLayout>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'center' \| 'start'` | `'center'` | Hero text alignment |
| `mediaPosition` | `'bottom' \| 'end'` | `'bottom'` | Media below the text, or beside it from 1024px |
| `fullHeight` | `boolean` | `false` | The hero takes at least the screen height |
| `titleTag` | `'h1' \| 'h2' \| 'h3'` | `'h1'` | Title heading level |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'xl'` | Gap between the hero and the sections |

### Slots

| Slot | Description |
|------|-------------|
| `eyebrow` | Small text above the title: badge, category, announcement |
| `title` | Hero title, rendered in `titleTag` |
| `description` | Subtitle or pitch |
| `actions` | Call-to-action buttons |
| `media` | Image, screenshot, video (media are made fluid) |
| `default` | Sections following the hero |

## Responsive behavior

| Container width | Rendering |
|-----------------|-----------|
| < 1024px | Text then media, stacked |
| ≥ 1024px | With `media-position="end"`: text \| media |

The title grows from 32px to 60px with the container width (`clamp()` in container units), with no breakpoint.

## Accessibility

- **Named region**: the hero is a `<section>` named by its title (`aria-labelledby`).
- **Heading level**: `h1` by default, since the hero opens the page. Use `title-tag="h2"` when the page already has an `h1`.
- **Calls to action**: a single primary button (`variant="primary"`) keeps the journey clear; navigation links remain `<a>` (SuLink), not buttons.
