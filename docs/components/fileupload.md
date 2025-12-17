# FileUpload

Composant FileUpload pour le téléchargement de fichiers avec support du drag & drop, validation des formats et tailles, et accessibilité complète selon les normes W3C.

## Description

`FileUpload` est un composant de téléchargement de fichiers enrichi qui permet de sélectionner des fichiers via un bouton de parcours ou par glisser-déposer. Il offre la validation automatique des formats et tailles, l'affichage des aperçus d'images, la gestion de la progression, et respecte toutes les normes d'accessibilité.

## Exemples d'utilisation

### Utilisation simple (sans SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Upload de base</h4>
    <div class="demo-inputs">
      <SuFileUpload 
        placeholder="Sélectionnez vos fichiers ou glissez-les ici"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <SuFileUpload 
    placeholder="Sélectionnez vos fichiers ou glissez-les ici"
    v-model="files"
  />
</template>
```

### Upload multiple

```vue
<script setup>
import { ref } from 'vue'

const images = ref([])
</script>

<template>
  <SuFileUpload 
    :multiple="true"
    :maxFiles="5"
    accept="image/*"
    placeholder="Sélectionnez jusqu'à 5 images"
    v-model="images"
  />
</template>
```

### Avec validation de taille

```vue
<script setup>
import { ref } from 'vue'

const documents = ref([])
</script>

<template>
  <SuFileUpload 
    :maxSize="10 * 1024 * 1024"
    accept=".pdf,.doc,.docx"
    placeholder="Documents (max 10MB)"
    v-model="documents"
  />
</template>
```

### Tailles

```vue
<template>
  <SuFileUpload 
    size="sm" 
    placeholder="Petit upload"
  />
  
  <SuFileUpload 
    size="md" 
    placeholder="Upload moyen"
  />
  
  <SuFileUpload 
    size="lg" 
    placeholder="Grand upload"
  />
</template>
```

### États

```vue
<template>
  <SuFileUpload 
    placeholder="État par défaut"
  />
  
  <SuFileUpload 
    state="error"
    placeholder="État d'erreur"
  />
  
  <SuFileUpload 
    state="success"
    placeholder="État de succès"
  />
  
  <SuFileUpload 
    state="warning"
    placeholder="État d'avertissement"
  />
</template>
```

### Variantes visuelles

```vue
<template>
  <SuFileUpload 
    variant="default"
    placeholder="Style par défaut"
  />
  
  <SuFileUpload 
    variant="dashed"
    placeholder="Bordures pointillées"
  />
  
  <SuFileUpload 
    variant="solid"
    placeholder="Bordures pleines"
  />
  
  <SuFileUpload 
    variant="minimal"
    placeholder="Style minimaliste"
  />
</template>
```

### Avec progression

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])

const handleFileUpload = (file) => {
  // Simuler un upload avec progression
  file.status = 'uploading'
  file.progress = 0
  
  const interval = setInterval(() => {
    file.progress += 10
    
    if (file.progress >= 100) {
      clearInterval(interval)
      file.status = 'success'
    }
  }, 200)
}
</script>

<template>
  <SuFileUpload 
    :multiple="true"
    :showProgress="true"
    placeholder="Upload avec progression"
    v-model="files"
    @upload="handleFileUpload"
  />
</template>
```

### États spéciaux

```vue
<template>
  <SuFileUpload 
    :disabled="true"
    placeholder="Upload désactivé"
  />
  
  <SuFileUpload 
    :readonly="true"
    placeholder="Lecture seule"
  />
  
  <SuFileUpload 
    :loading="true"
    placeholder="Chargement..."
  />
</template>
```

## Utilisation avec SuFormField

Le composant `SuFileUpload` peut être utilisé avec `SuFormField` pour bénéficier d'une structure de formulaire complète avec label, message et gestion des états.

### Usage basique avec SuFormField

```vue
<template>
  <SuFormField 
    label="Documents" 
    message="Formats acceptés : PDF, DOC, DOCX"
  >
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf,.doc,.docx"
        placeholder="Sélectionnez vos documents"
        v-bind="slotProps"
        v-model="documents"
      />
    </template>
  </SuFormField>
</template>
```

### Avec destructuration des slot props

```vue
<template>
  <SuFormField 
    label="Images"
    :required="true"
    message="Téléchargez vos images"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuFileUpload 
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        :multiple="true"
        accept="image/*"
        placeholder="Glissez vos images ici"
        v-model="images"
      />
    </template>
  </SuFormField>
</template>
```

### Validation avec états

