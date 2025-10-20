# SelectBoxField

Custom SelectBox component with support for multiple selection, integrated search, option groups and complete accessibility according to W3C standards.

## Usage examples

### Basic SelectBoxField

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple SelectBox</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
        :options="[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4', disabled: true }
        ]"
        label="Simple selection"
        placeholder="Choose an option..."
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
  <SuSelectBoxField 
    :options="options"
    label="Simple selection"
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
      <SuSelectBoxField 
        :options="[
          { value: 'js', label: 'JavaScript' },
          { value: 'ts', label: 'TypeScript' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'react', label: 'React' },
          { value: 'angular', label: 'Angular' }
        ]"
        :multiple="true"
        :clearable="true"
        label="Technologies"
        placeholder="Select your technologies..."
        message="You can select multiple options"
      />
    </div>
  </div>
</div>

```vue
<script setup>
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
  <SuSelectBoxField 
    :options="technologies"
    :multiple="true"
    :clearable="true"
    label="Technologies"
    placeholder="Select your technologies..."
    message="You can select multiple options"
    v-model="selectedTechnologies"
  />
</template>
```

### Integrated search

<div class="component-demo">
  <div class="demo-section">
    <h4>SelectBox with search</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
        :options="[
          { value: 'fr', label: 'France' },
          { value: 'us', label: 'United States' },
          { value: 'de', label: 'Germany' },
          { value: 'es', label: 'Spain' },
          { value: 'it', label: 'Italy' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'jp', label: 'Japan' }
        ]"
        :searchable="true"
        :clearable="true"
        label="Country"
        placeholder="Search for a country..."
        searchPlaceholder="Type to search..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
const selectedCountry = ref('')
const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' }
]
</script>

<template>
  <SuSelectBoxField 
    :options="countries"
    :searchable="true"
    :clearable="true"
    label="Country"
    placeholder="Search for a country..."
    searchPlaceholder="Type to search..."
    v-model="selectedCountry"
  />
</template>
```

### Options with icons and descriptions

<div class="component-demo">
  <div class="demo-section">
    <h4>Rich options</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
        :options="[
          { 
            value: 'basic', 
            label: 'Basic Plan', 
            description: 'Basic features to get started',
            icon: 'StarIcon'
          },
          { 
            value: 'pro', 
            label: 'Pro Plan', 
            description: 'Advanced features for professionals',
            icon: 'BuildingOfficeIcon'
          },
          { 
            value: 'enterprise', 
            label: 'Enterprise Plan', 
            description: 'Complete solution for large companies',
            icon: 'GlobeAltIcon'
          }
        ]"
        :searchable="true"
        label="Subscription plan"
        placeholder="Choose your plan..."
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { StarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const selectedPlan = ref('')
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
  <SuSelectBoxField 
    :options="plans"
    :searchable="true"
    label="Subscription plan"
    placeholder="Choose your plan..."
    v-model="selectedPlan"
  />
</template>
```

### Grouped options

<div class="component-demo">
  <div class="demo-section">
    <h4>Options organized in groups</h4>
    <div class="demo-inputs">
      <SuSelectBoxField 
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
        label="Food products"
        placeholder="Select products..."
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuSelectBoxField 
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
    label="Food products"
    placeholder="Select products..."
    v-model="selectedProducts"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | `[]` | List of available options |
| `groups` | `SelectGroup[]` | `[]` | Options organized in groups |
| `value` | `string \| number \| (string \| number)[]` | `undefined` | Selected value |
| `multiple` | `boolean` | `false` | Multiple selection |
| `searchable` | `boolean` | `false` | Integrated search |
| `clearable` | `boolean` | `false` | Clear button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | SelectBox size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable SelectBox |
| `readonly` | `boolean` | `false` | Read-only SelectBox |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `noOptionsText` | `string` | `'No options available'` | Text when no options |
| `noResultsText` | `string` | `'No results found'` | Text when no search results |
| `maxHeight` | `string` | `'200px'` | Maximum dropdown height |
| `loading` | `boolean` | `false` | Loading state |
| `closeOnSelect` | `boolean` | `true` | Close after selection |
| `maxSelectedItems` | `number` | `undefined` | Multiple selection limit |
| `label` | `string` | `undefined` | SelectBox label |
| `message` | `string` | `undefined` | Displayed message |

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
| `@update:value` | `(value: string \| number \| (string \| number)[]) => void` | Emitted when value changes |
| `@change` | `(value: string \| number \| (string \| number)[]) => void` | Emitted on change |
| `@open` | `() => void` | Emitted when dropdown opens |
| `@close` | `() => void` | Emitted when dropdown closes |
| `@search` | `(query: string) => void` | Emitted during search |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

