# useFormField

Links a control to the surrounding [SuFormField](/en/components/formfield): id (label target), label, help message and field states. SurgeUI controls already use it; this composable is for your own controls.

## Nothing to do

A SurgeUI control placed in a SuFormField slot is linked automatically, with no `slotProps`:

```vue
<SuFormField label="Email" message="Work address" state="error" required>
  <SuInput v-model="email" type="email" />
</SuFormField>
```

Result: `<label for>` targets the input, `aria-describedby` points to the message, `aria-invalid` and `aria-required` are set, the error state and size are inherited.

## In a custom control

```vue
<!-- ColorField.vue -->
<script setup lang="ts">
import { useFormField } from '@surgeui/ds-vue'

const props = withDefaults(defineProps<{
  state?: 'default' | 'error' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
}>(), { state: 'default', size: 'md' })

const model = defineModel<string>()

const { id, state, disabled, required, describedBy } = useFormField(props, {
  idPrefix: 'color'
})
</script>

<template>
  <input
    :id="id"
    v-model="model"
    type="color"
    :disabled="disabled"
    :aria-required="required || undefined"
    :aria-invalid="state === 'error' || undefined"
    :aria-describedby="describedBy"
  >
</template>
```

```vue
<SuFormField label="Primary color" message="Used for buttons">
  <ColorField v-model="color" />
</SuFormField>
```

### Control a label cannot target

A `<label for>` only targets native elements (input, select, textarea, button). For a control built from a `div` (combobox, group, slider), declare it non-labelable: it then receives `aria-labelledby` pointing to the label, and clicking the label focuses it.

```ts
const rootRef = ref<HTMLElement>()

const { labelledBy } = useFormField(props, {
  labelable: false,
  focus: () => rootRef.value?.focus()
})
```

## Precedence

| Value | Rule |
|-------|------|
| `id` | the control's `id` attribute, else the field's, else generated (`idPrefix`) |
| `state`, `size` | the control's value when it differs from the default (`default`, `md`), else the field's |
| `disabled`, `required` | true when the control **or** the field is |
| `describedBy` | the control's `aria-describedby` + the field message, without duplicates |
| `labelledBy` | the control's `aria-labelledby`, else the field label (non-labelable control) |

A field links a single control: for several controls, use [FormFieldGroup](/en/components/formfieldgroup).

## API

```ts
useFormField(props, options?)
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `labelable` | `boolean` | `true` | The control can be targeted by `<label for>` |
| `focus` | `() => void` | — | Focuses the control (label click on a non-labelable control) |
| `idPrefix` | `string` | — | Prefix of the id generated outside a field; without it, no id is generated |

### Return

| Property | Type | Description |
|----------|------|-------------|
| `field` | `FormFieldContext \| null` | Field context, or `null` outside SuFormField |
| `id` | `ComputedRef<string \| undefined>` | Control id |
| `state` | `ComputedRef<State>` | Effective state |
| `size` | `ComputedRef<Size>` | Effective size |
| `disabled` | `ComputedRef<boolean>` | Disabled |
| `required` | `ComputedRef<boolean>` | Required |
| `describedBy` | `ComputedRef<string \| undefined>` | `aria-describedby` value |
| `labelledBy` | `ComputedRef<string \| undefined>` | `aria-labelledby` value |

### Other exports

| Export | Description |
|--------|-------------|
| `mergeIds(...ids)` | Joins id lists without duplicates or empty values |
| `provideFormField(context)` / `FormFieldKey` | Provide the context from your own field component |
