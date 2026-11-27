---
id: composants-lot-2
title: composants lot 2
parentId: components
author: mahmoud-a1f1
createdAt: 2026-11-05T15:03:45.162Z
updatedAt: 2026-11-05T15:03:59.543Z
branch: feat/composants-lot-2
commit: b83ac51d7b9e5babb6bd70d995e03948c74ae6c8
paths: ["package/src/components/atoms/Divider.vue","package/src/components/atoms/Kbd.vue","package/src/components/atoms/VisuallyHidden.vue","package/src/components/atoms/Tag.vue","package/src/components/atoms/NumberInput.vue","package/src/components/molecules/EmptyState.vue","package/src/components/molecules/Stepper.vue","package/src/components/molecules/Autocomplete.vue","package/src/components/molecules/NumberInputField.vue","package/src/components/organisms/ConfirmDialog.vue","package/src/composables/useConfirm.ts"]
---

# Composants lot 2 (2026-11-05)

## Decisions
- Branche `feat/composants-lot-2` créée depuis `feat/composants-lot-1` (empilée : fusionner le lot 1 d'abord ou les deux ensemble).
- **Combobox remplacé par Autocomplete** : SuSelectBox a déjà `searchable` ; le manque réel était la saisie libre avec suggestions (APG combobox `aria-autocomplete="list"`, focus dans le champ + aria-activedescendant via useListNavigation virtual, useDismiss pour appui extérieur/focus sorti, Échap géré localement : fermer puis effacer si `clearable`). Filtre sans accents/casse, `filter: false` + `loading` pour le serveur, nombre de suggestions annoncé (debounce 600 ms).
- **ConfirmDialog + useConfirm** : même modèle que useToast (store `createConfirmer()` fourni par le plugin sous `ConfirmerKey`, file d'attente, repli `window.confirm` sans dialog monté). SuDialog en `role="alertdialog"`, focus initial via `autofocus` (honoré par showModal) : Annuler si `tone: 'danger'`. Bouton danger = Button `variant="custom"` + variables `--su-custom-button-*` (state-error / text-on-inverse).
- **SuDialog corrigé** : la prop `role` (AccessibilityProps) était ignorée ; elle est maintenant posée sur `<dialog>`.
- NumberInput : `role="spinbutton"`, saisie localisée (séparateurs via formatToParts), validée au blur/Entrée (bornée, arrondie à `precision` = max(décimales du step, maxFractionDigits du format)), formatOptions à l'affichage seulement, boutons tabindex -1 + `aria-disabled` (pas `disabled` : `control-surface` grise tout le contrôle sur `:has(:disabled)`), maintien = répétition, clic `detail === 0` pour le curseur virtuel.
- Stepper : `<ol>` nommée, `aria-current="step"`, statut sr-only après le libellé, `clickable` + `linear`.
- Divider : `role="separator"` sans texte, texte lisible + traits aria-hidden avec label, `decorative`.
- Piège outillage : les séquences ` ` écrites par les outils sont converties en caractères littéraux (ESLint no-irregular-whitespace) → générer les échappements via String.fromCharCode.

## State
- **Non commité.** 10 composants : atoms Divider, Kbd, VisuallyHidden, Tag, NumberInput ; molecules EmptyState, Stepper, Autocomplete, NumberInputField ; organism ConfirmDialog ; composable useConfirm. Locales tag/numberInput/stepper/confirm/autocomplete FR/EN, exports + plugin, 9 stories, 18 pages docs + nav + catégories, CLAUDE.md (useConfirm).
- Tests : 5 specs (Lot2Atoms, NumberInput, Stepper, Confirm, Autocomplete), 197/197. Lint OK, build lib + docs OK.
- Vérifié dans Storybook : Stepper (h/v), NumberInput devise (saisie, arrondi), Autocomplete clavier, ConfirmDialog danger (alertdialog, focus Annuler, Échap → false), Tag, EmptyState, Divider, Kbd.

## Next steps
- Commit puis fusion des lots 1 et 2 dans main.
- Pages VitePress non vérifiées visuellement.
- Pistes lot 3 : DataTable, DatePicker/Calendar, TreeView, Command palette, TagInput.