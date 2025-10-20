# FileUploadField

FileUploadField component for file uploading with drag & drop support, format and size validation, and complete accessibility according to W3C standards.

## Usage examples

### Basic FileUploadField

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple upload</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        label="Documents"
        placeholder="Select your documents or drag them here"
        message="Accepted formats: PDF, DOC, DOCX"
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
  <SuFileUploadField 
    label="Documents"
    placeholder="Select your documents or drag them here"
    message="Accepted formats: PDF, DOC, DOCX"
    v-model="files"
  />
</template>
```

### Multiple upload with validation

<div class="component-demo">
  <div class="demo-section">
    <h4>Multiple upload with restrictions</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        :multiple="true"
        :maxFiles="3"
        :maxSize="5 * 1024 * 1024"
        accept="image/*"
        label="Images"
        placeholder="Select up to 3 images (max 5MB each)"
        message="Drag and drop your images or click to browse"
      />
    </div>
  </div>
</div>

```vue
<script setup>
const images = ref([])
</script>

<template>
  <SuFileUploadField 
    :multiple="true"
    :maxFiles="3"
    :maxSize="5 * 1024 * 1024"
    accept="image/*"
    label="Images"
    placeholder="Select up to 3 images (max 5MB each)"
    message="Drag and drop your images or click to browse"
    v-model="images"
  />
</template>
```

### Specific file types

<div class="component-demo">
  <div class="demo-section">
    <h4>File type restrictions</h4>
    <div class="demo-inputs">
      <SuFileUploadField 
        accept="image/jpeg,image/png,image/gif"
        label="Images only"
        placeholder="JPG, PNG, GIF only"
        message="Accepted formats: JPEG, PNG, GIF"
      />
      <SuFileUploadField 
        accept=".pdf,.doc,.docx"
        label="Documents"
        placeholder="PDF and Word documents"
        message="Accepted formats: PDF, DOC, DOCX"
      />
      <SuFileUploadField 
        accept="video/*"
        :maxSize="50 * 1024 * 1024"
        label="Videos"
        placeholder="All video formats (max 50MB)"
        message="All video formats are accepted"
      />
    </div>
  </div>
</div>

```vue
<template>
  <!-- Images only -->
  <SuFileUploadField 
    accept="image/jpeg,image/png,image/gif"
    label="Images only"
    placeholder="JPG, PNG, GIF only"
    message="Accepted formats: JPEG, PNG, GIF"
  />
  
  <!-- Documents -->
  <SuFileUploadField 
    accept=".pdf,.doc,.docx"
    label="Documents"
    placeholder="PDF and Word documents"
    message="Accepted formats: PDF, DOC, DOCX"
  />
  
  <!-- Videos -->
  <SuFileUploadField 
    accept="video/*"
    :maxSize="50 * 1024 * 1024"
    label="Videos"
    placeholder="All video formats (max 50MB)"
    message="All video formats are accepted"
  />
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `UploadedFile[]` | `[]` | List of uploaded files |
| `multiple` | `boolean` | `false` | Allow multiple selection |
| `accept` | `string` | `undefined` | Accepted file types (MIME types or extensions) |
| `maxSize` | `number` | `10485760` | Maximum file size in bytes (10MB default) |
| `maxFiles` | `number` | `5` | Maximum number of files |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `state` | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | Visual state |
| `disabled` | `boolean` | `false` | Disable the component |
| `readonly` | `boolean` | `false` | Read-only mode |
| `required` | `boolean` | `false` | Required field |
| `label` | `string` | `undefined` | Component label |
| `message` | `string` | `undefined` | Displayed message |
| `placeholder` | `string` | `'Select files...'` | Text displayed in drop zone |
| `dragText` | `string` | `'Release to drop...'` | Text displayed during drag |
| `browseText` | `string` | `'Browse'` | Browse button text |
| `allowPreview` | `boolean` | `true` | Show image previews |
| `showFileList` | `boolean` | `true` | Show file list |

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
| `@update:value` | `(files: UploadedFile[]) => void` | Emitted when list changes |
| `@change` | `(files: UploadedFile[]) => void` | Emitted on change |
| `@upload` | `(file: UploadedFile) => void` | Emitted for each added file |
| `@remove` | `(file: UploadedFile) => void` | Emitted when file is removed |
| `@error` | `(error: string, file?: File) => void` | Emitted on validation error |
| `@focus` | `(event: FocusEvent) => void` | Emitted on focus |
| `@blur` | `(event: FocusEvent) => void` | Emitted on blur |

