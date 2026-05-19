# Démarrage rapide

Bibliothèque de composants Vue.js 3 avec Composition API, conçue pour créer des interfaces modernes et cohérentes.

## Ressources

- **Documentation** -  Guide complet avec exemples et API
- **[Storybook](https://surgeui.com/storybook)** -  Exemples interactifs et playground des composants
- **[npm Package](https://www.npmjs.com/package/@surgeui/ds-vue)**

## Fonctionnalités

- **Design moderne** -  Composants avec un design soigné et professionnel
- **TypeScript** -  Support complet de TypeScript pour une meilleure DX
- **Composition API** -  Utilise la Composition API de Vue 3
- **Responsive** -  Composants adaptés à tous les écrans
- **5 thèmes** -  Light, Dark, Ocean, Forest et Sunset inclus
- **RTL & LTR** -  Support natif des deux directions de texte
- **Accessibilité** -  Conforme WCAG 2.1 AA (focus, clavier, lecteurs d'écran, contrastes)
- **Performance** -  Tree-shakable, CSS optimisé, transitions respectant `prefers-reduced-motion`

## Accessibilité

Tous les composants respectent les normes WCAG 2.1 AA :

- **Gestion du focus** -  Indicateurs clairs et ordre de tabulation logique
- **Navigation clavier** -  Prise en charge complète du clavier
- **Lecteurs d'écran** -  Attributs ARIA et annonces appropriés
- **Contraste** -  Ratios conformes WCAG AA (4,5:1 minimum)
- **Zones tactiles** -  Minimum 44px (mixin `touch-target`)
- **Mouvements réduits** -  Respect de `prefers-reduced-motion`
- **Contraste élevé** -  Prise en charge de `prefers-contrast: high`

## Installation rapide

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

Pour la configuration complète (import global, import sélectif, options du plugin), voir la page [Installation](/guide/installation).
