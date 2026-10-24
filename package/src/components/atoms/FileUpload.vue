<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { CloudArrowUpIcon, DocumentIcon, PhotoIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import type { BaseFileUploadProps, UploadedFile } from '@/types'
import { announceToScreenReader } from '@/utils/accessibility'

const props = withDefaults(defineProps<BaseFileUploadProps>(), {
  multiple: false,
  variant: 'default',
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  placeholder: 'Sélectionnez des fichiers ou glissez-les ici',
  dragText: 'Relâchez pour déposer les fichiers',
  browseText: 'Parcourir',
  loadingText: 'Chargement...',
  loadingSubText: 'Veuillez patienter',
  allowPreview: true,
  showFileList: true,
  showProgress: false,
  loading: false
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<UploadedFile[]>({ default: () => [] })

const emit = defineEmits<{
  change: [files: UploadedFile[]]
  upload: [file: UploadedFile]
  remove: [file: UploadedFile]
  error: [error: string, file?: File]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

// Refs
const fileInputRef = ref<HTMLInputElement>()
const dropZoneRef = ref<HTMLDivElement>()
const isDragging = ref(false)
const dragCounter = ref(0)

// IDs pour l'accessibilité
const uploadId = computed(() => attrs.id as string || undefined)

// Valeur normalisée
const uploadedFiles = computed(() => Array.isArray(modelValue.value) ? modelValue.value : [])

// Classes CSS
const containerClasses = computed(() => [
  'su-file-upload-container',
  `su-file-upload-container--${props.variant}`,
  `su-file-upload-container--${props.size}`,
  `su-file-upload-container--${props.state}`,
  {
    'su-file-upload-container--disabled': props.disabled,
    'su-file-upload-container--readonly': props.readonly,
    'su-file-upload-container--dragging': isDragging.value,
    'su-file-upload-container--has-files': uploadedFiles.value.length > 0
  }
])

const dropZoneClasses = computed(() => [
  'su-file-upload-dropzone',
  `su-file-upload-dropzone--${props.variant}`,
  `su-file-upload-dropzone--${props.size}`,
  `su-file-upload-dropzone--${props.state}`,
  {
    'su-file-upload-dropzone--disabled': props.disabled,
    'su-file-upload-dropzone--readonly': props.readonly,
    'su-file-upload-dropzone--dragging': isDragging.value
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) {
    const describedBy = [props.ariaDescribedBy].filter(Boolean).join(' ')
    attrs['aria-describedby'] = describedBy
  }
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined) attrs['aria-required'] = props.ariaRequired
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
})

// Utilitaires
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return PhotoIcon
  return DocumentIcon
}

const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    if (!isImageFile(file)) {
      resolve('')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string || '')
    reader.readAsDataURL(file)
  })
}

// Validation des fichiers
const validateFile = (file: File): string | null => {
  // Vérifier la taille
  if (props.maxSize && file.size > props.maxSize) {
    return `Le fichier "${file.name}" est trop volumineux (${formatFileSize(file.size)}). Taille maximale : ${formatFileSize(props.maxSize)}`
  }
  
  // Vérifier le type
  if (props.accept) {
    const acceptedTypes = props.accept.split(',').map(type => type.trim())
    const isAccepted = acceptedTypes.some(acceptedType => {
      if (acceptedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
      }
      if (acceptedType.includes('*')) {
        const baseType = acceptedType.split('/')[0]
        return file.type.startsWith(baseType)
      }
      return file.type === acceptedType
    })
    
    if (!isAccepted) {
      return `Le type de fichier "${file.type}" n'est pas accepté pour "${file.name}"`
    }
  }
  
  return null
}

