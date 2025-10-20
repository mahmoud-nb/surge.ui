# SwitchField

Composant SwitchField (interrupteur) pour les actions de basculement on/off. Conforme aux normes W3C avec support complet de l'accessibilité et positionnement intelligent des labels.

## Exemples d'utilisation

### SwitchField de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Switch simple</h4>
    <div class="demo-inputs">
      <SuSwitchField
        label="Notifications"
        message="Activer les notifications push"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const notifications = ref(false)
</script>

<template>
  <SuSwitchField
    label="Notifications"
    message="Activer les notifications push"
    v-model="notifications"
  />
</template>
```

### Switch avec labels latéraux

<div class="component-demo">
  <div class="demo-section">
    <h4>Avec un seul label (aligné à côté)</h4>
    <div class="demo-inputs">
      <SuSwitchField
        label="Mode sombre"
        rightLabel="Activé"
        message="Basculer vers le thème sombre"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitchField
    label="Mode sombre"
    rightLabel="Activé"
    message="Basculer vers le thème sombre"
    v-model="darkMode"
  />
</template>
```

### Switch avec labels des deux côtés

<div class="component-demo">
  <div class="demo-section">
    <h4>Avec labels gauche et droite (centré)</h4>
    <div class="demo-inputs">
      <SuSwitchField
        label="Visibilité du profil"
        leftLabel="Privé"
        rightLabel="Public"
        message="Contrôler qui peut voir votre profil"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitchField
    label="Visibilité du profil"
    leftLabel="Privé"
    rightLabel="Public"
    message="Contrôler qui peut voir votre profil"
    v-model="isPublic"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuSwitchField
        size="sm"
        label="Small"
        rightLabel="Petit"
      />
      <SuSwitchField
        size="md"
        label="Medium"
        rightLabel="Moyen"
      />
      <SuSwitchField
        size="lg"
        label="Large"
        rightLabel="Grand"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitchFieldsize="sm" label="Small" rightLabel="Petit" />
  <SuSwitchFieldsize="md" label="Medium" rightLabel="Moyen" />
  <SuSwitchFieldsize="lg" label="Large" rightLabel="Grand" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuSwitchField
        label="État par défaut"
        rightLabel="Normal"
        message="Fonctionnement normal"
      />
      <SuSwitchField
        state="error"
        label="État d'erreur"
        rightLabel="Erreur"
        message="Une erreur s'est produite"
        :value="true"
      />
      <SuSwitchField
        state="success"
        label="État de succès"
        rightLabel="Succès"
        message="Configuration sauvegardée !"
        :value="true"
      />
      <SuSwitchField
        state="warning"
        label="État d'avertissement"
        rightLabel="Attention"
        message="Cette action nécessite une confirmation"
        :value="true"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitchField
    state="default"
    label="État par défaut"
    message="Fonctionnement normal"
  />
  <SuSwitchField
    state="error"
    label="État d'erreur"
    message="Une erreur s'est produite"
  />
  <SuSwitchField
    state="success"
    label="État de succès"
    message="Configuration sauvegardée !"
  />
  <SuSwitchField
    state="warning"
    label="État d'avertissement"
    message="Cette action nécessite une confirmation"
  />
