# SuSelectBox

Custom SelectBox component with multiple selection support, integrated search, option groups and complete accessibility according to W3C standards.

## Description

`SuSelectBox` is an enhanced selection component that extends the capabilities of a native `<select>` element. It offers advanced features such as search, multiple selection with tags, options with icons and descriptions, and complete keyboard accessibility.

## Usage examples

### Simple usage (without SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Basic SelectBox</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        placeholder="Choose an option..."
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
  <SuSelectBox 
    :options="options"
    placeholder="Choose an option..."
    v-model="selectedValue"
  />
</template>
```

### Multiple selection

<div class="component-demo">
  <div class="demo-section">
    <h4>Multiple selection with tags</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'js', label: 'JavaScript' },
          { value: 'ts', label: 'TypeScript' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'react', label: 'React' },
          { value: 'angular', label: 'Angular' }
        ]"
        :multiple="true"
        :clearable="true"
        placeholder="Select your technologies..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedTechnologies = ref([])
const technologies = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' }
]
</script>

<template>
  <SuSelectBox 
    :options="technologies"
    :multiple="true"
    :clearable="true"
    placeholder="Select your technologies..."
    v-model="selectedTechnologies"
  />
</template>
```

### Integrated search

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox with search</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'fr', label: 'France' },
          { value: 'de', label: 'Germany' },
          { value: 'es', label: 'Spain' },
          { value: 'it', label: 'Italy' },
          { value: 'ca', label: 'Canada' },
          { value: 'jp', label: 'Japan' }
        ]"
        :searchable="true"
        :clearable="true"
        placeholder="Search a country..."
        searchPlaceholder="Type to search..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const selectedCountry = ref('')
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' }
]
</script>

<template>
  <SuSelectBox 
    :options="countries"
    :searchable="true"
    :clearable="true"
    placeholder="Search a country..."
    searchPlaceholder="Type to search..."
    v-model="selectedCountry"
  />
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="sm"
        placeholder="Small SelectBox"
      />
      <SuSelectBox 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="md"
        placeholder="Medium SelectBox"
      />
      <SuSelectBox 
        :options="[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' }
        ]"
        size="lg"
        placeholder="Large SelectBox"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBox 
    :options="options"
    size="sm" 
    placeholder="Small SelectBox" 
  />
  
  <SuSelectBox 
    :options="options"
    size="md" 
    placeholder="Medium SelectBox" 
  />
  
  <SuSelectBox 
    :options="options"
    size="lg" 
    placeholder="Large SelectBox" 
  />
</template>
```

### States

<div class="component-demo">
  <div class="demo-section">
    <h4>Visual states</h4>
    <div class="demo-inputs">
      <SuSelectBox 
        :options="options"
        placeholder="Default state"
      />
      <SuSelectBox 
        :options="options"
        state="error"
        value="invalid"
      />
      <SuSelectBox 
        :options="options"
        state="success"
        value="valid"
      />
      <SuSelectBox 
        :options="options"
        state="warning"
        value="warning"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBox 
    :options="options"
    placeholder="Default state"
  />
  
  <SuSelectBox 
    :options="options"
    state="error"
    value="invalid"
  />
  
  <SuSelectBox 
    :options="options"
    state="success"
    value="valid"
  />
  
  <SuSelectBox 
    :options="options"
    state="warning"
    value="warning"
  />
</template>
```

## Usage with SuFormField

The `SuSelectBox` component can be used with `SuFormField` to benefit from a complete form structure with label, message and state management.

### Basic usage with SuFormField

```vue
<template>
  <SuFormField 
    label="Country" 
    message="Select your country of residence"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="countries"
        placeholder="Choose a country..."
        v-bind="slotProps"
        v-model="selectedCountry"
      />
    </template>
  </SuFormField>
</template>
```

### With slot props destructuring

```vue
<template>
  <SuFormField 
    label="Category"
    :required="true"
    message="Required field"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuSelectBox 
        :options="categories"
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        placeholder="Select a category..."
        v-model="category"
      />
    </template>
  </SuFormField>
</template>
```

### Validation with states

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox with validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="User type"
        :required="true"
        state="error"
        message="Please select a user type"
      >
        <template #default="slotProps">
          <SuSelectBox 
            :options="[
              { value: 'individual', label: 'Individual' },
              { value: 'business', label: 'Business' },
              { value: 'organization', label: 'Organization' }
            ]"
            placeholder="Select your type..."
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

const userType = ref('')
const userTypeError = ref('')

const validateUserType = () => {
  if (!userType.value) {
    userTypeError.value = 'Please select a user type'
  } else {
    userTypeError.value = ''
  }
}

