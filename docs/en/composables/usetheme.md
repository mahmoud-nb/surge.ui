# useTheme

Composable for theme management, light/dark mode switching, contrast, and motion preferences. Persists user preferences in `localStorage`.

## Basic usage

```vue
<script setup>
import { useTheme } from '@surgeui/vue'

const {
  themeName,
  isDarkMode,
  effectiveTheme,
  effectiveThemeMode,
  setTheme,
  setThemeMode,
  toggleMode,
  cycleTheme,
  availableThemes,
} = useTheme()
</script>

<template>
  <button @click="toggleMode">
    {{ isDarkMode ? 'Light mode' : 'Dark mode' }}
  </button>
</template>
```

## Available themes

5 built-in themes: `default`, `ocean`, `forest`, `sunset` (each supporting `light` / `dark` mode).

```vue
<script setup>
import { useTheme } from '@surgeui/vue'

const { setTheme, setThemeMode } = useTheme()

// Change the visual theme
setTheme('ocean')

// Change the brightness mode
setThemeMode('dark')   // 'light' | 'dark' | 'system'
</script>
```

## System detection

The composable automatically detects system preferences:

- **Dark mode**: `prefers-color-scheme: dark`
- **High contrast**: `prefers-contrast: more`
- **Reduced motion**: `prefers-reduced-motion: reduce`

```vue
<script setup>
import { useTheme } from '@surgeui/vue'

const { systemTheme, systemContrast, systemMotion } = useTheme()

// systemTheme.value → 'light' | 'dark'
// systemContrast.value → 'normal' | 'high'
// systemMotion.value → 'normal' | 'reduce'
</script>
```

In `system` mode, a change of the system preference (dark mode in the evening, a changed setting) applies at once, without reloading the page: `systemTheme`, `isDarkMode` and `data-theme-mode` on `<html>` follow.

## Options

```typescript
useTheme({
  availableThemes?: string[]     // Enabled themes (default: all)
  defaultTheme?: string          // Default theme ('default')
  defaultThemeMode?: ThemeMode   // Default mode ('light', see theme.config)
  storageKey?: string            // localStorage key ('su-theme-config')
  persist?: boolean              // Persist preferences (true)
})
```

The theme state is shared by the whole application. Each option comes from the first call that provides it: pass them in `App.vue` (its `setup` runs before the one of child components, such as `SuThemeToggle`, that call `useTheme()` without options). Preferences saved in `localStorage` still take precedence over `defaultTheme` and `defaultThemeMode`.

```vue
<!-- App.vue -->
<script setup>
import { useTheme } from '@surgeui/vue'

useTheme({ defaultThemeMode: 'system' })
</script>
```

## Lifecycle

- **In a component**: saved preferences are read on mount (no hydration mismatch with server rendering), then the system is followed as long as a component using `useTheme` is mounted. When the last one unmounts, the `matchMedia` listeners are removed. Called in `App.vue`, following lasts for the whole life of the application.
- **Outside a component** (`main.ts`, a store): following starts at once and lasts until the current effect scope (`effectScope`) ends, otherwise for the whole life of the page.

## API

### Reactive state

| Property | Type | Description |
|----------|------|-------------|
| `themeName` | `Ref<ThemeName>` | Current theme name |
| `themeMode` | `Ref<ThemeMode>` | Chosen brightness mode |
| `contrastMode` | `Ref<ContrastMode>` | Chosen contrast mode |
| `motionMode` | `Ref<MotionMode>` | Chosen motion mode |

### Resolved values

| Property | Type | Description |
|----------|------|-------------|
| `effectiveTheme` | `ComputedRef<ThemeName>` | Applied theme (with fallback) |
| `effectiveThemeMode` | `ComputedRef<'light' \| 'dark'>` | Effective brightness mode |
| `isDarkMode` | `ComputedRef<boolean>` | Dark mode active |
| `effectiveContrast` | `ComputedRef<'normal' \| 'high'>` | Effective contrast |
| `effectiveMotion` | `ComputedRef<'normal' \| 'reduce'>` | Effective motion |
| `currentThemeMetadata` | `ComputedRef<ThemeMetadata>` | Active theme metadata |

### System detection

| Property | Type | Description |
|----------|------|-------------|
| `systemTheme` | `ComputedRef<'light' \| 'dark'>` | System preference |
| `systemContrast` | `ComputedRef<'normal' \| 'high'>` | System contrast |
| `systemMotion` | `ComputedRef<'normal' \| 'reduce'>` | System motion |

### Actions

| Method | Description |
|--------|-------------|
| `setTheme(name)` | Set the visual theme |
| `setThemeMode(mode)` | Set the brightness mode |
| `setContrast(contrast)` | Set the contrast mode |
| `setMotion(motion)` | Set the motion mode |
| `toggleMode()` | Toggle between light and dark |
| `cycleTheme()` | Cycle through available themes |
| `clearConfig()` | Reset all preferences |

### Data

| Property | Type | Description |
|----------|------|-------------|
| `availableThemes` | `ComputedRef<ThemeMetadata[]>` | All available themes |
| `systemThemes` | `ComputedRef<ThemeMetadata[]>` | System themes |
| `colorThemes` | `ComputedRef<ThemeMetadata[]>` | Color themes |
