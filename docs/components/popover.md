# Popover

The Popover component displays contextual content in a floating window that appears above page content. It's ideal for displaying additional information, action menus, forms, or any other contextual interaction without leaving the current context.

## Usage Examples

### Basic Usage

```vue
<template>
  <SuPopover>
    <template #trigger>
      <button>Click me</button>
    </template>
    <template #default>
      <div>
        <h3>Popover Title</h3>
        <p>Popover content.</p>
      </div>
    </template>
  </SuPopover>
</template>
```

### With Close Button

```vue
<template>
  <SuPopover closable>
    <template #trigger>
      <button>Open</button>
    </template>
    <template #default>
      <div>
        <h3>Information</h3>
        <p>This popover can be closed with the X button.</p>
      </div>
    </template>
  </SuPopover>
</template>
```

### Hover Trigger

```vue
<template>
  <SuPopover 
    trigger="hover" 
    placement="top"
    :open-delay="200"
    :close-delay="100"
  >
    <template #trigger>
      <span>Hover me</span>
    </template>
    <template #default>
      <p>This popover opens on hover.</p>
    </template>
  </SuPopover>
</template>
```

### Controlled Mode with v-model

```vue
<template>
  <div>
    <button @click="isOpen = !isOpen">
      {{ isOpen ? 'Close' : 'Open' }}
    </button>
    
    <SuPopover v-model="isOpen" trigger="manual">
      <template #trigger>
        <button>Target element</button>
      </template>
      <template #default="{ close }">
        <div>
          <h3>Controlled Mode</h3>
          <p>Controlled by v-model.</p>
          <button @click="close">Close</button>
        </div>
      </template>
    </SuPopover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>
```

### Modal Mode

```vue
<template>
  <SuPopover 
    modal
    closable
    :close-on-backdrop-click="true"
  >
    <template #trigger>
      <button>Open as modal</button>
    </template>
    <template #default="{ close }">
      <div>
        <h3>Confirmation</h3>
        <p>Are you sure you want to continue?</p>
        <div class="actions">
          <button @click="close">Cancel</button>
          <button @click="close">Confirm</button>
        </div>
      </div>
    </template>
  </SuPopover>
</template>
```

### With Form

```vue
<template>
  <SuPopover 
    closable
    :close-on-click-outside="false"
    placement="bottom"
  >
    <template #trigger>
      <button>Add comment</button>
    </template>
    <template #default="{ close }">
      <div>
        <h3>New Comment</h3>
        <form @submit.prevent="handleSubmit(close)">
          <div>
            <label>Name</label>
            <input type="text" v-model="name" />
          </div>
          <div>
            <label>Comment</label>
            <textarea v-model="comment" rows="3"></textarea>
          </div>
          <div class="actions">
            <button type="button" @click="close">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const comment = ref('');

const handleSubmit = (close: () => void) => {
  // Submit logic
  close();
};
</script>
```

### Different Placements

```vue
<template>
  <div>
    <SuPopover placement="top">
      <template #trigger>
        <button>Top</button>
      </template>
      <template #default>
        <p>Placement: Top</p>
      </template>
    </SuPopover>

    <SuPopover placement="bottom-start">
      <template #trigger>
        <button>Bottom Start</button>
      </template>
      <template #default>
        <p>Placement: Bottom Start</p>
      </template>
    </SuPopover>

    <SuPopover placement="right-end">
      <template #trigger>
        <button>Right End</button>
      </template>
      <template #default>
        <p>Placement: Right End</p>
      </template>
    </SuPopover>
  </div>
</template>
```

### Custom User Menu

