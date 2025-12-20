# FormFieldGroup

FormFieldGroup component for organizing and aligning form fields with controlled spacing. Supports propagation of the `size` prop to child fields and section management with `head` and `footer` slots.

## Usage examples

### Basic FormFieldGroup

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple form</h4>
    <div class="demo-inputs">
      <SuFormFieldGroup style="width: 400px;">
        <SuInputField 
          label="Full name"
          placeholder="Enter your name"
          :prefixIcon="UserIcon"
          required
        />
        <SuInputField 
          type="email"
          label="Email"
          placeholder="name@example.com"
          :prefixIcon="AtSymbolIcon"
          required
        />
        <SuSelectBoxField 
          :options="[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]"
          label="Preference"
          placeholder="Choose an option"
        />
        <SuSwitchField 
          label="Notifications"
          rightLabel="Enabled"
          message="Receive email notifications"
        />
      </SuFormFieldGroup>
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]
</script>

<template>
  <SuFormFieldGroup>
    <SuInputField 
      label="Full name"
      placeholder="Enter your name"
      :prefixIcon="UserIcon"
      required
    />
    <SuInputField 
      type="email"
      label="Email"
      placeholder="name@example.com"
      :prefixIcon="AtSymbolIcon"
      required
    />
    <SuSelectBoxField 
      :options="options"
      label="Preference"
      placeholder="Choose an option"
    />
    <SuSwitchField 
      label="Notifications"
      rightLabel="Enabled"
      message="Receive email notifications"
    />
  </SuFormFieldGroup>
</template>
```

### Field spacing (gap)

<div class="component-demo">
  <div class="demo-section">
    <h4>Different spacings</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Gap Small</strong></p>
        <SuFormFieldGroup gap="sm" style="width: 300px;">
          <SuInputField label="Name" placeholder="Your name" />
          <SuInputField type="email" label="Email" placeholder="email@example.com" />
          <SuSwitchField label="Newsletter" rightLabel="Yes" />
        </SuFormFieldGroup>
      </div>
      <div>
        <p><strong>Gap Medium (default)</strong></p>
        <SuFormFieldGroup gap="md" style="width: 300px;">
          <SuInputField label="Name" placeholder="Your name" />
          <SuInputField type="email" label="Email" placeholder="email@example.com" />
          <SuSwitchField label="Newsletter" rightLabel="Yes" />
        </SuFormFieldGroup>
      </div>
      <div>
        <p><strong>Gap Large</strong></p>
        <SuFormFieldGroup gap="lg" style="width: 300px;">
          <SuInputField label="Name" placeholder="Your name" />
          <SuInputField type="email" label="Email" placeholder="email@example.com" />
          <SuSwitchField label="Newsletter" rightLabel="Yes" />
        </SuFormFieldGroup>
      </div>
      <div>
        <p><strong>Gap Extra Large</strong></p>
        <SuFormFieldGroup gap="xl" style="width: 300px;">
          <SuInputField label="Name" placeholder="Your name" />
          <SuInputField type="email" label="Email" placeholder="email@example.com" />
          <SuSwitchField label="Newsletter" rightLabel="Yes" />
        </SuFormFieldGroup>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Small spacing -->
  <SuFormFieldGroup gap="sm">
    <SuInputField label="Name" placeholder="Your name" />
    <SuInputField type="email" label="Email" placeholder="email@example.com" />
    <SuSwitchField label="Newsletter" rightLabel="Yes" />
  </SuFormFieldGroup>
  
  <!-- Large spacing -->
  <SuFormFieldGroup gap="lg">
    <SuInputField label="Name" placeholder="Your name" />
    <SuInputField type="email" label="Email" placeholder="email@example.com" />
    <SuSwitchField label="Newsletter" rightLabel="Yes" />
  </SuFormFieldGroup>
</template>
```

### Size propagation

