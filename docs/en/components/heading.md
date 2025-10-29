# Heading

The `Heading` component provides a consistent and flexible way to render typographic titles across the design system.  
It supports different heading levels (`h1`–`h6`) or custom tags, while maintaining a unified visual style.

---

## ✨ Features

- Supports HTML heading levels: `h1` to `h6`
- Can render any HTML tag via the `as` prop (`div`, `span`, etc.)
- Automatically applies the corresponding typography style based on the level
- Works with both light and dark themes
- Fully compatible with RTL layouts

---

## 🚀 Usage

### Basic Example

```vue
<template>
  <Heading level="1">Main Title</Heading>
  <Heading level="2">Section Title</Heading>
  <Heading level="3">Subsection Title</Heading>
</template>
```

## API

### Props

| Prop    | Type   | Default | Description         |
| ------- | ------ | ------- | -------------------------------------- |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1`     | Defines the visual and semantic level of the heading.                                                          |
| `as`    | `string`                     | —       | Optional HTML tag to render instead of the default (`h1`–`h6`). Useful for styling without breaking semantics. |
| `class` | `string`                     | —       | Additional custom classes.                                                                                     |


### Styling

| Level | Class          | Example Font Size | Font Weight |
| ----- | -------------- | ----------------- | ----------- |
| h1    | `.heading--h1` | `2.25rem`         | `700`       |
| h2    | `.heading--h2` | `1.875rem`        | `600`       |
| h3    | `.heading--h3` | `1.5rem`          | `600`       |
| h4    | `.heading--h4` | `1.25rem`         | `500`       |
| h5    | `.heading--h5` | `1.125rem`        | `500`       |
| h6    | `.heading--h6` | `1rem`            | `500`       |


### Custom Tag Example

You can render a heading visually like an `h2` but semantically as a `div`:

```vue
<Heading as="div" level="2">Visually h2, but semantically a div</Heading>
```

### Accessibility

Headings are essential for screen readers and SEO.
Ensure the hierarchy reflects the logical structure of your page content.