```vue
<template>
  <SuPopover placement="bottom-end">
    <template #trigger>
      <button>Profile</button>
    </template>
    <template #default>
      <div class="user-menu">
        <div class="user-info">
          <div class="avatar"></div>
          <div>
            <div class="name">John Doe</div>
            <div class="email">john.doe@example.com</div>
          </div>
        </div>
        <div class="menu-items">
          <button>📊 Dashboard</button>
          <button>⚙️ Settings</button>
          <button class="danger">🚪 Logout</button>
        </div>
      </div>
    </template>
  </SuPopover>
</template>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `undefined` | Controls the open state of the popover (v-model) |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'bottom'` | Position of the popover relative to the trigger |
| `trigger` | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'` | Method to trigger the popover |
| `offset` | `number` | `8` | Distance in pixels between trigger and popover |
| `showArrow` | `boolean` | `true` | Shows or hides the arrow pointing to the trigger |
| `closable` | `boolean` | `false` | Displays a close button in the popover |
| `closeOnClickOutside` | `boolean` | `true` | Closes the popover when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Closes the popover when pressing Escape key |
| `modal` | `boolean` | `false` | Enables modal mode with dark backdrop |
| `closeOnBackdropClick` | `boolean` | `true` | Closes the popover when clicking backdrop (modal mode) |
| `disabled` | `boolean` | `false` | Disables the popover |
| `openDelay` | `number` | `0` | Delay in milliseconds before opening (useful with trigger="hover") |
| `closeDelay` | `number` | `0` | Delay in milliseconds before closing (useful with trigger="hover") |
| `ariaLabel` | `string` | `undefined` | ARIA label for the popover content |
| `ariaLabelledby` | `string` | `undefined` | ID of the element that labels the popover |
| `ariaDescribedby` | `string` | `undefined` | ID of the element that describes the popover |
| `closeAriaLabel` | `string` | `'Close'` | ARIA label for the close button |
| `width` | `string \| number` | `'auto'` | Width of the popover |
| `maxWidth` | `string \| number` | `'320px'` | Maximum width of the popover |
| `maxHeight` | `string \| number` | `'none'` | Maximum height of the popover |

### Accessibility Attributes

| Attribute | Element | Description |
|-----------|---------|-------------|
| `aria-expanded` | Trigger | Indicates whether the popover is open or closed |
| `aria-haspopup` | Trigger | Indicates that the element triggers a popover |
| `aria-controls` | Trigger | References the ID of the popover content |
| `role="dialog"` | Content | Identifies the popover as a dialog box |
| `aria-modal` | Content | Indicates whether the popover is modal |
| `aria-label` | Content | Provides an accessible label for the popover |
| `aria-labelledby` | Content | References the element that labels the popover |
| `aria-describedby` | Content | References the element that describes the popover |
| `aria-label` | Close button | Provides an accessible label for the close button |

### HTML Validation Attributes

| Attribute | Element | Description |
|-----------|---------|-------------|
| `type="button"` | Close button | Specifies the button type |
| `tabindex` | Focusable elements | Manages keyboard navigation order |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `update:modelValue` | `(value: boolean) => void` | Emitted when the open state changes |
| `open` | `() => void` | Emitted when the popover opens |
| `close` | `() => void` | Emitted when the popover closes |
| `after-leave` | `() => void` | Emitted after the closing animation ends |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `trigger` | `{ isOpen: boolean }` | Content of the popover trigger |
| `default` | `{ close: () => void, isOpen: boolean }` | Main content of the popover |

### Exposed Methods

| Method | Type | Description |
|--------|------|-------------|
| `open` | `() => void` | Opens the popover |
| `close` | `() => void` | Closes the popover |
| `toggle` | `() => void` | Toggles the open state of the popover |
| `updatePosition` | `() => void` | Recalculates the position of the popover |

## Accessibility

The Popover component complies with WCAG 2.1 Level AA standards and follows W3C best practices for dialog and popover components. It ensures an accessible user experience for everyone, including people using assistive technologies.

### Accessibility Features

- **Complete keyboard navigation**: The popover can be opened with Enter or Space keys, and closed with the Escape key. Navigation inside the popover is done with the Tab key.

- **Focus trapping in modal mode**: When modal mode is enabled, focus is trapped inside the popover, preventing the user from navigating to elements outside the popover until it's closed.

- **Appropriate ARIA attributes**: The component uses `aria-expanded` on the trigger to indicate the open state, `aria-haspopup` to signal the presence of a popover, `aria-controls` to link the trigger to the content, and `role="dialog"` on the content for proper identification by screen readers.

- **Accessible labels**: The `ariaLabel`, `ariaLabelledby`, and `ariaDescribedby` props allow providing contextual information to screen readers. The close button has a configurable ARIA label.

- **Visual focus indicators**: Focusable elements display a visible outline conforming to accessibility standards, with support for high contrast mode.

- **Delay management**: The `openDelay` and `closeDelay` props help avoid accidental openings/closings, particularly useful for users with motor difficulties.

- **High contrast mode support**: The component automatically adapts its borders and contrasts in high contrast environments.

- **Respect for reduced motion preference**: Animations are automatically disabled for users who have enabled the `prefers-reduced-motion` preference.

