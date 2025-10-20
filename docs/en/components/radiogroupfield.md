# SuRadioGroup

SuRadioGroup component for single selection with two display styles: classic or cards. Complete accessibility support according to W3C standards.

## Usage examples

### Basic SuRadioGroup

<div class="component-demo">
  <div class="demo-section">
    <h4>Default style</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        label="Single selection"
        name="basic-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const selectedValue = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuRadioGroupField 
    :options="options"
    label="Single selection"
    name="basic-radio"
    v-model="selectedValue"
  />
</template>
```

### Card style

<div class="component-demo">
  <div class="demo-section">
    <h4>Block cards</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { 
            value: 'basic', 
            label: 'Basic Plan', 
            description: 'Basic features to get started'
          },
          { 
            value: 'pro', 
            label: 'Pro Plan', 
            description: 'Advanced features for professionals'
          },
          { 
            value: 'enterprise', 
            label: 'Enterprise Plan', 
            description: 'Complete solution for large companies'
          }
        ]"
        displayType="block-card"
        label="Subscription plan"
        name="plan-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
    :options="[
      { 
        value: 'basic', 
        label: 'Basic Plan', 
        description: 'Basic features to get started'
      },
      { 
        value: 'pro', 
        label: 'Pro Plan', 
        description: 'Advanced features for professionals'
      },
      { 
        value: 'enterprise', 
        label: 'Enterprise Plan', 
        description: 'Complete solution for large companies'
      }
    ]"
    displayType="block-card"
    label="Subscription plan"
    name="plan-radio"
    v-model="selectedPlan"
  />
</template>
```

### Inline cards

<div class="component-demo">
  <div class="demo-section">
    <h4>Inline cards</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'small', label: 'Small', description: 'Up to 5 users' },
          { value: 'medium', label: 'Medium', description: 'Up to 25 users' },
          { value: 'large', label: 'Large', description: 'Unlimited users' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        label="Team size"
        name="team-size-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroupField 
    :options="[
      { value: 'small', label: 'Small', description: 'Up to 5 users' },
      { value: 'medium', label: 'Medium', description: 'Up to 25 users' },
      { value: 'large', label: 'Large', description: 'Unlimited users' }
    ]"
    displayType="inline-card"
    direction="horizontal"
    label="Team size"
    name="team-size-radio"
    v-model="teamSize"
  />
</template>
```

### With icons

<div class="component-demo">
  <div class="demo-section">
    <h4>Options with icons</h4>
    <div class="demo-inputs">
      <SuRadioGroupField 
        :options="[
          { value: 'user', label: 'Individual', icon: 'UserIcon' },
          { value: 'business', label: 'Business', icon: 'BuildingOfficeIcon' },
          { value: 'organization', label: 'Organization', icon: 'GlobeAltIcon' }
        ]"
        displayType="block-card"
        label="Account type"
        name="account-type-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const accountType = ref('')
const accountOptions = [
  { value: 'user', label: 'Individual', icon: UserIcon },
  { value: 'business', label: 'Business', icon: BuildingOfficeIcon },
  { value: 'organization', label: 'Organization', icon: GlobeAltIcon }
]
</script>

<template>
  <SuRadioGroupField 
    :options="accountOptions"
    displayType="block-card"
    label="Account type"
    name="account-type-radio"
    v-model="accountType"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `RadioOption[]` | `[]` | List of radio options |
| `value` | `string \| number` | `undefined` | Selected value |
| `name` | `string` | `undefined` | Radio group name (auto-generated if not provided) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Element size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the entire group |
| `required` | `boolean` | `false` | Required field |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Display type |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Group direction |
| `maxHeight` | `string` | `null` | Maximum height with automatic scroll |
| `label` | `string` | `undefined` | Group label |
| `message` | `string` | `undefined` | Displayed message |

### Option types

#### RadioOption
```typescript
interface RadioOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
  icon?: Component
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:value` | `(value: string \| number) => void` | Emitted when value changes |
| `@change` | `(value: string \| number) => void` | Emitted on change |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

## Accessibility

The RadioGroup component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Fieldset and Legend**: Correct semantic structure with `<fieldset>` and `<legend>`
- **ARIA attributes**: `role="radiogroup"`, `aria-required`, `aria-invalid`
- **Keyboard navigation**: Support for arrow keys, Tab, Space
- **Associated labels**: Each radio has a properly associated label
- **State messages**: Messages with `aria-live` for screen readers
- **Visible focus**: Clear and contrasted focus indicators
- **Color contrast**: WCAG AA compliant ratios
- **Logical grouping**: Options semantically grouped

### 🎯 Best practices

```vue
<!-- RadioGroup with validation -->
<SuRadioGroupField 
  :options="options"
  :required="true"
  label="Payment method"
  name="payment-method"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Please select a payment method' : undefined"
  v-model="paymentMethod"
/>

<!-- RadioGroup with cards and descriptions -->
<SuRadioGroupField 
  :options="planOptions"
  displayType="block-card"
  label="Subscription plan"
  name="subscription-plan"
  message="Choose the plan that fits your needs"
  v-model="selectedPlan"
/>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from group |
| `Arrows` | Navigate between group options |
| `Space` | Select focused option |

## Advanced usage examples

### Configuration form

```vue
<script setup>
import { ref } from 'vue'
import { CogIcon, UserIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const theme = ref('light')
const privacy = ref('public')

const themeOptions = [
  { value: 'light', label: 'Light', description: 'Light interface' },
  { value: 'dark', label: 'Dark', description: 'Dark interface' },
  { value: 'auto', label: 'Auto', description: 'Follow system preferences' }
]

const privacyOptions = [
  { value: 'public', label: 'Public', icon: UserIcon },
  { value: 'private', label: 'Private', icon: ShieldCheckIcon }
]
</script>

<template>
  <form class="space-y-6">
    <SuRadioGroupField 
      :options="themeOptions"
      displayType="block-card"
      label="Theme"
      name="theme"
      v-model="theme"
    />
    
    <SuRadioGroupField 
      :options="privacyOptions"
      displayType="inline-card"
      direction="horizontal"
      label="Privacy"
      name="privacy"
      v-model="privacy"
    />
  </form>
</template>
```