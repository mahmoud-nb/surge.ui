<script setup>
import { ref } from 'vue'

const columns = [
  { key: 'name', label: 'Client', sortable: true },
  { key: 'city', label: 'Ville', sortable: true },
  { key: 'orders', label: 'Commandes', sortable: true, align: 'end' },
  { key: 'status', label: 'Statut' }
]
const rows = [
  { id: 1, name: 'Émile A.', city: 'Paris', orders: 12, status: 'Actif' },
  { id: 2, name: 'Adèle H.', city: 'Nantes', orders: 37, status: 'En pause' },
  { id: 3, name: 'Bruno O.', city: 'Évreux', orders: 4, status: 'Actif' },
  { id: 4, name: 'Chloé V.', city: 'Marseille', orders: 111, status: 'Résilié' },
  { id: 5, name: 'Damien C.', city: 'Bordeaux', orders: 8, status: 'Actif' },
  { id: 6, name: 'Inès J.', city: 'Lyon', orders: 45, status: 'En pause' },
  { id: 7, name: 'Léa Q.', city: 'Lille', orders: 82, status: 'Actif' }
]
const sort = ref(null)
const page = ref(1)
const selected = ref([])
const variant = (status) => (status === 'Actif' ? 'success' : status === 'En pause' ? 'warning' : 'default')
</script>

# DataTable

Tableau de données : tri, sélection de lignes, pagination, chargement et état vide, sur un vrai `<table>` accessible.

## Exemples d'utilisation

### Tri, sélection et pagination

<div class="component-demo">
  <div class="demo-section">
    <SuDataTable v-model:sort="sort" v-model:page="page" v-model:selected="selected" :columns="columns" :rows="rows" caption="Clients" selectable :page-size="5">
      <template #cell-status="{ value }">
        <SuTag :label="value" :variant="variant(value)" size="sm" />
      </template>
    </SuDataTable>
    <p>Sélection : {{ selected.length ? selected.join(', ') : 'aucune' }}</p>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const columns = [
  { key: 'name', label: 'Client', sortable: true },
  { key: 'city', label: 'Ville', sortable: true },
  { key: 'orders', label: 'Commandes', sortable: true, align: 'end' },
  { key: 'status', label: 'Statut' }
]
const rows = ref([/* { id, name, city, orders, status } */])
const sort = ref(null)
const page = ref(1)
const selected = ref([])
</script>

<template>
  <SuDataTable
    v-model:sort="sort"
    v-model:page="page"
    v-model:selected="selected"
    :columns="columns"
    :rows="rows"
    caption="Clients"
    selectable
    :page-size="5"
  >
    <template #cell-status="{ value }">
      <SuTag :label="value" size="sm" />
    </template>
  </SuDataTable>
</template>
```

### Format, alignement et colonne d'actions

`format` transforme l'affichage sans changer la valeur triée ; `hideLabel` masque visuellement un en-tête (colonne d'actions) qui reste lu.

```js
const columns = [
  { key: 'revenue', label: 'Chiffre d’affaires', sortable: true, align: 'end',
    format: (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value) },
  { key: 'since', label: 'Client depuis', sortable: true,
    format: (value) => value.toLocaleDateString('fr-FR') },
  { key: 'actions', label: 'Actions', hideLabel: true, align: 'end' }
]
```

### Tri et pagination serveur

Avec `manual`, les lignes reçues sont affichées telles quelles : le tableau émet `update:sort` et `update:page`, le serveur renvoie la page triée et `total` donne le nombre de pages.

```vue
<SuDataTable
  v-model:sort="sort"
  v-model:page="page"
  :columns="columns"
  :rows="pageRows"
  :total="total"
  :page-size="20"
  :loading="loading"
  manual
  caption="Commandes"
  @update:sort="fetchPage"
  @update:page="fetchPage"
/>
```

### Chargement et état vide

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuDataTable :columns="columns" :rows="rows" caption="Chargement" caption-hidden loading :page-size="3" />
      <SuDataTable :columns="columns" :rows="[]" caption="Aucun client" caption-hidden empty-text="Aucun client ne correspond aux filtres." />
    </div>
  </div>
</div>

```vue
<SuDataTable :columns="columns" :rows="rows" :loading="loading" />
<SuDataTable :columns="columns" :rows="[]" empty-text="Aucun client ne correspond aux filtres." />
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | `DataTableColumn[]` | `[]` | Colonnes |
| `rows` | `Record<string, any>[]` | `[]` | Lignes |
| `rowKey` | `string \| (row) => string \| number` | `'id'` | Identifiant d'une ligne |
| `caption` | `string` | - | Titre du tableau, nom de la zone (ou slot `caption`) |
| `captionHidden` | `boolean` | `false` | Titre lu mais masqué visuellement |
| `selectable` | `boolean` | `false` | Cases à cocher de sélection |
| `rowLabel` | `(row) => string` | première colonne | Nom d'une ligne pour sa case |
| `pageSize` | `number` | - | Lignes par page (pagination) |
| `manual` | `boolean` | `false` | Tri et pagination faits par le serveur |
| `total` | `number` | - | Total de lignes en mode `manual` |
| `loading` | `boolean` | `false` | Chargement : squelettes et `aria-busy` |
| `emptyText` | `string` | `'Aucune donnée'` | Texte de l'état vide (ou slot `empty`) |
| `striped` | `boolean` | `false` | Lignes alternées |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Densité |
| `stickyHeader` | `boolean` | `false` | En-tête collant (avec `maxHeight`) |
| `maxHeight` | `string` | - | Hauteur maximale (défilement) |
| `locale` | `string` | locale des composants | Langue du tri alphabétique |

### DataTableColumn

| Propriété | Type | Description |
|-----------|------|-------------|
| `key` | `string` | Propriété de la ligne |
| `label` | `string` | En-tête |
| `sortable` | `boolean` | Colonne triable |
| `align` | `'start' \| 'center' \| 'end'` | Alignement (`end` : chiffres tabulaires) |
| `width` | `string` | Largeur |
| `format` | `(value, row) => string` | Texte affiché |
| `sortFn` | `(a, b) => number` | Comparaison personnalisée |
| `hideLabel` | `boolean` | En-tête masqué visuellement |

### v-model

| Modèle | Type | Description |
|--------|------|-------------|
| `v-model:sort` | `{ key, direction: 'asc' \| 'desc' } \| null` | Tri courant |
| `v-model:page` | `number` | Page courante |
| `v-model:selected` | `(string \| number)[]` | Identifiants des lignes cochées |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `cell-{key}` | `{ row, value, index }` | Contenu d'une cellule |
| `header-{key}` | `{ column }` | Contenu d'un en-tête |
| `caption` | - | Titre riche |
| `empty` | - | État vide (ex. `SuEmptyState`) |

## Accessibilité

- Vrai `<table>` : `<caption>`, en-têtes de colonnes (`scope="col"`) et de lignes (première colonne, `scope="row"`).
- Tri : bouton dans l'en-tête, `aria-sort` sur la colonne triée, annonce « Trié par Ville, ordre croissant ». Ordre alphabétique de la langue (accents, nombres dans le texte), cellules vides toujours à la fin.
- Sélection : chaque case est nommée par la ligne (« Sélectionner Émile A. ») ; la case « Tout sélectionner » porte l'état mixte et agit sur les lignes affichées.
- La zone de défilement est focusable (défilement au clavier) et nommée par le titre.
- Chargement : `aria-busy="true"` et texte « Chargement en cours… » lu dans le tableau.
