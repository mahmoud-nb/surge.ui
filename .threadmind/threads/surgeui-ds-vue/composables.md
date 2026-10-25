---
id: composables
title: composables
parentId: main
author: mahmoud-b73a
createdAt: 2026-05-19T18:34:09.162Z
updatedAt: 2026-10-25T21:03:28.684Z
commit: 0be5823183241251f0fa6a59d695a6821d9c6fdb
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

## Decisions
- 2026-10-25 : **useKeyValue abandonné** (Map<string, any> globale partagée par id). Raisons : fuite entre requêtes en SSR (état au niveau du module), `any` non typé, aucun nettoyage, couplage invisible, doublon avec provide/inject et Pinia. Alternatives si le besoin revient : `createContext<T>()` typé (composants composés) ou un état partagé typé, fourni par le plugin et nettoyé au démontage.
- Lot 2 : un menu ne piège pas le focus (motif APG du bouton de menu) ; seul le Popover modal utilise useFocusTrap ; Dialog s'appuie sur `showModal()` natif.

## State
- 2026-10-25 : **lot 2 implémenté** sur `feat/composables-a11y-i18n` (par-dessus le lot 1 commité), **non commité**.

**useFocusTrap / createFocusTrap / getTabbableElements** :
- pile de pièges ; listeners en capture : Tab qui boucle et focus ramené dans le conteneur ;
- `initialFocus`, `returnFocus` (focus rendu seulement s'il est encore dans le conteneur) ; conteneur vide → `tabindex=-1` ;
- `utils.trapFocus` est obsolète et délègue au nouveau piège.

**useDismiss** : couches empilées.
- Échap (en bouillonnement) : ne ferme que la couche du dessus et appelle preventDefault, ce qui évite de fermer un `<dialog>` parent.
- `pointerdown` (en capture) : ferme chaque couche dont l'appui sort ; les couches ouvertes au-dessus comptent comme l'intérieur.
- `focusOutside` en option.

**useListNavigation (+ useTypeahead)** :
- modes `virtual` (aria-activedescendant) et `roving` (focus DOM, synchronisé depuis event.target) ;
- orientation (flèches horizontales inversées en RTL), `loop`, `homeEnd` (ignoré dans un champ éditable) ;
- saisie rapide (Espace seulement si un préfixe est en cours), `onActiveChange`.

**Refactors** :
- SelectBox : nav virtual + useDismiss pour l'appui extérieur ; Échap reste local.
- Dropdown : refondu en bouton de menu. Flèches sur le bouton, roving en boucle, saisie rapide, Tab sort du menu, Échap rend le focus, focusOutside ; trapFocus supprimé ; `aria-labelledby` sur le menu ; items en `tabindex=-1`.
- Popover : useFocusTrap en mode modal, useDismiss (outside = closeOnBackdropClick en modal) ; ancien piège et listeners supprimés.
- Tabs : roving horizontal en boucle avec activation automatique, RTL.
- Accordion : roving vertical en boucle.

**Tests** : 123, dont Dropdown.spec et les specs des composables.

**Docs FR/EN** :
- pages usefocustrap, usedismiss et uselistnavigation, avec la navigation ;
- clavier et accessibilité mis à jour pour Dropdown, Popover et Tabs ;
- CLAUDE.md complété.

**Vérifié dans Storybook** :
- Dropdown : clavier, Tab, Échap ;
- Popover : modal, focus, contrôlé, fond ;
- Tabs : RTL ;
- Accordion : boucle et en-tête désactivé sauté.

**Contrôles** : ESLint 0, types et builds OK.
- 2026-10-25 : **release 3.0.0 publiée sur GitHub** (commit 0be5823 `chore(release): 3.0.0`, tag `v3.0.0`, poussés sur origin/main avec `--follow-tags`).
- Version **majeure** à cause de deux BREAKING CHANGE : `feat(Dialog)!` et `refactor(ui)!`.
- Les tags manquants v2.1.0, v2.2.0 et v2.3.0 ont été recréés (annotés) sur les commits de release existants ; sans eux, standard-version serait reparti de v2.0.0.
- CHANGELOG :
  - section 3.0.0 générée, notes de rupture nettoyées (trailers retirés, une puce par rupture) ;
  - section Deprecations ajoutée (`announceToScreenReader`, `trapFocus`) ;
  - commit 9d35fad de l'utilisateur (notes ThreadMind) écarté de la liste ;
  - historique conservé octet pour octet (standard-version supprimait la section manuelle 1.0.0).
- package-lock synchronisé : seules les versions changent.
- **Non fait** : publication npm (`npm run release:publish`) ; branches locales fusionnées encore présentes.

## Open questions
### Étude des composables à ajouter (2026-10-25)
Existants :
- useTheme, useCustomTheme, useUniqueId ;
- useBreakpoint, usePrice ;
- useFloatingPosition (Floating UI : Popover, Dropdown, SelectBox).

Constats dans le code :
- `announceToScreenReader` crée la région live avec son texte puis la retire après 1 s : annonce peu fiable. Utilisé par 7 composants, avec des textes français codés en dur.
- FormField n'utilise pas provide/inject : les atomes dépendent de `v-bind="slotProps"`, qui ne transmet ni id ni aria.
- Clic extérieur + Échap dupliqués dans SelectBox, Dropdown et Popover.
- Deux pièges à focus (utils/trapFocus et une fonction locale du Popover) ; Dropdown piège le focus d'un menu, alors que le motif APG menu ne le fait pas.
- Navigation clavier de liste réécrite dans SelectBox, Dropdown, Tabs, Accordion et OtpInput ; seule la SelectBox a une saisie rapide.
- matchMedia réimplémenté dans useTheme (×3), useBreakpoint, Popover et utils.
- Délais au survol dans Popover, Dropdown et FloatButton ; scroll dans FloatButton ; clipboard dans OtpInput.
- SliderField (554 lignes) et FileUploadField (560 lignes) réimplémentent leurs atomes au lieu de les envelopper.
- Environ 60 props de libellés à défaut français, mais aucune locale globale.

Propositions :
- P1 : useAnnouncer, useFormField (contexte injecté), useDismiss, useFocusTrap, useListNavigation + useTypeahead, useLocale.
- P2 : useMediaQuery (+ préférences), useHoverIntent, useEventListener (interne), useScrollDirection, useClipboard.
- P3 (avec composants) : useToast, useConfirm, useElementSize/useInView, usePresence.
- Écartés : useControllableState (defineModel suffit ; migrer Tabs et Accordion vers defineModel) et les utilitaires génériques (VueUse).

Question ouverte : ordre de mise en œuvre. Recommandé : lot 1 = useAnnouncer + useLocale + useFormField, puis lot 2 = useDismiss + useFocusTrap + useListNavigation.

## Next steps
- 2026-10-25 : lots 1 et 2 fusionnés dans `main` (commit de fusion 85a2691, `--no-ff`) ; main a 45 commits d'avance sur origin et **n'est pas poussée**. Branches locales encore présentes : feat/composables-a11y-i18n, feat/layouts, refactor/audit-phases-0-1.
- Pousser main et supprimer les branches locales (sur demande).
- Pistes P2 : useMediaQuery (+ préférences ; refactor de useBreakpoint et useTheme), useHoverIntent, useEventListener, useScrollDirection, useClipboard.
- Dette : SliderField et FileUploadField réimplémentent leurs atomes ; Password n'est pas relié à useFormField.