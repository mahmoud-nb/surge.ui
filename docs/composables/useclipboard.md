# useClipboard

Copie un texte dans le presse-papiers et expose un état « copié » temporaire. [CopyButton](/components/copybutton) et [CodeBlock](/components/codeblock) l'utilisent.

## Utilisation

```vue
<script setup>
import { useClipboard, useAnnouncer } from '@surgeui/vue'

const { copy, copied } = useClipboard({ timeout: 2000 })
const { announce } = useAnnouncer()

const share = async () => {
  if (await copy(location.href)) announce('Lien copié')
}
</script>

<template>
  <SuButton @click="share">{{ copied ? 'Lien copié' : 'Partager' }}</SuButton>
</template>
```

`copy()` renvoie `true` si la copie a réussi, `false` sinon (permission refusée, navigateur sans accès au presse-papiers) ; l'erreur est alors dans `error`.

Le composable n'annonce rien : annoncez le résultat avec [useAnnouncer](/composables/useannouncer), comme le fait `SuCopyButton`, car le changement de libellé d'un bouton n'est pas toujours lu.

## Fonctionnement

- API Clipboard (`navigator.clipboard.writeText`) dans un contexte sécurisé (HTTPS, `localhost`).
- Sinon, repli sur `document.execCommand('copy')` à travers un champ caché, posé dans le dialog modal ouvert s'il y en a un ; le focus est rendu à l'élément qui l'avait.
- Sans effet côté serveur : `copy()` renvoie `false`.

## API

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `timeout` | `number` | `2000` | Durée de l'état `copied` après une copie réussie (ms) ; `0` le garde jusqu'à la copie suivante |

### Retour

| Propriété | Type | Description |
|-----------|------|-------------|
| `copy` | `(text: string) => Promise<boolean>` | Copie le texte |
| `copied` | `Readonly<Ref<boolean>>` | Vrai pendant `timeout` ms après une copie réussie |
| `error` | `Readonly<Ref<unknown>>` | Erreur de la dernière copie, ou `null` |
| `isSupported` | `boolean` | Copie possible dans ce navigateur |
| `reset` | `() => void` | Remet `copied` à faux |
