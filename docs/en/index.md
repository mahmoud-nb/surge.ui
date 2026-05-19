---
layout: home

hero:
  name: SurgeUI
  text: Vue 3 Design System
  tagline: Accessible, themeable and performant components for modern interfaces.
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/get-started
    - theme: alt
      text: Components
      link: /en/components/
    - theme: alt
      text: Storybook
      link: https://surgeui.com/storybook

features:
  - icon: ♿
    title: WCAG AA Accessibility
    details: Keyboard navigation, ARIA roles, screen readers, 4.5:1 contrast ratios, 44px touch targets and high contrast mode support.
  - icon: 🎨
    title: 5 Built-in Themes
    details: Light, Dark, Ocean, Forest and Sunset. Semantic CSS tokens (--su-*) for automatic theme adaptation.
  - icon: 🔧
    title: Native TypeScript
    details: Typed props, explicit interfaces, auto-completion and type safety throughout the entire library.
  - icon: ⚡
    title: Composition API
    details: Built on Vue 3 with script setup, defineModel, defineEmits and reusable composables.
  - icon: 📱
    title: Responsive & RTL
    details: Components adapted to all screen sizes with native support for left-to-right and right-to-left directions.
  - icon: 🧩
    title: 34+ Components
    details: From atoms (Button, Input, Badge) to organisms (Dialog, Tabs, Accordion), organized using Atomic Design.
---

<div class="home-content">

## Installation

```bash
npm install @surgeui/ds-vue
```

```vue
<script setup>
import { SuButton } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
</script>

<template>
  <SuButton variant="primary">My first button</SuButton>
</template>
```

<div class="home-categories">

### Browse components

<div class="category-grid">
  <a href="/en/components/display" class="category-card">
    <span class="category-icon">🖼️</span>
    <span class="category-title">Display</span>
    <span class="category-count">15 components</span>
  </a>
  <a href="/en/components/actions" class="category-card">
    <span class="category-icon">🖱️</span>
    <span class="category-title">Actions</span>
    <span class="category-count">8 components</span>
  </a>
  <a href="/en/components/form" class="category-card">
    <span class="category-icon">📝</span>
    <span class="category-title">Forms</span>
    <span class="category-count">11 components</span>
  </a>
</div>

</div>

</div>

<style scoped>
.home-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.home-categories {
  margin-top: 3rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: all 0.2s ease;
}

.category-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.category-icon {
  font-size: 2rem;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.category-count {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
