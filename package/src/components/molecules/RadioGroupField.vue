<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import FormField from '@/components/atoms/FormField.vue'
import RadioGroup from '../atoms/RadioGroup.vue'
import type { RadioGroupFieldProps } from '@/types'

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
  // modelValue (déclaré par defineModel) passe par v-model : il ne doit pas écraser la liaison
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, modelValue: _modelValue, ...rest } = props as typeof props & { modelValue?: unknown }
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
    :field-id="groupId"
    :label="label"
    :message="message"
    :state="state"
    :size="size"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, labelId, messageId }">
      <RadioGroup
        :id="id"
        :model-value="modelValue"
        v-bind="radioGroupProps"
        :aria-labelled-by="ariaLabelledBy || labelId"
        :aria-described-by="[ariaDescribedBy, messageId].filter(Boolean).join(' ') || undefined"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </FormField>
</template>