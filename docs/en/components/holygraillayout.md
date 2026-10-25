# HolyGrailLayout

Application layout: header, navigation, main content, complementary column and footer. Semantic landmarks and a skip link are built in.

## Usage

### Three columns

Change the frame width: everything stacks on mobile; from 768px the navigation moves to the left and the complementary column below the content; from 1024px, three columns.

<div class="component-demo">
  <LayoutFrame lang="en">
    <SuHolyGrailLayout :landmarks="false" :full-height="false" gap="md">
      <template #header>
        <LayoutBox label="Header: logo, search, account" height="48px" />
      </template>
      <template #nav>
        <LayoutBox label="Navigation" height="160px" />
      </template>
      <LayoutBox label="Main content" height="220px" accent />
      <template #aside>
        <LayoutBox label="Complementary" height="160px" />
      </template>
      <template #footer>
        <LayoutBox label="Footer" height="48px" />
      </template>
    </SuHolyGrailLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuHolyGrailLayout sticky-header>
    <template #header>
      <AppHeader />
    </template>
    <template #nav>
      <AppMenu />
    </template>

    <RouterView />

    <template #aside>
      <ContextPanel />
    </template>
    <template #footer>
      <AppFooter />
    </template>
  </SuHolyGrailLayout>
</template>
```

::: tip Demo
The demo above uses `:landmarks="false"` because it sits in a page that already has its own landmarks (`main`…). In an application, keep the default.
:::

### Sticky header and columns

`sticky-header` pins the header to the top of the screen. `sticky-sidebars` keeps the navigation and complementary column visible (in columns); `sticky-offset` places them below the header.

```vue
<SuHolyGrailLayout sticky-header sticky-sidebars sticky-offset="4.5rem">…</SuHolyGrailLayout>
```

### Without complementary column

Missing slots reserve no space: without `aside`, the content takes the full width next to the navigation.

```vue
<SuHolyGrailLayout>
  <template #header>…</template>
  <template #nav>…</template>
  <Dashboard />
</SuHolyGrailLayout>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navWidth` | `string` | `'15rem'` | Navigation width (from 768px) |
| `asideWidth` | `string` | `'16rem'` | Complementary column width (from 1024px, or 768px without navigation) |
| `stickyHeader` | `boolean` | `false` | Sticky header |
| `stickySidebars` | `boolean` | `false` | Sticky navigation and complementary column (in columns) |
| `stickyOffset` | `string` | `'0px'` | Distance from the top of the screen for sticky columns |
| `fullHeight` | `boolean` | `true` | At least the screen height: the footer stays at the bottom |
| `landmarks` | `boolean` | `true` | `header`, `nav`, `main`, `aside`, `footer` landmarks; `false`: plain `div`s |
| `skipLink` | `boolean` | `true` | Skip link to the main content (with `landmarks`) |
| `skipLinkLabel` | `string` | `'Aller au contenu principal'` | Skip link text |
| `navLabel` | `string` | `'Navigation principale'` | Accessible name of the navigation |
| `asideLabel` | `string` | `'Informations complémentaires'` | Accessible name of the complementary column |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Gap between areas |

Default labels are in French: pass `skip-link-label`, `nav-label` and `aside-label` for other languages.

### Slots

| Slot | Element | Description |
|------|---------|-------------|
| `header` | `<header>` | Logo, search, user menu |
| `nav` | `<nav>` | Main navigation |
| `default` | `<main>` | Main content |
| `aside` | `<aside>` | Filters, table of contents, related content |
| `footer` | `<footer>` | Footer |

## Responsive behavior

| Container width | Rendering |
|-----------------|-----------|
| < 768px | Everything stacked: header, navigation, content, complementary, footer |
| ≥ 768px | Navigation \| content; the complementary column moves below the content |
| ≥ 1024px | Navigation \| content \| complementary |

On mobile, a long navigation pushes the content down: put a collapsible menu in it instead (for example an [Accordion](/en/components/accordion) or a [Dropdown](/en/components/dropdown)).

## Accessibility

- **Landmarks**: `header` (banner), `nav`, `main`, `aside` and `footer` let screen reader users jump between areas. A page must have a single `main`: use `:landmarks="false"` for a nested layout.
- **Skip link** (WCAG 2.4.1): the first tabbable element, visible only on keyboard focus, it moves focus to the main content without relying on anchor routing.
- **Landmark names**: `navLabel` and `asideLabel` tell these landmarks apart from other `nav` or `aside` elements on the page.
