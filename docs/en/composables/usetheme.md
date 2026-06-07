# useTheme

Composable for theme management, light/dark mode switching, contrast, and motion preferences. Persists user preferences in `localStorage`.

## Basic usage

```vue
<script setup>
import { useTheme } from '@surgeui/ds-vue'

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
import { useTheme } from '@surgeui/ds-vue'

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
import { useTheme } from '@surgeui/ds-vue'

const { systemTheme, systemContrast, systemMotion } = useTheme()

// systemTheme.value → 'light' | 'dark'
// systemContrast.value → 'normal' | 'high'
// systemMotion.value → 'normal' | 'reduce'
</script>
```

## Options

```typescript
useTheme({
  availableThemes?: string[]     // Enabled themes (default: all)
  defaultTheme?: string          // Default theme ('default')
  defaultThemeMode?: ThemeMode   // Default mode ('auto')
  storageKey?: string            // localStorage key ('su-theme-config')
  persist?: boolean              // Persist preferences (true)
})
```

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
