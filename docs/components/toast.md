<script setup>
import { useToast } from '@surgeui/ds-vue'

const toast = useToast()

const showProgress = () => {
  const id = toast.show({ title: 'Export en cours…', duration: 0, dismissible: false })
  setTimeout(() => toast.update(id, { title: 'Export terminé', type: 'success', duration: 4000, dismissible: true }), 1500)
}
</script>

# Toast

Notifications éphémères : un message court qui confirme une action ou signale un problème, sans interrompre l'utilisateur. Les toasts sont créés avec le composable `useToast()` et affichés par `SuToaster`, placé une fois dans l'application.

Pour un message qui doit rester dans la page, utilisez [Alert](/components/alert).

<SuToaster />

## Exemples d'utilisation

### Mise en place

Placez `SuToaster` une fois, à la racine de l'application. Le plugin fournit la file des toasts à toute l'application.

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <SuToaster position="bottom-right" />
</template>
```

### Types

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="toast.success('Projet enregistré', { description: 'Vos modifications sont en ligne.' })">Succès</SuButton>
      <SuButton variant="outline" @click="toast.error('Échec de l\'envoi', { description: 'Vérifiez votre connexion.' })">Erreur</SuButton>
      <SuButton variant="outline" @click="toast.warning('Quota presque atteint')">Avertissement</SuButton>
      <SuButton variant="outline" @click="toast.info('Nouvelle version disponible')">Info</SuButton>
      <SuButton variant="outline" @click="toast.show('Lien copié')">Neutre</SuButton>
    </div>
  </div>
</div>

```vue
<script setup>
import { useToast } from '@surgeui/ds-vue'

const toast = useToast()
</script>

<template>
  <SuButton @click="toast.success('Projet enregistré', { description: 'Vos modifications sont en ligne.' })">
    Enregistrer
  </SuButton>
</template>
```

### Action et toast persistant

Le bouton d'action ferme le toast après l'appel. Avec `duration: 0`, le toast reste affiché jusqu'à sa fermeture.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="toast.show({ title: 'Message archivé', action: { label: 'Annuler', onClick: () => toast.info('Archivage annulé') } })">Avec action</SuButton>
      <SuButton variant="outline" @click="toast.error('Connexion perdue', { duration: 0 })">Persistant</SuButton>
      <SuButton variant="ghost" @click="toast.dismiss()">Tout fermer</SuButton>
    </div>
  </div>
</div>

```js
toast.show({
  title: 'Message archivé',
  action: { label: 'Annuler', onClick: () => restore(message) }
})

toast.error('Connexion perdue', { duration: 0 })
toast.dismiss() // ferme tous les toasts
```

### Mise à jour d'un toast

`update(id, options)` modifie un toast affiché et relance son délai. `show()` avec un `id` existant le remplace entièrement.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="showProgress">Lancer l'export</SuButton>
    </div>
  </div>
</div>

```js
const id = toast.show({ title: 'Export en cours…', duration: 0, dismissible: false })
await exportData()
toast.update(id, { title: 'Export terminé', type: 'success', duration: 4000, dismissible: true })
```

## API

### useToast()

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `show` | `(options \| string) => string` | Affiche un toast (un texte seul devient le titre) ; renvoie son id |
| `success` / `error` / `warning` / `info` | `(title, options?) => string` | Raccourcis typés |
| `update` | `(id, options) => void` | Modifie un toast affiché |
| `dismiss` | `(id?) => void` | Ferme un toast, ou tous sans argument |
| `toasts` | `Readonly<Ref<ToastItem[]>>` | Toasts en cours, du plus ancien au plus récent |

### Options d'un toast

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `id` | `string` | généré | Un toast de même id est remplacé |
| `type` | `'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'neutral'` | Type (icône, priorité de l'annonce) |
| `title` | `string` | - | Titre |
| `description` | `string` | - | Texte complémentaire |
| `duration` | `number` | celle du `SuToaster` | Durée d'affichage (ms) ; `0` = jusqu'à fermeture |
| `dismissible` | `boolean` | `true` | Bouton de fermeture |
| `action` | `{ label: string, onClick: () => void }` | - | Bouton d'action |
| `announce` | `boolean` | `true` | Annonce aux lecteurs d'écran |
| `onDismiss` | `(toast) => void` | - | Appelé quand le toast est retiré |

### Props de SuToaster

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Coin de l'écran (pleine largeur sur mobile) |
| `max` | `number` | `3` | Toasts visibles ; les suivants attendent leur tour |
| `duration` | `number` | `5000` | Durée par défaut (ms) |
| `ariaLabel` | `string` | `'Notifications'` | Nom de la zone |

### Slot de SuToaster

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ toast, dismiss }` | Rendu personnalisé d'un toast (par défaut `SuToast`) |

`SuToast` (l'élément de la pile) accepte `type`, `title`, `description`, `dismissible`, `duration`, `paused`, `action` et `dismissLabel`, et émet `dismiss` avec la raison (`'timeout'`, `'close'`, `'action'`).

## Accessibilité

- Chaque toast est annoncé par `useAnnouncer` : poliment, ou de façon assertive pour une erreur. La zone `SuToaster` est nommée (« Notifications ») mais n'est pas une région live, pour éviter les doubles lectures.
- WCAG 2.2.1 : les délais sont suspendus au survol, au focus dans la zone et quand l'onglet est masqué. Un message important ou avec une action doit être persistant (`duration: 0`).
- La pile est affichée en couche supérieure (`popover`) : elle reste visible au-dessus d'un `SuDialog` modal. Tant que le dialog est ouvert, ses boutons ne sont pas utilisables (le reste de la page est inerte), mais l'annonce passe par le dialog.
- Le bouton de fermeture est nommé (« Fermer la notification », personnalisable par la locale `toast.dismiss`).
