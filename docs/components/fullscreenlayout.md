# FullScreenLayout

Récit en plein écran, une idée par écran : présentation de produit, rapport annuel, parcours d'accueil. Chaque enfant direct occupe la hauteur de la zone et le défilement s'aimante sur chacun.

## Exemples d'utilisation

### Écrans successifs

Faites défiler la zone (molette, glisser, ou au clavier après l'avoir focalisée avec Tab) :

<div class="component-demo">
  <LayoutFrame width="tablet">
    <SuFullScreenLayout height="300px" snap="mandatory" label="Présentation du produit">
      <section style="display: grid; place-items: center; background: var(--su-bg-muted);">Écran 1 · Une idée par écran</section>
      <section style="display: grid; place-items: center; background: color-mix(in srgb, var(--su-primary-default) 12%, transparent);">Écran 2 · Le défilement s'aimante</section>
      <section style="display: grid; place-items: center; background: var(--su-bg-muted);">Écran 3 · Au clavier aussi</section>
    </SuFullScreenLayout>
  </LayoutFrame>
</div>

```vue
<template>
  <SuFullScreenLayout snap="mandatory" label="Présentation du produit">
    <section class="screen">…</section>
    <section class="screen">…</section>
    <section class="screen">…</section>
  </SuFullScreenLayout>
</template>
```

### Aimantation

- `proximity` (par défaut) : le défilement s'arrête sur un écran seulement à proximité. Un écran plus long que la zone reste lisible en entier.
- `mandatory` : le défilement s'arrête toujours au début d'un écran. Réservez-le à des écrans qui tiennent dans la hauteur.
- `none` : défilement libre, écrans de pleine hauteur.

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `snap` | `'mandatory' \| 'proximity' \| 'none'` | `'proximity'` | Aimantation du défilement |
| `height` | `string` | `'100svh'` | Hauteur de la zone de défilement (un écran) |
| `label` | `string` | — | Nom accessible de la zone ; la rend repérable comme région |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Écrans successifs : chaque enfant direct (par exemple un `<section>`) est un écran |

## Comportement responsive

`100svh` (*small viewport height*) correspond à la hauteur visible sur mobile, barres du navigateur affichées : un écran n'est jamais masqué par l'interface du navigateur. Chaque écran fait **au moins** cette hauteur et s'allonge si son contenu l'exige.

## Accessibilité

- **Clavier** (WCAG 2.1.1) : la zone défilante est focalisable (`tabindex="0"`) ; une fois focalisée, les flèches et Page suivante / précédente la font défiler.
- **Région** : avec `label`, la zone devient une région nommée que les lecteurs d'écran peuvent atteindre directement.
- **Animations** : le défilement doux n'est activé que si l'utilisateur n'a pas demandé à réduire les animations.
- **Contenu long** : évitez `mandatory` avec des écrans plus hauts que la zone, la fin du contenu deviendrait difficile à atteindre.
