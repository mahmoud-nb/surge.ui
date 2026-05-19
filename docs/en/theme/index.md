# Theme System

The Design System provides a comprehensive and performant theme system with support for dark mode, high contrast, and reduced motion.

## Overview

### Themes × Modes Architecture

The system is built on two orthogonal dimensions:

| Dimension | Values | Role |
|-----------|--------|------|
| **Theme** (`data-theme`) | `default` \| `ocean` \| `forest` \| `sunset` | Visual identity / color palette |
| **Mode** (`data-theme-mode`) | `light` \| `dark` \| `system` | Brightness / contrast |

Each theme is available in both light **and** dark mode.

#### Available Themes

- **Default** - Classic neutral palette, suitable for any context
- **Ocean** - Maritime palette with ocean blue and coral accents
- **Forest** - Natural inspiration with forest greens and autumn orange
- **Sunset** - Warm ambiance with pink, violet, and orange

#### Available Modes

- **light** - Light mode (default)
- **dark** - Dark mode optimized for low-light environments
- **system** - Follows system preference automatically (`prefers-color-scheme`)

::: tip Default Behavior
Without any HTML attributes, the `default` theme in `light` mode is applied via a CSS fallback on `html:not([data-theme])`. The `system` mode is **not** enabled by default -  the user must explicitly choose it.
:::

::: warning Deprecated Names
The theme names `light` and `dark` (formerly standalone themes) are **deprecated**. They continue working in CSS and JS for backward compatibility but emit a console warning. Use `default` + `themeMode` instead.
:::

### CSS Strategy -  Dual HTML Attributes

The theme and mode are two separate HTML attributes on `<html>`:

```html
<!-- Default theme in light mode -->
<html data-theme="default" data-theme-mode="light">

<!-- Ocean theme in dark mode -->
<html data-theme="ocean" data-theme-mode="dark">

<!-- Forest theme following system preference -->
<html data-theme="forest" data-theme-mode="system">
```

Backward compatibility is ensured: `[data-theme='light']` and `[data-theme='dark']` still work in CSS (aliases defined in `default/index.scss`).

## Installation and Configuration

### Build Configuration

To optimize CSS bundle size, you can choose which themes to include during build.

#### Default Configuration (recommended)

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['default', 'ocean', 'forest', 'sunset'],
  defaultTheme: 'default',
  defaultThemeMode: 'light',
  prefix: 'su',
  highContrast: true,
  reducedMotion: true,
  storageKey: 'su-theme-config',
};
```

**Bundle size**: ~425 KB total (lib + styles)

#### Minimal Configuration

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['default'],           // Default theme only
  defaultTheme: 'default',
  defaultThemeMode: 'light',
  storageKey: 'my-company-theme',
};
```

#### Custom Configuration

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['default', 'ocean'], // Only the themes you need
  defaultTheme: 'default',
  defaultThemeMode: 'light',
  storageKey: 'my-company-theme',
};
```

### Loading in SCSS

```scss
// main.scss
@use './core/theme-loader' as loader;

// Option 1: Specific themes
@include loader.load-themes('default', 'ocean');

// Option 2: All themes
@include loader.load-all-themes();
```

## TypeScript Types

```typescript
// Theme (visual identity)
type ThemeName = 'default' | 'ocean' | 'forest' | 'sunset'

// Mode (brightness)
type ThemeMode = 'light' | 'dark' | 'system'

// Contrast and motion (unchanged)
type ContrastMode = 'normal' | 'high' | 'auto'
type MotionMode   = 'normal' | 'reduce' | 'auto'

// Deprecated -  backward compatibility only
type DeprecatedThemeName = 'light' | 'dark'
```

## Usage

### `useTheme` Composable

The `useTheme` composable is the main entry point for managing themes.

```vue
<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const {
  // Reactive state
  themeName,            // Ref<ThemeName> -  active visual identity
  themeMode,            // Ref<ThemeMode> -  'light' | 'dark' | 'system'
  contrastMode,         // Ref<ContrastMode>
  motionMode,           // Ref<MotionMode>

  // Computed
  effectiveTheme,       // ComputedRef<ThemeName> -  resolved theme (never 'system')
  effectiveThemeMode,   // ComputedRef<'light' | 'dark'> -  resolved mode
  isDarkMode,           // ComputedRef<boolean>

  // Actions
  setTheme,             // (theme: ThemeName) => void
  setThemeMode,         // (mode: ThemeMode) => void
  toggleMode,           // () => void -  toggle between light and dark
  cycleTheme,           // () => void -  cycle through available themes
  clearConfig,          // () => void -  reset to defaultTheme + defaultThemeMode
} = useTheme();
</script>
```

### Composable Options

```typescript
useTheme({
  // Override available themes
  availableThemes: ['default', 'ocean'],

  // Default theme
  defaultTheme: 'default',

  // Default mode (NEW)
  defaultThemeMode: 'light',

  // Custom localStorage key
  storageKey: 'my-app-theme',

  // Disable persistence
  persist: false
});
```

### Changing the Theme

#### Change Visual Identity

```vue
<template>
  <button @click="setTheme('ocean')">Ocean Theme</button>
  <button @click="setTheme('forest')">Forest Theme</button>
  <button @click="setTheme('default')">Default Theme</button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { setTheme } = useTheme();
