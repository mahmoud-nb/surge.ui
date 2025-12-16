# Textarea

Flexible **Textarea** component with character counter, automatic height adjustment and W3C accessibility standards compliance.

## Description

`SuTextarea` is an enhanced text area component that extends the capabilities of a native `<textarea>` element. It offers advanced features such as character counter, automatic height adjustment, and complete accessibility management.

## Usage examples

### Simple usage (without SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Basic Textarea</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="Enter your text..."
        :rows="4"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <SuTextarea 
    placeholder="Enter your text..."
    :rows="4"
    v-model="text"
  />
</template>
```

### With character counter

<div class="component-demo">
  <div class="demo-section">
    <h4>Character counter</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="Your comment..."
        :maxLength="200"
        :showCounter="true"
        :rows="3"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const comment = ref('')
</script>

<template>
  <SuTextarea 
    placeholder="Your comment..."
    :maxLength="200"
    :showCounter="true"
    :rows="3"
    v-model="comment"
  />
</template>
```

### Automatic height adjustment

<div class="component-demo">
  <div class="demo-section">
    <h4>Auto-resize</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="Type your message..."
        :autoResize="true"
        :minRows="2"
        :maxRows="8"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <SuTextarea 
    placeholder="Type your message..."
    :autoResize="true"
    :minRows="2"
    :maxRows="8"
    v-model="message"
  />
</template>
```

### Sizes

<div class="component-demo">
  <div class="demo-section">
    <h4>Available sizes</h4>
    <div class="demo-inputs">
      <SuTextarea 
        size="sm"
        placeholder="Small textarea"
        :rows="2"
      />
      <SuTextarea 
        size="md"
        placeholder="Medium textarea"
        :rows="3"
      />
      <SuTextarea 
        size="lg"
        placeholder="Large textarea"
        :rows="4"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea 
    size="sm" 
    placeholder="Small textarea" 
    :rows="2"
  />
  
  <SuTextarea 
    size="md" 
    placeholder="Medium textarea" 
    :rows="3"
  />
  
  <SuTextarea 
    size="lg" 
    placeholder="Large textarea" 
    :rows="4"
  />
</template>
```

### States

<div class="component-demo">
  <div class="demo-section">
    <h4>Visual states</h4>
    <div class="demo-inputs">
      <SuTextarea 
        placeholder="Default state"
        :rows="2"
      />
      <SuTextarea 
        state="error"
        value="Text with error"
        :rows="2"
      />
      <SuTextarea 
        state="success"
        value="Validated text"
        :rows="2"
      />
      <SuTextarea 
        state="warning"
        value="Text with warning"
        :rows="2"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea 
    placeholder="Default state"
  />
  
  <SuTextarea 
    state="error"
    value="Text with error"
  />
  
  <SuTextarea 
    state="success"
    value="Validated text"
  />
  
  <SuTextarea 
    state="warning"
    value="Text with warning"
  />
</template>
```

## Usage with SuFormField

The `SuTextarea` component can be used with `SuFormField` to benefit from a complete form structure with label, message and state management.

### Basic usage with SuFormField

```vue
<template>
  <SuFormField 
    label="Description" 
    message="Describe your project in a few sentences"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Enter your description..."
        :rows="4"
        v-bind="slotProps"
        v-model="description"
      />
    </template>
  </SuFormField>
</template>
```

### With slot props destructuring

```vue
<template>
  <SuFormField 
    label="Comment"
    :required="true"
    message="Share your thoughts"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuTextarea 
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        placeholder="Your comment..."
        :rows="3"
        v-model="comment"
      />
    </template>
  </SuFormField>
</template>
```

### Validation with states

<div class="component-demo">
  <div class="demo-section">
    <h4>Textarea with validation</h4>
    <div class="demo-inputs">
      <SuFormField 
        label="Message"
        :required="true"
        state="error"
        message="Message must contain at least 10 characters"
      >
        <template #default="slotProps">
          <SuTextarea 
            placeholder="Type your message..."
            :rows="3"
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

const message = ref('')
const messageError = ref('')

const validateMessage = () => {
  if (!message.value) {
    messageError.value = 'Message is required'
  } else if (message.value.length < 10) {
    messageError.value = 'Message must contain at least 10 characters'
  } else {
    messageError.value = ''
  }
}

const messageState = computed(() => {
  if (!message.value) return 'default'
  return messageError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="Message"
    :required="true"
    :state="messageState"
    :message="messageError || 'Write your message'"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Type your message..."
        :rows="3"
        v-bind="slotProps"
        v-model="message"
        @blur="validateMessage"
      />
    </template>
  </SuFormField>
</template>
```

### With character counter and FormField

```vue
<template>
  <SuFormField 
    label="Tweet"
    message="Share your thoughts"
    :required="true"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="What's happening?"
        :maxLength="280"
        :showCounter="true"
        :autoResize="true"
        :minRows="2"
        :maxRows="6"
        v-bind="slotProps"
        v-model="tweet"
      />
    </template>
  </SuFormField>
</template>
```

