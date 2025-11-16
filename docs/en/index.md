# SurgeUI Design System

Modern Vue.js 3 component library with Composition API, designed to create modern and consistent interfaces.

## 📖 Documentation and examples

- **[Complete Documentation](/)** - Usage guide and component API
- **[Storybook](https://mahmoud-nb.github.io/surge.ui/storybook/)** - Interactive examples and component testing

## ✨ Features

- 🎨 **Modern Design** - Components with polished and professional design
- 🔧 **TypeScript** - Full TypeScript support for better developer experience
- 🎯 **Composition API** - Uses Vue 3 Composition API
- 📱 **Responsive** - Components adapted to all screen sizes
- 🌙 **Dark Mode** - Native dark mode support
- 🔄 **RTL & LTR** – Native support for both right-to-left and left-to-right text directions 
- ♿ **Accessibility** – Accessibility-friendly and built with best practices in mind
- ⚡ **Performance** - Optimized for best performance
- ♿ **Accessible** - WCAG 2.1 AA compliant with complete accessibility support
- 🎨 **Customizable** - Global configuration and theming support

## 🚀 Quick Installation

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

## 📚 Available Components

<div class="component-grid">
  <div class="component-card">
    <h3>Button</h3>
    <p>**Button** component with multiple variants and sizes</p>
    <a href="/en/components/button">View documentation →</a>
  </div>
  
  <div class="component-card">
    <h3>Input</h3>
    <p>**InputField** component with prefixes, suffixes and validation</p>
    <a href="/en/components/inputfield">View documentation →</a>
  </div>
  
  <div class="component-card">
    <h3>SelectBox</h3>
    <p>**SelectField** component with search and multiple selection</p>
    <a href="/en/components/selectboxfield">View documentation →</a>
  </div>
  
  <div class="component-card">
    <h3>Accordion</h3>
    <p>**Accordion** component for multiple collapsible content sections</p>
    <a href="/en/components/accordion">View documentation →</a>
  </div>
</div>

<style scoped>
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.component-card {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.component-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.component-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.component-card p {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.component-card a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.component-card a:hover {
  text-decoration: underline;
}
</style>