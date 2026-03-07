# SurgeUI Vue Design System

A modern **Vue.js 3** component library with Composition API, designed to create beautiful and consistent user interfaces.

[![npm](https://img.shields.io/npm/v/@surgeui/ds-vue)](https://www.npmjs.com/package/@surgeui/ds-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)


## ✨ Features

- 🎨 **Modern Design** - Polished and professional components
- 🎯 **Composition API** - Built with Vue 3 Composition API
- 🔧 **TypeScript** - Full TypeScript support for better developer experience
- 🎨 **Customizable** - Global configuration and theming support
- 📱 **Responsive** - Components adapted to all screen sizes
- ♿ **Accessible** - WCAG 2.1 AA compliant with complete accessibility support
- 🌙 **Dark Mode** - Native dark mode support
- ⚡ **Performance** - Optimized for best performance


## Quick Start

### Installation

```bash
npm install @surgeui/ds-vue
```

### Basic Usage

```vue
<script setup lang="ts" >
import '@surgeui/ds-vue/style.css'
import { SuButton } from '@surgeui/ds-vue'
import type { ButtonProps } from '@surgeui/ds-vue/types'
</script>

<template>
  <SuButton variant="primary">
    My first button
  </SuButton>
</template>
```

### Global Installation

```ts
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SurgeUpDS)
app.mount('#app')
```

## 🎨 Customization & Theming

SurgeUI provides a **declarative, CSS-based theming system** that allows you to customize colors and styles by defining custom CSS variables.

### How It Works

The customization system automatically converts theme properties into CSS variables with the `--su-custom-` prefix. These variables can override the default theme tokens when defined.

### Global Configuration

Configure the design system when installing:

```ts
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
import App from './App.vue'

const app = createApp(App)

const themeConfig = {
  // Component prefix (default: 'Su')
  prefix: 'My', // Components become MyButton, MyInput, etc.

  // Theme customization via CSS variables
  theme: {
    // Text colors
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    textDisabled: '#d1d5db',
    
    // Background colors
    bgCanvas: '#ffffff',
    bgSurface: '#f9fafb',
    bgOverlay: 'rgba(0, 0, 0, 0.5)',
    
    // Border colors
    borderDefault: '#e5e7eb',
    borderFocus: '#3b82f6',
    
    // Action colors
    primaryDefault: '#3b82f6',
    primaryHover: '#2563eb',
    primaryText: '#ffffff',
    
    // State colors
    stateSuccess: '#10b981',
    stateWarning: '#f59e0b',
    stateError: '#ef4444',
  }
}

app.use(SurgeUpDS, themeConfig)
app.mount('#app')
```

### CSS Variable Generation

All theme properties are automatically converted to CSS custom properties with the `--su-custom-` prefix:

```ts
theme: {
  textPrimary: '#1f2937'        // → --su-custom-text-primary
  bgSurface: '#f9fafb'          // → --su-custom-bg-surface
  primaryDefault: '#3b82f6'     // → --su-custom-primary-default
  stateSuccessBg: '#d1fae5'     // → --su-custom-state-success-bg
}
```

### Using Custom Variables in CSS

Define custom variables in your CSS and they will automatically take precedence over default theme tokens:

```css
/* In your global CSS file */
:root {
  /* Text customization */
  --su-custom-text-primary: #1f2937;
  --su-custom-text-secondary: #6b7280;
  
  /* Background customization */
  --su-custom-bg-canvas: #ffffff;
  --su-custom-bg-surface: #f9fafb;
  
  /* Button customization */
  --su-custom-primary-default: #3b82f6;
  --su-custom-primary-hover: #2563eb;
  --su-custom-primary-text: #ffffff;
  
  /* State customization */
  --su-custom-state-success: #10b981;
  --su-custom-state-error: #ef4444;
}

/* Dark mode example */
@media (prefers-color-scheme: dark) {
  :root {
    --su-custom-text-primary: #f3f4f6;
    --su-custom-bg-canvas: #111827;
    --su-custom-bg-surface: #1f2937;
  }
}
```

### Available Theme Tokens

#### Text Tokens
- `textPrimary` - Primary text color
- `textSecondary` - Secondary text color
- `textTertiary` - Tertiary text color
- `textDisabled` - Disabled text color
- `textInverse` - Inverse text color (for contrast backgrounds)

#### Background Tokens
- `bgCanvas` - Canvas/page background
- `bgSurface` - Card and modal backgrounds
- `bgSurfaceElevated` - Elevated surface backgrounds
- `bgHover` - Hover state background
- `bgActive` - Active state background
- `bgSelected` - Selected state background
- `bgOverlay` - Overlay/backdrop background

#### Border Tokens
- `borderDefault` - Default border color
- `borderSubtle` - Subtle border color
- `borderStrong` - Strong border color
- `borderFocus` - Focus state border
- `borderDisabled` - Disabled border

#### Action Tokens
- `primaryDefault` - Primary action default
- `primaryHover` - Primary action hover
- `primaryActive` - Primary action active
- `primaryDisabled` - Primary action disabled
- `primaryText` - Primary action text
- `secondaryDefault` - Secondary action default
- `secondaryHover` - Secondary action hover
- `secondaryText` - Secondary action text

#### State Tokens
- `stateSuccess` - Success state color
- `stateSuccessBg` - Success background
- `stateWarning` - Warning state color
- `stateWarningBg` - Warning background
- `stateError` - Error state color
- `stateErrorBg` - Error background
- `stateInfo` - Info state color
- `stateInfoBg` - Info background

#### Link Tokens (legacy configuration)
- `linkVariant` - Default link variant
- `linkSize` - Default link size
- `linkUnderline` - Default underline style
- `dialogDisplay` - Default dialog display mode

### Variable Priority & Fallback

Variables follow this priority order:

1. **Custom CSS variables** (`--su-custom-*`) - Highest priority
2. **Theme configuration** - Applied during plugin initialization
3. **Default theme tokens** - Fallbacks from theme definitions

This means:
- CSS variables defined in `:root` or element styles always take precedence
- Variables not defined in the theme config fall back to default tokens
- You can override specific tokens without defining the entire theme

### Scoped Customization

Apply different themes to different parts of your application:

```vue
<template>
  <!-- Light theme section -->
  <section class="light-section">
    <SuButton>Light Button</SuButton>
  </section>

  <!-- Dark theme section -->
  <section class="dark-section">
    <SuButton>Dark Button</SuButton>
  </section>
</template>

<style scoped>
.light-section {
  --su-custom-text-primary: #1f2937;
  --su-custom-bg-surface: #ffffff;
}

.dark-section {
  --su-custom-text-primary: #f3f4f6;
  --su-custom-bg-surface: #1f2937;
}
</style>
```

### With Icons

SurgeUI use **Heroicons** for add and display icons

```vue
<script setup>
import { informationCircleIcon, HeartIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuHeading>
    <informationCircleIcon /> User informations
  </SuHeading>
  <SuButton variant="primary" :icon="HeartIcon" iconDisplay="left">
    I like it
  </SuButton>
</template>
```

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

- **Focus Management** - Clear focus indicators and logical tab order
- **Keyboard Navigation** - Full keyboard support
- **Screen Readers** - Proper ARIA attributes and announcements
- **Color Contrast** - WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Touch Targets** - Minimum 44px touch targets
- **Reduced Motion** - Respects `prefers-reduced-motion`
- **High Contrast** - Supports `prefers-contrast: high`
- **RTL Support** - Right-to-left language support

## 🌙 Dark Mode

Dark mode is automatically supported through CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles are automatically applied */
}

.dark, [theme="dark"] * {
  /* Dark mode styles are automatically applied */
}
```

## 📱 Responsive Design

All components are responsive by default:

- **Mobile-first** approach
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** interactions
- **Automatic responsive behavior** (e.g., FormFields switches to vertical on mobile)

## 🎭 Storybook

Explore all components interactively in Storybook:

```bash
npm run storybook
```

## 🛠️ Development

### Prerequisites

- Node.js 16+
- Vue.js 3.3+

### Build the library

```bash
npm run build
```

### Development mode

```bash
npm run dev
```

### Run Storybook

```bash
npm run storybook
```

## 📖 Documentation

Visit our [complete documentation](https://surgeui.com/) for:

- **Component API** - Detailed props, events, and slots
- **Usage examples** - Real-world implementation examples
- **Accessibility guide** - Best practices for inclusive design
- **Customization** - Theming and configuration options

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/mahmoud-nb/surge.ui/blob/main/package/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](https://github.com/mahmoud-nb/surge.ui/blob/main/package/LICENSE.md) file for details.

## 🔗 Links

- [Documentation](https://surgeui.com/)
- [Storybook](https://surgeui.com/storybook/)
- [GitHub Repository](https://github.com/mahmoud-nb/surge.ui)

---

Made with ❤️ by the SurgeUp team