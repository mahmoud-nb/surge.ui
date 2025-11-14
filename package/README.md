# SurgeUp Design System

A modern Vue.js 3 component library with Composition API, designed to create beautiful and consistent user interfaces.

[![npm version](https://badge.fury.io/js/%40surgeup%2Fds-vue.svg)](https://badge.fury.io/js/%40surgeup%2Fds-vue)
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

## 🚀 Quick Start

### Installation

```bash
npm install @surgeui/ds-vue
```

### Basic Usage

```vue
<script setup>
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

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(SurgeUpDS)
app.mount('#app')
```

## 🎨 Global Configuration

Customize default component behavior when installing:

```js
app.use(SurgeUpDS, {
  // Component prefix (default: 'Su')
  prefix: 'My', // Components become MyButton, MyInput, etc.

  // Text color
  textPrimaryColor: '#213222',
  textSecondaryColor: '#454344'
  textTeriaryColor: '#676965'
})
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

Visit our [complete documentation](https://mahmoud-nb.github.io/surge.ui/) for:

- **Component API** - Detailed props, events, and slots
- **Usage examples** - Real-world implementation examples
- **Accessibility guide** - Best practices for inclusive design
- **Customization** - Theming and configuration options

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](https://mahmoud-nb.github.io/surge.ui/)
- [Storybook](https://mahmoud-nb.github.io/surge.ui/storybook/)
- [GitHub Repository](https://github.com/mahmoud-nb/surge.ui)
- [npm Package](https://www.npmjs.com/package/@surgeui/ds-vue)

---

Made with ❤️ by the SurgeUp team