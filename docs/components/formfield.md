# FormField

Composant conteneur pour les champs de formulaire avec gestion du label, des messages d'aide, des états de validation et de l'accessibilité selon les normes W3C.

## Description

`SuFormField` est un composant wrapper qui fournit une structure cohérente pour tous les champs de formulaire. Il gère le label, les messages d'aide, les états de validation (erreur, succès, avertissement) et assure l'accessibilité en associant correctement les labels et les messages aux champs via des props exposées dans le slot par défaut.

## Exemples d'utilisation

### Usage basique

<div class="component-demo">
  <div class="demo-section">
    <h4>Structure simple</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Label de l'élément" 
        message="Texte d'aide pour guider l'utilisateur"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Default slot here
        </div>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Sans slot props explicites -->
  <SuFormField 
    label="Label de l'élément" 
    message="Texte d'aide pour guider l'utilisateur"
  >
    Default slot here
  </SuFormField>

  <!-- Avec récupération des slot props -->
  <SuFormField label="Nom d'utilisateur">
    <template #default="slotProps">
      <FormControlComponent v-bind="slotProps" />
    </template>
  </SuFormField>

  <!-- Avec destructuration des slot props -->
  <SuFormField 
    label="Email" 
    message="Utilisé pour la connexion"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <input 
        :id="fieldId"
        :aria-describedby="messageId"
        :aria-invalid="state === 'error'"
        :disabled="disabled"
        type="email"
      />
    </template>
  </SuFormField>
</template>
```

### Props exposées dans le slot par défaut

Le slot par défaut expose automatiquement les props suivantes pour faciliter l'accessibilité :

```vue
<template>
  <SuFormField label="Champ exemple" message="Message d'aide">
    <template #default="{ fieldId, messageId, state, disabled }">
      <!-- fieldId : ID unique du champ (ex: "field-123") -->
      <!-- messageId : ID du message d'aide (ex: "message-123") -->
      <!-- state : État actuel ('default' | 'error' | 'success' | 'warning') -->
      <!-- disabled : Booléen indiquant si le champ est désactivé -->
      
      <YourComponent 
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
      />
    </template>
  </SuFormField>
</template>
```

### États de validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="État par défaut" 
        message="Texte d'aide pour guider l'utilisateur"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Votre composant
        </div>
      </SuFormField>
      <br />
      <SuFormField 
        state="error"
        label="État d'erreur" 
        message="Ce champ contient une erreur"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Votre composant
        </div>
      </SuFormField>
      <br />
      <SuFormField 
        state="success"
        label="État de succès" 
        message="Valeur valide !"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Votre composant
        </div>
      </SuFormField>
      <br />
      <SuFormField 
        state="warning"
        label="État d'avertissement" 
        message="Attention à cette valeur"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Votre composant
        </div>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="État par défaut" 
    message="Texte d'aide pour guider l'utilisateur"
  >
    <template #default="{ fieldId, messageId }">
      <YourFormControlComponent 
        :id="fieldId"
        :aria-describedby="messageId" 
      />
    </template>
  </SuFormField>
  
  <SuFormField 
    state="error"
    label="État d'erreur" 
    message="Ce champ contient une erreur"
  >
    <template #default="{ fieldId, messageId, state }">
      <YourFormControlComponent 
        :id="fieldId"
        :aria-describedby="messageId"
        :aria-invalid="state === 'error'" 
      />
    </template>
  </SuFormField>
  
  <SuFormField 
    state="success"
    label="État de succès" 
    message="Valeur valide !"
  >
    <template #default="slotProps">
      <YourFormControlComponent 
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
  
  <SuFormField 
    state="warning"
    label="État d'avertissement" 
    message="Attention à cette valeur"
  >
    <YourFormControlComponent 
      state="warning"
    />
  </SuFormField>
</template>
```

### Champ requis

