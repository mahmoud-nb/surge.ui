<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onUnmounted, useAttrs, useId } from 'vue'
import { trapFocus } from '@/utils/accessibility'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import type { DropdownProps } from '@/types'
import { useFloatingPosition } from '@/composables/useFloatingPosition'
import { useLocale } from '@/composables/useLocale'

const props = withDefaults(defineProps<DropdownProps>(), {
  options: () => [],
  trigger: 'click',
  placement: 'bottom-start',
  size: 'md',
  variant: 'outline',
  disabled: false,
  loading: false,
  iconDisplay: 'left',
  closeOnSelect: true,
  maxHeight: '300px'
})

// Textes par défaut : prop explicite, sinon locale courante
const { t } = useLocale()
const loadingText = computed(() => props.loadingLabel ?? t('common.loading'))

const emit = defineEmits<{
  select: [option: any]
  open: []
  close: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

// Refs
const dropdownRef = ref<HTMLDivElement>()
const triggerRef = ref<HTMLButtonElement>()
const menuRef = ref<HTMLDivElement>()
const cleanupFocusTrap = ref<(() => void) | null>(null)

// État local
const isOpen = ref(false)

// Menu positionné contre le déclencheur, au moins aussi large que lui
const { placement: currentPlacement } = useFloatingPosition(triggerRef, menuRef, {
  placement: () => props.placement,
  open: isOpen,
  offset: 4,
  matchReferenceWidth: true
})
const focusedIndex = ref(-1)

const fieldId = 'dropdown-' + useId()
const dropdownId = computed(() => attrs.id as string || fieldId)
const menuId = computed(() => `${dropdownId.value}-menu`)

// Options filtrées (sans les séparateurs pour la navigation)
const navigableOptions = computed(() => {
  return props.options.filter(option => !option.separator && !option.disabled)
})

// Classes CSS
const containerClasses = computed(() => [
  'su-dropdown-container',
  `su-dropdown-container--${props.placement}`,
  {
    'su-dropdown-container--open': isOpen.value,
    'su-dropdown-container--disabled': props.disabled
  }
])

const triggerClasses = computed(() => [
  'su-dropdown-trigger',
  `su-dropdown-trigger--${props.size}`,
  `su-dropdown-trigger--${props.variant}`,
  {
    'su-dropdown-trigger--disabled': props.disabled,
    'su-dropdown-trigger--loading': props.loading,
    'su-dropdown-trigger--open': isOpen.value,
    'su-dropdown-trigger--icon-only': props.icon && props.iconDisplay === 'only',
    'su-dropdown-trigger--icon-right': props.icon && props.iconDisplay === 'right'
  }
])

const menuClasses = computed(() => [
  'su-dropdown-menu',
  `su-dropdown-menu--${currentPlacement.value}`,
  {
    'su-dropdown-menu--open': isOpen.value
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen.value,
    'aria-controls': isOpen.value ? menuId.value : undefined
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.role) attrs['role'] = props.role
  if (props.disabled) attrs['aria-disabled'] = 'true'
  if (props.loading) attrs['aria-busy'] = 'true'
  
  return attrs
})

// Gestion des événements
const toggleDropdown = () => {
  if (props.disabled || props.loading) return
  
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = async () => {
  if (props.disabled || props.loading) return
  
  isOpen.value = true
  focusedIndex.value = -1
  
  emit('open')
  
  await nextTick()
  
  // Configuration du focus trap
  if (menuRef.value) {
    cleanupFocusTrap.value = trapFocus(menuRef.value)
  }
}

const closeDropdown = () => {
  isOpen.value = false
  focusedIndex.value = -1
  
  if (cleanupFocusTrap.value) {
    cleanupFocusTrap.value()
    cleanupFocusTrap.value = null
  }
  
  emit('close')
  
  // Retour du focus au trigger
  if (triggerRef.value) {
    triggerRef.value.focus()
  }
}

const selectOption = (option: any) => {
  if (option.disabled || option.separator) return
  
  emit('select', option)

  
  if (props.closeOnSelect) {
    closeDropdown()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else if (focusedIndex.value >= 0) {
        const option = navigableOptions.value[focusedIndex.value]
        if (option) selectOption(option)
      }
      break
      
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
      
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else {
        focusedIndex.value = Math.min(focusedIndex.value + 1, navigableOptions.value.length - 1)
      }
      break
      
    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        focusedIndex.value = Math.max(focusedIndex.value - 1, -1)
      }
      break
      
    case 'Home':
      if (isOpen.value) {
        event.preventDefault()
        focusedIndex.value = 0
      }
      break
      
    case 'End':
      if (isOpen.value) {
        event.preventDefault()
        focusedIndex.value = navigableOptions.value.length - 1
      }
      break
      
    case 'Tab':
      if (isOpen.value) {
        closeDropdown()
      }
      break
  }
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  // Fermer seulement si le focus sort complètement du composant
  setTimeout(() => {
    if (isOpen.value && dropdownRef.value && !dropdownRef.value.contains(document.activeElement)) {
      closeDropdown()
      emit('blur', event)
    }
  }, 0)
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover' && !props.disabled && !props.loading) {
    openDropdown()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    closeDropdown()
  }
}

