# HolyGrailLayout

Mise en page d'application : en-tête, navigation, contenu principal, colonne complémentaire et pied de page. Les régions sémantiques et un lien d'évitement sont intégrés.

## Exemples d'utilisation

### Trois colonnes

Changez la largeur du cadre : tout est empilé en mobile ; dès 768px, la navigation passe à gauche et le complément sous le contenu ; dès 1024px, trois colonnes.

<div class="component-demo">
  <LayoutFrame>
    <SuHolyGrailLayout :landmarks="false" :full-height="false" gap="md">
      <template #header>
        <LayoutBox label="En-tête : logo, recherche, compte" height="48px" />
      </template>
      <template #nav>
        <LayoutBox label="Navigation" height="160px" />
      </template>
      <LayoutBox label="Contenu principal" height="220px" accent />
      <template #aside>
        <LayoutBox label="Complément" height="160px" />
      </template>
      <template #footer>
        <LayoutBox label="Pied de page" height="48px" />
      </template>
    </SuHolyGrailLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuHolyGrailLayout sticky-header>
    <template #header>
      <AppHeader />
    </template>
    <template #nav>
      <AppMenu />
    </template>

    <RouterView />

    <template #aside>
      <ContextPanel />
    </template>
    <template #footer>
      <AppFooter />
    </template>
  </SuHolyGrailLayout>
</template>
```

::: tip Démo
La démo ci-dessus utilise `:landmarks="false"` : elle est placée dans une page qui a déjà ses propres régions (`main`…). Dans une application, gardez la valeur par défaut.
:::

### En-tête et colonnes collants

`sticky-header` fixe l'en-tête en haut de l'écran. `sticky-sidebars` garde la navigation et le complément visibles (en colonnes) ; `sticky-offset` les place sous l'en-tête.

```vue
<SuHolyGrailLayout sticky-header sticky-sidebars sticky-offset="4.5rem">…</SuHolyGrailLayout>
```

### Sans colonne complémentaire

Les slots absents ne réservent aucune place : sans `aside`, le contenu prend toute la largeur à droite de la navigation.

```vue
<SuHolyGrailLayout>
  <template #header>…</template>
  <template #nav>…</template>
  <Dashboard />
</SuHolyGrailLayout>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `navWidth` | `string` | `'15rem'` | Largeur de la navigation (dès 768px) |
| `asideWidth` | `string` | `'16rem'` | Largeur du complément (dès 1024px, ou 768px sans navigation) |
| `stickyHeader` | `boolean` | `false` | En-tête collant |
| `stickySidebars` | `boolean` | `false` | Navigation et complément collants (en colonnes) |
| `stickyOffset` | `string` | `'0px'` | Distance au haut de l'écran des colonnes collantes |
| `fullHeight` | `boolean` | `true` | Au moins la hauteur de l'écran : le pied de page reste en bas |
| `landmarks` | `boolean` | `true` | Régions `header`, `nav`, `main`, `aside`, `footer` ; `false` : de simples `div` |
| `skipLink` | `boolean` | `true` | Lien d'évitement vers le contenu principal (avec `landmarks`) |
| `skipLinkLabel` | `string` | `'Aller au contenu principal'` | Texte du lien d'évitement |
| `navLabel` | `string` | `'Navigation principale'` | Nom accessible de la navigation |
| `asideLabel` | `string` | `'Informations complémentaires'` | Nom accessible du complément |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Écart entre les zones |

### Slots

| Slot | Élément | Description |
|------|---------|-------------|
| `header` | `<header>` | Logo, recherche, menu utilisateur |
| `nav` | `<nav>` | Navigation principale |
| `default` | `<main>` | Contenu principal |
| `aside` | `<aside>` | Filtres, sommaire, contenu associé |
| `footer` | `<footer>` | Pied de page |

## Comportement responsive

| Largeur du conteneur | Rendu |
|----------------------|-------|
| < 768px | Tout est empilé : en-tête, navigation, contenu, complément, pied |
| ≥ 768px | Navigation \| contenu ; le complément passe sous le contenu |
| ≥ 1024px | Navigation \| contenu \| complément |

Sur mobile, une navigation longue repousse le contenu : placez-y plutôt un menu repliable (par exemple un [Accordion](/components/accordion) ou un [Dropdown](/components/dropdown)).

## Accessibilité

- **Régions** : `header` (bannière), `nav`, `main`, `aside` et `footer` permettent aux lecteurs d'écran de sauter d'une zone à l'autre. Une page ne doit avoir qu'un `main` : utilisez `:landmarks="false"` pour un layout imbriqué.
- **Lien d'évitement** (WCAG 2.4.1) : premier élément tabulable, visible seulement au focus clavier, il donne le focus au contenu principal sans passer par le routage par ancre.
- **Noms des régions** : `navLabel` et `asideLabel` distinguent ces régions des autres `nav` ou `aside` de la page.
