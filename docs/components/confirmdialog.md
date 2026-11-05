<script setup>
import { ref } from 'vue'
import { useConfirm } from '@surgeui/ds-vue'

const { confirm } = useConfirm()
const result = ref('—')

const publish = async () => {
  const ok = await confirm({ title: 'Publier l\'article ?', description: 'Il sera visible par tous les lecteurs.', confirmLabel: 'Publier' })
  result.value = ok ? 'publié' : 'annulé'
}

const remove = async () => {
  const ok = await confirm({
    title: 'Supprimer le projet ?',
    description: 'Le projet et ses 24 fichiers seront supprimés définitivement.',
    confirmLabel: 'Supprimer',
    tone: 'danger'
  })
  result.value = ok ? 'supprimé' : 'annulé'
}
</script>

# ConfirmDialog

Confirmation d'une action avant de l'exécuter, par promesse : `await confirm({...})` renvoie `true` ou `false`. Les demandes sont affichées par `SuConfirmDialog`, placé une fois dans l'application.

<SuConfirmDialog />

## Exemples d'utilisation

### Mise en place

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <SuConfirmDialog />
</template>
```

### Confirmer une action

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons">
      <SuButton variant="outline" @click="publish">Publier</SuButton>
      <SuButton variant="outline" @click="remove">Supprimer le projet</SuButton>
    </div>
    <p>Résultat : {{ result }}</p>
  </div>
</div>

```vue
<script setup>
import { useConfirm } from '@surgeui/ds-vue'

const { confirm } = useConfirm()

const removeProject = async () => {
  const ok = await confirm({
    title: 'Supprimer le projet ?',
    description: 'Le projet et ses 24 fichiers seront supprimés définitivement.',
    confirmLabel: 'Supprimer',
    tone: 'danger'
  })
  if (ok) await api.deleteProject()
}
</script>
```

Un texte seul devient le titre : `await confirm('Quitter sans enregistrer ?')`.

## API

### useConfirm()

| Propriété | Type | Description |
|-----------|------|-------------|
| `confirm` | `(options?: ConfirmOptions \| string) => Promise<boolean>` | Ouvre une confirmation ; les demandes simultanées attendent leur tour |
| `current` | `ComputedRef<ConfirmRequest \| null>` | Demande affichée |
| `settle` | `(value: boolean) => void` | Répond à la demande affichée (dialog personnalisé) |

### ConfirmOptions

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `title` | `string` | `'Confirmer l'action ?'` | Titre |
| `description` | `string` | - | Conséquences de l'action |
| `confirmLabel` | `string` | `'Confirmer'` | Bouton de confirmation (un verbe précis : « Supprimer ») |
| `cancelLabel` | `string` | `'Annuler'` | Bouton d'annulation |
| `tone` | `'default' \| 'danger'` | `'default'` | `danger` : bouton rouge, focus sur Annuler, clic sur le fond sans effet |

Sans `SuConfirmDialog` monté, `confirm()` se replie sur `window.confirm()`.

## Accessibilité

- `SuDialog` natif (`showModal()`) en `role="alertdialog"`, nommé par le titre et décrit par la description.
- Focus initial : « Annuler » pour une action dangereuse (l'option la moins destructive), « Confirmer » sinon.
- `Échap`, le clic sur le fond (sauf `danger`) et « Annuler » répondent `false` ; le focus revient à l'élément déclencheur.
