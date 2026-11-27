# SkipLink

Skip link: the first element reached with the keyboard, it leads straight to the main content without going through the header and the navigation again (WCAG 2.4.1). It stays hidden until it gets keyboard focus.

`SuAppShell` and `SuHolyGrailLayout` already include it: use `SuSkipLink` on its own in a custom layout.

## Usage

### Basic usage

Click inside the frame, then press <kbd>Tab</kbd>: the link shows up at the top left of the window.

<div class="component-demo">
  <div class="demo-section">
    <SuSkipLink target="demo-skip-main" label="Skip to the demo" />
    <p id="demo-skip-main" style="margin: 0;">Main content of the demo: it gets focus when the link is followed.</p>
  </div>
</div>

```vue
<template>
  <SuSkipLink target="content" />
  <header>…</header>
  <nav aria-label="Main navigation">…</nav>
  <main id="content">…</main>
</template>
```

The link moves focus to the target programmatically (adding `tabindex="-1"` when it is not focusable): it works even when the application router intercepts `#` anchors.

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | `string` | `'main-content'` | `id` of the element reached |
| `label` | `string` | `'Skip to main content'` | Link text |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Link text |

## Accessibility

- Put the link first in the page, before the header.
- Visually hidden (not `display: none`): it stays reachable with the keyboard and shows up on focus, above sticky bars.
- The target gets focus: reading and tabbing resume at the start of the main content.