// Fermeture au clic extérieur
const handleClickOutside = (event: Event) => {
  if (isOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

// Méthodes exposées
const focus = () => {
  triggerRef.value?.focus()
}

const open = () => {
  openDropdown()
}

const close = () => {
  closeDropdown()
}

defineExpose({
  focus,
  open,
  close,
  dropdownRef,
  triggerRef
})

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, { passive: true } as any)
  if (cleanupFocusTrap.value) {
    cleanupFocusTrap.value()
  }
})

// Validation pour les boutons avec icône seule
if (props.icon && props.iconDisplay === 'only' && !props.ariaLabel && !props.label) {
  console.warn('Dropdown with icon and iconDisplay="only" should have an ariaLabel or label for accessibility')
}
</script>

<template>
  <div 
    ref="dropdownRef"
    :class="containerClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Trigger Button -->
    <button
      :id="dropdownId"
      ref="triggerRef"
      :class="triggerClasses"
      :disabled="disabled || loading"
      :tabindex="disabled ? -1 : 0"
      v-bind="ariaAttributes"
      @click="toggleDropdown"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <!-- Spinner de chargement -->
      <span
        v-if="loading"
        class="su-dropdown-spinner"
      >
        <svg
          class="su-dropdown-spinner-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span class="sr-only">{{ loadingText }}</span>
      </span>
      
      <template v-else>
        <!-- Icône -->
        <component 
          :is="icon" 
          v-if="icon" 
          class="su-dropdown-icon"
          aria-hidden="true"
        />
        
        <!-- Label -->
        <span
          v-if="label && !(icon && iconDisplay === 'only')"
          class="su-dropdown-label"
        >
          {{ label }}
        </span>
        
        <!-- Chevron -->
        <ChevronDownIcon 
          class="su-dropdown-chevron"
          :class="{ 'su-dropdown-chevron--open': isOpen }"
          aria-hidden="true"
        />
      </template>
    </button>

    <!-- Menu Dropdown -->
    <Transition name="su-dropdown">
      <div
        v-if="isOpen"
        :id="menuId"
        ref="menuRef"
        :class="menuClasses"
        role="menu"
        :style="{ maxHeight: maxHeight }"
      >
        <div class="su-dropdown-options">
          <template
            v-for="(option, index) in options"
            :key="option.value || index"
          >
            <!-- Séparateur -->
            <div 
              v-if="option.separator"
              class="su-dropdown-separator"
              role="separator"
            />
            
            <!-- Option normale -->
            <component
              :is="option.href ? 'a' : 'button'"
              v-else
              :href="option.href"
              :target="option.target"
              :rel="option.rel"
              class="su-dropdown-option"
              :class="{
                'su-dropdown-option--disabled': option.disabled,
                'su-dropdown-option--focused': navigableOptions.indexOf(option) === focusedIndex
              }"
              role="menuitem"
              :aria-disabled="option.disabled"
              :tabindex="option.disabled ? -1 : 0"
              @click="selectOption(option)"
              @mouseenter="focusedIndex = navigableOptions.indexOf(option)"
            >
              <!-- Icône de l'option -->
              <component 
                :is="option.icon" 
                v-if="option.icon" 
                class="su-dropdown-option-icon"
                aria-hidden="true"
              />
              
              <!-- Contenu de l'option -->
              <div class="su-dropdown-option-content">
                <div class="su-dropdown-option-label">
                  {{ option.label }}
                </div>
                <div 
                  v-if="option.description" 
                  class="su-dropdown-option-description"
                >
                  {{ option.description }}
                </div>
              </div>
              
              <!-- Indicateur de lien externe -->
              <svg 
                v-if="option.href && (option.target === '_blank' || option.href.startsWith('http'))"
                class="su-dropdown-external-icon" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </component>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/abstracts' as *;

