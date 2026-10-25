<script setup lang="ts">
import { computed, shallowRef, useAttrs, useId, useSlots } from 'vue'
import type { FormFieldProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { provideFormField, type FormFieldControl } from '@/composables/useFormField'

// L'id du consommateur identifie le contrôle, pas le conteneur : on ne le rend
// pas sur la racine pour éviter les ID dupliqués.
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FormFieldProps>(), {
  state: 'default',
  size: 'md',
  required: false,
  disabled: false,
  message: ''
})

// Textes par défaut : prop explicite, sinon locale courante
const { t } = useLocale()
const requiredTitle = computed(() => props.requiredText ?? t('formField.required'))

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

// Contexte du champ : le contrôle placé dans le slot s'y relie seul
// (id, label, message, états) grâce à useFormField
const slots = useSlots()
const control = shallowRef<FormFieldControl | null>(null)

provideFormField({
  id: formFieldId,
  labelId: computed(() => (props.label || slots.label) ? labelId.value : undefined),
  messageId,
  state: computed(() => props.state),
  size: computed(() => props.size),
  required: computed(() => props.required),
  disabled: computed(() => props.disabled),
  registerControl(registered) {
    control.value = registered
    return () => {
      if (control.value === registered) control.value = null
    }
  }
})

// Un <label for> ne cible pas un contrôle non natif (combobox en div,
// groupe de cases) : le clic lui donne le focus à la place
const handleLabelClick = (event: MouseEvent) => {
  const current = control.value
  if (current && !current.labelable && current.focus) {
    event.preventDefault()
    current.focus()
  }
}

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
        @click="handleLabelClick"
      >
        {{ label }}
        <!-- L'état requis est annoncé par aria-required sur le contrôle -->
        <span
          v-if="required"
          class="su-indicator-required"
          aria-hidden="true"
          :title="requiredTitle"
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

  // Label medium, message discret en text-xs
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__label {
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
    font-weight: var(--su-font-weight-medium);
    line-height: 1.125;
    color: var(--su-text-primary);

    .su-indicator-required {
      color: var(--su-state-error-fg);
    }

    &--disabled {
      opacity: var(--su-opacity-disabled);
      cursor: not-allowed;
    }
  }

  &__message {
    margin-top: -0.125rem;
    line-height: var(--su-line-height-normal);

    &--default {
      color: var(--su-text-tertiary);
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

  // Le label suit la typo des contrôles : 16px sur mobile, 14px dès sm
  &--sm {
    #{$self}__label { font-size: var(--su-font-size-sm); }
    #{$self}__message { font-size: var(--su-font-size-xs); }
  }

  &--md {
    #{$self}__label {
      font-size: var(--su-font-size-base);

      @include up('sm') {
        font-size: var(--su-font-size-sm);
      }
    }

    #{$self}__message { font-size: var(--su-font-size-xs); }
  }

  &--lg {
    #{$self}__label { font-size: var(--su-font-size-base); }
    #{$self}__message { font-size: var(--su-font-size-sm); }
  }
}
</style>
