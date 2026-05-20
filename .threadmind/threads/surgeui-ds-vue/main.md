---
id: main
title: SurgeUI DS Vue
parentId: null
author: mahmoud-b73a
createdAt: 2026-05-03T12:25:56.435Z
updatedAt: 2026-05-19T18:31:38.307Z
---

# SurgeUI DS Vue — Résumé principal

## État actuel du projet
- **47 composants** (34+ documentés), 6 thèmes SCSS (light, dark, ocean, forest, sunset), Storybook 8
- **Derniers composants ajoutés** : Toggle (atom) et ToggleGroup (molecule) — `role="switch"` + `aria-checked`, mode exclusive/multi, mode connecté (`gap=none`)
- **Build** : `npm run build:lib` passe, 4 warnings TS pré-existants (ButtonGroup, LinkGroup, FormFieldGroup, useTheme)

## Agents & Skills Claude Code (implémentés)
- `/su-check-wcag` — Vérifie contrastes WCAG AA par thème/mode
- `/su-component` — Scaffolde un composant complet (vue + types + story + docs FR/EN + exports)
- `/su-story` — Génère les stories d'un composant existant
- `/su-sync-docs` — Synchronise structure FR ↔ EN
- `component-reviewer` (agent) — Audit composant (BEM, a11y, tokens, dark mode)
- `theme-auditor` (agent) — Audit croisé tokens vs `_schema.scss`

## Corrections thèmes (session précédente)
- Ocean : `$coral-300` corrigé, `primary-text` → `$ocean-950` (light+dark)
- Forest : `$earth-500` corrigé, `primary-text` → `$forest-950` (light+dark)
- Sunset : `primary-text` dark → `#1a0a1a`
- Dossiers `themes/light/` et `themes/dark/` supprimés (obsolètes)
- `_meta.scss` ajouté pour chaque thème (ocean, forest, sunset, default)

## CLAUDE.md complémentaires (cette session)
- `package/CLAUDE.md` (~130 lignes) — Patterns SCSS (piège `space.$spacing-*` vs rem directs), 14 mixins, tokens sémantiques, conventions stories, checklist composant
- `docs/CLAUDE.md` (~80 lignes) — Structure VitePress, template markdown, règles bilingues, 22 icônes globales, checklist page
- `CLAUDE.md` racine — Ligne de pointage ajoutée vers les sous-fichiers

## Refonte navigation docs (cette session)
- **Toggle/ToggleGroup** ajoutés au sidebar (groupe Actions)
- **Nouvelle home page** : `layout: home` VitePress avec Hero, 6 feature cards, install rapide, 3 cartes catégories
- **Ancienne home** → `guide/get-started.md` (FR) / `en/guide/get-started.md` (EN)
- **Pages catégories créées** : `components/display.md`, `components/actions.md`, `components/form.md` (FR + EN)
- **Page index composants** refaite : présentation + liens vers catégories (remplace l'ancienne liste partielle)
- **Config navbar** : ajout lien "Démarrage" / "Get Started"
- **Config sidebar** : "Introduction" → "Démarrage rapide" / "Getting Started"

## Points en attente
- Token `bg-primary-canvas` présent dans 3 light themes mais absent de `_schema.scss` — décision à prendre
- Bug ligne 101 `index.ts` : `app.component('${prefix}Spinner', Alert)` — devrait être `'${prefix}Alert'`
- Pages *Field (InputField, TextareaField, etc.) commentées dans le sidebar config
