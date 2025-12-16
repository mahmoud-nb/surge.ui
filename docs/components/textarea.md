# Textarea

Composant **Textarea** flexible avec compteur de caractères, ajustement automatique de hauteur et conformité aux normes W3C d'accessibilité.

## Description

`SuTextarea` est un composant de zone de texte enrichi qui étend les capacités d'un élément `<textarea>` natif. Il offre des fonctionnalités avancées telles que le compteur de caractères, l'ajustement automatique de la hauteur, et une gestion complète de l'accessibilité.

## Exemples d'utilisation

### Utilisation simple (sans SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Textarea de base</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="Entrez votre texte..."
        :rows="4"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <SuTextarea 
    placeholder="Entrez votre texte..."
    :rows="4"
    v-model="text"
  />
</template>
```

### Avec compteur de caractères

<div class="component-demo">
  <div class="demo-section">
    <h4>Compteur de caractères</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="Votre commentaire..."
        :maxLength="200"
        :showCounter="true"
        :rows="3"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const comment = ref('')
</script>

<template>
  <SuTextarea 
    placeholder="Votre commentaire..."
    :maxLength="200"
    :showCounter="true"
    :rows="3"
    v-model="comment"
  />
</template>
```

### Ajustement automatique de hauteur

<div class="component-demo">
  <div class="demo-section">
    <h4>Auto-resize</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="Tapez votre message..."
        :autoResize="true"
        :minRows="2"
        :maxRows="8"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <SuTextarea 
    placeholder="Tapez votre message..."
    :autoResize="true"
    :minRows="2"
    :maxRows="8"
    v-model="message"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuTextarea 
        size="sm"
        placeholder="Petit textarea"
        :rows="2"
      />
      <SuTextarea 
        size="md"
        placeholder="Textarea moyen"
        :rows="3"
      />
      <SuTextarea 
        size="lg"
        placeholder="Grand textarea"
        :rows="4"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea 
    size="sm" 
    placeholder="Petit textarea" 
    :rows="2"
  />
  
  <SuTextarea 
    size="md" 
    placeholder="Textarea moyen" 
    :rows="3"
  />
  
  <SuTextarea 
    size="lg" 
    placeholder="Grand textarea" 
    :rows="4"
  />
</template>
```

### États

<div class="component-demo">
  <div class="demo-section">
    <h4>États visuels</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="État par défaut"
        :rows="2"
      />
      <SuTextarea 
        state="error"
        value="Texte avec erreur"
        :rows="2"
      />
      <SuTextarea 
        state="success"
        value="Texte validé"
        :rows="2"
      />
      <SuTextarea 
        state="warning"
        value="Texte avec avertissement"
        :rows="2"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea 
    placeholder="État par défaut"
  />
  
  <SuTextarea 
    state="error"
    value="Texte avec erreur"
  />
  
  <SuTextarea 
    state="success"
    value="Texte validé"
  />
  
  <SuTextarea 
    state="warning"
    value="Texte avec avertissement"
  />
</template>
```

## Utilisation avec SuFormField

Le composant `SuTextarea` peut être utilisé avec `SuFormField` pour bénéficier d'une structure de formulaire complète avec label, message et gestion des états.

### Usage basique avec SuFormField

```vue
<template>
  <SuFormField 
    label="Description" 
    message="Décrivez votre projet en quelques phrases"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Entrez votre description..."
        :rows="4"
        v-bind="slotProps"
        v-model="description"
      />
    </template>
  </SuFormField>
</template>
```

### Avec destructuration des slot props

```vue
<template>
  <SuFormField 
    label="Commentaire"
    :required="true"
    message="Partagez votre avis"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuTextarea 
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        placeholder="Votre commentaire..."
        :rows="3"
        v-model="comment"
      />
    </template>
  </SuFormField>
</template>
```

### Validation avec états

