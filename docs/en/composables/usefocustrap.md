# useFocusTrap

Keeps tabbing inside a container (side panel, modal popover, mobile menu) and returns focus to the original element on close. The Popover uses it in modal mode.

::: tip SuDialog doesn't need it
A `<dialog>` opened with `showModal()` already traps focus natively and makes the rest of the page inert.
:::

## Usage

```vue
<script setup>
import { ref } from 'vue'
import { useFocusTrap } from '@surgeui/ds-vue'

const isOpen = ref(false)
const panelRef = ref()

// Active while the panel is open
useFocusTrap(panelRef, { active: isOpen })
</script>

<template>
  <SuButton @click="isOpen = true">Filters</SuButton>

  <aside v-if="isOpen" ref="panelRef" aria-label="Filters">
    <SuInputField label="Search" />
    <SuButton @click="isOpen = false">Close</SuButton>
  </aside>
</template>
```

On activation, focus moves to the first focusable element (or `initialFocus`). Tab goes from the last element back to the first, Shift+Tab the other way. On deactivation, focus returns to the element that had it before.

## Behavior

- **Stacked traps**: a trap opened inside another takes over; when it closes, the previous one takes back control.
- **Dynamic content**: focusable elements are recomputed on every Tab (field added, button disabled…).
- **Focus escaping** (click, programmatic focus): it is brought back into the container.
- **Careful restoration**: focus is only returned if it is still inside the container; if the user clicked elsewhere, it is not stolen.
- **Empty container**: with no focusable element, the container itself receives focus (`tabindex="-1"`).

To close with Escape or an outside click, combine it with [useDismiss](/en/composables/usedismiss).

## API

```ts
useFocusTrap(target, options?)
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `active` | `MaybeRefOrGetter<boolean>` | — | Activates the trap while the value is true (otherwise `activate()` / `deactivate()`) |
| `initialFocus` | `(() => HTMLElement \| null) \| false` | first element | Element focused on activation; `false`: focus does not move |
| `returnFocus` | `boolean \| (() => HTMLElement \| null)` | `true` | Element that receives focus on deactivation |

### Return

| Property | Type | Description |
|----------|------|-------------|
| `active` | `Readonly<Ref<boolean>>` | The trap is active |
| `activate` | `() => void` | Activates the trap |
| `deactivate` | `() => void` | Deactivates the trap and returns focus |

### Other exports

| Export | Description |
|--------|-------------|
| `createFocusTrap(target, options?)` | Same trap, outside a component: `{ activate, deactivate, isActive }` |
| `getTabbableElements(container)` | Elements reachable with Tab, in DOM order |

::: info Migration
`accessibility.trapFocus()` is deprecated: it now goes through `createFocusTrap` and will be removed in a future major version.
:::