## File validation

The component performs several automatic validations:

### 🔍 Validation types

- **File format**: Verification against `accept` prop
- **File size**: Verification against `maxSize`
- **File count**: Verification against `maxFiles`
- **Duplicate files**: Prevention of duplicates by name

### 📝 Accepted formats

```vue
<!-- Specific extensions -->
<SuFileUploadField accept=".jpg,.png,.pdf" />

<!-- MIME types -->
<SuFileUploadField accept="image/*,application/pdf" />

<!-- Combination -->
<SuFileUploadField accept="image/*,.pdf,.doc,.docx" />
```

## Accessibility

The FileUpload component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **Keyboard navigation**: Complete Tab, Enter, Space support
- **Accessible drag & drop**: Drop zone with button role and aria-label
- **ARIA attributes**: Labels, descriptions, invalid states
- **Voice announcements**: Messages for screen readers with aria-live
- **Visible focus**: Clear and contrasted focus indicators
- **Associated labels**: Each element has appropriate label
- **State messages**: Visual and voice feedback for errors/success
- **Color contrast**: WCAG AA compliant ratios
- **Minimum sizes**: 44px minimum buttons
- **RTL support**: Compatible with right-to-left languages

### 🎯 Best practices

```vue
<!-- Upload with complete validation -->
<SuFileUploadField 
  :multiple="true"
  :maxFiles="5"
  :maxSize="10 * 1024 * 1024"
  accept="image/*,.pdf"
  :required="true"
  label="Supporting documents"
  placeholder="Drag your documents here or click to browse"
  message="Images and PDF accepted, maximum 5 files of 10MB each"
  ariaLabel="Upload zone for supporting documents"
  v-model="documents"
  @error="handleUploadError"
  @upload="handleFileUpload"
/>

<!-- Error handling -->
<script setup>
const handleUploadError = (error, file) => {
  console.error('Upload error:', error, file)
  // Show error notification
}

const handleFileUpload = (file) => {
  console.log('File added:', file)
  // Start upload to server
}
</script>
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from drop zone |
| `Enter` / `Space` | Open file selector |
| `Tab` | Navigate between files in list |
| `Enter` / `Space` | Remove file (on remove button) |

## Advanced usage examples

### Application form

```vue
<script setup>
import { ref } from 'vue'

const cv = ref([])
const coverLetter = ref([])
const portfolio = ref([])

const handleCVUpload = (file) => {
  // Specific processing for CV
  console.log('CV uploaded:', file)
}

const handleError = (error, file) => {
  // Global error handling
  alert(`Error: ${error}`)
}
</script>

<template>
  <form class="application-form">
    <h2>Application</h2>
    
    <SuFileUploadField 
      label="CV (required)"
      accept=".pdf,.doc,.docx"
      :maxSize="5 * 1024 * 1024"
      :maxFiles="1"
      :required="true"
      placeholder="Upload your CV"
      message="PDF or Word format, maximum 5MB"
      v-model="cv"
      @upload="handleCVUpload"
      @error="handleError"
    />
    
    <SuFileUploadField 
      label="Cover letter"
      accept=".pdf,.doc,.docx"
      :maxSize="5 * 1024 * 1024"
      :maxFiles="1"
      placeholder="Upload your cover letter"
      message="PDF or Word format, maximum 5MB"
      v-model="coverLetter"
      @error="handleError"
    />
    
    <SuFileUploadField 
      label="Portfolio (optional)"
      accept="image/*,.pdf"
      :maxSize="20 * 1024 * 1024"
      :maxFiles="10"
      :multiple="true"
      placeholder="Images of your work or PDF"
      message="Images and PDF accepted, maximum 10 files of 20MB each"
      v-model="portfolio"
      @error="handleError"
    />
  </form>
</template>
```