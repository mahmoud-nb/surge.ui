# Switch

Composant Switch (interrupteur) pour les actions de basculement on/off. Conforme aux normes W3C avec support complet de l'accessibilité et positionnement intelligent des labels.

## Description

`Switch` est un composant interrupteur enrichi qui permet de basculer entre deux états (activé/désactivé). Il offre différentes options de positionnement des labels (gauche, droite, intérieur), supporte les icônes personnalisées, et respecte toutes les normes d'accessibilité.

## Exemples d'utilisation

### Utilisation simple (sans SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Switch de base</h4>
    <div class="demo-inputs">
      <SuSwitch />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const isEnabled = ref(false)
</script>

<template>
  <SuSwitch v-model="isEnabled" />
</template>
```

### Switch avec label droit

<div class="component-demo">
  <div class="demo-section">
    <h4>Avec label à droite</h4>
    <div class="demo-inputs">
      <SuSwitch rightLabel="Activé" />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const darkMode = ref(false)
</script>

<template>
  <SuSwitch 
    rightLabel="Activé"
    v-model="darkMode"
  />
</template>
```

### Switch avec labels des deux côtés

<div class="component-demo">
  <div class="demo-section">
    <h4>Labels gauche et droite</h4>
    <div class="demo-inputs">
      <SuSwitch 
        leftLabel="Privé"
        rightLabel="Public"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const isPublic = ref(false)
</script>

<template>
  <SuSwitch 
    leftLabel="Privé"
    rightLabel="Public"
    v-model="isPublic"
  />
</template>
```

### Avec icônes

<div class="component-demo">
  <div class="demo-section">
    <h4>Switch avec icônes</h4>
    <div class="demo-inputs">
      <SuSwitch 
        leftLabel="Clair"
        rightLabel="Sombre"
        :leftIcon="SunIcon"
        :rightIcon="MoonIcon"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const theme = ref(false)
</script>

<template>
  <SuSwitch 
    leftLabel="Clair"
    rightLabel="Sombre"
    :leftIcon="SunIcon"
    :rightIcon="MoonIcon"
    v-model="theme"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuSwitch 
        size="sm"
        rightLabel="Small"
      />
      <SuSwitch 
        size="md"
        rightLabel="Medium"
      />
      <SuSwitch 
        size="lg"
        rightLabel="Large"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitch 
    size="sm" 
    rightLabel="Small"
  />
  
  <SuSwitch 
    size="md" 
    rightLabel="Medium"
  />
  
  <SuSwitch 
    size="lg" 
    rightLabel="Large"
  />
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États visuels</h4>
    <div class="demo-inputs">
      <SuSwitch 
        rightLabel="Default"
      />
      <SuSwitch 
        state="error"
        rightLabel="Error"
        :value="true"
      />
      <SuSwitch 
        state="success"
        rightLabel="Success"
        :value="true"
      />
      <SuSwitch 
        state="warning"
        rightLabel="Warning"
        :value="true"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitch 
    rightLabel="Default"
  />
  
  <SuSwitch 
    state="error"
    rightLabel="Error"
    :value="true"
  />
  
  <SuSwitch 
    state="success"
    rightLabel="Success"
    :value="true"
  />
  
  <SuSwitch 
    state="warning"
    rightLabel="Warning"
    :value="true"
  />
</template>
```

### Position des labels

<div class="component-demo">
  <div class="demo-section">
    <h4>Labels extérieurs vs intérieurs</h4>
    <div class="demo-inputs">
      <SuSwitch 
        leftLabel="OFF"
        rightLabel="ON"
        labelPosition="outside"
      />
      <SuSwitch 
        leftLabel="OFF"
        rightLabel="ON"
        labelPosition="inside"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- Labels à l'extérieur (défaut) -->
  <SuSwitch 
    leftLabel="OFF"
    rightLabel="ON"
    labelPosition="outside"
  />
  
  <!-- Labels à l'intérieur -->
  <SuSwitch 
    leftLabel="OFF"
    rightLabel="ON"
    labelPosition="inside"
  />
</template>
```

### États spéciaux

<div class="component-demo">
  <div class="demo-section">
    <h4>Désactivé et lecture seule</h4>
    <div class="demo-inputs">
      <SuSwitch 
        :disabled="true"
        rightLabel="Désactivé"
        :value="true"
      />
      <SuSwitch 
        :readonly="true"
        rightLabel="Lecture seule"
        :value="false"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSwitch 
    :disabled="true"
    rightLabel="Désactivé"
    :value="true"
  />
  
  <SuSwitch 
    :readonly="true"
    rightLabel="Lecture seule"
    :value="false"
  />
</template>
```

## Utilisation avec SuFormField

Le composant `SuSwitch` peut être utilisé avec `SuFormField` pour bénéficier d'une structure de formulaire complète avec label principal, message et gestion des états.

