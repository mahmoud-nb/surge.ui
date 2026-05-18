# ToggleGroup

Groupe de toggles avec sélection exclusive ou multiple. Supporte le mode connecté, l'orientation verticale/horizontale et les rôles ARIA adaptés au mode de sélection.

## Description

`ToggleGroup` affiche une liste de `Toggle` et gère la sélection. En mode `exclusive`, un seul toggle peut être actif (similaire à un groupe radio). En mode `multi`, plusieurs toggles peuvent être actifs simultanément. Le mode connecté (`gap="none"`) fusionne visuellement les toggles en un seul bloc.

## Exemples d'utilisation

### Sélection multiple (défaut)

<div class="component-demo">
  <div class="demo-section">
    <h4>Format de texte</h4>
    <div class="demo-inputs">
      <SuToggleGroup
        :items="[
          { value: 'bold', label: 'Gras' },
          { value: 'italic', label: 'Italique' },
          { value: 'underline', label: 'Souligné' }
        ]"
        :model-value="['bold']"
        aria-label="Format du texte"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const format = ref(['bold'])
const items = [
  { value: 'bold', label: 'Gras' },
  { value: 'italic', label: 'Italique' },
  { value: 'underline', label: 'Souligné' }
]
</script>

<template>
  <SuToggleGroup
    v-model="format"
    :items="items"
    aria-label="Format du texte"
  />
</template>
```

### Sélection exclusive

```vue
<script setup>
import { ref } from 'vue'
import { Bars3BottomLeftIcon, Bars3Icon, Bars3BottomRightIcon } from '@heroicons/vue/24/outline'

const align = ref(['center'])
const items = [
  { value: 'left', icon: Bars3BottomLeftIcon },
  { value: 'center', icon: Bars3Icon },
  { value: 'right', icon: Bars3BottomRightIcon }
]
</script>

<template>
  <SuToggleGroup
    v-model="align"
    :items="items"
    mode="exclusive"
    aria-label="Alignement"
  />
</template>
```

### Mode connecté (gap=none)

```vue
<SuToggleGroup
  v-model="selected"
  :items="items"
  gap="none"
  mode="exclusive"
  aria-label="Alignement"
/>
```

### Orientation verticale

```vue
<SuToggleGroup
  v-model="selected"
  :items="items"
  orientation="vertical"
  gap="none"
/>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `(string \| number)[]` | `[]` | Valeurs actives (v-model) |
| `items` | `ToggleGroupItem[]` | **requis** | Liste des toggles |
| `mode` | `'exclusive' \| 'multi'` | `'multi'` | Mode de sélection |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille des toggles |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Variante visuelle |
| `radius` | `Radius` | `'md'` | Rayon de bordure |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Espacement (none = connecté) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation du groupe |
| `disabled` | `boolean` | `false` | Désactive tout le groupe |

### ToggleGroupItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `value` | `string \| number` | Identifiant unique (requis) |
| `label` | `string` | Texte affiché |
| `icon` | `Component` | Icône (état inactif) |
| `activeIcon` | `Component` | Icône (état actif) |
| `disabled` | `boolean` | Désactive cet item |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `(string \| number)[]` | Émis lors du changement (v-model) |
| `change` | `(string \| number)[]` | Nouvelle liste des valeurs actives |
| `select` | `string \| number, boolean` | Item sélectionné et son nouvel état |

### Accessibilité

- `role="radiogroup"` en mode exclusive, `role="group"` en mode multi
- Chaque toggle utilise `role="switch"` avec `aria-checked`
- Navigation clavier : `Tab` entre les toggles, `Entrée` / `Espace` pour basculer
- `aria-label` sur le conteneur pour décrire le groupe
