<script setup>
import { ref } from 'vue'

const view = ref('grid')
</script>

# GridLayout

A grid of equally important cells: product lists, galleries, dashboards. Cells read row by row. The number of columns follows the container width, or adapts on its own from a minimum cell width. A list mode stacks the cells, with an optional grid / list switcher.

## Usage

### Columns by width

By default: 1 column, 2 from 640px, 3 from 1024px.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuGridLayout>
      <LayoutBox label="Cell 1" height="100px" />
      <LayoutBox label="Cell 2" height="100px" />
      <LayoutBox label="Cell 3" height="100px" />
      <LayoutBox label="Cell 4" height="100px" />
      <LayoutBox label="Cell 5" height="100px" />
      <LayoutBox label="Cell 6" height="100px" />
    </SuGridLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuGridLayout :columns="{ base: 1, sm: 2, lg: 3, xl: 4 }">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </SuGridLayout>
</template>
```

Each value applies up to the next threshold (mobile first). A single number fixes the columns at every width: `:columns="4"`.

### Automatic columns

`min-item-width` sets the minimum width of a cell: the grid fits as many columns as it can (*auto-fill*), with no breakpoint. A cell never grows wider than the container.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuGridLayout min-item-width="10rem" gap="sm">
      <LayoutBox label="1" height="90px" />
      <LayoutBox label="2" height="90px" />
      <LayoutBox label="3" height="90px" accent />
      <LayoutBox label="4" height="90px" />
      <LayoutBox label="5" height="90px" />
      <LayoutBox label="6" height="90px" />
      <LayoutBox label="7" height="90px" />
      <LayoutBox label="8" height="90px" />
    </SuGridLayout>
  </LayoutFrame>
</div>

```vue
<SuGridLayout min-item-width="14rem" gap="sm">
  <MediaTile v-for="item in gallery" :key="item.id" :item="item" />
</SuGridLayout>
```

### Grid or list

`v-model:view` switches to a list (`'list'`): cells stack in a single column. `view-toggle` adds a grid / list switcher to the header; the `header` slot holds the title, result count or filters. The `default` slot receives `view` so cells can adapt.

The switcher labels default to French: translate them with `view-toggle-label`, `grid-label` and `list-label`.

<div class="component-demo">
  <LayoutFrame lang="en" width="tablet">
    <SuGridLayout v-model:view="view" view-toggle view-toggle-label="Display" grid-label="Grid" list-label="List" items-tag="ul">
      <template #header>
        <p style="margin: 0; font-weight: 700;">Products</p>
      </template>
      <li v-for="n in 4" :key="n">
        <LayoutBox :label="'Product ' + n" :height="view === 'grid' ? '120px' : '56px'" />
      </li>
    </SuGridLayout>
  </LayoutFrame>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const view = ref<'grid' | 'list'>('grid')
</script>

<template>
  <SuGridLayout
    v-model:view="view"
    view-toggle
    view-toggle-label="Display"
    grid-label="Grid"
    list-label="List"
    items-tag="ul"
  >
    <template #header>
      <h2>Products</h2>
      <p>{{ products.length }} results</p>
    </template>

    <li v-for="product in products" :key="product.id">
      <ProductCard :product="product" :direction="view === 'list' ? 'horizontal' : 'vertical'" />
    </li>
  </SuGridLayout>
</template>
```

Without `view-toggle`, the view can still be driven from outside, for instance by your own control in a toolbar: `<SuGridLayout :view="view">`.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `view` (`v-model:view`) | `'grid' \| 'list'` | `'grid'` | View: in a list, cells stack in a single column |
| `columns` | `number \| { base?, sm?, md?, lg?, xl? }` | `{ base: 1, sm: 2, lg: 3 }` | Columns, fixed or by container width |
| `minItemWidth` | `string` | — | Minimum cell width (CSS length): automatic columns, overrides `columns` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Vertical alignment of the cells in a row (`stretch`: equal height) |
| `itemsTag` | `'div' \| 'ul' \| 'ol'` | `'div'` | Element holding the cells: `ul` or `ol` for a list (`li` cells) |
| `viewToggle` | `boolean` | `false` | Shows the grid / list switcher in the header |
| `viewToggleLabel` | `string` | `'Affichage'` | Accessible name of the switcher |
| `gridLabel` | `string` | `'Grille'` | Label of the "grid" button |
| `listLabel` | `string` | `'Liste'` | Label of the "list" button |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Gap between cells |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:view` | `'grid' \| 'list'` | View picked in the switcher |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `header` | — | Title, result count, filters (next to the switcher) |
| `default` | `{ view }` | Cells: each direct child is a cell |

## Responsive behavior

| Container width | Columns (default value) |
|-----------------|-------------------------|
| < 640px | 1 |
| ≥ 640px | 2 |
| ≥ 1024px | 3 |

With `min-item-width`, the number of columns only depends on the available space. In a list, a single column at every width.

## Accessibility

- **Reading order**: cells read row by row, in DOM order, and so does tabbing. This is the grid to pick when order matters (sorted results, chronological feed).
- **Lists**: with `items-tag="ul"` (or `"ol"`) and `<li>` cells, screen readers announce the number of items. The `list` role is set explicitly, since some browsers drop it from lists without bullets.
- **Grid / list switcher**: a named group (`viewToggleLabel`) of two toggle buttons (`aria-pressed`). Labels never change: only the pressed state tells which view is active.
