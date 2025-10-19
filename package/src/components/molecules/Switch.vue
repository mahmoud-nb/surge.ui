<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import FormField, { FormFieldProps } from '@/components/atoms/FormField.vue'
import BaseSwitch, { BaseSwitchProps } from '../atoms/BaseSwitch.vue'

export type SwitchProps = FormFieldProps & BaseSwitchProps

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false
})

const modelValue = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  change: [value: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const attrs = useAttrs()

const fieldId = 'switch-' + useId()
const switchId = computed(() => attrs.id as string || fieldId)

const baseSwitchProps = computed(() => {
  const { label, message, ...rest } = props
  return rest
})
</script>

<template>
  <FormField
    :fieldId="switchId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <BaseSwitch
        :id="id"
        v-model="modelValue"
        :aria-describedby="messageId"
        v-bind="{ ...baseSwitchProps }"
        @change="(value) => emit('change', value)"
        @focus="(event) => emit('focus', event)"
        @blur="(event) => emit('blur', event)"
        @keydown="(event) => emit('keydown', event)"
      />
    </template>
  </FormField>
</template>