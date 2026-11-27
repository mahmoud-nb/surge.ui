# FileUploadField

Composant FileUploadField pour le téléchargement de fichiers avec support du drag & drop, validation des formats et tailles, et accessibilité complète selon les normes W3C.

## Exemples d'utilisation

### FileUploadField de base

<div class="component-demo">
  <div class="demo-section">
    <h4>Upload simple</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        label="Documents"
        placeholder="Sélectionnez vos documents ou glissez-les ici"
        message="Formats acceptés : PDF, DOC, DOCX"
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
  <SuFileUploadField 
    label="Documents"
    placeholder="Sélectionnez vos documents ou glissez-les ici"
    message="Formats acceptés : PDF, DOC, DOCX"
    v-model:value="files"
  />
</template>
```

### Upload multiple avec validation

<div class="component-demo">
  <div class="demo-section">
    <h4>Upload multiple avec restrictions</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        :multiple="true"
        :maxFiles="3"
        :maxSize="5 * 1024 * 1024"
        accept="image/*"
        label="Images"
        placeholder="Sélectionnez jusqu'à 3 images (max 5MB chacune)"
        message="Glissez-déposez vos images ou cliquez pour parcourir"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const images = ref([])
</script>

<template>
  <SuFileUploadField 
    :multiple="true"
    :maxFiles="3"
    :maxSize="5 * 1024 * 1024"
    accept="image/*"
    label="Images"
    placeholder="Sélectionnez jusqu'à 3 images (max 5MB chacune)"
    message="Glissez-déposez vos images ou cliquez pour parcourir"
    v-model:value="images"
  />
</template>
```

### Tailles

<div class="component-demo">
  <div class="demo-section">
    <h4>Tailles disponibles</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        size="sm"
        label="Small"
        placeholder="Petit upload"
      />
      <SuFileUploadField 
        size="md"
        label="Medium"
        placeholder="Upload moyen"
      />
      <SuFileUploadField 
        size="lg"
        label="Large"
        placeholder="Grand upload"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuFileUploadField size="sm" label="Small" placeholder="Petit upload" />
  <SuFileUploadField size="md" label="Medium" placeholder="Upload moyen" />
  <SuFileUploadField size="lg" label="Large" placeholder="Grand upload" />
</template>
```

### États et validation

<div class="component-demo">
  <div class="demo-section">
    <h4>États de validation</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        label="État par défaut"
        placeholder="Sélectionnez des fichiers"
        message="Glissez-déposez ou cliquez pour parcourir"
      />
      <SuFileUploadField 
        state="error"
        label="État d'erreur"
        placeholder="Fichiers non valides"
        message="Erreur : format de fichier non supporté"
      />
      <SuFileUploadField 
        state="success"
        label="État de succès"
        placeholder="Fichiers téléchargés"
        message="Tous les fichiers ont été téléchargés avec succès"
      />
      <SuFileUploadField 
        state="warning"
        label="État d'avertissement"
        placeholder="Attention aux fichiers"
        message="Certains fichiers dépassent la taille recommandée"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuFileUploadField 
    state="default"
    label="État par défaut"
    message="Glissez-déposez ou cliquez pour parcourir"
  />
  <SuFileUploadField 
    state="error"
    label="État d'erreur"
    message="Erreur : format de fichier non supporté"
  />
  <SuFileUploadField 
    state="success"
    label="État de succès"
    message="Tous les fichiers ont été téléchargés avec succès"
  />
  <SuFileUploadField 
    state="warning"
    label="État d'avertissement"
    message="Certains fichiers dépassent la taille recommandée"
  />
</template>
```

### Types de fichiers spécifiques

