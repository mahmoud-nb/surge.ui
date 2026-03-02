# Accessibility

Accessibility is built into the core of the Design System. All components and tokens respect WCAG 2.1 level AA guidelines, with AAA as a goal when possible.

## Fundamental Principles

### The 4 POUR Principles (WCAG)

1. **Perceivable**: Information must be presented in a perceivable manner
2. **Operable**: Components must be operable by everyone
3. **Understandable**: Information and interface must be understandable
4. **Robust**: Content must be interpretable by various technologies

## Color Contrast

### Conformance Levels

| Level | Ratio | Context | Our Guarantee |
|-------|-------|---------|----------------|
| **AA** | 4.5:1 | Normal text | ✅ Minimum met |
| **AA Large** | 3:1 | Large text (18px+) | ✅ Exceeded |
| **AAA** | 7:1 | Normal text | ✅ Recommended by default |
| **AAA Large** | 4.5:1 | Large text | ✅ Exceeded |

### Contrast Guaranteed by Token

```scss
// Light mode
--su-text-primary: #111827;    // 16.8:1 on white (AAA ✅)
--su-text-secondary: #374151;  // 9.3:1 on white (AAA ✅)
--su-text-tertiary: #6b7280;   // 4.7:1 on white (AA ✅)

// Dark mode
--su-text-primary: #f9fafb;    // 17.1:1 on black (AAA ✅)
--su-text-secondary: #e5e7eb;  // 12.6:1 on black (AAA ✅)
--su-text-tertiary: #9ca3af;   // 4.5:1 on black (AA ✅)
```

### Contrast Verification

```vue
<template>
  <!-- ✅ Good: Uses guaranteed tokens -->
  <div class="card">
    <h2>Title</h2>
    <p>Description</p>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--su-bg-surface); // White
  
  h2 {
    color: var(--su-text-primary); // AAA contrast guaranteed
  }
  
  p {
    color: var(--su-text-secondary); // AAA contrast guaranteed
  }
}
</style>
```

### High Contrast Mode

The system automatically detects `prefers-contrast: more` and applies adjustments.

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { effectiveContrast, setContrast } = useTheme();
// effectiveContrast: 'normal' | 'high'
</script>

<template>
  <!-- The system adapts automatically -->
  <button class="btn-primary">Action</button>
</template>
```

**Changes in High Contrast Mode**:
- Pure colors (black/white)
- Reinforced borders (2px minimum)
- Removal of transparencies
- Minimum contrast ratio 7:1

#### Enable Manually

```vue
<template>
  <button @click="setContrast('high')">
    High Contrast
  </button>
</template>
```

### Verification Tools

**Browser Extensions**:
- [Stark](https://www.getstark.co/) - Real-time verification
- [axe DevTools](https://www.deque.com/axe/devtools/) - Complete audit
- [WAVE](https://wave.webaim.org/extension/) - Visual evaluation

**Online**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com/)

## Keyboard Navigation

### Tab Order

Respect logical DOM order for keyboard navigation.

```vue
<template>
  <!-- ✅ Logical order -->
  <form>
    <input type="text" /> <!-- Tab 1 -->
    <input type="email" /> <!-- Tab 2 -->
    <button type="submit"> <!-- Tab 3 -->
      Send
    </button>
  </form>
  
  <!-- ❌ Don't use tabindex > 0 -->
  <button tabindex="3">Last</button>
  <button tabindex="1">First</button>
</template>
```

### Focus Visible

The system provides an accessible focus ring automatically.

```vue
<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.button {
  // Automatic focus ring
  &:focus-visible {
    @include focus-ring;
    // Generates:
    // outline: 2px solid var(--su-border-focus);
    // outline-offset: 2px;
  }
}
</style>
```

**Never Remove Focus**:

```scss
// ❌ FORBIDDEN
button:focus {
  outline: none; // Makes interface inaccessible
}

// ✅ If you must customize
button:focus-visible {
  outline: 2px solid var(--su-border-focus);
  outline-offset: 2px;
}
```

### Skip Links

Add skip links for quick navigation.

```vue
<template>
  <div class="app">
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>
    
    <nav><!-- Navigation --></nav>
    
    <main id="main-content">
      <!-- Content -->
    </main>
  </div>
</template>

