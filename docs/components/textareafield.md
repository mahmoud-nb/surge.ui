# Textarea Field

Composant **TextareaField** flexible avec compteur de caractères, ajustement automatique de hauteur et conformité aux normes W3C d'accessibilité.

## Exemples d'utilisation

### Textarea de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Textarea simple</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="Description"
        placeholder="Entrez votre description..."
        message="Décrivez votre projet en quelques phrases"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const description = ref('')
</script>

<template>
  <SuTextarea 
    label="Description"
    placeholder="Entrez votre description..."
    message="Décrivez votre projet en quelques phrases"
    v-model="description"
  />
</template>
```

### Avec compteur de caractères

<div class="component-demo">
  <div class="demo-section">
    <h4>Compteur de caractères</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="Commentaire"
        placeholder="Votre commentaire..."
        :maxLength="200"
        :showCounter="true"
        message="Partagez votre avis sur ce produit"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const comment = ref('')
</script>

<template>
  <SuTextarea 
    label="Commentaire"
    placeholder="Votre commentaire..."
    :maxLength="200"
    :showCounter="true"
    message="Partagez votre avis sur ce produit"
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
        label="Message"
        placeholder="Tapez votre message..."
        :autoResize="true"
        :minRows="2"
        :maxRows="8"
        message="La hauteur s'ajuste automatiquement au contenu"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const message = ref('')
</script>

<template>
  <SuTextarea 
    label="Message"
    placeholder="Tapez votre message..."
    :autoResize="true"
    :minRows="2"
    :maxRows="8"
    message="La hauteur s'ajuste automatiquement au contenu"
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
        label="Small"
        placeholder="Petit textarea"
        :rows="2"
      />
      <SuTextarea 
        size="md"
        label="Medium"
        placeholder="Textarea moyen"
        :rows="3"
      />
      <SuTextarea 
        size="lg"
        label="Large"
        placeholder="Grand textarea"
        :rows="4"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea size="sm" label="Small" placeholder="Petit textarea" />
  <SuTextarea size="md" label="Medium" placeholder="Textarea moyen" />
  <SuTextarea size="lg" label="Large" placeholder="Grand textarea" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="État par défaut"
        placeholder="Entrez du texte"
        message="Texte d'aide pour guider l'utilisateur"
      />
      <SuTextarea 
        state="error"
        label="État d'erreur"
        placeholder="Entrez du texte"
        message="Ce champ contient une erreur"
        value="Texte avec erreur"
      />
      <SuTextarea 
        state="success"
        label="État de succès"
        placeholder="Entrez du texte"
        message="Contenu valide !"
        value="Texte validé avec succès"
      />
      <SuTextarea 
        state="warning"
        label="État d'avertissement"
        placeholder="Entrez du texte"
        message="Attention au contenu"
        value="Texte nécessitant attention"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea 
    state="default"
    label="État par défaut"
    message="Texte d'aide pour guider l'utilisateur"
  />
  <SuTextarea 
    state="error"
    label="État d'erreur"
    message="Ce champ contient une erreur"
  />
  <SuTextarea 
    state="success"
    label="État de succès"
    message="Contenu valide !"
  />
  <SuTextarea 
    state="warning"
    label="État d'avertissement"
    message="Attention au contenu"
  />
</template>
```

### Limitation de caractères avec feedback

<div class="component-demo">
  <div class="demo-section">
    <h4>Gestion des limites</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="Tweet"
        placeholder="Que se passe-t-il ?"
        :maxLength="280"
        :showCounter="true"
        :autoResize="true"
        :minRows="2"
        :maxRows="6"
        message="Partagez vos pensées"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const tweet = ref('')
</script>

<template>
  <SuTextarea 
    label="Tweet"
    placeholder="Que se passe-t-il ?"
    :maxLength="280"
    :showCounter="true"
    :autoResize="true"
    :minRows="2"
    :maxRows="6"
    message="Partagez vos pensées"
    v-model:value="tweet"
  />
