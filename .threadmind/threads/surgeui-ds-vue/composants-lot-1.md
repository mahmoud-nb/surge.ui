---
id: composants-lot-1
title: composants lot 1
parentId: components
author: mahmoud-a1f1
createdAt: 2026-11-05T14:18:45.807Z
updatedAt: 2026-11-05T14:18:58.196Z
branch: feat/composants-lot-1
commit: f9fc51ebde9fa56a2bf55f8cbe86e6d8db48ca56
paths: ["package/src/components/atoms/Checkbox.vue","package/src/components/atoms/Skeleton.vue","package/src/components/molecules/Tooltip.vue","package/src/components/molecules/Toast.vue","package/src/components/molecules/Breadcrumb.vue","package/src/components/molecules/Pagination.vue","package/src/components/organisms/Toaster.vue","package/src/composables/useToast.ts","package/src/utils/pagination.ts"]
---

# Composants lot 1 (2026-11-05)

## Decisions
- Lot 1 issu de l'étude des composants manquants : Checkbox, Tooltip, Toast (+ useToast), Skeleton, Breadcrumb, Pagination.
- **Drawer écarté** : SuDialog gère déjà les tiroirs (`display="left|right|top|bottom"`).
- Toasts : store `createToaster()` fourni par le plugin sous `ToasterKey` (une instance par app, pas d'état module partagé en SSR, cf. décision useKeyValue). `useToast()` = store injecté, sinon store par défaut côté navigateur (Storybook, tests). `show()` avec un id existant remplace le toast ; `update()` fusionne.
- Annonces des toasts via `announce()` (assertif pour `error`) ; SuToaster est une zone nommée, PAS une région live.
- SuToaster en `popover="manual"` (couche supérieure) : visible au-dessus d'un `<dialog>` modal (vérifié dans Storybook), mais inerte tant que le modal est ouvert.
- Tooltip : aria-describedby posé en DOM sur le premier élément focusable du slot (ids existants conservés, retiré au démontage) ; ouverture au survol (pas au toucher) et au focus `:focus-visible` ; useDismiss pour Échap seulement.
- Pagination : `aria-disabled` (pas `disabled`) sur précédent/suivant aux extrémités pour ne pas perdre le focus ; calcul dans `utils/pagination.ts` (`getPaginationItems`, exporté), largeur constante.
- Checkbox : éléments BEM propres (`__box`, `__mark`, `__dash`, `__body`, `__title`, `__hint`) pour ne pas collisionner avec les classes globales de CheckboxGroup ; mixins `choice-*` ; `v-model:indeterminate`.

## State
- Branche `feat/composants-lot-1`, **non commitée**.
- Fichiers : 7 composants (atoms/Checkbox, atoms/Skeleton, molecules/Tooltip, molecules/Toast, molecules/Breadcrumb, molecules/Pagination, organisms/Toaster), composables/useToast.ts, utils/pagination.ts, types, locales (toast, breadcrumb, pagination FR/EN), exports + plugin, 7 stories, 12 pages docs FR/EN + nav (badge New) + pages catégories, CLAUDE.md racine (useToast).
- Tests : 4 specs nouveaux (Checkbox, Tooltip, Toast, Navigation), 156/156 OK. Lint OK, build lib + docs OK.
- Vérifié dans Storybook : Checkbox tout sélectionner, Tooltip placements + Échap, Toaster (pile, annonce assertive, au-dessus du Dialog), Pagination, Breadcrumb, Skeleton.

## Next steps
- Commit (conventionnel, FR) puis PR ou fusion dans main.
- Pages docs non vérifiées visuellement dans VitePress (build OK seulement).
- Lot 2 proposé : NumberInput, Combobox, Tag, Stepper, ConfirmDialog/useConfirm, Divider, Kbd, EmptyState.