<style scoped lang="scss">
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  padding: var(--su-spacing-3) var(--su-spacing-4);
  background-color: var(--su-primary-default);
  color: var(--su-primary-text);
  text-decoration: none;
  z-index: 9999;
  
  &:focus {
    top: 0;
  }
}
</style>
```

### Keyboard Shortcuts

Document custom keyboard shortcuts.

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const handleKeyboard = (e: KeyboardEvent) => {
  // Cmd/Ctrl + K to open search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboard);
});
</script>
```

## Screen Readers

### ARIA Landmarks

Use semantic HTML elements and ARIA roles.

```vue
<template>
  <div class="app">
    <!-- ✅ Good: Semantic elements -->
    <header>
      <nav aria-label="Main Navigation">
        <!-- Menu -->
      </nav>
    </header>
    
    <main>
      <article>
        <h1>Main Title</h1>
      </article>
    </main>
    
    <aside aria-label="Sidebar">
      <!-- Sidebar -->
    </aside>
    
    <footer>
      <!-- Footer -->
    </footer>
  </div>
</template>
```

### Labels and Descriptions

All interactive elements must have an accessible label.

```vue
<template>
  <!-- ✅ Good: Visible label -->
  <label for="email">Email</label>
  <input id="email" type="email" />
  
  <!-- ✅ Good: Visually hidden label -->
  <button aria-label="Close modal">
    <IconClose />
  </button>
  
  <!-- ✅ Good: Additional description -->
  <input 
    id="password"
    type="password"
    aria-describedby="password-hint"
  />
  <span id="password-hint">
    Minimum 8 characters
  </span>
  
  <!-- ❌ Bad: No label -->
  <input type="text" placeholder="Email" />
</template>
```

### Dynamic States

Indicate state changes to screen readers.

```vue
<template>
  <!-- Loading indication -->
  <button 
    :disabled="loading"
    :aria-busy="loading"
  >
    <span v-if="loading">Loading...</span>
    <span v-else>Send</span>
  </button>
  
  <!-- Validation error -->
  <input 
    :aria-invalid="hasError"
    :aria-describedby="hasError ? 'error-message' : undefined"
  />
  <span v-if="hasError" id="error-message" role="alert">
    {{ errorMessage }}
  </span>
  
  <!-- Expanded/collapsed content -->
  <button
    :aria-expanded="isExpanded"
    aria-controls="details-panel"
    @click="isExpanded = !isExpanded"
  >
    Details
  </button>
  <div id="details-panel" v-show="isExpanded">
    <!-- Content -->
  </div>
</template>
```

### Live Regions

For important dynamic updates.

```vue
<template>
  <!-- Critical notification -->
  <div 
    role="alert" 
    aria-live="assertive"
    v-if="criticalError"
  >
    {{ criticalError }}
  </div>
  
  <!-- Non-critical notification -->
  <div 
    role="status" 
    aria-live="polite"
    v-if="successMessage"
  >
    {{ successMessage }}
  </div>
  
  <!-- Updated counter -->
  <div aria-live="polite" aria-atomic="true">
    {{ count }} items selected
  </div>
</template>
```

## Animations and Motion

### Reduced Motion

The system automatically respects `prefers-reduced-motion: reduce`.

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { effectiveMotion, setMotion } = useTheme();
// effectiveMotion: 'normal' | 'reduce'
</script>
```

**Behavior**:
- All transition durations → `0ms`
- Animations disabled
- `--su-animation-scale` → `0`

### Usage in Components

```vue
<style scoped lang="scss">
.animated-element {
  // Transition respects reduced-motion automatically
  transition: transform var(--su-duration-normal) var(--su-ease-in-out);
  
  &:hover {
    // Scale respects reduced-motion via --su-animation-scale
    transform: scale(calc(1 + 0.05 * var(--su-animation-scale)));
  }
}
</style>
```

### Pure CSS Animations

```scss
@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-element {
  animation: slide-in var(--su-duration-normal) var(--su-ease-in-out);
}

// Automatically disable in reduced-motion mode
@media (prefers-reduced-motion: reduce) {
  .slide-element {
    animation: none;
  }
}
```

### Essential Animations

Some animations communicate important information (loading, progress). Keep them but simplify.

```vue
<style scoped lang="scss">
.loading-spinner {
  animation: spin 1s linear infinite;
}

