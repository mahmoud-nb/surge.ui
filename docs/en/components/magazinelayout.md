# MagazineLayout

Editorial hierarchy for news sites and blogs: a featured story, a column of secondary headlines, then a story grid. The grid also works for product lists and galleries.

## Usage

### Featured, secondary and grid

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuMagazineLayout gap="md">
      <template #header>
        <p style="font-size: 1.25rem; font-weight: 700;">News</p>
      </template>
      <template #featured>
        <LayoutBox label="Featured story" height="220px" accent />
      </template>
      <template #aside>
        <LayoutBox label="Headline 1" height="64px" />
        <LayoutBox label="Headline 2" height="64px" />
        <LayoutBox label="Headline 3" height="64px" />
      </template>
      <LayoutBox label="Story 1" height="110px" />
      <LayoutBox label="Story 2" height="110px" />
      <LayoutBox label="Story 3" height="110px" />
      <LayoutBox label="Story 4" height="110px" />
      <LayoutBox label="Story 5" height="110px" />
      <LayoutBox label="Story 6" height="110px" />
    </SuMagazineLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuMagazineLayout :columns="3">
    <template #header>
      <h1>News</h1>
    </template>
    <template #featured>
      <StoryCard :story="lead" size="lg" />
    </template>
    <template #aside>
      <StoryLink v-for="story in headlines" :key="story.id" :story="story" />
    </template>

    <StoryCard v-for="story in stories" :key="story.id" :story="story" />
  </SuMagazineLayout>
</template>
```

### Grid only (products, gallery)

Without `featured` or `aside`, only the grid remains: 1 column, 2 from 640px, then `columns` from 1024px. For a grid with no hierarchy (columns by width, automatic columns, list mode), prefer the [GridLayout](/en/components/gridlayout).

```vue
<SuMagazineLayout :columns="4" gap="md">
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</SuMagazineLayout>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `2 \| 3 \| 4` | `3` | Grid columns from a 1024px container |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Gap between areas and stories |

### Slots

| Slot | Description |
|------|-------------|
| `header` | Section title, filters |
| `featured` | Featured story |
| `aside` | Secondary headlines, "most read" (stacked) |
| `default` | Grid stories: each direct child is a cell |

## Responsive behavior

| Container width | Featured + secondary | Grid |
|-----------------|----------------------|------|
| < 640px | Stacked | 1 column |
| ≥ 640px | Stacked | 2 columns |
| ≥ 768px | Featured 2/3 + secondary 1/3 | 2 columns |
| ≥ 1024px | Featured 2/3 + secondary 1/3 | `columns` columns |

## Accessibility

- **Reading order**: featured, then secondary, then grid, matching the visual order.
- **Lists**: for a list of stories, give your cards a list structure (`role="list"` on a container, or consistent heading levels) so screen readers announce how many there are.