// Gestion des fichiers
const processFiles = async (files: FileList | File[]) => {
  if (props.disabled || props.readonly) return
  
  const fileArray = Array.from(files)
  const currentFiles = uploadedFiles.value
  
  // Vérifier le nombre maximum de fichiers
  if (props.maxFiles && currentFiles.length + fileArray.length > props.maxFiles) {
    const error = `Nombre maximum de fichiers dépassé (${props.maxFiles})`
    emit('error', error)
    announceToScreenReader(error, 'assertive')
    return
  }
  
  const newFiles: UploadedFile[] = []
  
  for (const file of fileArray) {
    const validationError = validateFile(file)
    
    if (validationError) {
      emit('error', validationError, file)
      announceToScreenReader(validationError, 'assertive')
      continue
    }
    
    const uploadedFile: UploadedFile = {
      id: generateId('file'),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }
    
    // Créer un aperçu si c'est une image
    if (props.allowPreview && isImageFile(file)) {
      try {
        uploadedFile.preview = await createFilePreview(file)
      } catch (error) {
        console.warn('Erreur lors de la création de l\'aperçu:', error)
      }
    }
    
    newFiles.push(uploadedFile)
  }
  
  if (newFiles.length > 0) {
    const updatedFiles = props.multiple ? [...currentFiles, ...newFiles] : newFiles
    modelValue.value = updatedFiles
    emit('change', updatedFiles)
    
    // Annoncer le succès
    const message = newFiles.length === 1 
      ? `Fichier "${newFiles[0].name}" ajouté`
      : `${newFiles.length} fichiers ajoutés`
    announceToScreenReader(message)
    
    // Émettre l'événement upload pour chaque fichier
    newFiles.forEach(file => emit('upload', file))
  }
}

const removeFile = (fileToRemove: UploadedFile) => {
  if (props.disabled || props.readonly) return
  
  const updatedFiles = uploadedFiles.value.filter(file => file.id !== fileToRemove.id)
  modelValue.value = updatedFiles
  emit('change', updatedFiles)
  emit('remove', fileToRemove)
  
  announceToScreenReader(`Fichier "${fileToRemove.name}" supprimé`)
}

// Gestionnaires d'événements
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    processFiles(target.files)
  }
  // Réinitialiser l'input pour permettre la sélection du même fichier
  target.value = ''
}

const handleBrowseClick = () => {
  if (props.disabled || props.readonly) return
  fileInputRef.value?.click()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleBrowseClick()
  }
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Drag & Drop
const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  
  if (props.disabled || props.readonly) return
  
  dragCounter.value++
  if (dragCounter.value === 1) {
    isDragging.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  
  if (props.disabled || props.readonly) return
  
  dragCounter.value--
  if (dragCounter.value === 0) {
    isDragging.value = false
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  
  if (props.disabled || props.readonly) return
  
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  
  if (props.disabled || props.readonly) return
  
  isDragging.value = false
  dragCounter.value = 0
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    processFiles(files)
  }
}

// Méthodes exposées
const focus = () => {
  dropZoneRef.value?.focus()
}

const clear = () => {
  if (props.disabled || props.readonly) return
  modelValue.value = []
  emit('change', [])
  announceToScreenReader('Tous les fichiers ont été supprimés')
}

defineExpose({
  focus,
  clear,
  fileInputRef,
  dropZoneRef
})
</script>

