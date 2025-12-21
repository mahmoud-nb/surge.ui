# SuFormField

Container component for form fields with label, help messages, validation states management and accessibility according to W3C standards.

## Description

`SuFormField` is a wrapper component that provides a consistent structure for all form fields. It manages the label, help messages, validation states (error, success, warning) and ensures accessibility by properly associating labels and messages with fields through props exposed in the default slot.

## Usage examples

### Basic usage

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple structure</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Element label" 
        message="Help text to guide the user"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Default slot here
        </div>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <!-- Without explicit slot props -->
  <SuFormField 
    label="Element label" 
    message="Help text to guide the user"
  >
    Default slot here
  </SuFormField>

  <!-- With slot props retrieval -->
  <SuFormField label="Username">
    <template #default="slotProps">
      <FormControlComponent v-bind="slotProps" />
    </template>
  </SuFormField>

  <!-- With slot props destructuring -->
  <SuFormField 
    label="Email" 
    message="Used for login"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <input 
        :id="fieldId"
        :aria-describedby="messageId"
        :aria-invalid="state === 'error'"
        :disabled="disabled"
        type="email"
      />
    </template>
  </SuFormField>
</template>
```

### Props exposed in default slot

The default slot automatically exposes the following props to facilitate accessibility:

```vue
<template>
  <SuFormField label="Example field" message="Help message">
    <template #default="{ fieldId, messageId, state, disabled }">
      <!-- fieldId: Unique field ID (e.g. "field-123") -->
      <!-- messageId: Help message ID (e.g. "message-123") -->
      <!-- state: Current state ('default' | 'error' | 'success' | 'warning') -->
      <!-- disabled: Boolean indicating if field is disabled -->
      
      <YourComponent 
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
      />
    </template>
  </SuFormField>
</template>
```

### Validation states

<div class="component-demo">
  <div class="demo-section">
    <h4>Validation states</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Default state" 
        message="Help text to guide the user"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Default slot here
        </div>
      </SuFormField>
      <br />
      <SuFormField 
        state="error"
        label="Error state" 
        message="This field contains an error"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Default slot here
        </div>
      </SuFormField>
      <br />
      <SuFormField 
        state="success"
        label="Success state" 
        message="Valid value!"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Default slot here
        </div>
      </SuFormField>
      <br />
      <SuFormField 
        state="warning"
        label="Warning state" 
        message="Be careful with this value"
      >
        <div style="border: 1px dashed #9c9980; border-radius: 8px; padding: 4px 8px;">
          Default slot here
        </div>
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
    <template #default="{ fieldId, messageId }">
      <YourFormControlComponent 
        :id="fieldId"
        :aria-describedby="messageId" 
      />
    </template>
  </SuFormField>
  
  <SuFormField 
    state="error"
    label="Error state" 
    message="This field contains an error"
  >
    <template #default="{ fieldId, messageId, state }">
      <YourFormControlComponent 
        :id="fieldId"
        :aria-describedby="messageId"
        :aria-invalid="state === 'error'" 
      />
    </template>
  </SuFormField>
  
  <SuFormField 
    state="success"
    label="Success state" 
    message="Valid value!"
  >
    <template #default="slotProps">
      <YourFormControlComponent 
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
  
  <SuFormField 
    state="warning"
    label="Warning state" 
    message="Be careful with this value"
  >
    <YourFormControlComponent 
      state="warning"
    />
  </SuFormField>
</template>
```

### Required field

<div class="component-demo">
  <div class="demo-section">
    <h4>Required field</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Required field"
        :required="true"
        message="This field is required"
      >
        <SuInput type="text" placeholder="Enter a value" required />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="Required field"
    :required="true"
    message="This field is required"
  >
    <template #default="{ fieldId, messageId }">
      <SuInput 
        :id="fieldId"
        :aria-describedby="messageId"
        :aria-required="true"
        type="text"
        placeholder="Enter a value"
        required
      />
    </template>
  </SuFormField>
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-inputs">
      <SuFormField size="sm" label="Small">
        <input type="text" placeholder="Small field" class="input-sm" />
      </SuFormField>
      <SuFormField size="md" label="Medium">
        <input type="text" placeholder="Medium field" class="input-md" />
      </SuFormField>
      <SuFormField size="lg" label="Large">
        <input type="text" placeholder="Large field" class="input-lg" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField size="sm" label="Small">
    <input type="text" placeholder="Small field" />
  </SuFormField>
  
  <SuFormField size="md" label="Medium">
    <input type="text" placeholder="Medium field" />
  </SuFormField>
  
  <SuFormField size="lg" label="Large">
    <input type="text" placeholder="Large field" />
  </SuFormField>
