# useFocusTrap

Garde la tabulation dans un conteneur (panneau latéral, popover modal, menu mobile) et rend le focus à l'élément d'origine à la fermeture. Le Popover en mode modal l'utilise.

::: tip SuDialog n'en a pas besoin
Un `<dialog>` ouvert avec `showModal()` piège déjà le focus nativement et rend le reste de la page inerte.
:::

## Utilisation

```vue
<script setup>
import { ref } from 'vue'
import { useFocusTrap } from '@surgeui/ds-vue'

const isOpen = ref(false)
const panelRef = ref()

// Actif tant que le panneau est ouvert
useFocusTrap(panelRef, { active: isOpen })
</script>

<template>
  <SuButton @click="isOpen = true">Filtres</SuButton>

  <aside v-if="isOpen" ref="panelRef" aria-label="Filtres">
    <SuInputField label="Recherche" />
    <SuButton @click="isOpen = false">Fermer</SuButton>
  </aside>
</template>
```

À l'activation, le focus va sur le premier élément focalisable (ou sur `initialFocus`). Tab passe du dernier au premier élément, Maj+Tab l'inverse. À la désactivation, le focus revient à l'élément qui l'avait avant.

## Comportement

- **Pièges empilés** : un piège ouvert dans un autre prend la main ; à sa fermeture, le précédent la reprend.
- **Contenu dynamique** : les éléments focalisables sont recalculés à chaque Tab (champ ajouté, bouton désactivé…).
- **Focus parti à l'extérieur** (clic, focus programmatique) : il est ramené dans le conteneur.
- **Restitution prudente** : le focus n'est rendu que s'il est encore dans le conteneur ; si l'utilisateur a cliqué ailleurs, il n'est pas volé.
- **Conteneur vide** : sans élément focalisable, le conteneur reçoit lui-même le focus (`tabindex="-1"`).

Pour fermer avec Échap ou un clic à l'extérieur, combinez-le avec [useDismiss](/composables/usedismiss).

## API

```ts
useFocusTrap(target, options?)
```

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `active` | `MaybeRefOrGetter<boolean>` | — | Active le piège tant que la valeur est vraie (sinon `activate()` / `deactivate()`) |
| `initialFocus` | `(() => HTMLElement \| null) \| false` | premier élément | Élément focalisé à l'activation ; `false` : le focus ne bouge pas |
| `returnFocus` | `boolean \| (() => HTMLElement \| null)` | `true` | Élément qui reçoit le focus à la désactivation |

### Retour

| Propriété | Type | Description |
|-----------|------|-------------|
| `active` | `Readonly<Ref<boolean>>` | Le piège est actif |
| `activate` | `() => void` | Active le piège |
| `deactivate` | `() => void` | Désactive le piège et rend le focus |

### Autres exports

| Export | Description |
|--------|-------------|
| `createFocusTrap(target, options?)` | Même piège, hors composant : `{ activate, deactivate, isActive }` |
| `getTabbableElements(container)` | Éléments atteignables par Tab, dans l'ordre du DOM |

::: info Migration
`accessibility.trapFocus()` est obsolète : il passe désormais par `createFocusTrap` et sera retiré dans une prochaine version majeure.
:::
