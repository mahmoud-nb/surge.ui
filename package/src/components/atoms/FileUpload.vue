<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { CloudArrowUpIcon, DocumentIcon, PhotoIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import type { AccessibilityProps, Size, State } from '@/types'
import { announceToScreenReader } from '@/utils/accessibility'

export interface UploadedFile {
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

export type FileUploadVariant = 'default' | 'dashed' | 'solid' | 'minimal'

export interface BaseFileUploadProps extends AccessibilityProps {
  value?: UploadedFile[]
  variant?: FileUploadVariant
  multiple?: boolean
  accept?: string
  maxSize?: number
  maxFiles?: number
  size?: Size
  state?: State
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  label?: string
  message?: string
  placeholder?: string
  dragText?: string
  browseText?: string
  allowPreview?: boolean
  showFileList?: boolean
  ariaInvalid?: boolean
  ariaRequired?: boolean
  showProgress?: boolean
  loading?: boolean
}

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
      ref="fileInputRef"
      :id="uploadId"
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
    />

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
        <svg class="su-spinner" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Texte principal -->
      <div class="su-file-upload-text">
        <p class="su-file-upload-primary-text">
          {{ loading ? 'Chargement...' : (isDragging ? dragText : placeholder) }}
        </p>
        <p class="su-file-upload-secondary-text">
          {{ loading ? 'Veuillez patienter' : browseText }}
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
          />
          <component
            v-else
            :is="getFileIcon(file.file)"
            class="su-file-upload-item-icon"
            aria-hidden="true"
          />
        </div>

        <!-- Informations du fichier -->
        <div class="su-file-upload-item-info">
          <div class="su-file-upload-item-name">{{ file.name }}</div>
          <div class="su-file-upload-item-details">
            <span class="su-file-upload-item-size">{{ formatFileSize(file.size) }}</span>
            <span v-if="file.status === 'uploading' && file.progress !== undefined" class="su-file-upload-item-progress">
              {{ file.progress }}%
            </span>
            <span v-if="file.error" class="su-file-upload-item-error">{{ file.error }}</span>
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
            <svg class="su-spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
              <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
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
          <XMarkIcon class="su-file-upload-remove-icon" aria-hidden="true" />
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
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.su-file-upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.su-file-upload-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.su-file-upload-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed $gray-300;
  border-radius: $border-radius-lg;
  background-color: $gray-50;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover:not(&--disabled):not(&--readonly) {
    border-color: $primary-400;
    background-color: $primary-50;
  }
  
  &:focus {
    outline: none;
    border-color: $primary-500;
    box-shadow: 0 0 0 3px rgba($primary-500, 0.1);
  }
  
  // Tailles
  &--sm {
    padding: 1.5rem;
    
    .su-file-upload-icon {
      width: 2rem;
      height: 2rem;
    }
    
    .su-file-upload-primary-text {
      font-size: $font-size-sm;
    }
    
    .su-file-upload-secondary-text {
      font-size: 0.75rem;
    }
  }
  
  &--md {
    padding: 2rem;
    
    .su-file-upload-icon {
      width: 3rem;
      height: 3rem;
    }
  }
  
  &--lg {
    padding: 2.5rem;
    
    .su-file-upload-icon {
      width: 4rem;
      height: 4rem;
    }
    
    .su-file-upload-primary-text {
      font-size: $font-size-lg;
    }
  }
  
  // États
  &--error {
    border-color: $error-300;
    background-color: $error-50;
    
    &:hover:not(&--disabled):not(&--readonly) {
      border-color: $error-400;
    }
    
    &:focus {
      border-color: $error-500;
      box-shadow: 0 0 0 3px rgba($error-500, 0.1);
    }
  }
  
  &--success {
    border-color: $success-300;
    background-color: $success-50;
    
    &:hover:not(&--disabled):not(&--readonly) {
      border-color: $success-400;
    }
    
    &:focus {
      border-color: $success-500;
      box-shadow: 0 0 0 3px rgba($success-500, 0.1);
    }
  }
  
  &--warning {
    border-color: $warning-300;
    background-color: $warning-50;
    
    &:hover:not(&--disabled):not(&--readonly) {
      border-color: $warning-400;
    }
    
    &:focus {
      border-color: $warning-500;
      box-shadow: 0 0 0 3px rgba($warning-500, 0.1);
    }
  }
  
  &--dragging {
    border-color: $primary-500;
    background-color: $primary-100;
    transform: scale(1.02);
  }
  
  &--disabled,
  &--readonly {
    cursor: not-allowed;
    
    &:hover {
      border-color: $gray-300;
      background-color: $gray-50;
    }
  }
}

.su-file-upload-icon {
  width: 3rem;
  height: 3rem;
  color: $text-secondary;
  margin-bottom: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &--dragging {
    color: $primary-600;
    transform: scale(1.1);
  }
}

.su-file-upload-loading {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .su-spinner {
    width: 1.5rem;
    height: 1.5rem;
    color: $primary-600;
    animation: spin 1s linear infinite;
  }
}

.su-file-upload-progress-bar {
  width: 100%;
  height: 0.25rem;
  background-color: $gray-200;
  border-radius: 9999px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.su-file-upload-progress-fill {
  height: 100%;
  background-color: $primary-500;
  border-radius: inherit;
  transition: width 0.3s ease;
}

.su-file-upload-text {
  text-align: center;
}

.su-file-upload-primary-text {
  font-size: $font-size-base;
  font-weight: 500;
  color: $text-primary;
  margin: 0 0 0.5rem 0;
}

.su-file-upload-secondary-text {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin: 0;
}

.su-file-upload-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.su-file-upload-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid $gray-200;
  border-radius: $border-radius-md;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  &--error {
    border-color: $error-300;
    background-color: $error-50;
  }
  
  &--success {
    border-color: $success-300;
    background-color: $success-50;
  }
  
  &--uploading {
    border-color: $primary-300;
    background-color: $primary-50;
  }
}

.su-file-upload-item-preview {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $gray-100;
  border-radius: $border-radius-sm;
  overflow: hidden;
}

.su-file-upload-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.su-file-upload-item-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: $text-secondary;
}

