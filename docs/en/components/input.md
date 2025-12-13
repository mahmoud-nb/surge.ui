# Input

Flexible input component with complete HTML type support, prefixes/suffixes, text alignment, RTL/LTR direction and accessibility according to W3C standards.

## Description

`SuInput` is an enhanced input field component that extends the capabilities of the native HTML `<input>` element. It offers advanced support for text/icon prefixes/suffixes, text alignment, and complete accessibility management.

## Usage examples

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple text input</h4>
    <div class="demo-inputs">
      <SuInput type="text" placeholder="Enter text" />
    </div>
  </div>
</div>

```vue
<template>
  <SuInput type="text" placeholder="Enter text" />
</template>
```

### with FormField

<div class="component-demo">
  <div class="demo-section">
    <h4>Types d'input supportés</h4>
    <div class="demo-inputs">
      <SuFormField label="User name">
        <SuInput placeholder="Enter username" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="User name">
    <SuInput placeholder="Enter username" />
  </SuFormField>
</template>
```

Find out more about how to use [SuFormField](/en/components/formfield).

### Input types

<div class="component-demo">
  <div class="demo-section">
    <h4>Types d'input supportés</h4>
    <div class="demo-inputs">
      <SuFormField label="Texte" >
        <SuInput type="text" placeholder="Enter text" />
      </SuFormField>
      <SuFormField label="Email" >
        <SuInput type="email" placeholder="nom@exemple.com" />
      </SuFormField>
      <SuFormField label="Password" >
        <SuInput type="password" placeholder="••••••••" />
      </SuFormField>
      <SuFormField label="number" >
        <SuInput type="number" placeholder="123" />
      </SuFormField>
      <SuFormField label="Phone" >
        <SuInput type="tel" placeholder="+33 1 23 45 67 89" />
      </SuFormField>
      <SuFormField label="Url" >
        <SuInput type="url" placeholder="https://exemple.com" />
      </SuFormField>
      <SuFormField label="Search" >
        <SuInput type="search" placeholder="Search..." />
      </SuFormField>
      <SuFormField label="Date" >
        <SuInput type="date" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Texte" >
    <SuInput type="text" placeholder="Enter text" />
  </SuFormField>
  <SuFormField label="Email" >
    <SuInput type="email" placeholder="nom@exemple.com" />
  </SuFormField>
  <SuFormField label="Password" >
    <SuInput type="password" placeholder="••••••••" />
  </SuFormField>
  <SuFormField label="number" >
    <SuInput type="number" placeholder="123" />
  </SuFormField>
  <SuFormField label="Phone" >
    <SuInput type="tel" placeholder="+33 1 23 45 67 89" />
  </SuFormField>
  <SuFormField label="Url" >
    <SuInput type="url" placeholder="https://exemple.com" />
  </SuFormField>
  <SuFormField label="Search" >
    <SuInput type="search" placeholder="Search..." />
  </SuFormField>
  <SuFormField label="Date" >
    <SuInput type="date" />
  </SuFormField>
</template>
```

### Prefixes and suffixes

<div class="component-demo">
  <div class="demo-section">
    <h4>Text prefixes and suffixes</h4>
    <div class="demo-inputs">
      <SuFormField label="Price" >
        <SuInput placeholder="0.00" suffix="€" text-align="right" type="number" />
      </SuFormField>
      <SuFormField label="Email" >
        <SuInput placeholder="nom" suffix="@entreprise.com" />
      </SuFormField>
      <SuFormField label="Website" >
        <SuInput placeholder="monsite" prefix="https://" suffix=".com" />
      </SuFormField>
      <SuFormField label="Phone" >
        <SuInput placeholder="123456789" prefix="+33" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Price" >
    <SuInput placeholder="0.00" suffix="€" text-align="right" type="number" />
  </SuFormField>
  <SuFormField label="Email" >
    <SuInput placeholder="nom" suffix="@entreprise.com" />
  </SuFormField>
  <SuFormField label="Website" >
    <SuInput placeholder="monsite" prefix="https://" suffix=".com" />
  </SuFormField>
  <SuFormField label="Phone" >
    <SuInput placeholder="123456789" prefix="+33" />
  </SuFormField>
