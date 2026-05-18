---
id: themes
title: themes
parentId: main
author: mahmoud-b73a
createdAt: 2026-05-07T17:53:01.691Z
updatedAt: 2026-05-18T09:19:30.966Z
---

# Refonte du système de thèmes SurgeUI — État final

## Décisions architecturales

### Modèle thème × mode (double attribut HTML)
- **Avant** : 5 thèmes indépendants (`light`, `dark`, `ocean`, `forest`, `sunset`)
- **Après** : 4 thèmes × 2 modes — `data-theme` + `data-theme-mode` séparés
- Chaque thème coloré supporte désormais light **et** dark
- `light` et `dark` comme thèmes sont dépréciés (rétrocompat CSS + JS avec console.warn)

### Types TypeScript
```typescript
type ThemeName    = 'default' | 'ocean' | 'forest' | 'sunset'
type ThemeMode    = 'light' | 'dark' | 'system'   // 'auto' → 'system'
type ContrastMode = 'normal' | 'high' | 'auto'
type MotionMode   = 'normal' | 'reduce' | 'auto'
type DeprecatedThemeName = 'light' | 'dark'
```

### Comportement par défaut
- Sans attribut HTML → `default/light` via fallback CSS `html:not([data-theme])`
- `defaultThemeMode: 'light'` — l'utilisateur choisit explicitement
- Mode `system` suit `prefers-color-scheme` uniquement si choisi

## Fichiers SCSS — structure finale

```
styles/themes/
├── _registry.scss
├── _schema.scss          — schéma normatif ~118 tokens requis + mixin validate-theme()
├── default/
│   ├── index.scss        — sélecteurs data-theme + fallbacks rétrocompat
│   ├── _color.scss
│   ├── _meta.scss        — métadonnées (id, description, preview colors, notes)
│   └── tokens/light.scss + dark.scss
├── ocean/   (même structure + _meta.scss)
├── forest/  (même structure + _meta.scss)
└── sunset/  (même structure + _meta.scss)
```

**Supprimés** : `themes/light/`, `themes/dark/`, `ocean/_tokens.scss`, `forest/_tokens.scss`, `sunset/_tokens.scss`

## Audit WCAG AA — résultats et corrections

### Corrections de palette
- `ocean/_color.scss` : `$coral-300` #f97316 → **#fdba74** (était doublon de $coral-500, ordre inversé)
- `forest/_color.scss` : `$earth-500` #f59e0b → **#d97706** (était doublon de $earth-400)

### Corrections primary-text (4 thèmes/modes)
Blanc sur fond orange/rose → insuffisant WCAG. Remplacé par couleur de canvas sombre :

| Thème/Mode | primary-default | Avant | Après |
|-----------|----------------|-------|-------|
| ocean light/dark | #f97316 | blanc 2.80:1 ❌ | `$ocean-950` 6.39:1 ✅ |
| forest light | #f97316 | blanc 2.80:1 ❌ | `$forest-950` 8.34:1 ✅ |
| forest dark | #fb923c | blanc 2.26:1 ❌ | `$forest-950` 8.34:1 ✅ |
| sunset dark | #ec4899 | blanc 3.53:1 ❌ | `#1a0a1a` 5.40:1 ✅ |

Thèmes sans correction nécessaire : default (5.17:1 ✅), sunset light (4.60:1 ✅)

## Agents & Skills Claude Code créés

```
.claude/
├── agents/
│   ├── component-reviewer.md   — audit 27 critères BEM/a11y/tokens/Vue3
│   └── theme-auditor.md        — audit croisé tokens vs schéma
└── commands/
    ├── check-wcag.md            — calcul ratios WCAG 2.1
    ├── new-component.md         — scaffold 6 fichiers d'un composant
    ├── new-story.md             — génère stories depuis les props
    └── sync-docs.md             — synchronise docs FR ↔ EN
```

## État
✅ Build propre (`npm run build:lib`, CSS 425.86 kB)
✅ Lint propre
✅ Documentation FR + EN mise à jour
✅ Audit WCAG AA complet — toutes paires corrigées
✅ Dossiers dépréciés supprimés (light/, dark/, _tokens.scss orphelins)

## Point ouvert
- Token `bg-primary-canvas` présent dans 3 thèmes light mais absent du `_schema.scss` → à décider : ajouter au schéma ou retirer des maps