### Usage basique avec SuFormField

```vue
<template>
  <SuFormField 
    label="Notifications" 
    message="Activer les notifications push"
  >
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="Activées"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
</template>
```

### Avec destructuration des slot props

```vue
<template>
  <SuFormField 
    label="Mode sombre"
    message="Basculer vers le thème sombre"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuSwitch 
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        leftLabel="Clair"
        rightLabel="Sombre"
        v-model="darkMode"
      />
    </template>
  </SuFormField>
</template>
```

### Validation avec états

<div class="component-demo">
  <div class="demo-section">
    <h4>Switch avec validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Accepter les conditions"
        :required="true"
        state="error"
        message="Vous devez accepter les conditions"
      >
        <template #default="slotProps">
          <SuSwitch 
            rightLabel="J'accepte"
            v-bind="slotProps"
          />
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref, computed } from 'vue'

const termsAccepted = ref(false)

const termsState = computed(() => {
  return termsAccepted.value ? 'success' : 'error'
})

const termsMessage = computed(() => {
  return termsAccepted.value 
    ? 'Conditions acceptées' 
    : 'Vous devez accepter les conditions'
})
</script>

<template>
  <SuFormField 
    label="Accepter les conditions"
    :required="true"
    :state="termsState"
    :message="termsMessage"
  >
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="J'accepte"
        v-bind="slotProps"
        v-model="termsAccepted"
      />
    </template>
  </SuFormField>
</template>
```

### Avec labels personnalisés

```vue
<template>
  <SuFormField 
    label="Visibilité du profil"
    message="Contrôler qui peut voir votre profil"
  >
    <template #default="slotProps">
      <SuSwitch 
        leftLabel="Privé"
        rightLabel="Public"
        v-bind="slotProps"
        v-model="isPublic"
      />
    </template>
  </SuFormField>
</template>
```

### Label et message personnalisés

```vue
<script setup>
import { BellIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Notifications push" 
    :required="true"
    message="Recevoir des notifications"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <BellIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="Activées"
        v-bind="slotProps"
        v-model="pushNotifications"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Notifications requises</span>
        <span v-else>Recevoir des notifications en temps réel</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Avec icônes et descriptions

```vue
<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Thème de l'interface"
    message="Choisissez le thème qui vous convient"
  >
    <template #default="slotProps">
      <SuSwitch 
        leftLabel="Clair"
        rightLabel="Sombre"
        :leftIcon="SunIcon"
        :rightIcon="MoonIcon"
        v-bind="slotProps"
        v-model="darkMode"
      />
    </template>
  </SuFormField>
</template>
```

### Panneau de paramètres

```vue
<script setup>
import { ref } from 'vue'

const settings = ref({
  notifications: true,
  darkMode: false,
  autoSave: true,
  publicProfile: false
})
</script>

<template>
  <div class="settings-panel">
    <h2>Paramètres</h2>
    
    <SuFormField 
      label="Mode sombre"
      message="Basculer entre les thèmes"
    >
      <template #default="slotProps">
        <SuSwitch 
          leftLabel="Clair"
          rightLabel="Sombre"
          v-bind="slotProps"
          v-model="settings.darkMode"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Sauvegarde automatique"
      message="Sauvegarder automatiquement vos modifications"
    >
      <template #default="slotProps">
        <SuSwitch 
          rightLabel="Activée"
          v-bind="slotProps"
          v-model="settings.autoSave"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Profil public"
      message="Contrôler la visibilité de votre profil"
    >
      <template #default="slotProps">
        <SuSwitch 
          leftLabel="Privé"
          rightLabel="Public"
          v-bind="slotProps"
          v-model="settings.publicProfile"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Notifications push"
      message="Recevoir des notifications en temps réel"
    >
      <template #default="slotProps">
        <SuSwitch 
          rightLabel="Activées"
          v-bind="slotProps"
          v-model="settings.notifications"
        />
      </template>
    </SuFormField>
  </div>
</template>
```

### Champ désactivé

```vue
<template>
  <SuFormField 
    label="Option désactivée"
    :disabled="true"
    message="Ce paramètre n'est pas modifiable"
  >
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="Désactivé"
        :value="true"
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | État du switch (v-model) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du switch |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le switch |
| `readonly` | `boolean` | `false` | Switch en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `leftLabel` | `string` | `undefined` | Label affiché à gauche |
| `rightLabel` | `string` | `undefined` | Label affiché à droite |
| `leftIcon` | `Component` | `undefined` | Icône à gauche (Heroicons) |
| `rightIcon` | `Component` | `undefined` | Icône à droite (Heroicons) |
| `labelPosition` | `'outside' \| 'inside'` | `'outside'` | Position des labels |

### Props d'accessibilité (héritées de SuFormField)

Lorsque utilisé avec `SuFormField`, le composant reçoit automatiquement :

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | ID unique du champ (fieldId) |
| `aria-describedby` | `string` | ID du message associé (messageId) |
| `state` | `string` | État de validation |
| `disabled` | `boolean` | État désactivé |

### Attributs d'accessibilité supplémentaires

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaInvalid` | `boolean` | `undefined` | Indique si invalide |
| `ariaRequired` | `boolean` | `undefined` | Indique si requis |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: boolean) => void` | Émis lors du changement (v-model) |
| `@change` | `(value: boolean) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Émis sur appui de touche |

