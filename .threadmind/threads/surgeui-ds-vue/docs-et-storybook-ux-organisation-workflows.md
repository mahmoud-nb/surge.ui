---
id: docs-et-storybook-ux-organisation-workflows
title: "Docs et Storybook : UX, organisation, workflows"
parentId: main
author: mahmoud-a1f1
createdAt: 2026-11-27T06:18:26.747Z
updatedAt: 2026-11-27T06:47:44.929Z
branch: docs/ameliorations
commit: a6a828502fc78e01aed3ff54140e57ba89ea2297
paths: ["docs/.vitepress","docs/index.md","docs/en/index.md","package/.storybook","package/src/components/global","package/src/stories",".github/workflows"]
---

# Docs et Storybook : UX, organisation, workflows

Branche `docs/ameliorations`, créée depuis main après la 3.3.0. **Non commitée** au 27/11/2026.

## Decisions
- **VitePress** : rester en 1.6.4, dernière stable ; la 2.0 est encore en alpha.
- **Thème de la doc (skill lumen-ui)** :
  - niveau « discret » pour les pages, quelques effets « standard » sur l'accueil ;
  - accent bleu SurgeUI, jetons `--lm-*` d'où découlent les variables `--vp-*` ;
  - police Inter de VitePress conservée.
- **Storybook** :
  - ordre : Bienvenue (MDX), Global (Affichage, Actions, Formulaires, Thèmes), Atoms, Molecules, Organisms, Templates ;
  - une story par vitrine Global, sans autodocs (la page Docs répétait la vitrine) : exception assumée à la règle « autodocs partout ».
- **Workflows** : Node 24 (18 en fin de vie) ; checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5, github-script v9. Les ruptures relues ne nous concernent pas.

## State
- **Doc** :
  - `custom.css` réécrit : en-tête glass, aurore et quadrillage sur l'accueil, nom en dégradé, cartes sheen, lift et spotlight, démos sur fond en pointillés, h4 des démos en sur-titre mono, kbd, code ;
  - `Layout.vue` : pastille de version (`__SURGEUI_VERSION__` via vite.define) ;
  - `HomeCategories.vue` : vrais compteurs lus dans `nav.ts`, où getNavItems et NEW_BADGE ont été sortis de config.ts ;
  - icônes SVG au trait (`icon` en chaîne : VitePress rend une chaîne en HTML) ;
  - EN : « 5 thèmes » corrigé.
- **Storybook** :
  - `manager.ts` : marque « SurgeUI v<version> » ;
  - `Introduction.mdx` : pas de tableaux GFM, pas de `<p>` sur plusieurs lignes ;
  - locale arabe dans la barre d'outils ;
  - GlobalPreview ne force plus thème ni dir (le RTL de la barre d'outils marchait mal) ;
  - 71 fonds #F9F9F9 et couleurs codées en dur des vitrines remplacés par des jetons ;
  - ThemePlayground (story Global/Thèmes) remplace les panneaux répétés.
- **GitHub Pages** : les déploiements fonctionnent (3.3.0 OK). L'échec 3.2.0 était un incident d'API (métadonnées d'artefact) ; le site en ligne montre v3.3.0.

Vérifié : builds lib, doc et Storybook ; 301 tests, lint ; navigateur (accueil clair, sombre, 375 px ; page composant ; Storybook ordre, version, sombre, RTL, Thèmes).

Non vérifiable avant un push : le workflow sous Node 24 et les actions mises à jour. Une PR lance le build sans déployer.
2026-11-27 : 4 commits au nom de Mahmoud, sans trailer, sur `docs/ameliorations`, poussés :
- fdc1556 `ci` (Node 24, actions) ;
- b4abbd6 `docs` (thème de la doc) ;
- c3b44f8 `docs(storybook)` (vitrines Global) ;
- 3c8d3c3 `docs(storybook)` (accueil, ordre, version).

PR mahmoud-nb/surge.ui#8 ouverte vers main ; le workflow Pages y tourne en build seul. CI en attente au moment de l'ouverture.
2026-11-27 : Auto-fix activé sur la PR #8.

Premier run en échec. Cause : l'environnement github-pages (règles : main seulement) était déclaré sur le job unique, et une PR était refusée avant toute étape. Défaut antérieur à la PR.

Correctif 15cce72 `ci(pages)` : job build sans environnement (PR et main, permission pull-requests: write pour le commentaire), puis job deploy (push sur main, environnement github-pages, configure-pages v6 et deploy-pages v5). Poussé ; nouveau run en attente.
2026-11-27 : la CI de la PR #8 passe au commit 15cce72. Build OK sous Node 24 avec les nouvelles actions (commentaire de prévisualisation posté) ; deploy ignoré sur une PR, comme prévu. PR fusionnable (CLEAN), pas encore fusionnée.
2026-11-27 : PR #8 fusionnée par l'utilisateur (merge a6a8285). Le déploiement sur main a réussi (run 45953849518 : build puis deploy, configure-pages v6 et deploy-pages v5 sous Node 24). En ligne : pastille de version, catégories et sur-titres sur surgeui.com ; Bienvenue et les 4 vitrines Global dans surgeui.com/storybook. main locale à jour. La branche docs/ameliorations existe encore, en local et sur le remote.