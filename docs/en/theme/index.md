# Theme System

The Design System provides a comprehensive and performant theme system with support for dark mode, high contrast, and reduced motion.

## Overview

### Available Themes

The system provides **5 themes** organized in two categories:

#### System Themes
- **Light** - Classic light theme, ideal for daytime use
- **Dark** - Dark theme optimized for low-light environments

#### Color Themes
- **Ocean** - Maritime palette with ocean blue and coral accents
- **Forest** - Natural inspiration with forest greens and autumn orange
- **Sunset** - Warm ambiance with pink, violet, and orange

::: tip Auto Mode
The `auto` mode automatically detects the user's system preferences (`prefers-color-scheme`) and applies the corresponding theme.
:::

## Installation and Configuration

### Build Configuration

To optimize CSS bundle size, you can choose which themes to include during build.

#### Default Configuration (recommended)

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['light', 'dark'], // Only essential themes
  defaultTheme: 'auto',
  prefix: 'su',
  highContrast: true,
  reducedMotion: true,
  storageKey: 'su-theme-config',
};
```

**Bundle size**: ~8-10 KB CSS

#### All Themes

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['light', 'dark', 'ocean', 'forest', 'sunset'],
  defaultTheme: 'auto',
};
```

**Bundle size**: ~25-30 KB CSS

#### Custom Configuration

```typescript
// theme.config.ts
export const themeConfig = {
  themes: ['light', 'dark', 'ocean'], // Only the themes you need
  defaultTheme: 'light',
  storageKey: 'my-company-theme',
};
```

### Loading in SCSS

```scss
// main.scss
@use './core/theme-loader' as loader;

// Option 1: Specific themes
@include loader.load-themes('light', 'dark');

// Option 2: All themes
@include loader.load-all-themes();

// Option 3: Custom selection
@include loader.load-themes('light', 'dark', 'ocean');
```

## Usage

### `useTheme` Composable

The `useTheme` composable is the main entry point for managing themes.

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { 
  themeName,           // Selected theme ('auto' | 'light' | 'dark' | 'ocean' | 'forest' | 'sunset')
  effectiveTheme,      // Effective theme applied
  setTheme,            // Change theme
  toggleTheme,         // Toggle light/dark
  availableThemes,     // List of available themes
  isDarkMode           // Boolean to know if in dark mode
} = useTheme();
</script>
```

### Composable Options

```typescript
useTheme({
  // Override available themes
  availableThemes: ['light', 'dark', 'ocean'],
  
  // Default theme
  defaultTheme: 'auto',
  
  // Custom localStorage key
  storageKey: 'my-app-theme',
  
  // Disable persistence
  persist: false
});
```

### Change Theme

#### Direct Method

```vue
<template>
  <button @click="setTheme('dark')">Dark Mode</button>
  <button @click="setTheme('ocean')">Ocean Theme</button>
  <button @click="setTheme('auto')">Automatic</button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { setTheme } = useTheme();
