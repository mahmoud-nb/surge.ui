---
id: layouts
title: layouts
parentId: components
author: mahmoud-a1f1
createdAt: 2026-10-25T12:07:22.479Z
updatedAt: 2026-10-25T13:49:47.262Z
commit: cfffc5436f2911c3c4cc513926d7d922feced875
paths: ["package/src/components/templates/GridLayout.vue","package/src/utils/layout.ts","docs/components/gridlayout.md","docs/en/components/gridlayout.md","package/tests/GridLayout.spec.ts"]
---

## Decisions
- 8 layouts dans package/src/components/templates :
  - SingleColumnLayout ;
  - SidebarLayout (deux colonnes) ;
  - SplitLayout (écran partagé + asymétrique via ratio + parcours en Z via reverse) ;
  - HolyGrailLayout ;
  - MagazineLayout (sa grille couvre aussi « Grid Layout ») ;
  - MasonryLayout (colonnes CSS) ;
  - HeroLayout ;
  - FullScreenLayout (scroll-snap).
- Les parcours en F et en Z sont des modèles de lecture, pas des composants : ils sont documentés dans la page d'ensemble.
- Responsive mobile first avec des **container queries** : la racine pose `container: <nom> / inline-size`. Container-type ne crée pas de bloc conteneur pour `position: fixed` (vérifié dans Chrome et dans Floating UI) : les popovers restent compatibles.
- Abstracts ajoutés :
  - mixin `container-up($bp, $container)` dans _breakpoints ;
  - `layout-container($name)`, qui gère les modificateurs `--gap-*` vers `--su-layout-gap` (none/sm/md/lg/xl), et `layout-region` dans _patterns.
- L'ordre du DOM suit l'ordre visuel. Seule exception : `reverse` du SplitLayout, qui n'agit qu'en colonnes.
- HolyGrail :
  - régions sémantiques (`landmarks`, `false` pour l'imbrication) ;
  - lien d'évitement qui focalise `<main>` sans routage par ancre.
- Présence des slots évaluée au rendu (fonctions et non computed), car les slots ne sont pas réactifs.
- GridLayout (SuGridLayout) remplace l'ancien Grid (supprimé, jamais exporté) :
  - `columns` : nombre ou `{ base, sm, md, lg, xl }` (défaut 1 / 2 dès sm / 3 dès lg), ou `minItemWidth` pour une grille auto-fill (remplace `columns`) ;
  - `gap: LayoutGap`, `align`, `itemsTag` (`div` | `ul` | `ol`, `role="list"` explicite pour Safari) ;
  - `v-model:view` (`'grid'` | `'list'`, defineModel) et slot par défaut avec la prop `view` ;
  - sélecteur grille / liste optionnel (`viewToggle`) : groupe nommé de deux boutons `aria-pressed`, libellés en props (`viewToggleLabel` « Affichage », `gridLabel` « Grille », `listLabel` « Liste ») ;
  - slot `header` à côté du sélecteur ; écart fixe en-tête / cellules (`$spacing-4`) pour rester lisible avec `gap="none"`.
- `utils/layout.ts` (`columnVars`) : calcul mobile first des variables de colonnes, partagé par GridLayout et MasonryLayout. Type `LayoutColumns` (MasonryColumns en est un alias).
- GridCell n'est plus qu'une cellule des vitrines Storybook : déplacée dans `components/global`, sans `role="listitem"`.

## Constraints
- Les styles des layouts ne sont pas scopés (sélecteurs d'enfants directs : masonry, plein écran, grille du magazine).
- Doc : les démos utilisent les composants globaux LayoutFrame (cadre simulant 375/768/1024px, réduit avec `zoom` sans changer la largeur vue par les container queries) et LayoutBox (docs/.vitepress/theme/components).
- Doc : les composants SurgeUI ne sont enregistrés que `inBrowser` (theme/index.ts). Au rendu SSR, un slot à portée qui déstructure ses props (`#default="{ view }"`) plante le build : dans les démos, passer par une ref de `<script setup>` plutôt que par les props de slot.
- Sous Windows, `sed -i` de Git Bash convertit les fichiers CRLF en LF : vérifier les fins de ligne (`tr -cd '\r' | wc -c`) avant de commiter.

## State
- 2026-10-25 : `feat/layouts` est fusionnée dans `main` (commit de fusion cfffc54, `--no-ff`) ; main a 37 commits d'avance sur origin et **n'est pas poussée**.
- 9 layouts exportés et enregistrés : SingleColumn, Sidebar, Split, HolyGrail, Magazine, Grid, Masonry, Hero et FullScreen.
- GridLayout (fait par une session dédiée) remplace l'ancien Grid :
  - colonnes `{ base…xl }` ou `minItemWidth` en auto-fill ;
  - `v-model:view` grille/liste et `viewToggle` optionnel ;
  - `itemsTag` ul/ol.
- Le calcul des colonnes est partagé dans utils/layout.ts (avec Masonry). GridCell a été déplacé dans components/global (vitrines Storybook uniquement).
- Contrôles :
  - 58 tests verts ;
  - ESLint : 0 erreur ;
  - Stylelint : 52 erreurs déjà présentes, aucune dans les layouts ;
  - builds de la lib et de la doc : OK.

## Next steps
- Pousser main (sur demande de l'utilisateur) ; supprimer éventuellement les branches locales feat/layouts et refactor/audit-phases-0-1.
- Redémarrer le Storybook de l'utilisateur (port 6006), lancé avant le passage à Storybook 8.6.14.