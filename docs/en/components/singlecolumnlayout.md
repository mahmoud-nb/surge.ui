# SingleColumnLayout

A single centered column with a comfortable line length: articles, blogs, forms, mobile pages. On mobile the column spans the full width with side gutters; beyond that it centers and stops at its maximum width.

## Usage

### Article

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuSingleColumnLayout as="article">
      <template #header>
        <p style="font-size: 1.5rem; font-weight: 700;">Article title</p>
        <p style="color: var(--su-text-secondary);">Published on October 25 · 4 min read</p>
      </template>
      <LayoutBox label="Illustration" height="140px" accent />
      <p style="margin-top: 1rem; line-height: 1.7;">The line length stays comfortable to read: about sixty-five characters, whatever the screen width. On mobile, the column spans the full width with side gutters.</p>
      <template #footer>
        <LayoutBox label="Author, sharing, next articles" />
      </template>
    </SuSingleColumnLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuSingleColumnLayout as="article">
    <template #header>
      <h1>Article title</h1>
      <p>Published on October 25 · 4 min read</p>
    </template>

    <img src="/illustration.jpg" alt="…" />
    <p>Article content…</p>

    <template #footer>
      <AuthorCard />
    </template>
  </SuSingleColumnLayout>
</template>
```

### Widths

`prose` (default) limits lines to about 65 characters, the recommended reading length. Other widths suit forms (`narrow`), mixed content (`medium`, `wide`) or full width (`full`).

<div class="component-demo">
  <LayoutFrame lang="en">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <SuSingleColumnLayout width="narrow"><LayoutBox label="narrow · 36rem" /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="prose"><LayoutBox label="prose · 65ch" accent /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="medium"><LayoutBox label="medium · 48rem" /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="wide"><LayoutBox label="wide · 72rem" /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="full"><LayoutBox label="full" /></SuSingleColumnLayout>
    </div>
  </LayoutFrame>
</div>

```vue
<SuSingleColumnLayout width="narrow">
  <LoginForm />
</SuSingleColumnLayout>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `'prose' \| 'narrow' \| 'medium' \| 'wide' \| 'full'` | `'prose'` | Maximum width: prose ≈ 65 characters, narrow 36rem, medium 48rem, wide 72rem, full unlimited |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Gap between header, content and footer |
| `padded` | `boolean` | `true` | Side gutters: 16px, then 24px from a 768px container |
| `as` | `string` | `'div'` | Root element (`article`, `main`, `section`…) |

### Slots

| Slot | Description |
|------|-------------|
| `header` | Title, lead, breadcrumb |
| `default` | Main content |
| `footer` | Author, sharing, article navigation |

## Responsive behavior

| Container width | Rendering |
|-----------------|-----------|
| < 768px | Full width, 16px gutters |
| ≥ 768px | 24px gutters, column centered once the container exceeds the maximum width |

The maximum width excludes gutters: a `prose` column keeps its 65 characters of text.

## Accessibility

- **Line length**: `prose` follows the readability guideline (WCAG 1.4.8, 80 characters at most).
- **Semantics**: pick the root element with `as` (`article` for a post, `main` for the page's main content). The `header` and `footer` areas are plain containers: put your own `<header>` or `<footer>` in them when needed.
- **Zoom**: no fixed pixel widths, content reflows up to 400% zoom (WCAG 1.4.10).