</template>
```

### Customization with named slots

<div class="component-demo">
  <div class="demo-section">
    <h4>Label and message customization</h4>
    <div class="demo-inputs">
      <SuFormField label="Username" required message="Enter your username">
        <template #label="{ label, required, fieldId }">
          <label :for="fieldId" style="display: flex; gap: 0.5rem; align-items: center; font-weight: bold;">
            <UserIcon style="width: 1rem; height: 1rem;" /> 
            {{ label }} 
            <span v-if="required" style="color: red;">*</span>
          </label>
        </template>
        <SuInput type="text" placeholder="Enter your username" />
        <template #message>
          <div style="font-size: 0.875rem; color: #4a5568;">
            Enter your username <em>(minimum 4 characters).</em>
          </div>
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<script setup>
import { UserIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <!-- Custom label with icon -->
  <SuFormField 
    label="Username" 
    :required="true"
    message="Enter your username"
  >
    <template #label="{ label, required, fieldId }">
      <label 
        :for="fieldId" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <UserIcon class="w-4 h-4" /> 
        {{ label }} 
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>

    <SuInput type="text" placeholder="Enter your username" />
    
    <template #message>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span>Enter your username <em>(minimum 4 characters)</em></span>
      </div>
    </template>
  </SuFormField>

  <!-- Custom message with conditional state -->
  <SuFormField 
    label="Email" 
    :state="emailState"
    message="Default message"
  >
    <template #message="{ state }">
      <div :class="['text-sm', getMessageClass(state)]">
        <span v-if="state === 'error'">⚠️ Invalid email format</span>
        <span v-else-if="state === 'success'">✓ Valid email</span>
        <span v-else>Enter your email address</span>
      </div>
    </template>
    
    <input type="email" placeholder="name@example.com" />
  </SuFormField>
</template>
```

### Disabled field

<div class="component-demo">
  <div class="demo-section">
    <h4>Disabled field</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Disabled field"
        :disabled="true"
        message="This field is disabled"
      >
        <template #default="slotProps">
          <input 
            :id="slotProps?.fieldId"
            :aria-describedby="slotProps?.messageId"
            :disabled="slotProps?.disabled"
            type="text"
            value="Disabled value"
          />
        </template>
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <SuFormField 
    label="Disabled field"
    :disabled="true"
    message="This field is disabled"
  >
    <template #default="{ fieldId, messageId, disabled }">
      <input 
        :id="fieldId"
        :aria-describedby="messageId"
        :disabled="disabled"
        type="text"
        value="Disabled value"
      />
    </template>
  </SuFormField>
</template>
```

### RTL support (right-to-left)

<div class="component-demo">
  <div class="demo-section">
    <h4>RTL language support</h4>
    <div class="demo-inputs" dir="rtl">
      <SuFormField 
        label="حقل النص"
        message="رسالة المساعدة"
      >
        <input type="text" placeholder="أدخل النص هنا" />
      </SuFormField>
      <SuFormField 
        label="שדה טקסט"
        message="הודעת עזרה"
      >
        <input type="text" placeholder="הכנס טקסט כאן" />
      </SuFormField>
    </div>
  </div>
</div>

```vue
<template>
  <div dir="rtl">
    <SuFormField 
      label="حقل النص"
      message="رسالة المساعدة"
    >
      <input type="text" placeholder="أدخل النص هنا" />
    </SuFormField>
    
    <SuFormField 
      label="שדה טקסט"
      message="הודעת עזרה"
    >
      <input type="text" placeholder="הכנס טקסט כאן" />
    </SuFormField>
  </div>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Form field label |
