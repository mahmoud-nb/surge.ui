<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import FormField from '@/components/atoms/FormField.vue'
import CheckboxGroup, { CheckboxGroupProps } from '../atoms/CheckboxGroup.vue'
import type { FormFieldProps } from '@/components/atoms/FormField.vue'

export type CheckboxGroupFieldProps = FormFieldProps & CheckboxGroupProps

export interface Props extends Omit<CheckboxGroupFieldProps, 'value'> {}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  size: 'md',
  state: 'default',
  disabled: false,
  required: false,
  displayType: 'default',
  direction: 'vertical'
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<(string | number)[]>({ default: () => [] })

const emit = defineEmits<{
  change: [value: (string | number)[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

// Génération d'IDs uniques
const fieldId = 'checkbox-group-' + useId()
const checkboxGroupId = computed(() => attrs.id as string || fieldId)

const checkboxGroupProps = computed(() => {
  const { label, message, ...rest } = props
  return rest
})
</script>

<template>
  <FormField
    :fieldId="checkboxGroupId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <CheckboxGroup 
        :id="id"
        :model-value="modelValue"
        :aria-describedby="messageId"
        v-bind="checkboxGroupProps"
        @change="$emit('change', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
    </template>
  </FormField>
</template>