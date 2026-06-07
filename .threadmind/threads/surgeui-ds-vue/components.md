---
id: components
title: components
parentId: main
author: mahmoud-b73a
createdAt: 2026-05-18T09:35:28.843Z
updatedAt: 2026-06-07T19:07:39.272Z
---

## Composant Card — Organism (Terminé ✅)

### Décision
Création d'un composant Card universel, flexible et responsive, adapté à plusieurs cas d'usage (produit, blog, profil, stats, etc.). Implémenté comme organism dans la hiérarchie Atomic Design.

### Architecture technique

**Card.vue** (`package/src/components/organisms/Card.vue`) :
- Tag racine dynamique : `<article>` par défaut, `<a>` si `href` fourni
- `useSlots()` pour vérifier les slots dans `<script setup>` (car `$slots` n'est disponible que dans le template)
- `defineSlots<{}>()` séparé pour le typage (sans assignation à une variable)
- Pattern BEM : `.su-card`, `.su-card--elevated`, `.su-card__body`, etc.
- SCSS Pattern 1 : `@use '../../styles/main' as *` avec valeurs rem directes

**Props principales** (types dans `types/index.ts`) :
- `variant`: `default | outlined | elevated | filled`
- `size`: `sm | md | lg`
- `direction`: `vertical | horizontal` (responsive → vertical sur mobile < 640px)
- `radius`, `clickable`, `href`, `target`, `disabled`, `fullWidth`, `maxWidth`
- Image : `image`, `imageAlt`, `imageRatio` (16/9, 4/3, 1/1, 21/9, auto), `imageFit`, `imagePosition` (top/bottom)
- Titre : `title`, `subtitle`, `titleLevel` (1-6)

**Slots** : `default`, `image`, `image-overlay`, `header`, `title`, `subtitle`, `footer`

**Accessibilité** :
- `role="button"` + `tabindex="0"` si clickable sans href
- Navigation clavier : Enter/Space déclenchent le clic
- `aria-disabled="true"` quand disabled
- `rel="noopener noreferrer"` automatique avec `target="_blank"`
- `loading="lazy"` sur les images
- Support `prefers-contrast: high` et `prefers-reduced-motion: reduce`

### Fichiers créés
- `package/src/components/organisms/Card.vue`
- `package/src/components/organisms/_stories/Card.stories.ts` (14 stories)
- `docs/components/card.md` (FR)
- `docs/en/components/card.md` (EN)

### Fichiers modifiés
- `package/src/types/index.ts` — `CardVariant`, `CardSize`, `CardDirection`, `CardProps`
- `package/src/index.ts` — Import, export, registration plugin
- `docs/.vitepress/config.ts` — Card ajouté au groupe display avec badge "New"

### Erreur résolue
- **TS2304: Cannot find name `$slots`** — `$slots.image` utilisé dans un computed de `<script setup>`. Résolu avec `const slots = useSlots()` + `slots.image` dans le script.

### Bug corrigé (Price.stories.ts)
- Import `h` de vue inutilisé supprimé (warning ESLint)

### Build
✅ Succès — seules les 4 erreurs pré-existantes (ButtonGroup, FormFieldGroup, LinkGroup, useTheme), aucune nouvelle.

### Composants créés cette session (total)
1. **usePrice** composable + **Price** atom — Formatage prix/devises avec Intl.NumberFormat
2. **Card** organism — Carte universelle flexible responsive
3. Section **Composables** ajoutée à la navigation docs avec badges "New"