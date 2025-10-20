# Textarea

Flexible Textarea component with character counter, automatic height adjustment and compliance with W3C accessibility standards.

## Usage examples

### Basic Textarea

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple textarea</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="Description"
        placeholder="Enter your description..."
        message="Describe your project in a few sentences"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const description = ref('')
</script>

<template>
  <SuTextarea 
    label="Description"
    placeholder="Enter your description..."
    message="Describe your project in a few sentences"
    v-model="description"
  />
</template>
```

### With character counter

<div class="component-demo">
  <div class="demo-section">
    <h4>Character counter</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="Comment"
        placeholder="Your comment..."
        :maxLength="200"
        :showCounter="true"
        message="Share your opinion about this product"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const comment = ref('')
</script>

<template>
  <SuTextarea 
    label="Comment"
    placeholder="Your comment..."
    :maxLength="200"
    :showCounter="true"
    message="Share your opinion about this product"
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
        label="Message"
        placeholder="Type your message..."
        :autoResize="true"
        :minRows="2"
        :maxRows="8"
        message="Height adjusts automatically to content"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const message = ref('')
</script>

<template>
  <SuTextarea 
    label="Message"
    placeholder="Type your message..."
    :autoResize="true"
    :minRows="2"
    :maxRows="8"
    message="Height adjusts automatically to content"
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
        label="Small"
        placeholder="Small textarea"
        :rows="2"
      />
      <SuTextarea 
        size="md"
        label="Medium"
        placeholder="Medium textarea"
        :rows="3"
      />
      <SuTextarea 
        size="lg"
        label="Large"
        placeholder="Large textarea"
        :rows="4"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea size="sm" label="Small" placeholder="Small textarea" />
  <SuTextarea size="md" label="Medium" placeholder="Medium textarea" />
  <SuTextarea size="lg" label="Large" placeholder="Large textarea" />
</template>
```

### States and validation

<div class="component-demo">
  <div class="demo-section">
    <h4>Validation states</h4>
    <div class="demo-inputs">
      <SuTextarea 
        label="Default state"
        placeholder="Enter text"
        message="Help text to guide the user"
      />
      <SuTextarea 
        state="error"
        label="Error state"
        placeholder="Enter text"
        message="This field contains an error"
        value="Text with error"
      />
      <SuTextarea 
        state="success"
        label="Success state"
        placeholder="Enter text"
        message="Valid content!"
        value="Successfully validated text"
      />
      <SuTextarea 
        state="warning"
        label="Warning state"
        placeholder="Enter text"
        message="Be careful with content"
        value="Text requiring attention"
      />
    </div>
  </div>
</div>

```vue
<template>
  <SuTextarea 
    state="default"
    label="Default state"
    message="Help text to guide the user"
  />
  <SuTextarea 
    state="error"
    label="Error state"
    message="This field contains an error"
  />
  <SuTextarea 
    state="success"
    label="Success state"
    message="Valid content!"
  />
  <SuTextarea 
    state="warning"
    label="Warning state"
    message="Be careful with content"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Textarea size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Textarea visual state |
| `disabled` | `boolean` | `false` | Disable the textarea |
| `readonly` | `boolean` | `false` | Read-only textarea |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string` | `undefined` | Textarea value |
| `rows` | `number` | `3` | Default number of rows |
| `minRows` | `number` | `2` | Minimum number of rows (auto-resize) |
| `maxRows` | `number` | `10` | Maximum number of rows (auto-resize) |
| `maxLength` | `number` | `undefined` | Maximum number of characters |
| `showCounter` | `boolean` | `false` | Show character counter |
| `autoResize` | `boolean` | `false` | Automatic height adjustment |
| `label` | `string` | `undefined` | Textarea label |
| `message` | `string` | `undefined` | Displayed message |
| `spellcheck` | `boolean` | `true` | Spell checking |
| `wrap` | `'soft' \| 'hard' \| 'off'` | `'soft'` | Line wrapping mode |

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

## Accessibility

The Textarea component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Associated labels**: Each textarea has a properly associated label via `for`/`id`
- **ARIA attributes**: Complete support for ARIA attributes
- **State messages**: Error/success/warning messages with `aria-live`
- **Accessible counter**: Voice announcements for character limits
- **Color contrast**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Visible focus**: Clear and contrasted focus indicator
- **Minimum sizes**: Respects minimum touch target sizes
- **Dark mode**: Automatically adapted contrast
- **High contrast**: Support for `prefers-contrast: high`
- **Reduced motion**: Respects `prefers-reduced-motion`

### 🎯 Best practices