</template>
```

### Prefixes and suffixes with icons

<div class="component-demo">
  <div class="demo-section">
    <h4>Prefixes and suffixes with icons</h4>
    <div class="demo-inputs">
      <SuFormField label="Search" >
        <SuInput placeholder="Search..." :prefixIcon="MagnifyingGlassIcon" />
      </SuFormField>
      <SuFormField label="Email" >
        <SuInput placeholder="votre@email.com" :prefixIcon="AtSymbolIcon" />
      </SuFormField>
      <SuFormField label="Password" >
        <SuInput placeholder="••••••••" type="password" :prefixIcon="LockClosedIcon" />
      </SuFormField>
      <SuFormField label="User" >
        <SuInput placeholder="Username" :prefixIcon="UserIcon" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { 
  MagnifyingGlassIcon, 
  AtSymbolIcon, 
  LockClosedIcon, 
  UserIcon 
} from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField label="Search" >
    <SuInput placeholder="Search..." :prefixIcon="MagnifyingGlassIcon" />
  </SuFormField>
  <SuFormField label="Email" >
    <SuInput placeholder="votre@email.com" :prefixIcon="AtSymbolIcon" />
  </SuFormField>
  <SuFormField label="Password" >
    <SuInput placeholder="••••••••" type="password" :prefixIcon="LockClosedIcon" />
  </SuFormField>
  <SuFormField label="User" >
    <SuInput placeholder="Username" :prefixIcon="UserIcon" />
  </SuFormField>
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-inputs">
      <SuFormField label="Small" >
        <SuInput size="sm" placeholder="Small input" />
      </SuFormField>
      <SuFormField label="Medium" >
        <SuInput size="md" placeholder="Medium input" />
      </SuFormField>
      <SuFormField label="Large" >
        <SuInput size="lg" placeholder="Large input" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Small" >
    <SuInput size="sm" placeholder="Small input" />
  </SuFormField>
  <SuFormField label="Medium" >
    <SuInput size="md" placeholder="Medium input" />
  </SuFormField>
  <SuFormField label="Large" >
    <SuInput size="lg" placeholder="Large input" />
  </SuFormField>
</template>
```

### States and validation

<div class="component-demo">
  <div class="demo-section">
    <h4>Input states</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Default state" 
        message="Help text to guide the user"
      >
        <SuInput placeholder="Enter text" />
      </SuFormField>
      <SuFormField 
        state="error"
        label="Error state" 
        message="This field contains an error"
      >
        <SuInput value="incorrect value" />
      </SuFormField>
      <SuFormField 
        state="success"
        label="Success state" 
        message="Valid value!"
      >
        <SuInput value="correct value" />
      </SuFormField>
      <SuFormField 
        state="warning"
        label="Warning state" 
        message="Be careful with this value"
      >
        <SuInput value="warning" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="Default state" 
    message="Help text to guide the user"
  >
    <SuInput placeholder="Enter text" />
  </SuFormField>
  <SuFormField 
    state="error"
    label="Error state" 
    message="This field contains an error"
  >
    <SuInput value="incorrect value" />
  </SuFormField>
  <SuFormField 
    state="success"
    label="Success state" 
    message="Valid value!"
  >
    <SuInput value="correct value" />
  </SuFormField>
  <SuFormField 
    state="warning"
    label="Warning state" 
    message="Be careful with this value"
  >
    <SuInput value="warning" />
  </SuFormField>
</template>
```

### Text alignment

<div class="component-demo">
  <div class="demo-section">
    <h4>Text alignment</h4>
    <div class="demo-inputs">
      <SuFormField label="Left alignment" >
        <SuInput textAlign="left" value="Left aligned" />
      </SuFormField>
      <SuFormField label="Centered alignment" >
        <SuInput textAlign="center" value="Centered" />
      </SuFormField>
      <SuFormField label="Right alignment" >
        <SuInput textAlign="right" value="Right aligned" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField label="Left alignment" >
    <SuInput textAlign="left" value="Left aligned" />
  </SuFormField>
  <SuFormField label="Centered alignment" >
    <SuInput textAlign="center" value="Centered" />
  </SuFormField>
  <SuFormField label="Right alignment" >
    <SuInput textAlign="right" value="Right aligned" />
  </SuFormField>
</template>
```

### RTL support (right-to-left)

