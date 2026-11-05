# Checkbox

A single checkbox built on a native `<input type="checkbox">`. It supports a label, a description and a mixed state for "select all" checkboxes, and links itself to a parent `SuFormField`.

For a list of options, use [CheckboxGroup](/en/components/checkbox-group).

## Usage

### Basic checkbox

<div class="component-demo">
  <div class="demo-section">
    <h4>With a label</h4>
    <div class="demo-buttons-vertical">
      <SuCheckbox label="Subscribe to the newsletter" />
      <SuCheckbox label="Remember me" :model-value="true" />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const newsletter = ref(false)
</script>

<template>
  <SuCheckbox v-model="newsletter" label="Subscribe to the newsletter" />
</template>
```

### With a description

The description is linked to the checkbox with `aria-describedby`.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuCheckbox label="Email notifications" description="A weekly summary of your projects' activity." />
    </div>
  </div>
</div>

```vue
<SuCheckbox
  v-model="notifications"
  label="Email notifications"
  description="A weekly summary of your projects' activity."
/>
```

### Mixed state (select all)

`v-model:indeterminate` shows a dash and is announced as "partially checked". The first click clears it.

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical">
      <SuCheckbox label="All languages" :model-value="false" :indeterminate="true" />
      <SuCheckbox label="French" :model-value="true" style="margin-inline-start: 1.625rem" />
      <SuCheckbox label="English" style="margin-inline-start: 1.625rem" />
    </div>
  </div>
</div>

```vue
<script setup>
import { computed, ref } from 'vue'

const languages = ref([
  { id: 'fr', label: 'French', checked: true },
  { id: 'en', label: 'English', checked: false }
])
const count = computed(() => languages.value.filter((l) => l.checked).length)
const all = computed({
  get: () => count.value === languages.value.length,
  set: (value) => languages.value.forEach((l) => (l.checked = value))
})
const partial = computed(() => count.value > 0 && count.value < languages.value.length)
</script>

<template>
  <SuCheckbox v-model="all" :indeterminate="partial" label="All languages" />
  <SuCheckbox v-for="l in languages" :key="l.id" v-model="l.checked" :label="l.label" />
</template>
```

### Cards

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons-vertical" style="max-width: 22rem">
      <SuCheckbox display-type="block-card" label="Daily backup" description="Kept for 30 days." :model-value="true" />
      <SuCheckbox display-type="block-card" label="Priority support" description="Reply within 4 business hours." />
    </div>
  </div>
</div>

```vue
<SuCheckbox v-model="backup" display-type="block-card" label="Daily backup" description="Kept for 30 days." />
```

### Sizes and states

<div class="component-demo">
  <div class="demo-section">
    <div class="demo-buttons" style="align-items: center">
      <SuCheckbox size="sm" label="Small" :model-value="true" />
      <SuCheckbox size="md" label="Medium" :model-value="true" />
      <SuCheckbox size="lg" label="Large" :model-value="true" />
      <SuCheckbox state="error" label="Error" />
      <SuCheckbox disabled label="Disabled" />
    </div>
  </div>
</div>

```vue
<SuCheckbox size="sm" label="Small" />
<SuCheckbox state="error" label="Error" />
<SuCheckbox disabled label="Disabled" />
```

### In a FormField

The checkbox takes the field's id, message, state and required flag.

<div class="component-demo">
  <div class="demo-section">
    <SuFormField label="Terms" message="You must accept the terms." state="error" required>
      <SuCheckbox label="I accept the terms of use" />
    </SuFormField>
  </div>
</div>

```vue
<SuFormField label="Terms" message="You must accept the terms." state="error" required>
  <SuCheckbox v-model="accepted" label="I accept the terms of use" />
</SuFormField>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Checked state (v-model) |
| `indeterminate` | `boolean` | `false` | Mixed state (`v-model:indeterminate`), cleared on first click |
| `label` | `string` | - | Label (or default slot) |
| `description` | `string` | - | Help text linked with `aria-describedby` (or `description` slot) |
| `value` | `string \| number` | - | Value submitted with the form when checked |
| `name` | `string` | - | Form field name |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Validation state |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Plain or card display |
| `disabled` | `boolean` | `false` | Disables the checkbox |
| `required` | `boolean` | `false` | Required checkbox |
| `ariaLabel` | `string` | - | Accessible name of a checkbox without a label |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | New value (v-model) |
| `update:indeterminate` | `boolean` | End of the mixed state |
| `change` | `boolean` | Changed by the user |
| `focus` / `blur` | `FocusEvent` | Checkbox focus |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Label |
| `description` | Help text |

### Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the checkbox |

## Accessibility

- Native input, visually hidden but focusable: `Tab` to focus, `Space` to toggle.
- The mixed state uses the native `indeterminate` property, read as "partially checked" by screen readers.
- The description is linked with `aria-describedby`, like the parent `SuFormField` message.
- A checkbox without a visible label needs an `aria-label`.
- `error` state: `aria-invalid="true"`.
