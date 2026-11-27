<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import FormField from '../atoms/FormField.vue'
import NumberInput from '../atoms/NumberInput.vue'
import type { NumberInputFieldProps } from '@/types'

// class/style décorent le conteneur FormField, le reste va sur le champ
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberInputFieldProps>(), {
  step: 1,
  controls: true,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false
})

const modelValue = defineModel<number | null>({ default: null })

const emit = defineEmits<{
  change: [value: number | null]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const fieldId = 'number-input-' + useId()
const inputId = computed(() => (attrs.id as string) || fieldId)

const inputProps = computed(() => {
  // modelValue passe par v-model ; label et message restent au FormField
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, requiredText, fieldId: _fieldId, modelValue: _modelValue, ...rest } = props as typeof props & { modelValue?: unknown }
  return rest
})

const inputAttrs = computed(() => {
  const { class: _class, style: _style, id: _id, ...rest } = attrs
  return rest
})

const inputRef = ref<InstanceType<typeof NumberInput>>()

defineExpose({
  focus: () => inputRef.value?.focus(),
  increment: () => inputRef.value?.increment(),
  decrement: () => inputRef.value?.decrement()
})
</script>

<template>
  <FormField
    :field-id="inputId"
    :class="$attrs.class"
    :style="$attrs.style"
    :label="label"
    :message="message"
    :state="state"
    :size="size"
    :required="required"
    :disabled="disabled"
    :required-text="requiredText"
  >
    <NumberInput
      ref="inputRef"
      v-model="modelValue"
      v-bind="{ ...inputAttrs, ...inputProps }"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
  </FormField>
</template>