// In reduced-motion mode, simplify but keep indication
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: pulse 2s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
```

## Touch Targets

### Minimum Size (WCAG 2.5.5)

Interactive elements must have **minimum 44x44px**.

```vue
<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.button {
  // Automatic mixin for 44px minimum
  @include touch-target;
  // Generates: min-width: 44px; min-height: 44px;
  
  padding: var(--su-spacing-3) var(--su-spacing-4);
}

// For smaller elements, increase clickable area
.icon-button {
  width: 24px;
  height: 24px;
  
  // Larger clickable area via padding
  padding: 10px;
  // Total: 44x44px
}
</style>
```

### Spacing Between Targets

Minimum **8px** between adjacent touch elements.

```vue
<style scoped lang="scss">
.button-group {
  display: flex;
  gap: var(--su-spacing-2); // 8px minimum
}
</style>
```

## Accessible Forms

### Complete Structure

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Grouping of fields -->
    <fieldset>
      <legend>Personal Information</legend>
      
      <!-- Text field -->
      <div class="form-field">
        <label for="name">
          Nom complet
          <span aria-label="obligatoire">*</span>
        </label>
        <input 
          id="name"
          v-model="form.name"
          type="text"
          required
          :aria-invalid="errors.name ? 'true' : 'false'"
          :aria-describedby="errors.name ? 'name-error' : 'name-hint'"
        />
        <span id="name-hint" class="hint">
          Prénom et nom
        </span>
        <span 
          v-if="errors.name"
          id="name-error" 
          class="error"
          role="alert"
        >
          {{ errors.name }}
        </span>
      </div>
      
      <!-- Radio buttons -->
      <fieldset>
        <legend>Genre</legend>
        <label>
          <input type="radio" v-model="form.gender" value="M" />
          Homme
        </label>
        <label>
          <input type="radio" v-model="form.gender" value="F" />
          Femme
        </label>
        <label>
          <input type="radio" v-model="form.gender" value="O" />
          Autre
        </label>
      </fieldset>
      
      <!-- Checkbox -->
      <label class="checkbox">
        <input 
          type="checkbox" 
          v-model="form.newsletter"
          aria-describedby="newsletter-desc"
        />
        <span>Recevoir la newsletter</span>
      </label>
      <span id="newsletter-desc" class="hint">
        Envoi mensuel, désinscription possible à tout moment
      </span>
    </fieldset>
    
    <!-- Actions -->
    <div class="form-actions">
      <button type="submit" :disabled="loading">
        {{ loading ? 'Envoi en cours...' : 'Envoyer' }}
      </button>
      <button type="button" @click="reset">
        Réinitialiser
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--su-spacing-2);
  margin-bottom: var(--su-spacing-4);
}

label {
  color: var(--su-text-primary);
  font-weight: 500;
}

input {
  padding: var(--su-spacing-3);
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  font-size: var(--su-font-size-base);
  
  &:focus {
    border-color: var(--su-border-focus);
    outline: none;
  }
  
  &[aria-invalid="true"] {
    border-color: var(--su-state-error);
  }
}

.hint {
  color: var(--su-text-tertiary);
  font-size: var(--su-font-size-sm);
}

.error {
  color: var(--su-state-error);
  font-size: var(--su-font-size-sm);
}
</style>
```

### Validation accessible

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const email = ref('');
const emailError = ref('');

const isEmailValid = computed(() => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.value);
});

const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'L\'email est obligatoire';
  } else if (!isEmailValid.value) {
    emailError.value = 'Format d\'email invalide';
  } else {
    emailError.value = '';
  }
};
</script>

<template>
  <div class="form-field">
    <label for="email">Email</label>
    <input 
      id="email"
      v-model="email"
      type="email"
      @blur="validateEmail"
      :aria-invalid="!!emailError"
      :aria-describedby="emailError ? 'email-error' : undefined"
    />
    <!-- role="alert" annonce immédiatement l'erreur -->
    <span 
      v-if="emailError" 
      id="email-error"
      class="error"
      role="alert"
    >
      {{ emailError }}
    </span>
  </div>
</template>
```

## Modales et dialogues

### Modal accessible

```vue
<template>
  <Teleport to="body">
    <div 
      v-if="isOpen"
      class="modal-backdrop"
      @click="close"
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        class="modal"
        @click.stop
      >
        <div class="modal__header">
          <h2 id="modal-title">{{ title }}</h2>
          <button 
            aria-label="Fermer la modale"
            @click="close"
          >
            <IconClose />
          </button>
        </div>
        
        <div id="modal-description" class="modal__body">
          <slot />
        </div>
        
        <div class="modal__footer">
          <button @click="confirm">Confirmer</button>
          <button @click="close">Annuler</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();

