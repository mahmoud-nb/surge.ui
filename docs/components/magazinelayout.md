# MagazineLayout

Hiérarchie éditoriale des sites d'actualité et des blogs : un article à la une, une colonne de titres secondaires, puis une grille d'articles. La grille sert aussi pour les listes de produits et les galeries.

## Exemples d'utilisation

### À la une, secondaires et grille

<div class="component-demo">
  <LayoutFrame>
    <SuMagazineLayout gap="md">
      <template #header>
        <p style="font-size: 1.25rem; font-weight: 700;">Actualités</p>
      </template>
      <template #featured>
        <LayoutBox label="Article à la une" height="220px" accent />
      </template>
      <template #aside>
        <LayoutBox label="Titre secondaire 1" height="64px" />
        <LayoutBox label="Titre secondaire 2" height="64px" />
        <LayoutBox label="Titre secondaire 3" height="64px" />
      </template>
      <LayoutBox label="Article 1" height="110px" />
      <LayoutBox label="Article 2" height="110px" />
      <LayoutBox label="Article 3" height="110px" />
      <LayoutBox label="Article 4" height="110px" />
      <LayoutBox label="Article 5" height="110px" />
      <LayoutBox label="Article 6" height="110px" />
    </SuMagazineLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuMagazineLayout :columns="3">
    <template #header>
      <h1>Actualités</h1>
    </template>
    <template #featured>
      <StoryCard :story="lead" size="lg" />
    </template>
    <template #aside>
      <StoryLink v-for="story in headlines" :key="story.id" :story="story" />
    </template>

    <StoryCard v-for="story in stories" :key="story.id" :story="story" />
  </SuMagazineLayout>
</template>
```

### Grille seule (produits, galerie)

Sans `featured` ni `aside`, il ne reste que la grille : 1 colonne, 2 dès 640px, puis `columns` dès 1024px. Pour une grille sans hiérarchie (colonnes par largeur, colonnes automatiques, mode liste), préférez le [GridLayout](/components/gridlayout).

```vue
<SuMagazineLayout :columns="4" gap="md">
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</SuMagazineLayout>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | `2 \| 3 \| 4` | `3` | Colonnes de la grille dès un conteneur de 1024px |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Écart entre les zones et les articles |

### Slots

| Slot | Description |
|------|-------------|
| `header` | Titre de la rubrique, filtres |
| `featured` | Article à la une |
| `aside` | Titres secondaires, « les plus lus » (empilés) |
| `default` | Articles de la grille : chaque enfant direct est une cellule |

## Comportement responsive

| Largeur du conteneur | Une + secondaires | Grille |
|----------------------|-------------------|--------|
| < 640px | Empilés | 1 colonne |
| ≥ 640px | Empilés | 2 colonnes |
| ≥ 768px | À la une 2/3 + secondaires 1/3 | 2 colonnes |
| ≥ 1024px | À la une 2/3 + secondaires 1/3 | `columns` colonnes |

## Accessibilité

- **Ordre de lecture** : à la une, puis secondaires, puis grille, dans l'ordre visuel.
- **Listes** : pour une liste d'articles, donnez à vos cartes une structure de liste (`role="list"` sur un conteneur, ou des titres de niveau cohérent) afin que les lecteurs d'écran annoncent leur nombre.
