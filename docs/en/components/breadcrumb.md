<script setup>
import { HomeIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'SurgeUI', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumb' }
]
</script>

# Breadcrumb

Shows where the page sits in the site hierarchy and lets users go back up a level. The last item is the current page.

## Usage

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <SuBreadcrumb :items="items" />
  </div>
</div>

```vue
<script setup>
const items = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'SurgeUI', href: '/projects/surgeui' },
  { label: 'Components', href: '/projects/surgeui/components' },
  { label: 'Breadcrumb' }
]
</script>

<template>
  <SuBreadcrumb :items="items" />
</template>
```

### Separators

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuBreadcrumb :items="items" separator="chevron" />
      <SuBreadcrumb :items="items" separator="slash" />
      <SuBreadcrumb :items="items" separator="dot" />
    </div>
  </div>
</div>

```vue
<SuBreadcrumb :items="items" separator="slash" />
```

### Collapsed path

Beyond `maxItems` items, the middle of the path collapses behind a "…" button that expands it.

<div class="component-demo">
  <div class="demo-section">
    <SuBreadcrumb :items="items" :max-items="3" />
  </div>
</div>

```vue
<SuBreadcrumb :items="items" :max-items="3" />
```

### Home as an icon

With `iconOnly`, the label is still read by screen readers.

<div class="component-demo">
  <div class="demo-section">
    <SuBreadcrumb :items="[{ label: 'Home', href: '#', icon: HomeIcon, iconOnly: true }, ...items.slice(1)]" />
  </div>
</div>

```vue
<script setup>
import { HomeIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Home', href: '/', icon: HomeIcon, iconOnly: true },
  { label: 'Projects', href: '/projects' },
  { label: 'SurgeUI' }
]
</script>
```

### With Vue Router

The `item` slot replaces an item's rendering, for instance with a `RouterLink`.

```vue
<SuBreadcrumb :items="items">
  <template #item="{ item, current }">
    <span v-if="current" aria-current="page">{{ item.label }}</span>
    <RouterLink v-else :to="item.href">{{ item.label }}</RouterLink>
  </template>
</SuBreadcrumb>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | Path items, from the root to the current page |
| `separator` | `'chevron' \| 'slash' \| 'dot'` | `'chevron'` | Separator (or `separator` slot) |
| `maxItems` | `number` | - | Beyond this, the middle of the path collapses |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Text size |
| `ariaLabel` | `string` | `'Breadcrumb'` (locale) | Navigation name |
| `expandLabel` | `string` | `'Show full path'` (locale) | Name of the "…" button |

### BreadcrumbItem

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Label |
| `href` | `string` | Link (without a link: plain text) |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | Link target |
| `icon` | `Component` | Icon before the label |
| `iconOnly` | `boolean` | Visually hides the label |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `item` | `{ item, index, current }` | Item rendering |
| `separator` | - | Custom separator |

## Accessibility

- `<nav aria-label="Breadcrumb">` containing an ordered list.
- The current page (last item) has `aria-current="page"`.
- Separators are hidden from screen readers (`aria-hidden`).
- The "…" button is named; once the path expands, focus moves to the first revealed item.
- In RTL, the chevron is mirrored.
