# FileUpload

FileUpload component for file uploading with drag & drop support, format and size validation, and complete W3C accessibility compliance.

## Description

`FileUpload` is an enhanced file upload component that allows selecting files via a browse button or drag-and-drop. It offers automatic format and size validation, image preview display, progress management, and complies with all accessibility standards.

## Usage examples

### Simple usage (without SuFormField)

<div class="component-demo">
  <div class="demo-section">
    <h4>Basic upload</h4>
    <div class="demo-inputs">
      <SuFileUpload 
        placeholder="Select your files or drag them here"
      />
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <SuFileUpload 
    placeholder="Select your files or drag them here"
    v-model="files"
  />
</template>
```

### Multiple upload

```vue
<script setup>
import { ref } from 'vue'

const images = ref([])
</script>

<template>
  <SuFileUpload 
    :multiple="true"
    :maxFiles="5"
    accept="image/*"
    placeholder="Select up to 5 images"
    v-model="images"
  />
</template>
```

### With size validation

```vue
<script setup>
import { ref } from 'vue'

const documents = ref([])
</script>

<template>
  <SuFileUpload 
    :maxSize="10 * 1024 * 1024"
    accept=".pdf,.doc,.docx"
    placeholder="Documents (max 10MB)"
    v-model="documents"
  />
</template>
```

### Sizes

```vue
<template>
  <SuFileUpload 
    size="sm" 
    placeholder="Small upload"
  />
  
  <SuFileUpload 
    size="md" 
    placeholder="Medium upload"
  />
  
  <SuFileUpload 
    size="lg" 
    placeholder="Large upload"
  />
</template>
```

### States

```vue
<template>
  <SuFileUpload 
    placeholder="Default state"
  />
  
  <SuFileUpload 
    state="error"
    placeholder="Error state"
  />
  
  <SuFileUpload 
    state="success"
    placeholder="Success state"
  />
  
  <SuFileUpload 
    state="warning"
    placeholder="Warning state"
  />
</template>
```

### Visual variants

```vue
<template>
  <SuFileUpload 
    variant="default"
    placeholder="Default style"
  />
  
  <SuFileUpload 
    variant="dashed"
    placeholder="Dashed borders"
  />
  
  <SuFileUpload 
    variant="solid"
    placeholder="Solid borders"
  />
  
  <SuFileUpload 
    variant="minimal"
    placeholder="Minimal style"
  />
</template>
```

### With progress

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])

const handleFileUpload = (file) => {
  // Simulate upload with progress
  file.status = 'uploading'
  file.progress = 0
  
  const interval = setInterval(() => {
    file.progress += 10
    
    if (file.progress >= 100) {
      clearInterval(interval)
      file.status = 'success'
    }
  }, 200)
}
</script>

<template>
  <SuFileUpload 
    :multiple="true"
    :showProgress="true"
    placeholder="Upload with progress"
    v-model="files"
    @upload="handleFileUpload"
  />
</template>
```

### Special states

```vue
<template>
  <SuFileUpload 
    :disabled="true"
    placeholder="Disabled upload"
  />
  
  <SuFileUpload 
    :readonly="true"
    placeholder="Read-only"
  />
  
  <SuFileUpload 
    :loading="true"
    placeholder="Loading..."
  />
</template>
```

## Usage with SuFormField

The `SuFileUpload` component can be used with `SuFormField` to benefit from a complete form structure with label, message and state management.

### Basic usage with SuFormField

```vue
<template>
  <SuFormField 
    label="Documents" 
    message="Accepted formats: PDF, DOC, DOCX"
  >
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf,.doc,.docx"
        placeholder="Select your documents"
        v-bind="slotProps"
        v-model="documents"
      />
    </template>
  </SuFormField>
</template>
```

### With slot props destructuring

```vue
<template>
  <SuFormField 
    label="Images"
    :required="true"
    message="Upload your images"
  >
    <template #default="{ fieldId, messageId, state, disabled }">
      <SuFileUpload 
        :id="fieldId"
        :aria-describedby="messageId"
        :state="state"
        :disabled="disabled"
        :multiple="true"
        accept="image/*"
        placeholder="Drag your images here"
        v-model="images"
      />
    </template>
  </SuFormField>
</template>
```

### Validation with states

```vue
<script setup>
import { ref, computed } from 'vue'

const cv = ref([])
const cvError = ref('')

const validateCV = () => {
  if (cv.value.length === 0) {
    cvError.value = 'CV is required'
  } else {
    cvError.value = ''
  }
}

const cvState = computed(() => {
  if (cv.value.length === 0) return 'default'
  return cvError.value ? 'error' : 'success'
})
</script>

<template>
  <SuFormField 
    label="CV"
    :required="true"
    :state="cvState"
    :message="cvError || 'PDF or Word format, maximum 5MB'"
  >
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf,.doc,.docx"
        :maxSize="5 * 1024 * 1024"
        :maxFiles="1"
        placeholder="Upload your CV"
        v-bind="slotProps"
        v-model="cv"
        @change="validateCV"
      />
    </template>
  </SuFormField>
</template>
```