## Positionnement des labels

Le composant Switch adapte automatiquement le positionnement selon les labels fournis :

### 🎯 Logique de positionnement

- **Aucun label latéral** : Switch seul
- **Un seul label** (`leftLabel` OU `rightLabel`) : Switch aligné à côté
- **Deux labels** (`leftLabel` ET `rightLabel`) : Switch centré entre les deux

```vue
<!-- Switch seul -->
<SuSwitch />

<!-- Switch à côté du label -->
<SuSwitch rightLabel="Activé" />

<!-- Switch centré -->
<SuSwitch leftLabel="Privé" rightLabel="Public" />
```

## Accessibilité

Le composant Switch respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Rôle ARIA** : `role="switch"` avec `aria-checked`
- **Navigation au clavier** : Espace et Entrée
- **Labels associés** : Via aria-describedby (messageId)
- **Messages d'état** : Avec `aria-live`
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1)
- **Focus visible** : Indicateur clair avec outline
- **Tailles minimales** : Cible tactile de 44px minimum
- **Mode sombre** : Contraste adapté
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques d'utilisation

```vue
<!-- ✅ BON : Utilisation avec SuFormField -->
<SuFormField 
  label="Notifications"
  :required="true"
  message="Activer les notifications push"
>
  <template #default="slotProps">
    <SuSwitch 
      rightLabel="Activées"
      v-bind="slotProps"
      v-model="notifications"
    />
  </template>
</SuFormField>

<!-- ✅ BON : Standalone avec aria-label -->
<SuSwitch 
  aria-label="Activer les notifications"
  rightLabel="Activées"
  v-model="notifications"
/>

<!-- ❌ MAUVAIS : Sans label ni contexte -->
<SuSwitch v-model="value" />
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le switch |
| `Espace` | Basculer l'état |
| `Entrée` | Basculer l'état |

## Exemples d'usage avancés

### Validation conditionnelle

```vue
<script setup>
import { ref, computed } from 'vue'

const termsAccepted = ref(false)
const privacyAccepted = ref(false)

const canProceed = computed(() => {
  return termsAccepted.value && privacyAccepted.value
})

const getState = (value) => value ? 'success' : 'error'
const getMessage = (value, success, error) => value ? success : error
</script>

<template>
  <form>
    <h2>Consentements</h2>
    
    <SuFormField 
      label="Conditions d'utilisation"
      :required="true"
      :state="getState(termsAccepted)"
      :message="getMessage(
        termsAccepted,
        'Conditions acceptées',
        'Vous devez accepter les conditions'
      )"
    >
      <template #default="slotProps">
        <SuSwitch 
          rightLabel="J'accepte"
          v-bind="slotProps"
          v-model="termsAccepted"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Politique de confidentialité"
      :required="true"
      :state="getState(privacyAccepted)"
      :message="getMessage(
        privacyAccepted,
        'Politique acceptée',
        'Vous devez accepter la politique'
      )"
    >
      <template #default="slotProps">
        <SuSwitch 
          rightLabel="J'accepte"
          v-bind="slotProps"
          v-model="privacyAccepted"
        />
      </template>
    </SuFormField>
    
    <button :disabled="!canProceed">Continuer</button>
  </form>
</template>
```

## Composant SuSwitchField

Pour une utilisation encore plus simple, vous pouvez utiliser le composant `SuSwitchField` qui combine automatiquement `SuFormField` et `SuSwitch` :

```vue
<template>
  <!-- Au lieu de -->
  <SuFormField label="Notifications" message="Activer les notifications">
    <template #default="slotProps">
      <SuSwitch 
        rightLabel="Activées"
        v-bind="slotProps"
        v-model="notifications"
      />
    </template>
  </SuFormField>
  
  <!-- Vous pouvez simplement écrire -->
  <SuSwitchField 
    label="Notifications"
    rightLabel="Activées"
    message="Activer les notifications"
    v-model="notifications"
  />
</template>
```

Le composant `SuSwitchField` accepte toutes les props de `SuFormField` et `SuSwitch` combinées, offrant une syntaxe plus concise tout en conservant toutes les fonctionnalités.

Voir la [documentation complète de SuSwitchField](./SuSwitchField.md) pour plus de détails.