<div class="component-demo">
  <div class="demo-section">
    <h4>Champ obligatoire</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Champ requis"
        :required="true"
        message="Ce champ est obligatoire"
      >
        <SuInput type="text" placeholder="Entrez une valeur" required />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="Champ requis"
    :required="true"
    message="Ce champ est obligatoire"
  >
    <template #default="{ fieldId, messageId }">
      <SuInput 
        :id="fieldId"
        :aria-describedby="messageId"
        :aria-required="true"
        type="text"
        placeholder="Entrez une valeur"
        required
      />
    </template>
  </SuFormField>
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuFormField size="sm" label="Small">
        <input type="text" placeholder="Petit champ" class="input-sm" />
      </SuFormField>
      <SuFormField size="md" label="Medium">
        <input type="text" placeholder="Champ moyen" class="input-md" />
      </SuFormField>
      <SuFormField size="lg" label="Large">
        <input type="text" placeholder="Grand champ" class="input-lg" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField size="sm" label="Small">
    <input type="text" placeholder="Petit champ" />
  </SuFormField>
  
  <SuFormField size="md" label="Medium">
    <input type="text" placeholder="Champ moyen" />
  </SuFormField>
  
  <SuFormField size="lg" label="Large">
    <input type="text" placeholder="Grand champ" />
  </SuFormField>
</template>
```

### Personnalisation avec slots nommés

<div class="component-demo">
  <div class="demo-section">
    <h4>Personnalisation du label et du message</h4>
    <div class="demo-inputs">
      <SuFormField label="Nom d'utilisateur" required message="Entrez votre nom d'utilisateur">
        <template #label="{ label, required, fieldId }">
          <label :for="fieldId" style="display: flex; gap: 0.5rem; align-items: center; font-weight: bold;">
            <UserIcon style="width: 1rem; height: 1rem;" /> 
            {{ label }} 
            <span v-if="required" style="color: red;">*</span>
          </label>
        </template>
        <template #message>
          <div style="font-size: 0.875rem; color: #4a5568;">
            Entrez votre nom d'utilisateur <em>(minimum 4 caractères).</em>
          </div>
        </template>
        <SuInput id="fieldId" type="text" placeholder="Entrez votre nom d'utilisateur" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <!-- Label personnalisé avec icône -->
  <SuFormField 
    label="Nom d'utilisateur" 
    :required="true"
    message="Entrez votre nom d'utilisateur"
  >
    <template #label="{ label, required, fieldId }">
      <label 
        :for="fieldId" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <UserIcon class="w-4 h-4" /> 
        {{ label }} 
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #message>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span>Entrez votre nom d'utilisateur <em>(minimum 4 caractères)</em></span>
      </div>
    </template>
    
    <SuInput id="fieldId" type="text" placeholder="Entrez votre nom d'utilisateur" />
  </SuFormField>

  <!-- Message personnalisé avec état conditionnel -->
  <SuFormField 
    label="Email" 
    :state="emailState"
    message="Message par défaut"
  >
    <template #message="{ state }">
      <div :class="['text-sm', getMessageClass(state)]">
        <span v-if="state === 'error'">⚠️ Format d'email invalide</span>
        <span v-else-if="state === 'success'">✓ Email valide</span>
        <span v-else>Entrez votre adresse email</span>
      </div>
    </template>
    
    <input type="email" placeholder="nom@exemple.com" />
  </SuFormField>
</template>
```

### Champ désactivé

<div class="component-demo">
  <div class="demo-section">
    <h4>Champ désactivé</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Champ désactivé"
        :disabled="true"
        message="Ce champ est désactivé"
      >
        <template #default="{ fieldId, messageId, disabled }">
          <SuInput 
            :id="fieldId"
            :aria-describedby="messageId"
            :disabled="disabled"
            type="text"
            value="Valeur désactivée"
          />
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="Champ désactivé"
    :disabled="true"
    message="Ce champ est désactivé"
  >
    <template #default="{ fieldId, messageId, disabled }">
      <SuInput 
        :id="fieldId"
        :aria-describedby="messageId"
        :disabled="disabled"
        type="text"
        value="Valeur désactivée"
      />
    </template>
  </SuFormField>
</template>
```

### Support RTL (droite à gauche)

<div class="component-demo">
  <div class="demo-section">
    <h4>Support des langues RTL</h4>
    <div class="demo-inputs" dir="rtl">
      <SuFormField 
        label="حقل النص"
        message="رسالة المساعدة"
      >
        <SuInput type="text" placeholder="أدخل النص هنا" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <div dir="rtl">
    <SuFormField 
      label="حقل النص"
      message="رسالة المساعدة"
    >
      <SuInput type="text" placeholder="أدخل النص هنا" />
    </SuFormField>
  </div>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label du champ de formulaire |
| `message` | `string` | `undefined` | Message d'aide ou de validation |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel du champ |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du champ |
| `required` | `boolean` | `false` | Indique si le champ est obligatoire |
| `disabled` | `boolean` | `false` | Désactive le champ |

### Slots

#### Slot par défaut

Le slot par défaut reçoit automatiquement les props suivantes :

| Prop | Type | Description |
|------|------|-------------|
| `fieldId` | `string` | ID unique généré pour le champ |
| `messageId` | `string` | ID unique généré pour le message |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | État actuel du champ |
| `disabled` | `boolean` | Indique si le champ est désactivé |

```vue
<SuFormField label="Exemple">
  <template #default="{ fieldId, messageId, state, disabled }">
    <!-- Votre contrôle de formulaire ici -->
  </template>
