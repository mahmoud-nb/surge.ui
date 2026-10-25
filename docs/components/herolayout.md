# HeroLayout

Page d'atterrissage pour un lancement de produit ou une inscription : une accroche (surtitre, titre, description, appels à l'action, visuel), suivie des sections de la page. Le titre a une taille fluide qui suit la largeur du conteneur.

## Exemples d'utilisation

### Accroche centrée

<div class="component-demo">
  <LayoutFrame>
    <SuHeroLayout title-tag="h3" gap="lg">
      <template #eyebrow><SuBadge variant="secondary">Nouveau · version 3</SuBadge></template>
      <template #title>Lancez votre produit plus vite</template>
      <template #description>Une accroche claire, un appel à l'action unique et un visuel : le parcours reste simple.</template>
      <template #actions>
        <SuButton variant="primary">Commencer</SuButton>
        <SuButton variant="outline">Voir la démo</SuButton>
      </template>
      <template #media>
        <LayoutBox label="Capture du produit" height="180px" accent />
      </template>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: 0.75rem;">
        <LayoutBox label="Fonctionnalité 1" height="90px" />
        <LayoutBox label="Fonctionnalité 2" height="90px" />
        <LayoutBox label="Fonctionnalité 3" height="90px" />
      </div>
    </SuHeroLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuHeroLayout>
    <template #eyebrow>
      <SuBadge variant="secondary">Nouveau · version 3</SuBadge>
    </template>
    <template #title>Lancez votre produit plus vite</template>
    <template #description>
      <p>Une accroche claire, un appel à l'action unique et un visuel.</p>
    </template>
    <template #actions>
      <SuButton variant="primary">Commencer</SuButton>
      <SuButton variant="outline">Voir la démo</SuButton>
    </template>
    <template #media>
      <img src="/screenshot.png" alt="Tableau de bord du produit" width="1200" height="720" />
    </template>

    <FeaturesSection />
    <PricingSection />
  </SuHeroLayout>
</template>
```

### Visuel à côté

Avec `media-position="end"`, le visuel passe à côté du texte dès 1024px et le texte s'aligne à gauche.

<div class="component-demo">
  <LayoutFrame>
    <SuHeroLayout media-position="end" align="start" title-tag="h3">
      <template #title>Une interface pensée pour vos équipes</template>
      <template #description>Le texte reste à gauche, le visuel à droite en grand format.</template>
      <template #actions><SuButton variant="primary">Essayer</SuButton></template>
      <template #media>
        <LayoutBox label="Visuel" height="200px" accent />
      </template>
    </SuHeroLayout>
  </LayoutFrame>
</div>

```vue
<SuHeroLayout media-position="end" align="start">…</SuHeroLayout>
```

### Plein écran

`full-height` donne à l'accroche au moins la hauteur de l'écran, contenu centré verticalement.

```vue
<SuHeroLayout full-height>…</SuHeroLayout>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `align` | `'center' \| 'start'` | `'center'` | Alignement du texte de l'accroche |
| `mediaPosition` | `'bottom' \| 'end'` | `'bottom'` | Visuel sous le texte, ou à côté dès 1024px |
| `fullHeight` | `boolean` | `false` | L'accroche occupe au moins la hauteur de l'écran |
| `titleTag` | `'h1' \| 'h2' \| 'h3'` | `'h1'` | Niveau du titre |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'xl'` | Écart entre l'accroche et les sections |

### Slots

| Slot | Description |
|------|-------------|
| `eyebrow` | Petit texte au-dessus du titre : badge, catégorie, annonce |
| `title` | Titre de l'accroche, rendu dans `titleTag` |
| `description` | Sous-titre ou argumentaire |
| `actions` | Boutons d'appel à l'action |
| `media` | Image, capture, vidéo (les médias sont rendus fluides) |
| `default` | Sections suivant l'accroche |

## Comportement responsive

| Largeur du conteneur | Rendu |
|----------------------|-------|
| < 1024px | Texte puis visuel, empilés |
| ≥ 1024px | Avec `media-position="end"` : texte \| visuel |

Le titre passe de 32px à 60px selon la largeur du conteneur (`clamp()` en unités de conteneur), sans point de rupture.

## Accessibilité

- **Région nommée** : l'accroche est un `<section>` nommé par son titre (`aria-labelledby`).
- **Niveau de titre** : `h1` par défaut, car l'accroche ouvre la page. Utilisez `title-tag="h2"` si la page a déjà un `h1`.
- **Appels à l'action** : un seul bouton principal (`variant="primary"`) garde un parcours clair ; les liens de navigation restent des `<a>` (SuLink), pas des boutons.