<div class="component-demo">
  <div class="demo-section">
    <h4>Restrictions par type de fichier</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        accept="image/jpeg,image/png,image/gif"
        label="Images uniquement"
        placeholder="JPG, PNG, GIF seulement"
        message="Formats acceptés : JPEG, PNG, GIF"
      />
      <SuFileUploadField 
        accept=".pdf,.doc,.docx"
        label="Documents"
        placeholder="PDF et documents Word"
        message="Formats acceptés : PDF, DOC, DOCX"
      />
      <SuFileUploadField 
        accept="video/*"
        :maxSize="50 * 1024 * 1024"
        label="Vidéos"
        placeholder="Tous formats vidéo (max 50MB)"
        message="Tous les formats vidéo sont acceptés"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- Images uniquement -->
  <SuFileUploadField 
    accept="image/jpeg,image/png,image/gif"
    label="Images uniquement"
    placeholder="JPG, PNG, GIF seulement"
    message="Formats acceptés : JPEG, PNG, GIF"
  />
  
  <!-- Documents -->
  <SuFileUploadField 
    accept=".pdf,.doc,.docx"
    label="Documents"
    placeholder="PDF et documents Word"
    message="Formats acceptés : PDF, DOC, DOCX"
  />
  
  <!-- Vidéos -->
  <SuFileUploadField 
    accept="video/*"
    :maxSize="50 * 1024 * 1024"
    label="Vidéos"
    placeholder="Tous formats vidéo (max 50MB)"
    message="Tous les formats vidéo sont acceptés"
  />
</template>
```

### Variantes

<div class="component-demo">
  <div class="demo-section">
    <h4>Variantes visuelles</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        variant="default"
        label="Default"
        placeholder="Style par défaut"
      />
      <SuFileUploadField 
        variant="dashed"
        label="Dashed"
        placeholder="Style avec bordures pointillées"
      />
      <SuFileUploadField 
        variant="solid"
        label="Solid"
        placeholder="Style avec bordures pleines"
      />
      <SuFileUploadField 
        variant="minimal"
        label="Minimal"
        placeholder="Style minimaliste"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuFileUploadField variant="default" label="Default" />
  <SuFileUploadField variant="dashed" label="Dashed" />
  <SuFileUploadField variant="solid" label="Solid" />
  <SuFileUploadField variant="minimal" label="Minimal" />
</template>
```

### Avec progression

<div class="component-demo">
  <div class="demo-section">
    <h4>Upload avec barre de progression</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        label="Upload avec progression"
        placeholder="Téléchargez vos fichiers"
        message="La progression sera affichée pour chaque fichier"
        :multiple="true"
        :showProgress="true"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuFileUploadField 
    label="Upload avec progression"
    :multiple="true"
    :showProgress="true"
    message="Progression affichée pour chaque fichier"
  />
</template>
```

### État de chargement

<div class="component-demo">
  <div class="demo-section">
    <h4>Upload en chargement</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        label="Upload en chargement"
        placeholder="Chargement en cours..."
        :loading="true"
        message="Préparation de l'upload"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuFileUploadField 
    label="Upload en chargement"
    :loading="true"
    message="Préparation de l'upload"
  />
</template>
```

### États disabled et readonly

<div class="component-demo">
  <div class="demo-section">
    <h4>États spéciaux</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        label="Upload désactivé"
        :disabled="true"
        placeholder="Upload non disponible"
        message="Cette fonctionnalité est temporairement désactivée"
      />
      <SuFileUploadField 
        label="Upload en lecture seule"
        :readonly="true"
        placeholder="Consultation uniquement"
        message="Vous pouvez voir les fichiers mais pas en ajouter"
      />
      <SuFileUploadField 
        label="Upload requis"
        :required="true"
        placeholder="Fichiers obligatoires"
        message="Au moins un fichier doit être téléchargé"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuFileUploadField 
    label="Upload désactivé"
    :disabled="true"
    message="Cette fonctionnalité est temporairement désactivée"
  />
  <SuFileUploadField 
    label="Upload en lecture seule"
    :readonly="true"
    message="Vous pouvez voir les fichiers mais pas en ajouter"
  />
  <SuFileUploadField 
    label="Upload requis"
    :required="true"
    message="Au moins un fichier doit être téléchargé"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `UploadedFile[]` | `[]` | Liste des fichiers téléchargés |
