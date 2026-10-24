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
  'su-select__container',
  `su-select__container--${props.size}`,
  `su-select__container--${props.state}`,
  {
    'su-select__container--disabled': props.disabled,
    'su-select__container--readonly': props.readonly,
    'su-select__container--open': isOpen.value,
    'su-select__container--multiple': props.multiple
  }
])

const triggerClasses = computed(() => [
  'su-select__trigger',
  `su-select__trigger--${props.size}`,
  `su-select__trigger--${props.state}`,
  `su-select__trigger--align-${props.textAlign}`,
  {
    'su-select__trigger--disabled': props.disabled,
    'su-select__trigger--readonly': props.readonly,
    'su-select__trigger--open': isOpen.value,
    'su-select__trigger--has-value': selectedOptions.value.length > 0,
    'su-select__trigger--placeholder': selectedOptions.value.length === 0
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
  <div class="su-select">
    <!-- Container principal -->
    <div 
      ref="selectRef"
      :class="containerClasses"
    >
      <!-- Trigger -->
      <div
        :id="selectId"
        ref="inputRef"
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
          <div
            v-if="multiple && selectedOptions.length > 0"
            class="su-select-tags"
          >
            <span
              v-for="option in selectedOptions.slice(0, 3)"
              :key="option.value"
              class="su-select-tag"
            >
              <component 
                :is="option.icon" 
                v-if="option.icon" 
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
          <div
            v-else
            class="su-select-display"
          >
            <component 
              :is="selectedOptions[0].icon" 
              v-if="selectedOptions[0]?.icon" 
              class="su-select-display-icon"
              aria-hidden="true"
            />
            <span class="su-select-display-text">{{ displayText }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="su-select-actions">
          <!-- Loading -->
          <div
            v-if="loading"
            class="su-select-spinner"
          >
            <svg
              class="su-select-spinner-icon"
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
          :id="listboxId"
          ref="dropdownRef"
          class="su-select-dropdown"
          role="listbox"
          :aria-multiselectable="multiple"
        >
          <!-- Recherche -->
          <div
            v-if="searchable"
            class="su-select-search"
          >
            <div class="su-select-search-container">
              <MagnifyingGlassIcon
                class="su-select-search-icon"
                aria-hidden="true"
              />
              <input
                ref="searchInputRef"
                type="text"
                class="su-select-search-input"
                :placeholder="searchPlaceholder"
                :value="searchQuery"
                @input="handleSearch"
                @keydown="handleKeydown"
              >
            </div>
          </div>

          <!-- Options -->
          <div
            class="su-select-options"
            :style="{ maxHeight: maxHeight }"
          >
            <template v-if="filteredOptions.length > 0">
              <template
                v-for="(groupOptions, groupName) in groupedOptions"
                :key="groupName"
              >
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
                  <div
                    v-if="multiple"
                    class="su-select-option-checkbox"
                  >
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
                    :is="option.icon" 
                    v-if="option.icon" 
                    class="su-select-option-icon"
                    aria-hidden="true"
                  />
              
                  <!-- Contenu de l'option -->
                  <div class="su-select-option-content">
                    <div class="su-select-option-label">
                      {{ option.label }}
                    </div>
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
            <div
              v-else
              class="su-select-no-options"
            >
              {{ searchQuery ? noResultsText : noOptionsText }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SELECTBOX — déclencheur en surface de contrôle, liste en popover
// (bordure alpha, ombre douce, reflet interne), options compactes
// ============================================================

// Icônes : 18px sur mobile, 16px dès `sm`
@mixin su-select-icon {
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;

  @include up('sm') {
    width: 1rem;
    height: 1rem;
  }
}

@mixin su-select-state($state, $border-alpha) {
  &--#{$state} {
    border-color: with-alpha(state-#{$state}, $border-alpha);

    &:focus-visible,
    &.su-select__trigger--open {
      @include focus-ring-field(var(--su-state-#{$state}));
    }
  }
}

.su-select {
  position: relative;
  width: 100%;
  color: var(--su-text-primary);
  // 16px sur mobile (pas de zoom iOS), 14px dès `sm`
  font-size: var(--su-font-size-base);

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  &__container {
    position: relative;

    &--sm {
      --_su-select-height: var(--su-control-height-sm);
      --_su-select-height-compact: var(--su-control-height-sm-compact);
      --_su-select-pad-x: calc(0.625rem - 1px);
    }

    &--md {
      --_su-select-height: var(--su-control-height-md);
      --_su-select-height-compact: var(--su-control-height-md-compact);
      --_su-select-pad-x: calc(0.75rem - 1px);
    }

    &--lg {
      --_su-select-height: var(--su-control-height-lg);
      --_su-select-height-compact: var(--su-control-height-lg-compact);
      --_su-select-pad-x: calc(0.875rem - 1px);
    }
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    min-height: var(--_su-select-height);
    padding: 0.125rem var(--_su-select-pad-x);
    cursor: pointer;
    user-select: none;
    outline: none;
    @include control-surface;

    @include up('sm') {
      min-height: var(--_su-select-height-compact);
    }

    // Liste ouverte : même anneau qu'au focus
    &--open {
      @include focus-ring-field;

      &::before {
        box-shadow: none;
      }
    }

    // États (aria-invalid est posé sur le déclencheur lui-même)
    @include su-select-state(error, 36%);
    @include su-select-state(success, 48%);
    @include su-select-state(warning, 48%);

    &--disabled {
      @include disabled-state;

      pointer-events: none;
      box-shadow: none;
    }

    &--readonly {
      cursor: default;
      background-image: linear-gradient(var(--su-bg-muted), var(--su-bg-muted));
    }

    // Alignement
    &--align-center .su-select-display-text {
      text-align: center;
    }

    &--align-right .su-select-display-text {
      text-align: right;
    }

    &--placeholder .su-select-display-text {
      color: var(--su-text-tertiary);
    }
  }
}

// ### Contenu du déclencheur

.su-select-content {
  flex: 1;
  min-width: 0;
}

.su-select-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
  color: var(--su-text-tertiary);
}

.su-select-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;

  &-icon {
    @include su-select-icon;

    opacity: 0.8;
  }

  &-text {
    flex: 1;
    @include truncate;
  }
}

// Sélection multiple : étiquettes compactes
.su-select-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding-block: 0.125rem;
}

.su-select-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  max-width: 12rem;
  height: 1.375rem;
  padding-inline: 0.375rem 0.125rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-sm);
  background-color: var(--su-bg-muted);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-medium);

  @include up('sm') {
    height: 1.25rem;
  }

  &--more {
    padding-inline: 0.375rem;
    color: var(--su-text-secondary);
  }

  &-icon {
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
  }

  &-label {
    @include truncate;
  }

  &-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    padding: 0;
    border: 0;
    border-radius: var(--su-radius-xs);
    background: transparent;
    color: var(--su-text-tertiary);
    cursor: pointer;
    @include transition(background-color, color);

    &:hover {
      background-color: var(--su-bg-accent);
      color: var(--su-text-primary);
    }

    &:focus-visible {
      @include focus-ring($offset: 0);
    }

    &-icon {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
}

.su-select-spinner {
  display: flex;

  &-icon {
    @include su-select-icon;

    animation: su-select-spin 0.8s linear infinite;
  }
}

.su-select-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-sm);
  background: transparent;
  color: inherit;
  cursor: pointer;
  @include transition(background-color, color);

  &:hover {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }

  &-icon {
    width: 1rem;
    height: 1rem;
  }
}

