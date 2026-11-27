# ButtonGroup

ButtonGroup component for organizing and aligning buttons with controlled spacing. Supports propagation of `size` and `variant` props to child buttons and special border handling for connected buttons.

## Usage examples

### Basic ButtonGroup

<div class="component-demo">
  <div class="demo-section">
    <h4>Simple group with default gap</h4>
    <div class="demo-buttons">
      <SuButtonGroup>
        <SuButton>First</SuButton>
        <SuButton>Second</SuButton>
        <SuButton>Third</SuButton>
      </SuButtonGroup>
    </div>
  </div>
</div>

```vue
<template>
  <SuButtonGroup>
    <SuButton>First</SuButton>
    <SuButton>Second</SuButton>
    <SuButton>Third</SuButton>
  </SuButtonGroup>
</template>
```

### Spacing (gap)

<div class="component-demo">
  <div class="demo-section">
    <h4>Different spacings</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Gap Small</strong></p>
        <SuButtonGroup gap="sm">
          <SuButton>Action 1</SuButton>
          <SuButton>Action 2</SuButton>
          <SuButton>Action 3</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Gap Medium (default)</strong></p>
        <SuButtonGroup gap="md">
          <SuButton>Action 1</SuButton>
          <SuButton>Action 2</SuButton>
          <SuButton>Action 3</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Gap Large</strong></p>
        <SuButtonGroup gap="lg">
          <SuButton>Action 1</SuButton>
          <SuButton>Action 2</SuButton>
          <SuButton>Action 3</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Gap None (connected)</strong></p>
        <SuButtonGroup gap="none">
          <SuButton>First</SuButton>
          <SuButton>Middle</SuButton>
          <SuButton>Last</SuButton>
        </SuButtonGroup>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div>
    <!-- Small spacing -->
    <SuButtonGroup gap="sm">
      <SuButton>Action 1</SuButton>
      <SuButton>Action 2</SuButton>
      <SuButton>Action 3</SuButton>
    </SuButtonGroup>
    
    <!-- Medium spacing (default) -->
    <SuButtonGroup gap="md">
      <SuButton>Action 1</SuButton>
      <SuButton>Action 2</SuButton>
      <SuButton>Action 3</SuButton>
    </SuButtonGroup>
    
    <!-- Large spacing -->
    <SuButtonGroup gap="lg">
      <SuButton>Action 1</SuButton>
      <SuButton>Action 2</SuButton>
      <SuButton>Action 3</SuButton>
    </SuButtonGroup>
    
    <!-- Connected buttons -->
    <SuButtonGroup gap="none">
      <SuButton>First</SuButton>
      <SuButton>Middle</SuButton>
      <SuButton>Last</SuButton>
    </SuButtonGroup>
  </div>
</template>
```

### Size propagation

<div class="component-demo">
  <div class="demo-section">
    <h4>Forced size on all buttons</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Small size forced</strong></p>
        <SuButtonGroup size="sm">
          <SuButton>Small 1</SuButton>
          <SuButton>Small 2</SuButton>
          <SuButton>Small 3</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Medium size forced</strong></p>
        <SuButtonGroup size="md">
          <SuButton>Medium 1</SuButton>
          <SuButton>Medium 2</SuButton>
          <SuButton>Medium 3</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Large size forced</strong></p>
        <SuButtonGroup size="lg">
          <SuButton>Large 1</SuButton>
          <SuButton>Large 2</SuButton>
          <SuButton>Large 3</SuButton>
        </SuButtonGroup>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div>
    <!-- All buttons will be small size -->
    <SuButtonGroup size="sm">
      <SuButton>Small 1</SuButton>
      <SuButton>Small 2</SuButton>
      <SuButton>Small 3</SuButton>
    </SuButtonGroup>
    
    <!-- All buttons will be large size -->
    <SuButtonGroup size="lg">
      <SuButton>Large 1</SuButton>
      <SuButton>Large 2</SuButton>
      <SuButton>Large 3</SuButton>
    </SuButtonGroup>
  </div>
</template>
```