// Gestion du focus
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    // Capturer le focus
    const modal = document.querySelector('[role="dialog"]');
    const firstFocusable = modal?.querySelector('button, [href], input, select, textarea');
    (firstFocusable as HTMLElement)?.focus();
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Fermer avec Échap
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>
```

### Focus trap

Empêchez le focus de sortir de la modale.

```typescript
// composables/useFocusTrap.ts
export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  const focusableSelector = 
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !containerRef.value) return;
    
    const focusables = Array.from(
      containerRef.value.querySelectorAll(focusableSelector)
    ) as HTMLElement[];
    
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  
  onMounted(() => {
    document.addEventListener('keydown', handleTab);
  });
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleTab);
  });
}
```

## Tests d'accessibilité

### Tests automatisés

```bash
# Installer axe-core
npm install -D @axe-core/vue vitest-axe
```

```typescript
// Button.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from 'vitest-axe';
import Button from './Button.vue';

describe('Button', () => {
  it('devrait être accessible', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Cliquer ici' }
    });
    
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
  
  it('devrait avoir un label accessible', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Cliquer ici' }
    });
    
    expect(wrapper.text()).toBe('Cliquer ici');
  });
});
```

### Checklist manuelle

- [ ] Navigation complète au clavier
- [ ] Focus visible sur tous les éléments
- [ ] Contraste minimum AA (4.5:1)
- [ ] Labels sur tous les champs
- [ ] Textes alternatifs sur les images
- [ ] Vidéos avec sous-titres
- [ ] Test avec lecteur d'écran (NVDA, JAWS, VoiceOver)
- [ ] Zoom à 200% sans perte d'information
- [ ] Mode contraste élevé fonctionnel
- [ ] Reduced motion respecté

### Outils de test

**Automatisés** :
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)

**Lecteurs d'écran** :
- **Windows** : NVDA (gratuit), JAWS
- **macOS** : VoiceOver (intégré)
- **Linux** : Orca
- **Mobile** : TalkBack (Android), VoiceOver (iOS)

## Composants accessibles avancés

### Tabs accessibles

```vue
<template>
  <div class="tabs">
    <div role="tablist" aria-label="Sections du contenu">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :id="`tab-${tab.id}`"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="activeTab === tab.id ? 0 : -1"
        class="tab"
        :class="{ 'tab--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
        @keydown="handleTabKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :id="`panel-${tab.id}`"
      role="tabpanel"
      :aria-labelledby="`tab-${tab.id}`"
      :hidden="activeTab !== tab.id"
      :tabindex="0"
      class="tab-panel"
    >
      <slot :name="tab.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Tab {
  id: string;
  label: string;
}

const props = defineProps<{
  tabs: Tab[];
  defaultTab?: string;
}>();

const activeTab = ref(props.defaultTab || props.tabs[0]?.id);

const handleTabKeydown = (event: KeyboardEvent, index: number) => {
  let newIndex = index;
  
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault();
      newIndex = (index + 1) % props.tabs.length;
      break;
    case 'ArrowLeft':
      event.preventDefault();
      newIndex = index === 0 ? props.tabs.length - 1 : index - 1;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = props.tabs.length - 1;
      break;
    default:
      return;
  }
  
  activeTab.value = props.tabs[newIndex].id;
  document.getElementById(`tab-${props.tabs[newIndex].id}`)?.focus();
};
</script>

<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.tabs {
  display: flex;
  flex-direction: column;
}

[role="tablist"] {
  display: flex;
  gap: var(--su-spacing-2);
  border-bottom: 2px solid var(--su-border-default);
}

.tab {
  padding: var(--su-spacing-3) var(--su-spacing-4);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--su-text-secondary);
  font-size: var(--su-font-size-base);
  font-weight: 500;
  cursor: pointer;
  margin-bottom: -2px;
  @include transition(color, border-color);
  
  &:hover {
    color: var(--su-text-primary);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  &--active {
    color: var(--su-primary-default);
    border-bottom-color: var(--su-primary-default);
  }
}

