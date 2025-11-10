<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted, useAttrs, useId } from 'vue'
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { trapFocus, announceToScreenReader } from '@/utils/accessibility'
import type { SelectOption, SelectBoxProps } from '@/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectBoxProps>(), {
  options: () => [],
  groups: () => [],
  multiple: false,
  searchable: false,
  clearable: false,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  placeholder: 'Sélectionnez une option...',
  searchPlaceholder: 'Rechercher...',
  noOptionsText: 'Aucune option disponible',
  noResultsText: 'Aucun résultat trouvé',
  maxHeight: '200px',
  textAlign: 'left',
  dir: 'auto',
  loading: false,
  closeOnSelect: true,
  maxSelectedItems: undefined
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<string | number | (string | number)[] | undefined>()

const emit = defineEmits<{
  change: [value: string | number | (string | number)[] | undefined]
  open: []
  close: []
  search: [query: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()
const fieldId = 'selectbox-' + useId()

// Refs
const selectRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLDivElement>()
const searchInputRef = ref<HTMLInputElement>()

// État local
const isOpen = ref(false)
const searchQuery = ref('')
const focusedIndex = ref(-1)
const cleanupFocusTrap = ref<(() => void) | null>(null)

// IDs pour l'accessibilité
const selectId = computed(() => attrs.id as string || fieldId)
const listboxId = computed(() => `${selectId.value}-listbox`)

// Normalisation des options
const normalizedOptions = computed(() => {
  if (props.groups && props.groups.length > 0) {
    return props.groups.flatMap(group => 
      group.options.map(option => ({ ...option, group: group.label }))
    )
  }
  return props.options || []
})

// Options filtrées par la recherche
const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return normalizedOptions.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return normalizedOptions.value.filter(option =>
    option.label.toLowerCase().includes(query) ||
    (option.description && option.description.toLowerCase().includes(query))
  )
})

// Options groupées pour l'affichage
const groupedOptions = computed(() => {
  const groups: Record<string, SelectOption[]> = {}
  
  filteredOptions.value.forEach(option => {
    const groupName = option.group || ''
    if (!groups[groupName]) {
      groups[groupName] = []
    }
    groups[groupName].push(option)
  })
  
  return groups
})

// Valeur sélectionnée normalisée
const selectedValue = computed({
  get() {
    if (props.multiple) {
      return Array.isArray(modelValue.value) ? modelValue.value : (modelValue.value !== undefined && modelValue.value !== null ? [modelValue.value] : [])
    }
    return modelValue.value
  },
  set(newValue) {
    modelValue.value = newValue
    emit('change', newValue)
  }
})

// Options sélectionnées
const selectedOptions = computed(() => {
  if (props.multiple) {
    const values = selectedValue.value as (string | number)[]
    return values ? normalizedOptions.value.filter(option => values.includes(option.value)) : []
  } else {
    const value = selectedValue.value as string | number
    return value !== undefined && value !== null 
      ? normalizedOptions.value.filter(option => option.value === value)
      : []
  }
})

// Texte affiché
const displayText = computed(() => {
  if (selectedOptions.value.length === 0) {
    return props.placeholder
  }
  
  if (props.multiple) {
    if (selectedOptions.value.length === 1) {
      return selectedOptions.value[0].label
    }
    return `${selectedOptions.value.length} éléments sélectionnés`
  }
  
  return selectedOptions.value[0]?.label || props.placeholder
})

// Classes CSS
const containerClasses = computed(() => [
  'su-select-container',
  `su-select-container--${props.size}`,
  `su-select-container--${props.state}`,
  {
    'su-select-container--disabled': props.disabled,
    'su-select-container--readonly': props.readonly,
    'su-select-container--open': isOpen.value,
    'su-select-container--multiple': props.multiple,
    'su-select-container--rtl': props.dir === 'rtl'
  }
])

const triggerClasses = computed(() => [
  'su-select-trigger',
  `su-select-trigger--${props.size}`,
  `su-select-trigger--${props.state}`,
  `su-select-trigger--align-${props.textAlign}`,
  {
    'su-select-trigger--disabled': props.disabled,
    'su-select-trigger--readonly': props.readonly,
    'su-select-trigger--open': isOpen.value,
    'su-select-trigger--has-value': selectedOptions.value.length > 0,
    'su-select-trigger--placeholder': selectedOptions.value.length === 0
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    'aria-haspopup': 'listbox',
    'aria-expanded': isOpen.value,
    'aria-controls': isOpen.value ? listboxId.value : undefined,
    'role': 'combobox'
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined) attrs['aria-required'] = props.ariaRequired
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  if (props.multiple) attrs['aria-multiselectable'] = 'true'
  
  return attrs
})

