# useAnnouncer

Annonce un message aux lecteurs d'écran sans l'afficher : résultat d'une action, nombre de résultats, erreur. Les composants SurgeUI l'utilisent pour leurs annonces (sélection multiple, fichiers ajoutés, limite atteinte…).

## Utilisation

```vue
<script setup>
import { useAnnouncer } from '@surgeui/ds-vue'

const { announce } = useAnnouncer()

const save = async () => {
  await api.save()
  announce('Modifications enregistrées')
}

const upload = (file) => {
  if (file.size > MAX) {
    announce('Le fichier dépasse 5 Mo', { priority: 'assertive' })
  }
}
</script>
```

Hors composant (store, service), utilisez la fonction `announce` directement :

```ts
import { announce } from '@surgeui/ds-vue'

announce('3 résultats')
```

## Pourquoi un composable ?

Une région live (`aria-live`) n'est lue que si elle **existe déjà** quand son contenu change : une région insérée avec son texte est souvent ignorée. `useAnnouncer` :

- crée deux régions persistantes (polie et assertive) au montage du premier composant, avant toute annonce ;
- vide la région puis écrit le message après un court délai : un message identique au précédent est relu ;
- efface le message après quelques secondes, pour qu'il ne soit pas relu au curseur virtuel ;
- annonce dans le `<dialog>` modal ouvert s'il y en a un : le reste de la page y est inerte et ses régions se taisent.

## Priorités

| Priorité | Usage |
|----------|-------|
| `polite` (défaut) | Information : action réussie, nombre de résultats, élément ajouté |
| `assertive` | Interrompt la lecture en cours : à réserver aux erreurs qui bloquent l'utilisateur |

## API

### useAnnouncer()

| Retour | Type | Description |
|--------|------|-------------|
| `announce` | `(message: string, options?) => void` | Annonce un message |
| `clear` | `() => void` | Efface les messages en attente ou affichés |

### Options d'announce

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `priority` | `'polite' \| 'assertive'` | `'polite'` | Priorité de l'annonce |
| `clearAfter` | `number` | `5000` | Délai avant d'effacer le message (ms) ; `0` pour le garder |

### Fonctions

| Fonction | Description |
|----------|-------------|
| `announce(message, options?)` | Annonce hors composant (aucun effet côté serveur) |
| `clearAnnouncements()` | Efface toutes les annonces |

::: info Migration
`accessibility.announceToScreenReader()` est obsolète : elle passe désormais par `announce` et sera retirée dans une prochaine version majeure.
:::