<template>
  <div :class="containerClasses">
    <!-- Input file caché -->
    <input
      :id="uploadId"
      ref="fileInputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :required="required"
      class="su-file-upload-input"
      v-bind="ariaAttributes"
      @change="handleFileSelect"
      @focus="handleFocus"
      @blur="handleBlur"
    >

    <!-- Zone de drop -->
    <div
      ref="dropZoneRef"
      :class="dropZoneClasses"
      :tabindex="disabled ? -1 : 0"
      role="button"
      :aria-label="placeholder"
      :aria-busy="loading"
      @click="handleBrowseClick"
      @keydown="handleKeydown"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <!-- Icône -->
      <CloudArrowUpIcon 
        class="su-file-upload-icon"
        :class="{ 'su-file-upload-icon--dragging': isDragging }"
        aria-hidden="true"
      />
      
      <!-- Spinner de chargement -->
      <div 
        v-if="loading" 
        class="su-file-upload-loading"
        aria-hidden="true"
      >
        <svg
          class="su-file-upload-spinner-icon"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <!-- Texte principal -->
      <div class="su-file-upload-text">
        <p class="su-file-upload-primary-text">
          {{ loading ? loadingText : (isDragging ? dragText : placeholder) }}
        </p>
        <p class="su-file-upload-secondary-text">
          {{ loading ? loadingSubText : browseText }}
          <span v-if="accept || maxSize">
            <span v-if="accept"> • {{ accept }}</span>
            <span v-if="maxSize"> • Max {{ formatFileSize(maxSize) }}</span>
          </span>
        </p>
      </div>
    </div>

    <!-- Liste des fichiers -->
    <div 
      v-if="showFileList && uploadedFiles.length > 0" 
      class="su-file-upload-list"
      role="list"
      :aria-label="`${uploadedFiles.length} fichier(s) sélectionné(s)`"
    >
      <div
        v-for="file in uploadedFiles"
        :key="file.id"
        class="su-file-upload-item"
        :class="`su-file-upload-item--${file.status}`"
        role="listitem"
      >
        <!-- Aperçu ou icône -->
        <div class="su-file-upload-item-preview">
          <img
            v-if="file.preview"
            :src="file.preview"
            :alt="`Aperçu de ${file.name}`"
            class="su-file-upload-preview-image"
          >
          <component
            :is="getFileIcon(file.file)"
            v-else
            class="su-file-upload-item-icon"
            aria-hidden="true"
          />
        </div>

        <!-- Informations du fichier -->
        <div class="su-file-upload-item-info">
          <div class="su-file-upload-item-name">
            {{ file.name }}
          </div>
          <div class="su-file-upload-item-details">
            <span class="su-file-upload-item-size">{{ formatFileSize(file.size) }}</span>
            <span
              v-if="file.status === 'uploading' && file.progress !== undefined"
              class="su-file-upload-item-progress"
            >
              {{ file.progress }}%
            </span>
            <span
              v-if="file.error"
              class="su-file-upload-item-error"
            >{{ file.error }}</span>
          </div>
        </div>

        <!-- Statut -->
        <div class="su-file-upload-item-status">
          <CheckCircleIcon 
            v-if="file.status === 'success'"
            class="su-file-upload-status-icon su-file-upload-status-icon--success"
            aria-hidden="true"
          />
          <ExclamationCircleIcon 
            v-else-if="file.status === 'error'"
            class="su-file-upload-status-icon su-file-upload-status-icon--error"
            aria-hidden="true"
          />
          <div 
            v-else-if="file.status === 'uploading'"
            class="su-file-upload-spinner"
            aria-hidden="true"
          >
            <svg
              class="su-file-upload-spinner-icon"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        <!-- Bouton de suppression -->
        <button
          v-if="!disabled && !readonly"
          type="button"
          class="su-file-upload-remove-button"
          :aria-label="`Supprimer ${file.name}`"
          @click="removeFile(file)"
        >
          <XMarkIcon
            class="su-file-upload-remove-icon"
            aria-hidden="true"
          />
        </button>
        
        <!-- Barre de progression -->
        <div 
          v-else-if="file.status === 'uploading' && showProgress"
          class="su-file-upload-progress-bar"
          role="progressbar"
          :aria-valuenow="file.progress || 0"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`Upload de ${file.name}: ${file.progress || 0}%`"
        >
          <div 
            class="su-file-upload-progress-fill"
            :style="{ width: `${file.progress || 0}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// FILE UPLOAD — zone de dépôt en pointillés sur surface douce,
// liste de fichiers en cartes compactes. Styles partagés avec
// FileUploadField (mêmes classes).
// ============================================================

.su-file-upload-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  &--disabled {
    @include disabled-state;

    .su-file-upload-dropzone {
      cursor: not-allowed;
    }
  }
}

// L'input natif est masqué : la zone de dépôt le pilote
.su-file-upload-input {
  @include sr-only;
}

// ### Zone de dépôt

