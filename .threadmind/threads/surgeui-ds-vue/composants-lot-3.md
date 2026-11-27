---
id: composants-lot-3
title: composants lot 3
parentId: components
author: mahmoud-a1f1
createdAt: 2026-11-05T15:21:20.477Z
updatedAt: 2026-11-05T17:08:22.951Z
branch: feat/composants-lot-3
commit: 4a8894e3cc2bac03bef2a14c8542f2ce4c0cb4bd
paths: ["package/src/components/molecules/Calendar.vue","package/tests/Calendar.spec.ts"]
---

# Composants lot 3 (2026-11-05)

## Decisions
- Branche `feat/composants-lot-3` empilée sur lot 2 (lui-même sur lot 1) : les trois lots se fusionnent ensemble ou dans l'ordre.
- **Carousel écarté** (accessibilité difficile, à faire seulement sur besoin réel). Range picker (plage de dates) non fait.
- DataTable : vrai `<table>`, `<caption>`, première colonne en `<th scope="row">`, tri par bouton dans l'en-tête + `aria-sort` sur la seule colonne triée + annonce ; cycle asc → desc → aucun ; Intl.Collator (numeric, sensitivity base), tri stable, vides toujours à la fin ; sélection sur les lignes affichées (case « tout » en état mixte via SuCheckbox) ; `manual` + `total` pour le serveur ; zone de défilement `role="region" tabindex="0"` nommée par le caption. Sélecteurs doublés pour battre `.vp-doc table/th/td/tr:nth-child`.
- Calendar : `role="grid"`, cellules `<td>` focusables (roving), aria-label date complète, aria-selected, aria-current="date", jours hors mois laissés vides, premier jour de semaine via `Intl.Locale.getWeekInfo()` (repli regex), annonce du mois sur les boutons uniquement. Utilitaires purs dans `utils/date.ts` (addMonths qui borne au dernier jour, parseDateInput selon l'ordre des parties d'Intl).
- DatePicker : saisie texte prioritaire (validée au blur/Entrée, revert si invalide/hors bornes), bouton nommé avec la date, panneau `role="dialog" aria-modal="true"` + useFocusTrap (returnFocus: false) + useDismiss ; le retour du focus au bouton se fait après nextTick (sinon le piège encore actif le ramène dans le panneau).
- TreeView : nœud récursif interne `TreeViewNode.vue` + `treeContext.ts` (provide/inject) ; treeitem nommé par `aria-labelledby` (sinon le nom inclurait le texte des enfants) ; useListNavigation en roving SANS getElement (son syncFromTarget prendrait le parent qui contient la cible) : l'index actif est synchronisé à la main et le focus passe par onActiveChange.
- CommandPalette : SuDialog (bouton X masqué, margin-top 12vh), input combobox `autofocus` (honoré par showModal), listbox > group (aria-labelledby) > option, premier résultat actif, classement début de libellé > libellé > description/mots-clés, onSelect appelé après fermeture, raccourci global Ctrl/⌘+K sur window (`hotkey: false` pour désactiver).
- Dans les templates, une variable du script (ex. `locale` de useLocale) masque la prop du même nom : renommer.
- Docs : le thème VitePress (`docs/.vitepress/theme/index.ts`) passe au plugin `locale: () => router.route.data.relativePath.startsWith('en/') ? locales.en : undefined`. Les démos des pages /en utilisent les textes anglais par défaut, et la langue suit la navigation sans rechargement (route réactive). Les démos EN n'ont donc plus besoin de forcer `locale="en-US"` ni des libellés anglais.
- `docs/*/composables/uselocale.md` : la table des espaces de messages est complétée avec les lots 1 à 3 (toast, breadcrumb, pagination, tag, numberInput, stepper, confirm, autocomplete, dataTable, calendar, datePicker, commandPalette).
- `.claude/launch.json` : configuration `docs` ajoutée (vitepress dev).
- Calendar : le mois et l'année du titre sont deux boutons, dans l'ordre de la langue (formatToParts). Le premier ouvre la grille des 12 mois, le second une page de 12 années alignée sur les multiples de 12 (2016–2027). Les deux grilles ont 3 colonnes, `role="grid"`, sont nommées par l'année ou la période (formatRange) et ont des cellules `data-month="2026-11"` / `data-year`.
- Navigation dans ces vues : choisir une année mène aux mois, choisir un mois revient aux jours ; rien n'est choisi avant un jour. Échap revient au mois affiché avant d'ouvrir la vue (avec preventDefault, ce qui empêche la fermeture du DatePicker : le premier Échap revient aux jours, le second ferme).
- Flèches précédent / suivant selon la vue : ±1 mois, ±1 an ou ±12 ans, avec annonce de la période. Clavier des vues : flèches ±1 / ±3, Début/Fin de rangée, Page préc./suiv. une année ou une page.
- Mois et années entièrement hors min/max : `aria-disabled`.
- Nouveaux messages calendar : previousYear, nextYear, previousYears, nextYears, chooseMonth (« {month}, choisir le mois »), chooseYear. Pas de props dédiées.
- Les classes `--selected/--today/--disabled` des jours sont remplacées par des sélecteurs d'attributs aria.

## State
- **Non commité.** Composants : organisms DataTable, CommandPalette ; molecules Calendar, DatePicker, TreeView (+ TreeViewNode/treeContext internes) ; utils/date.ts (parseDateInput, getFirstDayOfWeek exportés). Locales dataTable/calendar/datePicker/commandPalette FR/EN, exports + plugin, 5 stories, 10 pages docs + nav + catégories.
- Tests : 4 specs (Calendar avec utilitaires et DatePicker, DataTable, TreeView, CommandPalette), 231/231. Lint OK, build lib + docs OK.
- Vérifié dans Storybook : DataTable (rendu, alignement des cases corrigé), Calendar bornes/week-ends, TreeView, DatePicker au clavier (ouverture, flèches, PageDown, Entrée, focus rendu au bouton), CommandPalette (Ctrl+K, recherche, Entrée).

## Open questions
- Les pages EN de la doc affichent les textes par défaut des composants en français : le thème VitePress n'applique pas `locales.en` (`provideLocale`) selon la langue de la page.

## Next steps
- Commit, puis fusion des lots 1 à 3 dans main.
- Option : plage de dates (Calendar range), TagInput, locale des démos EN.