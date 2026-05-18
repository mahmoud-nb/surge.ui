# Toggle

A toggleable button with two states (on/off). Accepts a text label or icon, with full accessibility via `role="switch"` and `aria-checked`.

## Description

`Toggle` is an atomic component for toggling a boolean state. Unlike `Switch` which looks like a physical switch, `Toggle` appears as a button whose visual state changes when active/inactive. Ideal for toolbars (bold, italic), favorites, or filters.

## Usage

### Simple toggle with label

```vue
<script setup>
import { ref } from 'vue'

const isBold = ref(false)
</script>

<template>
  <SuToggle v-model="isBold" label="Bold" />
</template>
```

### Toggle with icon

```vue
<script setup>
import { ref } from 'vue'
import { BoldIcon, ItalicIcon } from '@heroicons/vue/24/outline'

const bold = ref(false)
const italic = ref(false)
</script>

<template>
  <SuToggle v-model="bold" :icon="BoldIcon" aria-label="Bold" />
  <SuToggle v-model="italic" :icon="ItalicIcon" aria-label="Italic" />
</template>
```

### Variants

```vue
<SuToggle label="Default" variant="default" />
<SuToggle label="Outline" variant="outline" />
<SuToggle label="Ghost" variant="ghost" />
```

### Sizes

```vue
<SuToggle label="Small" size="sm" />
<SuToggle label="Medium" size="md" />
<SuToggle label="Large" size="lg" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Toggle state (v-model) |
| `label` | `string` | — | Text displayed in the toggle |
| `icon` | `Component` | — | Icon displayed (inactive state) |
| `activeIcon` | `Component` | — | Icon displayed when active (replaces `icon`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Visual variant |
| `radius` | `Radius` | `'md'` | Border radius |
| `disabled` | `boolean` | `false` | Disables the toggle |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted on state change (v-model) |
| `change` | `boolean` | Emitted on state change with new value |

### Accessibility

- `role="switch"` with `aria-checked` to indicate state
- Keyboard navigation: `Tab` for focus, `Enter` / `Space` to toggle
- `aria-label` automatically derived from `label` if not explicitly provided
- Screen reader compatible
