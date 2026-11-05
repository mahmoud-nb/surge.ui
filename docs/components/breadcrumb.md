<script setup>
import { HomeIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Accueil', href: '#' },
  { label: 'Projets', href: '#' },
  { label: 'SurgeUI', href: '#' },
  { label: 'Composants', href: '#' },
  { label: 'Breadcrumb' }
]
</script>

# Breadcrumb

Fil d'Ariane : indique où se trouve la page dans la hiérarchie du site et permet de remonter d'un niveau. Le dernier élément est la page courante.

## Exemples d'utilisation

### Utilisation de base

<div class="component-demo">
  <div class="demo-section">
    <SuBreadcrumb :items="items" />
  </div>
</div>

```vue
<script setup>
const items = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projets' },
  { label: 'SurgeUI', href: '/projets/surgeui' },
  { label: 'Composants', href: '/projets/surgeui/composants' },
  { label: 'Breadcrumb' }
]
</script>

<template>
  <SuBreadcrumb :items="items" />
</template>
```

### Séparateurs

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuBreadcrumb :items="items" separator="chevron" />
      <SuBreadcrumb :items="items" separator="slash" />
      <SuBreadcrumb :items="items" separator="dot" />
    </div>
  </div>
</div>

```vue
<SuBreadcrumb :items="items" separator="slash" />
```

### Chemin replié

Au-delà de `maxItems` éléments, le milieu du chemin se replie derrière un bouton « … » qui le déplie.

<div class="component-demo">
  <div class="demo-section">
    <SuBreadcrumb :items="items" :max-items="3" />
  </div>
</div>

```vue
<SuBreadcrumb :items="items" :max-items="3" />
```

### Accueil en icône

Avec `iconOnly`, le libellé reste lu par les lecteurs d'écran.

<div class="component-demo">
  <div class="demo-section">
    <SuBreadcrumb :items="[{ label: 'Accueil', href: '#', icon: HomeIcon, iconOnly: true }, ...items.slice(1)]" />
  </div>
</div>

```vue
<script setup>
import { HomeIcon } from '@heroicons/vue/24/outline'

const items = [
  { label: 'Accueil', href: '/', icon: HomeIcon, iconOnly: true },
  { label: 'Projets', href: '/projets' },
  { label: 'SurgeUI' }
]
</script>
```

### Avec Vue Router

Le slot `item` remplace le rendu d'un élément, par exemple par un `RouterLink`.

```vue
<SuBreadcrumb :items="items">
  <template #item="{ item, current }">
    <span v-if="current" aria-current="page">{{ item.label }}</span>
    <RouterLink v-else :to="item.href">{{ item.label }}</RouterLink>
  </template>
</SuBreadcrumb>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | `BreadcrumbItem[]` | `[]` | Éléments du chemin, de la racine à la page courante |
| `separator` | `'chevron' \| 'slash' \| 'dot'` | `'chevron'` | Séparateur (ou slot `separator`) |
| `maxItems` | `number` | - | Au-delà, le milieu du chemin est replié |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du texte |
| `ariaLabel` | `string` | `'Fil d'Ariane'` | Nom de la navigation |
| `expandLabel` | `string` | `'Afficher le chemin complet'` | Nom du bouton « … » |

### BreadcrumbItem

| Propriété | Type | Description |
|-----------|------|-------------|
| `label` | `string` | Libellé |
| `href` | `string` | Lien (sans lien : texte simple) |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | Cible du lien |
| `icon` | `Component` | Icône avant le libellé |
| `iconOnly` | `boolean` | Masque visuellement le libellé |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `item` | `{ item, index, current }` | Rendu d'un élément |
| `separator` | - | Séparateur personnalisé |

## Accessibilité

- `<nav aria-label="Fil d'Ariane">` contenant une liste ordonnée.
- La page courante (dernier élément) porte `aria-current="page"`.
- Les séparateurs sont masqués aux lecteurs d'écran (`aria-hidden`).
- Le bouton « … » est nommé ; une fois le chemin déplié, le focus va au premier élément révélé.
- En RTL, le chevron est retourné.
