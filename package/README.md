# SurgeUI Vue Design System

A modern **Vue.js 3** component library with Composition API, designed to create beautiful and consistent user interfaces.

[![npm](https://img.shields.io/npm/v/@surgeui/ds-vue)](https://www.npmjs.com/package/@surgeui/ds-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)


> This release is intended entirely for testing and solution optimization.
> The goal is to explore different technical approaches in order to identify the best way to build and structure the design system.
> 
> Therefore, this is not a stable release.
> The first officially stable version will be 2.0.


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

### Global Configuration

Customize default component behavior when installing:

```ts
import type { SurgeuiTheme } from '@surgeui/ds-vue'

const options: SurgeuiTheme = {
  // Component prefix (default: 'Su')
  prefix: 'My', // Components become MyButton, MyInput, etc.

  // custom text color
  textPrimaryColor: '#213222',
  textSecondaryColor: '#454344',
  textTeriaryColor: '#676965',

  // Custom Button style
  button: {
    bg: '#101010',
    color: '#FFFFFF',
    border: 'none',
    hoverBackground: '#383838',
    hoverShadow: '0 0'
  }

  // custom link style
  link?: {
    color: '#2563eb',
    hoverColor: '#1e40af',
    hoverBackground: 'none',
    activeColor: '#1e3a8a',
  }

  // Other options are currently under development.
}

app.use(SurgeUpDS, options)
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