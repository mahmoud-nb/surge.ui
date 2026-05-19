# Getting Started

Modern Vue.js 3 component library with Composition API, designed to create modern and consistent interfaces.

## Resources

- **Documentation** -  Complete guide with examples and API
- **[Storybook](https://surgeui.com/storybook)** -  Interactive examples and component playground
- **[npm Package](https://www.npmjs.com/package/@surgeui/ds-vue)**

## Features

- **Modern Design** -  Components with polished and professional design
- **TypeScript** -  Full TypeScript support for better DX
- **Composition API** -  Uses Vue 3 Composition API
- **Responsive** -  Components adapted to all screen sizes
- **5 Themes** -  Light, Dark, Ocean, Forest and Sunset included
- **RTL & LTR** -  Native support for both text directions
- **Accessibility** -  WCAG 2.1 AA compliant (focus, keyboard, screen readers, contrast)
- **Performance** -  Tree-shakable, optimized CSS, transitions respecting `prefers-reduced-motion`

## Accessibility

All components follow WCAG 2.1 AA standards:

- **Focus Management** -  Clear focus indicators and logical tab order
- **Keyboard Navigation** -  Full keyboard support
- **Screen Readers** -  Proper ARIA attributes and announcements
- **Color Contrast** -  WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Touch Targets** -  Minimum 44px touch targets (`touch-target` mixin)
- **Reduced Motion** -  Respects `prefers-reduced-motion`
- **High Contrast** -  Supports `prefers-contrast: high`

## Quick Installation

```bash
npm install @surgeui/ds-vue
```

```vue
<script setup>
import { SuButton } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
</script>

<template>
  <SuButton variant="primary">
    My first button
  </SuButton>
</template>
```

For the full setup (global import, selective import, plugin options), see the [Installation](/en/guide/installation) page.