### Auto-resize with FormField

```vue
<template>
  <SuFormField 
    label="Project description"
    message="Height adjusts automatically to content"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Describe your project..."
        :autoResize="true"
        :minRows="3"
        :maxRows="12"
        v-bind="slotProps"
        v-model="projectDescription"
      />
    </template>
  </SuFormField>
</template>
```

### Custom label and message

```vue
<script setup>
import { DocumentTextIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Content" 
    :required="true"
    message="Write your article"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <DocumentTextIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Start writing..."
        :autoResize="true"
        :minRows="4"
        :maxRows="12"
        :maxLength="5000"
        :showCounter="true"
        v-bind="slotProps"
        v-model="content"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Content is too short</span>
        <span v-else>Write your article (minimum 100 characters)</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Character limit with feedback

```vue
<script setup>
import { ref, computed } from 'vue'

const feedback = ref('')

const remainingChars = computed(() => 500 - feedback.value.length)
const feedbackState = computed(() => {
  if (!feedback.value) return 'default'
  if (feedback.value.length < 10) return 'error'
  if (feedback.value.length > 500) return 'error'
  return 'success'
})
</script>

<template>
  <SuFormField 
    label="Product feedback"
    :required="true"
    :state="feedbackState"
    :message="remainingChars < 0 ? 'Limit exceeded' : `${remainingChars} characters remaining`"
  >
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Share your experience..."
        :maxLength="500"
        :showCounter="true"
        :autoResize="true"
        :minRows="3"
        :maxRows="8"
        v-bind="slotProps"
        v-model="feedback"
      />
    </template>
  </SuFormField>
</template>
```

### Disabled or readonly field

```vue
<template>
  <!-- Disabled -->
  <SuFormField 
    label="Disabled textarea"
    :disabled="true"
    message="This field is temporarily unavailable"
  >
    <template #default="slotProps">
      <SuTextarea 
        value="This content is disabled"
        v-bind="slotProps"
      />
    </template>
  </SuFormField>
  
  <!-- Read-only -->
  <SuFormField 
    label="Read-only textarea"
    message="View only"
  >
    <template #default="{ fieldId, messageId }">
      <SuTextarea 
        :id="fieldId"
        :aria-describedby="messageId"
        :readonly="true"
        value="This content cannot be modified"
      />
    </template>
  </SuFormField>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | Textarea value (v-model) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Textarea size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the textarea |
| `readonly` | `boolean` | `false` | Read-only textarea |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `rows` | `number` | `3` | Default number of rows |
| `minRows` | `number` | `2` | Minimum rows (auto-resize) |
| `maxRows` | `number` | `10` | Maximum rows (auto-resize) |
| `maxLength` | `number` | `undefined` | Maximum character count |
| `showCounter` | `boolean` | `false` | Display character counter |
| `autoResize` | `boolean` | `false` | Automatic height adjustment |
| `spellcheck` | `boolean` | `true` | Spell checking |
| `wrap` | `'soft' \| 'hard' \| 'off'` | `'soft'` | Line wrap mode |

### Accessibility props (inherited from SuFormField)

When used with `SuFormField`, the component automatically receives:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique field ID (fieldId) |
| `aria-describedby` | `string` | Associated message ID (messageId) |
| `state` | `string` | Validation state |
| `disabled` | `boolean` | Disabled state |

### Additional accessibility attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label |
| `ariaInvalid` | `boolean` | `undefined` | Indicates if value is invalid |
| `ariaRequired` | `boolean` | `undefined` | Indicates if field is required |
| `autocomplete` | `string` | `undefined` | HTML autocomplete attribute |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(value: string) => void` | Emitted when value changes (v-model) |
| `@input` | `(event: Event) => void` | Emitted on input |
| `@change` | `(event: Event) => void` | Emitted on change |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |
| `@keydown` | `(event: KeyboardEvent) => void` | Emitted on key press |
| `@keyup` | `(event: KeyboardEvent) => void` | Emitted on key release |

### Exposed methods

| Method | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Focuses the textarea |
| `select()` | `() => void` | Selects the text |
| `blur()` | `() => void` | Removes focus |
| `textareaRef` | `Ref<HTMLTextAreaElement>` | Reference to native textarea element |

## Accessibility

The Textarea component follows WCAG 2.1 AA standards and W3C best practices:

### ✅ Accessibility features

- **ARIA attributes**: Complete support (`aria-label`, `aria-describedby`, `aria-invalid`, etc.)
- **Accessible counter**: Voice announcements for character limits
- **State messages**: Via aria-describedby (messageId) with `aria-live`
- **Color contrast**: WCAG AA compliant ratios (4.5:1)
- **Visible focus**: Clear focus indicator with outline
- **Minimum sizes**: Touch target respected
- **Dark mode**: Adapted contrast
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Usage best practices

```vue
<!-- ✅ GOOD: Usage with SuFormField for complete accessibility -->
<SuFormField 
  label="Description"
  :required="true"
  :state="descriptionError ? 'error' : 'default'"
  :message="descriptionError || 'Minimum 50 characters'"
