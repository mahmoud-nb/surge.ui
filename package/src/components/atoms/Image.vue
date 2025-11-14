<script setup lang="ts">
import { computed, ref, onMounted, useAttrs, useId } from 'vue'
import type { ImageProps } from '@/types'


const props = withDefaults(defineProps<ImageProps>(), {
  ratio: 'auto',
  fit: 'cover',
  position: 'center',
  lazy: false,
  loading: 'lazy',
  placeholder: true,
  placeholderColor: '#f3f4f6'
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const attrs = useAttrs()

// Refs
const imageRef = ref<HTMLImageElement>()
const isLoaded = ref(false)
const hasError = ref(false)
const isLoading = ref(true)

const fieldId = 'image-' + useId()
const imageId = computed(() => attrs.id as string || fieldId)

// Calcul du ratio d'aspect
const aspectRatioStyle = computed(() => {
  if (props.ratio === 'auto') return {}
  
  let ratioValue: string
  
  if (typeof props.ratio === 'number') {
    ratioValue = props.ratio.toString()
  } else {
    ratioValue = props.ratio
  }
  
  return {
    aspectRatio: ratioValue
  }
})

// Classes CSS
const containerClasses = computed(() => [
  'su-image-container',
  {
    'su-image-container--loading': isLoading.value,
    'su-image-container--loaded': isLoaded.value,
    'su-image-container--error': hasError.value,
    'su-image-container--has-ratio': props.ratio !== 'auto'
  }
])

const imageClasses = computed(() => [
  'su-image',
  `su-image--fit-${props.fit}`,
  `su-image--position-${props.position}`,
  {
    'su-image--loaded': isLoaded.value,
    'su-image--error': hasError.value
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.ariaHidden !== undefined) attrs['aria-hidden'] = props.ariaHidden
  if (props.role) attrs['role'] = props.role
  
  return attrs
})

// Gestionnaires d'événements
const handleLoad = (event: Event) => {
  isLoaded.value = true
  isLoading.value = false
  hasError.value = false
  emit('load', event)
}

const handleError = (event: Event) => {
  hasError.value = true
  isLoading.value = false
  
  // Charger l'image de fallback si disponible
  if (props.fallback && imageRef.value) {
    const img = imageRef.value
    if (img.src !== props.fallback) {
      img.src = props.fallback
      return // Ne pas émettre l'erreur encore, laisser une chance au fallback
    }
  }
  
  emit('error', event)
}

// Méthodes exposées
const reload = () => {
  if (imageRef.value) {
    isLoaded.value = false
    isLoading.value = true
    hasError.value = false
    imageRef.value.src = props.src
  }
}

defineExpose({
  reload,
  imageRef
})

// Lifecycle
onMounted(() => {
  if (imageRef.value?.complete) {
    handleLoad(new Event('load'))
  }
})
</script>

<template>
  <div 
    :class="containerClasses"
    :style="aspectRatioStyle"
  >
    <!-- Placeholder de chargement -->
    <div 
      v-if="placeholder && isLoading && !hasError"
      class="su-image-placeholder"
      :style="{ backgroundColor: placeholderColor }"
      :aria-label="alt + ' - Chargement en cours'"
    >
      <svg 
        class="su-image-placeholder-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          ry="2"
        />
        <circle
          cx="9"
          cy="9"
          r="2"
        />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </div>

    <!-- Image avec sources multiples -->
    <picture v-if="sources && sources.length > 0">
      <source
        v-for="source in sources"
        :key="source.srcset"
        :srcset="source.srcset"
        :type="source.type"
        :media="source.media"
      >
      <img
        :id="imageId"
        ref="imageRef"
        :class="imageClasses"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="lazy ? 'lazy' : loading"
        v-bind="ariaAttributes"
        @load="handleLoad"
        @error="handleError"
      >
    </picture>

    <!-- Image simple -->
    <img
      v-else
      :id="imageId"
      ref="imageRef"
      :class="imageClasses"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="lazy ? 'lazy' : loading"
      v-bind="ariaAttributes"
      @load="handleLoad"
      @error="handleError"
    >

    <!-- Overlay d'erreur -->
    <div 
      v-if="hasError"
      class="su-image-error"
      :aria-label="alt + ' - Erreur de chargement'"
    >
      <svg 
        class="su-image-error-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="m21 21-6-6m0 0L9 9m6 6 6 6M9 9l-6-6m6 6V3m0 6H3" />
      </svg>
      <span class="su-image-error-text">Erreur de chargement</span>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: $gray-100;
  
  &--has-ratio {
    width: 100%;
  }
  
  &--loading {
    .su-image {
      opacity: 0;
    }
  }
  
  &--loaded {
    .su-image {
      opacity: 1;
    }
    
    .su-image-placeholder {
      opacity: 0;
      pointer-events: none;
    }
  }
  
  &--error {
    .su-image {
      opacity: 0;
    }
  }
}

.su-image {
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
  
  // Object-fit variants
  &--fit-cover {
    object-fit: cover;
  }
  
  &--fit-contain {
    object-fit: contain;
  }
  
  &--fit-fill {
    object-fit: fill;
  }
  
  &--fit-none {
    object-fit: none;
  }
  
  &--fit-scale-down {
    object-fit: scale-down;
  }
  
  // Object-position variants
  &--position-center {
    object-position: center;
  }
  
  &--position-top {
    object-position: top;
  }
  
  &--position-bottom {
    object-position: bottom;
  }
  
  &--position-left {
    object-position: left;
  }
  
  &--position-right {
    object-position: right;
  }
  
  &--position-top-left {
    object-position: top left;
  }
  
  &--position-top-right {
    object-position: top right;
  }
  
  &--position-bottom-left {
    object-position: bottom left;
  }
  
  &--position-bottom-right {
    object-position: bottom right;
  }
}

.su-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  
  &-icon {
    width: 3rem;
    height: 3rem;
    color: $text-tertiary;
  }
}

.su-image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $gray-100;
  color: $text-secondary;
  
  &-icon {
    width: 2rem;
    height: 2rem;
    color: $error-500;
    margin-bottom: 0.5rem;
  }
  
  &-text {
    font-size: $font-size-sm;
    font-weight: 500;
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-image-container {
    background-color: $gray-700;
  }
  
  .su-image-placeholder {
    background-color: $gray-800;
    
    &-icon {
      color: $text-tertiary-dark;
    }
  }
  
  .su-image-error {
    background-color: $gray-800;
    color: $text-secondary-dark;
    
    &-text {
      color: $text-secondary-dark;
    }
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-image,
  .su-image-placeholder {
    transition: none;
  }
}
</style>