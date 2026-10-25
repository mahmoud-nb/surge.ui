# useFloatingPosition

Composable de positionnement des éléments flottants (popover, menu, liste déroulante) contre leur élément de référence. Il s'appuie sur [Floating UI](https://floating-ui.com/) et sert à `SuPopover`, `SuDropdown` et `SuSelectBox`.

- **Position `fixed`** : l'élément flottant n'est jamais coupé par un parent en `overflow: hidden`.
- **Retournement et décalage** : s'il manque de place, l'élément passe de l'autre côté (`flip`) puis glisse pour rester dans l'écran (`shift`).
- **Suivi** : la position est recalculée au défilement et au redimensionnement, uniquement tant que l'élément est ouvert.
- **Compatible SSR** : rien ne s'exécute côté serveur.

## Utilisation basique

```vue
<script setup>
import { ref } from 'vue'
import { useFloatingPosition } from '@surgeui/ds-vue'

const triggerRef = ref()
const menuRef = ref()
const open = ref(false)

const { placement } = useFloatingPosition(triggerRef, menuRef, {
  placement: 'bottom-start',
  open,
  offset: 4,
  matchReferenceWidth: true
})
</script>

<template>
  <button ref="triggerRef" type="button" @click="open = !open">
    Options
  </button>

  <div v-if="open" ref="menuRef" class="menu">
    Placement appliqué : {{ placement }}
  </div>
</template>

<style>
/* left/top sont posés en style inline par le composable */
.menu {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
```

## Paramètres

```ts
useFloatingPosition(reference, floating, options)
```

| Paramètre | Type | Description |
|-----------|------|-------------|
| `reference` | `Ref<HTMLElement \| undefined>` | Élément contre lequel se positionner (déclencheur) |
| `floating` | `Ref<HTMLElement \| undefined>` | Élément flottant à positionner |
| `options` | `FloatingPositionOptions` | Voir ci-dessous |

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `placement` | `MaybeRefOrGetter<Placement>` | — | Placement souhaité (`top`, `bottom-start`, `right-end`…), retourné automatiquement s'il manque de place |
| `open` | `MaybeRefOrGetter<boolean>` | — | L'élément flottant est affiché ; le suivi ne tourne que pendant l'ouverture |
| `offset` | `number` | `8` | Distance entre la référence et l'élément flottant (px) |
| `arrow` | `Ref<HTMLElement \| undefined>` | — | Flèche à aligner sur la référence (reçoit `left`/`top`) |
| `matchReferenceWidth` | `boolean` | `false` | Largeur minimale = largeur de la référence (listes déroulantes) |
| `padding` | `number` | `8` | Marge minimale avec les bords de l'écran (px) |

## Valeur de retour

| Propriété | Type | Description |
|-----------|------|-------------|
| `placement` | `Ref<Placement>` | Placement réellement appliqué (après retournement), pour orienter une flèche ou l'animation |
| `update` | `() => Promise<void>` | Recalcule la position immédiatement (contenu modifié pendant l'ouverture) |

Le placement appliqué est aussi posé sur l'élément flottant en `data-placement`, utilisable en CSS :

```css
.menu[data-placement^='top'] {
  transform-origin: bottom center;
}
```