```vue
<script setup>
import { ref, computed } from 'vue'

const cv = ref([])
const cvError = ref('')

const validateCV = () => {
  if (cv.value.length === 0) {
    cvError.value = 'Le CV est obligatoire'
  } else {
    cvError.value = ''
  }
}

const cvState = computed(() => {
  if (cv.value.length === 0) return 'default'
  return cvError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="CV"
    :required="true"
    :state="cvState"
    :message="cvError || 'Format PDF ou Word, maximum 5MB'"
  >
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf,.doc,.docx"
        :maxSize="5 * 1024 * 1024"
        :maxFiles="1"
        placeholder="Téléchargez votre CV"
        v-bind="slotProps"
        v-model="cv"
        @change="validateCV"
      />
    </template>
  </SuFormField>
</template>
```

### Upload multiple avec FormField

```vue
<template>
  <SuFormField 
    label="Portfolio"
    message="Images de vos réalisations (max 10 fichiers)"
  >
    <template #default="slotProps">
      <SuFileUpload 
        :multiple="true"
        :maxFiles="10"
        :maxSize="20 * 1024 * 1024"
        accept="image/*,.pdf"
        placeholder="Glissez vos fichiers ici"
        v-bind="slotProps"
        v-model="portfolio"
      />
    </template>
  </SuFormField>
</template>
```

### Label et message personnalisés

```vue
<script setup>
import { DocumentArrowUpIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Documents justificatifs" 
    :required="true"
    message="Téléchargez vos documents"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <DocumentArrowUpIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf,.jpg,.png"
        :maxSize="10 * 1024 * 1024"
        :multiple="true"
        placeholder="PDF, JPG ou PNG"
        v-bind="slotProps"
        v-model="documents"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Format ou taille invalide</span>
        <span v-else>Maximum 10MB par fichier</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Gestion des erreurs

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const uploadError = ref('')

const handleError = (error, file) => {
  uploadError.value = error
  console.error('Erreur upload:', error, file)
}

const handleUpload = (file) => {
  uploadError.value = ''
  console.log('Fichier ajouté:', file)
}
</script>

<template>
  <SuFormField 
    label="Fichiers"
    :state="uploadError ? 'error' : 'default'"
    :message="uploadError || 'Glissez vos fichiers ou cliquez pour parcourir'"
  >
    <template #default="slotProps">
      <SuFileUpload 
        :multiple="true"
        v-bind="slotProps"
        v-model="files"
        @upload="handleUpload"
        @error="handleError"
      />
    </template>
  </SuFormField>
</template>
```

### Formulaire de candidature

```vue
<script setup>
import { ref } from 'vue'

const formData = ref({
  cv: [],
  lettreMotivation: [],
  portfolio: []
})

const handleCVUpload = (file) => {
  console.log('CV uploadé:', file)
  // Démarrer l'upload vers le serveur
}

const handleError = (error, file) => {
  alert(`Erreur: ${error}`)
}
</script>

<template>
  <form class="application-form">
    <h2>Candidature</h2>
    
    <SuFormField 
      label="CV"
      :required="true"
      message="Format PDF ou Word, maximum 5MB"
    >
      <template #default="slotProps">
        <SuFileUpload 
          accept=".pdf,.doc,.docx"
          :maxSize="5 * 1024 * 1024"
          :maxFiles="1"
          placeholder="Téléchargez votre CV"
          v-bind="slotProps"
          v-model="formData.cv"
          @upload="handleCVUpload"
          @error="handleError"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Lettre de motivation"
      message="Format PDF ou Word, maximum 5MB"
    >
      <template #default="slotProps">
        <SuFileUpload 
          accept=".pdf,.doc,.docx"
          :maxSize="5 * 1024 * 1024"
          :maxFiles="1"
          placeholder="Téléchargez votre lettre"
          v-bind="slotProps"
          v-model="formData.lettreMotivation"
          @error="handleError"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Portfolio"
      message="Images et PDF, max 10 fichiers de 20MB"
    >
      <template #default="slotProps">
        <SuFileUpload 
          accept="image/*,.pdf"
          :maxSize="20 * 1024 * 1024"
          :maxFiles="10"
          :multiple="true"
          placeholder="Vos réalisations"
          v-bind="slotProps"
          v-model="formData.portfolio"
          @error="handleError"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Envoyer</button>
  </form>
</template>
```

### Champ désactivé