| `multiple` | `boolean` | `false` | Autoriser la sélection multiple |
| `accept` | `string` | `undefined` | Types de fichiers acceptés (MIME types ou extensions) |
| `maxSize` | `number` | `10485760` | Taille maximale par fichier en octets (10MB par défaut) |
| `maxFiles` | `number` | `5` | Nombre maximum de fichiers |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | État visuel |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `readonly` | `boolean` | `false` | Mode lecture seule |
| `required` | `boolean` | `false` | Champ requis |
| `label` | `string` | `undefined` | Label du composant |
| `message` | `string` | `undefined` | Message affiché (style déterminé par le state) |
| `placeholder` | `string` | `'Sélectionnez des fichiers...'` | Texte affiché dans la zone de drop |
| `dragText` | `string` | `'Relâchez pour déposer...'` | Texte affiché pendant le drag |
| `browseText` | `string` | `'Parcourir'` | Texte du bouton de parcours |
| `allowPreview` | `boolean` | `true` | Afficher les aperçus d'images |
| `showFileList` | `boolean` | `true` | Afficher la liste des fichiers |
| `variant` | `'default' \| 'solid' \| 'dashed' \| 'minimal'` | `'default'` | Style de la zone de dépôt |
| `loading` | `boolean` | `false` | Chargement en cours |
| `loadingText` | `string` | - | Titre de la zone pendant le chargement (sinon traduit) |
| `loadingSubText` | `string` | - | Sous-titre de la zone pendant le chargement (sinon traduit) |
| `showProgress` | `boolean` | `false` | Affiche la progression de chaque fichier |

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
| `@update:value` | `(files: UploadedFile[]) => void` | Émis lors du changement de la liste |
| `@change` | `(files: UploadedFile[]) => void` | Émis lors du changement |
| `@upload` | `(file: UploadedFile) => void` | Émis pour chaque fichier ajouté |
| `@remove` | `(file: UploadedFile) => void` | Émis lors de la suppression d'un fichier |
| `@error` | `(error: string, file?: File) => void` | Émis en cas d'erreur de validation |
| `@focus` | `(event: FocusEvent) => void` | Émis lors du focus |
| `@blur` | `(event: FocusEvent) => void` | Émis lors de la perte de focus |

### Méthodes exposées

| Méthode | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Donne le focus au composant |
| `clear()` | `() => void` | Supprime tous les fichiers |
| `fileInputRef` | `Ref<HTMLInputElement>` | Référence à l'input file |
| `dropZoneRef` | `Ref<HTMLDivElement>` | Référence à la zone de drop |

## Accessibilité

Le composant FileUpload respecte les normes WCAG 2.1 AA :

### ✅ Fonctionnalités d'accessibilité

- **Navigation au clavier** : Support complet Tab, Entrée, Espace
- **Drag & Drop accessible** : Zone de drop avec rôle button et aria-label
- **Attributs ARIA** : Labels, descriptions, états invalides
- **Annonces vocales** : Messages pour les lecteurs d'écran avec aria-live
- **Focus visible** : Indicateurs de focus clairs et contrastés
- **Labels associés** : Chaque élément a un label approprié
- **Messages d'état** : Feedback visuel et vocal pour les erreurs/succès
- **Contraste des couleurs** : Ratios conformes WCAG AA
- **Tailles minimales** : Boutons de 44px minimum
- **Support RTL** : Compatible avec les langues de droite à gauche

### 🎯 Bonnes pratiques

```vue
<!-- Upload avec validation complète -->
<SuFileUploadField 
  :multiple="true"
  :maxFiles="5"
  :maxSize="10 * 1024 * 1024"
  accept="image/*,.pdf"
  :required="true"
  label="Documents justificatifs"
  placeholder="Glissez vos documents ici ou cliquez pour parcourir"
  message="Images et PDF acceptés, maximum 5 fichiers de 10MB chacun"
  ariaLabel="Zone de téléchargement pour documents justificatifs"
  v-model:value="documents"
  @error="handleUploadError"
  @upload="handleFileUpload"
/>

<!-- Gestion des erreurs -->
<script setup>
const handleUploadError = (error, file) => {
  console.error('Erreur upload:', error, file)
  // Afficher une notification d'erreur
}

const handleFileUpload = (file) => {
  console.log('Fichier ajouté:', file)
  // Démarrer l'upload vers le serveur
}
</script>
```

