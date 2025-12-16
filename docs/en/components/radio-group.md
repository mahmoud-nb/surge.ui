# RadioGroup

RadioGroup component for single selection with two display styles: classic or cards. Complete accessibility support according to W3C standards.

## Description

`SuRadioGroup` is an enhanced single-selection component that allows choosing one option among several. It offers different display styles (classic, inline cards, block cards), supports icons and descriptions, and complies with all accessibility standards.

## Usage examples

### Simple usage (without SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Basic RadioGroup</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        name="basic-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedValue = ref('')
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]
</script>

<template>
  <SuRadioGroup 
    :options="options"
    name="basic-radio"
    v-model="selectedValue"
  />
</template>
```

### Block card style

<div class="component-demo">
  <div class="demo-section">
    <h4>Stacked cards</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
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
        name="plan-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedPlan = ref('')
</script>

<template>
  <SuRadioGroup 
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
    name="plan-radio"
    v-model="selectedPlan"
  />
</template>
```

### Inline cards

<div class="component-demo">
  <div class="demo-section">
    <h4>Horizontal cards</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'small', label: 'Small', description: 'Up to 5 users' },
          { value: 'medium', label: 'Medium', description: 'Up to 25 users' },
          { value: 'large', label: 'Large', description: 'Unlimited users' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        name="team-size-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const teamSize = ref('')
</script>

<template>
  <SuRadioGroup 
    :options="[
      { value: 'small', label: 'Small', description: 'Up to 5 users' },
      { value: 'medium', label: 'Medium', description: 'Up to 25 users' },
      { value: 'large', label: 'Large', description: 'Unlimited users' }
    ]"
    displayType="inline-card"
    direction="horizontal"
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
      <SuRadioGroup 
        :options="[
          { value: 'user', label: 'Individual', icon: 'UserIcon' },
          { value: 'business', label: 'Business', icon: 'BuildingOfficeIcon' },
          { value: 'organization', label: 'Organization', icon: 'GlobeAltIcon' }
        ]"
        displayType="block-card"
        name="account-type-radio"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { UserIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const accountType = ref('')
const accountOptions = [
  { value: 'user', label: 'Individual', icon: UserIcon },
  { value: 'business', label: 'Business', icon: BuildingOfficeIcon },
  { value: 'organization', label: 'Organization', icon: GlobeAltIcon }
]
</script>

<template>
  <SuRadioGroup 
    :options="accountOptions"
    displayType="block-card"
    name="account-type-radio"
    v-model="accountType"
  />
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="sm"
        name="size-sm-radio"
      />
      <SuRadioGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="md"
        name="size-md-radio"
      />
      <SuRadioGroup 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' }
        ]"
        size="lg"
        name="size-lg-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroup 
    :options="options"
    size="sm" 
    name="size-sm" 
  />
  
  <SuRadioGroup 
    :options="options"
    size="md" 
    name="size-md" 
  />
  
  <SuRadioGroup 
    :options="options"
    size="lg" 
    name="size-lg" 
  />
</template>
```

### States

<div class="component-demo">
  <div class="demo-section">
    <h4>Visual states</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="options"
        name="default-state"
      />
      <SuRadioGroup 
        :options="options"
        state="error"
        name="error-state"
      />
      <SuRadioGroup 
        :options="options"
        state="success"
        value="option1"
        name="success-state"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroup 
    :options="options"
    name="default"
  />
  
  <SuRadioGroup 
    :options="options"
    state="error"
    name="error"
  />
  
  <SuRadioGroup 
    :options="options"
    state="success"
    value="option1"
    name="success"
  />
</template>
```

### Horizontal direction

<div class="component-demo">
  <div class="demo-section">
    <h4>Horizontal layout</h4>
    <div class="demo-inputs">
      <SuRadioGroup 
        :options="[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'maybe', label: 'Maybe' }
        ]"
        direction="horizontal"
        name="horizontal-radio"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuRadioGroup 
    :options="[
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe', label: 'Maybe' }
    ]"
    direction="horizontal"
    name="horizontal-radio"
    v-model="acceptance"
  />
</template>
```

## Usage with SuFormField

The `SuRadioGroup` component can be used with `SuFormField` to benefit from a complete form structure with label, message and state management.

### Basic usage with SuFormField

```vue
<template>
  <SuFormField 
    label="Payment method" 
    message="Select your preferred payment method"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="paymentMethods"
        name="payment-method"
        v-bind="slotProps"
        v-model="selectedPayment"
      />
    </template>
  </SuFormField>
</template>
```

### With slot props destructuring

```vue
<template>
  <SuFormField 
    label="Subscription plan"
    :required="true"
    message="Choose your plan"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuRadioGroup 
        :options="plans"
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        displayType="block-card"
        name="subscription-plan"
        v-model="selectedPlan"
      />
    </template>
  </SuFormField>
