<script setup lang="ts">
import { computed, useSlots } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useUniqueId } from '@/composables/useUniqueId'
import type { AlertProps } from '@/types'

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  dismissible: false,
  dismissLabel: 'Fermer la notification',
  ariaLive: 'polite',
  ariaAtomic: true,
  size: 'md'
})

// Emits
const emit = defineEmits<{
  dismiss: []
}>()

// Slots
const slots = useSlots()

// Computed
const titleId = `su-alert-title-${useUniqueId('su-alert-title')}`
const descriptionId = `su-alert-description-${useUniqueId('su-alert-desc')}`

const hasTitle = computed(() => !!(props.title || slots.title))
const hasDescription = computed(() => !!(props.description || slots.description))

const iconComponent = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: ExclamationCircleIcon,
    info: InformationCircleIcon,
    neutral: InformationCircleIcon
  }
  return icons[props.type]
})

const alertClasses = computed(() => [
  'su-alert',
  `su-alert--${props.type}`,
  `su-alert--${props.size}`,
  {
    'su-alert--dismissible': props.dismissible
  }
])

const iconClasses = computed(() => [
  'su-alert__icon',
  `su-alert__icon--${props.type}`
])

const dismissButtonClasses = computed(() => [
  'su-alert__dismiss-button',
  `su-alert__dismiss-button--${props.type}`
])

// Methods
const handleDismiss = () => {
  emit('dismiss')
}

// Exposed methods
defineExpose({
  dismiss: handleDismiss
})
</script>

<template>
  <!-- Le template reste identique -->
  <div
    :class="alertClasses"
    role="alert"
    :aria-live="ariaLive"
    :aria-atomic="ariaAtomic"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
  >
    <div class="su-alert__icon-wrapper">
      <component
        :is="iconComponent"
        :class="iconClasses"
        aria-hidden="true"
      />
    </div>
    
    <div class="su-alert__content">
      <div
        v-if="hasTitle"
        :id="titleId"
        class="su-alert__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      
      <div
        v-if="hasDescription"
        :id="descriptionId"
        class="su-alert__description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
      
      <div
        v-if="$slots.default"
        class="su-alert__actions"
      >
        <slot />
      </div>
    </div>
    
    <button
      v-if="dismissible"
      type="button"
      :class="dismissButtonClasses"
      @click="handleDismiss"
      :aria-label="dismissLabel"
    >
      <XMarkIcon class="su-alert__dismiss-icon" />
    </button>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

// Alert specific tokens
$alert-icon-size-sm: 16px;
$alert-icon-size-md: 20px;
$alert-icon-size-lg: 24px;
$alert-dismiss-icon-size: 16px;

