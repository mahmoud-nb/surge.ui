<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onUnmounted, useAttrs, useId } from 'vue'
import { trapFocus, announceToScreenReader } from '@/utils/accessibility'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import type { DropdownProps } from '@/types'

const props = withDefaults(defineProps<DropdownProps>(), {
  options: () => [],
  trigger: 'click',
  placement: 'bottom-start',
  size: 'md',
  variant: 'outline',
  disabled: false,
  loading: false,
  loadingLabel: 'Chargement en cours...',
  iconDisplay: 'left',
  closeOnSelect: true,
  maxHeight: '300px'
})

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
  `su-dropdown-menu--${props.placement}`,
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
  
  // Annonce pour les lecteurs d'écran
  announceToScreenReader(`${option.label} sélectionné`)
  
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
          class="su-spinner"
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
        <span class="sr-only">{{ loadingLabel }}</span>
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
@use '../../styles/core/mixins' as *;
@use '../../styles/foundations/spacing' as space;
@use '../../styles/foundations/typography' as typo;

.su-dropdown-container {
  position: relative;
  display: inline-block;
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.su-dropdown-trigger {
  $self: &;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  position: relative;
  gap: space.$spacing-2;
  border-radius: var(--su-radius-md);
  
  @include transition(all);

  // Focus visible pour l'accessibilité
  &:focus-visible {
    @include focus-ring;
  }

  // Tailles
  &--sm {
    padding: space.$spacing-1 space.$spacing-2;
    font-size: typo.$font-size-sm;
    line-height: 1.25rem;
    min-height: 2rem;
    
    &.su-dropdown-trigger--icon-only {
      padding: space.$spacing-1;
      width: 2rem;
    }
  }

  &--md {
    padding: 0.625rem space.$spacing-3;
    font-size: typo.$font-size-sm;
    line-height: 1.25rem;
    min-height: 2.5rem;
    
    &.su-dropdown-trigger--icon-only {
      padding: 0.625rem;
      width: 2.5rem;
    }
  }

  &--lg {
    padding: space.$spacing-2 1.5rem;
    font-size: typo.$font-size-base;
    line-height: 1.5rem;
    min-height: 3rem;
    
    &.su-dropdown-trigger--icon-only {
      padding: space.$spacing-2;
      width: 3rem;
    }
  }

  // Variantes
  &--primary {
    background-color: var(--su-primary-600);
    color: white;
    border-color: transparent;
    
    &:hover:not(#{$self}--disabled):not(#{$self}--loading) {
      background-color: var(--su-primary-700);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgb(var(--su-primary-600-rgb) / 40%);
    }

    &:active:not(#{$self}--disabled):not(#{$self}--loading) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgb(var(--su-primary-600-rgb) / 40%);
    }
  }

  &--secondary {
    background-color: var(--su-gray-100);
    color: var(--su-gray-900);
    border-color: var(--su-gray-200);

    &:hover:not(#{$self}--disabled):not(#{$self}--loading) {
      background-color: var(--su-gray-200);
      border-color: var(--su-gray-300);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgb(107 114 128 / 15%);
    }
  }

  &--outline {
    background-color: transparent;
    color: var(--su-primary-600);
    border-color: var(--su-primary-200);

    &:hover:not(#{$self}--disabled):not(#{$self}--loading) {
      background-color: var(--su-primary-50);
      border-color: var(--su-primary-300);
      transform: translateY(-1px);
    }
  }

  &--ghost {
    background-color: transparent;
    color: var(--su-primary-600);
    border-color: transparent;

    &:hover:not(#{$self}--disabled):not(#{$self}--loading) {
      background-color: var(--su-primary-50);
      transform: translateY(-1px);
    }
  }

  // États
  &--disabled {
    cursor: not-allowed;
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  &--loading {
    cursor: wait;
  }

  // Direction de l'icône
  &--icon-right {
    flex-direction: row-reverse;
  }

  // Icônes
  &__icon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
  
  // Ajustements pour les boutons avec icônes seules
  &--icon-only {
    gap: 0;
  }
}

/* Top-level selectors (lower specificity) must come before compound selectors */
.su-dropdown-icon {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}

.su-dropdown-trigger--icon-only .su-dropdown-icon {
  width: 1.25em;
  height: 1.25em;
}

.su-dropdown-label {
  min-width: 0;

  .su-dropdown-trigger--loading & {
    opacity: 0.7;
  }
}

.su-dropdown-chevron {
  width: 1em;
  height: 1em;
  color: currentcolor;
  flex-shrink: 0;

  @include transition(transform);

  .su-dropdown-trigger--open & {
    transform: rotate(180deg);
  }
}

.su-dropdown-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  .su-spinner {
    width: 1em;
    height: 1em;
    animation: spin 1s linear infinite;
  }
}

.su-dropdown-menu {
  position: absolute;
  z-index: 50;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid var(--su-gray-200);
  border-radius: var(--su-radius-md);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  overflow: hidden;
  min-width: 12rem;
  
  // Placements
  &--bottom-start {
    top: 100%;
    left: 0;
  }
  
  &--bottom-end {
    top: 100%;
    right: 0;
  }
  
  &--top-start {
    bottom: 100%;
    left: 0;
    margin-top: 0;
    margin-bottom: 0.25rem;
  }
  
  &--top-end {
    bottom: 100%;
    right: 0;
    margin-top: 0;
    margin-bottom: 0.25rem;
  }
  
  &--left-start {
    top: 0;
    right: 100%;
    margin-top: 0;
    margin-right: 0.25rem;
  }
  
  &--left-end {
    bottom: 0;
    right: 100%;
    margin-top: 0;
    margin-right: 0.25rem;
  }
  
  &--right-start {
    top: 0;
    left: 100%;
    margin-top: 0;
    margin-left: 0.25rem;
  }
  
  &--right-end {
    bottom: 0;
    left: 100%;
    margin-top: 0;
    margin-left: 0.25rem;
  }
}

.su-dropdown-options {
  max-height: inherit;
  overflow-y: auto;
  padding: 0.25rem 0;
}

.su-dropdown-option {
  $self: &;

  display: flex;
  align-items: center;
  gap: space.$spacing-3;
  box-sizing: border-box;
  width: 100%;
  padding: space.$spacing-2 space.$spacing-3;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--su-text-primary);
  text-decoration: none;

  @include transition(all);

  &:hover:not(#{$self}--disabled) {
    background-color: var(--su-gray-50);
  }

  &--focused:not(#{$self}--disabled) {
    background-color: var(--su-primary-50);
    color: var(--su-primary-900);
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    color: var(--su-text-tertiary);
  }
  
  &-icon {
    width: 1.25em;
    height: 1.25em;
    flex-shrink: 0;
    color: var(--su-text-secondary);
  }
  
  &-content {
    flex: 1;
    min-width: 0;
  }
  
  &-label {
    font-weight: 500;
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &-description {
    font-size: typo.$font-size-sm;
    color: var(--su-text-secondary);
    margin-top: 0.125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.su-dropdown-external-icon {
  width: 1em;
  height: 1em;
  color: var(--su-text-tertiary);
  flex-shrink: 0;
}

.su-dropdown-separator {
  height: 1px;
  background-color: var(--su-gray-200);
  margin: 0.25rem 0;
}

// Animations
.su-dropdown-enter-active,
.su-dropdown-leave-active {
  @include transition(all);

  transform-origin: top;
}

.su-dropdown-enter-from,
.su-dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.95) translateY(-0.5rem);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (prefers-color-scheme: dark) {
  .su-dropdown-trigger {
    &--secondary {
      background-color: var(--su-gray-800);
      color: var(--su-gray-100);
      border-color: var(--su-gray-700);

      &:hover:not(&--disabled, &--loading) {
        background-color: var(--su-gray-700);
        border-color: var(--su-gray-600);
      }
    }

    &--outline {
      color: var(--su-primary-400);
      border-color: var(--su-primary-400);

      &:hover:not(&--disabled, &--loading) {
        background-color: rgb(var(--su-primary-400-rgb) / 10%);
        border-color: var(--su-primary-300);
      }
    }

    &--ghost {
      color: var(--su-primary-400);

      &:hover:not(&--disabled, &--loading) {
        background-color: rgb(var(--su-primary-400-rgb) / 10%);
      }
    }
  }
  
  .su-dropdown-menu {
    background-color: var(--su-gray-800);
    border-color: var(--su-gray-600);
  }
  
  .su-dropdown-option {
    color: var(--su-text-primary);
    
    &:hover:not(&--disabled) {
      background-color: var(--su-gray-700);
    }
    
    &--focused:not(&--disabled) {
      background-color: rgb(var(--su-primary-400-rgb) / 20%);
      color: var(--su-primary-200);
    }
    
    &--disabled {
      color: var(--su-text-tertiary);
    }
    
    &-icon {
      color: var(--su-text-secondary);
    }
    
    &-description {
      color: var(--su-text-secondary);
    }
  }
  
  .su-dropdown-separator {
    background-color: var(--su-gray-600);
  }
}

@media (prefers-contrast: high) {
  .su-dropdown-trigger {
    border-width: 2px;
    
    &:focus-visible {
      outline-width: 3px;
    }
  }
  
  .su-dropdown-menu {
    border-width: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .su-dropdown-trigger,
  .su-dropdown-chevron,
  .su-dropdown-option,
  .su-dropdown-enter-active,
  .su-dropdown-leave-active {
    @include transition(none);
  }
  
  .su-dropdown-trigger:hover:not(.su-dropdown-trigger--disabled, .su-dropdown-trigger--loading) {
    transform: none;
  }
  
  .su-spinner {
    animation: none;
  }
}
</style>