const userTypeState = computed(() => {
  if (!userType.value) return 'default'
  return userTypeError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="User type"
    :required="true"
    :state="userTypeState"
    :message="userTypeError || 'Select the type that matches you'"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="userTypes"
        placeholder="Select your type..."
        v-bind="slotProps"
        v-model="userType"
        @blur="validateUserType"
      />
    </template>
  </SuFormField>
</template>
```

### Multiple selection with FormField

```vue
<template>
  <SuFormField 
    label="Skills"
    message="Select up to 5 skills"
    :required="true"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="skillOptions"
        :multiple="true"
        :searchable="true"
        :clearable="true"
        :maxSelectedItems="5"
        placeholder="Select your skills..."
        v-bind="slotProps"
        v-model="skills"
      />
    </template>
  </SuFormField>
</template>
```

### Custom label and message

```vue
<script setup>
import { UserIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Role" 
    :required="true"
    message="Select your role in the organization"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <UserIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuSelectBox 
        :options="roles"
        placeholder="Choose a role..."
        v-bind="slotProps"
        v-model="role"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Please select a role</span>
        <span v-else>Select the role that matches your function</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Options with icons and descriptions

```vue
<script setup>
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const plans = [
  { 
    value: 'basic', 
    label: 'Basic Plan', 
    description: 'Basic features to get started',
    icon: StarIcon 
  },
  { 
    value: 'pro', 
    label: 'Pro Plan', 
    description: 'Advanced features for professionals',
    icon: BuildingOfficeIcon 
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise Plan', 
    description: 'Complete solution for large companies',
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
      <SuSelectBox 
        :options="plans"
        :searchable="true"
        placeholder="Choose your plan..."
        v-bind="slotProps"
        v-model="selectedPlan"
      />
    </template>
  </SuFormField>
</template>
```

### Grouped options

```vue
<template>
  <SuFormField 
    label="Food products"
    message="Select your favorite products"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :groups="[
          {
            label: 'Fruits',
            options: [
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'orange', label: 'Orange' }
            ]
          },
          {
            label: 'Vegetables',
            options: [
              { value: 'carrot', label: 'Carrot' },
              { value: 'broccoli', label: 'Broccoli' },
              { value: 'spinach', label: 'Spinach' }
            ]
          }
        ]"
        :searchable="true"
        :multiple="true"
        placeholder="Select products..."
        v-bind="slotProps"
        v-model="selectedProducts"
      />
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
      <SuSelectBox 
        :options="options"
        value="selected"
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
| `options` | `SelectOption[]` | `[]` | List of available options |
| `groups` | `SelectGroup[]` | `[]` | Options organized in groups |
| `modelValue` | `string \| number \| (string \| number)[]` | `undefined` | Selected value (v-model) |
| `multiple` | `boolean` | `false` | Multiple selection |
| `searchable` | `boolean` | `false` | Integrated search |
| `clearable` | `boolean` | `false` | Clear button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | SelectBox size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the SelectBox |
| `readonly` | `boolean` | `false` | Read-only SelectBox |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `noOptionsText` | `string` | `'No options available'` | No options text |
| `noResultsText` | `string` | `'No results found'` | No results text |
| `maxHeight` | `string` | `'200px'` | Max dropdown height |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `loading` | `boolean` | `false` | Loading state |
| `closeOnSelect` | `boolean` | `true` | Close after selection |
| `maxSelectedItems` | `number` | `undefined` | Multiple selection limit |

### Accessibility props (inherited from SuFormField)

When used with `SuFormField`, the component automatically receives:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique field ID (fieldId) |
| `aria-describedby` | `string` | Associated message ID (messageId) |
| `state` | `string` | Validation state |
| `disabled` | `boolean` | Disabled state |

### Option types

#### SelectOption
```typescript
interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
  icon?: Component
  description?: string
}
```

#### SelectGroup
```typescript
interface SelectGroup {
  label: string
  options: SelectOption[]
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: string \| number \| (string \| number)[]) => void` | Emitted when value changes (v-model) |
| `@change` | `(value: string \| number \| (string \| number)[]) => void` | Emitted on change |
| `@open` | `() => void` | Emitted when dropdown opens |
| `@close` | `() => void` | Emitted when dropdown closes |
| `@search` | `(query: string) => void` | Emitted on search |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

### Exposed methods

| Method | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Focuses the SelectBox |
| `open()` | `() => void` | Opens the dropdown |
| `close()` | `() => void` | Closes the dropdown |
| `clear()` | `() => void` | Clears the selection |
| `selectRef` | `Ref<HTMLDivElement>` | Container reference |

## Accessibility

The SelectBox component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **Keyboard navigation**: Complete support (arrows, Enter, Space, Escape, Home/End)
- **ARIA attributes**: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-multiselectable`
- **Focus trap**: Focus management in dropdown
- **Voice announcements**: Messages for screen readers
- **Associated labels**: Via SuFormField props (fieldId)
- **State messages**: Via aria-describedby (messageId)
- **Color contrast**: WCAG AA compliant ratios (4.5:1)
- **Visible focus**: Clear and contrasted indicators
- **RTL support**: Right-to-left languages
- **Dark mode**: Adapted contrast
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Usage best practices

```vue
<!-- ✅ GOOD: Usage with SuFormField for complete accessibility -->
<SuFormField 
  label="Country"
  :required="true"
  :state="countryError ? 'error' : 'default'"
  :message="countryError || 'Select your country of residence'"
>
  <template #default="slotProps">
    <SuSelectBox 
      :options="countries"
      :searchable="true"
      placeholder="Search a country..."
      v-bind="slotProps"
      v-model="country"
    />
  </template>
</SuFormField>

<!-- ✅ GOOD: Standalone usage with manual ARIA attributes -->
<SuSelectBox 
  :options="options"
  id="country-select"
  aria-label="Country selection"
  aria-describedby="country-help"
  v-model="country"
/>
<span id="country-help">Select your country of residence</span>

<!-- ❌ BAD: Without label or description -->
<SuSelectBox 
  :options="options"
  v-model="value"
/>
```

## Keyboard navigation

| Key | Action |
|--------|--------|
| `Tab` | Navigate to/from SelectBox |
| `Enter` / `Space` | Open/close dropdown, select option |
| `Arrow down` | Open dropdown or next option |
| `Arrow up` | Previous option |
| `Home` | First option |
| `End` | Last option |
| `Escape` | Close dropdown |
| `A-Z` | Quick search by first letter |

## Advanced usage examples

### Complete form with validation

```vue
<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  userType: '',
  skills: [],
  country: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.userType) {
    errors.value.userType = 'User type required'
  }
  
  if (formData.value.skills.length === 0) {
    errors.value.skills = 'Select at least one skill'
  }
  
  if (!formData.value.country) {
    errors.value.country = 'Country required'
  }
  
  return Object.keys(errors.value).length === 0
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <SuFormField 
      label="User type"
      :required="true"
      :state="errors.userType ? 'error' : 'default'"
      :message="errors.userType || 'Select your type'"
    >
      <template #default="slotProps">
        <SuSelectBox 
          :options="userTypes"
          placeholder="Choose a type..."
          v-bind="slotProps"
          v-model="formData.userType"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Skills"
      :required="true"
      :state="errors.skills ? 'error' : 'default'"
      :message="errors.skills || 'Maximum 5 skills'"
    >
      <template #default="slotProps">
        <SuSelectBox 
          :options="skillOptions"
          :multiple="true"
          :searchable="true"
          :maxSelectedItems="5"
          placeholder="Select your skills..."
          v-bind="slotProps"
          v-model="formData.skills"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Country"
      :required="true"
      :state="errors.country ? 'error' : 'default'"
      :message="errors.country || 'Country of residence'"
    >
      <template #default="slotProps">
        <SuSelectBox 
          :options="countries"
          :searchable="true"
          placeholder="Search a country..."
          v-bind="slotProps"
          v-model="formData.country"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Submit</button>
  </form>
</template>
```

### Dynamic loading with search

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const options = ref([])
const loading = ref(false)
const selectedValue = ref('')

const searchOptions = async (query) => {
  if (query.length < 3) return
  
  loading.value = true
  try {
    const response = await fetch(`/api/search?q=${query}`)
    options.value = await response.json()
  } finally {
    loading.value = false
  }
}

watch(searchQuery, (newQuery) => {
  searchOptions(newQuery)
})
</script>

<template>
  <SuFormField 
    label="Dynamic search"
    message="Type at least 3 characters to search"
  >
    <template #default="slotProps">
      <SuSelectBox 
        :options="options"
        :searchable="true"
        :loading="loading"
        placeholder="Start typing..."
        searchPlaceholder="Minimum 3 characters..."
        v-bind="slotProps"
        @search="searchQuery = $event"
        v-model="selectedValue"
      />
    </template>
  </SuFormField>
</template>
```

## SuSelectBoxField Component

For even simpler usage, you can use the `SuSelectBoxField` component which automatically combines `SuFormField` and `SuSelectBox`:

```vue
<template>
  <!-- Instead of -->
  <SuFormField label="Country" message="Select your country">
    <template #default="slotProps">
      <SuSelectBox 
        :options="countries"
        v-bind="slotProps"
        v-model="country"
      />
    </template>
  </SuFormField>
  
  <!-- You can simply write -->
  <SuSelectBoxField 
    :options="countries"
    label="Country"
    message="Select your country"
    v-model="country"
  />
</template>
```

The `SuSelectBoxField` component accepts all props from both `SuFormField` and `SuSelectBox` combined, offering a more concise syntax while retaining all features.

See the complete [SelectBoxField](./SuSelectBoxField.md) documentation for more details.