.su-alert {
  display: flex;
  align-items: flex-start;
  gap: $spacing-3;
  padding: $spacing-3;
  border: 1px solid $gray-200;
  border-radius: $border-radius-lg;
  background-color: $gray-50;
  color: $gray-900;
  position: relative;
  
  // High contrast support
  @media (prefers-contrast: high) {
    border-width: 2px;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  // RTL support
  [dir="rtl"] & {
    gap: $spacing-3;
    text-align: right;
  }

  // Types
  &--success {
    border-color: $success-200;
    background-color: $success-50;
    color: $success-900;
    
    .su-alert__icon {
      color: $success-500;
    }
  }

  &--warning {
    border-color: $warning-200;
    background-color: $warning-50;
    color: $warning-900;
    
    .su-alert__icon {
      color: $warning-500;
    }
  }

  &--error {
    border-color: $error-200;
    background-color: $error-50;
    color: $error-900;
    
    .su-alert__icon {
      color: $error-500;
    }
  }

  &--info {
    border-color: $primary-200;
    background-color: $primary-50;
    color: $primary-900;
    
    .su-alert__icon {
      color: $primary-500;
    }
  }

  &--neutral {
    border-color: $gray-200;
    background-color: $gray-50;
    color: $gray-900;
    
    .su-alert__icon {
      color: $gray-500;
    }
  }

  // Sizes
  &--sm {
    padding: $spacing-2;
    gap: $spacing-2;
    
    .su-alert__icon {
      width: 16px;
      height: 16px;
    }

    .su-alert__content {
      gap: $spacing-1;
    }
    
    .su-alert__title {
      font-size: $font-size-sm;
    }
    
    .su-alert__description {
      font-size: $font-size-sm;
    }
  }

  &--md {
    // Valeurs par défaut
  }

  &--lg {
    padding: $spacing-4;
    gap: $spacing-4;
    
    .su-alert__icon {
      width: 24px;
      height: 24px;
    }

    .su-alert__content {
      gap: $spacing-2;
    }
    
    .su-alert__title {
      font-size: $font-size-lg;
    }
    
    .su-alert__description {
      font-size: $font-size-base;
    }
  }

  // Dark mode
  @media (prefers-color-scheme: dark) {
    border-color: $gray-700;
    background-color: $gray-800;
    color: $text-primary-dark;

    .su-alert__description {
      color: $text-secondary-dark;
    }

    &.su-alert--success {
      border-color: $success-800;
      background-color: $success-900;
      color: $text-primary-dark;
      
      .su-alert__icon {
        color: $success-400;
      }
      
      .su-alert__description {
        color: $text-secondary-dark;
      }
    }

    &.su-alert--warning {
      border-color: $warning-800;
      background-color: $warning-900;
      color: $text-primary-dark;
      
      .su-alert__icon {
        color: $warning-400;
      }
      
      .su-alert__description {
        color: $text-secondary-dark;
      }
    }

    &.su-alert--error {
      border-color: $error-800;
      background-color: $error-900;
      color: $text-primary-dark;
      
      .su-alert__icon {
        color: $error-400;
      }
      
      .su-alert__description {
        color: $text-secondary-dark;
      }
    }

    &.su-alert--info {
      border-color: $primary-800;
      background-color: $primary-900;
      color: $text-primary-dark;
      
      .su-alert__icon {
        color: $primary-400;
      }
      
      .su-alert__description {
        color: $text-secondary-dark;
      }
    }

    &.su-alert--neutral {
      border-color: $gray-700;
      background-color: $gray-800;
      color: $text-primary-dark;
      
      .su-alert__icon {
        color: $gray-400;
      }
      
      .su-alert__description {
        color: $text-secondary-dark;
      }
    }
  }
}

.su-alert__icon-wrapper {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  margin-top: 2px; // Alignement visuel avec le texte
}

.su-alert__icon {
  width: 20px;
  height: 20px;
}

.su-alert__content {
  flex: 1;
  min-width: 0; // Prevent overflow
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.su-alert__title {
  font-size: $font-size-base;
  font-weight: 600;
  line-height: $line-height-tight;
}

.su-alert__description {
  font-size: $font-size-base;
  line-height: $line-height-normal;
  color: $text-secondary;
}

.su-alert__actions {
  margin-top: $spacing-3;
  display: flex;
  gap: $spacing-2;
  flex-wrap: wrap;
  
  [dir="rtl"] & {
    gap: $spacing-2;
  }
}

.su-alert--dismissible {
  padding-right: calc(#{$spacing-8} + #{$spacing-2});
  
  [dir="rtl"] & {
    padding-right: $spacing-4;
    padding-left: calc(#{$spacing-8} + #{$spacing-2});
  }
}

.su-alert__dismiss-button {
  position: absolute;
  top: $spacing-3;
  right: $spacing-3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $min-touch-target-sm;
  height: $min-touch-target-sm;
  border: none;
  border-radius: $border-radius-md;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  
  [dir="rtl"] & {
    right: auto;
    left: $spacing-3;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    
    @media (prefers-color-scheme: dark) {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  &:focus {
    outline: $focus-ring-width solid $focus-ring-color;
    outline-offset: $focus-ring-offset;
    
    // High contrast
    @media (prefers-contrast: high) {
      outline-width: 3px;
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  // High contrast
  @media (prefers-contrast: high) {
    border: 1px solid currentColor;
  }
}

.su-alert__dismiss-icon {
  width: 16px;
  height: 16px;
}

// Styles spécifiques pour chaque type de bouton de fermeture
.su-alert__dismiss-button {
  &--success {
    color: $success-500;
    
    @media (prefers-color-scheme: dark) {
      color: $success-400;
    }
  }
  
  &--warning {
    color: $warning-500;
    
    @media (prefers-color-scheme: dark) {
      color: $warning-400;
    }
  }
  
  &--error {
    color: $error-500;
    
    @media (prefers-color-scheme: dark) {
      color: $error-400;
    }
  }
  
  &--info {
    color: $primary-500;
    
    @media (prefers-color-scheme: dark) {
      color: $primary-400;
    }
  }
  
  &--neutral {
    color: $gray-500;
    
    @media (prefers-color-scheme: dark) {
      color: $gray-400;
    }
  }
}
</style>