// Gestion des événements
const toggleDropdown = () => {
  if (props.disabled || props.readonly) return
  
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = async () => {
  if (props.disabled || props.readonly) return
  
  isOpen.value = true
  searchQuery.value = ''
  focusedIndex.value = -1
  
  emit('open')
  
  await nextTick()
  
  if (props.searchable && searchInputRef.value) {
    searchInputRef.value.focus()
  }
  
  // Configuration du focus trap
  if (dropdownRef.value) {
    cleanupFocusTrap.value = trapFocus(dropdownRef.value)
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
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return
  
  let newValue: string | number | (string | number)[]
  
  if (props.multiple) {
    const currentValues = (selectedValue.value as (string | number)[]) || []
    const isSelected = currentValues.includes(option.value)
    
    if (isSelected) {
      newValue = currentValues.filter(v => v !== option.value)
    } else {
      if (props.maxSelectedItems && currentValues.length >= props.maxSelectedItems) {
        announceToScreenReader(`Maximum ${props.maxSelectedItems} éléments sélectionnables`)
        return
      }
      newValue = [...currentValues, option.value]
    }
  } else {
    newValue = option.value
  }
  
  selectedValue.value = newValue
  
  // Annonce pour les lecteurs d'écran
  const action = props.multiple && (selectedValue.value as (string | number)[]).includes(option.value) ? 'désélectionné' : 'sélectionné'
  announceToScreenReader(`${option.label} ${action}`)
  
  if (!props.multiple && props.closeOnSelect) {
    closeDropdown()
  }
}

const clearSelection = (event: Event) => {
  event.stopPropagation()
  
  const newValue = props.multiple ? [] : undefined
  selectedValue.value = newValue
  
  announceToScreenReader('Sélection effacée')
}

const removeSelectedOption = (option: SelectOption, event: Event) => {
  event.stopPropagation()
  
  if (props.multiple) {
    const currentValues = (selectedValue.value as (string | number)[]) || []
    const newValue = currentValues.filter(v => v !== option.value)
    selectedValue.value = newValue
    
    announceToScreenReader(`${option.label} retiré de la sélection`)
  }
}

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  focusedIndex.value = -1
  emit('search', searchQuery.value)
}

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else if (focusedIndex.value >= 0) {
        const option = filteredOptions.value[focusedIndex.value]
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
        focusedIndex.value = Math.min(focusedIndex.value + 1, filteredOptions.value.length - 1)
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
        focusedIndex.value = filteredOptions.value.length - 1
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
    if (isOpen.value && selectRef.value && !selectRef.value.contains(document.activeElement)) {
      closeDropdown()
      emit('blur', event)
    }
  }, 0)
}

