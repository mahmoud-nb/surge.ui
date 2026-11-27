---
id: 330-liens-du-routeur-onglets-tailwind-rtl-nuxt
title: "3.3.0 : liens du routeur, onglets, Tailwind, RTL, Nuxt"
parentId: main
author: mahmoud-a1f1
createdAt: 2026-11-26T19:46:51.462Z
updatedAt: 2026-11-26T20:25:07.714Z
branch: feat/v3.3.0
commit: 8e4b1d2c7e0afc4823a6bc47cf614ad7c04259cd
---

# 3.3.0 : liens du routeur, onglets, Tailwind, RTL, Nuxt

Branche `feat/v3.3.0`, créée depuis main après la sortie de 3.2.0 (publiée sur npm le 26/11/2026 avec provenance, release GitHub créée).

## Decisions
- Liens du routeur : prop `to` sur Button, Link, Breadcrumb (items), Dropdown (options), CommandPalette (commandes) et Tabs. Le composant rendu est RouterLink s'il est enregistré (Vue Router, Nuxt), sinon `<a href>`. L'option de plugin `linkComponent` (ex. NuxtLink) a la priorité. Aucune dépendance à vue-router.
- Onglets :
  - avec `to`, ils deviennent une `<nav>` de liens (`aria-current="page"`) ;
  - sans `to`, le slot par défaut devient un panneau unique (`role="tabpanel"`) pour l'onglet actif, et `value` par onglet sert au v-model `string | number`.
- Popover a déjà été exporté en 3.2.0 ; ThemeToggle et SkipLink passent en 3.4+.

## State
2026-11-26 : 3.3.0 commitée sur `feat/v3.3.0` en 11 commits au nom de Mahmoud, sans trailer, non poussés :
- styles : la règle charset retirée de style.layer.css ;
- feat : liens `to`, Tabs (value, panneau unique, navigation), Badge dot/pulse, préréglage Tailwind, positions start/end (Toaster, FloatButton) et su-flip-rtl ;
- fix : propriétés logiques (Avatar, Price, ToggleGroup, Collapse, Progress), Slider en RTL ;
- docs : tableaux `teleport` réparés, guides RTL et Nuxt, pages des composants.

Les messages ont été reformulés : plus de « @mot » hors backticks.

Vérifié : 301 tests, build, lint, build de la doc, contrôle dans la doc ; préréglage compilé avec Tailwind 4.3.5 (48/48 utilitaires).

## Next steps
- Fusionner `feat/v3.3.0` dans main (`--no-ff`), puis release :
  - `release:dry` puis `release` (3.3.0 attendue) ;
  - `npm install --package-lock-only` et commit `chore(release)` ;
  - `git push --follow-tags`. Le workflow publie via l'environnement npm.
- 3.4+ : NavMenu, AppShell, Stat, PageHeader, Timeline, Rating, Prose, CopyButton, ThemeToggle, SkipLink.
- Paquet `@surgeui/nuxt` (B3).