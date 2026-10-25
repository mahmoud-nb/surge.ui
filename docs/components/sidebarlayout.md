# SidebarLayout

Deux colonnes : une barre latérale de largeur fixe et un contenu fluide. Pour la documentation, les tableaux de bord et l'administration. Sous le point de rupture, les zones sont empilées dans l'ordre du DOM.

## Exemples d'utilisation

### Barre à gauche

<div class="component-demo">
  <LayoutFrame>
    <SuSidebarLayout sidebar-tag="nav" sidebar-label="Documentation">
      <template #sidebar>
        <LayoutBox label="Navigation" height="180px" />
      </template>
      <LayoutBox label="Contenu principal" height="180px" accent />
    </SuSidebarLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuSidebarLayout sidebar-tag="nav" sidebar-label="Documentation">
    <template #sidebar>
      <DocsMenu />
    </template>

    <DocsPage />
  </SuSidebarLayout>
</template>
```

### Barre à droite

Avec `sidebar-position="end"`, la barre latérale passe à droite **et** après le contenu dans le DOM : sur mobile, le contenu vient en premier.

<div class="component-demo">
  <LayoutFrame>
    <SuSidebarLayout sidebar-position="end" sidebar-label="Sur cette page">
      <template #sidebar>
        <LayoutBox label="Sommaire" height="140px" />
      </template>
      <LayoutBox label="Article" height="180px" accent />
    </SuSidebarLayout>
  </LayoutFrame>
</div>

```vue
<SuSidebarLayout sidebar-position="end" sidebar-width="14rem" sidebar-label="Sur cette page">
  <template #sidebar><TableOfContents /></template>
  <Article />
</SuSidebarLayout>
```

### Barre collante

`sticky-sidebar` garde la barre visible pendant le défilement du contenu (en colonnes uniquement). Si elle est plus haute que l'écran, elle défile elle-même. `sticky-offset` la décale sous un en-tête fixe.

```vue
<SuSidebarLayout sticky-sidebar sticky-offset="4rem" sidebar-tag="nav" sidebar-label="Paramètres">
  <template #sidebar><SettingsMenu /></template>
  <SettingsForm />
</SuSidebarLayout>
```

### Point de rupture

`breakpoint` choisit la largeur de conteneur à partir de laquelle les deux colonnes apparaissent (`md` par défaut).

```vue
<!-- Colonnes dès 1024px de large -->
<SuSidebarLayout breakpoint="lg">…</SuSidebarLayout>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `sidebarPosition` | `'start' \| 'end'` | `'start'` | Côté de la barre latérale (l'ordre du DOM suit l'ordre visuel) |
| `sidebarWidth` | `string` | `'16rem'` | Largeur de la barre en colonnes (longueur CSS) |
| `breakpoint` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Largeur de conteneur à partir de laquelle les colonnes apparaissent |
| `stickySidebar` | `boolean` | `false` | Barre collante (en colonnes) |
| `stickyOffset` | `string` | `'0px'` | Distance au haut de l'écran de la barre collante |
| `sidebarTag` | `'aside' \| 'nav' \| 'div'` | `'aside'` | Élément de la barre latérale |
| `sidebarLabel` | `string` | — | Nom accessible de la barre (`aside`, `nav`) |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Écart entre les colonnes |

### Slots

| Slot | Description |
|------|-------------|
| `sidebar` | Navigation, filtres, sommaire. Sans ce slot, le contenu occupe toute la largeur |
| `default` | Contenu principal |

## Comportement responsive

| Largeur du conteneur | Rendu |
|----------------------|-------|
| < `breakpoint` | Zones empilées dans l'ordre du DOM |
| ≥ `breakpoint` | Barre de `sidebarWidth` + contenu fluide |

## Accessibilité

- **Région nommée** : avec `sidebar-tag="nav"` ou `"aside"`, donnez un `sidebar-label` pour distinguer la région des autres (« Documentation », « Filtres »…).
- **Ordre cohérent** : la position de la barre change l'ordre du DOM, jamais seulement l'affichage. La tabulation suit ce que l'on voit.
- **Barre collante** : quand elle défile seule, ses liens restent atteignables au clavier.