<div class="component-demo">
  <div class="demo-section">
    <h4>RTL language support</h4>
    <div class="demo-inputs" dir="rtl">
      <SuInput 
        placeholder="أدخل النص هنا"
        value="النص العربي"
      />
      <SuInput 
        placeholder="הכנס טקסט כאן"
        value="טקסט עברי"
      />
      <SuInput 
        placeholder="0.00"
        suffix="$"
        type="number"
      />
      <SuFormField label="Arabic text (RTL)" >
        <SuInput 
          placeholder="أدخل النص هنا"
          value="النص العربي"
        />
      </SuFormField>
      <SuFormField label="Hebrew text (RTL)">
        <SuInput 
          placeholder="הכנס טקסט כאן"
          value="טקסט עברי"
        />
      </SuFormField>
      <SuFormField label="Price (RTL with suffix)" >
        <SuInput 
          placeholder="0.00"
          suffix="$"
          type="number"
        />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <div dir="rtl">
    <SuInput 
      placeholder="أدخل النص هنا"
      value="النص العربي"
    />
    <SuInput 
      placeholder="הכנס טקסט כאן"
      value="טקסט עברי"
    />
    <SuInput 
      placeholder="0.00"
      suffix="$"
      type="number"
    />
  </div>
</template>
```

### Disabled and readonly states

<div class="component-demo">
  <div class="demo-section">
    <h4>Special states</h4>
    <div class="demo-inputs">
      <SuInput 
        :disabled="true"
        value="Disabled value"
      />
      <SuInput 
        :readonly="true"
        value="Read-only value"
      />
      <SuInput 
        :required="true"
        placeholder="This field is required"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuInput 
    :disabled="true"
    value="Disabled value"
  />
  <SuInput 
    :readonly="true"
    value="Read-only value"
  />
  <SuInput 
    :required="true"
    placeholder="This field is required"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `InputType` | `'text'` | HTML input type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Input visual state |
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Read-only input |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string \| number` | `undefined` | Input value |
| `modelValue` | `string \| number` | `undefined` | v-model value |
| `prefix` | `string` | `undefined` | Text prefix |
| `suffix` | `string` | `undefined` | Text suffix |
| `prefixIcon` | `Component` | `undefined` | Prefix icon (Heroicons component) |
| `suffixIcon` | `Component` | `undefined` | Suffix icon (Heroicons component) |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |

### Accessibility attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label for screen readers |
| `ariaDescribedBy` | `string` | `undefined` | ID of description element |
| `ariaInvalid` | `boolean` | `undefined` | Indicates if value is invalid |
| `ariaRequired` | `boolean` | `undefined` | Indicates if field is required |

### HTML validation attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autocomplete` | `string` | `undefined` | HTML autocomplete attribute |
| `min` | `number \| string` | `undefined` | Minimum value (number, date types) |
| `max` | `number \| string` | `undefined` | Maximum value (number, date types) |
| `step` | `number \| string` | `undefined` | Step for numbers |
| `minLength` | `number` | `undefined` | Minimum text length |
| `maxLength` | `number` | `undefined` | Maximum text length |
| `pattern` | `string` | `undefined` | Validation regular expression |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: string \| number) => void` | Emitted when value changes (v-model) |
| `@input` | `(event: Event) => void` | Emitted on input |
| `@change` | `(event: Event) => void` | Emitted on change |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |
| `@keydown` | `(event: KeyboardEvent) => void` | Emitted on key press |
| `@keyup` | `(event: KeyboardEvent) => void` | Emitted on key release |

### Exposed methods

| Method | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Focuses the input |
| `select()` | `() => void` | Selects input text |
| `blur()` | `() => void` | Removes focus from input |
| `inputRef` | `Ref<HTMLInputElement>` | Reference to native input element |

## Accessibility

The Input component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **ARIA attributes**: Complete support for ARIA attributes (`aria-label`, `aria-describedby`, `aria-invalid`, etc.)
- **Color contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Visible focus**: Clear and contrasted focus indicator with outline
- **Minimum sizes**: Respects minimum touch target sizes (44x44px minimum)
- **RTL support**: Automatic handling of right-to-left languages
- **Dark mode**: Adapted contrast in dark mode
- **High contrast**: Support for `prefers-contrast: high`
- **Reduced motion**: Respects `prefers-reduced-motion`
- **Clear states**: Distinct visual states for error, success, warning

### 🎯 Best practices

```vue
<!-- Input with validation and accessibility -->
<SuInput 
  type="email"
  placeholder="name@example.com"
  :required="true"
  autocomplete="email"
  ariaLabel="Email address"
  ariaDescribedBy="email-help"
  v-model="email"
