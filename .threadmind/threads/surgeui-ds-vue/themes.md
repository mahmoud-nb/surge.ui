---
id: themes
title: themes
parentId: main
author: mahmoud-b73a
createdAt: 2026-05-07T17:53:01.691Z
updatedAt: 2026-05-13T10:00:39.984Z
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
type ThemeName    = 'default' | 'ocean' | 'forest' | 'sunset'  // plus d''auto'
type ThemeMode    = 'light' | 'dark' | 'system'                 // 'auto' → 'system'
type ContrastMode = 'normal' | 'high' | 'auto'                  // inchangé
type MotionMode   = 'normal' | 'reduce' | 'auto'                // inchangé
type DeprecatedThemeName = 'light' | 'dark'
```

### Comportement par défaut
- Sans attribut HTML → `default/light` via fallback CSS `html:not([data-theme])`
- `defaultThemeMode: 'light'` (pas `'system'`) — l'utilisateur choisit explicitement
- Mode `system` suit `prefers-color-scheme` uniquement si choisi

## Fichiers modifiés / créés

### SCSS (nouveaux)
- `styles/themes/_schema.scss` — schéma normatif des ~50 tokens requis + mixin `validate-theme()`
- `styles/themes/default/` — remplace `light/` + `dark/`, structure `tokens/light.scss` + `tokens/dark.scss`
- `styles/themes/ocean/tokens/{light,dark}.scss` + `_color.scss`
- `styles/themes/forest/tokens/{light,dark}.scss` + `_color.scss`
- `styles/themes/sunset/tokens/{light,dark}.scss` + `_color.scss`

### SCSS (modifiés)
- `styles/themes/{ocean,forest,sunset}/index.scss` — sélecteurs `[data-theme='x'][data-theme-mode='y']`
- `styles/core/_theme-loader.scss` — `$available-themes: ('default','ocean','forest','sunset')`, `load-contrast` cible `data-theme-mode='dark'`

### TypeScript
- `src/types/theme.ts` — nouveaux types, `Exclude<ThemeName,'auto'>` supprimé
- `src/theme.config.ts` — `themes: ['default','ocean','forest','sunset']`, `defaultThemeMode: 'light'`
- `src/composables/useTheme.ts` — `themeMode` state, `setThemeMode()`, `effectiveThemeMode`, `toggleMode()`, migration localStorage `'auto'→'system'`

### Composants
- `GlobalPreview.vue` — `:data-theme-mode="effectiveThemeMode"` ajouté
- `ThemeSelector.vue` — sélecteur Mode (light/dark/system) via `setThemeMode()`

### Documentation
- `docs/theme/index.md` + `docs/en/theme/index.md` — réécriture complète
- `docs/theme/tokens.md` + `docs/en/theme/tokens.md` — nouveaux tokens d'inversion documentés

## Nouveaux tokens CSS (tous thèmes)
- `--su-bg-inverse`, `--su-bg-inverse-subtle`, `--su-surface-inverse`
- `--su-border-inverse`, `--su-text-on-inverse`
- `--su-link-default-rgb` — valeur RGB espace-séparée pour `rgb(var(...) / 50%)`

## État
✅ Build propre (`npm run build:lib` exit 0)  
✅ Lint propre (exit 0, erreurs préexistantes non liées)  
✅ Documentation FR + EN mise à jour  
⏳ Dark tokens Ocean/Forest/Sunset — contrastes WCAG AA à valider avec un outil dédié
