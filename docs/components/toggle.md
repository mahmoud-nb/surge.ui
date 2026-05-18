# Toggle

Bouton basculable entre deux états (on/off). Accepte un label textuel ou une icône, avec une accessibilité complète via `role="switch"` et `aria-checked`.

## Description

`Toggle` est un composant atomique permettant de basculer un état booléen. Contrairement au `Switch` qui a une apparence d'interrupteur, le `Toggle` se présente comme un bouton dont l'apparence change selon son état actif/inactif. Il est idéal pour des barres d'outils (gras, italique), des favoris, ou des filtres.

## Exemples d'utilisation

### Toggle simple avec label

<div class="component-demo">
  <div class="demo-section">
    <h4>Toggle de base</h4>
    <div class="demo-inputs">
      <SuToggle label="Gras" />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const isBold = ref(false)
</script>

<template>
  <SuToggle v-model="isBold" label="Gras" />
</template>
```

### Toggle avec icône

<div class="component-demo">
  <div class="demo-section">
    <h4>Avec icône seule</h4>
    <div class="demo-inputs" style="display: flex; gap: 0.5rem;">
      <SuToggle :icon="BoldIcon" aria-label="Gras" />
      <SuToggle :icon="ItalicIcon" aria-label="Italique" />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { BoldIcon, ItalicIcon } from '@heroicons/vue/24/outline'

const bold = ref(false)
const italic = ref(false)
</script>

<template>
  <SuToggle v-model="bold" :icon="BoldIcon" aria-label="Gras" />
  <SuToggle v-model="italic" :icon="ItalicIcon" aria-label="Italique" />
</template>
```

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <h4>Default / Outline / Ghost</h4>
    <div class="demo-inputs" style="display: flex; gap: 0.5rem;">
      <SuToggle label="Default" variant="default" :model-value="true" />
      <SuToggle label="Outline" variant="outline" :model-value="true" />
      <SuToggle label="Ghost" variant="ghost" :model-value="true" />
    </div>
  </div>
</div>

```vue
<SuToggle label="Default" variant="default" />
<SuToggle label="Outline" variant="outline" />
<SuToggle label="Ghost" variant="ghost" />
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>sm / md / lg</h4>
    <div class="demo-inputs" style="display: flex; gap: 0.5rem; align-items: center;">
      <SuToggle label="Small" size="sm" :model-value="true" />
      <SuToggle label="Medium" size="md" :model-value="true" />
      <SuToggle label="Large" size="lg" :model-value="true" />
    </div>
  </div>
</div>

```vue
<SuToggle label="Small" size="sm" />
<SuToggle label="Medium" size="md" />
<SuToggle label="Large" size="lg" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `boolean` | `false` | État du toggle (v-model) |
| `label` | `string` | — | Texte affiché dans le toggle |
| `icon` | `Component` | — | Icône affichée (état inactif) |
| `activeIcon` | `Component` | — | Icône affichée quand actif (remplace `icon`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Variante visuelle |
| `radius` | `Radius` | `'md'` | Rayon de bordure |
| `disabled` | `boolean` | `false` | Désactive le toggle |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `boolean` | Émis lors du changement d'état (v-model) |
| `change` | `boolean` | Émis lors du changement d'état avec la nouvelle valeur |

### Accessibilité

- `role="switch"` avec `aria-checked` pour indiquer l'état
- Navigation clavier : `Tab` pour le focus, `Entrée` / `Espace` pour basculer
- `aria-label` automatique à partir du `label` si non fourni explicitement
- Compatible lecteurs d'écran