</template>
```

### États disabled et readonly

<div class="component-demo">
  <div class="demo-section">
    <h4>États spéciaux</h4>
    <div class="demo-inputs">
      <SuSwitchField
        label="Switch désactivé"
        rightLabel="Désactivé"
        :disabled="true"
        :value="true"
        message="Ce switch est désactivé"
      />
      <SuSwitchField
        label="Switch en lecture seule"
        rightLabel="Lecture seule"
        :readonly="true"
        :value="false"
        message="Cette valeur ne peut pas être modifiée"
      />
      <SuSwitchField
        label="Champ requis"
        rightLabel="Requis"
        :required="true"
        message="Ce paramètre est obligatoire"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitchField
    label="Switch désactivé"
    :disabled="true"
    :value="true"
    message="Ce switch est désactivé"
  />
  <SuSwitchField
    label="Switch en lecture seule"
    :readonly="true"
    :value="false"
    message="Cette valeur ne peut pas être modifiée"
  />
  <SuSwitchField
    label="Champ requis"
    :required="true"
    message="Ce paramètre est obligatoire"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | État du switch (activé/désactivé) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du switch |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel du switch |
| `disabled` | `boolean` | `false` | Désactive le switch |
| `readonly` | `boolean` | `false` | Switch en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `label` | `string` | `undefined` | Label principal du switch |
| `leftLabel` | `string` | `undefined` | Label affiché à gauche du switch |
| `rightLabel` | `string` | `undefined` | Label affiché à droite du switch |
| `message` | `string` | `undefined` | Message affiché (style déterminé par le state) |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
| `ariaInvalid` | `boolean` | `undefined` | Indique si la valeur est invalide |
| `ariaRequired` | `boolean` | `undefined` | Indique si le champ est requis |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: boolean) => void` | Émis lors du changement d'état (v-model) |
| `@change` | `(value: boolean) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Émis lors de l'appui sur une touche |

## Positionnement des labels

Le composant Switch adapte automatiquement le positionnement selon les labels fournis :

### 🎯 Logique de positionnement

- **Aucun label latéral** : Switch aligné à gauche
- **Un seul label** (`leftLabel` OU `rightLabel`) : Switch aligné à côté du label
- **Deux labels** (`leftLabel` ET `rightLabel`) : Switch centré entre les deux labels

```vue
<!-- Switch à gauche -->
<SuSwitchFieldlabel="Notifications" />

<!-- Switch à côté du label -->
<SuSwitchFieldlabel="Mode sombre" rightLabel="Activé" />

<!-- Switch centré -->
<SuSwitchFieldlabel="Visibilité" leftLabel="Privé" rightLabel="Public" />
```

### Icônes personnalisées

<div class="component-demo">
  <div class="demo-section">
    <h4>Switch avec icônes personnalisées</h4>
    <div class="demo-inputs">
      <SuSwitchField
        label="Mode sombre"
        leftLabel="Clair"
        rightLabel="Sombre"
        :leftIcon="SunIcon"
        :rightIcon="MoonIcon"
        message="Basculer entre les thèmes"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuSwitchField
    label="Mode sombre"
    leftLabel="Clair"
    rightLabel="Sombre"
    :leftIcon="SunIcon"
    :rightIcon="MoonIcon"
    message="Basculer entre les thèmes"
  />
</template>
```

### Position des labels

<div class="component-demo">
  <div class="demo-section">
    <h4>Labels à l'extérieur vs à l'intérieur</h4>
    <div class="demo-inputs">
      <SuSwitchField
        label="Labels à l'extérieur (défaut)"
        leftLabel="OFF"
        rightLabel="ON"
        labelPosition="outside"
        message="Labels positionnés à côté du switch"
      />
      <SuSwitchField
        label="Labels à l'intérieur"
        leftLabel="OFF"
        rightLabel="ON"
        labelPosition="inside"
        message="Labels intégrés dans le switch"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- Labels à l'extérieur (défaut) -->
  <SuSwitchField
    label="Mode sombre"
    leftLabel="Clair"
    rightLabel="Sombre"
    labelPosition="outside"
  />
  
  <!-- Labels à l'intérieur -->
  <SuSwitchField
    label="Mode sombre"
    leftLabel="OFF"
    rightLabel="ON"
    labelPosition="inside"
  />
```

## Accessibilité

Le composant Switch respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Rôle ARIA** : `role="switch"` avec `aria-checked`
- **Navigation au clavier** : Support des touches Espace et Entrée
- **Labels associés** : Chaque switch a un label correctement associé
- **Messages d'état** : Messages avec `aria-live` pour les lecteurs d'écran
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1 minimum)
- **Focus visible** : Indicateur de focus clair et contrasté
- **Tailles minimales** : Respecte les tailles minimales de cible tactile (44px)
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- Switch avec accessibilité complète -->
<SuSwitchField
  label="Notifications push"
  rightLabel="Activées"
  :required="true"
  message="Recevoir des notifications en temps réel"
  ariaLabel="Activer les notifications push"
  v-model="pushNotifications"
/>

<!-- Switch avec gestion d'erreur -->
<SuSwitchField
  label="Synchronisation"
  leftLabel="Désactivée"
  rightLabel="Activée"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Erreur de synchronisation' : 'Synchronisation automatique des données'"
  v-model="syncEnabled"
/>

<!-- Switch avec validation -->
<SuSwitchField
  label="Accepter les conditions"
  rightLabel="J'accepte"
  :required="true"
  :state="!termsAccepted ? 'error' : 'success'"
  :message="!termsAccepted ? 'Vous devez accepter les conditions' : 'Conditions acceptées'"
  v-model="termsAccepted"
/>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le switch |
| `Espace` | Basculer l'état du switch |
| `Entrée` | Basculer l'état du switch |

## Exemples d'usage avancés

### Panneau de paramètres

```vue
<script setup>
import { ref } from 'vue'

