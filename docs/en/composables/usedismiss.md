# useDismiss

Closes a layered element (popover, menu, dropdown list, panel) with Escape, a pointer down outside or focus loss. Popover, Dropdown and SelectBox use it.

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { useDismiss } from '@surgeui/ds-vue'

const isOpen = ref(false)
const triggerRef = ref()
const panelRef = ref()

const close = (returnFocus) => {
  isOpen.value = false
  if (returnFocus) triggerRef.value?.focus()
}

// The trigger and the panel form the "inside"
useDismiss([triggerRef, panelRef], {
  enabled: isOpen,
  onDismiss: (reason) => close(reason === 'escape')
})
</script>

<template>
  <button ref="triggerRef" :aria-expanded="isOpen" @click="isOpen = !isOpen">Options</button>
  <div v-if="isOpen" ref="panelRef">…</div>
</template>
```

## Layers

Each open element forms a layer; layers stack in opening order.

- **Escape** only closes the top layer. In a popover containing an open SelectBox, Escape closes the list, then the popover on the second press.
- **Inside a SuDialog**, Escape closes the layer without closing the dialog: the event is canceled before the browser triggers the native close.
- **Pointer down outside**: every layer the pointer is outside of closes. A pointer down inside a layer opened above (submenu, list teleported to `body`) does not count as outside for the ones below.
- The pointer is detected on `pointerdown`, before the click: clicking the trigger does not close then reopen the element.

## API

```ts
useDismiss(targets, options)
```

`targets`: one element or a list of elements (refs or getters) forming the inside.

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `MaybeRefOrGetter<boolean>` | — | The layer is active (element open) |
| `onDismiss` | `(reason, event) => void` | — | Called to close; `reason`: `'escape'`, `'outside'` or `'focus-outside'` |
| `escape` | `MaybeRefOrGetter<boolean>` | `true` | Close with Escape |
| `outside` | `MaybeRefOrGetter<boolean>` | `true` | Close on pointer down outside the elements |
| `focusOutside` | `MaybeRefOrGetter<boolean>` | `false` | Close when focus leaves the elements |

### Return

| Property | Type | Description |
|----------|------|-------------|
| `isTopLayer` | `() => boolean` | The layer is the top one (the only one reacting to Escape) |

## Accessibility

- Return focus to the trigger when closing comes from Escape (`reason === 'escape'`), not after a click elsewhere: the user chose where to go.
- Content shown on hover or focus must be dismissable without moving the pointer or focus (WCAG 1.4.13): keep `escape` enabled.