| `message` | `string` | `undefined` | Help or validation message |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Field visual state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Field size |
| `required` | `boolean` | `false` | Indicates if field is required |
| `disabled` | `boolean` | `false` | Disables the field |

### Slots

#### Default slot

The default slot automatically receives the following props:

| Prop | Type | Description |
|------|------|-------------|
| `fieldId` | `string` | Unique generated ID for the field |
| `messageId` | `string` | Unique generated ID for the message |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | Current field state |
| `disabled` | `boolean` | Indicates if field is disabled |

```vue
<SuFormField label="Example">
  <template #default="{ fieldId, messageId, state, disabled }">
    <!-- Your form control here -->
  </template>
</SuFormField>
```

#### Label slot

Allows complete customization of the label rendering.

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label text |
| `required` | `boolean` | Indicates if field is required |
| `fieldId` | `string` | Associated field ID (same value as `fieldId`) |

```vue
<SuFormField label="My label" :required="true">
  <template #label="{ label, required, fieldId }">
    <label :for="fieldId">
      {{ label }} <span v-if="required">*</span>
    </label>
  </template>
</SuFormField>
```

#### Message slot

Allows complete customization of the message rendering.

| Prop | Type | Description |
|------|------|-------------|
| `message` | `string` | Message text |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | Current field state |
| `messageId` | `string` | Message ID (for aria-describedby) |

```vue
<SuFormField message="My message" state="error">
  <template #message="{ message, state, messageId }">
    <div :id="messageId" :class="getMessageClass(state)">
      {{ message }}
    </div>
  </template>
</SuFormField>
```

### Generated CSS classes

The component automatically generates IDs and CSS classes to facilitate styling and accessibility:

- `su-form-field` : Component root class
- `su-form-field--{size}` : Size modifier (`sm`, `md`, `lg`)
- `su-form-field--{state}` : State modifier (`default`, `error`, `success`, `warning`)
- `su-form-field--required` : Applied when `required` is `true`
- `su-form-field--disabled` : Applied when `disabled` is `true`
- `su-form-field__label` : Label class
- `su-form-field__message` : Message class
- `su-form-field__content` : Content container class

## Accessibility

The SuFormField component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **Label/field association**: Label is automatically associated with field via `for`/`id` (provided via `fieldId`)
- **Descriptive messages**: Messages are linked to field via `aria-describedby` (provided via `messageId`)
- **Required field indicator**: Visual and semantic display with `aria-required`
- **Validation states**: Clear state communication via colors, icons and ARIA
- **RTL support**: Complete support for right-to-left languages
- **Color contrast**: WCAG AA compliant ratios (4.5:1 minimum)
- **Live messages**: State change announcements with `aria-live="polite"`
- **Visible focus**: Clear focus indicator on label and field

### 🎯 Usage best practices

```vue
<!-- ✅ GOOD: Complete use of accessibility props -->
<SuFormField 
  label="Email address"
  :required="true"
  state="error"
  message="Email is invalid"
>
  <template #default="{ fieldId, messageId, state }">
    <input 
      :id="fieldId"
      :aria-describedby="messageId"
      :aria-invalid="state === 'error'"
      :aria-required="true"
      type="email"
      autocomplete="email"
    />
  </template>
</SuFormField>

<!-- ❌ BAD: Not using accessibility props -->
<SuFormField label="Email" state="error" message="Invalid">
  <input type="email" />
  <!-- Missing: id, aria-describedby, aria-invalid -->
</SuFormField>

<!-- ✅ GOOD: Custom label with correct for -->
<SuFormField label="Password" :required="true">
  <template #label="{ label, required, fieldId }">
    <label :for="fieldId" class="custom-label">
      {{ label }} <span v-if="required">*</span>
    </label>
  </template>
  <template #default="{ fieldId }">
    <input :id="fieldId" type="password" />
  </template>
</SuFormField>
```

## Advanced usage examples

### Form validation with dynamic states

