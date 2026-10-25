# SplitLayout

Deux zones côte à côte : écran partagé (visuel + argumentaire, comparaison A / B) ou composition asymétrique grâce à `ratio`. Les zones sont empilées sous le point de rupture.

## Exemples d'utilisation

### Écran partagé

<div class="component-demo">
  <LayoutFrame>
    <SuSplitLayout>
      <template #start>
        <LayoutBox label="Visuel" height="220px" accent />
      </template>
      <template #end>
        <div style="display: flex; flex-direction: column; justify-content: center; gap: 0.75rem; height: 100%; padding: 1.5rem;">
          <p style="font-size: 1.5rem; font-weight: 700;">Connectez-vous</p>
          <p style="color: var(--su-text-secondary);">L'argumentaire ou le formulaire occupe la seconde moitié.</p>
          <div><SuButton variant="primary">Continuer</SuButton></div>
        </div>
      </template>
    </SuSplitLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuSplitLayout full-height>
    <template #start>
      <img src="/cover.jpg" alt="" />
    </template>
    <template #end>
      <LoginForm />
    </template>
  </SuSplitLayout>
</template>
```

`full-height` donne au moins la hauteur de l'écran aux zones en colonnes.

### Asymétrique

`ratio` règle les proportions des zones en colonnes : `2:1` donne les deux tiers à la première zone.

<div class="component-demo">
  <LayoutFrame>
    <SuSplitLayout ratio="3:2" gap="md">
      <template #start>
        <LayoutBox label="Projet phare" height="260px" accent />
      </template>
      <template #end>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--su-layout-gap); height: 100%;">
          <LayoutBox label="Projet 2" height="120px" style="grid-column: span 2;" />
          <LayoutBox label="Projet 3" height="120px" />
          <LayoutBox label="Projet 4" height="120px" />
        </div>
      </template>
    </SuSplitLayout>
  </LayoutFrame>
</div>

```vue
<SuSplitLayout ratio="3:2" gap="md">
  <template #start><ProjectCard featured /></template>
  <template #end><ProjectGrid /></template>
</SuSplitLayout>
```

### Parcours en Z

Des SplitLayout successifs qui alternent `reverse` font passer le regard d'un côté à l'autre. `reverse` n'inverse que l'affichage en colonnes : sur mobile, la zone `start` (le visuel) reste en premier.

<div class="component-demo">
  <LayoutFrame>
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <SuSplitLayout gap="lg" align="center">
        <template #start><LayoutBox label="Visuel 1" height="120px" accent /></template>
        <template #end><LayoutBox label="Fonctionnalité 1" /></template>
      </SuSplitLayout>
      <SuSplitLayout gap="lg" align="center" reverse>
        <template #start><LayoutBox label="Visuel 2" height="120px" accent /></template>
        <template #end><LayoutBox label="Fonctionnalité 2" /></template>
      </SuSplitLayout>
    </div>
  </LayoutFrame>
</div>

```vue
<SuSplitLayout
  v-for="(feature, i) in features"
  :key="feature.id"
  :reverse="i % 2 === 1"
  gap="xl"
  align="center"
>
  <template #start><img :src="feature.image" alt="" /></template>
  <template #end><FeatureText :feature="feature" /></template>
</SuSplitLayout>
```

### Comparaison A / B

```vue
<SuSplitLayout gap="md">
  <template #start><PlanCard plan="starter" /></template>
  <template #end><PlanCard plan="pro" /></template>
</SuSplitLayout>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `ratio` | `'1:1' \| '2:1' \| '1:2' \| '3:2' \| '2:3'` | `'1:1'` | Proportions des zones en colonnes |
| `breakpoint` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Largeur de conteneur à partir de laquelle les zones sont côte à côte |
| `reverse` | `boolean` | `false` | En colonnes, affiche la zone `end` à gauche (l'ordre du DOM ne change pas) |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Alignement vertical des zones en colonnes |
| `fullHeight` | `boolean` | `false` | Hauteur minimale de l'écran en colonnes |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | Écart entre les zones |

### Slots

| Slot | Description |
|------|-------------|
| `start` | Première zone (gauche en colonnes, ou droite avec `reverse`) |
| `end` | Seconde zone |

Chaque zone est une colonne flex : un enfant avec `flex: 1` remplit toute sa hauteur.

## Comportement responsive

| Largeur du conteneur | Rendu |
|----------------------|-------|
| < `breakpoint` | Zones empilées, `start` en premier |
| ≥ `breakpoint` | Zones côte à côte selon `ratio` (et `reverse`) |

## Accessibilité

- **Ordre du DOM** : `start` est toujours lu en premier. Avec `reverse`, placez dans `start` un contenu dont l'ordre de lecture importe peu (visuel, illustration) pour que l'inversion visuelle reste sans conséquence.
- **Visuels décoratifs** : une image purement décorative prend un `alt=""`.