// Fermeture au clic extérieur
const handleClickOutside = (event: Event) => {
  if (isOpen.value && selectRef.value && !selectRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

// Méthodes exposées
const focus = () => {
  inputRef.value?.focus()
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
  selectRef,
  inputRef
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

// Watchers
watch(modelValue, () => {
  // Réinitialiser l'index de focus quand la valeur change
  focusedIndex.value = -1
})
</script>

<template>
  <div class="su-select-wrapper" :dir="dir">
    <!-- Container principal -->
    <div 
      ref="selectRef"
      :class="containerClasses"
    >
  <!-- Trigger -->
  <div
    ref="inputRef"
    :id="selectId"
    :class="triggerClasses"
    :tabindex="disabled ? -1 : 0"
    v-bind="ariaAttributes"
    @click="toggleDropdown"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- Contenu du trigger -->
    <div class="su-select-content">
      <!-- Sélection multiple - tags -->
      <div v-if="multiple && selectedOptions.length > 0" class="su-select-tags">
        <span
          v-for="option in selectedOptions.slice(0, 3)"
          :key="option.value"
          class="su-select-tag"
        >
          <component 
            v-if="option.icon" 
            :is="option.icon" 
            class="su-select-tag-icon"
            aria-hidden="true"
          />
          <span class="su-select-tag-label">{{ option.label }}</span>
          <button
            type="button"
            class="su-select-tag-remove"
            :aria-label="`Retirer ${option.label}`"
            @click="removeSelectedOption(option, $event)"
          >
            <XMarkIcon class="su-select-tag-remove-icon" />
          </button>
        </span>
        <span 
          v-if="selectedOptions.length > 3" 
          class="su-select-tag su-select-tag--more"
        >
          +{{ selectedOptions.length - 3 }}
        </span>
      </div>
      
      <!-- Sélection simple ou placeholder -->
      <div v-else class="su-select-display">
        <component 
          v-if="selectedOptions[0]?.icon" 
          :is="selectedOptions[0].icon" 
          class="su-select-display-icon"
          aria-hidden="true"
        />
        <span class="su-select-display-text">{{ displayText }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="su-select-actions">
      <!-- Loading -->
      <div v-if="loading" class="su-select-spinner">
        <svg class="su-spinner" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      
      <!-- Clear button -->
      <button
        v-else-if="clearable && selectedOptions.length > 0 && !disabled && !readonly"
        type="button"
        class="su-select-clear"
        aria-label="Effacer la sélection"
        @click="clearSelection"
      >
        <XMarkIcon class="su-select-clear-icon" />
      </button>
      
      <!-- Chevron -->
      <ChevronDownIcon 
        class="su-select-chevron"
        :class="{ 'su-select-chevron--open': isOpen }"
        aria-hidden="true"
      />
    </div>
  </div>

  <!-- Dropdown -->
  <Transition name="su-select-dropdown">
    <div
      v-if="isOpen"
      ref="dropdownRef"
      :id="listboxId"
      class="su-select-dropdown"
      role="listbox"
      :aria-multiselectable="multiple"
    >
      <!-- Recherche -->
      <div v-if="searchable" class="su-select-search">
        <div class="su-select-search-container">
          <MagnifyingGlassIcon class="su-select-search-icon" aria-hidden="true" />
          <input
            ref="searchInputRef"
            type="text"
            class="su-select-search-input"
            :placeholder="searchPlaceholder"
            :value="searchQuery"
            @input="handleSearch"
            @keydown="handleKeydown"
          />
        </div>
      </div>

      <!-- Options -->
      <div class="su-select-options" :style="{ maxHeight: maxHeight }" >
        <template v-if="filteredOptions.length > 0">
          <template v-for="(groupOptions, groupName) in groupedOptions" :key="groupName">
            <!-- Groupe header -->
            <div 
              v-if="groupName && props.groups && props.groups.length > 0" 
              class="su-select-group-header"
              role="group"
              :aria-label="groupName"
            >
              {{ groupName }}
            </div>
            
            <!-- Options du groupe -->
            <div
              v-for="option in groupOptions"
              :key="option.value"
              class="su-select-option"
              :class="{
                'su-select-option--selected': multiple ? 
                  (selectedValue as (string | number)[]).includes(option.value) : 
                  selectedValue === option.value,
                'su-select-option--disabled': option.disabled,
                'su-select-option--focused': filteredOptions.indexOf(option) === focusedIndex
              }"
              role="option"
              :aria-selected="multiple ? 
                (selectedValue as (string | number)[]).includes(option.value) : 
                selectedValue === option.value"
              :aria-disabled="option.disabled"
              @click="selectOption(option)"
              @mouseenter="focusedIndex = filteredOptions.indexOf(option)"
            >
              <!-- Checkbox pour multiselect -->
              <div v-if="multiple" class="su-select-option-checkbox">
                <div 
                  class="su-select-checkbox"
                  :class="{
                    'su-select-checkbox--checked': (selectedValue as (string | number)[]).includes(option.value)
                  }"
                >
                  <CheckIcon 
                    v-if="(selectedValue as (string | number)[]).includes(option.value)"
                    class="su-select-checkbox-icon" 
                    aria-hidden="true"
                  />
                </div>
              </div>
              
              <!-- Icône de l'option -->
              <component 
                v-if="option.icon" 
                :is="option.icon" 
                class="su-select-option-icon"
                aria-hidden="true"
              />
              
              <!-- Contenu de l'option -->
              <div class="su-select-option-content">
                <div class="su-select-option-label">{{ option.label }}</div>
                <div 
                  v-if="option.description" 
                  class="su-select-option-description"
                >
                  {{ option.description }}
                </div>
              </div>
              
              <!-- Indicateur de sélection pour single select -->
              <CheckIcon 
                v-if="!multiple && selectedValue === option.value"
                class="su-select-option-check" 
                aria-hidden="true"
              />
            </div>
          </template>
        </template>
        
        <!-- Aucun résultat -->
        <div v-else class="su-select-no-options">
          {{ searchQuery ? noResultsText : noOptionsText }}
        </div>
      </div>
    </div>
  </Transition>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-select-container {
  position: relative;
  
  // Tailles
  &--sm {
    .su-select-trigger {
      min-height: 2rem;
      padding: 0.375rem 0.75rem;
      font-size: $font-size-sm;
    }
  }
  
  &--md {
    .su-select-trigger {
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      font-size: $font-size-base;
    }
  }
  
  &--lg {
    .su-select-trigger {
      min-height: 3rem;
      padding: 0.75rem 1rem;
      font-size: $font-size-lg;
    }
  }
  
  // RTL Support
  &--rtl {
    direction: rtl;
  }
}

.su-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  background-color: white;
  border: 1px solid $gray-300;
  border-radius: $border-radius-md;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: $primary-500;
    box-shadow: 0 0 0 3px rgba($primary-500, 0.1);
  }
  
  // États
  &--error {
    border-color: $error-500;
    
    &:focus {
      border-color: $error-500;
      box-shadow: 0 0 0 3px rgba($error-500, 0.1);
    }
  }
  
  &--success {
    border-color: $success-500;
    
    &:focus {
      border-color: $success-500;
      box-shadow: 0 0 0 3px rgba($success-500, 0.1);
    }
  }
  
  &--warning {
    border-color: $warning-500;
    
    &:focus {
      border-color: $warning-500;
      box-shadow: 0 0 0 3px rgba($warning-500, 0.1);
    }
  }
  
  &--disabled {
    background-color: $gray-50;
    border-color: $gray-200;
    cursor: not-allowed;
    
    &:focus {
      border-color: $gray-200;
      box-shadow: none;
    }
  }
  
  &--readonly {
    background-color: $gray-50;
    cursor: default;
  }
  
  &--open {
    border-color: $primary-500;
    box-shadow: 0 0 0 3px rgba($primary-500, 0.1);
  }
  
  // Alignement
  &--align-center {
    .su-select-display-text {
      text-align: center;
    }
  }
  
  &--align-right {
    .su-select-display-text {
      text-align: right;
    }
  }
  
  &--placeholder {
    .su-select-display-text {
      color: $text-tertiary;
    }
  }
}