.su-file-upload-dropzone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  border: 1px dashed var(--su-border-default);
  border-radius: var(--su-radius-container);
  background-color: var(--su-bg-muted);
  text-align: center;
  cursor: pointer;
  outline: none;
  @include transition(border-color, background-color, box-shadow);

  &:hover:not(&--disabled, &--readonly) {
    border-color: var(--su-border-strong);
    background-color: var(--su-bg-accent);
  }

  &:focus-visible {
    @include focus-ring;
  }

  // ### Variantes

  &--solid {
    border-style: solid;
    border-color: var(--su-border-input);
    background-color: var(--su-bg-control);
    box-shadow: var(--su-shadow-control);
  }

  &--minimal {
    flex-direction: row;
    justify-content: flex-start;
    padding: 0.75rem 1rem;
    border-style: solid;
    border-color: var(--su-border-input);
    border-radius: var(--su-radius-control);
    background-color: var(--su-bg-control);
    text-align: start;

    .su-file-upload-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  // ### Tailles

  &--sm {
    gap: 0.5rem;
    padding: 1rem 0.75rem;

    .su-file-upload-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &--lg {
    gap: 1rem;
    padding: 2.5rem 1.5rem;

    .su-file-upload-icon {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  // ### États

  @each $state in ('error', 'success', 'warning') {
    &--#{$state} {
      border-color: with-alpha(state-#{$state}, 48%);
      background-color: with-alpha(state-#{$state}, 4%);
    }
  }

  // Fichier survolé au-dessus de la zone
  &--dragging {
    border-style: solid;
    border-color: var(--su-ring);
    background-color: with-alpha(primary-default, 6%);
    box-shadow: 0 0 0 3px with-alpha(ring, 24%);
  }

  &--readonly {
    cursor: default;
  }
}

.su-file-upload-icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  color: var(--su-text-tertiary);
  @include transition(color, translate);

  &--dragging {
    color: var(--su-primary-default);
    translate: 0 -0.125rem;
  }
}

.su-file-upload-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.su-file-upload-primary-text {
  margin: 0;
  font-size: var(--su-font-size-sm);
  font-weight: var(--su-font-weight-medium);
  color: var(--su-text-primary);
}

.su-file-upload-secondary-text {
  margin: 0;
  font-size: var(--su-font-size-xs);
  color: var(--su-text-tertiary);
}

.su-file-upload-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  background-color: with-alpha(bg-surface, 70%);
  color: var(--su-primary-default);
}

.su-file-upload-spinner-icon {
  width: 1.25rem;
  height: 1.25rem;
  animation: su-file-upload-spin 0.8s linear infinite;

  @include motion-reduce {
    animation-duration: 2.4s;
  }
}

// ### Liste des fichiers

.su-file-upload-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.su-file-upload-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  overflow: hidden;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-control);
  background-color: var(--su-bg-surface);
  background-clip: padding-box;
  box-shadow: var(--su-shadow-control);

  &--error {
    border-color: with-alpha(state-error, 36%);
    background-color: with-alpha(state-error, 4%);
  }

  &-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    border-radius: var(--su-radius-md);
    background-color: var(--su-bg-muted);
  }

  &-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--su-text-tertiary);
  }

  &-info {
    flex: 1;
    min-width: 0;
  }

  &-name {
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-medium);
    color: var(--su-text-primary);
    @include truncate;
  }

  &-details {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.125rem;
    font-size: var(--su-font-size-xs);
    font-variant-numeric: tabular-nums;
    color: var(--su-text-tertiary);
  }

  &-error {
    color: var(--su-state-error-fg);
  }

  &-status {
    display: flex;
    flex-shrink: 0;
  }
}

.su-file-upload-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.su-file-upload-status-icon {
  width: 1.125rem;
  height: 1.125rem;

  &--success {
    color: var(--su-state-success);
  }

  &--error {
    color: var(--su-state-error);
  }
}

.su-file-upload-spinner {
  display: flex;
  color: var(--su-primary-default);
}

.su-file-upload-remove-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: var(--su-text-tertiary);
  cursor: pointer;
  @include transition(background-color, color);
  @include touch-target-overlay;

  &:hover {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }
}

.su-file-upload-remove-icon {
  width: 1rem;
  height: 1rem;
}

// Barre de progression au pied de la carte
.su-file-upload-progress-bar {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--su-bg-muted);
}

.su-file-upload-progress-fill {
  height: 100%;
  background-color: var(--su-primary-default);
  @include transition(width);
}

@keyframes su-file-upload-spin {
  to {
    rotate: 360deg;
  }
}
</style>