```vue
<script setup>
import { ref, computed } from 'vue'

const username = ref('')
const usernameError = ref('')

const validateUsername = () => {
  if (!username.value) {
    usernameError.value = 'Username is required'
  } else if (username.value.length < 4) {
    usernameError.value = 'Minimum 4 characters'
  } else {
    usernameError.value = ''
  }
}

const usernameState = computed(() => {
  if (!username.value) return 'default'
  return usernameError.value ? 'error' : 'success'
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <SuFormField 
      label="Username"
      :required="true"
      :state="usernameState"
      :message="usernameError || 'Minimum 4 characters'"
    >
      <template #default="{ fieldId, messageId, state }">
        <input 
          :id="fieldId"
          :aria-describedby="messageId"
          :aria-invalid="state === 'error'"
          type="text"
          v-model="username"
          @blur="validateUsername"
        />
      </template>
    </SuFormField>
  </form>
</template>
```

### Complex form with multiple fields

```vue
<script setup>
import { ref } from 'vue'

const formData = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.email) {
    errors.value.email = 'Email required'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Invalid email'
  }
  
  if (!formData.value.password) {
    errors.value.password = 'Password required'
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'Minimum 8 characters'
  }
  
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }
  
  return Object.keys(errors.value).length === 0
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <SuFormField 
      label="Email"
      :required="true"
      :state="errors.email ? 'error' : 'default'"
      :message="errors.email || 'Your email address'"
    >
      <template #default="slotProps">
        <input 
          type="email"
          v-model="formData.email"
          v-bind="slotProps"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Password"
      :required="true"
      :state="errors.password ? 'error' : 'default'"
      :message="errors.password || 'Minimum 8 characters'"
    >
      <template #default="slotProps">
        <input 
          type="password"
          v-model="formData.password"
          v-bind="slotProps"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Confirmation"
      :required="true"
      :state="errors.confirmPassword ? 'error' : 'default'"
      :message="errors.confirmPassword || 'Confirm your password'"
    >
      <template #default="slotProps">
        <input 
          type="password"
          v-model="formData.confirmPassword"
          v-bind="slotProps"
        />
      </template>
    </SuFormField>
  </form>
</template>
```

### Integration with different control types

```vue
<template>
  <!-- Standard input -->
  <SuFormField label="Name">
    <template #default="slotProps">
      <input type="text" v-bind="slotProps" />
    </template>
  </SuFormField>
  
  <!-- Select -->
  <SuFormField label="Country">
    <template #default="{ fieldId, messageId }">
      <select :id="fieldId" :aria-describedby="messageId">
        <option value="">Select...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </select>
    </template>
  </SuFormField>
  
  <!-- Textarea -->
  <SuFormField label="Description">
    <template #default="{ fieldId, messageId }">
      <textarea 
        :id="fieldId" 
        :aria-describedby="messageId"
        rows="4"
      ></textarea>
    </template>
  </SuFormField>
  
  <!-- Checkbox -->
  <SuFormField label="I accept the terms">
    <template #default="{ fieldId }">
      <input :id="fieldId" type="checkbox" />
    </template>
  </SuFormField>
  
  <!-- Radio group -->
  <SuFormField label="Gender">
    <template #default="{ messageId }">
      <div :aria-describedby="messageId">
        <label><input type="radio" name="gender" value="m" /> Male</label>
        <label><input type="radio" name="gender" value="f" /> Female</label>
        <label><input type="radio" name="gender" value="o" /> Other</label>
      </div>
    </template>
  </SuFormField>
</template>
```

## Design system integration

The `SuFormField` component is designed to be used with all form controls in your design system:

```vue
<template>
  <!-- With SuInput -->
  <SuFormField label="Email">
    <template #default="slotProps">
      <SuInput type="email" v-bind="slotProps" />
    </template>
  </SuFormField>
  
  <!-- With SuSelect (future component) -->
  <SuFormField label="Country">
    <template #default="slotProps">
      <SuSelect :options="countries" v-bind="slotProps" />
    </template>
  </SuFormField>
  
  <!-- With SuTextarea (future component) -->
  <SuFormField label="Message">
    <template #default="slotProps">
      <SuTextarea v-bind="slotProps" />
    </template>
  </SuFormField>
</template>
```