.su-select-content {
  flex: 1;
  min-width: 0;
}

.su-select-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &-icon {
    width: 1.25em;
    height: 1.25em;
    flex-shrink: 0;
    color: $text-secondary;
  }
  
  &-text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $text-primary;
  }
}

.su-select-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
}

.su-select-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.375rem;
  background-color: $primary-100;
  color: $primary-800;
  border-radius: $border-radius-sm;
  font-size: 0.875em;
  max-width: 150px;
  
  &--more {
    background-color: $gray-100;
    color: $gray-700;
  }
  
  &-icon {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
  
  &-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: $primary-600;
    border-radius: 50%;
    transition: all 0.2s;
    
    &:hover {
      background-color: $primary-200;
    }
    
    &-icon {
      width: 0.875em;
      height: 0.875em;
    }
  }
}

.su-select-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.su-select-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  
  .su-spinner {
    width: 1em;
    height: 1em;
    animation: spin 1s linear infinite;
  }
}

.su-select-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem;
  background: none;
  border: none;
  cursor: pointer;
  color: $text-secondary;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: $gray-100;
    color: $text-primary;
  }
  
  &-icon {
    width: 1em;
    height: 1em;
  }
}

.su-select-chevron {
  width: 1.25em;
  height: 1.25em;
  color: $text-secondary;
  transition: transform 0.2s;
  
  &--open {
    transform: rotate(180deg);
  }
}

