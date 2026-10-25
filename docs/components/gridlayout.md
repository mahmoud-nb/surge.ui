<script setup>
import { ref } from 'vue'

const view = ref('grid')
</script>

# GridLayout

Grille de cellules de même importance : listes de produits, galeries, tableaux de bord. Les cellules se lisent ligne par ligne. Le nombre de colonnes suit la largeur du conteneur, ou s'adapte seul à partir d'une largeur minimale de cellule. Un mode liste empile les cellules, avec un sélecteur grille / liste en option.

## Exemples d'utilisation

### Colonnes par largeur

Par défaut : 1 colonne, 2 dès 640px, 3 dès 1024px.

<div class="component-demo">
  <LayoutFrame>
    <SuGridLayout>
      <LayoutBox label="Cellule 1" height="100px" />
      <LayoutBox label="Cellule 2" height="100px" />
      <LayoutBox label="Cellule 3" height="100px" />
      <LayoutBox label="Cellule 4" height="100px" />
      <LayoutBox label="Cellule 5" height="100px" />
      <LayoutBox label="Cellule 6" height="100px" />
    </SuGridLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuGridLayout :columns="{ base: 1, sm: 2, lg: 3, xl: 4 }">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </SuGridLayout>
</template>
```

Chaque valeur s'applique jusqu'au seuil suivant (mobile first). Un nombre seul fixe les colonnes à toutes les largeurs : `:columns="4"`.

### Colonnes automatiques

`min-item-width` fixe la largeur minimale d'une cellule : la grille place autant de colonnes que possible (*auto-fill*), sans point de rupture. Une cellule ne dépasse jamais la largeur du conteneur.

<div class="component-demo">
  <LayoutFrame>
    <SuGridLayout min-item-width="10rem" gap="sm">
      <LayoutBox label="1" height="90px" />
      <LayoutBox label="2" height="90px" />
      <LayoutBox label="3" height="90px" accent />
      <LayoutBox label="4" height="90px" />
      <LayoutBox label="5" height="90px" />
      <LayoutBox label="6" height="90px" />
      <LayoutBox label="7" height="90px" />
      <LayoutBox label="8" height="90px" />
    </SuGridLayout>
  </LayoutFrame>
</div>

```vue
<SuGridLayout min-item-width="14rem" gap="sm">
  <MediaTile v-for="item in gallery" :key="item.id" :item="item" />
</SuGridLayout>
```

### Grille ou liste

`v-model:view` passe en liste (`'list'`) : les cellules sont empilées sur une colonne. `view-toggle` affiche dans l'en-tête un sélecteur grille / liste ; le slot `header` accueille le titre, le nombre de résultats ou des filtres. Le slot `default` reçoit `view` pour adapter les cellules.

<div class="component-demo">
  <LayoutFrame width="tablet">
    <SuGridLayout v-model:view="view" view-toggle items-tag="ul">
      <template #header>
        <p style="margin: 0; font-weight: 700;">Produits</p>
      </template>
      <li v-for="n in 4" :key="n">
        <LayoutBox :label="'Produit ' + n" :height="view === 'grid' ? '120px' : '56px'" />
      </li>
    </SuGridLayout>
  </LayoutFrame>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const view = ref<'grid' | 'list'>('grid')
</script>

<template>
  <SuGridLayout v-model:view="view" view-toggle items-tag="ul">
    <template #header>
      <h2>Produits</h2>
      <p>{{ products.length }} résultats</p>
    </template>

    <li v-for="product in products" :key="product.id">
      <ProductCard :product="product" :direction="view === 'list' ? 'horizontal' : 'vertical'" />
    </li>
  </SuGridLayout>
</template>
```

Sans `view-toggle`, l'affichage reste pilotable de l'extérieur, par exemple avec votre propre contrôle dans une barre d'outils : `<SuGridLayout :view="view">`.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `view` (`v-model:view`) | `'grid' \| 'list'` | `'grid'` | Affichage : en liste, les cellules sont empilées sur une colonne |
| `columns` | `number \| { base?, sm?, md?, lg?, xl? }` | `{ base: 1, sm: 2, lg: 3 }` | Colonnes, fixes ou par largeur de conteneur |
| `minItemWidth` | `string` | — | Largeur minimale d'une cellule (longueur CSS) : colonnes automatiques, remplace `columns` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Alignement vertical des cellules d'une rangée (`stretch` : même hauteur) |
| `itemsTag` | `'div' \| 'ul' \| 'ol'` | `'div'` | Élément qui contient les cellules : `ul` ou `ol` pour une liste (cellules `li`) |
| `viewToggle` | `boolean` | `false` | Affiche le sélecteur grille / liste dans l'en-tête |
| `viewToggleLabel` | `string` | `'Affichage'` | Nom accessible du sélecteur |
| `gridLabel` | `string` | `'Grille'` | Libellé du bouton « grille » |
| `listLabel` | `string` | `'Liste'` | Libellé du bouton « liste » |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Écart entre les cellules |

### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:view` | `'grid' \| 'list'` | Affichage choisi dans le sélecteur |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `header` | — | Titre, nombre de résultats, filtres (à côté du sélecteur) |
| `default` | `{ view }` | Cellules : chaque enfant direct est une cellule |

## Comportement responsive

| Largeur du conteneur | Colonnes (valeur par défaut) |
|----------------------|------------------------------|
| < 640px | 1 |
| ≥ 640px | 2 |
| ≥ 1024px | 3 |

Avec `min-item-width`, le nombre de colonnes dépend uniquement de la place disponible. En liste, une seule colonne quelle que soit la largeur.

## Accessibilité

- **Ordre de lecture** : les cellules se lisent ligne par ligne, dans l'ordre du DOM, comme la tabulation. C'est la grille à préférer quand l'ordre compte (résultats triés, fil chronologique).
- **Listes** : avec `items-tag="ul"` (ou `"ol"`) et des cellules `<li>`, les lecteurs d'écran annoncent le nombre d'éléments. Le rôle `list` est posé explicitement, car certains navigateurs le retirent aux listes sans puces.
- **Sélecteur grille / liste** : un groupe nommé (`viewToggleLabel`) de deux boutons bascule (`aria-pressed`). Les libellés ne changent pas : seul l'état enfoncé indique l'affichage actif.
