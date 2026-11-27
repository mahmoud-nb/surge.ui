---
id: retours-operia-plan-320-330
title: "Retours Operia : plan 3.2.0 / 3.3.0"
parentId: main
author: mahmoud-a1f1
createdAt: 2026-11-26T17:03:17.995Z
updatedAt: 2026-11-27T22:48:35.262Z
commit: af0979931a51936e6c9e371c35b516846fd26af3
paths: ["surgeui-points-a-corriger.md","package/src/components/atoms/Button.vue","package/src/styles/themes","package/src/components/organisms/Dialog.vue","package/src/components/organisms/Tabs.vue","package/src/components/molecules/Dropdown.vue","package/src/index.ts","package/src/composables/useLocale.ts"]
---

# Retours Operia : plan 3.2.0 / 3.3.0

Source : `surgeui-points-a-corriger.md` (racine), rédigé le 26/11/2026 après l'intégration de 3.1.0 dans Operia (Nuxt 4 SPA, Tailwind 4).

## Decisions
- Découpage proposé par l'utilisateur, **pas encore validé** : 3.2.0 = A1-A7, `style.layer.css`, types globaux, arabe, langue par défaut ; 3.3.0 = Popover, liens du routeur, onglets par identifiant, badge à point, préréglage Tailwind, guides RTL et Nuxt ; paquet séparé `@surgeui/nuxt`.

## State
2026-11-26 : 3.2.0 terminée sur `feat/v3.2.0` : 17 commits (a520bf5..9dc8879) au seul nom de Mahmoud, sans trailer, non poussés.

Code (14 commits) : A1 à A7, B1, B2, `sideEffects`, C1, C2, C6 (Price, dates en chiffres arabes-indiens), A8.

Documentation (3 commits) :
- installation : Tailwind 4 et 3, mode sombre, types globaux, locale `'auto'` ;
- replis du thème ;
- prop `teleport` de Dialog, CommandPalette, ConfirmDialog ;
- séparateurs du Dropdown ;
- useLocale (`ar`, `auto`, `matchLocale`, vue-i18n), Price et usePrice ;
- menu de version avec lien vers le CHANGELOG dans la navigation.

Vérifié :
- 274 tests, `build:lib`, lint ; build de la doc sans lien mort ;
- dans le navigateur : dialogs dans `<body>` et modale centrée ; `html.dark` de VitePress passe les démos en sombre ; indicateur des Tabs qui suit `dir` ; séparateur et id unique du Dropdown.

Storybook non vérifié (comportements vérifiés dans la doc).
2026-11-26 : `feat/v3.2.0` fusionnée dans main (commit de fusion a05c16b, `--no-ff`). main a 18 commits d'avance sur origin/main, non poussée. `release:dry` annonce bien 3.2.0 (4 feat, 8 fix, 1 perf, 4 docs). Point relevé : le sujet du commit faee850 contient « @layer », que conventional-changelog transforme en lien vers l'utilisateur GitHub « layer ». Décision en attente : reformuler ce commit avant la release.
2026-11-26 : messages reformulés avant la release (filter-branch sur main et feat/v3.2.0, contenu identique) :
- `feat(styles)` : « dans la couche CSS surgeui » au lieu de « @layer » ; corps sans lignes @layer ou @import ;
- `feat(types)` : `@surgeui/ds-vue/global` entre backticks.

Nouveau commit de fusion : 126dc29. feat/v3.2.0 est le second parent. Les 18 commits sont au nom de Mahmoud, sans trailer, non poussés. Le dry run donne 3.2.0 sans lien vers un compte GitHub.
2026-11-26 : release 3.2.0 préparée en local :
- `07d89ee chore(release): 3.2.0` (versions et CHANGELOG, tag annoté v3.2.0) ;
- `39d2ed2 chore(release): 3.2.0` (package-lock, comme pour 3.1.0).

main a 20 commits d'avance sur origin et **n'est pas poussée**.