```vue
<!-- Textarea with validation and accessibility -->
<SuTextarea 
  label="Project description"
  :required="true"
  :maxLength="500"
  :showCounter="true"
  :autoResize="true"
  placeholder="Describe your project..."
  message="Minimum 50 characters recommended"
  autocomplete="off"
  v-model="description"
/>

<!-- Textarea with error handling -->
<SuTextarea 
  label="Comment"
  :maxLength="1000"
  :showCounter="true"
  :state="hasError ? 'error' : 'default'"
  :message="hasError ? 'Comment cannot be empty' : 'Share your opinion'"
  v-model="comment"
/>

<!-- Auto-resize textarea with limits -->
<SuTextarea 
  label="Message"
  :autoResize="true"
  :minRows="3"
  :maxRows="12"
  :maxLength="2000"
  :showCounter="true"
  placeholder="Write your message..."
  v-model="message"
/>
```

## Advanced features

### 🔄 Smart auto-resize

The textarea can automatically adjust its height based on content:

- **Minimum height**: Defined by `minRows`
- **Maximum height**: Defined by `maxRows`
- **Smooth adjustment**: Smooth transition during resizing
- **Optimized performance**: Efficient height calculation

### 📊 Character counter

The counter provides visual and voice feedback:

- **Dynamic display**: `characters_typed/max_limit`
- **Visual states**: Normal, near limit, over limit
- **Voice announcements**: Messages for screen readers
- **Adapted colors**: Green, orange, red based on state

### 🎨 Visual states

- **Normal**: Gray border, black text
- **Near limit**: Orange counter (≤10% remaining)
- **Over limit**: Red border and text, red counter
- **Validation**: Colored borders based on state (error, success, warning)

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from textarea |
| `Shift + Tab` | Reverse navigation |
| `Ctrl/Cmd + A` | Select all text |
| `Ctrl/Cmd + Z` | Undo last action |
| `Ctrl/Cmd + Y` | Redo action |

## Advanced usage examples

### Contact form

```vue
<script setup>
import { ref, computed } from 'vue'

const subject = ref('')
const message = ref('')

const isValid = computed(() => {
  return subject.value.length >= 5 && message.value.length >= 20
})

const subjectState = computed(() => {
  if (!subject.value) return 'default'
  return subject.value.length >= 5 ? 'success' : 'error'
})

const messageState = computed(() => {
  if (!message.value) return 'default'
  return message.value.length >= 20 ? 'success' : 'error'
})
</script>

<template>
  <form class="contact-form">
    <h2>Contact us</h2>
    
    <SuInput 
      label="Subject"
      :required="true"
      :state="subjectState"
      :message="subject.length < 5 && subject.length > 0 ? 'Minimum 5 characters' : undefined"
      placeholder="Message subject"
      v-model="subject"
    />
    
    <SuTextarea 
      label="Message"
      :required="true"
      :maxLength="2000"
      :showCounter="true"
      :autoResize="true"
      :minRows="4"
      :maxRows="12"
      :state="messageState"
      :message="message.length < 20 && message.length > 0 ? 'Minimum 20 characters' : 'Describe your request in detail'"
      placeholder="Describe your request..."
      v-model="message"
    />
    
    <button 
      type="submit" 
      :disabled="!isValid"
      class="submit-button"
    >
      Send message
    </button>
  </form>
</template>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-button:not(:disabled):hover {
  background-color: #2563eb;
}
</style>
```

### Simple text editor

```vue
<script setup>
import { ref, computed } from 'vue'

const content = ref('')
const wordCount = computed(() => {
  return content.value.trim().split(/\s+/).filter(word => word.length > 0).length
})

const characterCount = computed(() => content.value.length)
const estimatedReadingTime = computed(() => {
  const wordsPerMinute = 200
  return Math.ceil(wordCount.value / wordsPerMinute)
})
</script>

<template>
  <div class="editor">
    <div class="editor-header">
      <h3>Text editor</h3>
      <div class="editor-stats">
        <span>{{ wordCount }} words</span>
        <span>{{ characterCount }} characters</span>
        <span>~{{ estimatedReadingTime }} min read</span>
      </div>
    </div>
    
    <SuTextarea 
      label="Content"
      :autoResize="true"
      :minRows="8"
      :maxRows="20"
      :maxLength="5000"
      :showCounter="true"
      placeholder="Start writing your article..."
      message="Write your content. The editor adapts automatically."
      :spellcheck="true"
      v-model="content"
    />
  </div>
</template>

<style scoped>
.editor {
  max-width: 800px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.editor-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
```