## Accessibility

The SelectBox component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **Keyboard navigation**: Complete support for arrow keys, Enter, Space, Escape, Home/End
- **ARIA attributes**: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-multiselectable`
- **Focus trap**: Focus management in open dropdown
- **Voice announcements**: Messages for screen readers during selections
- **Associated labels**: Each SelectBox has a properly associated label
- **State messages**: Error/success/warning messages with `aria-live`
- **Color contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Visible focus**: Clear and contrasted focus indicators
- **RTL support**: Complete support for right-to-left languages
- **Dark mode**: Automatically adapted contrast
- **High contrast**: Support for `prefers-contrast: high`
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Best practices

```vue
<!-- SelectBox with validation and accessibility -->
<SuSelectBoxField 
  :options="options"
  :required="true"
  label="Category"
  placeholder="Select a category..."
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Please select a category' : 'Choose the category that best fits'"
  v-model="category"
/>

<!-- Multiple SelectBox with limit -->
<SuSelectBoxField 
  :options="skills"
  :multiple="true"
  :maxSelectedItems="5"
  :searchable="true"
  :clearable="true"
  label="Skills"
  placeholder="Select your skills..."
  message="Maximum 5 skills"
  v-model="selectedSkills"
/>

<!-- SelectBox with groups and search -->
<SuSelectBoxField 
  :groups="categorizedOptions"
  :searchable="true"
  label="Product"
  placeholder="Search for a product..."
  searchPlaceholder="Type to filter..."
  ariaLabel="Product selector by category"
  v-model="selectedProduct"
/>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from SelectBox |
| `Enter` / `Space` | Open/close dropdown, select focused option |
| `Arrow Down` | Open dropdown or navigate to next option |
| `Arrow Up` | Navigate to previous option |
| `Home` | Go to first option |
| `End` | Go to last option |
| `Escape` | Close dropdown |
| `A-Z` | Quick search by first letter (if no integrated search) |

## Advanced usage examples

### User profile form

```vue
<script setup>
import { ref } from 'vue'
import { UserIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const userType = ref('')
const skills = ref([])
const country = ref('')

const userTypes = [
  { value: 'individual', label: 'Individual', icon: UserIcon },
  { value: 'business', label: 'Business', icon: BuildingOfficeIcon },
  { value: 'organization', label: 'Organization', icon: GlobeAltIcon }
]

const skillOptions = [
  { value: 'js', label: 'JavaScript', group: 'Frontend' },
  { value: 'ts', label: 'TypeScript', group: 'Frontend' },
  { value: 'vue', label: 'Vue.js', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'python', label: 'Python', group: 'Backend' },
  { value: 'docker', label: 'Docker', group: 'DevOps' }
]

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' }
]
</script>

<template>
  <form class="space-y-6">
    <SuSelectBoxField 
      :options="userTypes"
      :required="true"
      label="User type"
      placeholder="Select your type..."
      v-model="userType"
    />
    
    <SuSelectBoxField 
      :options="skillOptions"
      :multiple="true"
      :searchable="true"
      :clearable="true"
      :maxSelectedItems="3"
      label="Skills"
      placeholder="Select your skills..."
      message="Maximum 3 skills"
      v-model="skills"
    />
    
    <SuSelectBoxField 
      :options="countries"
      :searchable="true"
      :clearable="true"
      label="Country"
      placeholder="Search your country..."
      v-model="country"
    />
  </form>
</template>
```

### Dynamic loading SelectBox

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const options = ref([])
const loading = ref(false)
const selectedValue = ref('')

const searchOptions = async (query) => {
  loading.value = true
  try {
    // API simulation
    const response = await fetch(`/api/search?q=${query}`)
    options.value = await response.json()
  } finally {
    loading.value = false
  }
}

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2) {
    searchOptions(newQuery)
  }
})
</script>

<template>
  <SuSelectBoxField 
    :options="options"
    :searchable="true"
    :loading="loading"
    label="Dynamic search"
    placeholder="Type to search..."
    searchPlaceholder="Minimum 3 characters..."
    @search="searchQuery = $event"
    v-model="selectedValue"
  />
</template>
```