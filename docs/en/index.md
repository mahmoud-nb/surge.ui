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
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>'
    title: WCAG AA Accessibility
    details: Keyboard navigation, ARIA roles, screen readers, 4.5:1 contrast ratios, 44px touch targets and high contrast mode support.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.12a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/></svg>'
    title: 4 themes, light and dark
    details: Default, Ocean, Forest and Sunset, each in light and dark. Semantic CSS tokens (--su-*) for automatic adaptation.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>'
    title: Native TypeScript
    details: Typed props, explicit interfaces, auto-completion and type safety throughout the entire library.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>'
    title: Composition API
    details: Built on Vue 3 with script setup, defineModel, defineEmits and reusable composables.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>'
    title: Responsive & RTL
    details: Components adapted to all screen sizes, with native support for left-to-right and right-to-left directions.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg>'
    title: 75+ Components
    details: From atoms (Button, Input, Badge) to organisms (Dialog, Tabs, Accordion), organized using Atomic Design.
---

<div class="home-content">

<p class="lm-eyebrow">// 01 — installation</p>

## Get started in two lines

```bash
npm install @surgeui/ds-vue
```

```vue
<script setup>
import { Button as SuButton } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'
</script>

<template>
  <SuButton variant="primary">My first button</SuButton>
</template>
```

<div class="home-categories">

<p class="lm-eyebrow">// 02 — components</p>

## Browse the library

<HomeCategories />

</div>

</div>

<style scoped>
.home-content {
  max-width: 1152px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.home-content h2 {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
  letter-spacing: -0.02em;
}

.home-categories {
  margin-top: 4rem;
}

@media (min-width: 640px) {
  .home-content {
    padding-inline: 3rem;
  }
}

@media (min-width: 960px) {
  .home-content {
    padding-inline: 4rem;
  }
}
</style>
