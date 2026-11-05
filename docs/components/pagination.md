<script setup>
import { ref } from 'vue'

const page = ref(1)
const page2 = ref(8)
</script>

# Pagination

Navigation entre les pages d'une liste ou d'un tableau. Le nombre de boutons reste constant (des ellipses remplacent les pages éloignées) : la barre ne change pas de largeur d'une page à l'autre.

## Exemples d'utilisation

### Utilisation de base

À partir du nombre total d'éléments (`total`) et de la taille de page (`pageSize`, 10 par défaut), ou directement avec `pageCount`.

<div class="component-demo">
  <div class="demo-section">
    <SuPagination v-model="page" :total="200" />
    <p>Page {{ page }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <SuPagination v-model="page" :total="200" :page-size="10" />
</template>
```

### Première et dernière page

<div class="component-demo">
  <div class="demo-section">
    <SuPagination v-model="page2" :page-count="20" show-edges />
  </div>
</div>

```vue
<SuPagination v-model="page" :page-count="20" show-edges />
```

### Pages voisines et extrémités

`siblings` règle le nombre de pages de part et d'autre de la page courante, `boundaries` le nombre de pages toujours visibles au début et à la fin.

<div class="component-demo">
  <div class="demo-section">
    <SuPagination :model-value="10" :page-count="20" :siblings="2" :boundaries="2" />
  </div>
</div>

```vue
<SuPagination v-model="page" :page-count="20" :siblings="2" :boundaries="2" />
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuPagination :model-value="3" :page-count="8" size="sm" />
      <SuPagination :model-value="3" :page-count="8" size="md" />
      <SuPagination :model-value="3" :page-count="8" size="lg" />
    </div>
  </div>
</div>

```vue
<SuPagination v-model="page" :page-count="8" size="sm" />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `number` | `1` | Page courante, de 1 à n (v-model) |
| `total` | `number` | - | Nombre total d'éléments |
| `pageSize` | `number` | `10` | Éléments par page |
| `pageCount` | `number` | - | Nombre de pages, prioritaire sur `total` / `pageSize` |
| `siblings` | `number` | `1` | Pages de part et d'autre de la page courante |
| `boundaries` | `number` | `1` | Pages toujours affichées au début et à la fin |
| `showEdges` | `boolean` | `false` | Boutons première / dernière page |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `disabled` | `boolean` | `false` | Désactive la pagination |
| `ariaLabel` | `string` | `'Pagination'` | Nom de la navigation |
| `previousLabel` / `nextLabel` | `string` | `'Page précédente'` / `'Page suivante'` | Noms des boutons précédent / suivant |
| `firstLabel` / `lastLabel` | `string` | `'Première page'` / `'Dernière page'` | Noms des boutons d'extrémité |
| `pageLabel` | `(page: number) => string` | `'Page {page}'` | Nom d'un bouton de page |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `number` | Nouvelle page (v-model) |
| `change` | `number` | Changement de page par l'utilisateur |

Le calcul des pages est exporté séparément, pour une pagination sur mesure : `import { getPaginationItems } from '@surgeui/ds-vue'`, puis `getPaginationItems({ page, count, siblings, boundaries })` renvoie les numéros et les ellipses (`'ellipsis-start'`, `'ellipsis-end'`).

## Accessibilité

- `<nav aria-label="Pagination">` contenant une liste ; la page courante porte `aria-current="page"`.
- Chaque bouton de page est nommé « Page 3 » : le nom contient le chiffre affiché (WCAG 2.5.3).
- À la première ou la dernière page, précédent et suivant restent focusables avec `aria-disabled="true"` : le focus n'est pas perdu quand le bouton devient inactif.
- Les ellipses sont masquées aux lecteurs d'écran.
- En RTL, les chevrons sont retournés.