</template>
```

### États disabled et readonly

<div class="component-demo">
  <div class="demo-section">
    <h4>États spéciaux</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="Textarea désactivé"
        :disabled="true"
        value="Ce contenu est désactivé"
        message="Ce champ est temporairement indisponible"
      />
      <SuTextarea 
        label="Textarea en lecture seule"
        :readonly="true"
        value="Ce contenu ne peut pas être modifié"
        message="Consultation uniquement"
      />
      <SuTextarea 
        label="Champ requis"
        :required="true"
        placeholder="Ce champ est obligatoire"
        message="Veuillez remplir ce champ"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea 
    label="Textarea désactivé"
    :disabled="true"
    value="Ce contenu est désactivé"
    message="Ce champ est temporairement indisponible"
  />
  <SuTextarea 
    label="Textarea en lecture seule"
    :readonly="true"
    value="Ce contenu ne peut pas être modifié"
    message="Consultation uniquement"
  />
  <SuTextarea 
    label="Champ requis"
    :required="true"
    placeholder="Ce champ est obligatoire"
    message="Veuillez remplir ce champ"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du textarea |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel du textarea |
| `disabled` | `boolean` | `false` | Désactive le textarea |
| `readonly` | `boolean` | `false` | Textarea en lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `placeholder` | `string` | `undefined` | Texte de placeholder |
| `v-model` | `string` | `''` | Valeur du textarea |
| `rows` | `number` | `3` | Nombre de lignes par défaut |
| `minRows` | `number` | `2` | Nombre minimum de lignes (auto-resize) |
| `maxRows` | `number` | `10` | Nombre maximum de lignes (auto-resize) |
| `maxLength` | `number` | `undefined` | Nombre maximum de caractères |
| `showCounter` | `boolean` | `false` | Afficher le compteur de caractères |
| `autoResize` | `boolean` | `false` | Ajustement automatique de la hauteur |
| `label` | `string` | `undefined` | Label du textarea |
| `message` | `string` | `undefined` | Message affiché (style déterminé par le state) |
| `spellcheck` | `boolean` | `true` | Vérification orthographique |
| `wrap` | `'soft' \| 'hard' \| 'off'` | `'soft'` | Mode de retour à la ligne |
| `fieldId` | `string` | - | Id du contrôle, relié au label (sinon généré) |
| `requiredText` | `string` | - | Texte de l’astérisque « requis » pour les lecteurs d’écran (sinon traduit) |
| `autocomplete` | `string` | - | Attribut `autocomplete` natif (`email`, `current-password`, `off`…) |

### Attributs d'accessibilité

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Label accessible |
| `ariaDescribedBy` | `string` | `undefined` | ID de l'élément de description |
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
| `select()` | `() => void` | Sélectionne le texte du textarea |
| `textareaRef` | `Ref<HTMLTextAreaElement>` | Référence à l'élément textarea |

## Accessibilité

Le composant Textarea respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Labels associés** : Chaque textarea a un label correctement associé via `for`/`id`
- **Attributs ARIA** : Support complet des attributs ARIA (`aria-label`, `aria-describedby`, `aria-invalid`, etc.)
- **Messages d'état** : Messages d'erreur/succès/avertissement avec `aria-live`
- **Compteur accessible** : Annonces vocales pour les limites de caractères
- **Contraste des couleurs** : Ratios de contraste conformes WCAG AA (4.5:1 minimum)
- **Focus visible** : Indicateur de focus clair et contrasté
- **Tailles minimales** : Respecte les tailles minimales de cible tactile
- **Mode sombre** : Contraste adapté automatiquement
- **Contraste élevé** : Support de `prefers-contrast: high`
- **Réduction d'animation** : Respect de `prefers-reduced-motion`

### 🎯 Bonnes pratiques

```vue
<!-- Textarea avec validation et accessibilité -->
<SuTextarea 
  label="Description du projet"
  :required="true"
  :maxLength="500"
  :showCounter="true"
  :autoResize="true"
  placeholder="Décrivez votre projet..."
  message="Minimum 50 caractères recommandés"
  autocomplete="off"
  v-model="description"
/>

<!-- Textarea avec gestion d'erreur -->
<SuTextarea 
  label="Commentaire"
  :maxLength="1000"
  :showCounter="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Le commentaire ne peut pas être vide' : 'Partagez votre avis'"
  v-model="comment"
/>

<!-- Textarea auto-resize avec limites -->
<SuTextarea 
  label="Message"
  :autoResize="true"
  :minRows="3"
  :maxRows="12"
  :maxLength="2000"
  :showCounter="true"
  placeholder="Rédigez votre message..."
  v-model="message"
/>
```

## Fonctionnalités avancées

### 🔄 Auto-resize intelligent

Le textarea peut ajuster automatiquement sa hauteur selon le contenu :

- **Hauteur minimale** : Définie par `minRows`
- **Hauteur maximale** : Définie par `maxRows`
- **Ajustement fluide** : Transition douce lors du redimensionnement
- **Performance optimisée** : Calcul efficace de la hauteur

### 📊 Compteur de caractères

Le compteur offre un feedback visuel et vocal :

- **Affichage dynamique** : `caractères_saisis/limite_max`
- **États visuels** : Normal, proche de la limite, dépassement
- **Annonces vocales** : Messages pour les lecteurs d'écran
- **Couleurs adaptées** : Vert, orange, rouge selon l'état

### 🎨 États visuels

- **Normal** : Bordure grise, texte noir
- **Proche de la limite** : Compteur orange (≤10% restant)
- **Dépassement** : Bordure et texte rouge, compteur rouge
- **Validation** : Bordures colorées selon l'état (error, success, warning)

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis le textarea |
| `Shift + Tab` | Navigation inverse |
| `Ctrl/Cmd + A` | Sélectionner tout le texte |
| `Ctrl/Cmd + Z` | Annuler la dernière action |
| `Ctrl/Cmd + Y` | Refaire l'action |

## Exemples d'usage avancés

### Formulaire de contact

```vue
<script setup>
import { ref, computed } from 'vue'

