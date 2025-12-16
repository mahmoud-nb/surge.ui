<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import type { FormFieldProps } from '@/types'

const props = withDefaults(defineProps<FormFieldProps>(), {
  state: 'default',
  size: 'md',
  required: false,
  disabled: false,
  message: ''
})

const attrs = useAttrs()
const uniqueId = 'su-form-field-' + useId()
const formFieldId = computed(() => (attrs.id as string) || props.fieldId || uniqueId)

// Génération de l'ID du message si nécessaire
const messageId = computed(() => props.message ? `${formFieldId.value}-message` : undefined)

// Attributs ARIA pour le message
const messageAriaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.state === 'error') {
    attrs['aria-live'] = 'assertive'
  } else if (props.state === 'success' || props.state === 'warning') {
    attrs['aria-live'] = 'polite'
  }
  
  return attrs
})

// Classes CSS
const messageClasses = computed(() => [
  'su-form-field__message',
  `su-form-field__message--${props.state}`
])

const labelClasses = computed(() => [
  'su-form-field__label',
  {
    'su-form-field__label--required': props.required,
    'su-form-field__label--disabled': props.disabled
  }
])
</script>

<template>
  <div :class="['su-form-field', `su-form-field--${props.size}`]">
    <!-- Label -->
    <slot 
      name="label"
      :label="label"
      :field-id="formFieldId"
      :state="state"
      :size="size"
      :required="required"
      :disabled="disabled"
    >
      <label 
        v-if="label" 
        :for="formFieldId" 
        :class="labelClasses"
      >
        {{ label }}
        <span
          v-if="required"
          class="su-indicator-required"
          aria-label="requis"
        >*</span>
      </label>
    </slot>

    <!-- Slot pour l'élément de formulaire -->
    <slot 
      :field-id="formFieldId"
      :message-id="messageId"
      :state="state"
      :size="size"
      :required="required"
      :disabled="disabled"
    />

    <!-- Message d'aide/erreur/succès -->
    <slot 
      name="message"
      :message="message"
      :message-id="messageId"
      :state="state"
      :size="size"
    >
      <div
        v-if="message"
        :id="messageId"
        :class="messageClasses"
        v-bind="messageAriaAttributes"
      >
        {{ message }}
      </div>
    </slot>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-form-field {
  $self: &;

  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  &__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text-primary;
    line-height: $line-height-tight;
    
    &--required {
      .su-indicator-required {
        color: $error-500;
        margin-left: 0.125rem;
      }
    }
    
    &--disabled {
      color: $text-tertiary;
      cursor: not-allowed;
    }
  }

  &__message {
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

  &--sm {
    #{$self}__label {
      font-size: $font-size-sm;
    }
    #{$self}__message {
      font-size: $font-size-sm;
    } 
  }

  &--md {
    #{$self}__label {
      font-size: $font-size-base;
    }
    #{$self}__message {
      font-size: $font-size-base;
    } 
  }

  &--lg {
    #{$self}__label {
      font-size: $font-size-lg;
    }
    #{$self}__message {
      font-size: $font-size-lg;
    } 
  }
}

@media (prefers-contrast: high) {
  .su-form-field-container {
    border-width: 2px;
    
    &:focus-within {
      border-width: 3px;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .su-form-field__label {
    color: $text-primary-dark;
    
    &--disabled {
      color: $text-tertiary-dark;
    }
  }
  
  .su-form-field-container {
    background-color: $gray-800;
    border-color: $gray-600;
    
    &--disabled {
      background-color: $gray-900;
      border-color: $gray-700;
    }
    
    &--readonly {
      background-color: $gray-900;
    }
  }
  
  .su-form-field-element {
    color: $text-primary-dark;
    
    &::placeholder {
      color: $text-tertiary-dark;
    }
    
    &--disabled {
      color: $text-tertiary-dark;
    }
  }
  
  .su-form-field__message {
    &--default {
      color: $text-secondary-dark;
    }
  }
}
</style>