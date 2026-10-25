# FullScreenLayout

Full-screen storytelling, one idea per screen: product tours, annual reports, onboarding. Each direct child takes the height of the area and scrolling snaps to each one.

## Usage

### Successive screens

Scroll the area (wheel, swipe, or with the keyboard once focused with Tab):

<div class="component-demo">
  <LayoutFrame width="tablet" lang="en">
    <SuFullScreenLayout height="300px" snap="mandatory" label="Product tour">
      <section style="display: grid; place-items: center; background: var(--su-bg-muted);">Screen 1 · One idea per screen</section>
      <section style="display: grid; place-items: center; background: color-mix(in srgb, var(--su-primary-default) 12%, transparent);">Screen 2 · Scrolling snaps</section>
      <section style="display: grid; place-items: center; background: var(--su-bg-muted);">Screen 3 · With the keyboard too</section>
    </SuFullScreenLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuFullScreenLayout snap="mandatory" label="Product tour">
    <section class="screen">…</section>
    <section class="screen">…</section>
    <section class="screen">…</section>
  </SuFullScreenLayout>
</template>
```

### Snapping

- `proximity` (default): scrolling stops on a screen only when close to it. A screen taller than the area stays fully readable.
- `mandatory`: scrolling always stops at the start of a screen. Keep it for screens that fit the height.
- `none`: free scrolling, full-height screens.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `snap` | `'mandatory' \| 'proximity' \| 'none'` | `'proximity'` | Scroll snapping |
| `height` | `string` | `'100svh'` | Height of the scroll area (one screen) |
| `label` | `string` | — | Accessible name of the area; makes it a findable region |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Successive screens: each direct child (for example a `<section>`) is a screen |

## Responsive behavior

`100svh` (*small viewport height*) matches the visible height on mobile with browser bars shown: a screen is never hidden behind the browser UI. Each screen is **at least** that tall and grows when its content requires it.

## Accessibility

- **Keyboard** (WCAG 2.1.1): the scroll area is focusable (`tabindex="0"`); once focused, arrows and Page Up / Page Down scroll it.
- **Region**: with `label`, the area becomes a named region that screen readers can reach directly.
- **Motion**: smooth scrolling is only enabled when the user has not asked for reduced motion.
- **Long content**: avoid `mandatory` with screens taller than the area, the end of the content would become hard to reach.