- **RTL support**: The component automatically adapts to right-to-left languages, reversing element placements and positions.

## Advanced Usage Examples

### Popover with Dynamic Content

```vue
<template>
  <SuPopover 
    v-model="isOpen"
    @open="fetchUserData"
  >
    <template #trigger>
      <button>View details</button>
    </template>
    <template #default>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="userData">
        <h3>{{ userData.name }}</h3>
        <p>{{ userData.email }}</p>
        <p>Member since {{ userData.memberSince }}</p>
      </div>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const loading = ref(false);
const userData = ref(null);

const fetchUserData = async () => {
  loading.value = true;
  try {
    const response = await fetch('/api/user');
    userData.value = await response.json();
  } finally {
    loading.value = false;
  }
};
</script>
```

### Popover with Custom Positioning and Recalculation

```vue
<template>
  <SuPopover 
    ref="popoverRef"
    :placement="currentPlacement"
    :offset="20"
  >
    <template #trigger>
      <button>Open</button>
    </template>
    <template #default>
      <div>
        <p>Content with dynamic positioning</p>
        <select v-model="currentPlacement" @change="updatePosition">
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popoverRef = ref(null);
const currentPlacement = ref('bottom');

const updatePosition = () => {
  popoverRef.value?.updatePosition();
};
</script>
```

### Nested Popovers

```vue
<template>
  <SuPopover placement="bottom">
    <template #trigger>
      <button>Main menu</button>
    </template>
    <template #default>
      <div class="menu">
        <button>Option 1</button>
        <button>Option 2</button>
        
        <SuPopover placement="right-start" trigger="hover">
          <template #trigger>
            <button>More options →</button>
          </template>
          <template #default>
            <div class="submenu">
              <button>Sub-option 1</button>
              <button>Sub-option 2</button>
              <button>Sub-option 3</button>
            </div>
          </template>
        </SuPopover>
      </div>
    </template>
  </SuPopover>
</template>
```

### Popover with Form Validation

```vue
<template>
  <SuPopover 
    :close-on-click-outside="false"
    @close="resetForm"
  >
    <template #trigger>
      <button>Create account</button>
    </template>
    <template #default="{ close }">
      <form @submit.prevent="handleSubmit(close)">
        <h3>Sign up</h3>
        
        <div>
          <label>Email</label>
          <input 
            type="email" 
            v-model="form.email"
            :aria-invalid="errors.email ? 'true' : 'false'"
            aria-describedby="email-error"
          />
          <span 
            v-if="errors.email" 
            id="email-error"
            role="alert"
          >
            {{ errors.email }}
          </span>
        </div>
        
        <div>
          <label>Password</label>
          <input 
            type="password" 
            v-model="form.password"
            :aria-invalid="errors.password ? 'true' : 'false'"
            aria-describedby="password-error"
          />
          <span 
            v-if="errors.password" 
            id="password-error"
            role="alert"
          >
            {{ errors.password }}
          </span>
        </div>
        
        <div class="actions">
          <button type="button" @click="close">Cancel</button>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </template>
  </SuPopover>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const form = reactive({
  email: '',
  password: '',
});

const errors = reactive({
  email: '',
  password: '',
});

const validateForm = () => {
  errors.email = '';
  errors.password = '';
  
  if (!form.email) {
    errors.email = 'Email is required';
    return false;
  }
  
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
    return false;
  }
  
  return true;
};

const handleSubmit = async (close: () => void) => {
  if (!validateForm()) return;
  
  // Sign up logic
  await registerUser(form);
  close();
};

const resetForm = () => {
  form.email = '';
  form.password = '';
  errors.email = '';
  errors.password = '';
};
</script>
```

### Popover with Global State Management

```vue
<template>
  <div>
    <SuPopover 
      v-for="notification in notifications"
      :key="notification.id"
      trigger="hover"
      placement="bottom-start"
    >
      <template #trigger>
        <div class="notification-badge">
          {{ notification.count }}
        </div>
      </template>
      <template #default>
        <div class="notification-list">
          <h4>{{ notification.title }}</h4>
          <div 
            v-for="item in notification.items"
            :key="item.id"
            class="notification-item"
          >
            <p>{{ item.message }}</p>
            <span>{{ formatDate(item.date) }}</span>
          </div>
        </div>
      </template>
    </SuPopover>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notifications';

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};
</script>
```