.su-select-chevron {
  @include su-select-icon;

  opacity: 0.8;
  @include transition(transform);

  &--open {
    transform: rotate(180deg);
  }
}

// ### Liste déroulante (popover)

.su-select-dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  inset-inline: 0;
  @include popover-surface;
}

.su-select-search {
  margin: -0.25rem -0.25rem 0.25rem;
  padding: 0.25rem;
  border-bottom: 1px solid var(--su-border-alpha);

  &-container {
    position: relative;
  }

  &-icon {
    position: absolute;
    inset-inline-start: 0.5rem;
    top: 50%;
    width: 1rem;
    height: 1rem;
    translate: 0 -50%;
    color: var(--su-text-tertiary);
    pointer-events: none;
  }

  &-input {
    width: 100%;
    height: var(--su-control-height-sm);
    padding-inline: 2rem 0.5rem;
    border: 0;
    border-radius: var(--su-radius-sm);
    outline: none;
    background: transparent;
    font: inherit;
    color: var(--su-text-primary);

    @include up('sm') {
      height: var(--su-control-height-sm-compact);
    }

    &::placeholder {
      color: var(--su-text-tertiary);
    }

    &:focus-visible {
      background-color: var(--su-bg-accent);
    }
  }
}

.su-select-options {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--su-border-default) transparent;
}

.su-select-group-header {
  padding: 0.375rem 0.5rem 0.25rem;
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-medium);
  color: var(--su-text-tertiary);
}

.su-select-option {
  @include menu-item;

  &--selected {
    font-weight: var(--su-font-weight-medium);
  }

  &-checkbox {
    display: flex;
  }

  &-icon {
    @include su-select-icon;

    opacity: 0.8;
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
    font-weight: var(--su-font-weight-normal);
    color: var(--su-text-tertiary);
  }

  &-check {
    @include su-select-icon;

    margin-inline-start: auto;
  }
}

// Case à cocher des sélections multiples (même style que les cases à cocher)
.su-select-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  border: 1px solid var(--su-border-input);
  border-radius: var(--su-radius-sm);
  background-color: var(--su-bg-control);
  box-shadow: var(--su-shadow-control);
  @include transition(background-color, border-color);

  @include up('sm') {
    width: 1rem;
    height: 1rem;
  }

  &--checked {
    border-color: var(--su-primary-default);
    background-color: var(--su-primary-default);
    color: var(--su-primary-text);
    box-shadow: none;
  }

  &-icon {
    width: 0.75rem;
    height: 0.75rem;
    stroke-width: 3;
  }
}

.su-select-no-options {
  padding: 0.75rem 0.5rem;
  text-align: center;
  font-size: var(--su-font-size-sm);
  color: var(--su-text-tertiary);
}

// ### Animation d'ouverture (opacité + léger zoom)

@include popover-transition('su-select-dropdown');

@keyframes su-select-spin {
  to {
    rotate: 360deg;
  }
}

// Contraste élevé : bordures pleines
.su-select-tag {
  @include high-contrast {
    border-width: 2px;
  }
}

.su-select-spinner-icon {
  @include motion-reduce {
    animation-duration: 2.4s;
  }
}
</style>
