# MasonryLayout

A wall of mixed-height items (galleries, media feeds, testimonials) stacked in columns, with no gaps. Each item keeps its height and is never split across two columns.

## Usage

### Columns by width

By default: 1 column, 2 from 640px, 3 from 1024px.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuMasonryLayout>
      <LayoutBox label="1" height="140px" />
      <LayoutBox label="2" height="90px" />
      <LayoutBox label="3" height="180px" accent />
      <LayoutBox label="4" height="110px" />
      <LayoutBox label="5" height="150px" />
      <LayoutBox label="6" height="80px" />
      <LayoutBox label="7" height="200px" />
      <LayoutBox label="8" height="100px" />
      <LayoutBox label="9" height="130px" />
    </SuMasonryLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuMasonryLayout :columns="{ base: 1, sm: 2, lg: 3, xl: 4 }">
    <MediaCard v-for="item in feed" :key="item.id" :item="item" />
  </SuMasonryLayout>
</template>
```

Each value applies up to the next threshold (mobile first). A single number fixes the columns at every width: `:columns="4"`.

### Fluid columns

`column-width` sets an ideal width: the browser picks the number of columns on its own, with no breakpoint.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuMasonryLayout column-width="10rem" gap="sm">
      <LayoutBox label="1" height="120px" />
      <LayoutBox label="2" height="80px" />
      <LayoutBox label="3" height="150px" accent />
      <LayoutBox label="4" height="100px" />
      <LayoutBox label="5" height="130px" />
      <LayoutBox label="6" height="90px" />
      <LayoutBox label="7" height="160px" />
      <LayoutBox label="8" height="70px" />
    </SuMasonryLayout>
  </LayoutFrame>
</div>

```vue
<SuMasonryLayout column-width="14rem" gap="sm">…</SuMasonryLayout>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| { base?, sm?, md?, lg?, xl? }` | `{ base: 1, sm: 2, lg: 3 }` | Columns, fixed or by container width |
| `columnWidth` | `string` | — | Ideal column width (CSS length); overrides `columns` |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Gap between items |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Wall items: each direct child is a tile |

## Responsive behavior

| Container width | Columns (default value) |
|-----------------|-------------------------|
| < 640px | 1 |
| ≥ 640px | 2 |
| ≥ 1024px | 3 |

## Accessibility

- **Reading order**: items read **column by column** (top to bottom, then the next column), and so does tabbing. For content whose order matters (chronological feed, sorted results), prefer the [GridLayout](/en/components/gridlayout).
- **Images**: give every meaningful media an `alt`, and dimensions (`width`, `height`) to avoid layout shifts while loading.