### Variant propagation

<div class="component-demo">
  <div class="demo-section">
    <h4>Forced variant on all buttons</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Primary variant forced</strong></p>
        <SuButtonGroup variant="primary">
          <SuButton>Action 1</SuButton>
          <SuButton>Action 2</SuButton>
          <SuButton>Action 3</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Outline variant forced</strong></p>
        <SuButtonGroup variant="outline">
          <SuButton>Action 1</SuButton>
          <SuButton>Action 2</SuButton>
          <SuButton>Action 3</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Ghost variant forced</strong></p>
        <SuButtonGroup variant="ghost">
          <SuButton>Action 1</SuButton>
          <SuButton>Action 2</SuButton>
          <SuButton>Action 3</SuButton>
        </SuButtonGroup>
      </div>
    </div>
  </div>
</div>

```vue
<template>
  <div>
    <!-- All buttons will be primary -->
    <SuButtonGroup variant="primary">
      <SuButton>Action 1</SuButton>
      <SuButton>Action 2</SuButton>
      <SuButton>Action 3</SuButton>
    </SuButtonGroup>
    
    <!-- All buttons will be outline -->
    <SuButtonGroup variant="outline">
      <SuButton>Action 1</SuButton>
      <SuButton>Action 2</SuButton>
      <SuButton>Action 3</SuButton>
    </SuButtonGroup>
  </div>
</template>
```

### Connected buttons with variants

<div class="component-demo">
  <div class="demo-section">
    <h4>Connected buttons with different variants</h4>
    <div class="demo-buttons-vertical">
      <div>
        <p><strong>Connected primary</strong></p>
        <SuButtonGroup gap="none" variant="primary">
          <SuButton>Left</SuButton>
          <SuButton>Center</SuButton>
          <SuButton>Right</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Connected outline</strong></p>
        <SuButtonGroup gap="none" variant="outline">
          <SuButton>Option A</SuButton>
          <SuButton>Option B</SuButton>
          <SuButton>Option C</SuButton>
        </SuButtonGroup>
      </div>
      <div>
        <p><strong>Icon toolbar</strong></p>
        <SuButtonGroup gap="none" variant="secondary" size="sm">
          <SuButton :icon="PlusIcon" iconDisplay="only" aria-label="Add" />
          <SuButton :icon="CogIcon" iconDisplay="only" aria-label="Settings" />
          <SuButton :icon="TrashIcon" iconDisplay="only" aria-label="Delete" />
        </SuButtonGroup>
      </div>
    </div>
  </div>
</div>

```vue
<script setup>
import { PlusIcon, CogIcon, TrashIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div>
    <!-- Connected primary buttons -->
    <SuButtonGroup gap="none" variant="primary">
      <SuButton>Left</SuButton>
      <SuButton>Center</SuButton>
      <SuButton>Right</SuButton>
    </SuButtonGroup>
    
    <!-- Icon toolbar -->
    <SuButtonGroup gap="none" variant="secondary" size="sm">
      <SuButton :icon="PlusIcon" iconDisplay="only" aria-label="Add" />
      <SuButton :icon="CogIcon" iconDisplay="only" aria-label="Settings" />
      <SuButton :icon="TrashIcon" iconDisplay="only" aria-label="Delete" />
    </SuButtonGroup>
  </div>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `'sm' \| 'md' \| 'lg' \| 'none'` | `'md'` | Spacing between buttons |
| `size` | `'sm' \| 'md' \| 'lg'` | `undefined` | Forced size for all buttons |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `undefined` | Forced variant for all buttons |

### Accessibility attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label for the group |
| `ariaDescribedBy` | `string` | `undefined` | ID of the description element |
| `role` | `string` | `undefined` | Custom ARIA role (e.g. 'toolbar', 'group') |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Buttons to display in the group |

## Prop behavior

### 🔄 Automatic propagation

When `size` or `variant` are defined on `ButtonGroup`, they **override** the props of child buttons automatically:

```vue
<!-- All buttons will have 'lg' size and 'primary' variant -->
<SuButtonGroup size="lg" variant="primary">
  <SuButton size="sm" variant="outline">Button 1</SuButton>  <!-- Becomes lg + primary -->
  <SuButton>Button 2</SuButton>                              <!-- Becomes lg + primary -->
  <SuButton variant="ghost">Button 3</SuButton>              <!-- Becomes lg + primary -->
