# MasonryLayout

Mur d'éléments de hauteurs variables (galeries, fils de médias, témoignages) empilés en colonnes, sans trous. Chaque élément garde sa hauteur et n'est jamais coupé entre deux colonnes.

## Exemples d'utilisation

### Colonnes par largeur

Par défaut : 1 colonne, 2 dès 640px, 3 dès 1024px.

<div class="component-demo">
  <LayoutFrame>
    <SuMasonryLayout>
      <LayoutBox label="1" height="140px" />
      <LayoutBox label="2" height="90px" />
      <LayoutBox label="3" height="180px" accent />
      <LayoutBox label="4" height="110px" />
      <LayoutBox label="5" height="150px" />
      <LayoutBox label="6" height="80px" />
      <LayoutBox label="7" height="200px" />
      <LayoutBox label="8" height="100px" />
      <LayoutBox label="9" height="130px" />
    </SuMasonryLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuMasonryLayout :columns="{ base: 1, sm: 2, lg: 3, xl: 4 }">
    <MediaCard v-for="item in feed" :key="item.id" :item="item" />
  </SuMasonryLayout>
</template>
```

Chaque valeur s'applique jusqu'au seuil suivant (mobile first). Un nombre seul fixe les colonnes à toutes les largeurs : `:columns="4"`.

### Colonnes fluides

`column-width` donne une largeur idéale : le navigateur choisit seul le nombre de colonnes, sans point de rupture.

<div class="component-demo">
  <LayoutFrame>
    <SuMasonryLayout column-width="10rem" gap="sm">
      <LayoutBox label="1" height="120px" />
      <LayoutBox label="2" height="80px" />
      <LayoutBox label="3" height="150px" accent />
      <LayoutBox label="4" height="100px" />
      <LayoutBox label="5" height="130px" />
      <LayoutBox label="6" height="90px" />
      <LayoutBox label="7" height="160px" />
      <LayoutBox label="8" height="70px" />
    </SuMasonryLayout>
  </LayoutFrame>
</div>

```vue
<SuMasonryLayout column-width="14rem" gap="sm">…</SuMasonryLayout>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | `number \| { base?, sm?, md?, lg?, xl? }` | `{ base: 1, sm: 2, lg: 3 }` | Colonnes, fixes ou par largeur de conteneur |
| `columnWidth` | `string` | — | Largeur idéale d'une colonne (longueur CSS) ; remplace `columns` |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Écart entre les éléments |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Éléments du mur : chaque enfant direct est une tuile |

## Comportement responsive

| Largeur du conteneur | Colonnes (valeur par défaut) |
|----------------------|------------------------------|
| < 640px | 1 |
| ≥ 640px | 2 |
| ≥ 1024px | 3 |

## Accessibilité

- **Ordre de lecture** : les éléments se lisent **colonne par colonne** (de haut en bas, puis colonne suivante), comme la tabulation. Pour un contenu dont l'ordre compte (fil chronologique, résultats triés), préférez une grille comme celle du [MagazineLayout](/components/magazinelayout).
- **Images** : donnez un `alt` à chaque média porteur de sens, et des dimensions (`width`, `height`) pour éviter les sauts de mise en page au chargement.