.tab-panel {
  padding: var(--su-spacing-6) var(--su-spacing-4);
  
  &:focus {
    outline: none;
  }
}
</style>
```

### Accordion accessible

```vue
<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="accordion-item"
    >
      <h3>
        <button
          :id="`accordion-header-${item.id}`"
          :aria-expanded="openItems.includes(item.id)"
          :aria-controls="`accordion-panel-${item.id}`"
          class="accordion-button"
          @click="toggle(item.id)"
        >
          <span>{{ item.title }}</span>
          <IconChevronDown
            class="accordion-icon"
            :class="{ 'accordion-icon--open': openItems.includes(item.id) }"
          />
        </button>
      </h3>
      
      <div
        :id="`accordion-panel-${item.id}`"
        role="region"
        :aria-labelledby="`accordion-header-${item.id}`"
        :hidden="!openItems.includes(item.id)"
        class="accordion-panel"
      >
        <div class="accordion-content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

const props = defineProps<{
  items: AccordionItem[];
  multiple?: boolean;
}>();

const openItems = ref<string[]>([]);

const toggle = (id: string) => {
  if (openItems.value.includes(id)) {
    openItems.value = openItems.value.filter(i => i !== id);
  } else {
    if (props.multiple) {
      openItems.value.push(id);
    } else {
      openItems.value = [id];
    }
  }
};
</script>

<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.accordion-item {
  border-bottom: 1px solid var(--su-border-default);
  
  &:first-child {
    border-top: 1px solid var(--su-border-default);
  }
}

.accordion-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--su-spacing-4);
  background: transparent;
  border: none;
  text-align: left;
  font-size: var(--su-font-size-base);
  font-weight: 600;
  color: var(--su-text-primary);
  cursor: pointer;
  @include transition(background-color);
  
  &:hover {
    background-color: var(--su-bg-hover);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.accordion-icon {
  @include transition(transform);
  
  &--open {
    transform: rotate(180deg);
  }
}

.accordion-panel {
  overflow: hidden;
  
  &[hidden] {
    display: none;
  }
}

.accordion-content {
  padding: 0 var(--su-spacing-4) var(--su-spacing-4);
  color: var(--su-text-secondary);
  line-height: var(--su-line-height-relaxed);
}
</style>
```

### Combobox (Autocomplete)

```vue
<template>
  <div class="combobox" ref="comboboxRef">
    <label :id="`${id}-label`" :for="`${id}-input`" class="combobox-label">
      {{ label }}
    </label>
    
    <div class="combobox-wrapper">
      <input
        :id="`${id}-input`"
        v-model="inputValue"
        type="text"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-controls="`${id}-listbox`"
        :aria-activedescendant="activeDescendant"
        :aria-autocomplete="'list'"
        :aria-labelledby="`${id}-label`"
        class="combobox-input"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="isOpen = true"
      />
      
      <ul
        v-show="isOpen && filteredOptions.length > 0"
        :id="`${id}-listbox`"
        role="listbox"
        :aria-labelledby="`${id}-label`"
        class="combobox-listbox"
      >
        <li
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          :id="`${id}-option-${index}`"
          role="option"
          :aria-selected="selectedOption?.value === option.value"
          class="combobox-option"
          :class="{
            'combobox-option--highlighted': highlightedIndex === index,
            'combobox-option--selected': selectedOption?.value === option.value
          }"
          @click="selectOption(option)"
          @mouseenter="highlightedIndex = index"
        >
          {{ option.label }}
        </li>
      </ul>
      
      <span
        v-if="isOpen && filteredOptions.length === 0"
        class="combobox-empty"
        role="status"
      >
        Aucun résultat
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

interface Option {
  value: string;
  label: string;
}

const props = defineProps<{
  id: string;
  label: string;
  options: Option[];
  modelValue?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const comboboxRef = ref<HTMLElement | null>(null);
const inputValue = ref('');
const isOpen = ref(false);
const highlightedIndex = ref(0);
const selectedOption = ref<Option | null>(null);

const filteredOptions = computed(() => {
  if (!inputValue.value) return props.options;
  
  const query = inputValue.value.toLowerCase();
  return props.options.filter(option =>
    option.label.toLowerCase().includes(query)
  );
});

const activeDescendant = computed(() => {
  if (!isOpen.value || filteredOptions.value.length === 0) return undefined;
  return `${props.id}-option-${highlightedIndex.value}`;
});

const handleInput = () => {
  isOpen.value = true;
  highlightedIndex.value = 0;
};

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
      } else {
        highlightedIndex.value = Math.min(
          highlightedIndex.value + 1,
          filteredOptions.value.length - 1
        );
      }
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0);
      break;
      
    case 'Enter':
      event.preventDefault();
      if (isOpen.value && filteredOptions.value[highlightedIndex.value]) {
        selectOption(filteredOptions.value[highlightedIndex.value]);
      }
      break;
      
    case 'Escape':
      event.preventDefault();
      isOpen.value = false;
      break;
  }
};

