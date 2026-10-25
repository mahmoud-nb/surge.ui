<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import FormField  from '@/components/atoms/FormField.vue'
import Switch from '../atoms/Switch.vue'
import { SwitchFieldProps } from '@/types'

const props = withDefaults(defineProps<SwitchFieldProps>(), {
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

const switchProps = computed(() => {
  // modelValue (déclaré par defineModel) passe par v-model : il ne doit pas écraser la liaison
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, modelValue: _modelValue, ...rest } = props as typeof props & { modelValue?: unknown }
  return rest
})
</script>

<template>
  <FormField
    :field-id="switchId"
    :label="label"
    :message="message"
    :state="state"
    :size="size"
    :required="required"
    :disabled="disabled"
  >
    <template #default>
      <Switch
        v-model="modelValue"
        v-bind="{ ...switchProps }"
        @change="(value) => emit('change', value)"
        @focus="(event) => emit('focus', event)"
        @blur="(event) => emit('blur', event)"
        @keydown="(event) => emit('keydown', event)"
      />
    </template>
  </FormField>
</template>