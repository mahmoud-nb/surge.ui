# SplitLayout

Two areas side by side: split screen (image + pitch, A vs B comparison) or an asymmetrical composition with `ratio`. Areas are stacked below the breakpoint.

## Usage

### Split screen

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuSplitLayout>
      <template #start>
        <LayoutBox label="Image" height="220px" accent />
      </template>
      <template #end>
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 0.75rem; height: 100%; padding: 1.5rem;">
          <p style="font-size: 1.5rem; font-weight: 700;">Sign in</p>
          <p style="color: var(--su-text-secondary);">The pitch or the form takes the second half.</p>
          <div><SuButton variant="primary">Continue</SuButton></div>
        </div>
      </template>
    </SuSplitLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuSplitLayout full-height>
    <template #start>
      <img src="/cover.jpg" alt="" />
    </template>
    <template #end>
      <LoginForm />
    </template>
  </SuSplitLayout>
</template>
```

`full-height` gives the areas at least the screen height when in columns.

### Asymmetrical

`ratio` sets the area proportions in columns: `2:1` gives two thirds to the first area.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuSplitLayout ratio="3:2" gap="md">
      <template #start>
        <LayoutBox label="Featured project" height="260px" accent />
      </template>
      <template #end>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--su-layout-gap); height: 100%;">
          <LayoutBox label="Project 2" height="120px" style="grid-column: span 2;" />
          <LayoutBox label="Project 3" height="120px" />
          <LayoutBox label="Project 4" height="120px" />
        </div>
      </template>
    </SuSplitLayout>
  </LayoutFrame>
</div>

```vue
<SuSplitLayout ratio="3:2" gap="md">
  <template #start><ProjectCard featured /></template>
  <template #end><ProjectGrid /></template>
</SuSplitLayout>
```

### Z-pattern

Consecutive SplitLayouts alternating `reverse` move the eye from side to side. `reverse` only flips the column display: on mobile, the `start` area (the image) stays first.

<div class="component-demo">
  <LayoutFrame lang="en">
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <SuSplitLayout gap="lg" align="center">
        <template #start><LayoutBox label="Image 1" height="120px" accent /></template>
        <template #end><LayoutBox label="Feature 1" /></template>
      </SuSplitLayout>
      <SuSplitLayout gap="lg" align="center" reverse>
        <template #start><LayoutBox label="Image 2" height="120px" accent /></template>
        <template #end><LayoutBox label="Feature 2" /></template>
      </SuSplitLayout>
    </div>
  </LayoutFrame>
</div>

```vue
<SuSplitLayout
  v-for="(feature, i) in features"
  :key="feature.id"
  :reverse="i % 2 === 1"
  gap="xl"
  align="center"
>
  <template #start><img :src="feature.image" alt="" /></template>
  <template #end><FeatureText :feature="feature" /></template>
</SuSplitLayout>
```

### A vs B comparison

```vue
<SuSplitLayout gap="md">
  <template #start><PlanCard plan="starter" /></template>
  <template #end><PlanCard plan="pro" /></template>
</SuSplitLayout>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `'1:1' \| '2:1' \| '1:2' \| '3:2' \| '2:3'` | `'1:1'` | Area proportions in columns |
| `breakpoint` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Container width from which areas sit side by side |
| `reverse` | `boolean` | `false` | In columns, shows the `end` area on the left (DOM order unchanged) |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Vertical alignment of areas in columns |
| `fullHeight` | `boolean` | `false` | Minimum screen height in columns |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | Gap between areas |

### Slots

| Slot | Description |
|------|-------------|
| `start` | First area (left in columns, or right with `reverse`) |
| `end` | Second area |

Each area is a flex column: a child with `flex: 1` fills its full height.

## Responsive behavior

| Container width | Rendering |
|-----------------|-----------|
| < `breakpoint` | Areas stacked, `start` first |
| ≥ `breakpoint` | Areas side by side following `ratio` (and `reverse`) |

## Accessibility

- **DOM order**: `start` is always read first. With `reverse`, put content whose reading order matters little (image, illustration) in `start` so the visual flip has no consequence.
- **Decorative images**: a purely decorative image takes `alt=""`.
