<script setup>
import { ClipboardDocumentIcon } from '@heroicons/vue/24/outline'
</script>

# Tooltip

A short description of an element, shown on hover and keyboard focus. It is linked to its trigger with `aria-describedby`, can be hovered, and closes with Escape.

A tooltip holds text only. For interactive content (links, buttons, forms), use [Popover](/en/components/popover).

## Usage

### Basic usage

The trigger is the first element of the slot and must be focusable (button, link, field).

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTooltip content="Copy link">
        <SuButton variant="outline" :icon="ClipboardDocumentIcon" icon-display="only" aria-label="Copy" />
      </SuTooltip>
      <SuTooltip content="Saves the draft without publishing it">
        <SuButton variant="outline">Save</SuButton>
      </SuTooltip>
    </div>
  </div>
</div>

```vue
<script setup>
import { ClipboardDocumentIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuTooltip content="Copy link">
    <SuButton variant="outline" :icon="ClipboardDocumentIcon" icon-display="only" aria-label="Copy" />
  </SuTooltip>
</template>
```

### Placements and arrow

The placement flips automatically when space runs out.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTooltip content="On top" placement="top" show-arrow><SuButton variant="outline">top</SuButton></SuTooltip>
      <SuTooltip content="Below" placement="bottom" show-arrow><SuButton variant="outline">bottom</SuButton></SuTooltip>
      <SuTooltip content="On the left" placement="left" show-arrow><SuButton variant="outline">left</SuButton></SuTooltip>
      <SuTooltip content="On the right" placement="right" show-arrow><SuButton variant="outline">right</SuButton></SuTooltip>
    </div>
  </div>
</div>

```vue
<SuTooltip content="Below" placement="bottom" show-arrow>
  <SuButton variant="outline">bottom</SuButton>
</SuTooltip>
```

### Slot content and delays

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuTooltip :open-delay="0">
        <SuButton variant="outline">No delay</SuButton>
        <template #content>Save <kbd>Ctrl S</kbd></template>
      </SuTooltip>
    </div>
  </div>
</div>

```vue
<SuTooltip :open-delay="0">
  <SuButton variant="outline">No delay</SuButton>
  <template #content>Save <kbd>Ctrl S</kbd></template>
</SuTooltip>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | - | Tooltip text (or `content` slot) |
| `placement` | `PopoverPlacement` | `'top'` | `top`, `bottom`, `left`, `right`, with `-start` / `-end` |
| `openDelay` | `number` | `300` | Delay before opening on hover (ms); immediate on keyboard focus |
| `closeDelay` | `number` | `100` | Delay before closing (ms), time to move the pointer onto the tooltip |
| `showArrow` | `boolean` | `false` | Shows an arrow |
| `disabled` | `boolean` | `false` | Disables the tooltip |
| `modelValue` | `boolean` | `false` | Controlled open state (v-model, optional) |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Opened or closed |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Trigger (focusable element) |
| `content` | Tooltip content (text, no interactive element) |

### Exposed methods

| Method | Description |
|--------|-------------|
| `open()` / `close()` | Opens or closes the tooltip |

## Accessibility

- `role="tooltip"`, linked to the trigger with `aria-describedby` (existing ids are kept). The description is read even while the tooltip is hidden.
- Opens on hover (after `openDelay`) and keyboard focus (`:focus-visible`), not on click or touch: provide a visible label on mobile.
- WCAG 1.4.13: the tooltip stays open while the pointer is over it and while the trigger has focus; `Escape` closes it.
- An icon button keeps its own `aria-label`: the tooltip adds to it, it does not replace it.