Constat : les workflows de release v3.0.1, v3.0.2 et v3.1.0 ont échoué à « Publish to npm » (ENEEDAUTH). Le dépôt n'a aucun secret (NPM_TOKEN absent) et npm n'a pas de session locale. Les versions jusqu'à 3.1.0 sont sur npm, publiées à la main ; aucune release GitHub n'existe.

En attente : l'utilisateur ajoute NPM_TOKEN puis on pousse, ou on pousse et il publie à la main avant de relancer le workflow.
2026-11-26 : 3.2.0 poussée (main c4cd85e..b2e6dfe ; tag v3.2.0 sur 1b25058).

NPM_TOKEN est un secret de l'environnement GitHub « npm ». Le commit 7e8b8d5 `ci(release)` ajoute `environment: npm` au job publish ; c'était la cause des échecs ENEEDAUTH depuis 3.0.1. Les commits de release ont été refaits après ce correctif pour que le tag le contienne.

Workflow de release en cours : run 45885134789.
2026-11-26 : feat/v3.3.0 fusionnée dans main (2f1b74f, `--no-ff`). main a 12 commits d'avance sur origin et n'est pas poussée. Le dry run donne 3.3.0 (5 feat, 3 fix, 3 docs), sans lien vers un compte GitHub.
2026-11-26 : 3.3.0 poussée.
- main : b2e6dfe..5b660dd ;
- tag v3.3.0 sur 2c5f082 (`chore(release)` des versions et du CHANGELOG), puis 5b660dd pour le package-lock.

Workflow de release en cours : run 45891185805.
2026-11-26 : 3.3.0 publiée.
- npm : `latest` = 3.3.0, export `./tailwind.css`, provenance SLSA ;
- release GitHub v3.3.0 créée par le workflow (run 45891185805, toutes les étapes en succès).

Proposition 3.4.0 faite à l'utilisateur, non validée :
- 3.4.0 = structure d'application : NavMenu, AppShell, PageHeader, SkipLink, ThemeToggle, tests axe ;
- 3.5.0 = données : Stat, Timeline, Rating, Prose, CopyButton/CodeBlock, useClipboard.
2026-11-27 : PR #20 fusionnée dans main (commit de fusion af09799 : a1b13bb, 5b437fa, 9826d15 dont 9826d15 = menu mobile de la doc rouvert, flou déplacé de .VPNav vers .VPNavBar). main locale à jour. Prochaine étape possible : release 4.2.0 (`npm run release:dry`).

## Open questions
- Risques de rupture dans un lot annoncé « sans rupture » :
  - Teleport par défaut sur `body` : perte de `dir`, `lang` et `data-theme` d'un conteneur, et SSR Nuxt.
  - Langue par défaut depuis `<html lang>` : le gabarit Vite pose `lang="en"`, donc une appli française non configurée basculerait en anglais.
  - Sens de `separator: true`.
- Points absents du découpage : A8 (docs), `sideEffects`, C4, C5, C6, ThemeToggle, SkipLink. Popover figure à la fois dans 3.2.0 (A6) et dans 3.3.0.

## Next steps
- Fusionner `feat/v3.2.0` dans main, puis la release (sur décision de l'utilisateur) :
  - `npm run release:dry` puis `npm run release` (3.2.0 attendue, des `feat` sont présents) ;
  - `npm install --package-lock-only` ;
  - `git push --follow-tags origin main`.
- Faire relire `locales/ar.ts` par un arabophone.
- 3.3.0 :
  - liens du routeur, onglets par identifiant (v-model `number | string`), badge `dot`/`pulse` ;
  - préréglage Tailwind (`tailwind.css` avec `@theme inline`) ;
  - guides RTL (+ C4 propriétés physiques, C5 positions logiques du Toaster) et Nuxt ;
  - SkipLink éventuellement.
- Puis le paquet `@surgeui/nuxt`.