```vue
<template>
  <SuFormField 
    label="Upload désactivé"
    :disabled="true"
    message="Cette fonctionnalité est temporairement désactivée"
  >
    <template #default="slotProps">
      <SuFileUpload 
        placeholder="Non disponible"
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
| `modelValue` | `UploadedFile[]` | `[]` | Liste des fichiers (v-model) |
| `multiple` | `boolean` | `false` | Sélection multiple |
| `accept` | `string` | `undefined` | Types MIME ou extensions acceptés |
| `maxSize` | `number` | `10485760` | Taille max par fichier (10MB) |
| `maxFiles` | `number` | `5` | Nombre max de fichiers |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `readonly` | `boolean` | `false` | Mode lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `placeholder` | `string` | `'Sélectionnez...'` | Texte de la zone de drop |
| `dragText` | `string` | `'Relâchez...'` | Texte pendant le drag |
| `browseText` | `string` | `'Parcourir'` | Texte du bouton |
| `variant` | `'default' \| 'dashed' \| 'solid' \| 'minimal'` | `'default'` | Style visuel |
| `showProgress` | `boolean` | `false` | Afficher la progression |
| `allowPreview` | `boolean` | `true` | Aperçus d'images |
| `showFileList` | `boolean` | `true` | Liste des fichiers |
| `loading` | `boolean` | `false` | État de chargement |

### Props d'accessibilité (héritées de SuFormField)

Lorsque utilisé avec `SuFormField`, reçoit automatiquement :

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | ID unique (fieldId) |
| `aria-describedby` | `string` | ID du message (messageId) |
| `state` | `string` | État de validation |
| `disabled` | `boolean` | État désactivé |

### Types

#### UploadedFile
```typescript
interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress?: number
  error?: string
  preview?: string
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(files: UploadedFile[]) => void` | Émis lors du changement (v-model) |
| `@change` | `(files: UploadedFile[]) => void` | Émis lors du changement |
| `@upload` | `(file: UploadedFile) => void` | Émis pour chaque fichier ajouté |
| `@remove` | `(file: UploadedFile) => void` | Émis lors de la suppression |
| `@error` | `(error: string, file?: File) => void` | Émis en cas d'erreur |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus |
| `clear()` | `() => void` | Supprime tous les fichiers |
| `fileInputRef` | `Ref<HTMLInputElement>` | Référence à l'input file |
| `dropZoneRef` | `Ref<HTMLDivElement>` | Référence à la zone de drop |

## Validation des fichiers

Le composant effectue plusieurs validations automatiques :

### 🔍 Types de validation

- **Format** : Vérification contre `accept`
- **Taille** : Vérification contre `maxSize`
- **Nombre** : Vérification contre `maxFiles`
- **Doublons** : Prévention par nom

### 📝 Formats acceptés

```vue
<!-- Extensions -->
<SuFileUpload accept=".jpg,.png,.pdf" />

<!-- MIME types -->
<SuFileUpload accept="image/*,application/pdf" />

<!-- Combinaison -->
<SuFileUpload accept="image/*,.pdf,.doc" />
```

## Accessibilité

Conforme WCAG 2.1 AA et W3C :

### ✅ Fonctionnalités

- **Navigation clavier** : Tab, Entrée, Espace
- **Drag & Drop accessible** : Zone avec rôle button
- **ARIA** : Labels, descriptions, états
- **Annonces vocales** : `aria-live`
- **Focus visible** : Indicateurs clairs
- **Messages d'état** : Feedback visuel/vocal
- **Contraste** : Ratios WCAG AA (4.5:1)
- **Support RTL** : Langues droite-à-gauche

### 🎯 Bonnes pratiques

```vue
<!-- ✅ BON : Avec SuFormField -->
<SuFormField 
  label="Documents"
  :required="true"
  message="PDF ou images, max 10MB"
>
  <template #default="slotProps">
    <SuFileUpload 
      accept=".pdf,image/*"
      :maxSize="10 * 1024 * 1024"
      v-bind="slotProps"
      v-model="docs"
    />
  </template>
</SuFormField>

<!-- ❌ MAUVAIS : Sans label ni contexte -->
<SuFileUpload v-model="files" />
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis |
| `Entrée` / `Espace` | Ouvrir sélecteur |
| `Tab` | Entre fichiers listés |
| `Entrée` / `Espace` | Supprimer fichier |

## Composant SuFileUploadField

Pour plus de simplicité, utilisez `SuFileUploadField` qui combine `SuFormField` et `SuFileUpload` :

```vue
<template>
  <!-- Au lieu de -->
  <SuFormField label="Documents" message="PDF uniquement">
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf"
        v-bind="slotProps"
        v-model="docs"
      />
    </template>
  </SuFormField>
  
  <!-- Simplement écrire -->
  <SuFileUploadField 
    label="Documents"
    message="PDF uniquement"
    accept=".pdf"
    v-model="docs"
  />
</template>
```

Le composant `SuFileUploadField` accepte toutes les props de `SuFormField` et `SuFileUpload` combinées.

Voir la [documentation complète de SuFileUploadField](./SuFileUploadField.md) pour plus de détails.