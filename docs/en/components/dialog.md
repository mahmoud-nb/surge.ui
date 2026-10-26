<script setup>
import { ref } from 'vue'

// État des démos de la page
const showCenterModal = ref(false)
const showLeftDrawer = ref(false)
const showRightDrawer = ref(false)
const showTopDrawer = ref(false)
const showBottomDrawer = ref(false)
const showFullScreen = ref(false)
</script>

# Dialog

Versatile Dialog component for displaying modals (centered) or drawers (side, top/bottom, full screen). It is built on the native `<dialog>` element opened with `showModal()`: the browser handles the top layer, the backdrop (`::backdrop`), making the rest of the page inert and keeping focus inside. It offers customization options to adapt to various use cases.

## Usage examples

### Centered Modal (display="center")

<div class="component-demo">
  <div class="demo-section">
    <h4>Confirmation Modal</h4>
    <div class="demo-buttons">
      <SuButton @click="showCenterModal = true">Open Modal</SuButton>
      <SuDialog v-model:modelValue="showCenterModal" display="center" title="Confirmation" description="Do you really want to delete this item?" width="400px">
        <template #default>
          <p>This action is irreversible. Please confirm your choice.</p>
        </template>
        <template #footer>
          <SuButton variant="secondary" @click="showCenterModal = false">Cancel</SuButton>
          <SuButton variant="primary" @click="showCenterModal = false">Confirm</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showCenterModal = ref(false)
</script>

<template>
  <SuButton @click="showCenterModal = true">Open Modal</SuButton>
  <SuDialog v-model:modelValue="showCenterModal" display="center" title="Confirmation" description="Do you really want to delete this item?" width="400px">
    <template #default>
      <p>This action is irreversible. Please confirm your choice.</p>
    </template>
    <template #footer>
      <SuButton variant="secondary" @click="showCenterModal = false">Cancel</SuButton>
      <SuButton variant="primary" @click="showCenterModal = false">Confirm</SuButton>
    </template>
  </SuDialog>
</template>
```

### Left Side Drawer (display="left")

<div class="component-demo">
  <div class="demo-section">
    <h4>Side Menu</h4>
    <div class="demo-buttons">
      <SuButton @click="showLeftDrawer = true">Open Left Drawer</SuButton>
      <SuDialog v-model:modelValue="showLeftDrawer" display="left" title="Navigation Menu" width="300px">
        <template #default>
          <SuLinkGroup direction="vertical" gap="md">
            <SuLink href="/dashboard">Dashboard</SuLink>
            <SuLink href="/profile">My Profile</SuLink>
            <SuLink href="/settings">Settings</SuLink>
            <SuLink href="/logout">Logout</SuLink>
          </SuLinkGroup>
        </template>
        <template #footer>
          <SuButton variant="outline" @click="showLeftDrawer = false">Close</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showLeftDrawer = ref(false)
</script>

<template>
  <SuButton @click="showLeftDrawer = true">Open Left Drawer</SuButton>
  <SuDialog v-model:modelValue="showLeftDrawer" display="left" title="Navigation Menu" width="300px">
    <template #default>
      <SuLinkGroup direction="vertical" gap="md">
        <SuLink href="/dashboard">Dashboard</SuLink>
        <SuLink href="/profile">My Profile</SuLink>
        <SuLink href="/settings">Settings</SuLink>
        <SuLink href="/logout">Logout</SuLink>
      </SuLinkGroup>
    </template>
    <template #footer>
      <SuButton variant="outline" @click="showLeftDrawer = false">Close</SuButton>
    </template>
  </SuDialog>
</template>
```

### Right Side Drawer (display="right")

<div class="component-demo">
  <div class="demo-section">
    <h4>Product Details Panel</h4>
    <div class="demo-buttons">
      <SuButton @click="showRightDrawer = true">Open Right Drawer</SuButton>
      <SuDialog v-model:modelValue="showRightDrawer" display="right" title="Product Details" width="450px">
        <template #default>
          <h3>Product X</h3>
          <p>Detailed description of Product X. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <img src="https://via.placeholder.com/300x200" alt="Product X" style="max-width: 100%; height: auto; margin-top: 1rem;">
        </template>
        <template #footer>
          <SuButton variant="primary" @click="showRightDrawer = false">Add to Cart</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showRightDrawer = ref(false)
</script>

