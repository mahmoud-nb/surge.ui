<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import type { FormFieldProps } from '@/types'

// L'id du consommateur identifie le contrôle, pas le conteneur : on ne le rend
// pas sur la racine pour éviter les ID dupliqués.
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FormFieldProps>(), {
  state: 'default',
  size: 'md',
  required: false,
  disabled: false,
  message: '',
  requiredText: 'requis'
})

const attrs = useAttrs()
const uniqueId = 'su-form-field-' + useId()
const formFieldId = computed(() => props.fieldId || (attrs.id as string) || uniqueId)
const labelId = computed(() => `${formFieldId.value}-label`)

const rootAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = attrs
  return rest
})

// Génération de l'ID du message si nécessaire
const messageId = computed(() => props.message ? `${formFieldId.value}-message` : undefined)

// Une erreur est annoncée dès son apparition ; les autres messages sont lus
// via aria-describedby lorsque le champ reçoit le focus.
const messageAriaAttributes = computed(() => {
  const attrs: Record<string, string> = {}

  if (props.state === 'error') {
    attrs.role = 'alert'
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
  <div
    :class="['su-form-field', `su-form-field--${props.size}`]"
    v-bind="rootAttrs"
  >
    <!-- Label -->
    <slot
      name="label"
      :label="label"
      :field-id="formFieldId"
      :label-id="labelId"
      :state="state"
      :size="size"
      :required="required"
      :disabled="disabled"
    >
      <label
        v-if="label"
        :id="labelId"
        :for="formFieldId"
        :class="labelClasses"
      >
        {{ label }}
        <!-- L'état requis est annoncé par aria-required sur le contrôle -->
        <span
          v-if="required"
          class="su-indicator-required"
          aria-hidden="true"
          :title="requiredText"
        >*</span>
      </label>
    </slot>

    <!-- Slot pour l'élément de formulaire -->
    <slot
      :field-id="formFieldId"
      :label-id="label ? labelId : undefined"
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
@use '../../styles/abstracts' as *;

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
      color: var(--su-state-error-fg);
    }
    
    &--success {
      color: var(--su-state-success-fg);
    }
    
    &--warning {
      color: var(--su-state-warning-fg);
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
</style>