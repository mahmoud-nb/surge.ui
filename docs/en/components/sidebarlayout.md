# SidebarLayout

Two columns: a fixed-width sidebar and fluid content. For docs, dashboards and admin pages. Below the breakpoint, areas are stacked in DOM order.

## Usage

### Sidebar on the left

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuSidebarLayout sidebar-tag="nav" sidebar-label="Documentation">
      <template #sidebar>
        <LayoutBox label="Navigation" height="180px" />
      </template>
      <LayoutBox label="Main content" height="180px" accent />
    </SuSidebarLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuSidebarLayout sidebar-tag="nav" sidebar-label="Documentation">
    <template #sidebar>
      <DocsMenu />
    </template>

    <DocsPage />
  </SuSidebarLayout>
</template>
```

### Sidebar on the right

With `sidebar-position="end"`, the sidebar moves to the right **and** after the content in the DOM: on mobile, content comes first.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuSidebarLayout sidebar-position="end" sidebar-label="On this page">
      <template #sidebar>
        <LayoutBox label="Table of contents" height="140px" />
      </template>
      <LayoutBox label="Article" height="180px" accent />
    </SuSidebarLayout>
  </LayoutFrame>
</div>

```vue
<SuSidebarLayout sidebar-position="end" sidebar-width="14rem" sidebar-label="On this page">
  <template #sidebar><TableOfContents /></template>
  <Article />
</SuSidebarLayout>
```

### Sticky sidebar

`sticky-sidebar` keeps the sidebar visible while the content scrolls (in columns only). If it is taller than the screen, it scrolls on its own. `sticky-offset` moves it below a fixed header.

```vue
<SuSidebarLayout sticky-sidebar sticky-offset="4rem" sidebar-tag="nav" sidebar-label="Settings">
  <template #sidebar><SettingsMenu /></template>
  <SettingsForm />
</SuSidebarLayout>
```

### Breakpoint

`breakpoint` sets the container width from which the two columns appear (`md` by default).

```vue
<!-- Columns from 1024px wide -->
<SuSidebarLayout breakpoint="lg">…</SuSidebarLayout>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sidebarPosition` | `'start' \| 'end'` | `'start'` | Sidebar side (DOM order follows visual order) |
| `sidebarWidth` | `string` | `'16rem'` | Sidebar width in columns (CSS length) |
| `breakpoint` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Container width from which columns appear |
| `stickySidebar` | `boolean` | `false` | Sticky sidebar (in columns) |
| `stickyOffset` | `string` | `'0px'` | Distance from the top of the screen for the sticky sidebar |
| `sidebarTag` | `'aside' \| 'nav' \| 'div'` | `'aside'` | Sidebar element |
| `sidebarLabel` | `string` | — | Accessible name of the sidebar (`aside`, `nav`) |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Gap between columns |

### Slots

| Slot | Description |
|------|-------------|
| `sidebar` | Navigation, filters, table of contents. Without it, content spans the full width |
| `default` | Main content |

## Responsive behavior

| Container width | Rendering |
|-----------------|-----------|
| < `breakpoint` | Areas stacked in DOM order |
| ≥ `breakpoint` | `sidebarWidth` sidebar + fluid content |

## Accessibility

- **Named region**: with `sidebar-tag="nav"` or `"aside"`, give a `sidebar-label` to tell the region apart from others ("Documentation", "Filters"…).
- **Consistent order**: the sidebar position changes the DOM order, never just the display. Tabbing follows what you see.
- **Sticky sidebar**: when it scrolls on its own, its links remain reachable by keyboard.