>
  <template #default="slotProps">
    <SuTextarea 
      placeholder="Describe your project..."
      :maxLength="500"
      :showCounter="true"
      :autoResize="true"
      v-bind="slotProps"
      v-model="description"
    />
  </template>
</SuFormField>

<!-- ✅ GOOD: Standalone usage with manual ARIA attributes -->
<label for="comment-textarea">Comment</label>
<SuTextarea 
  id="comment-textarea"
  aria-describedby="comment-help"
  aria-required="true"
  placeholder="Your comment..."
  v-model="comment"
/>
<span id="comment-help">Share your thoughts (minimum 10 characters)</span>

<!-- ❌ BAD: Without label or description -->
<SuTextarea 
  placeholder="Text..."
  v-model="text"
/>
```

## Advanced features

### 🔄 Smart auto-resize

The textarea automatically adjusts its height to content:

- **Minimum height**: Defined by `minRows`
- **Maximum height**: Defined by `maxRows`
- **Smooth adjustment**: Gentle transition
- **Optimized performance**: Efficient calculation

### 📊 Character counter

The counter provides visual and vocal feedback:

- **Dynamic display**: `chars_entered/max_limit`
- **Visual states**: Normal, near limit, exceeded
- **Voice announcements**: Messages for screen readers
- **Adapted colors**: Green, orange, red depending on state

## Keyboard navigation

| Key | Action |
|--------|--------|
| `Tab` | Navigate to/from textarea |
| `Shift + Tab` | Reverse navigation |
| `Ctrl/Cmd + A` | Select all text |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Y` | Redo |

## Advanced usage examples

### Complete contact form

```vue
<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  subject: '',
  message: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.subject || formData.value.subject.length < 5) {
    errors.value.subject = 'Minimum 5 characters'
  }
  
  if (!formData.value.message || formData.value.message.length < 20) {
    errors.value.message = 'Minimum 20 characters'
  }
  
  return Object.keys(errors.value).length === 0
}
</script>

<template>
  <form @submit.prevent="validateForm">
    <h2>Contact Us</h2>
    
    <SuFormField 
      label="Subject"
      :required="true"
      :state="errors.subject ? 'error' : 'default'"
      :message="errors.subject || 'Subject of your message'"
    >
      <template #default="slotProps">
        <SuInput 
          placeholder="Subject..."
          v-bind="slotProps"
          v-model="formData.subject"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Message"
      :required="true"
      :state="errors.message ? 'error' : 'default'"
      :message="errors.message || 'Describe your request in detail'"
    >
      <template #default="slotProps">
        <SuTextarea 
          placeholder="Your message..."
          :maxLength="2000"
          :showCounter="true"
          :autoResize="true"
          :minRows="4"
          :maxRows="12"
          v-bind="slotProps"
          v-model="formData.message"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Send</button>
  </form>
</template>
```

### Editor with statistics

```vue
<script setup>
import { ref, computed } from 'vue'

const content = ref('')

const stats = computed(() => ({
  words: content.value.trim().split(/\s+/).filter(w => w.length > 0).length,
  chars: content.value.length,
  readTime: Math.ceil(content.value.trim().split(/\s+/).filter(w => w.length > 0).length / 200)
}))
</script>

<template>
  <div class="editor">
    <div class="stats">
      <span>{{ stats.words }} words</span>
      <span>{{ stats.chars }} characters</span>
      <span>~{{ stats.readTime }} min</span>
    </div>
    
    <SuFormField 
      label="Content"
      message="Write your article"
    >
      <template #default="slotProps">
        <SuTextarea 
          placeholder="Start writing..."
          :autoResize="true"
          :minRows="8"
          :maxRows="20"
          :maxLength="5000"
          :showCounter="true"
          v-bind="slotProps"
          v-model="content"
        />
      </template>
    </SuFormField>
  </div>
</template>
```

## SuTextareaField Component

For even simpler usage, you can use the `SuTextareaField` component which automatically combines `SuFormField` and `SuTextarea`:

```vue
<template>
  <!-- Instead of -->
  <SuFormField label="Description" message="Describe your project">
    <template #default="slotProps">
      <SuTextarea 
        placeholder="Enter your description..."
        v-bind="slotProps"
        v-model="description"
      />
    </template>
  </SuFormField>
  
  <!-- You can simply write -->
  <SuTextareaField 
    label="Description"
    message="Describe your project"
    placeholder="Enter your description..."
    v-model="description"
  />
</template>
```

The `SuTextareaField` component accepts all props from both `SuFormField` and `SuTextarea` combined, offering a more concise syntax while retaining all features.

See the [complete SuTextareaField documentation](./SuTextareaField.md) for more details.