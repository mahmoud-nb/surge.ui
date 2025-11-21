# SurgeUI Design System

Modern Vue.js 3 component library with Composition API, designed to create modern and consistent interfaces.

[![npm](https://img.shields.io/npm/v/@surgeui/ds-vue)](https://www.npmjs.com/package/@surgeui/ds-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)

## 📖 Documentation and examples

- **[Complete Documentation](/)** - Usage guide and component API
- **[Storybook](https://mahmoud-nb.github.io/surge.ui/storybook/)** - Interactive examples and component testing

## ✨ Features

- 🎨 **Modern Design** - Components with polished and professional design
- 🔧 **TypeScript** - Full TypeScript support for better developer experience
- 🎯 **Composition API** - Uses Vue 3 Composition API
- 📱 **Responsive** - Components adapted to all screen sizes
- 🌙 **Dark Mode** - Native dark mode support (under construction)
- 🔄 **RTL & LTR** – Native support for both right-to-left and left-to-right text directions 
- ♿ **Accessibility** – Accessibility-friendly and built with best practices in mind
- ⚡ **Performance** - Optimized for best performance


# Installation

## 📚 Resources

- **[Documentation](https://mahmoud-nb.github.io/surge.ui/)**: Complete guide with examples
- **[Storybook](https://mahmoud-nb.github.io/surge.ui/storybook/)**: Interactive examples and component playground

## Prerequisites

- Vue.js 3.3+
- Node.js 16+

## Installation via npm

```bash
npm install @surgeui/ds-vue
```

## Installation via yarn

```bash
yarn add @surgeui/ds-vue
```

## Installation via pnpm

```bash
pnpm add @surgeui/ds-vue
```

## Configuration

### Global import

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

### Selective import

```vue
<script setup>
import { SuButton } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
</script>

<template>
  <SuButton variant="primary">
    My button
  </SuButton>
</template>
```

### Configuration with options

```js
// main.js
import { createApp } from 'vue'
import SurgeUpDS from '@surgeui/ds-vue'

const app = createApp(App)

// Customize component prefix
app.use(SurgeUpDS, {
  prefix: 'Su', // Components will be SuButton, SuInput, etc.
  // Other options : under construction
})
```

## TypeScript

The design system includes complete TypeScript types. No additional configuration is needed.

```vue
<script setup lang="ts">
import { SuButton } from '@surgeui/ds-vue'
import type { ButtonVariant } from '@surgeui/ds-vue'

const variant: ButtonVariant = 'primary'
</script>
```