</SuFormField>
```

#### Slot label

Permet de personnaliser complètement le rendu du label.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Texte du label |
| `required` | `boolean` | Indique si le champ est requis |
| `fieldId` | `string` | ID du champ associé (même valeur que `fieldId`) |

```vue
<SuFormField label="Mon label" :required="true">
  <template #label="{ label, required, fieldId }">
    <label :for="fieldId">
      {{ label }} <span v-if="required">*</span>
    </label>
  </template>
</SuFormField>
```

#### Slot message

Permet de personnaliser complètement le rendu du message.

| Prop | Type | Description |
|------|------|-------------|
| `message` | `string` | Texte du message |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | État actuel du champ |
| `messageId` | `string` | ID du message (pour aria-describedby) |

```vue
<SuFormField message="Mon message" state="error">
  <template #message="{ message, state, messageId }">
    <div :id="messageId" :class="getMessageClass(state)">
      {{ message }}
    </div>
  </template>
</SuFormField>
```

### Classes CSS générées

Le composant génère automatiquement des IDs et des classes CSS pour faciliter le styling et l'accessibilité :

- `su-form-field` : Classe racine du composant
- `su-form-field--{size}` : Modificateur de taille (`sm`, `md`, `lg`)
- `su-form-field--{state}` : Modificateur d'état (`default`, `error`, `success`, `warning`)
- `su-form-field--required` : Appliqué quand `required` est `true`
- `su-form-field--disabled` : Appliqué quand `disabled` est `true`
- `su-form-field__label` : Classe du label
- `su-form-field__message` : Classe du message
- `su-form-field__content` : Classe du conteneur du contenu

## Accessibilité

Le composant SuFormField respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Association label/champ** : Le label est automatiquement associé au champ via `for`/`id` (fourni via `fieldId`)
- **Messages descriptifs** : Les messages sont liés au champ via `aria-describedby` (fourni via `messageId`)
- **Indicateur de champ requis** : Affichage visuel et sémantique avec `aria-required`
- **États de validation** : Communication claire des états via couleurs, icônes et ARIA
- **Support RTL** : Gestion complète des langues de droite à gauche
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1 minimum)
- **Messages live** : Annonce des changements d'état avec `aria-live="polite"`
- **Focus visible** : Indicateur de focus clair sur le label et le champ

### 🎯 Bonnes pratiques d'utilisation

```vue
<!-- ✅ BON : Utilisation complète des props d'accessibilité -->
<SuFormField 
  label="Adresse email"
  :required="true"
  state="error"
  message="L'email est invalide"
>
  <template #default="{ fieldId, messageId, state }">
    <input 
      :id="fieldId"
      :aria-describedby="messageId"
      :aria-invalid="state === 'error'"
      :aria-required="true"
      type="email"
      autocomplete="email"
    />
  </template>
</SuFormField>

<!-- ❌ MAUVAIS : Ne pas utiliser les props d'accessibilité -->
<SuFormField label="Email" state="error" message="Invalide">
  <input type="email" />
  <!-- Manque: id, aria-describedby, aria-invalid -->
</SuFormField>

<!-- ✅ BON : Label personnalisé avec for correct -->
<SuFormField label="Mot de passe" :required="true">
  <template #label="{ label, required, fieldId }">
    <label :for="fieldId" class="custom-label">
      {{ label }} <span v-if="required">*</span>
    </label>
  </template>
  <template #default="{ fieldId }">
    <input :id="fieldId" type="password" />
  </template>
</SuFormField>
```

## Exemples d'usage avancés

### Validation de formulaire avec états dynamiques

```vue
<script setup>
import { ref, computed } from 'vue'

const username = ref('')
const usernameError = ref('')

