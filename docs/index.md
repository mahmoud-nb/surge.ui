---
layout: home

hero:
  name: SurgeUI
  text: Design System Vue 3
  tagline: Composants accessibles, thématisables et performants pour vos interfaces modernes.
  actions:
    - theme: brand
      text: Démarrage rapide
      link: /guide/get-started
    - theme: alt
      text: Composants
      link: /components/
    - theme: alt
      text: Storybook
      link: https://surgeui.com/storybook

features:
  - icon: ♿
    title: Accessibilité WCAG AA
    details: Navigation clavier, rôles ARIA, lecteurs d'écran, contrastes 4.5:1, zones tactiles 44px et support du mode contraste élevé.
  - icon: 🎨
    title: 5 thèmes intégrés
    details: Light, Dark, Ocean, Forest et Sunset. Tokens CSS sémantiques (--su-*) pour une adaptation automatique.
  - icon: 🔧
    title: TypeScript natif
    details: Props typées, interfaces explicites, auto-complétion et sécurité de type à travers toute la bibliothèque.
  - icon: ⚡
    title: Composition API
    details: Construit sur Vue 3 avec script setup, defineModel, defineEmits et composables réutilisables.
  - icon: 📱
    title: Responsive & RTL
    details: Composants adaptés à tous les écrans avec support natif des directions gauche-droite et droite-gauche.
  - icon: 🧩
    title: 34+ composants
    details: Des atomes (Button, Input, Badge) aux organismes (Dialog, Tabs, Accordion), organisés en Atomic Design.
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
  <SuButton variant="primary">Mon premier bouton</SuButton>
</template>
```

<div class="home-categories">

### Explorer les composants

<div class="category-grid">
  <a href="/components/display" class="category-card">
    <span class="category-icon">🖼️</span>
    <span class="category-title">Affichage</span>
    <span class="category-count">15 composants</span>
  </a>
  <a href="/components/actions" class="category-card">
    <span class="category-icon">🖱️</span>
    <span class="category-title">Actions</span>
    <span class="category-count">8 composants</span>
  </a>
  <a href="/components/form" class="category-card">
    <span class="category-icon">📝</span>
    <span class="category-title">Formulaires</span>
    <span class="category-count">11 composants</span>
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