</template>
```

### Validation with states

<div class="component-demo">
  <div class="demo-section">
    <h4>RadioGroup with validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Account type"
        :required="true"
        state="error"
        message="Please select an account type"
      >
        <template #default="slotProps">
          <SuRadioGroup 
            :options="[
              { value: 'individual', label: 'Individual' },
              { value: 'business', label: 'Business' },
              { value: 'organization', label: 'Organization' }
            ]"
            name="account-type"
            v-bind="slotProps"
          />
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref, computed } from 'vue'

const accountType = ref('')
const accountTypeError = ref('')

const validateAccountType = () => {
  if (!accountType.value) {
    accountTypeError.value = 'Please select an account type'
  } else {
    accountTypeError.value = ''
  }
}

const accountTypeState = computed(() => {
  if (!accountType.value) return 'default'
  return accountTypeError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="Account type"
    :required="true"
    :state="accountTypeState"
    :message="accountTypeError || 'Select the type that matches you'"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="accountTypes"
        name="account-type"
        v-bind="slotProps"
        v-model="accountType"
        @change="validateAccountType"
      />
    </template>
  </SuFormField>
</template>
```

### Cards with FormField

```vue
<template>
  <SuFormField 
    label="Team size"
    message="Select your team size"
    :required="true"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="[
          { value: 'small', label: 'Small', description: 'Up to 5 users' },
          { value: 'medium', label: 'Medium', description: 'Up to 25 users' },
          { value: 'large', label: 'Large', description: 'Unlimited users' }
        ]"
        displayType="inline-card"
        direction="horizontal"
        name="team-size"
        v-bind="slotProps"
        v-model="teamSize"
      />
    </template>
  </SuFormField>
</template>
```

### Custom label and message

```vue
<script setup>
import { CreditCardIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Payment method" 
    :required="true"
    message="Select your method"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <CreditCardIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuRadioGroup 
        :options="paymentMethods"
        displayType="block-card"
        name="payment-method"
        v-bind="slotProps"
        v-model="payment"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Please select a method</span>
        <span v-else>Choose how you want to pay</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### With icons and descriptions

```vue
<script setup>
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const plans = [
  { 
    value: 'basic', 
    label: 'Basic Plan', 
    description: 'Basic features - $9/month',
    icon: StarIcon 
  },
  { 
    value: 'pro', 
    label: 'Pro Plan', 
    description: 'Advanced features - $19/month',
    icon: BuildingOfficeIcon 
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise Plan', 
    description: 'Complete solution - $49/month',
    icon: GlobeAltIcon 
  }
]
</script>

<template>
  <SuFormField 
    label="Subscription plan"
    message="Choose the plan that fits your needs"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="plans"
        displayType="block-card"
        name="subscription-plan"
        v-bind="slotProps"
        v-model="selectedPlan"
      />
    </template>
  </SuFormField>
</template>
```

### Scroll with limited height

```vue
<template>
  <SuFormField 
    label="Country"
    message="List with limited height and automatic scroll"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="longCountriesList"
        maxHeight="180px"
        name="country"
        v-bind="slotProps"
        v-model="selectedCountry"
      />
    </template>
  </SuFormField>
</template>
```

### With before and after slots

```vue
<template>
  <SuFormField 
    label="Choose your plan"
    message="Available plans"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="planOptions"
        displayType="block-card"
        name="plan"
        v-bind="slotProps"
        v-model="plan"
      >
        <template #before>
          <div class="info-banner">
            🎯 Choose the plan that best fits your needs.
          </div>
        </template>
        <template #after>
          <div class="text-center mt-3">
            <a href="#" class="text-blue-600">Compare all plans →</a>
          </div>
        </template>
      </SuRadioGroup>
    </template>
  </SuFormField>
</template>
```

### Disabled field

```vue
<template>
  <SuFormField 
    label="Disabled option"
    :disabled="true"
    message="This field is not editable currently"
  >
    <template #default="slotProps">
      <SuRadioGroup 
        :options="options"
        value="option1"
        name="disabled"
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `RadioOption[]` | `[]` | List of radio options |
| `modelValue` | `string \| number` | `undefined` | Selected value (v-model) |
| `name` | `string` | `undefined` | Radio group name (auto-generated if not provided) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Element size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable entire group |
| `required` | `boolean` | `false` | Required field |
| `displayType` | `'default' \| 'inline-card' \| 'block-card'` | `'default'` | Display type |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Group direction |
| `maxHeight` | `string` | `null` | Maximum height with scroll |

### Accessibility props (inherited from SuFormField)

When used with `SuFormField`, the component automatically receives:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique field ID (fieldId) |
| `aria-describedby` | `string` | Associated message ID (messageId) |
| `state` | `string` | Validation state |
| `disabled` | `boolean` | Disabled state |

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
| `@update:modelValue` | `(value: string \| number) => void` | Emitted when value changes (v-model) |
| `@change` | `(value: string \| number) => void` | Emitted on change |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

### Slots

| Slot | Description |
|------|-------------|
| `before` | Content displayed before options |
| `after` | Content displayed after options |

## Accessibility