<div class="component-demo">
  <div class="demo-section">
    <h4>Forced size on all fields</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Small size forced</strong></p>
        <SuFormFieldGroup size="sm" style="width: 300px;">
          <SuInputField label="Name" placeholder="Small field" />
          <SuSelectBoxField 
            :options="[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' }
            ]"
            label="Selection" 
            placeholder="Small select" 
          />
          <SuTextareaField label="Message" placeholder="Small textarea" />
        </SuFormFieldGroup>
      </div>
      <div>
        <p><strong>Large size forced</strong></p>
        <SuFormFieldGroup size="lg" style="width: 300px;">
          <SuInputField label="Name" placeholder="Large field" />
          <SuSelectBoxField 
            :options="[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' }
            ]"
            label="Selection" 
            placeholder="Large select" 
          />
          <SuTextareaField label="Message" placeholder="Large textarea" />
        </SuFormFieldGroup>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <!-- All fields will be small size -->
  <SuFormFieldGroup size="sm">
    <SuInputField label="Name" placeholder="Small field" />
    <SuSelectBoxField :options="options" label="Selection" />
    <SuTextareaField label="Message" placeholder="Small textarea" />
  </SuFormFieldGroup>
  
  <!-- All fields will be large size -->
  <SuFormFieldGroup size="lg">
    <SuInputField label="Name" placeholder="Large field" />
    <SuSelectBoxField :options="options" label="Selection" />
    <SuTextareaField label="Message" placeholder="Large textarea" />
  </SuFormFieldGroup>
</template>
```

### Horizontal direction

<div class="component-demo">
  <div class="demo-section">
    <h4>Horizontally aligned fields</h4>
    <div class="demo-inputs">
      <SuFormFieldGroup direction="horizontal" gap="md" style="width: 100%; max-width: 800px;">
        <SuInputField 
          label="First name"
          placeholder="Your first name"
          required
        />
        <SuInputField 
          label="Last name"
          placeholder="Your last name"
          required
        />
        <SuSelectBoxField 
          :options="[
            { value: 'fr', label: 'France' },
            { value: 'us', label: 'United States' },
            { value: 'de', label: 'Germany' }
          ]"
          label="Country"
          placeholder="Select your country"
        />
      </SuFormFieldGroup>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormFieldGroup direction="horizontal" gap="md">
    <SuInputField 
      label="First name"
      placeholder="Your first name"
      required
    />
    <SuInputField 
      label="Last name"
      placeholder="Your last name"
      required
    />
    <SuSelectBoxField 
      :options="countryOptions"
      label="Country"
      placeholder="Select your country"
    />
  </SuFormFieldGroup>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spacing between form fields |
| `sectionGap` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Spacing between sections (head, content, footer) |
| `size` | `'sm' \| 'md' \| 'lg'` | `undefined` | Forced size for all fields |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Display direction of fields |

### Accessibility attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label for the group |
| `ariaDescribedBy` | `string` | `undefined` | ID of the description element |
| `role` | `string` | `undefined` | Custom ARIA role (e.g. 'form', 'group') |

### Slots

| Slot | Description |
|------|-------------|
| `head` | Content displayed before fields (header) |
| `default` | Form fields to display |
| `footer` | Content displayed after fields (footer) |

## Prop behavior

### 🔄 Automatic propagation

When `size` is defined on `FormFieldGroup`, it **overrides** the props of child fields automatically:

```vue
<!-- All fields will have 'lg' size -->
<SuFormFieldGroup size="lg">
  <SuInputField size="sm" label="Field 1" />  <!-- Becomes lg -->
  <SuInputField label="Field 2" />            <!-- Becomes lg -->
  <SuSelectBoxField size="md" label="Select" /> <!-- Becomes lg -->
</SuFormFieldGroup>
```

### 🎯 Content validation

The component automatically checks that only form field components are passed in the slot:

- ✅ **Form field components**: `InputField`, `SelectBoxField`, `RadioGroupField`, `CheckboxGroupField`, `SwitchField`, `FileUploadField`, `TextareaField`, `SliderField`
- ⚠️ **Other components**: Warning in console and element ignored
- ✅ **Comments/text**: Silently ignored (normal Vue behavior)

## Spacing and structure

### 📏 Gap values (between fields)

- `gap="sm"` : 0.75rem (12px)
- `gap="md"` : 1rem (16px) - **default**
- `gap="lg"` : 1.5rem (24px)
- `gap="xl"` : 2rem (32px)

### 📐 SectionGap values (between head, content, footer)

- `sectionGap="sm"` : 1rem (16px)
- `sectionGap="md"` : 1.5rem (24px)
- `sectionGap="lg"` : 2rem (32px) - **default**
- `sectionGap="xl"` : 2.5rem (40px)

### 📱 Responsive

In horizontal mode, the component automatically switches to vertical on mobile (≤768px) for better user experience.

## Direction

### 📐 Vertical vs Horizontal

- **Vertical** (default): Fields stacked in column
- **Horizontal**: Fields aligned in row with equal width

```vue
<!-- Vertical -->
<SuFormFieldGroup direction="vertical">
  <SuInputField label="Field 1" />
  <SuInputField label="Field 2" />
