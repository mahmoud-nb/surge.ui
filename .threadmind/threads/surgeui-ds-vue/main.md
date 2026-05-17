---
id: main
title: SurgeUI DS Vue
parentId: null
author: mahmoud-b73a
createdAt: 2026-05-03T12:25:56.435Z
updatedAt: 2026-05-13T10:02:46.901Z
---

# SurgeUI DS Vue — État global du projet

## Structure du projet
Monorepo npm workspaces : `package/` (@surgeui/ds-vue) + `docs/` (VitePress FR/EN).
Architecture atomique : atoms → molecules → organisms → templates.
Stack : Vue 3 + TypeScript + SCSS (modern-compiler) + Vite + Storybook 8.

## ThreadMind MCP
Connecté via `.mcp.json` à la racine : `{ "command": "cmd", "args": ["/c", "thread-mind-mcp"] }`.
Nécessaire car Volta (Windows) n'est pas dans le PATH des sous-processus Claude Code.

## Travaux complétés

### Thread `formulaires` — Analyse et corrections des composants de formulaire
- **P0** : Corrigé `defineExpose` lazy getter dans InputField/TextareaField/SelectBoxField (refs évaluées trop tôt)
- **P1** : Ajout `:size="size"` sur `<FormField>` dans tous les 7 composants molecules (label/message toujours en `md` sinon)
- **A11y** : `role="button"` + `aria-label` sur les préfixes/suffixes cliquables de `Input.vue` ; focus ring opacity 20%→50% dans `Switch.vue` ; media query CSS corrigée dans `FormField.vue` (`.su-form-field-container` → `.su-form-field`)
- **Types** : Ajout `prefixLabel`, `prefixIconLabel`, `suffixLabel`, `suffixIconLabel` dans `InputProps`
- **Non résolu** : v-model nested dans scoped slot (InputField/TextareaField) — conservé en branche séparée

### Thread `themes` — Refonte complète du système de thèmes
- Nouveau modèle : 4 thèmes (`default`, `ocean`, `forest`, `sunset`) × 2 modes (`light`, `dark`, `system`)
- `data-theme` + `data-theme-mode` comme double attribut HTML
- Dark mode ajouté pour Ocean, Forest, Sunset
- `ThemeMode = 'light' | 'dark' | 'system'` (`'auto'` renommé)
- `ThemeName` sans `'auto'` — `default` remplace les anciens `light`/`dark`
- Nouveaux tokens : invert (`bg-inverse`, `text-on-inverse`, etc.) + `link-default-rgb`
- `_schema.scss` — schéma normatif de validation des tokens
- `useTheme` : `themeMode`, `setThemeMode()`, `toggleMode()`, migration localStorage
- Documentation FR + EN mise à jour
- Build ✅ Lint ✅

## Commandes clés
```bash
npm run build:lib   # Valider TS + SCSS
npm run lint        # ESLint + Stylelint
npm run storybook   # Port 6006
```

## Points ouverts
- Contrastes WCAG AA des dark tokens Ocean/Forest/Sunset à valider avec outil dédié
- v-model nested (InputField/TextareaField) à investiguer dans branche dédiée
