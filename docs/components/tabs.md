# Tabs

Le composant **Tabs** (onglets), personnalisable et réactif, permet de gérer facilement des ensembles d’onglets accessibles.  
Il prend en charge le clavier, les labels personnalisés, les icônes et le rendu dynamique via slots.
Respect des normes WAI-ARIA.

## Utilisation simple

<div class="component-demo">
  <div class="demo-section">
    <h4>Utilisation simple</h4>
    <SuTabs :tabs="[
      { label: 'Accueil', content: 'Bienvenue sur la page d’accueil.' },
      { label: 'Profil', content: 'Votre espace personnel.' },
      { label: 'Paramètres', content: 'Réglez vos préférences.' }
    ]" />
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import Tabs from '@/components/Tabs.vue'

const tabs = ref([
  { label: 'Accueil', content: 'Bienvenue sur la page d’accueil.' },
  { label: 'Profil', content: 'Votre espace personnel.' },
  { label: 'Paramètres', content: 'Réglez vos préférences.' }
])
</script>

<template>
  <SuTabs :tabs="tabs" />
</template>
```

## Utilisation avancée (avec slots)

<div class="component-demo">
  <div class="demo-section">
    <h4>contenu avané en utlisant des slots</h4>
    <SuTabs :tabs="tabs">
      <template #tab="{ tab }">
        <div style="display: flex; gap: 8px; align-items: center;">
          <Icon :name="tab.icon" />
          <span>{{ tab.label }}</span>
          <Badge v-if="tab.badge" :count="tab.badge" />
        </div>
      </template>
      <template #panel="{ tab }">
        <article>
          <h2>{{ tab.title }}</h2>
          <p>{{ tab.description }}</p>
          <component :is="tab.component" />
        </article>
      </template>
    </SuTabs>
  </div>
</div>

```vue
<SuTabs :tabs="tabs">
  <template #tab="{ tab }">
    <div style="display: flex; gap: 8px; align-items: center;">
      <Icon :name="tab.icon" />
      <span>{{ tab.label }}</span>
      <Badge v-if="tab.badge" :count="tab.badge" />
    </div>
  </template>
  <template #panel="{ tab }">
    <article>
      <h2>{{ tab.title }}</h2>
      <p>{{ tab.description }}</p>
      <component :is="tab.component" />
    </article>
  </template>
</SuTabs>
```

## API

### Props

| Prop          | Type                                 | Default        | Description                      |
| ------------- | ------------------------------------ | -------------- | -------------------------------- |
| `modelValue`  | `string \| number`                   | `undefined`    | Onglet actif (lié à `v-model`)   |
| `variant`     | `'underline' \| 'border' \| 'pills'` | `'underline'`  | Style visuel des onglets         |
| `size`        | `'sm' \| 'md' \| 'lg'`               | `'md'`         | Taille des onglets               |
| `align`       | `'start' \| 'center' \| 'end'`       | `'start'`      | Alignement horizontal            |
| `orientation` | `'horizontal' \| 'vertical'`         | `'horizontal'` | Orientation des onglets          |
| `lazy`        | `boolean`                            | `false`        | Rendu différé du contenu inactif |
| `disabled`    | `boolean`                            | `false`        | Désactive tous les onglets       |

### Events

| Event                | Type                                | Description                          |
| -------------------- | ----------------------------------- | ------------------------------------ |
| `@update:modelValue` | `(value: string \| number) => void` | Émis lors du changement d’onglet     |
| `@change`            | `(value: string \| number) => void` | Émis après le changement d’onglet    |
| `@focus`             | `(event: FocusEvent) => void`       | Émis quand un onglet reçoit le focus |

## Accessibilité

Le composant Tabs respecte les recommandations WAI-ARIA et WCAG 2.1 AA :

- **Rôles ARIA** : tablist, tab, tabpanel
- **Navigation clavier** : flèches gauche/droite (ou haut/bas si vertical)
- Focus visible et conforme
- Support complet du mode RTL
- Compatible lecteurs d’écran
- États ARIA (aria-selected, aria-controls, aria-disabled)

## Exemples d’usage avancés

### Tabs dynamiques

```vue
<script setup>
import { ref } from 'vue'

const tabs = ref([
  { label: 'Vue', content: 'Contenu Vue.js' },
  { label: 'React', content: 'Contenu React' },
  { label: 'Angular', content: 'Contenu Angular' }
])
</script>

<template>
  <SuTabs>
    <SuTab v-for="tab in tabs" :key="tab.label" :label="tab.label">
      {{ tab.content }}
    </SuTab>
  </SuTabs>
</template>
```