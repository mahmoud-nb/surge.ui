# useBreakpoint

Composable for reactive breakpoint detection. Uses `window.matchMedia` for performant detection without listening to the `resize` event. SSR compatible.

## Basic usage

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { current, isUp, isDown, isBetween, matches } = useBreakpoint()
</script>

<template>
  <div>
    <p>Active breakpoint: {{ current }}</p>
    <p>Desktop: {{ isUp('lg') }}</p>
    <p>Mobile: {{ isDown('md') }}</p>
  </div>
</template>
```

## Default breakpoints

| Breakpoint | Min width | Description |
|------------|-----------|-------------|
| `xs` | < 640px | Portrait phone |
| `sm` | 640px | Landscape phone |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large screen |
| `2xl` | 1536px | Extra large screen |

## Examples

### Conditional rendering

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { isUp, isDown } = useBreakpoint()
</script>

<template>
  <!-- Desktop navigation -->
  <nav v-if="isUp('lg')">
    <a href="/">Home</a>
    <a href="/docs">Docs</a>
  </nav>

  <!-- Mobile hamburger -->
  <button v-if="isDown('lg')">
    Menu
  </button>
</template>
```

### Responsive grid

```vue
<script setup>
import { computed } from 'vue'
import { useBreakpoint } from '@surgeui/ds-vue'

const { current } = useBreakpoint()

const columns = computed(() => {
  switch (current.value) {
    case '2xl':
    case 'xl': return 4
    case 'lg': return 3
    case 'md': return 2
    default: return 1
  }
})
</script>
```

### Breakpoint range

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { isBetween } = useBreakpoint()

// true if >= 640px and < 1024px (tablet)
const isTablet = isBetween('sm', 'lg')
</script>
```

### Custom breakpoints

```vue
<script setup>
import { useBreakpoint } from '@surgeui/ds-vue'

const { current, matches } = useBreakpoint({
  breakpoints: {
    sm: 480,
    md: 768,
    lg: 1200,
    xl: 1440,
    '2xl': 1920,
  }
})
</script>
```

## API

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `breakpoints` | `BreakpointConfig` | See above | Override thresholds |

### Return

| Property | Type | Description |
|----------|------|-------------|
| `current` | `ComputedRef<BreakpointKey \| 'xs'>` | Largest active breakpoint |
| `width` | `Readonly<Ref<number>>` | Viewport width in pixels |
| `matches` | `Readonly<Ref<BreakpointMatches>>` | Reactive object `{ sm: bool, md: bool, ... }` |
| `isUp(bp)` | `(bp: BreakpointKey) => boolean` | true if width >= breakpoint |
| `isDown(bp)` | `(bp: BreakpointKey) => boolean` | true if width < breakpoint |
| `isBetween(min, max)` | `(min, max) => boolean` | true if >= min and < max |
| `breakpoints` | `Readonly<Ref<BreakpointConfig>>` | Configuration used |

### Types

```typescript
type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface BreakpointConfig {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

interface BreakpointMatches {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  '2xl': boolean
}
```

## Performance

- Uses `matchMedia` instead of listening to `resize` — no debounce needed
- Each breakpoint has its own `MediaQueryList` listener
- `ResizeObserver` on `documentElement` for exact width tracking
- Automatic cleanup via `onUnmounted`