const settings = ref({
  notifications: true,
  darkMode: false,
  autoSave: true,
  publicProfile: false,
  emailUpdates: true
})
</script>

<template>
  <div class="settings-panel">
    <h2>Paramètres</h2>
    
    <div class="settings-group">
      <h3>Interface</h3>
      <SuSwitchField
        label="Mode sombre"
        leftLabel="Clair"
        rightLabel="Sombre"
        message="Basculer entre les thèmes clair et sombre"
        v-model="settings.darkMode"
      />
      <SuSwitchField
        label="Sauvegarde automatique"
        rightLabel="Activée"
        message="Sauvegarder automatiquement vos modifications"
        v-model="settings.autoSave"
      />
    </div>
    
    <div class="settings-group">
      <h3>Confidentialité</h3>
      <SuSwitchField
        label="Profil public"
        leftLabel="Privé"
        rightLabel="Public"
        message="Contrôler la visibilité de votre profil"
        v-model="settings.publicProfile"
      />
    </div>
    
    <div class="settings-group">
      <h3>Notifications</h3>
      <SuSwitchField
        label="Notifications push"
        rightLabel="Activées"
        message="Recevoir des notifications en temps réel"
        v-model="settings.notifications"
      />
      <SuSwitchField
        label="Mises à jour par email"
        rightLabel="Activées"
        message="Recevoir les nouveautés par email"
        v-model="settings.emailUpdates"
      />
    </div>
  </div>
</template>

<style scoped>
.settings-panel {
  max-width: 500px;
  margin: 0 auto;
}

.settings-group {
  margin-bottom: 2rem;
}

.settings-group h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-weight: 600;
}

.settings-group > * + * {
  margin-top: 1rem;
}
</style>
```

### Switch avec validation conditionnelle

```vue
<script setup>
import { ref, computed } from 'vue'

const termsAccepted = ref(false)
const privacyAccepted = ref(false)
const marketingAccepted = ref(false)

const canProceed = computed(() => {
  return termsAccepted.value && privacyAccepted.value
})

const getState = (isRequired, value) => {
  if (!isRequired) return 'default'
  return value ? 'success' : 'error'
}

const getMessage = (isRequired, value, successMsg, errorMsg) => {
  if (!isRequired) return undefined
  return value ? successMsg : errorMsg
}
</script>

<template>
  <form class="consent-form">
    <h2>Consentements</h2>
    
    <SuSwitchField
      label="Conditions d'utilisation"
      rightLabel="J'accepte"
      :required="true"
      :state="getState(true, termsAccepted)"
      :message="getMessage(
        true, 
        termsAccepted,
        'Conditions acceptées',
        'Vous devez accepter les conditions d\'utilisation'
      )"
      v-model:value="termsAccepted"
    />
    
    <SuSwitchField
      label="Politique de confidentialité"
      rightLabel="J'accepte"
      :required="true"
      :state="getState(true, privacyAccepted)"
      :message="getMessage(
        true,
        privacyAccepted,
        'Politique acceptée',
        'Vous devez accepter la politique de confidentialité'
      )"
      v-model:value="privacyAccepted"
    />
    
    <SuSwitchField
      label="Communications marketing"
      rightLabel="J'accepte"
      message="Recevoir des offres et actualités (optionnel)"
      v-model:value="marketingAccepted"
    />
    
    <button 
      type="submit" 
      :disabled="!canProceed"
      class="submit-button"
    >
      Continuer
    </button>
  </form>
</template>

<style scoped>
.consent-form {
  max-width: 400px;
  margin: 0 auto;
}

.consent-form > * + * {
  margin-top: 1.5rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-button:not(:disabled):hover {
  background-color: #2563eb;
}
</style>
```