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
      :aria-label="dismissLabel"
      @click="handleDismiss"
    >
      <XMarkIcon class="su-alert__dismiss-icon" />
    </button>
  </div>
</template>

<style lang="scss">
@use '../../styles2/main' as *;
@use '../../styles2/foundations/colors' as *;
@use '../../styles2/foundations/spacing' as *;

.su-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--su-spacing-3);
  padding: var(--su-spacing-3);
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-lg);
  background-color: var(--su-bg-canvas);
  color: var(--su-text-primary);
  position: relative;

  &__icon-wrapper {
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    margin-top: 2px; // Alignement visuel avec le texte
  }

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__content {
    flex: 1;
    min-width: 0; // Prevent overflow
    display: flex;
    flex-direction: column;
    gap: var(--su-spacing-2);
  }

  &__title {
    font-size: var(--su-font-size-base);
    font-weight: var(--su-font-weight-semibold);
    line-height: var(--su-line-height-tight);
  }

  &__description {
    font-size: var(--su-font-size-base);
    line-height: var(--su-line-height-normal);
    color: var(--su-text-secondary);
  }

  // Types
  &--success {
    border-color: var(--su-state-success-border-color);
    background-color: var(--su-state-success-bg);
    color: var(--su-state-success);
    
    .su-alert__icon {
      color: var(--su-state-success);
    }
  }

  &--warning {
    border-color: var(--su-state-warning-border-color);
    background-color: var(--su-state-warning-bg);
    color: var(--su-state-warning);
    
    .su-alert__icon {
      color: var(--su-state-warning);
    }
  }

  &--error {
    border-color: var(--su-state-error-border-color);
    background-color: var(--su-state-error-bg);
    color: var(--su-state-error);
    
    .su-alert__icon {
      color: var(--su-state-error);
    }
  }

  &--info {
    border-color: var(--su-state-info-border-color);
    background-color: var(--su-state-info-bg);
    color: var(--su-state-info);
    
    .su-alert__icon {
      color: var(--su-state-info);
    }
  }

  &--neutral {
    border-color: var(--su-border-subtle);
    background-color: var(--su-bg-canvas);
    color: var(--su-text-primary);
    
    .su-alert__icon {
      color: var(--su-text-tertiary);
    }
  }

  // Sizes
  &--sm {
    padding: var(--su-spacing-2);
    gap: var(--su-spacing-2);
    
    .su-alert__icon {
      width: 16px;
      height: 16px;
    }

    .su-alert__content {
      gap: var(--su-spacing-1);
    }
    
    .su-alert__title {
      font-size: var(--su-font-size-sm);
    }
    
    .su-alert__description {
      font-size: var(--su-font-size-sm);
    }
  }

  &--md {
    // Valeurs par défaut
  }

  &--lg {
    padding: var(--su-spacing-4);
    gap: var(--su-spacing-4);
    
    .su-alert__icon {
      width: 24px;
      height: 24px;
    }

    .su-alert__content {
      gap: var(--su-spacing-2);
    }
    
    .su-alert__title {
      font-size: var(--su-font-size-lg);
    }
    
    .su-alert__description {
      font-size: var(--su-font-size-base);
    }
  }

  &__actions {
    margin-top: var(--su-spacing-3);
    display: flex;
    gap: var(--su-spacing-2);
    flex-wrap: wrap;
    
    [dir="rtl"] & {
      gap: var(--su-spacing-2);
    }
  }

  .su-alert--dismissible {
    padding-right: calc(44px + var(--su-spacing-2));
    
    [dir="rtl"] & {
      padding-right: var(--su-spacing-4);
      padding-left: calc(44px + var(--su-spacing-2));
    }
  }

  &__dismiss-button {
    position: absolute;
    top: var(--su-spacing-3);
    right: var(--su-spacing-3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: var(--su-radius-md);
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: all var(--su-duration-normal) var(--su-ease-in-out);
    
    [dir="rtl"] & {
      right: auto;
      left: var(--su-spacing-3);
    }
    
    &:hover {
      background-color: var(--su-bg-hover);
    }
    
    &:focus-visible {
      outline: var(--su-focus-ring-width) solid var(--su-border-focus);
      outline-offset: var(--su-focus-ring-offset);
      
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
      border: 1px solid currentcolor;
    }

    &--success {
      color: var(--su-state-success);
    }
    
    &--warning {
      color: var(--su-state-warning);
    }
    
    &--error {
      color: var(--su-state-error);
    }
    
    &--info {
      color: var(--su-state-info);
    }
    
    &--neutral {
      color: var(--su-text-tertiary);
    }
  }

  &__dismiss-icon {
    width: 16px;
    height: 16px;
  }

  // High contrast support
  @media (prefers-contrast: high) {
    border-width: 2px;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
    
    .su-alert__dismiss-button {
      transition: none !important;
    }
  }
}
</style>