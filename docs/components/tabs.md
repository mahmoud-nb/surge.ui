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

| Prop         | Type                                     | Default       | Description                                                                                         |
| ------------ | ---------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| `tabs`       | `TabItem[]`                              | `undefined`   | Onglets à afficher (`label`, `content`, champs libres pour les slots)                               |
| `modelValue` | `number`                                 | `0`           | Index de l’onglet actif (lié à `v-model`)                                                           |
| `variant`    | `'underline' \| 'pills' \| 'contained'` | `'underline'` | `underline` : filet et indicateur animé ; `pills` : contrôle segmenté ; `contained` : onglets attachés au panneau |

### Events

| Event                | Type                      | Description                      |
| -------------------- | ------------------------- | -------------------------------- |
| `@update:modelValue` | `(value: number) => void` | Émis lors du changement d’onglet |

## Accessibilité

Le composant Tabs respecte les recommandations WAI-ARIA et WCAG 2.1 AA :

- **Rôles ARIA** : tablist, tab, tabpanel
- **Navigation clavier** : flèches gauche / droite en boucle (inversées en lecture de droite à gauche), Début / Fin ; l'onglet atteint est activé aussitôt ([useListNavigation](/composables/uselistnavigation))
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