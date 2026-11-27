<script setup lang="ts">
import { computed, useId, useSlots } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import type { AlertProps } from '@/types'
import { useLocale } from '@/composables/useLocale'

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  dismissible: false,
  ariaLive: 'polite',
  ariaAtomic: true,
  size: 'md'
})

// Textes par défaut : prop explicite, sinon locale courante
const { t } = useLocale()
const dismissLabelText = computed(() => props.dismissLabel ?? t('alert.dismiss'))

// Emits
const emit = defineEmits<{
  dismiss: []
}>()

// Slots
const slots = useSlots()

// Computed
const alertId = useId()
const titleId = `su-alert-title-${alertId}`
const descriptionId = `su-alert-description-${alertId}`

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
  <div
    :class="alertClasses"
    role="alert"
    :aria-live="ariaLive"
    :aria-atomic="ariaAtomic"
    :aria-labelledby="hasTitle ? titleId : undefined"
    :aria-describedby="hasDescription ? descriptionId : undefined"
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
      :aria-label="dismissLabelText"
      @click="handleDismiss"
    >
      <XMarkIcon class="su-alert__dismiss-icon" />
    </button>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// ALERT — encadré teinté : fond à 4 %, bordure à 32 %, icône
// colorée, titre medium et description discrète
// ============================================================

.su-alert {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  box-sizing: border-box;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-xl);
  background-clip: padding-box;
  color: var(--su-text-primary);
  font-size: var(--su-font-size-base);
  line-height: 1.4;

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  // ### Types

  @each $type in ('success', 'warning', 'error', 'info') {
    &--#{$type} {
      border-color: with-alpha(state-#{$type}, 32%);
      background-color: with-alpha(state-#{$type}, 4%);

      @include dark-mode {
        background-color: with-alpha(state-#{$type}, 8%);
      }

      .su-alert__icon {
        color: var(--su-state-#{$type});
      }
    }
  }

  &--neutral {
    background-color: var(--su-bg-surface);
    box-shadow: var(--su-shadow-control);

    .su-alert__icon {
      color: var(--su-text-tertiary);
    }
  }

  // ### Tailles

  &--sm {
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: var(--su-font-size-sm);

    @include up('sm') {
      font-size: var(--su-font-size-xs);
    }
  }

  &--lg {
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    font-size: var(--su-font-size-base);
  }

  // Place réservée au bouton de fermeture
  &--dismissible {
    padding-inline-end: 2.75rem;
  }

  // ### Contenu

  // L'icône est centrée sur la première ligne du texte
  &__icon-wrapper {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 1.4em;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }

  &--lg &__icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }

  &__title {
    font-weight: var(--su-font-weight-medium);
  }

  &__description {
    color: var(--su-text-secondary);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  // ### Bouton de fermeture

  &__dismiss-button {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
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

  &__dismiss-icon {
    width: 1rem;
    height: 1rem;
  }

  @include high-contrast {
    border-width: 2px;
  }
}
</style>
