<script setup>
import { ref } from 'vue'

const page = ref(1)
const page2 = ref(8)
</script>

# Pagination

Navigation between the pages of a list or a table. The number of buttons stays constant (ellipses replace distant pages), so the bar keeps the same width from one page to the next.

## Usage

### Basic usage

From the total number of items (`total`) and the page size (`pageSize`, 10 by default), or directly with `pageCount`.

<div class="component-demo">
  <div class="demo-section">
    <SuPagination v-model="page" :total="200" />
    <p>Page {{ page }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <SuPagination v-model="page" :total="200" :page-size="10" />
</template>
```

### First and last page

<div class="component-demo">
  <div class="demo-section">
    <SuPagination v-model="page2" :page-count="20" show-edges />
  </div>
</div>

```vue
<SuPagination v-model="page" :page-count="20" show-edges />
```

### Siblings and boundaries

`siblings` sets the number of pages on each side of the current page, `boundaries` the number of pages always shown at the start and end.

<div class="component-demo">
  <div class="demo-section">
    <SuPagination :model-value="10" :page-count="20" :siblings="2" :boundaries="2" />
  </div>
</div>

```vue
<SuPagination v-model="page" :page-count="20" :siblings="2" :boundaries="2" />
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuPagination :model-value="3" :page-count="8" size="sm" />
      <SuPagination :model-value="3" :page-count="8" size="md" />
      <SuPagination :model-value="3" :page-count="8" size="lg" />
    </div>
  </div>
</div>

```vue
<SuPagination v-model="page" :page-count="8" size="sm" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `1` | Current page, from 1 to n (v-model) |
| `total` | `number` | - | Total number of items |
| `pageSize` | `number` | `10` | Items per page |
| `pageCount` | `number` | - | Number of pages, takes precedence over `total` / `pageSize` |
| `siblings` | `number` | `1` | Pages on each side of the current page |
| `boundaries` | `number` | `1` | Pages always shown at the start and end |
| `showEdges` | `boolean` | `false` | First / last page buttons |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `disabled` | `boolean` | `false` | Disables the pagination |
| `ariaLabel` | `string` | `'Pagination'` (locale) | Navigation name |
| `previousLabel` / `nextLabel` | `string` | `'Previous page'` / `'Next page'` (locale) | Previous / next button names |
| `firstLabel` / `lastLabel` | `string` | `'First page'` / `'Last page'` (locale) | Edge button names |
| `pageLabel` | `(page: number) => string` | `'Page {page}'` | Page button name |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | New page (v-model) |
| `change` | `number` | Page changed by the user |

The page computation is exported on its own, for a custom pagination: `import { getPaginationItems } from '@surgeui/ds-vue'`, then `getPaginationItems({ page, count, siblings, boundaries })` returns the numbers and ellipses (`'ellipsis-start'`, `'ellipsis-end'`).

## Accessibility

- `<nav aria-label="Pagination">` containing a list; the current page has `aria-current="page"`.
- Each page button is named "Page 3": the name contains the visible number (WCAG 2.5.3).
- On the first or last page, previous and next stay focusable with `aria-disabled="true"`, so focus is not lost when the button becomes inactive.
- Ellipses are hidden from screen readers.
- In RTL, the chevrons are mirrored.
