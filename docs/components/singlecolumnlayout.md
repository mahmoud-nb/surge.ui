# SingleColumnLayout

Une seule colonne centrée, à la longueur de ligne confortable : articles, blogs, formulaires, pages mobiles. Sur mobile, la colonne occupe toute la largeur avec une marge latérale ; au-delà, elle se centre et s'arrête à sa largeur maximale.

## Exemples d'utilisation

### Article

<div class="component-demo">
  <LayoutFrame>
    <SuSingleColumnLayout as="article">
      <template #header>
        <p style="font-size: 1.5rem; font-weight: 700;">Titre de l'article</p>
        <p style="color: var(--su-text-secondary);">Publié le 25 octobre · 4 min de lecture</p>
      </template>
      <LayoutBox label="Image d'illustration" height="140px" accent />
      <p style="margin-top: 1rem; line-height: 1.7;">La longueur de ligne reste confortable à la lecture : environ soixante-cinq caractères, quelle que soit la largeur de l'écran. Sur mobile, la colonne occupe toute la largeur avec une marge latérale.</p>
      <template #footer>
        <LayoutBox label="Auteur, partage, articles suivants" />
      </template>
    </SuSingleColumnLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuSingleColumnLayout as="article">
    <template #header>
      <h1>Titre de l'article</h1>
      <p>Publié le 25 octobre · 4 min de lecture</p>
    </template>

    <img src="/illustration.jpg" alt="…" />
    <p>Contenu de l'article…</p>

    <template #footer>
      <AuthorCard />
    </template>
  </SuSingleColumnLayout>
</template>
```

### Largeurs

`prose` (par défaut) limite la ligne à environ 65 caractères, la longueur recommandée pour la lecture. Les autres largeurs conviennent aux formulaires (`narrow`), aux contenus mixtes (`medium`, `wide`) ou à une pleine largeur (`full`).

<div class="component-demo">
  <LayoutFrame>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <SuSingleColumnLayout width="narrow"><LayoutBox label="narrow · 36rem" /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="prose"><LayoutBox label="prose · 65ch" accent /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="medium"><LayoutBox label="medium · 48rem" /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="wide"><LayoutBox label="wide · 72rem" /></SuSingleColumnLayout>
      <SuSingleColumnLayout width="full"><LayoutBox label="full" /></SuSingleColumnLayout>
    </div>
  </LayoutFrame>
</div>

```vue
<SuSingleColumnLayout width="narrow">
  <LoginForm />
</SuSingleColumnLayout>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `width` | `'prose' \| 'narrow' \| 'medium' \| 'wide' \| 'full'` | `'prose'` | Largeur maximale : prose ≈ 65 caractères, narrow 36rem, medium 48rem, wide 72rem, full sans limite |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Écart entre en-tête, contenu et pied |
| `padded` | `boolean` | `true` | Marges latérales : 16px, puis 24px dès un conteneur de 768px |
| `as` | `string` | `'div'` | Élément racine (`article`, `main`, `section`…) |

### Slots

| Slot | Description |
|------|-------------|
| `header` | Titre, chapeau, fil d'Ariane |
| `default` | Contenu principal |
| `footer` | Auteur, partage, navigation entre articles |

## Comportement responsive

| Largeur du conteneur | Rendu |
|----------------------|-------|
| < 768px | Pleine largeur, marges de 16px |
| ≥ 768px | Marges de 24px, colonne centrée dès que le conteneur dépasse la largeur maximale |

La largeur maximale ne compte pas les marges : une colonne `prose` garde ses 65 caractères de texte.

## Accessibilité

- **Longueur de ligne** : `prose` respecte la recommandation de lisibilité (WCAG 1.4.8, 80 caractères au plus).
- **Sémantique** : choisissez l'élément racine avec `as` (`article` pour un billet, `main` pour le contenu principal de la page). Les zones `header` et `footer` sont de simples conteneurs : placez-y vos propres `<header>` ou `<footer>` si besoin.
- **Zoom** : aucune largeur fixe en pixels, le contenu se réorganise jusqu'à 400 % de zoom (WCAG 1.4.10).