### Multiple upload with FormField

```vue
<template>
  <SuFormField 
    label="Portfolio"
    message="Images of your work (max 10 files)"
  >
    <template #default="slotProps">
      <SuFileUpload 
        :multiple="true"
        :maxFiles="10"
        :maxSize="20 * 1024 * 1024"
        accept="image/*,.pdf"
        placeholder="Drag your files here"
        v-bind="slotProps"
        v-model="portfolio"
      />
    </template>
  </SuFormField>
</template>
```

### Custom label and message

```vue
<script setup>
import { DocumentArrowUpIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <SuFormField 
    label="Supporting documents" 
    :required="true"
    message="Upload your documents"
  >
    <template #label="{ label, required, htmlFor }">
      <label 
        :for="htmlFor" 
        class="flex items-center gap-2 font-bold text-gray-900"
      >
        <DocumentArrowUpIcon class="w-4 h-4" />
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </template>
    
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf,.jpg,.png"
        :maxSize="10 * 1024 * 1024"
        :multiple="true"
        placeholder="PDF, JPG or PNG"
        v-bind="slotProps"
        v-model="documents"
      />
    </template>
    
    <template #message="{ state }">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <InformationCircleIcon class="w-4 h-4" />
        <span v-if="state === 'error'">⚠️ Invalid format or size</span>
        <span v-else>Maximum 10MB per file</span>
      </div>
    </template>
  </SuFormField>
</template>
```

### Error handling

```vue
<script setup>
import { ref } from 'vue'

const files = ref([])
const uploadError = ref('')

const handleError = (error, file) => {
  uploadError.value = error
  console.error('Upload error:', error, file)
}

const handleUpload = (file) => {
  uploadError.value = ''
  console.log('File added:', file)
}
</script>

<template>
  <SuFormField 
    label="Files"
    :state="uploadError ? 'error' : 'default'"
    :message="uploadError || 'Drag your files or click to browse'"
  >
    <template #default="slotProps">
      <SuFileUpload 
        :multiple="true"
        v-bind="slotProps"
        v-model="files"
        @upload="handleUpload"
        @error="handleError"
      />
    </template>
  </SuFormField>
</template>
```

### Application form

```vue
<script setup>
import { ref } from 'vue'

const formData = ref({
  cv: [],
  coverLetter: [],
  portfolio: []
})

const handleCVUpload = (file) => {
  console.log('CV uploaded:', file)
  // Start upload to server
}

const handleError = (error, file) => {
  alert(`Error: ${error}`)
}
</script>

<template>
  <form class="application-form">
    <h2>Application</h2>
    
    <SuFormField 
      label="CV"
      :required="true"
      message="PDF or Word format, maximum 5MB"
    >
      <template #default="slotProps">
        <SuFileUpload 
          accept=".pdf,.doc,.docx"
          :maxSize="5 * 1024 * 1024"
          :maxFiles="1"
          placeholder="Upload your CV"
          v-bind="slotProps"
          v-model="formData.cv"
          @upload="handleCVUpload"
          @error="handleError"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Cover letter"
      message="PDF or Word format, maximum 5MB"
    >
      <template #default="slotProps">
        <SuFileUpload 
          accept=".pdf,.doc,.docx"
          :maxSize="5 * 1024 * 1024"
          :maxFiles="1"
          placeholder="Upload your cover letter"
          v-bind="slotProps"
          v-model="formData.coverLetter"
          @error="handleError"
        />
      </template>
    </SuFormField>
    
    <SuFormField 
      label="Portfolio"
      message="Images and PDF, max 10 files of 20MB"
    >
      <template #default="slotProps">
        <SuFileUpload 
          accept="image/*,.pdf"
          :maxSize="20 * 1024 * 1024"
          :maxFiles="10"
          :multiple="true"
          placeholder="Your work"
          v-bind="slotProps"
          v-model="formData.portfolio"
          @error="handleError"
        />
      </template>
    </SuFormField>
    
    <button type="submit">Submit</button>
  </form>
</template>
```

### Disabled field