.su-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid $gray-200;
  border-radius: $border-radius-md;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.su-select-search {
  padding: 0.75rem;
  border-bottom: 1px solid $gray-200;
  
  &-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  &-icon {
    position: absolute;
    left: 0.75rem;
    width: 1.25em;
    height: 1.25em;
    color: $text-secondary;
    pointer-events: none;
  }
  
  &-input {
    width: 100%;
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    border: 1px solid $gray-300;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    
    &:focus {
      outline: none;
      border-color: $primary-500;
      box-shadow: 0 0 0 2px rgba($primary-500, 0.1);
    }
  }
}

.su-select-options {
  max-height: inherit;
  overflow-y: auto;
}

.su-select-group-header {
  padding: 0.5rem 0.75rem;
  font-size: $font-size-sm;
  font-weight: 600;
  color: $text-secondary;
  background-color: $gray-50;
  border-bottom: 1px solid $gray-200;
}

.su-select-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(&--disabled) {
    background-color: $gray-50;
  }
  
  &--focused:not(&--disabled) {
    background-color: $primary-50;
  }
  
  &--selected:not(&--disabled) {
    background-color: $primary-100;
    color: $primary-900;
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &-checkbox {
    flex-shrink: 0;
  }
  
  &-icon {
    width: 1.25em;
    height: 1.25em;
    flex-shrink: 0;
    color: $text-secondary;
  }
  
  &-content {
    flex: 1;
    min-width: 0;
  }
  
  &-label {
    font-weight: 500;
    color: $text-primary;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &-description {
    font-size: $font-size-sm;
    color: $text-secondary;
    margin-top: 0.125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &-check {
    width: 1.25em;
    height: 1.25em;
    color: $primary-600;
    flex-shrink: 0;
  }
}

.su-select-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid $gray-300;
  border-radius: $border-radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &--checked {
    background-color: $primary-600;
    border-color: $primary-600;
    
    .su-select-checkbox-icon {
      color: white;
    }
  }
  
  &-icon {
    width: 0.875rem;
    height: 0.875rem;
  }
}

.su-select-no-options {
  padding: 1rem 0.75rem;
  text-align: center;
  color: $text-secondary;
  font-style: italic;
}

.su-select-message {
  font-size: $font-size-sm;
  line-height: $line-height-tight;
  
  &--default {
    color: $text-secondary;
  }
  
  &--error {
    color: $error-600;
  }
  
  &--success {
    color: $success-600;
  }
  
  &--warning {
    color: $warning-600;
  }
}

// Animations
.su-select-dropdown-enter-active,
.su-select-dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.su-select-dropdown-enter-from,
.su-select-dropdown-leave-to {
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

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-select-label {
    color: $text-primary-dark;
    
    &--disabled {
      color: $text-tertiary-dark;
    }
  }
  
  .su-select-trigger {
    background-color: $gray-800;
    border-color: $gray-600;
    
    &--disabled {
      background-color: $gray-900;
      border-color: $gray-700;
    }
    
    &--readonly {
      background-color: $gray-900;
    }
  }
  
  .su-select-display-text {
    color: $text-primary-dark;
  }
  
  .su-select-dropdown {
    background-color: $gray-800;
    border-color: $gray-600;
  }
  
  .su-select-search-input {
    background-color: $gray-700;
    border-color: $gray-600;
    color: $text-primary-dark;
  }
  
  .su-select-group-header {
    background-color: $gray-900;
    border-color: $gray-600;
    color: $text-secondary-dark;
  }
  
  .su-select-option {
    &:hover:not(&--disabled) {
      background-color: $gray-700;
    }
    
    &--focused:not(&--disabled) {
      background-color: rgba($primary-400, 0.2);
    }
    
    &--selected:not(&--disabled) {
      background-color: rgba($primary-400, 0.3);
      color: $primary-200;
    }
    
    &-label {
      color: $text-primary-dark;
    }
    
    &-description {
      color: $text-secondary-dark;
    }
  }
  
  .su-select-message {
    &--default {
      color: $text-secondary-dark;
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-select-trigger {
    border-width: 2px;
    
    &:focus {
      border-width: 3px;
    }
  }
  
  .su-select-dropdown {
    border-width: 2px;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-select-trigger,
  .su-select-chevron,
  .su-select-option,
  .su-select-dropdown-enter-active,
  .su-select-dropdown-leave-active {
    transition: none;
  }
  
  .su-spinner {
    animation: none;
  }
}
</style>