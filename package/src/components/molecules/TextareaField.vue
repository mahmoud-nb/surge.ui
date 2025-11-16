<script setup lang="ts">
import { computed, ref, useId, useAttrs } from 'vue'
import FormField from '../atoms/FormField.vue'
import Textarea from '../atoms/Textarea.vue';
import type { TextareaFieldProps } from '@/types'

const props = withDefaults(defineProps<TextareaFieldProps>(), {
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  rows: 3,
  minRows: 2,
  maxRows: 10,
  showCounter: false,
  autoResize: false,
  spellcheck: true,
  wrap: 'soft'
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<string>({ default: '' })

const emit = defineEmits<{
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const attrs = useAttrs()
const fieldId = 'textarea-' + useId()
const textareaId = computed(() => attrs.id as string || fieldId)

const textareaProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, value, ...rest } = props
  return rest
})

// Gestionnaires d'événements
const handleInput = (event: Event) => emit('input', event)
const handleChange = (event: Event) => emit('change', event)
const handleFocus = (event: FocusEvent) => emit('focus', event)
const handleBlur = (event: FocusEvent) => emit('blur', event)
const handleKeydown = (event: KeyboardEvent) => emit('keydown', event)
const handleKeyup = (event: KeyboardEvent) => emit('keyup', event)

// Méthodes exposées
const textareaRef = ref<InstanceType<typeof Textarea>>()

const focus = () => textareaRef.value?.focus()
const select = () => textareaRef.value?.select()

defineExpose({
  focus,
  select,
  textareaRef: textareaRef?.value?.textareaRef
})
</script>

<template>
  <FormField
    :field-id="textareaId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ messageId }">
      <Textarea
        :id="textareaId"
        ref="textareaRef"
        :value="modelValue"
        :aria-describedby="messageId"
        v-bind="{ ...textareaProps }"

        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
      />
    </template>
  </FormField>
</template>