</SuFormFieldGroup>

<!-- Horizontal -->
<SuFormFieldGroup direction="horizontal">
  <SuInputField label="First name" />
  <SuInputField label="Last name" />
</SuFormFieldGroup>
```

## Accessibility

The FormFieldGroup component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **ARIA roles**: Support for `form`, `group`, etc. roles
- **Group labels**: `aria-label` to describe the form
- **Keyboard navigation**: Preserves Tab navigation between fields
- **Semantic structure**: Logical organization of sections
- **Descriptions**: Support for `aria-describedby` for descriptions
- **Responsive**: Automatic adaptation on mobile

### 🎯 Best practices

```vue
<!-- Main form -->
<SuFormFieldGroup 
  gap="lg" 
  role="form" 
  aria-label="Registration form"
>
  <SuInputField label="Email" type="email" required />
  <SuInputField label="Password" type="password" required />
</SuFormFieldGroup>

<!-- Settings section -->
<SuFormFieldGroup 
  gap="md" 
  role="group" 
  aria-label="Notification settings"
  aria-describedby="notification-help"
>
  <SuSwitchField label="Email notifications" />
  <SuSwitchField label="Push notifications" />
</SuFormFieldGroup>
<div id="notification-help">Configure your notification preferences</div>

<!-- Responsive horizontal form -->
<SuFormFieldGroup 
  direction="horizontal" 
  gap="md"
  role="form"
  aria-label="Shipping address"
>
  <SuInputField label="First name" required />
  <SuInputField label="Last name" required />
  <SuInputField label="Postal code" required />
</SuFormFieldGroup>
```

## Advanced usage examples

### Contact form

```vue
<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  preferences: []
})

const subjects = [
  { value: 'support', label: 'Technical support' },
  { value: 'sales', label: 'Sales' },
  { value: 'billing', label: 'Billing' }
]

const preferences = [
  { value: 'email', label: 'Email response' },
  { value: 'phone', label: 'Phone callback' }
]
</script>

<template>
  <SuFormFieldGroup 
    gap="lg" 
    sectionGap="xl"
    role="form" 
    aria-label="Contact form"
  >
    <template #head>
      <div class="contact-header">
        <h1>Contact us</h1>
        <p>Our team will respond as soon as possible</p>
      </div>
    </template>

    <SuInputField 
      label="Full name"
      v-model="form.name"
      required
    />
    
    <SuInputField 
      type="email"
      label="Email"
      v-model="form.email"
      required
    />
    
    <SuSelectBoxField 
      :options="subjects"
      label="Subject"
      v-model="form.subject"
      required
    />
    
    <SuTextareaField 
      label="Message"
      v-model="form.message"
      :maxLength="1000"
      :showCounter="true"
      required
    />
    
    <SuCheckboxGroup 
      :options="preferences"
      label="Contact preferences"
      v-model="form.preferences"
    />

    <template #footer>
      <div class="form-footer">
        <SuButton variant="outline">Cancel</SuButton>
        <SuButton variant="primary">Send</SuButton>
      </div>
    </template>
  </SuFormFieldGroup>
</template>
```

## Slot content control

The `FormFieldGroup` component automatically checks the content of its slot:

### ✅ Accepted elements
- Design system form field components: `InputField`, `SelectBoxField`, `RadioGroupField`, `CheckboxGroupField`, `SwitchField`, `FileUploadField`, `TextareaField`, `SliderField`
- Vue comments (ignored)
- Empty text nodes (ignored)

### ⚠️ Rejected elements
- Other components or HTML elements
- Warning in development console
- Element ignored in render

### 🔍 Validation example

```vue
<!-- ✅ Correct -->
<SuFormFieldGroup>
  <SuInputField label="Name" />
  <SuSelectBoxField :options="options" label="Choice" />
  <!-- Comment ignored -->
</SuFormFieldGroup>

<!-- ⚠️ Warning in console -->
<SuFormFieldGroup>
  <SuInputField label="Valid field" />
  <div>Non-field element</div> <!-- Ignored with warning -->
  <SuSwitchField label="Valid switch" />
</SuFormFieldGroup>
```

This approach ensures visual and functional consistency while informing developers of potential issues.