</SuButtonGroup>
```

### 🎯 Content validation

The component automatically checks that only `Button` components are passed in the slot:

- ✅ **Button components**: Processed and styled normally
- ⚠️ **Other components**: Warning in console and element ignored
- ✅ **Comments/text**: Silently ignored (normal Vue behavior)

## Spacing and borders

### 📏 Gap values

- `gap="sm"` : 0.25rem (4px)
- `gap="md"` : 0.5rem (8px) - **default**
- `gap="lg"` : 0.75rem (12px)
- `gap="none"` : 0px with connected borders

### 🔗 Gap "none" - Connected buttons

When `gap="none"`, buttons are visually connected:

- **Overlapping borders**: `margin-left: -1px` to avoid double borders
- **Adapted border-radius**:
  - First button: left corners rounded only
  - Middle buttons: no rounded corners
  - Last button: right corners rounded only
  - Single button: all corners rounded
- **Smart z-index**: Focus, hover and active have higher z-index

## Accessibility

The ButtonGroup component follows WCAG 2.1 AA standards:

### ✅ Accessibility features

- **ARIA roles**: Support for `toolbar`, `group`, etc. roles
- **Group labels**: `aria-label` to describe the group
- **Keyboard navigation**: Preserves Tab navigation between buttons
- **Visible focus**: Z-index management for focus visibility
- **Descriptions**: Support for `aria-describedby` for descriptions

### 🎯 Best practices

```vue
<!-- Action toolbar -->
<SuButtonGroup 
  gap="sm" 
  role="toolbar" 
  aria-label="Formatting actions"
>
  <SuButton aria-label="Bold">B</SuButton>
  <SuButton aria-label="Italic">I</SuButton>
  <SuButton aria-label="Underline">U</SuButton>
</SuButtonGroup>

<!-- Page navigation -->
<SuButtonGroup 
  gap="none" 
  variant="outline"
  role="group" 
  aria-label="Page navigation"
>
  <SuButton>Page 1</SuButton>
  <SuButton>Page 2</SuButton>
  <SuButton>Page 3</SuButton>
</SuButtonGroup>

<!-- CRUD actions -->
<SuButtonGroup gap="sm" aria-label="Item actions">
  <SuButton variant="primary" :icon="PlusIcon">Create</SuButton>
  <SuButton variant="secondary" :icon="CogIcon">Edit</SuButton>
  <SuButton variant="outline" :icon="TrashIcon">Delete</SuButton>
</SuButtonGroup>
```

## Advanced usage examples

### Formatting toolbar

```vue
<script setup>
import { ref } from 'vue'
import { 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon
} from '@heroicons/vue/24/outline'

const formatting = ref({
  bold: false,
  italic: false,
  underline: false,
  align: 'left'
})
</script>

