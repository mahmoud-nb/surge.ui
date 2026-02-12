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

    @include su-text('sm', 'primary', 'medium', 'tight');
    
    // TODO : Removed individual properties in favor of mixin
    //font-size: var(--su-font-size-sm);
    //font-weight: 500;
    //color: var(--su-text-primary);
    //line-height: var(--su-line-height-tight);

    &--required {
      .su-indicator-required {
        color: var(--su-state-error);
        margin-inline-start: 0.125rem;
      }
    }
    
    &--disabled {
      color: var(--su-text-tertiary);
      cursor: not-allowed;
    }
  }

  &__message {
    font-size: var(--su-font-size-sm);
    line-height: var(--su-line-height-tight);

    &--default {
      color: var(--su-text-secondary);
    }
    
    &--error {
      color: var(--su-error-600);
    }
    
    &--success {
      color: var(--su-success-600);
    }
    
    &--warning {
      color: var(--su-warning-600);
    }
  }

  &--sm {
    #{$self}__label {
      font-size: var(--su-font-size-sm);
    }
    #{$self}__message {
      font-size: var(--su-font-size-sm);
    } 
  }

  &--md {
    #{$self}__label {
      font-size: var(--su-font-size-base);
    }
    #{$self}__message {
      font-size: var(--su-font-size-base);
    } 
  }

  &--lg {
    #{$self}__label {
      font-size: var(--su-font-size-lg);
    }
    #{$self}__message {
      font-size: var(--su-font-size-lg);
    } 
  }
}

// TODO : Removed individual properties in favor of mixin
@media (prefers-contrast: high) {
  .su-form-field-container {
    border-width: 2px;
    
    &:focus-within {
      border-width: 3px;
    }
  }
}
</style>