/>

<!-- Input with error handling -->
<SuInput 
  type="password"
  placeholder="••••••••"
  :required="true"
  :state="hasError ? 'error' : 'default'"
  :ariaInvalid="hasError"
  :minLength="8"
  autocomplete="new-password"
  v-model="password"
/>

<!-- Input with prefix and numeric validation -->
<SuInput 
  type="number"
  :required="true"
  :min="0"
  :max="120"
  placeholder="Age"
  ariaLabel="Your age in years"
  v-model="age"
/>
```

## Supported types

The Input component supports all HTML5 input types:

- `text` - Free text
- `email` - Email address with validation
- `password` - Masked password
- `number` - Number with controls
- `tel` - Phone number
- `url` - URL with validation
- `search` - Search field
- `date` - Date picker
- `time` - Time picker
- `datetime-local` - Local date and time
- `month` - Month picker
- `week` - Week picker
- `color` - Color picker
- `file` - File selection

## Advanced usage examples

### Search input with icon

```vue
<script setup>
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const searchQuery = ref('')

const handleSearch = () => {
  console.log('Search:', searchQuery.value)
}
</script>

<template>
  <SuInput 
    type="search"
    placeholder="Search..."
    :prefixIcon="MagnifyingGlassIcon"
    v-model="searchQuery"
    @keyup.enter="handleSearch"
  />
</template>
```

### Price field with formatting

```vue
<script setup>
import { ref, computed } from 'vue'

const price = ref('')

const formattedPrice = computed({
  get: () => price.value,
  set: (value) => {
    const numericValue = value.replace(/[^\d.,]/g, '')
    price.value = numericValue
  }
})
</script>

<template>
  <SuInput 
    type="number"
    suffix="$"
    placeholder="0.00"
    :step="0.01"
    :min="0"
    textAlign="right"
    v-model="formattedPrice"
  />
</template>
```

### Input with real-time validation

```vue
<script setup>
import { ref, computed } from 'vue'
import { AtSymbolIcon } from '@heroicons/vue/24/outline'

const email = ref('')

const emailState = computed(() => {
  if (!email.value) return 'default'
  const isValid = /\S+@\S+\.\S+/.test(email.value)
  return isValid ? 'success' : 'error'
})
</script>

<template>
  <SuInput 
    type="email"
    :prefixIcon="AtSymbolIcon"
    placeholder="name@example.com"
    :state="emailState"
    autocomplete="email"
    v-model="email"
  />
</template>
```

### International phone input

```vue
<script setup>
import { ref } from 'vue'

const phoneNumber = ref('')
const countryCode = ref('+1')
</script>

<template>
  <SuInput 
    type="tel"
    :prefix="countryCode"
    placeholder="234 567 8900"
    autocomplete="tel"
    v-model="phoneNumber"
  />
</template>
```

### Input with suffix actions

```vue
<script setup>
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const password = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative">
    <SuInput 
      :type="showPassword ? 'text' : 'password'"
      placeholder="••••••••"
      autocomplete="current-password"
      v-model="password"
    />
    <button 
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2"
      @click="togglePasswordVisibility"
      aria-label="Show/hide password"
    >
      <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
    </button>
  </div>
</template>
```

## Usage with SuFormField

For a complete experience with label, message and validation, use `SuInput` with `SuFormField`:

```vue
<template>
  <SuFormField 
    label="Email"
    :required="true"
    :state="emailError ? 'error' : 'default'"
    :message="emailError || 'Used for login'"
  >
    <SuInput 
      type="email"
      placeholder="name@example.com"
      :prefixIcon="AtSymbolIcon"
      autocomplete="email"
      v-model="email"
    />
  </SuFormField>
</template>
```

## Implementation notes

- The component automatically handles text direction (LTR/RTL) based on context
- Prefixes and suffixes are positioned responsively
- Icons are automatically sized according to input size
- Focus ring is always visible for keyboard accessibility
- Validation states are communicated visually and via ARIA