```vue
<template>
  <SuFormField 
    label="Disabled upload"
    :disabled="true"
    message="This feature is temporarily disabled"
  >
    <template #default="slotProps">
      <SuFileUpload 
        placeholder="Not available"
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
| `modelValue` | `UploadedFile[]` | `[]` | List of files (v-model) |
| `multiple` | `boolean` | `false` | Multiple selection |
| `accept` | `string` | `undefined` | Accepted MIME types or extensions |
| `maxSize` | `number` | `10485760` | Max size per file (10MB) |
| `maxFiles` | `number` | `5` | Max number of files |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable component |
| `readonly` | `boolean` | `false` | Read-only mode |
| `required` | `boolean` | `false` | Required field |
| `placeholder` | `string` | `'Select...'` | Drop zone text |
| `dragText` | `string` | `'Release...'` | Text during drag |
| `browseText` | `string` | `'Browse'` | Button text |
| `variant` | `'default' \| 'dashed' \| 'solid' \| 'minimal'` | `'default'` | Visual style |
| `showProgress` | `boolean` | `false` | Show progress |
| `allowPreview` | `boolean` | `true` | Image previews |
| `showFileList` | `boolean` | `true` | File list |
| `loading` | `boolean` | `false` | Loading state |

### Accessibility props (inherited from SuFormField)

When used with `SuFormField`, automatically receives:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique ID (fieldId) |
| `aria-describedby` | `string` | Message ID (messageId) |
| `state` | `string` | Validation state |
| `disabled` | `boolean` | Disabled state |

### Types

#### UploadedFile
```typescript
interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress?: number
  error?: string
  preview?: string
}
```

### Events

| Event | Type | Description |
|-------|------|-------------|
| `@update:modelValue` | `(files: UploadedFile[]) => void` | Emitted on change (v-model) |
| `@change` | `(files: UploadedFile[]) => void` | Emitted on change |
| `@upload` | `(file: UploadedFile) => void` | Emitted for each added file |
| `@remove` | `(file: UploadedFile) => void` | Emitted on deletion |
| `@error` | `(error: string, file?: File) => void` | Emitted on error |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

### Exposed methods

| Method | Type | Description |
|---------|------|-------------|
| `focus()` | `() => void` | Give focus |
| `clear()` | `() => void` | Remove all files |
| `fileInputRef` | `Ref<HTMLInputElement>` | File input reference |
| `dropZoneRef` | `Ref<HTMLDivElement>` | Drop zone reference |

## File validation

The component performs several automatic validations:

### 🔍 Validation types

- **Format**: Verification against `accept`
- **Size**: Verification against `maxSize`
- **Number**: Verification against `maxFiles`
- **Duplicates**: Prevention by name

### 📝 Accepted formats

```vue
<!-- Extensions -->
<SuFileUpload accept=".jpg,.png,.pdf" />

<!-- MIME types -->
<SuFileUpload accept="image/*,application/pdf" />

<!-- Combination -->
<SuFileUpload accept="image/*,.pdf,.doc" />
```

## Accessibility

WCAG 2.1 AA compliant and W3C best practices:

### ✅ Features

- **Keyboard navigation**: Tab, Enter, Space
- **Accessible Drag & Drop**: Zone with button role
- **ARIA**: Labels, descriptions, states
- **Voice announcements**: `aria-live`
- **Visible focus**: Clear indicators
- **State messages**: Visual/vocal feedback
- **Contrast**: WCAG AA ratios (4.5:1)
- **RTL support**: Right-to-left languages

### 🎯 Best practices

```vue
<!-- ✅ GOOD: With SuFormField -->
<SuFormField 
  label="Documents"
  :required="true"
  message="PDF or images, max 10MB"
>
  <template #default="slotProps">
    <SuFileUpload 
      accept=".pdf,image/*"
      :maxSize="10 * 1024 * 1024"
      v-bind="slotProps"
      v-model="docs"
    />
  </template>
</SuFormField>

<!-- ❌ BAD: Without label or context -->
<SuFileUpload v-model="files" />
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from |
| `Enter` / `Space` | Open file selector |
| `Tab` | Between listed files |
| `Enter` / `Space` | Remove file |

## SuFileUploadField Component

For simplicity, use `SuFileUploadField` which combines `SuFormField` and `SuFileUpload`:

```vue
<template>
  <!-- Instead of -->
  <SuFormField label="Documents" message="PDF only">
    <template #default="slotProps">
      <SuFileUpload 
        accept=".pdf"
        v-bind="slotProps"
        v-model="docs"
      />
    </template>
  </SuFormField>
  
  <!-- Simply write -->
  <SuFileUploadField 
    label="Documents"
    message="PDF only"
    accept=".pdf"
    v-model="docs"
  />
</template>
```

The `SuFileUploadField` component accepts all props from both `SuFormField` and `SuFileUpload` combined.

See the [complete SuFileUploadField documentation](./SuFileUploadField.md) for more details.