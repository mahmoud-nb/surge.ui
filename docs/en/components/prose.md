# Prose

Typography for written content: article, help page, rendered Markdown or CMS content. Headings, paragraphs, lists, quotes, code, tables and images take the theme colors and spacing.

## Usage

### Component

```vue
<SuProse as="article">
  <h2>Installing SurgeUI</h2>
  <p>The <code>@surgeui/vue</code> package provides the components, styles and types.</p>
  <ul>
    <li>Vue 3.5 or later</li>
    <li>A build tool that imports CSS</li>
  </ul>
</SuProse>
```

### Class only (rendered HTML)

```vue
<script setup>
import { marked } from 'marked'

const html = marked.parse(markdown)
</script>

<template>
  <article class="su-prose" v-html="html" />
</template>
```

`v-html` inserts HTML as is: keep it for trusted content, or sanitize it first (DOMPurify).

### Sizes

```vue
<SuProse size="sm">…</SuProse>
<SuProse size="lg">…</SuProse>
```

Heading, code and table sizes follow the text size (`em` units).

## Styled elements

| Element | Rendering |
|---------|-----------|
| `h1` to `h6` | Semibold, tight line height, larger top margin than bottom margin |
| `p`, lists, quotes, tables | Even vertical rhythm; no margin at the start or end of the content |
| `a` | Theme link color, underlined, focus ring |
| `ul`, `ol`, `li` | Tertiary-colored bullets and numbers, nested lists |
| `blockquote` | Line at the start of the line (`border-inline-start`), secondary text |
| `code`, `kbd`, `pre` | Monospace font; `pre` scrolls horizontally and stays left to right |
| `table` | Full width, separated rows, emphasized header |
| `img`, `video`, `figure` | Container max width, rounded corners, secondary caption |
| `hr`, `mark`, `small` | Thin separator, soft highlight, secondary text |

## Customization

Rules use `:where()`: their specificity is that of the `.su-prose` class alone, so a rule in your stylesheet overrides them without `!important`.

```css
.su-prose h2 {
  color: var(--su-primary-default);
}
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | Rendered element (`article`, `section`…) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Text size |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Written content |

## Accessibility

- Elements keep their meaning: the heading hierarchy stays the content's own.
- Line length: limit the container width (60 to 75 characters, for example `max-inline-size: 70ch`).
- Logical properties: quotes, lists and indents sit on the right side in RTL.
- Links stay underlined: color is not the only cue.
