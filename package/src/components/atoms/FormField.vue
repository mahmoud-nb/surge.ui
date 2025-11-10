<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import type { FormFieldProps } from '@/types'

const props = withDefaults(defineProps<FormFieldProps>(), {
  state: 'default',
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
  'su-form-field-message',
  `su-form-field-message--${props.state}`
])

const labelClasses = computed(() => [
  'su-form-field-label',
  {
    'su-form-field-label--required': props.required,
    'su-form-field-label--disabled': props.disabled
  }
])
</script>

<template>
  <div class="su-form-field-wrapper">
    <!-- Label -->
    <label 
      v-if="label" 
      :for="formFieldId" 
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="su-indicator-required" aria-label="requis">*</span>
    </label>

    <!-- Slot pour l'élément de formulaire -->
    <slot 
      :fieldId="formFieldId"
      :messageId="messageId"
    />

    <!-- Message d'aide/erreur/succès -->
    <div v-if="message" :id="messageId" :class="messageClasses" v-bind="messageAriaAttributes">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-form-field-wrapper {
  @include su-form-field-wrapper;
}

.su-form-field-label {
  @include su-form-field-label;
}

.su-form-field-message {
  @include su-form-field-message;
}

// Inclusion des modes sombre et contraste élevé pour les champs de formulaire
@include dark-mode-form-field;
@include high-contrast-form-field;
</style>