<template>
  <SuButton @click="showRightDrawer = true">Open Right Drawer</SuButton>
  <SuDialog v-model:modelValue="showRightDrawer" display="right" title="Product Details" width="450px">
    <template #default>
      <h3>Product X</h3>
      <p>Detailed description of Product X. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <img src="https://via.placeholder.com/300x200" alt="Product X" style="max-width: 100%; height: auto; margin-top: 1rem;">
    </template>
    <template #footer>
      <SuButton variant="primary" @click="showRightDrawer = false">Add to Cart</SuButton>
    </template>
  </SuDialog>
</template>
```

### Top Drawer (display="top")

<div class="component-demo">
  <div class="demo-section">
    <h4>Notification Bar</h4>
    <div class="demo-buttons">
      <SuButton @click="showTopDrawer = true">Open Top Drawer</SuButton>
      <SuDialog v-model:modelValue="showTopDrawer" display="top" title="New Notification" height="100px">
        <template #default>
          <p>You have 3 new unread messages!</p>
        </template>
        <template #footer>
          <SuButton variant="primary" @click="showTopDrawer = false">View Messages</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showTopDrawer = ref(false)
</script>

<template>
  <SuButton @click="showTopDrawer = true">Open Top Drawer</SuButton>
  <SuDialog v-model:modelValue="showTopDrawer" display="top" title="New Notification" height="100px">
    <template #default>
      <p>You have 3 new unread messages!</p>
    </template>
    <template #footer>
      <SuButton variant="primary" @click="showTopDrawer = false">View Messages</SuButton>
    </template>
  </SuDialog>
</template>
```

### Bottom Drawer (display="bottom")

<div class="component-demo">
  <div class="demo-section">
    <h4>Quick Actions</h4>
    <div class="demo-buttons">
      <SuButton @click="showBottomDrawer = true">Open Bottom Drawer</SuButton>
      <SuDialog v-model:modelValue="showBottomDrawer" display="bottom" title="Quick Actions" height="250px">
        <template #default>
          <SuButtonGroup direction="vertical" gap="md">
            <SuButton variant="primary">Take Photo</SuButton>
            <SuButton variant="secondary">Upload File</SuButton>
            <SuButton variant="outline">Share</SuButton>
          </SuButtonGroup>
        </template>
        <template #footer>
          <SuButton variant="ghost" @click="showBottomDrawer = false">Close</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showBottomDrawer = ref(false)
</script>

<template>
  <SuButton @click="showBottomDrawer = true">Open Bottom Drawer</SuButton>
  <SuDialog v-model:modelValue="showBottomDrawer" display="bottom" title="Quick Actions" height="250px">
    <template #default>
      <SuButtonGroup direction="vertical" gap="md">
        <SuButton variant="primary">Take Photo</SuButton>
        <SuButton variant="secondary">Upload File</SuButton>
        <SuButton variant="outline">Share</SuButton>
      </SuButtonGroup>
    </template>
    <template #footer>
      <SuButton variant="ghost" @click="showBottomDrawer = false">Close</SuButton>
    </template>
  </SuDialog>
