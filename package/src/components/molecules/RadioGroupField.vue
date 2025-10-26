<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import FormField, { FormFieldProps } from '@/components/atoms/FormField.vue'
import RadioGroup, { RadioGroupProps } from '../atoms/RadioGroup.vue'

export type RadioGroupFieldProps = FormFieldProps & RadioGroupProps

export interface Props extends Omit<RadioGroupFieldProps, 'value'> {}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  size: 'md',
  state: 'default',
  disabled: false,
  required: false,
  displayType: 'default',
  direction: 'vertical',
  maxHeight: null,
})

// Définition du modèle en premier
const modelValue = defineModel<string | number>('modelValue')

const emit = defineEmits<{
  change: [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

// Génération d'IDs uniques
const fieldId = 'radio-group-' + useId()
const groupId = computed(() => attrs.id as string || fieldId)

const radioGroupProps = computed(() => {
  const { label, message, ...rest } = props
  return rest
})

// Gestionnaires d'événements
const handleChange = (value: string | number) => {
  if (props.disabled) return
  
  modelValue.value = value
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <FormField
    :fieldId="groupId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <RadioGroup
        :id="id"
        :model-value="modelValue"
        :aria-describedby="messageId"
        v-bind="radioGroupProps"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </FormField>
</template>