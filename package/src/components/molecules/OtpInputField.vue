<script setup lang="ts">
import { computed, ref, useId, useAttrs } from 'vue'
import FormField from '../atoms/FormField.vue'
import OtpInput from './OtpInput.vue'
import type { OtpInputFieldProps } from '@/types'

const props = withDefaults(defineProps<OtpInputFieldProps>(), {
  length: 6,
  variant: 'boxes',
  inputType: 'numeric',
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  masked: false,
  autoSubmit: false,
  autoFocus: false,
  placeholder: '',
  separator: '-',
})

const modelValue = defineModel<string>({ default: '' })

const emit = defineEmits<{
  complete: [value: string]
  change: [value: string]
  focus: [event: FocusEvent, index: number]
  blur: [event: FocusEvent, index: number]
}>()

const attrs = useAttrs()
const fieldId = 'otp-input-' + useId()
const otpId = computed(() => (attrs.id as string) || fieldId)

const otpInputProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, fieldId: _fieldId, requiredText, ...rest } = props
  return rest
})

// Méthodes exposées
const otpInputRef = ref<InstanceType<typeof OtpInput>>()

const focus = () => otpInputRef.value?.focus()
const clear = () => otpInputRef.value?.clear()

defineExpose({
  focus,
  clear,
})
</script>

<template>
  <FormField
    :field-id="otpId"
    :label="label"
    :message="message"
    :state="state"
    :size="size"
    :required="required"
    :disabled="disabled"
    :required-text="requiredText"
  >
    <template #default="{ messageId }">
      <OtpInput
        ref="otpInputRef"
        v-model="modelValue"
        :aria-describedby="messageId"
        v-bind="otpInputProps"
        @complete="emit('complete', $event)"
        @change="emit('change', $event)"
        @focus="(e: FocusEvent, i: number) => emit('focus', e, i)"
        @blur="(e: FocusEvent, i: number) => emit('blur', e, i)"
      />
    </template>
  </FormField>
</template>