</script>
```

#### Change Brightness Mode

```vue
<template>
  <button @click="setThemeMode('dark')">Dark Mode</button>
  <button @click="setThemeMode('light')">Light Mode</button>
  <button @click="setThemeMode('system')">Follow System</button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { setThemeMode } = useTheme();
</script>
```

#### Toggle Light / Dark

```vue
<template>
  <button @click="toggleMode">
    {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { toggleMode, isDarkMode } = useTheme();
</script>
```

#### Cycle Through Themes

```vue
<template>
  <button @click="cycleTheme">
    Next theme: {{ effectiveTheme }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { cycleTheme, effectiveTheme } = useTheme();
</script>
```

## Components

### ThemeSelector

Complete component for theme selection with visual interface.

```vue
<template>
  <ThemeSelector />
</template>

<script setup lang="ts">
import ThemeSelector from '@/components/ThemeSelector.vue';
</script>
```

**Features**:
- Visual preview of each theme
- Mode selection (light / dark / system)
- Contrast selection (normal / high)
- Animation configuration (normal / reduced)
- Detected system preferences display
- Reset button

### ThemeToggle

Compact button to quickly toggle between modes.

```vue
<template>
  <ThemeToggle />
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>
```

**Features**:
- Dynamic icon based on active mode
- Mode label (hidden on mobile)
- Transition animation
- Cycle through all available themes

## Accessibility

### High Contrast

The system automatically supports high contrast mode, essential for accessibility.

#### Automatic Detection

```vue
<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { effectiveContrast, systemContrast } = useTheme();
// effectiveContrast: 'normal' | 'high'
// systemContrast: detected system preference
</script>
```

#### Manual Configuration

```vue
<template>
  <select :value="contrastMode" @change="setContrast($event.target.value)">
    <option value="auto">Automatic</option>
    <option value="normal">Normal</option>
    <option value="high">High</option>
  </select>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { contrastMode, setContrast } = useTheme();
</script>
```

#### High Contrast Mode Behavior

- Pure colors (pure black / pure white)
- Reinforced borders
- Removal of transparency effects
- Minimum contrast ratio of 7:1 (WCAG AAA)

### Reduced Motion

Respects `prefers-reduced-motion` for users sensitive to movement.

```vue
<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';

const { motionMode, setMotion } = useTheme();
</script>

<template>
  <select :value="motionMode" @change="setMotion($event.target.value)">
    <option value="auto">Automatic</option>
    <option value="normal">Enabled</option>
    <option value="reduce">Reduced</option>
  </select>
</template>
```

**Effect**:
- All transitions become instantaneous (`0ms`)
- Animations are disabled
- Scale transforms are neutralized

## Usage in Components

### Access Color Tokens

Use automatically generated CSS variables:

```vue
<style scoped lang="scss">
.my-component {
  // Text
  color: var(--su-text-primary);

  // Background
  background-color: var(--su-bg-surface);

  // Border
  border: 1px solid var(--su-border-default);

  // Primary color
  background-color: var(--su-primary-default);

  // Inverted section (dark bg on light page, or the reverse)
  &--inverted {
    background-color: var(--su-bg-inverse);
    color: var(--su-text-on-inverse);
    border-color: var(--su-border-inverse);
  }

  // States
  &--success {
    color: var(--su-state-success);
    background-color: var(--su-state-success-bg);
  }

  &:hover {
    background-color: var(--su-bg-hover);
  }

  &:focus-visible {
    border-color: var(--su-border-focus);
  }
}
</style>
```

### Utility Mixins

```vue
<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.my-button {
  // Automatic transitions with reduced-motion support
  @include transition(background-color, transform);

  // Accessible focus ring
  &:focus-visible {
    @include focus-ring;
  }

  // Complete interactive states
  @include interactive-states;

  // Elevated surface
  @include surface($elevated: true);
}
</style>
```

## Advanced Customization with Custom CSS Variables

The theme system supports dynamic color customization via **custom CSS variables**. This allows you to override theme colors without creating a complete new theme.

### How it Works

The custom variables system uses a **CSS fallback mechanism**:

```scss
// Automatically generated for each token
--su-primary-default: var(--su-custom-primary-default, #3b82f6);
```

**Flow**:
1. User defines `--su-custom-primary-default: #dc2626`
2. CSS resolves `var(--su-custom-primary-default, ...)` → `#dc2626`
3. All components using `--su-primary-default` receive the new value
4. If no custom is defined, fallback to theme value

### `useCustomTheme` Composable

The `useCustomTheme` composable manages custom CSS variables reactively.

```vue
<script setup lang="ts">
import { useCustomTheme } from '@surgeui/ds-vue'

const {
  applyCustomTheme,    // Apply entire custom theme
  setCustomVariable,   // Set individual variable
  getCustomTheme,      // Get current custom theme
  resetCustomTheme,    // Reset all customs
  mergeWithTheme,      // Merge with existing theme
  customTheme          // Reactive theme state
} = useCustomTheme()
</script>
```

### Usage Examples

#### 1. Apply Complete Custom Theme

```vue
<script setup lang="ts">
import { useCustomTheme } from '@surgeui/ds-vue'

const { applyCustomTheme } = useCustomTheme()

const applyBrandTheme = () => {
  applyCustomTheme({
    textPrimary: '#1f2937',
    bgSurface: '#ffffff',
    bgCanvas: '#f9fafb',
    primaryDefault: '#dc2626',
    primaryHover: '#b91c1c',
    primaryActive: '#991b1b',
    primaryText: '#ffffff',
    stateSuccess: '#059669',
    stateError: '#dc2626'
  })
}
</script>

<template>
  <button @click="applyBrandTheme">
    Apply Brand Theme
  </button>
</template>
```

#### 2. Modify Individual Color

```vue
<script setup lang="ts">
import { useCustomTheme } from '@surgeui/ds-vue'

const { setCustomVariable } = useCustomTheme()

// Simple color change
setCustomVariable('primaryDefault', '#3b82f6')

// Reactive with input
const handleColorChange = (color: string) => {
  setCustomVariable('primaryDefault', color)
}
</script>

<template>
  <input
    type="color"
    @input="(e) => handleColorChange((e.target as HTMLInputElement).value)"
    placeholder="Select primary color"
  >
</template>
```

#### 3. Combine Theme, Mode, and Brand Colors

```vue
<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue'
import { useCustomTheme } from '@surgeui/ds-vue'

const { setTheme, setThemeMode } = useTheme()
const { setCustomVariable } = useCustomTheme()

const applyDarkWithBrand = () => {
  // Switch to default theme in dark mode
  setTheme('default')
  setThemeMode('dark')

  // Override with brand colors
  setCustomVariable('primaryDefault', '#db2777')
  setCustomVariable('primaryHover', '#be185d')
}
</script>

<template>
  <button @click="applyDarkWithBrand">
    Dark Mode + Brand
  </button>
</template>
```

### Available Custom Variables

You can customize any theme token using the `--su-custom-<token-name>` format:

**Text**:
- `--su-custom-text-primary`
- `--su-custom-text-secondary`
- `--su-custom-text-tertiary`
- `--su-custom-text-disabled`
- `--su-custom-text-inverse`

**Backgrounds**:
- `--su-custom-bg-canvas`
- `--su-custom-bg-surface`
- `--su-custom-bg-surface-elevated`
- `--su-custom-bg-hover`
- `--su-custom-bg-active`
- `--su-custom-bg-selected`
- `--su-custom-bg-disabled`
- `--su-custom-bg-inverse`
- `--su-custom-bg-inverse-subtle`

**Borders**:
- `--su-custom-border-default`
- `--su-custom-border-subtle`
- `--su-custom-border-strong`
- `--su-custom-border-focus`
- `--su-custom-border-disabled`
- `--su-custom-border-inverse`

**Actions**:
- `--su-custom-primary-default`
- `--su-custom-primary-hover`
- `--su-custom-primary-active`
- `--su-custom-primary-disabled`
- `--su-custom-primary-text`
- `--su-custom-secondary-default`
- `--su-custom-secondary-hover`
- `--su-custom-secondary-active`
- `--su-custom-secondary-disabled`
- `--su-custom-secondary-text`

**States**:
- `--su-custom-state-success`
- `--su-custom-state-success-bg`
- `--su-custom-state-warning`
- `--su-custom-state-warning-bg`
- `--su-custom-state-error`
- `--su-custom-state-error-bg`
- `--su-custom-state-info`
- `--su-custom-state-info-bg`

### Benefits of This Approach

✅ **Dynamic** - Instant changes without page reload
✅ **Flexible** - Customize partially or completely
✅ **Performant** - No SCSS recompilation, CSS only
✅ **Compatible** - Works with all themes and all modes
✅ **Persistent** - Compatible with localStorage for user preferences

## Create a Custom Theme

### 1. New File Structure (separate light + dark tokens)

```
styles/themes/
├── _registry.scss
├── _schema.scss          ← Required token validation
├── default/
│   ├── _color.scss
│   ├── index.scss
│   └── tokens/
│       ├── light.scss
│       └── dark.scss
├── ocean/    (same structure)
├── forest/   (same structure)
├── sunset/   (same structure)
└── custom/   ← Your theme
    ├── index.scss
    └── tokens/
        ├── light.scss
        └── dark.scss
```

### 2. Define Light Tokens

```scss
// themes/custom/tokens/light.scss
$theme-custom-light: (
  'text-primary': #1a202c,
  'text-secondary': #2d3748,
  'text-tertiary': #4a5568,

  'bg-canvas': #f7fafc,
  'bg-surface': #ffffff,

  'border-default': #cbd5e0,
  'border-focus': #4299e1,

  'primary-default': #4299e1,
  'primary-hover': #3182ce,
  'primary-text': #ffffff,

  // ... other tokens
);
```

### 3. Define Dark Tokens

```scss
// themes/custom/tokens/dark.scss
$theme-custom-dark: (
  'text-primary': #f7fafc,
  'text-secondary': #e2e8f0,
  'text-tertiary': #a0aec0,

  'bg-canvas': #1a202c,
  'bg-surface': #2d3748,

  'border-default': #4a5568,
  'border-focus': #63b3ed,

  'primary-default': #63b3ed,
  'primary-hover': #4299e1,
  'primary-text': #1a202c,

  // ... other tokens
);
```

### 4. Register Theme with Both Modes

```scss
// themes/custom/index.scss
@use '../_registry' as registry;
@use './tokens/light' as *;
@use './tokens/dark' as *;

[data-theme='custom'][data-theme-mode='light'] {
  @include registry.generate-theme-vars($theme-custom-light);
}

[data-theme='custom'][data-theme-mode='dark'] {
  @include registry.generate-theme-vars($theme-custom-dark);
}
```

### 5. Add TypeScript Metadata

```typescript
// composables/useTheme.ts
const ALL_THEMES: ThemeMetadata[] = [
  // ... other themes
  {
    id: 'custom',
    name: 'Custom',
    description: 'My custom theme',
    category: 'color',
    preview: {
      primary: '#4299e1',
      background: '#f7fafc',
      surface: '#ffffff'
    },
    available: themeConfig.themes.includes('custom')
  }
];
```

## API Reference

### `useTheme(options?)`

#### Options

```typescript
interface UseThemeOptions {
  availableThemes?: ThemeName[];
  defaultTheme?: ThemeName;
  defaultThemeMode?: ThemeMode;  // NEW
  storageKey?: string;
  persist?: boolean;
}
```

#### Return

```typescript
{
  // Reactive state
  themeName: Ref<ThemeName>;
  themeMode: Ref<ThemeMode>;             // NEW
  contrastMode: Ref<ContrastMode>;
  motionMode: Ref<MotionMode>;

  // Computed
  effectiveTheme: ComputedRef<ThemeName>;
  effectiveThemeMode: ComputedRef<'light' | 'dark'>;  // NEW
  effectiveContrast: ComputedRef<'normal' | 'high'>;
  effectiveMotion: ComputedRef<'normal' | 'reduce'>;
  systemContrast: ComputedRef<'normal' | 'high'>;
  systemMotion: ComputedRef<'normal' | 'reduce'>;
  isDarkMode: ComputedRef<boolean>;

  // Data
  availableThemes: ComputedRef<ThemeMetadata[]>;

  // Actions
  setTheme: (theme: ThemeName) => void;
  setThemeMode: (mode: ThemeMode) => void;   // NEW
  toggleMode: () => void;                    // NEW -  replaces toggleTheme
  cycleTheme: () => void;
  setContrast: (contrast: ContrastMode) => void;
  setMotion: (motion: MotionMode) => void;
  clearConfig: () => void;
}
```

::: warning toggleTheme deprecated
`toggleTheme()` is kept for backward compatibility but emits a console warning. Use `toggleMode()` instead.
:::

## Practical Examples

### Dashboard with Theme Selector

```vue
<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>My Dashboard</h1>
      <ThemeToggle />
    </header>

    <aside class="dashboard-sidebar">
      <ThemeSelector />
    </aside>

    <main class="dashboard-content">
      <!-- Content -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@surgeui/ds-vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import ThemeSelector from '@/components/ThemeSelector.vue';

useTheme();
</script>

<style scoped lang="scss">
.dashboard {
  min-height: 100vh;
  background-color: var(--su-bg-canvas);
  color: var(--su-text-primary);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  padding: var(--su-spacing-4);
  background-color: var(--su-bg-surface);
  border-bottom: 1px solid var(--su-border-default);
}
</style>
```

### Persistent User Preference

```vue
<script setup lang="ts">
import { watch } from 'vue';
import { useTheme } from '@surgeui/ds-vue';

const { themeName, themeMode, effectiveThemeMode } = useTheme({
  defaultTheme: 'default',
  defaultThemeMode: 'system',
  storageKey: 'user-preferences-theme',
  persist: true
});

// Analytics tracking on mode change
watch(effectiveThemeMode, (newMode) => {
  console.log('Mode changed to:', newMode);
  // analytics.track('theme_mode_changed', { mode: newMode });
});
</script>
```

### Force Theme for a Section

```vue
<template>
  <!-- Force default theme in dark mode for this section -->
  <div data-theme="default" data-theme-mode="dark" class="promo-section">
    <h2>Section with Forced Theme</h2>
    <p>This section stays dark even if the app is in light mode</p>
  </div>
</template>

<style scoped lang="scss">
.promo-section {
  padding: var(--su-spacing-8);
  background-color: var(--su-bg-canvas);
  color: var(--su-text-primary);
}
</style>
```

### Inverted Section with Inversion Tokens

```vue
<template>
  <!-- Section that contrasts with context without forcing a full theme -->
  <div class="hero-section">
    <h1>Compelling Title</h1>
    <p>Featured description</p>
  </div>
</template>

<style scoped lang="scss">
.hero-section {
  background-color: var(--su-bg-inverse);
  color: var(--su-text-on-inverse);
  border: 1px solid var(--su-border-inverse);

  // Secondary surface on inverted background
  .hero-section__card {
    background-color: var(--su-surface-inverse);
  }
}
</style>
```

## Performance

### Built-in Optimizations

- **CSS Variables**: Instant theme change without reload
- **Dual attributes**: CSS selectors targeted by `[data-theme][data-theme-mode]`
- **Lazy loading**: Only configured themes are included in bundle
- **Tree-shaking**: Unused themes = 0 bytes
- **localStorage**: Persistence without network overhead

### Size Comparison

| Configuration | Total Bundle Size | Themes Included |
|--------------|-------------------|-----------------|
| Minimal | ~200 KB | Default only |
| Standard | ~300 KB | Default + 1 color theme |
| Complete | ~425 KB | All themes |

### Recommendations

::: tip Corporate Applications
Use only `default` to minimize bundle size.
:::

::: tip Creative Applications
Include all themes for a rich personalized experience.
:::

::: tip Marketing Sites
Choose 1-2 color themes aligned with your brand identity.
:::

## Troubleshooting

### Theme Not Applied

Check that:
1. Theme is included in `theme.config.ts`
2. Theme is loaded in `main.scss`
3. `useTheme()` is called in `App.vue` or a parent
4. Both `data-theme` **and** `data-theme-mode` attributes are present on `<html>`

### Colors Not Changing

Make sure to use CSS variables:
```scss
// ❌ Wrong
color: #111827;

// ✅ Correct
color: var(--su-text-primary);
```

### Theme Unavailable in Production

Check that the theme is in the `themes` list of `theme.config.ts` and imported in the loader.

### Preferences Not Saved

Check that `persist: true` is configured and localStorage is accessible (not in private navigation).

### Console Warning on `setTheme('dark')`

`setTheme('dark')` and `setTheme('light')` are deprecated. Replace with:
```typescript
// Before (deprecated)
setTheme('dark')

// After
setThemeMode('dark')
```

## Resources

- [Color Guide](./colors.md)
- [Semantic Tokens](./tokens.md)
- [Accessibility](./accessibility.md)
- [Complete Examples](./examples.md)