## Navigation au clavier

| Touche | Action |
|--------|--------|
| `Tab` | Naviguer vers/depuis la zone de drop |
| `Entrée` / `Espace` | Ouvrir le sélecteur de fichiers |
| `Tab` | Naviguer entre les fichiers de la liste |
| `Entrée` / `Espace` | Supprimer un fichier (sur le bouton de suppression) |

## Validation des fichiers

Le composant effectue plusieurs validations automatiques :

### 🔍 Types de validation

- **Format de fichier** : Vérification contre la prop `accept`
- **Taille de fichier** : Vérification contre `maxSize`
- **Nombre de fichiers** : Vérification contre `maxFiles`
- **Fichiers en double** : Prévention des doublons par nom

### 📝 Formats acceptés

```vue
<!-- Extensions spécifiques -->
<SuFileUploadField accept=".jpg,.png,.pdf" />

<!-- Types MIME -->
<SuFileUploadField accept="image/*,application/pdf" />

<!-- Combinaison -->
<SuFileUploadField accept="image/*,.pdf,.doc,.docx" />
```

## Exemples d'usage avancés

### Formulaire de candidature

```vue
<script setup>
import { ref } from 'vue'

const cv = ref([])
const lettreMotivation = ref([])
const portfolio = ref([])

const handleCVUpload = (file) => {
  // Traitement spécifique pour le CV
  console.log('CV uploadé:', file)
}

const handleError = (error, file) => {
  // Gestion globale des erreurs
  alert(`Erreur: ${error}`)
}
</script>

<template>
  <form class="application-form">
    <h2>Candidature</h2>
    
    <SuFileUploadField 
      label="CV (obligatoire)"
      accept=".pdf,.doc,.docx"
      :maxSize="5 * 1024 * 1024"
      :maxFiles="1"
      :required="true"
      placeholder="Téléchargez votre CV"
      message="Format PDF ou Word, maximum 5MB"
      v-model:value="cv"
      @upload="handleCVUpload"
      @error="handleError"
    />
    
    <SuFileUploadField 
      label="Lettre de motivation"
      accept=".pdf,.doc,.docx"
      :maxSize="5 * 1024 * 1024"
      :maxFiles="1"
      placeholder="Téléchargez votre lettre de motivation"
      message="Format PDF ou Word, maximum 5MB"
      v-model:value="lettreMotivation"
      @error="handleError"
    />
    
    <SuFileUploadField 
      label="Portfolio (optionnel)"
      accept="image/*,.pdf"
      :maxSize="20 * 1024 * 1024"
      :maxFiles="10"
      :multiple="true"
      placeholder="Images de vos réalisations ou PDF"
      message="Images et PDF acceptés, maximum 10 fichiers de 20MB chacun"
      v-model:value="portfolio"
      @error="handleError"
    />
  </form>
</template>
```

### Upload avec progression

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])

const simulateUpload = async (file) => {
  // Simuler un upload avec progression
  file.status = 'uploading'
  file.progress = 0
  
  const interval = setInterval(() => {
    file.progress += 10
    
    if (file.progress >= 100) {
      clearInterval(interval)
      file.status = 'success'
      file.progress = undefined
    }
  }, 200)
}

const handleFileUpload = (file) => {
  simulateUpload(file)
}
</script>

<template>
  <SuFileUploadField 
    :multiple="true"
    label="Upload avec progression"
    placeholder="Téléchargez vos fichiers"
    message="La progression sera affichée pour chaque fichier"
    v-model:value="files"
    @upload="handleFileUpload"
  />
</template>
```