</template>
```

### Full Screen (display="full")

<div class="component-demo">
  <div class="demo-section">
    <h4>Complex Form</h4>
    <div class="demo-buttons">
      <SuButton @click="showFullScreen = true">Open Full Screen</SuButton>
      <SuDialog v-model:modelValue="showFullScreen" display="full" title="Complete Registration Form">
        <template #default>
          <SuFormFields gap="lg" sectionGap="xl">
            <SuInput label="Full Name" placeholder="Your name" required />
            <SuInput type="email" label="Email" placeholder="your@example.com" required />
            <SuPassword label="Password" showProgress required />
            <SuTextarea label="Bio" placeholder="Tell us about yourself..." autoResize maxLength="500" showCounter />
            <SuFileUpload label="Profile Picture" accept="image/*" />
          </SuFormFields>
        </template>
        <template #footer>
          <SuButton variant="secondary" @click="showFullScreen = false">Cancel</SuButton>
          <SuButton variant="primary">Submit</SuButton>
        </template>
      </SuDialog>
    </div>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'

const showFullScreen = ref(false)
</script>

<template>
  <SuButton @click="showFullScreen = true">Open Full Screen</SuButton>
  <SuDialog v-model:modelValue="showFullScreen" display="full" title="Complete Registration Form">
    <template #default>
      <SuFormFields gap="lg" sectionGap="xl">
        <SuInput label="Full Name" placeholder="Your name" required />
        <SuInput type="email" label="Email" placeholder="your@example.com" required />
        <SuPassword label="Password" showProgress required />
        <SuTextarea label="Bio" placeholder="Tell us about yourself..." autoResize maxLength="500" showCounter />
        <SuFileUpload label="Profile Picture" accept="image/*" />
      </SuFormFields>
    </template>
    <template #footer>
      <SuButton variant="secondary" @click="showFullScreen = false">Cancel</SuButton>
      <SuButton variant="primary">Submit</SuButton>
    </template>
  </SuDialog>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Controls the open/close state of the Dialog (used with `v-model`) |
| `display` | `'center' \| 'left' \| 'right' \| 'top' \| 'bottom' \| 'full'` | `'center'` | Display mode of the Dialog |
| `title` | `string` | `undefined` | Title of the Dialog (displayed in the `head` slot by default and for `aria-labelledby`) |
| `description` | `string` | `undefined` | Description shown under the title and linked to the Dialog with `aria-describedby` (not rendered when the `head` slot is used) |
| `closeLabel` | `string` | `'Fermer'` | Accessible name of the close button |
| `closeOnOverlayClick` | `boolean` | `true` | Allows closing the Dialog by clicking on the overlay |
| `closeOnEscape` | `boolean` | `true` | Allows closing the Dialog with the `Escape` key |
| `width` | `string` | `auto` | Custom width of the Dialog (e.g., `'500px'`, `'80%'`) |
| `height` | `string` | `auto` | Custom height of the Dialog (e.g., `'400px'`, `'90vh'`) |
| `zIndex` | `number` | — | **Deprecated**, no effect: the Dialog renders in the browser top layer, above any z-index |
| `disableScroll` | `boolean` | `true` | Disables page body scrolling when the Dialog is open |

### Accessibility Attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessible label for the Dialog |
| `ariaLabelledBy` | `string` | `undefined` | ID of the element that labels the Dialog (takes precedence over `title`) |
| `ariaDescribedBy` | `string` | `undefined` | ID of the element that describes the Dialog (takes precedence over `description`) |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `update:modelValue` | `(value: boolean) => void` | Emitted when the open/close state changes |
| `open` | `() => void` | Emitted when the Dialog is opened |
| `close` | `() => void` | Emitted when the Dialog is closed |

### Slots

| Slot | Description |
|------|-------------|
| `head` | Content for the Dialog header (can contain a title, close button, etc.) |
| `default` | Main content of the Dialog |
| `footer` | Content for the Dialog footer (often used for action buttons) |

## Accessibility

The Dialog component is designed to comply with WCAG 2.1 AA standards:

### ✅ Accessibility Features

- **Native dialog**: a `<dialog>` opened with `showModal()` has the `dialog` role and is modal for assistive technologies (the rest of the page becomes inert).
- **Focus Management**: the browser keeps focus inside the Dialog while it is open; no JavaScript focus trap.
- **Initial Focus**: Focus is automatically moved to the first focusable element within the Dialog upon opening.
- **Focus Restoration**: Focus is restored to the element that triggered the Dialog's opening after it closes.
- **Labels and Descriptions**: Uses `aria-labelledby` (via the `title` prop or `ariaLabelledBy`) and `aria-describedby` (via the `description` prop or `ariaDescribedBy`) to provide semantic context to screen readers.
- **Accessible Closing**: `Escape` fires the native `cancel` event, which closes the Dialog when `closeOnEscape` is `true`. With several Dialogs open, only the top one closes.
- **Scroll Disablement**: page scrolling is locked in CSS (`:root:has(...)`) while a Dialog with `disableScroll` is open, including nested Dialogs.
- **Smooth Transitions**: Animations are designed to be smooth and respect `prefers-reduced-motion`.

### 🎯 Best Practices

- **Always provide a `title` or `ariaLabel`**: This is crucial for accessibility so that screen reader users understand the purpose of the Dialog.
- **Place primary actions in the `footer`**: This helps with UI consistency and predictability.
- **Avoid nested Dialogs**: If possible, design your UI to avoid opening one Dialog on top of another, as this can complicate focus management and user experience.

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate between focusable elements inside the Dialog |
| `Shift + Tab` | Navigate between focusable elements in reverse order |
| `Escape` | Close the Dialog (if `closeOnEscape` is `true`) |

## Styling and Customization

The `Dialog` component uses CSS transitions for smooth opening and closing. The `display` prop applies specific styles to position the Dialog correctly.

- **`display="center"`**: Centered modal, with a scale animation.
- **`display="left"` / `display="right"`**: Side drawers, with a horizontal translation animation.
- **`display="top"` / `display="bottom"`**: Vertical drawers, with a vertical translation animation.
- **`display="full"`**: Full screen, with a slight scale animation.

You can customize the width (`width`) and height (`height`) for `center`, `left`, `right`, `top`, `bottom` modes. For `full` mode, the Dialog always occupies 100% of the width and height.