</script>
```

#### Simple Toggle

```vue
<template>
  <button @click="toggleTheme">
    {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { toggleTheme, isDarkMode } = useTheme();
</script>
```

#### Cycle Through Themes

```vue
<template>
  <button @click="cycleTheme">
    Next theme: {{ currentThemeMetadata.name }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { cycleTheme, currentThemeMetadata } = useTheme();
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
- Contrast selection (normal / high)
- Animation configuration (normal / reduced)
- Detected system preferences display
- Reset button

### ThemeToggle

Compact button to quickly toggle between themes.

```vue
<template>
  <ThemeToggle />
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
</script>
```

**Features**:
- Dynamic icon based on active theme
- Theme label (hidden on mobile)
- Transition animation
- Cycle through all available themes

## Accessibility

### High Contrast

The system automatically supports high contrast mode, essential for accessibility.

#### Automatic Detection

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

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
import { useTheme } from '@/composables/useTheme';

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
import { useTheme } from '@/composables/useTheme';

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

## Available Tokens

### Text

| Token | Description |
|-------|-------------|
| `--su-text-primary` | Primary text (maximum contrast) |
| `--su-text-secondary` | Secondary text |
| `--su-text-tertiary` | Tertiary text (less important) |
| `--su-text-disabled` | Disabled text |
| `--su-text-inverse` | Text on dark background |

### Links

| Token | Description |
|-------|-------------|
| `--su-link-default` | Default link color |
| `--su-link-hover` | Hover color |
| `--su-link-visited` | Visited links |
| `--su-link-muted` | Secondary links |

### Backgrounds

| Token | Description |
|-------|-------------|
| `--su-bg-canvas` | Global app background |
| `--su-bg-surface` | Background for cards, modals |
| `--su-bg-surface-elevated` | Elevated surface (with shadows) |
| `--su-bg-hover` | Hover background |
| `--su-bg-active` | Active state background |
| `--su-bg-selected` | Selected background |
| `--su-bg-disabled` | Disabled background |

### Borders

| Token | Description |
|-------|-------------|
| `--su-border-default` | Default border |
| `--su-border-subtle` | Subtle border |
| `--su-border-strong` | Reinforced border |
| `--su-border-focus` | Focus border (accessibility) |
| `--su-border-disabled` | Disabled border |

### States

| Token | Description |
|-------|-------------|
| `--su-state-success` | Success color |
| `--su-state-success-bg` | Success background |
| `--su-state-warning` | Warning color |
| `--su-state-warning-bg` | Warning background |
| `--su-state-error` | Error color |
| `--su-state-error-bg` | Error background |
| `--su-state-info` | Info color |
| `--su-state-info-bg` | Info background |

### Primary Actions

| Token | Description |
|-------|-------------|
| `--su-primary-default` | Primary color |
| `--su-primary-hover` | Primary on hover |
| `--su-primary-active` | Primary on active state |
| `--su-primary-disabled` | Primary disabled |
| `--su-primary-text` | Text on primary |

### Secondary Actions

| Token | Description |
|-------|-------------|
| `--su-secondary-default` | Secondary color |
| `--su-secondary-hover` | Secondary on hover |
| `--su-secondary-active` | Secondary on active state |
| `--su-secondary-disabled` | Secondary disabled |
| `--su-secondary-text` | Text on secondary |

## Create a Custom Theme

### 1. Create Structure

```
styles/
└── themes/
    └── custom/
        ├── _tokens.scss
        └── index.scss
```

### 2. Define Tokens

```scss
// themes/custom/_tokens.scss
@use '../../foundations/colors' as *;

$theme-custom: (
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

### 3. Register Theme

```scss
// themes/custom/index.scss
@use '../_registry' as registry;
@use './_tokens' as *;

@include registry.register-theme('custom', $theme-custom);

[data-theme='custom'] {
  @include registry.generate-theme-vars($theme-custom);
}
```

### 4. Load Theme

```scss
// main.scss
@include loader.load-themes('light', 'dark', 'custom');
```

### 5. Add Metadata

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
  storageKey?: string;
  persist?: boolean;
}
```

#### Return

```typescript
{
  // Reactive state
  themeName: Ref<ThemeName>;
  contrastMode: Ref<ContrastMode>;
  motionMode: Ref<MotionMode>;
  
  // Computed
  effectiveTheme: ComputedRef<Exclude<ThemeName, 'auto'>>;
  effectiveContrast: ComputedRef<'normal' | 'high'>;
  effectiveMotion: ComputedRef<'normal' | 'reduce'>;
  systemTheme: ComputedRef<'light' | 'dark'>;
  systemContrast: ComputedRef<'normal' | 'high'>;
  systemMotion: ComputedRef<'normal' | 'reduce'>;
  currentThemeMetadata: ComputedRef<ThemeMetadata>;
  isDarkMode: ComputedRef<boolean>;
  
  // Data
  availableThemes: ComputedRef<ThemeMetadata[]>;
  systemThemes: ComputedRef<ThemeMetadata[]>;
  colorThemes: ComputedRef<ThemeMetadata[]>;
  
  // Actions
  setTheme: (theme: ThemeName) => void;
  setContrast: (contrast: ContrastMode) => void;
  setMotion: (motion: MotionMode) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;
  clearConfig: () => void;
}
```

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
import { useTheme } from '@/composables/useTheme';
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
import { useTheme } from '@/composables/useTheme';

const { themeName, effectiveTheme } = useTheme({
  defaultTheme: 'auto',
  storageKey: 'user-preferences-theme',
  persist: true
});

// Analytic tracking of theme change
watch(effectiveTheme, (newTheme) => {
  console.log('Theme changed to:', newTheme);
  // analytics.track('theme_changed', { theme: newTheme });
});
</script>
```

### Force Theme for a Section

```vue
<template>
  <!-- Force dark theme for this section -->
  <div data-theme="dark" class="promo-section">
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

## Performance

### Built-in Optimizations

- **CSS Variables**: Instant theme change without reload
- **Lazy Loading**: Only configured themes are included in bundle
- **Tree-shaking**: Unused themes = 0 bytes
- **Media Queries**: Native system preference detection
- **localStorage**: Persistence without network overhead

### Size Comparison

| Configuration | CSS Size | Themes Included |
|--------------|----------|-----------------|
| Minimal | ~8 KB | Light + Dark |
| Standard | ~15 KB | Light + Dark + 1 color |
| Complete | ~30 KB | All themes |

### Recommendations

::: tip Corporate Applications
Use only `light` and `dark` to minimize bundle size.
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

## Resources

- [Color Guide](./colors.md)
- [Semantic Tokens](./tokens.md)
- [Accessibility](./accessibility.md)
- [Complete Examples](./examples.md)