<div class="component-demo">
  <div class="demo-section">
    <h4>Textarea avec validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Message"
        :required="true"
        state="error"
        message="Le message doit contenir au moins 10 caractères"
      >
        <template #default="slotProps">
          <SuTextarea 
            placeholder="Tapez votre message..."
            :rows="3"
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

const message = ref('')
const messageError = ref('')

const validateMessage = () => {
  if (!message.value) {
    messageError.value = 'Le message est requis'
  } else if (message.value.length < 10) {
    messageError.value = 'Le message doit contenir au moins 10 caractères'
  } else {
    messageError.value = ''
  }
}

const messageState = computed(() => {
  if (!message.value) return 'default'
  return messageError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="Message"
    :required="true"
    :state="messageState"
    :message="messageError || 'Rédigez votre message'"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Tapez votre message..."
        :rows="3"
        v-bind="slotProps"
        v-model="message"
        @blur="validateMessage"
      />
    </template>
  </SuFormField>
</template>
```

### Avec compteur de caractères et FormField

```vue
<template>
  <SuFormField 
    label="Tweet"
    message="Partagez vos pensées"
    :required="true"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Que se passe-t-il ?"
        :maxLength="280"
        :showCounter="true"
        :autoResize="true"
        :minRows="2"
        :maxRows="6"
        v-bind="slotProps"
        v-model="tweet"
      />
    </template>
  </SuFormField>
</template>
```

### Auto-resize avec FormField

```vue
<template>
  <SuFormField 
    label="Description du projet"
    message="La hauteur s'ajuste automatiquement au contenu"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Décrivez votre projet..."
        :autoResize="true"
        :minRows="3"
        :maxRows="12"
        v-bind="slotProps"
        v-model="projectDescription"
      />
    </template>
  </SuFormField>
</template>
```

### Label et message personnalisés

```vue
<script setup>
import { DocumentTextIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Contenu" 
    :required="true"
    message="Rédigez votre article"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <DocumentTextIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Commencez à écrire..."
        :autoResize="true"
        :minRows="4"
        :maxRows="12"
        :maxLength="5000"
        :showCounter="true"
        v-bind="slotProps"
        v-model="content"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Le contenu est trop court</span>
        <span v-else>Rédigez votre article (minimum 100 caractères)</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Limitation de caractères avec feedback

```vue
<script setup>
import { ref, computed } from 'vue'

const feedback = ref('')

const remainingChars = computed(() => 500 - feedback.value.length)
const feedbackState = computed(() => {
  if (!feedback.value) return 'default'
  if (feedback.value.length < 10) return 'error'
  if (feedback.value.length > 500) return 'error'
  return 'success'
})
</script>

<template>
  <SuFormField 
    label="Feedback produit"
    :required="true"
    :state="feedbackState"
    :message="remainingChars < 0 ? 'Limite dépassée' : `${remainingChars} caractères restants`"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Partagez votre expérience..."
        :maxLength="500"
        :showCounter="true"
        :autoResize="true"
        :minRows="3"
        :maxRows="8"
        v-bind="slotProps"
        v-model="feedback"
      />
    </template>
  </SuFormField>
</template>
```

### Champ désactivé ou en lecture seule

```vue
<template>
  <!-- Désactivé -->
  <SuFormField 
    label="Textarea désactivé"
    :disabled="true"
    message="Ce champ est temporairement indisponible"
  >
    <template #default="slotProps">
      <SuTextarea 
        value="Ce contenu est désactivé"
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
  
  <!-- Lecture seule -->
  <SuFormField 
    label="Textarea en lecture seule"
    message="Consultation uniquement"
  >
    <template #default="{ fieldId, messageId }">
      <SuTextarea 
        :id="fieldId"
        :aria-describedby="messageId"
        :readonly="true"
        value="Ce contenu ne peut pas être modifié"
      />
    </template>
  </SuFormField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | Valeur du textarea (v-model) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du textarea |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le textarea |
| `readonly` | `boolean` | `false` | Textarea en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `placeholder` | `string` | `undefined` | Texte de placeholder |
| `rows` | `number` | `3` | Nombre de lignes par défaut |
| `minRows` | `number` | `2` | Nombre minimum de lignes (auto-resize) |
| `maxRows` | `number` | `10` | Nombre maximum de lignes (auto-resize) |
| `maxLength` | `number` | `undefined` | Nombre maximum de caractères |
| `showCounter` | `boolean` | `false` | Afficher le compteur |
| `autoResize` | `boolean` | `false` | Ajustement automatique de hauteur |
| `spellcheck` | `boolean` | `true` | Vérification orthographique |
| `wrap` | `'soft' \| 'hard' \| 'off'` | `'soft'` | Mode de retour à la ligne |

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
| `ariaInvalid` | `boolean` | `undefined` | Indique si la valeur est invalide |
| `ariaRequired` | `boolean` | `undefined` | Indique si le champ est requis |
| `autocomplete` | `string` | `undefined` | Attribut autocomplete HTML |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: string) => void` | Émis lors du changement de valeur (v-model) |
| `@input` | `(event: Event) => void` | Émis lors de la saisie |
| `@change` | `(event: Event) => void` | Émis lors du changement |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |
| `@keydown` | `(event: KeyboardEvent) => void` | Émis lors de l'appui sur une touche |
| `@keyup` | `(event: KeyboardEvent) => void` | Émis lors du relâchement d'une touche |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus au textarea |
| `select()` | `() => void` | Sélectionne le texte |
| `blur()` | `() => void` | Retire le focus |
| `textareaRef` | `Ref<HTMLTextAreaElement>` | Référence à l'élément textarea natif |

## Accessibilité

Le composant Textarea respecte les normes WCAG 2.1 AA et les bonnes pratiques W3C :

### ✅ Fonctionnalités d'accessibilité

- **Attributs ARIA** : Support complet (`aria-label`, `aria-describedby`, `aria-invalid`, etc.)
- **Compteur accessible** : Annonces vocales pour les limites de caractères
- **Messages d'état** : Via aria-describedby (messageId) avec `aria-live`
- **Contraste des couleurs** : Ratios conformes WCAG AA (4.5:1)
- **Focus visible** : Indicateur de focus clair avec outline
- **Tailles minimales** : Cible tactile respectée
- **Mode sombre** : Contraste adapté
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques d'utilisation

```vue
<!-- ✅ BON : Utilisation avec SuFormField pour l'accessibilité complète -->
<SuFormField 
  label="Description"
  :required="true"
  :state="descriptionError ? 'error' : 'default'"
  :message="descriptionError || 'Minimum 50 caractères'"
>
  <template #default="slotProps">
    <SuTextarea 
      placeholder="Décrivez votre projet..."
      :maxLength="500"
      :showCounter="true"
      :autoResize="true"
      v-bind="slotProps"
      v-model="description"
    />
  </template>
</SuFormField>

<!-- ✅ BON : Utilisation standalone avec attributs ARIA manuels -->
<label for="comment-textarea">Commentaire</label>
<SuTextarea 
  id="comment-textarea"
  aria-describedby="comment-help"
  aria-required="true"
  placeholder="Votre commentaire..."
  v-model="comment"
/>
<span id="comment-help">Partagez votre avis (minimum 10 caractères)</span>

<!-- ❌ MAUVAIS : Sans label ni description -->
<SuTextarea 
  placeholder="Texte..."
  v-model="text"
/>
```

## Fonctionnalités avancées

### 🔄 Auto-resize intelligent

Le textarea ajuste automatiquement sa hauteur selon le contenu :

- **Hauteur minimale** : Définie par `minRows`
- **Hauteur maximale** : Définie par `maxRows`
- **Ajustement fluide** : Transition douce
- **Performance optimisée** : Calcul efficace

### 📊 Compteur de caractères

Le compteur offre un feedback visuel et vocal :

- **Affichage dynamique** : `caractères_saisis/limite_max`
- **États visuels** : Normal, proche limite, dépassement
- **Annonces vocales** : Messages pour lecteurs d'écran
- **Couleurs adaptées** : Vert, orange, rouge selon l'état

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le textarea |
| `Shift + Tab` | Navigation inverse |
| `Ctrl/Cmd + A` | Sélectionner tout le texte |
| `Ctrl/Cmd + Z` | Annuler |
| `Ctrl/Cmd + Y` | Refaire |

## Exemples d'usage avancés

### Formulaire de contact complet

```vue
<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  subject: '',
  message: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.subject || formData.value.subject.length < 5) {
    errors.value.subject = 'Minimum 5 caractères'
  }
  
  if (!formData.value.message || formData.value.message.length < 20) {
    errors.value.message = 'Minimum 20 caractères'
  }
  
  return Object.keys(errors.value).length === 0
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <h2>Nous contacter</h2>
    
    <SuFormField 
      label="Sujet"
      :required="true"
      :state="errors.subject ? 'error' : 'default'"
      :message="errors.subject || 'Sujet de votre message'"
    >
      <template #default="slotProps">
        <SuInput 
          placeholder="Sujet..."
          v-bind="slotProps"
          v-model="formData.subject"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Message"
      :required="true"
      :state="errors.message ? 'error' : 'default'"
      :message="errors.message || 'Décrivez votre demande en détail'"
    >
      <template #default="slotProps">
        <SuTextarea 
          placeholder="Votre message..."
          :maxLength="2000"
          :showCounter="true"
          :autoResize="true"
          :minRows="4"
          :maxRows="12"
          v-bind="slotProps"
          v-model="formData.message"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Envoyer</button>
  </form>
</template>
```

### Éditeur avec statistiques

```vue
<script setup>
import { ref, computed } from 'vue'

const content = ref('')

const stats = computed(() => ({
  words: content.value.trim().split(/\s+/).filter(w => w.length > 0).length,
  chars: content.value.length,
  readTime: Math.ceil(content.value.trim().split(/\s+/).filter(w => w.length > 0).length / 200)
}))
</script>

<template>
  <div class="editor">
    <div class="stats">
      <span>{{ stats.words }} mots</span>
      <span>{{ stats.chars }} caractères</span>
      <span>~{{ stats.readTime }} min</span>
    </div>
    
    <SuFormField 
      label="Contenu"
      message="Rédigez votre article"
    >
      <template #default="slotProps">
        <SuTextarea 
          placeholder="Commencez à écrire..."
          :autoResize="true"
          :minRows="8"
          :maxRows="20"
          :maxLength="5000"
          :showCounter="true"
          v-bind="slotProps"
          v-model="content"
        />
      </template>
    </SuFormField>
  </div>
</template>
```

## Composant SuTextareaField

Pour une utilisation encore plus simple, vous pouvez utiliser le composant `SuTextareaField` qui combine automatiquement `SuFormField` et `SuTextarea` :

```vue
<template>
  <!-- Au lieu de -->
  <SuFormField label="Description" message="Décrivez votre projet">
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Entrez votre description..."
        v-bind="slotProps"
        v-model="description"
      />
    </template>
  </SuFormField>
  
  <!-- Vous pouvez simplement écrire -->
  <SuTextareaField 
    label="Description"
    message="Décrivez votre projet"
    placeholder="Entrez votre description..."
    v-model="description"
  />
</template>
```

Le composant `SuTextareaField` accepte toutes les props de `SuFormField` et `SuTextarea` combinées, offrant une syntaxe plus concise tout en conservant toutes les fonctionnalités.

Voir la [documentation complète de SuTextareaField](./SuTextareaField.md) pour plus de détails.