// ============================================================
// DROPDOWN — déclencheur = bouton partagé, menu = popover partagé
// ============================================================

.su-dropdown-container {
  position: relative;
  display: inline-block;

  &--disabled {
    cursor: not-allowed;
  }
}

// ### Déclencheur

.su-dropdown-trigger {
  @include button-base;

  &--sm { @include control-size('sm'); }
  &--md { @include control-size('md'); }
  &--lg { @include control-size('lg'); }

  @include button-variants;

  // Menu ouvert : même rendu qu'au survol
  &--open {
    &.su-dropdown-trigger--primary {
      background-color: with-alpha(primary-default, 90%);
    }

    &.su-dropdown-trigger--secondary {
      background-color: with-alpha(secondary-default, 90%);
    }

    &.su-dropdown-trigger--outline {
      background-image: linear-gradient(var(--su-bg-accent), var(--su-bg-accent));
    }

    &.su-dropdown-trigger--ghost {
      background-color: var(--su-bg-accent);
    }
  }

  &--disabled {
    @include button-disabled;
  }

  &--icon-only {
    padding-inline: 0.5rem;
  }

  &--icon-right {
    flex-direction: row-reverse;
  }
}

.su-dropdown-icon {
  @include button-icon;

  margin-inline: -0.125rem;
}

.su-dropdown-label {
  @include truncate;
}

.su-dropdown-chevron {
  @include button-icon;

  margin-inline-end: -0.25rem;

  @include transition(rotate);

  .su-dropdown-trigger--open & {
    rotate: 180deg;
  }
}

.su-dropdown-spinner {
  display: inline-flex;

  &-icon {
    width: 1rem;
    height: 1rem;
    animation: su-dropdown-spin 0.8s linear infinite;
  }
}

// ### Menu

.su-dropdown-menu {
  // Position fixe : left/top calculés par useFloatingPosition (retournement
  // automatique s'il manque de place, jamais coupé par un overflow)
  position: fixed;
  top: 0;
  left: 0;
  min-width: 12rem;

  @include popover-surface;
}

.su-dropdown-options {
  max-height: inherit;
  overflow: hidden auto;
  scrollbar-width: thin;
  scrollbar-color: var(--su-border-default) transparent;
}

.su-dropdown-option {
  @include menu-item;

  font-size: var(--su-font-size-base);

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  &-icon {
    @include button-icon;
  }

  &-content {
    flex: 1;
    min-width: 0;
  }

  &-label {
    @include truncate;
  }

  &-description {
    margin-top: 0.125rem;
    font-size: var(--su-font-size-xs);
    color: var(--su-text-tertiary);

    @include truncate;
  }
}

.su-dropdown-external-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
  margin-inline-start: auto;
  color: var(--su-text-tertiary);
}

.su-dropdown-separator {
  @include menu-separator;
}

// ### Animations

@include popover-transition('su-dropdown');

[class*='su-dropdown-menu--top'] {
  transform-origin: bottom center;
}

[class*='su-dropdown-menu--left'] {
  transform-origin: center right;
}

[class*='su-dropdown-menu--right'] {
  transform-origin: center left;
}

@keyframes su-dropdown-spin {
  to {
    rotate: 360deg;
  }
}

.su-dropdown-spinner-icon {
  @include motion-reduce {
    animation-duration: 2.4s;
  }
}
</style>
