<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Cart', description: '3 items' },
  { label: 'Shipping', description: 'Address and method' },
  { label: 'Payment', description: 'Card or transfer' },
  { label: 'Confirmation' }
]
const current = ref(1)
const currentVertical = ref(1)
</script>

# Stepper

Progress through a multi-step flow (checkout, sign-up, setup wizard).

## Usage

### Horizontal

With `clickable`, completed steps become buttons to go back.

<div class="component-demo">
  <div class="demo-section">
    <SuStepper v-model="current" :steps="steps" clickable />
    <div class="demo-buttons" style="margin-top: 1.5rem">
      <SuButton variant="outline" :disabled="current === 0" @click="current--">Previous</SuButton>
      <SuButton :disabled="current === steps.length - 1" @click="current++">Next</SuButton>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const steps = [
  { label: 'Cart', description: '3 items' },
  { label: 'Shipping', description: 'Address and method' },
  { label: 'Payment', description: 'Card or transfer' },
  { label: 'Confirmation' }
]
const current = ref(1)
</script>

<template>
  <SuStepper v-model="current" :steps="steps" clickable />
</template>
```

### Vertical with content

The `content` slot shows under the current step.

<div class="component-demo">
  <div class="demo-section">
    <div style="max-width: 24rem">
      <SuStepper v-model="currentVertical" :steps="steps" orientation="vertical">
        <template #content="{ step }">
          <p style="margin: 0 0 0.75rem">Content of the “{{ step.label }}” step.</p>
          <SuButton size="sm" :disabled="currentVertical === steps.length - 1" @click="currentVertical++">Continue</SuButton>
        </template>
      </SuStepper>
    </div>
  </div>
</div>

```vue
<SuStepper v-model="current" :steps="steps" orientation="vertical">
  <template #content="{ step }">
    <p>Content of the “{{ step.label }}” step.</p>
    <SuButton size="sm" @click="current++">Continue</SuButton>
  </template>
</SuStepper>
```

### Step with an error

<div class="component-demo">
  <div class="demo-section">
    <SuStepper :model-value="2" :steps="[steps[0], { ...steps[1], error: true, description: 'Invalid postcode' }, steps[2], steps[3]]" />
  </div>
</div>

```vue
<SuStepper v-model="current" :steps="[
  { label: 'Cart' },
  { label: 'Shipping', error: true, description: 'Invalid postcode' },
  { label: 'Payment' }
]" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | Current step, from 0 (v-model) |
| `steps` | `StepItem[]` | `[]` | Steps |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `clickable` | `boolean` | `false` | Completed steps are clickable |
| `linear` | `boolean` | `true` | `false`: with `clickable`, upcoming steps are clickable too |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `ariaLabel` | `string` | `'Steps'` (locale) | List name |

### StepItem

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Label |
| `description` | `string` | Secondary text |
| `error` | `boolean` | Step that needs attention |
| `disabled` | `boolean` | Step that cannot be clicked |
| `icon` | `Component` | Icon instead of the number |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | New step (v-model) |
| `change` | `number` | Step picked with a click |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `content` | `{ step, index }` | Content under the current step (vertical) |

## Accessibility

- Named ordered list ("Steps"): the position ("2 of 4") comes from the list.
- The current step has `aria-current="step"`.
- The status is read after the label: "Cart, completed", "Shipping, needs attention".
- Clickable steps are real buttons; the others are not focusable.
- On mobile (horizontal), only the current step label stays visible; the others are still read.
