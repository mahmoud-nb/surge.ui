<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import FormField from '@/components/atoms/FormField.vue'
import SelectBox from '@/components/atoms/SelectBox.vue'
import type { SelectBoxFieldProps } from '@/types'

const props = withDefaults(defineProps<SelectBoxFieldProps>(), {
  options: () => [],
  groups: () => [],
  multiple: false,
  searchable: false,
  clearable: false,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  placeholder: 'Sélectionnez une option...',
  searchPlaceholder: 'Rechercher...',
  noOptionsText: 'Aucune option disponible',
  noResultsText: 'Aucun résultat trouvé',
  maxHeight: '200px',
  textAlign: 'left',
  dir: 'auto',
  loading: false,
  closeOnSelect: true,
  maxSelectedItems: undefined
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<string | number | (string | number)[] | undefined>()

const emit = defineEmits<{
  change: [value: string | number | (string | number)[] | undefined]
  open: []
  close: []
  search: [query: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const fieldId = 'selectbox-' + useId()
const selectId = computed(() => attrs.id as string || fieldId)

const selectBoxProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, message, ...rest } = props
  return rest
})

// Méthodes exposées
const selectBoxRef = ref<InstanceType<typeof SelectBox>>()

const focus = () => selectBoxRef.value?.focus()
const open = () => selectBoxRef.value?.open()
const close = () => selectBoxRef.value?.close()

defineExpose({
  focus,
  open,
  close,
  selectRef: selectBoxRef?.value?.selectRef,
  inputRef: selectBoxRef?.value?.inputRef
})
</script>

<template>
  <FormField
    :field-id="selectId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <SelectBox
        :id="id"
        ref="selectBoxRef"
        v-model="modelValue"
        :aria-describedby="messageId"
        v-bind="{ ...selectBoxProps }"
        @change="emit('change', $event)"
        @open="emit('open')"
        @close="emit('close')"
        @search="emit('search', $event)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
    </template>
  </FormField>
</template>