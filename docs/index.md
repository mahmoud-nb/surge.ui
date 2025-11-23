# SurgeUI Design System

Bibliothèque de composants Vue.js 3 avec Composition API, conçue pour créer des interfaces modernes et cohérentes.

## 📖 Documentation et exemples

- **[Documentation complète](/)** - Guide d'utilisation et API des composants
- **[Storybook](/storybook/)** - Exemples interactifs et tests des composants

## ✨ Fonctionnalités

- 🎨 **Design moderne** - Composants avec un design soigné et professionnel
- 🔧 **TypeScript** - Support complet de TypeScript pour une meilleure expérience développeur
- 🎯 **Composition API** - Utilise la Composition API de Vue 3
- 📱 **Responsive** - Composants adaptés à tous les écrans
- 🌙 **Mode sombre** - Support natif du mode sombre
- 🔄 **RTL & LTR** – Support natif des directions de texte droite-gauche et gauche-droite 
- ♿ **Accessibilité** – Conçu pour être accessible à tous, conforme aux bonnes pratiques
- ⚡ **Performance** - Optimisé pour les meilleures performances

## 🚀 Installation rapide

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
    Mon premier bouton
  </SuButton>
</template>
```

## 📚 Composants disponibles

<div class="component-grid">
  <div class="component-card">
    <h3>Button</h3>
    <p>Composant <b>Bouton</b> avec plusieurs variantes et tailles</p>
    <a href="/components/button">Voir la documentation →</a>
  </div>
  
  <div class="component-card">
    <h3>InputField</h3>
    <p>Composant <b>InputField</b> avec préfixes, suffixes et validation</p>
    <a href="/components/inputfield">Voir la documentation →</a>
  </div>
  
  <div class="component-card">
    <h3>SelectBox</h3>
    <p>Composant <b>SelectField</b> avec recherche et sélection multiple</p>
    <a href="/components/selectboxfield">Voir la documentation →</a>
  </div>
  
  <div class="component-card">
    <h3>Accordion</h3>
    <p>Composant <b>Accordion</b> pour plusieurs sections de contenu repliables</p>
    <a href="/components/accordion">Voir la documentation →</a>
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