const subject = ref('')
const message = ref('')

const isValid = computed(() => {
  return subject.value.length >= 5 && message.value.length >= 20
})

const subjectState = computed(() => {
  if (!subject.value) return 'default'
  return subject.value.length >= 5 ? 'success' : 'error'
})

const messageState = computed(() => {
  if (!message.value) return 'default'
  return message.value.length >= 20 ? 'success' : 'error'
})
</script>

<template>
  <form class="contact-form">
    <h2>Nous contacter</h2>
    
    <SuInput 
      label="Sujet"
      :required="true"
      :state="subjectState"
      :message="subject.length < 5 && subject.length > 0 ? 'Minimum 5 caractères' : undefined"
      placeholder="Sujet de votre message"
      v-model:value="subject"
    />
    
    <SuTextarea 
      label="Message"
      :required="true"
      :maxLength="2000"
      :showCounter="true"
      :autoResize="true"
      :minRows="4"
      :maxRows="12"
      :state="messageState"
      :message="message.length < 20 && message.length > 0 ? 'Minimum 20 caractères' : 'Décrivez votre demande en détail'"
      placeholder="Décrivez votre demande..."
      v-model="message"
    />
    
    <button 
      type="submit" 
      :disabled="!isValid"
      class="submit-button"
    >
      Envoyer le message
    </button>
  </form>
</template>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.submit-button {
  padding: 0.75rem 1.5rem;
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

### Éditeur de texte simple

```vue
<script setup>
import { ref, computed } from 'vue'

const content = ref('')
const wordCount = computed(() => {
  return content.value.trim().split(/\s+/).filter(word => word.length > 0).length
})

const characterCount = computed(() => content.value.length)
const estimatedReadingTime = computed(() => {
  const wordsPerMinute = 200
  return Math.ceil(wordCount.value / wordsPerMinute)
})
</script>

<template>
  <div class="editor">
    <div class="editor-header">
      <h3>Éditeur de texte</h3>
      <div class="editor-stats">
        <span>{{ wordCount }} mots</span>
        <span>{{ characterCount }} caractères</span>
        <span>~{{ estimatedReadingTime }} min de lecture</span>
      </div>
    </div>
    
    <SuTextarea 
      label="Contenu"
      :autoResize="true"
      :minRows="8"
      :maxRows="20"
      :maxLength="5000"
      :showCounter="true"
      placeholder="Commencez à écrire votre article..."
      message="Rédigez votre contenu. L'éditeur s'adapte automatiquement."
      :spellcheck="true"
      v-model:value="content"
    />
  </div>
</template>

<style scoped>
.editor {
  max-width: 800px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.editor-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
```

### Textarea avec validation en temps réel

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const feedback = ref('')
const errors = ref<string[]>([])

const validateContent = (content: string) => {
  const newErrors: string[] = []
  
  if (content.length < 10) {
    newErrors.push('Le message doit contenir au moins 10 caractères')
  }
  
  if (content.length > 500) {
    newErrors.push('Le message ne peut pas dépasser 500 caractères')
  }
  
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length
  if (wordCount < 3) {
    newErrors.push('Le message doit contenir au moins 3 mots')
  }
  
  return newErrors
}

const state = computed(() => {
  if (!feedback.value) return 'default'
  return errors.value.length > 0 ? 'error' : 'success'
})

const message = computed(() => {
  if (errors.value.length > 0) {
    return errors.value[0]
  }
  if (feedback.value && errors.value.length === 0) {
    return 'Message valide !'
  }
  return 'Rédigez votre feedback'
})

watch(feedback, (newValue) => {
  errors.value = validateContent(newValue)
}, { immediate: true })
</script>

<template>
  <div class="feedback-form">
    <h3>Feedback produit</h3>
    
    <SuTextarea 
      label="Votre avis"
      :required="true"
      :maxLength="500"
      :showCounter="true"
      :autoResize="true"
      :minRows="3"
      :maxRows="8"
      :state="state"
      :message="message"
      placeholder="Partagez votre expérience avec ce produit..."
      v-model:value="feedback"
    />
    
    <div class="form-actions">
      <button 
        type="submit" 
        :disabled="errors.length > 0 || !feedback.trim()"
        class="submit-button"
      >
        Envoyer le feedback
      </button>
    </div>
  </div>
</template>

<style scoped>
.feedback-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  padding: 0.75rem 1.5rem;
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