.su-file-upload-item-info {
  flex: 1;
  min-width: 0;
}

.su-file-upload-item-name {
  font-weight: 500;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.125rem;
}

.su-file-upload-item-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: $font-size-sm;
  color: $text-secondary;
}

.su-file-upload-item-size {
  color: $text-secondary;
}

.su-file-upload-item-progress {
  color: $primary-600;
  font-weight: 500;
}

.su-file-upload-item-error {
  color: $error-600;
  font-weight: 500;
}

.su-file-upload-item-status {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.su-file-upload-status-icon {
  width: 1.25rem;
  height: 1.25rem;
  
  &--success {
    color: $success-600;
  }
  
  &--error {
    color: $error-600;
  }
}

.su-file-upload-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  
  .su-spinner {
    width: 1.25rem;
    height: 1.25rem;
    color: $primary-600;
    animation: spin 1s linear infinite;
  }
}

.su-file-upload-remove-button {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: $text-secondary;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background-color: $error-100;
    color: $error-600;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba($error-500, 0.2);
  }
}

.su-file-upload-remove-icon {
  width: 1rem;
  height: 1rem;
}

.su-file-upload-message {
  font-size: $font-size-sm;
  line-height: $line-height-tight;
  
  &--default {
    color: $text-secondary;
  }
  
  &--error {
    color: $error-600;
  }
  
  &--success {
    color: $success-600;
  }
  
  &--warning {
    color: $warning-600;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-file-upload-dropzone {
    background-color: $gray-800;
    border-color: $gray-600;
    
    &:hover:not(&--disabled):not(&--readonly) {
      background-color: $gray-700;
      border-color: $primary-400;
    }
    
    &--dragging {
      background-color: rgba($primary-400, 0.2);
      border-color: $primary-400;
    }
  }
  
  .su-file-upload-primary-text {
    color: $text-primary-dark;
  }
  
  .su-file-upload-secondary-text {
    color: $text-secondary-dark;
  }
  
  .su-file-upload-item {
    background-color: $gray-800;
    border-color: $gray-600;
  }
  
  .su-file-upload-item-preview {
    background-color: $gray-700;
  }
  
  .su-file-upload-item-name {
    color: $text-primary-dark;
  }
  
  .su-file-upload-item-details {
    color: $text-secondary-dark;
  }
  
  .su-file-upload-message {
    &--default {
      color: $text-secondary-dark;
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-file-upload-dropzone {
    border-width: 3px;
  }
  
  .su-file-upload-item {
    border-width: 2px;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-file-upload-dropzone,
  .su-file-upload-icon,
  .su-file-upload-item,
  .su-file-upload-remove-button {
    transition: none;
  }
  
  .su-file-upload-dropzone--dragging {
    transform: none;
  }
  
  .su-file-upload-icon--dragging {
    transform: none;
  }
  
  .su-spinner {
    animation: none;
  }
}
</style>