const selectOption = (option: Option) => {
  selectedOption.value = option;
  inputValue.value = option.label;
  isOpen.value = false;
  emit('update:modelValue', option.value);
};

const handleClickOutside = (event: MouseEvent) => {
  if (comboboxRef.value && !comboboxRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  if (props.modelValue) {
    const option = props.options.find(o => o.value === props.modelValue);
    if (option) {
      selectedOption.value = option;
      inputValue.value = option.label;
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
@use '@/styles/core/mixins' as *;

.combobox {
  position: relative;
}

.combobox-label {
  display: block;
  margin-bottom: var(--su-spacing-2);
  font-size: var(--su-font-size-sm);
  font-weight: 500;
  color: var(--su-text-primary);
}

.combobox-wrapper {
  position: relative;
}

.combobox-input {
  width: 100%;
  padding: var(--su-spacing-3) var(--su-spacing-4);
  font-size: var(--su-font-size-base);
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  @include transition(border-color);
  
  &:focus {
    border-color: var(--su-border-focus);
    outline: none;
  }
}

.combobox-listbox {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: var(--z-dropdown, 1000);
  max-height: 300px;
  margin: 0;
  padding: var(--su-spacing-2);
  list-style: none;
  background-color: var(--su-bg-surface);
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  box-shadow: var(--su-shadow-lg);
  overflow-y: auto;
}

.combobox-option {
  padding: var(--su-spacing-2) var(--su-spacing-3);
  border-radius: var(--su-radius-sm);
  color: var(--su-text-primary);
  cursor: pointer;
  @include transition(background-color);
  
  &--highlighted {
    background-color: var(--su-bg-hover);
  }
  
  &--selected {
    background-color: var(--su-bg-selected);
    color: var(--su-primary-default);
    font-weight: 500;
  }
}

.combobox-empty {
  display: block;
  padding: var(--su-spacing-3);
  text-align: center;
  color: var(--su-text-tertiary);
  font-size: var(--su-font-size-sm);
}
</style>
```

## Audit et checklist

### Checklist complète WCAG 2.1 AA

#### Perceptible

- [ ] **1.1.1** Contenu non textuel : Alternatives textuelles pour images
- [ ] **1.3.1** Info et relations : Structure sémantique HTML
- [ ] **1.3.2** Ordre séquentiel logique : DOM order = visual order
- [ ] **1.4.1** Utilisation de la couleur : Ne pas utiliser uniquement la couleur
- [ ] **1.4.3** Contraste minimum : 4.5:1 pour texte normal, 3:1 pour texte large
- [ ] **1.4.4** Redimensionnement du texte : Zoom 200% sans perte
- [ ] **1.4.10** Reflow : Pas de scroll horizontal à 320px
- [ ] **1.4.11** Contraste non-textuel : 3:1 pour composants UI
- [ ] **1.4.12** Espacement du texte : Supporté sans perte de contenu

#### Utilisable

- [ ] **2.1.1** Clavier : Toutes les fonctions au clavier
- [ ] **2.1.2** Pas de piège au clavier : Possibilité de sortir
- [ ] **2.1.4** Raccourcis clavier : Désactivables ou reconfigurables
- [ ] **2.4.1** Contournement de blocs : Skip links présents
- [ ] **2.4.3** Ordre de focus : Logique et prévisible
- [ ] **2.4.6** En-têtes et étiquettes : Descriptifs
- [ ] **2.4.7** Focus visible : Toujours visible
- [ ] **2.5.1** Gestes du pointeur : Alternatives aux gestes complexes
- [ ] **2.5.2** Annulation du pointeur : Possibilité d'annuler
- [ ] **2.5.3** Étiquette dans le nom : Nom accessible = label visible
- [ ] **2.5.4** Activation par le mouvement : Alternative disponible

#### Compréhensible

- [ ] **3.1.1** Langue de la page : `lang` défini
- [ ] **3.2.1** Au focus : Pas de changement de contexte
- [ ] **3.2.2** À la saisie : Pas de changement inattendu
- [ ] **3.2.3** Navigation cohérente : Même position des éléments
- [ ] **3.2.4** Identification cohérente : Composants identiques
- [ ] **3.3.1** Identification des erreurs : Messages clairs
- [ ] **3.3.2** Étiquettes ou instructions : Présentes
- [ ] **3.3.3** Suggestion d'erreur : Corrections proposées
- [ ] **3.3.4** Prévention des erreurs : Confirmation pour actions importantes

#### Robuste

- [ ] **4.1.1** Analyse syntaxique : HTML valide
- [ ] **4.1.2** Nom, rôle, valeur : ARIA correct
- [ ] **4.1.3** Messages de statut : Annoncés aux lecteurs d'écran

### Outils d'audit automatisés

```bash
# Installation
npm install -D @axe-core/cli lighthouse pa11y

# Tests axe-core
npx axe https://votre-site.com --save results.json

# Lighthouse CI
npx lighthouse https://votre-site.com --output html --output-path ./report.html

# Pa11y
npx pa11y https://votre-site.com
```

### Tests avec lecteurs d'écran

**Combinaisons clavier essentielles** :

#### NVDA (Windows)
- `NVDA + Espace` : Mode navigation / Focus
- `H` : Titre suivant
- `K` : Lien suivant
- `B` : Bouton suivant
- `F` : Champ de formulaire suivant
- `T` : Tableau suivant

#### JAWS (Windows)
- `Insert + F7` : Liste des liens
- `Insert + F5` : Liste des champs
- `Insert + F6` : Liste des titres
- `H` : Titre suivant
- `F` : Formulaire suivant

#### VoiceOver (macOS)
- `VO + A` : Lire tout
- `VO + Cmd + H` : Titre suivant
- `VO + Cmd + L` : Lien suivant
- `VO + Cmd + J` : Formulaire suivant
- `VO + U` : Rotor (navigation rapide)

### Script de test automatique

```javascript
// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await injectAxe(page);
    await checkA11y(page);
  });
  
  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    const firstLink = await page.locator(':focus');
    await expect(firstLink).toBeVisible();
    
    // Check focus is visible
    const outline = await firstLink.evaluate((el) => 
      window.getComputedStyle(el).outline
    );
    expect(outline).not.toBe('none');
  });
  
  test('modal should trap focus', async ({ page }) => {
    await page.goto('http://localhost:3000/modal-test');
    
    // Open modal
    await page.click('button[aria-label="Open modal"]');
    
    // Tab through modal elements
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus');
    const modalElement = await page.locator('[role="dialog"]');
    
    // Check focus is inside modal
    const isInsideModal = await focusedElement.evaluate(
      (el, modal) => modal.contains(el),
      await modalElement.elementHandle()
    );
    expect(isInsideModal).toBe(true);
  });
  
  test('form errors should be announced', async ({ page }) => {
    await page.goto('http://localhost:3000/form');
    
    // Submit empty form
    await page.click('button[type="submit"]');
    
    // Check error has role="alert"
    const errorMessage = await page.locator('[role="alert"]');
    await expect(errorMessage).toBeVisible();
    
    // Check aria-invalid
    const invalidInput = await page.locator('[aria-invalid="true"]');
    await expect(invalidInput).toBeVisible();
  });
});
```

## Ressources complémentaires

### Documentation officielle
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Accessibility](https://developer.mozilla.org/fr/docs/Web/Accessibility)

### Outils
- [axe DevTools](https://www.deque.com/axe/devtools/) - Extension navigateur
- [WAVE](https://wave.webaim.org/) - Évaluation visuelle
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Audit complet
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/) - Desktop app

### Formation
- [Web Accessibility by Google (Udacity)](https://www.udacity.com/course/web-accessibility--ud891)
- [A11ycasts (YouTube)](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [The A11Y Project](https://www.a11yproject.com/)

### Communauté
- [WebAIM Forums](https://webaim.org/discussion/)
- [A11y Slack](https://web-a11y.slack.com/)

## Liens connexes

- [Guide des couleurs](./colors.md)
- [Tokens sémantiques](./tokens.md)
- [Système de thèmes](./themes.md)
- [Exemples complets](./examples.md)