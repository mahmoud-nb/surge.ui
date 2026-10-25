# useDismiss

Ferme un élément superposé (popover, menu, liste déroulante, panneau) avec Échap, un appui à l'extérieur ou la perte du focus. Popover, Dropdown et SelectBox l'utilisent.

## Utilisation

```vue
<script setup>
import { ref } from 'vue'
import { useDismiss } from '@surgeui/ds-vue'

const isOpen = ref(false)
const triggerRef = ref()
const panelRef = ref()

const close = (returnFocus) => {
  isOpen.value = false
  if (returnFocus) triggerRef.value?.focus()
}

// Le déclencheur et le panneau forment « l'intérieur »
useDismiss([triggerRef, panelRef], {
  enabled: isOpen,
  onDismiss: (reason) => close(reason === 'escape')
})
</script>

<template>
  <button ref="triggerRef" :aria-expanded="isOpen" @click="isOpen = !isOpen">Options</button>
  <div v-if="isOpen" ref="panelRef">…</div>
</template>
```

## Couches

Chaque élément ouvert forme une couche ; les couches s'empilent dans l'ordre d'ouverture.

- **Échap** ne ferme que la couche du dessus. Dans un popover contenant une SelectBox ouverte, Échap ferme la liste, puis le popover au second appui.
- **Dans un SuDialog**, Échap ferme la couche sans fermer le dialog : l'événement est annulé avant que le navigateur ne déclenche la fermeture native.
- **Appui extérieur** : chaque couche dont l'appui sort se ferme. Un appui dans une couche ouverte au-dessus (sous-menu, liste téléportée dans `body`) ne compte pas comme extérieur pour celles du dessous.
- L'appui est détecté sur `pointerdown`, avant le clic : un clic sur le déclencheur ne referme pas puis rouvre l'élément.

## API

```ts
useDismiss(targets, options)
```

`targets` : un élément ou une liste d'éléments (refs ou getters) qui forment l'intérieur.

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `enabled` | `MaybeRefOrGetter<boolean>` | — | La couche est active (élément ouvert) |
| `onDismiss` | `(reason, event) => void` | — | Appelé pour fermer ; `reason` : `'escape'`, `'outside'` ou `'focus-outside'` |
| `escape` | `MaybeRefOrGetter<boolean>` | `true` | Fermeture avec Échap |
| `outside` | `MaybeRefOrGetter<boolean>` | `true` | Fermeture à l'appui hors des éléments |
| `focusOutside` | `MaybeRefOrGetter<boolean>` | `false` | Fermeture quand le focus quitte les éléments |

### Retour

| Propriété | Type | Description |
|-----------|------|-------------|
| `isTopLayer` | `() => boolean` | La couche est celle du dessus (seule à réagir à Échap) |

## Accessibilité

- Rendez le focus au déclencheur quand la fermeture vient d'Échap (`reason === 'escape'`), pas après un clic ailleurs : l'utilisateur a choisi où aller.
- Un contenu affiché au survol ou au focus doit pouvoir être fermé sans déplacer le pointeur ni le focus (WCAG 1.4.13) : laissez `escape` actif.
