<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import { CloudArrowUpIcon, DocumentIcon, PhotoIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import FormField from '@/components/atoms/FormField.vue'
import type { FileUploadFieldProps, UploadedFile } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useAnnouncer } from '@/composables/useAnnouncer'

interface Props extends Omit<FileUploadFieldProps, 'value'> {}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  variant: 'default',
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  allowPreview: true,
  showFileList: true,
  showProgress: false,
  loading: false
})

// Textes par défaut : prop explicite, sinon locale courante
const { t, formatBytes } = useLocale()
const { announce } = useAnnouncer()
const placeholderText = computed(() => props.placeholder ?? t('fileUpload.placeholder'))
const dropzoneTitle = computed(() => props.loading ? (props.loadingText ?? t('fileUpload.loading')) : (isDragging.value ? (props.dragText ?? t('fileUpload.drop')) : placeholderText.value))
const dropzoneHint = computed(() => props.loading ? (props.loadingSubText ?? t('fileUpload.loadingHint')) : (props.browseText ?? t('fileUpload.browse')))

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
const fieldId = 'file-upload-' + useId()

// IDs pour l'accessibilité
const uploadId = computed(() => attrs.id as string || fieldId)

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
const formatFileSize = (bytes: number): string => formatBytes(bytes)

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
    return t('fileUpload.tooLarge', { name: file.name, size: formatFileSize(file.size), max: formatFileSize(props.maxSize) })
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
      return t('fileUpload.invalidType', { type: file.type, name: file.name })
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
    const error = t('fileUpload.maxFiles', { max: props.maxFiles })
    emit('error', error)
    announce(error, { priority: 'assertive' })
    return
  }
  
  const newFiles: UploadedFile[] = []
  
  for (const file of fileArray) {
    const validationError = validateFile(file)
    
    if (validationError) {
      emit('error', validationError, file)
      announce(validationError, { priority: 'assertive' })
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
    announce(t('fileUpload.added', { count: newFiles.length, name: newFiles[0].name }))
    
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
  
  announce(t('fileUpload.removed', { name: fileToRemove.name }))
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
  announce(t('fileUpload.cleared'))
}

defineExpose({
  focus,
  clear,
  fileInputRef,
  dropZoneRef
})
</script>

<template>
  <FormField
    :field-id="uploadId"
    :label="label"
    :message="message"
    :state="state"
    :size="size"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <div :class="containerClasses">
        <!-- Input file caché -->
        <input
          :id="id"
          ref="fileInputRef"
          type="file"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          :required="required"
          :aria-describedby="messageId"
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
          :aria-label="placeholderText"
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
              {{ dropzoneTitle }}
            </p>
            <p class="su-file-upload-secondary-text">
              {{ dropzoneHint }}
              <span v-if="accept || maxSize">
                <span v-if="accept"> • {{ accept }}</span>
                <span v-if="maxSize"> • {{ t('fileUpload.maxSize', { max: formatFileSize(maxSize) }) }}</span>
              </span>
            </p>
          </div>
        </div>

        <!-- Liste des fichiers -->
        <div 
          v-if="showFileList && uploadedFiles.length > 0" 
          class="su-file-upload-list"
          role="list"
          :aria-label="t('fileUpload.selectedCount', { count: uploadedFiles.length })"
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
                :alt="t('fileUpload.preview', { name: file.name })"
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
              :aria-label="t('fileUpload.remove', { name: file.name })"
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
              :aria-label="t('fileUpload.progress', { name: file.name, progress: file.progress || 0 })"
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
  </FormField>
</template>

<!-- Pas de styles propres : mêmes classes que SuFileUpload (atoms/FileUpload.vue), dont les styles globaux s'appliquent -->
