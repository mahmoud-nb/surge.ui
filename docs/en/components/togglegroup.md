# ToggleGroup

A group of toggles with exclusive or multi-selection. Supports connected mode, vertical/horizontal orientation, and ARIA roles adapted to the selection mode.

## Description

`ToggleGroup` displays a list of `Toggle` components and manages selection. In `exclusive` mode, only one toggle can be active at a time (similar to a radio group). In `multi` mode, multiple toggles can be active simultaneously. The connected mode (`gap="none"`) visually merges the toggles into a single block.

## Usage

### Multi-selection (default)

```vue
<script setup>
import { ref } from 'vue'

const format = ref(['bold'])
const items = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' }
]
</script>

<template>
  <SuToggleGroup
    v-model="format"
    :items="items"
    aria-label="Text format"
  />
</template>
```

### Exclusive selection

```vue
<script setup>
import { ref } from 'vue'
import { Bars3BottomLeftIcon, Bars3Icon, Bars3BottomRightIcon } from '@heroicons/vue/24/outline'

const align = ref(['center'])
const items = [
  { value: 'left', icon: Bars3BottomLeftIcon },
  { value: 'center', icon: Bars3Icon },
  { value: 'right', icon: Bars3BottomRightIcon }
]
</script>

<template>
  <SuToggleGroup
    v-model="align"
    :items="items"
    mode="exclusive"
    aria-label="Alignment"
  />
</template>
```

### Connected mode (gap=none)

```vue
<SuToggleGroup
  v-model="selected"
  :items="items"
  gap="none"
  mode="exclusive"
  aria-label="Alignment"
/>
```

### Vertical orientation

```vue
<SuToggleGroup
  v-model="selected"
  :items="items"
  orientation="vertical"
  gap="none"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `(string \| number)[]` | `[]` | Active values (v-model) |
| `items` | `ToggleGroupItem[]` | **required** | List of toggles |
| `mode` | `'exclusive' \| 'multi'` | `'multi'` | Selection mode |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Toggle size |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Visual variant |
| `radius` | `Radius` | `'md'` | Border radius |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Spacing (none = connected) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Group orientation |
| `disabled` | `boolean` | `false` | Disables the entire group |

### ToggleGroupItem

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string \| number` | Unique identifier (required) |
| `label` | `string` | Displayed text |
| `icon` | `Component` | Icon (inactive state) |
| `activeIcon` | `Component` | Icon (active state) |
| `disabled` | `boolean` | Disables this item |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `(string \| number)[]` | Emitted on change (v-model) |
| `change` | `(string \| number)[]` | New list of active values |
| `select` | `string \| number, boolean` | Selected item and its new state |

### Accessibility

- `role="radiogroup"` in exclusive mode, `role="group"` in multi mode
- Each toggle uses `role="switch"` with `aria-checked`
- Keyboard navigation: `Tab` between toggles, `Enter` / `Space` to toggle
- `aria-label` on the container to describe the group
