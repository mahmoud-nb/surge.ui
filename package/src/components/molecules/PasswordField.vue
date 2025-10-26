<script setup lang="ts">
import { computed } from 'vue'
import  FormField, { FormFieldProps } from '../atoms/FormField.vue';
import Password, { PasswordProps, PasswordValidation } from './Password.vue';

export type PasswordFieldProps = FormFieldProps & PasswordProps

const props = withDefaults(defineProps<PasswordFieldProps>(), {
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  showProgress: false,
  showToggle: true,
  rules: () => ({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minDigits: 1,
    minSpecialChars: 1
  })
})

const emit = defineEmits<{
  validation: [validation: PasswordValidation]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
  'toggle-visibility': [visible: boolean]
  //'update:modelValue': [value: string]
}>()

// Utilisation de defineModel pour v-model
const modelValue = defineModel<string>({ default: '' })

const passwordProps = computed(() => {
  console.log('PasswordField::::', props, modelValue.value)
  const { label, message, ...rest } = props
  return rest
})

const handleInput = (event: Event) => {
  //console.log('PasswordField handleInput', (event.target as HTMLInputElement).value)
  modelValue.value = (event.target as HTMLInputElement).value
  emit('input', event)
}
</script>

<template>
  <FormField
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId, messageId }">
      <Password 
        :id="fieldId"
        v-model="modelValue"
        v-bind="{ ...passwordProps }"
        :aria-describedby="messageId"
        @toggle-visibility="$emit('toggle-visibility', $event)"
        @input="handleInput"
        @change="$emit('change', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keydown="$emit('keydown', $event)"
        @keyup="$emit('keyup', $event)"
      />
    </template>
  </FormField>
</template>