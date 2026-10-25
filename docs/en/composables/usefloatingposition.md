# useFloatingPosition

Composable that positions floating elements (popover, menu, dropdown list) against their reference element. It is built on [Floating UI](https://floating-ui.com/) and powers `SuPopover`, `SuDropdown` and `SuSelectBox`.

- **`fixed` position**: the floating element is never clipped by an `overflow: hidden` parent.
- **Flip and shift**: when space runs out, the element moves to the opposite side (`flip`), then slides to stay on screen (`shift`).
- **Tracking**: the position is recomputed on scroll and resize, only while the element is open.
- **SSR-friendly**: nothing runs on the server.

## Basic usage

```vue
<script setup>
import { ref } from 'vue'
import { useFloatingPosition } from '@surgeui/ds-vue'

const triggerRef = ref()
const menuRef = ref()
const open = ref(false)

const { placement } = useFloatingPosition(triggerRef, menuRef, {
  placement: 'bottom-start',
  open,
  offset: 4,
  matchReferenceWidth: true
})
</script>

<template>
  <button ref="triggerRef" type="button" @click="open = !open">
    Options
  </button>

  <div v-if="open" ref="menuRef" class="menu">
    Applied placement: {{ placement }}
  </div>
</template>

<style>
/* left/top are set inline by the composable */
.menu {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
```

## Parameters

```ts
useFloatingPosition(reference, floating, options)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `reference` | `Ref<HTMLElement \| undefined>` | Element to position against (trigger) |
| `floating` | `Ref<HTMLElement \| undefined>` | Floating element to position |
| `options` | `FloatingPositionOptions` | See below |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `placement` | `MaybeRefOrGetter<Placement>` | — | Preferred placement (`top`, `bottom-start`, `right-end`…), flipped automatically when space runs out |
| `open` | `MaybeRefOrGetter<boolean>` | — | Whether the floating element is shown; tracking only runs while open |
| `offset` | `number` | `8` | Distance between the reference and the floating element (px) |
| `arrow` | `Ref<HTMLElement \| undefined>` | — | Arrow to align with the reference (receives `left`/`top`) |
| `matchReferenceWidth` | `boolean` | `false` | Minimum width = reference width (dropdown lists) |
| `padding` | `number` | `8` | Minimum gap with the screen edges (px) |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `placement` | `Ref<Placement>` | Placement actually applied (after flipping), to orient an arrow or the animation |
| `update` | `() => Promise<void>` | Recomputes the position immediately (content changed while open) |

The applied placement is also set on the floating element as `data-placement`, usable in CSS:

```css
.menu[data-placement^='top'] {
  transform-origin: bottom center;
}
```
