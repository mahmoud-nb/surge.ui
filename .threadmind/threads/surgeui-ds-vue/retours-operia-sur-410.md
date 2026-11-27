---
id: retours-operia-sur-410
title: Retours Operia sur 4.1.0
parentId: main
author: mahmoud-a1f1
createdAt: 2026-11-27T21:31:28.552Z
updatedAt: 2026-11-27T22:48:39.347Z
branch: fix/retours-4.1.0
commit: af0979931a51936e6c9e371c35b516846fd26af3
paths: ["package/vue/src/components/molecules/Dropdown.vue","package/vue/src/composables/useTheme.ts","package/vue/src/styles/themes/_registry.scss","package/vue/src/components/organisms/Tabs.vue","package/vue/src/components/organisms/Dialog.vue","package/vue/src/components/atoms/Kbd.vue","package/vue/src/index.ts","package/vue/scripts/component-css.ts","package/vue/vite.config.ts","docs/guide/installation.md"]
---

# Retours Operia sur 4.1.0

Source : 13 points remontés par l'utilisateur après l'intégration de 4.1.0 dans Operia (Nuxt 4 SPA, Tailwind 4). Branche `fix/retours-4.1.0` (depuis main f179864), rien n'est commité.

## Decisions
- SuDropdown : avec une icône seule, `label` devient l'`aria-label` (ariaLabel prioritaire, ariaLabelledBy pris en charge). Slot `trigger` `{ props, isOpen }` : `props` (id, ARIA, onClick, onKeydown, onFocus, onBlur, disabled) se lie au bouton de la page ; triggerRef retrouvé par id (`syncTrigger`). Options `type: 'checkbox' | 'radio'` + `checked` → menuitemcheckbox / menuitemradio, aria-checked, colonne de coche réservée ; le Dropdown ne garde pas l'état (la page met `checked` à jour sur `select`). Styles non scoped (Dropdown seulement ; 16 autres composants restent scoped, ButtonGroup a des règles sur le contenu du slot qui ne s'appliquent peut-être pas : à auditer avant de les déscoper).
- « transition: all » du Dropdown : absent du CSS 4.1.0 ; c'est la valeur calculée par défaut du navigateur (`all 0s`) montrée par les DevTools.
- useTheme réécrit : état créé à la demande (`getState()` dans un effectScope détaché, rien au chargement du module → tree-shaking) ; préférences système = refs mises à jour par matchMedia ; chaque option vient du premier appel qui la donne (setup parent avant enfants : App.vue l'emporte sur ThemeToggle), préférences localStorage prioritaires ; écouteurs comptés (acquire au montage, release à la destruction de la portée), retirés au démontage du dernier composant ; hors composant : actif aussitôt (jusqu'à la fin de la portée courante).
- `color-scheme: light|dark` émis par `generate-mode-vars` (_registry.scss) : tous les thèmes, `.dark`, anciens sélecteurs.
- NavMenu passe `aria-hidden` booléen à Badge. Tabs : aucun panneau (ni aria-controls) sans `content`, slot `panel` ni slot par défaut. Kbd : `dir="ltr"` + `unicode-bidi: isolate` (un `dir` passé l'emporte).
- Type `Toaster` (useToast) renommé `ToasterStore` : à la racine, l'export du composant Toaster le masquait.
- Dialog : `display` `start` / `end` (logiques, `:dir(rtl)` inverse l'entrée) ; `left` / `right` = alias (ancienne classe `su-dialog--left` conservée). AppShell passe à `display="start"`.
- Poids : `createSurgeUI(options)` (plugin sans composants par défaut, option `components`) ; plugin de build `scripts/component-css.ts` → `dist/css/base.css`, `dist/css/<Composant>.css`, `dist/css/layer/…`, `dist/css/manifest.json` (dépendances par import ET par classes su-* reprises d'un autre composant : FileUploadField → FileUpload…) ; `dist/resolver.js` (+ .d.ts) pour unplugin-vue-components, `importStyle: true | 'layer'`. Exports `./css/*` et `./resolver`.
- pnpm `minimumReleaseAge` (24 h par défaut en pnpm 11) : rien à changer dans le paquet ; documenté (exception par version exacte dans `minimumReleaseAgeExclude`).

## State
2026-11-27 : tout implémenté, non commité.
- Mesures (Vite, gzip) : `{ Button }` seul 4,8 Ko (4,8 avant) ; createSurgeUI + Button + Dialog 11,4 Ko ; `app.use(SurgeUI)` ~97 Ko + chunks paresseux. CSS : style.css 34,8 Ko ; base 5,6 ; base + Button (+Spinner) 7,3 ; + Dialog 8,2.
- Vérifié : 347 tests (nouveau tests/useTheme.spec.ts, ajouts Dropdown, Tabs, Kbd, NavMenu, Dialog, Plugin), typecheck, lint, build lib, `api:check` (0 prop inconnue), build de la doc (pas de lien mort), llms.txt sans titre vide. Navigateur (doc en dev) : Dropdown (nom, slot trigger, cochables), color-scheme, Kbd en RTL, tiroirs start/end en RTL (styles calculés).
- Doc FR/EN : installation (options du plugin corrigées, import à la carte, note pnpm), dropdown, usetheme (cycle de vie), theme (color-scheme), tabs, kbd, dialog, rtl ; « 5 Themes » → 4 ; titres de spinner.md / buttongroup.md (EN) ; llms.mjs replie sur un titre et avertit ; README racine et paquet (arabe, 85+ composants, import à la carte) ; AGENTS.md ; stories Dropdown (CustomTrigger, CheckableOptions) et Dialog (start/end).
2026-11-27 (suite) : commit a1b13bb poussé, PR mahmoud-nb/surge.ui#20 ouverte vers main (description en français, sans mention d'attribution, comme les PR précédentes), auto-fix activé ; build de la PR réussi (commentaire du workflow de prévisualisation).
Second correctif ajouté à la PR, commit 5b437fa `fix(docs)` : sur écran large (≥ 960 px), la barre latérale VitePress commence sous l'en-tête (`top` = hauteur de l'en-tête, `padding-top: 0`, rideau masqué) et le haut de l'en-tête au-dessus d'elle prend `--vp-sidebar-bg-color` ; sa barre de défilement ne passe plus sous l'en-tête translucide. Sélecteurs `.Layout > aside.VPSidebar` et `header.VPNav .VPNavBar.has-sidebar .title` pour battre les styles scoped de VitePress. Vérifié en clair, en sombre, à 1280 et 1600 px ; mobile inchangé.
2026-11-27 : PR #20 fusionnée dans main (af09799 : a1b13bb, 5b437fa, 9826d15 — 9826d15 rouvre le menu mobile de la doc en déplaçant le flou de .VPNav vers .VPNavBar). main locale à jour. Prochaine étape possible : release 4.2.0.

## Next steps
- Relecture par l'utilisateur, puis commits (au seul nom de l'utilisateur, sans trailer) et release 4.2.0 (feat présents).
- Storybook non vérifié dans le navigateur.
- Éventuellement : déscoper les autres composants après audit (ButtonGroup).