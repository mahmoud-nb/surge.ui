# Alert

Le composant Alert permet d'afficher des messages importants et contextuels à l'utilisateur, tels que des confirmations, avertissements, erreurs ou informations générales.

## Exemples d'utilisation

### Alert basique
<SuAlert title="Titre de l'alerte" description="Ceci est une description de l'alerte." />

```vue
<template>
  <SuAlert 
    title="Titre de l'alerte" 
    description="Ceci est une description de l'alerte." 
  />
</template>
```

### Types d'alertes

<div class="component-demo">
  <SuAlert type="success" title="Succès" description="L'opération a été réalisée avec succès." /> 
  <SuAlert type="warning" title="Attention" description="Cette action est irréversible." /> 
  <SuAlert type="error" title="Erreur" description="Une erreur s'est produite." /> 
  <SuAlert type="info" title="Information" description="Nouvelle fonctionnalité disponible." />
</div>

```vue
<template>
  <SuAlert 
    type="success"
    title="Succès" 
    description="L'opération a été réalisée avec succès." 
  />
  <SuAlert 
    type="warning"
    title="Attention" 
    description="Cette action est irréversible." 
  />
  <SuAlert 
    type="error"
    title="Erreur" 
    description="Une erreur s'est produite." 
  />
  <SuAlert 
    type="info"
    title="Information" 
    description="Nouvelle fonctionnalité disponible." 
  />
</template>
```

### Alert avec slots personnalisés

<div class="component-demo">
  <SuAlert type="success"> 
    <template #title>
      <strong>Titre personnalisé</strong>
    </template> 
    <template #description>
      <p>Description avec <em>contenu riche</em> et <a href="#">liens</a>.</p>
    </template> 
  </SuAlert>
</div>

```vue
<template>
  <SuAlert type="success">
    <template #title>
      <strong>Titre personnalisé</strong>
    </template>
    <template #description>
      <p>Description avec <em>contenu riche</em> et <a href="#">liens</a>.</p>
    </template>
  </SuAlert>
</template>
```

### Alert fermable

<div class="component-demo">
  <SuAlert
    type="info"
    title="Notification"
    description="Cette alerte peut être fermée."
    dismissible
  />
</div>

```vue
<script setup>
const handleDismiss = () => {
  console.log('Alert fermée')
}
</script>

<template>
  <SuAlert 
    type="info" 
    title="Notification" 
    description="Cette alerte peut être fermée."
    dismissible
    @dismiss="handleDismiss"
  />
</template>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `type` | `'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'info'` | Type (couleur et icône) |
| `title` | `string` | - | Titre (sinon slot `title`) |
| `description` | `string` | - | Texte (sinon slot `description`) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |
| `dismissible` | `boolean` | `false` | Bouton de fermeture |
| `dismissLabel` | `string` | - | Nom accessible du bouton de fermeture (sinon traduit) |
| `ariaLive` | `'polite' \| 'assertive' \| 'off'` | `'polite'` | Politesse de l'annonce aux lecteurs d'écran |
| `ariaAtomic` | `boolean` | `true` | Relit toute l'alerte quand elle change |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `dismiss` | - | Clic sur le bouton de fermeture ; la page retire l'alerte |

### Slots

| Slot | Description |
|------|-------------|
| `title` | Remplace le titre |
| `description` | Remplace le texte |
| `default` | Contenu supplémentaire sous la description (actions, liens) |

## Accessibilité

Le composant Alert respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C pour assurer une expérience accessible à tous les utilisateurs.

### Fonctionnalités d'accessibilité

- Rôle ARIA approprié : Utilise role="alert" pour identifier l'élément comme une alerte
- Annonces screen reader : Support de aria-live avec différents niveaux de politesse (assertive pour les alertes critiques, polite pour les informations)
- Navigation au clavier : Le bouton de fermeture est entièrement navigable et actionnable au clavier
- Contraste des couleurs : Les couleurs respectent les ratios de contraste WCAG AA
- Support RTL : Interface adaptée aux langues de droite à gauche
- Mode sombre : Thème adapté aux préférences système
- Contraste élevé : Adaptation aux paramètres de contraste élevé
- Réduction des animations : Respect des préférences de réduction de mouvement

## Exemples d'usage avancés

### Gestion d'état d'alerte

```vue
<script setup>
import { ref } from 'vue'

const alerts = ref([
  { id: 1, type: 'success', title: 'Succès', description: 'Opération réussie', visible: true },
  { id: 2, type: 'error', title: 'Erreur', description: 'Échec de l\'opération', visible: true }
])

const removeAlert = (id) => {
  const index = alerts.value.findIndex(alert => alert.id === id)
  if (index > -1) {
    alerts.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="alert-container">
    <SuAlert
      v-for="alert in alerts"
      :key="alert.id"
      :type="alert.type"
      :title="alert.title"
      :description="alert.description"
      dismissible
      @dismiss="removeAlert(alert.id)"
    />
  </div>
</template>
```