The RadioGroup component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **Fieldset and Legend**: Semantic structure with `<fieldset>` and `<legend>`
- **ARIA attributes**: `role="radiogroup"`, `aria-required`, `aria-invalid`
- **Keyboard navigation**: Arrow keys, Tab, Space
- **Associated labels**: Each radio has a properly associated label
- **State messages**: Via aria-describedby (messageId) with `aria-live`
- **Visible focus**: Clear and contrasted indicators
- **Color contrast**: WCAG AA compliant ratios (4.5:1)
- **Logical grouping**: Options semantically grouped

### 🎯 Usage best practices

```vue
<!-- ✅ GOOD: Usage with SuFormField for complete accessibility -->
<SuFormField 
  label="Payment method"
  :required="true"
  :state="paymentError ? 'error' : 'default'"
  :message="paymentError || 'Select your payment method'"
>
  <template #default="slotProps">
    <SuRadioGroup 
      :options="paymentMethods"
      name="payment"
      v-bind="slotProps"
      v-model="payment"
    />
  </template>
</SuFormField>

<!-- ✅ GOOD: Standalone usage with fieldset and legend -->
<fieldset>
  <legend>Payment method</legend>
  <SuRadioGroup 
    :options="paymentMethods"
    name="payment"
    aria-required="true"
    v-model="payment"
  />
</fieldset>

<!-- ❌ BAD: Without label or context -->
<SuRadioGroup 
  :options="options"
  name="selection"
  v-model="value"
/>
```

## Keyboard navigation

| Key | Action |
|--------|--------|
| `Tab` | Navigate to/from group |
| `Arrows ↑/↓` | Navigate between options (vertical) |
| `Arrows ←/→` | Navigate between options (horizontal) |
| `Space` | Select focused option |

## Advanced usage examples

### Complete configuration form

```vue
<script setup>
import { ref } from 'vue'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'

const formData = ref({
  theme: 'light',
  privacy: 'public',
  notifications: 'all'
})

const errors = ref({})

const themeOptions = [
  { value: 'light', label: 'Light', description: 'Light interface', icon: SunIcon },
  { value: 'dark', label: 'Dark', description: 'Dark interface', icon: MoonIcon },
  { value: 'auto', label: 'Auto', description: 'Follows system', icon: ComputerDesktopIcon }
]

const privacyOptions = [
  { value: 'public', label: 'Public', description: 'Visible to everyone' },
  { value: 'private', label: 'Private', description: 'Visible to you only' }
]
</script>

<template>
  <form>
    <h2>Settings</h2>
    
    <SuFormField 
      label="Theme"
      message="Choose interface appearance"
    >
      <template #default="slotProps">
        <SuRadioGroup 
          :options="themeOptions"
          displayType="block-card"
          name="theme"
          v-bind="slotProps"
          v-model="formData.theme"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Privacy"
      message="Who can see your profile?"
      :required="true"
    >
      <template #default="slotProps">
        <SuRadioGroup 
          :options="privacyOptions"
          displayType="inline-card"
          direction="horizontal"
          name="privacy"
          v-bind="slotProps"
          v-model="formData.privacy"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Save</button>
  </form>
</template>
```

### Plan selector with pricing

```vue
<script setup>
import { ref, computed } from 'vue'

const selectedPlan = ref('')

const plans = [
  { 
    value: 'starter', 
    label: 'Starter', 
    description: '$5/month - Perfect to start'
  },
  { 
    value: 'professional', 
    label: 'Professional', 
    description: '$15/month - For professionals'
  },
  { 
    value: 'business', 
    label: 'Business', 
    description: '$45/month - Complete solution'
  }
]

const totalPrice = computed(() => {
  const prices = { starter: 5, professional: 15, business: 45 }
  return selectedPlan.value ? prices[selectedPlan.value] : 0
})
</script>

<template>
  <div>
    <SuFormField 
      label="Choose your plan"
      :required="true"
    >
      <template #default="slotProps">
        <SuRadioGroup 
          :options="plans"
          displayType="block-card"
          name="plan"
          v-bind="slotProps"
          v-model="selectedPlan"
        >
          <template #after>
            <div v-if="selectedPlan" class="text-right mt-4">
              <strong>Total: ${{ totalPrice }}/month</strong>
            </div>
          </template>
        </SuRadioGroup>
      </template>
    </SuFormField>
  </div>
</template>
```

## SuRadioGroupField Component

For even simpler usage, you can use the `SuRadioGroupField` component which automatically combines `SuFormField` and `SuRadioGroup`:

```vue
<template>
  <!-- Instead of -->
  <SuFormField label="Payment method" message="Select a method">
    <template #default="slotProps">
      <SuRadioGroup 
        :options="methods"
        name="payment"
        v-bind="slotProps"
        v-model="payment"
      />
    </template>
  </SuFormField>
  
  <!-- You can simply write -->
  <SuRadioGroupField 
    :options="methods"
    label="Payment method"
    message="Select a method"
    name="payment"
    v-model="payment"
  />
</template>
```

The `SuRadioGroupField` component accepts all props from both `SuFormField` and `SuRadioGroup` combined, offering a more concise syntax while retaining all features.

See the [complete SuRadioGroupField documentation](./SuRadioGroupField.md) for more details.