<template>
  <div>
    <div class="editor-toolbar">
      <!-- Text formatting group -->
      <SuButtonGroup 
        gap="none" 
        variant="ghost" 
        size="sm"
        role="toolbar"
        aria-label="Text formatting"
      >
        <SuButton 
          :icon="BoldIcon" 
          iconDisplay="only"
          :aria-pressed="formatting.bold"
          aria-label="Bold"
          @click="formatting.bold = !formatting.bold"
        />
        <SuButton 
          :icon="ItalicIcon" 
          iconDisplay="only"
          :aria-pressed="formatting.italic"
          aria-label="Italic"
          @click="formatting.italic = !formatting.italic"
        />
        <SuButton 
          :icon="UnderlineIcon" 
          iconDisplay="only"
          :aria-pressed="formatting.underline"
          aria-label="Underline"
          @click="formatting.underline = !formatting.underline"
        />
      </SuButtonGroup>
      
      <!-- Alignment group -->
      <SuButtonGroup 
        gap="none" 
        variant="outline" 
        size="sm"
        role="toolbar"
        aria-label="Text alignment"
      >
        <SuButton 
          :icon="AlignLeftIcon" 
          iconDisplay="only"
          :aria-pressed="formatting.align === 'left'"
          aria-label="Align left"
          @click="formatting.align = 'left'"
        />
        <SuButton 
          :icon="AlignCenterIcon" 
          iconDisplay="only"
          :aria-pressed="formatting.align === 'center'"
          aria-label="Center"
          @click="formatting.align = 'center'"
        />
        <SuButton 
          :icon="AlignRightIcon" 
          iconDisplay="only"
          :aria-pressed="formatting.align === 'right'"
          aria-label="Align right"
          @click="formatting.align = 'right'"
        />
      </SuButtonGroup>
    </div>
  </div>
</template>

<style scoped>
.editor-toolbar {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}
</style>
```

### CRUD actions

```vue
<script setup>
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const handleCreate = () => console.log('Create')
const handleEdit = () => console.log('Edit')
const handleDelete = () => console.log('Delete')
</script>

<template>
  <div>
    <div class="crud-actions">
      <h3>Available actions</h3>
      
      <!-- Main actions -->
      <SuButtonGroup gap="sm" aria-label="Main actions">
        <SuButton 
          variant="primary" 
          :icon="PlusIcon" 
          iconDisplay="left"
          @click="handleCreate"
        >
          Create
        </SuButton>
        <SuButton 
          variant="secondary" 
          :icon="PencilIcon" 
          iconDisplay="left"
          @click="handleEdit"
        >
          Edit
        </SuButton>
        <SuButton 
          variant="outline" 
          :icon="TrashIcon" 
          iconDisplay="left"
          @click="handleDelete"
        >
          Delete
        </SuButton>
      </SuButtonGroup>
    </div>
  </div>
</template>
```

### Page navigation

```vue
<script setup>
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const currentPage = ref(2)
const totalPages = 5

const goToPage = (page) => {
  currentPage.value = page
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages) currentPage.value++
}
</script>

<template>
  <div>
    <nav aria-label="Page navigation">
      <SuButtonGroup 
        gap="none" 
        variant="outline"
        role="group"
        aria-label="Pages"
      >
        <SuButton 
          :icon="ChevronLeftIcon" 
          iconDisplay="only"
          :disabled="currentPage === 1"
          aria-label="Previous page"
          @click="previousPage"
        />
        
        <SuButton 
          v-for="page in totalPages"
          :key="page"
          :aria-pressed="currentPage === page"
          :variant="currentPage === page ? 'primary' : undefined"
          @click="goToPage(page)"
        >
          {{ page }}
        </SuButton>
        
        <SuButton 
          :icon="ChevronRightIcon" 
          iconDisplay="only"
          :disabled="currentPage === totalPages"
          aria-label="Next page"
          @click="nextPage"
        />
      </SuButtonGroup>
    </nav>
  </div>
</template>
```

## Slot content control

The `ButtonGroup` component automatically checks the content of its slot:

### ✅ Accepted elements
- Design system `Button` components
- Vue comments (ignored)
- Empty text nodes (ignored)

### ⚠️ Rejected elements
- Other components or HTML elements
- Warning in development console
- Element ignored in render

### 🔍 Validation example

```vue
<!-- ✅ Correct -->
<SuButtonGroup>
  <SuButton>Button 1</SuButton>
  <SuButton>Button 2</SuButton>
  <!-- Comment ignored -->
</SuButtonGroup>

<!-- ⚠️ Warning in console -->
<SuButtonGroup>
  <SuButton>Valid button</SuButton>
  <div>Non-button element</div> <!-- Ignored with warning -->
  <SuButton>Another valid button</SuButton>
</SuButtonGroup>
```

This approach ensures visual consistency while informing developers of potential issues.