---
id: composables
title: composables
parentId: main
author: mahmoud-b73a
createdAt: 2026-05-19T18:34:09.162Z
updatedAt: 2026-06-07T18:49:26.841Z
---

## Composables — Session du 07/06/2026

### useBreakpoint (terminé)
- **Fichier** : `package/src/composables/useBreakpoint.ts`
- Détection réactive via `window.matchMedia` (pas resize event)
- SSR-safe avec guard `typeof window !== 'undefined'`
- API : `current`, `width`, `matches`, `isUp()`, `isDown()`, `isBetween()`
- Breakpoints par défaut : sm=640, md=768, lg=1024, xl=1280, 2xl=1536
- ResizeObserver pour la largeur exacte, nettoyage via onUnmounted

### usePrice (terminé)
- **Fichier** : `package/src/composables/usePrice.ts`
- Formatage réactif via `Intl.NumberFormat` avec mémoïsation des formatters
- SSR-safe nativement (Intl disponible dans Node.js)
- Accepte `amount` comme number, Ref, ou getter
- **API retournée** : `formatted`, `integerPart`, `decimalPart`, `decimalSeparator`, `currencySymbol`, `isSymbolPrefix`, `ariaLabel`, `rawAmount`
- Helpers purs : `splitFormattedParts()` via `formatToParts()`, `extractCurrencySymbol()`, `detectSymbolPosition()`, `buildAriaLabel()` (currencyDisplay: 'name')
- Edge cases : NaN/Infinity → `'--'` + ariaLabel `'prix indisponible'`
- **Types** co-localisés : `UsePriceOptions`, `UsePriceReturn` (pattern useBreakpoint)
- **Types dans types/index.ts** : `CurrencyDisplay`, `CurrencyPosition`, `PriceProps`, `PriceVariant`, `PriceSize`
- `formatValue` callback optionnel (pattern Progress/Slider)

### Composant Price (terminé)
- **Fichier** : `package/src/components/atoms/Price.vue`
- Atom display, utilise `usePrice()` en interne (2x si originalAmount)
- **Props** : amount, originalAmount, currency, locale, variant (default/highlight/muted), size (sm/md/lg), integerOnly, showOriginal, currencyDisplay, currencyPosition (auto/prefix/suffix), formatValue, superscriptDecimals
- **Slots typés** : `prefix`, `original({ formatted, amount })`, `suffix`
- **SCSS** : Pattern 1 (`@use '../../styles/main' as *`), BEM `.su-price`, scoped
- **Accessibilité** : `role="text"`, `aria-label` auto-généré, `aria-hidden` sur sous-éléments, `prefers-contrast: high`, `prefers-reduced-motion: reduce`, `font-variant-numeric: tabular-nums`
- **Stories** : 11 stories CSF3 dans `_stories/Price.stories.ts`

### Documentation composables (terminé)
- Nouvelle rubrique **Composables** dans la sidebar + navbar (FR + EN)
- 8 pages créées : `docs/composables/{usetheme,usecustomtheme,usebreakpoint,useprice}.md` + EN
- **Badges "New"** (VitePress natif `badge: { text: 'New', type: 'tip' }`) sur : Price, Toggle, ToggleGroup, useBreakpoint, usePrice
- Constante `NEW_BADGE` centralisée dans `getNavItems()` pour faciliter le retrait futur

### Exports et registration
- `composables/index.ts` : exporte useBreakpoint + usePrice
- `index.ts` : import/export/plugin Price (`app.component(\`${prefix}Price\`, Price)`)
- `types/index.ts` : PriceProps après SpinnerProps, avant ToggleProps
- Build OK (uniquement les 4 erreurs TS pré-existantes)
- Lint OK sur les nouveaux fichiers

### Décisions techniques
- `Intl.NumberFormat` préféré à toute lib externe — natif, SSR-safe, standard
- Cache formatter par clé `(style|locale|currency|display|minFrac|maxFrac)` — Map module-level
- `formatToParts()` pour le découpage fiable (pas de regex sur le string formaté)
- `role="text"` + aria-hidden pattern pour grouper les morceaux visuels
- `variant: 'highlight'` → `--su-state-error` (rouge promo, convention e-commerce)
- `superscriptDecimals` opt-in via `font-size: 0.65em; vertical-align: super`
