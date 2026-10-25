# useListNavigation

Navigation clavier dans une liste : flèches, Début / Fin et saisie rapide, en sautant les éléments désactivés. SelectBox, Dropdown, Tabs et Accordion l'utilisent : le clavier se comporte partout de la même façon.

## Deux modes

| Mode | Focus | Usage |
|------|-------|-------|
| `virtual` (défaut) | Reste sur le contrôle ; l'élément actif est annoncé par `aria-activedescendant` | Combobox, liste filtrée par un champ de recherche |
| `roving` | Se déplace d'élément en élément ; un seul est dans l'ordre de tabulation (`tabindex="-1"` sur les autres) | Menu, onglets, barre d'outils, en-têtes d'accordéon |

## Mode roving : un menu

```vue
<script setup>
import { ref } from 'vue'
import { useListNavigation } from '@surgeui/ds-vue'

const actions = [
  { label: 'Modifier' },
  { label: 'Dupliquer' },
  { label: 'Archiver', disabled: true },
  { label: 'Supprimer' }
]
const itemRefs = ref([])

const nav = useListNavigation({
  items: actions,
  isDisabled: (action) => action.disabled,
  mode: 'roving',
  loop: true,
  getElement: (index) => itemRefs.value[index],
  typeahead: { getLabel: (action) => action.label }
})
</script>

<template>
  <div role="menu" @keydown="nav.handleKeydown">
    <button
      v-for="(action, i) in actions"
      :key="action.label"
      :ref="(el) => (itemRefs[i] = el)"
      role="menuitem"
      tabindex="-1"
      :aria-disabled="action.disabled || undefined"
    >
      {{ action.label }}
    </button>
  </div>
</template>
```

En mode roving, la navigation repart de l'élément focalisé (souris comprise) : `handleKeydown` le retrouve via `getElement`.

## Mode virtual : une combobox

```ts
const nav = useListNavigation({
  items: filteredOptions,
  isDisabled: (option) => option.disabled,
  typeahead: { getLabel: (option) => option.label }
})

// Sur le champ : aria-activedescendant suit l'option active
const activeId = computed(() => nav.activeIndex.value >= 0 ? `option-${nav.activeIndex.value}` : undefined)
```

## Orientation et sens de lecture

`orientation: 'horizontal'` active gauche / droite, `'both'` les quatre flèches. En horizontal, les flèches suivent le sens de lecture : dans un conteneur `dir="rtl"`, la flèche droite recule.

## Saisie rapide

Avec `typeahead`, les lettres tapées à la suite forment un préfixe (« po » → « Pomme ») ; une même lettre répétée passe d'un élément à l'autre parmi ceux qui commencent par elle. La saisie est ignorée dans un champ éditable, et Espace n'en fait partie que si un préfixe est en cours (sinon il reste la touche d'activation).

`useTypeahead` est aussi exporté seul : `search(char, fromIndex)` renvoie l'index trouvé.

## API

```ts
useListNavigation(options)
```

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `items` | `MaybeRefOrGetter<T[]>` | — | Éléments de la liste |
| `isDisabled` | `(item, index) => boolean` | — | Éléments sautés |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Flèches actives |
| `loop` | `boolean` | `false` | Boucle de la fin au début |
| `homeEnd` | `boolean` | `true` | Début / Fin (ignorés dans un champ éditable) |
| `mode` | `'virtual' \| 'roving'` | `'virtual'` | Voir ci-dessus |
| `getElement` | `(index) => HTMLElement` | — | Élément DOM d'un index (mode roving) |
| `typeahead` | `{ getLabel, timeout? } \| false` | `false` | Saisie rapide |
| `onActiveChange` | `(index) => void` | — | Appelé quand l'élément actif change (activation automatique des onglets…) |

### Retour

| Propriété | Type | Description |
|-----------|------|-------------|
| `activeIndex` | `Ref<number>` | Index actif (`-1` : aucun) |
| `handleKeydown` | `(event) => boolean` | Traite une touche ; `true` si elle a servi (l'événement est alors annulé) |
| `setActiveIndex` | `(index, { focus? }) => void` | Change l'élément actif (focus DOM en mode roving) |
| `first` / `last` / `next` / `previous` | `() => number` | Déplacements ; renvoient l'index atteint ou `-1` |
| `findEnabled` | `(start, step) => number` | Premier élément actif dans un sens |
| `searchTypeahead` | `(char) => number` | Saisie rapide sans événement clavier |
| `isTyping` | `() => boolean` | Un préfixe est en cours |
| `reset` | `() => void` | Remet l'index à `-1` et vide le préfixe |