const validateUsername = () => {
  if (!username.value) {
    usernameError.value = 'Le nom d\'utilisateur est requis'
  } else if (username.value.length < 4) {
    usernameError.value = 'Minimum 4 caractères'
  } else {
    usernameError.value = ''
  }
}

const usernameState = computed(() => {
  if (!username.value) return 'default'
  return usernameError.value ? 'error' : 'success'
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <SuFormField 
      label="Nom d'utilisateur"
      :required="true"
      :state="usernameState"
      :message="usernameError || 'Minimum 4 caractères'"
    >
      <template #default="{ fieldId, messageId, state }">
        <input 
          :id="fieldId"
          :aria-describedby="messageId"
          :aria-invalid="state === 'error'"
          type="text"
          v-model="username"
          @blur="validateUsername"
        />
      </template>
    </SuFormField>
  </form>
</template>
```

### Formulaire complexe avec plusieurs champs

```vue
<script setup>
import { ref } from 'vue'

const formData = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.email) {
    errors.value.email = 'Email requis'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Email invalide'
  }
  
  if (!formData.value.password) {
    errors.value.password = 'Mot de passe requis'
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'Minimum 8 caractères'
  }
  
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Les mots de passe ne correspondent pas'
  }
  
  return Object.keys(errors.value).length === 0
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <SuFormField 
      label="Email"
      :required="true"
      :state="errors.email ? 'error' : 'default'"
      :message="errors.email || 'Votre adresse email'"
    >
      <template #default="slotProps">
        <input 
          type="email"
          v-model="formData.email"
          v-bind="slotProps"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Mot de passe"
      :required="true"
      :state="errors.password ? 'error' : 'default'"
      :message="errors.password || 'Minimum 8 caractères'"
    >
      <template #default="slotProps">
        <input 
          type="password"
          v-model="formData.password"
          v-bind="slotProps"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Confirmation"
      :required="true"
      :state="errors.confirmPassword ? 'error' : 'default'"
      :message="errors.confirmPassword || 'Confirmez votre mot de passe'"
    >
      <template #default="slotProps">
        <input 
          type="password"
          v-model="formData.confirmPassword"
          v-bind="slotProps"
        />
      </template>
    </SuFormField>
  </form>
</template>
```

### Intégration avec différents types de contrôles

```vue
<template>
  <!-- Input standard -->
  <SuFormField label="Nom">
    <template #default="slotProps">
      <input type="text" v-bind="slotProps" />
    </template>
  </SuFormField>
  
  <!-- Select -->
  <SuFormField label="Pays">
    <template #default="{ fieldId, messageId }">
      <select :id="fieldId" :aria-describedby="messageId">
        <option value="">Sélectionner...</option>
        <option value="fr">France</option>
        <option value="be">Belgique</option>
      </select>
    </template>
  </SuFormField>
  
  <!-- Textarea -->
  <SuFormField label="Description">
    <template #default="{ fieldId, messageId }">
      <textarea 
        :id="fieldId" 
        :aria-describedby="messageId"
        rows="4"
      ></textarea>
    </template>
  </SuFormField>
  
  <!-- Checkbox -->
  <SuFormField label="J'accepte les conditions">
    <template #default="{ fieldId }">
      <input :id="fieldId" type="checkbox" />
    </template>
  </SuFormField>
  
  <!-- Radio group -->
  <SuFormField label="Genre">
    <template #default="{ messageId }">
      <div :aria-describedby="messageId">
        <label><input type="radio" name="gender" value="m" /> Homme</label>
        <label><input type="radio" name="gender" value="f" /> Femme</label>
        <label><input type="radio" name="gender" value="o" /> Autre</label>
      </div>
    </template>
  </SuFormField>
</template>
```

## Intégration avec le design system

Le composant `SuFormField` est conçu pour être utilisé avec tous les contrôles de formulaire de votre design system :

```vue
<template>
  <!-- Avec SuInput -->
  <SuFormField label="Email">
    <template #default="slotProps">
      <SuInput type="email" v-bind="slotProps" />
    </template>
  </SuFormField>
  
  <!-- Avec SuSelect (composant futur) -->
  <SuFormField label="Pays">
    <template #default="slotProps">
      <SuSelect :options="countries" v-bind="slotProps" />
    </template>
  </SuFormField>
  
  <!-- Avec SuTextarea (composant futur) -->
  <SuFormField label="Message">
    <template #default="slotProps">
      <SuTextarea v-bind="slotProps" />
    </template>
  </SuFormField>
</template>
```