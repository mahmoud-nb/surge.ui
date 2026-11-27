<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useFloatingPosition } from '@/composables/useFloatingPosition'
import type { SelectOption, SelectBoxProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { useFormField } from '@/composables/useFormField'
import { useListNavigation } from '@/composables/useListNavigation'
import { useDismiss } from '@/composables/useDismiss'

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
  maxHeight: '200px',
  textAlign: 'left',
  loading: false,
  closeOnSelect: true,
  maxSelectedItems: undefined
})

// Contexte du SuFormField parent : id, label, message et états du champ
const { id: controlId, state: fieldState, size: fieldSize, disabled: fieldDisabled, required: fieldRequired, describedBy: fieldDescribedBy, labelledBy: fieldLabelledBy } = useFormField(props, { labelable: false, idPrefix: 'selectbox', focus: () => inputRef.value?.focus() })

// Textes par défaut : prop explicite, sinon locale courante
const { t } = useLocale()
const { announce } = useAnnouncer()
const placeholderText = computed(() => props.placeholder ?? t('selectBox.placeholder'))
const searchPlaceholderText = computed(() => props.searchPlaceholder ?? t('selectBox.searchPlaceholder'))
const emptyText = computed(() => searchQuery.value ? (props.noResultsText ?? t('selectBox.noResults')) : (props.noOptionsText ?? t('selectBox.noOptions')))

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


// Refs
const selectRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLDivElement>()
const dropdownRef = ref<HTMLDivElement>()
const searchInputRef = ref<HTMLInputElement>()

// État local
const isOpen = ref(false)
const searchQuery = ref('')

// Positionnement de la liste (fixed, retournée s'il manque de place)
useFloatingPosition(inputRef, dropdownRef, {
  placement: 'bottom-start',
  open: isOpen,
  offset: 4,
  matchReferenceWidth: true
})

// IDs pour l'accessibilité
const selectId = computed(() => controlId.value as string)
const listboxId = computed(() => `${selectId.value}-listbox`)
const optionId = (index: number) => `${listboxId.value}-option-${index}`
const activeDescendant = computed(() =>
  isOpen.value && focusedIndex.value >= 0 ? optionId(focusedIndex.value) : undefined
)

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

// Sections affichées (une par groupe) ; l'index de chaque option suit
// l'ordre d'affichage, qui est aussi l'ordre de navigation au clavier
const optionSections = computed(() => {
  const sections: { label: string; items: SelectOption[] }[] = []

  for (const option of filteredOptions.value) {
    const label = option.group || ''
    let section = sections.find(s => s.label === label)
    if (!section) {
      section = { label, items: [] }
      sections.push(section)
    }
    section.items.push(option)
  }

  let index = 0
  return sections.map((section, sectionIndex) => ({
    label: section.label,
    labelId: `${listboxId.value}-group-${sectionIndex}`,
    options: section.items.map(option => ({ option, index: index++ }))
  }))
})

const navigableOptions = computed((): SelectOption[] =>
  optionSections.value.flatMap(section => section.options.map(item => item.option))
)

// Option mise en avant (clavier ou survol) : le focus DOM reste sur le
// déclencheur (ou le champ de recherche), l'option est annoncée via
// aria-activedescendant. Options désactivées sautées, saisie rapide.
const nav = useListNavigation({
  items: navigableOptions,
  isDisabled: (option) => !!option.disabled,
  typeahead: { getLabel: (option) => option.label }
})
const focusedIndex = nav.activeIndex

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

const isSelected = (option: SelectOption) => props.multiple
  ? (selectedValue.value as (string | number)[]).includes(option.value)
  : selectedValue.value === option.value

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
    return placeholderText.value
  }

  if (props.multiple) {
    if (selectedOptions.value.length === 1) {
      return selectedOptions.value[0].label
    }
    return t('selectBox.selectedCount', { count: selectedOptions.value.length })
  }

  return selectedOptions.value[0]?.label || placeholderText.value
})

// Classes CSS
const containerClasses = computed(() => [
  'su-select__container',
  `su-select__container--${fieldSize.value}`,
  `su-select__container--${fieldState.value}`,
  {
    'su-select__container--disabled': fieldDisabled.value,
    'su-select__container--readonly': props.readonly,
    'su-select__container--open': isOpen.value,
    'su-select__container--multiple': props.multiple
  }
])

const triggerClasses = computed(() => [
  'su-select__trigger',
  `su-select__trigger--${fieldSize.value}`,
  `su-select__trigger--${fieldState.value}`,
  `su-select__trigger--align-${props.textAlign}`,
  {
    'su-select__trigger--disabled': fieldDisabled.value,
    'su-select__trigger--readonly': props.readonly,
    'su-select__trigger--open': isOpen.value,
    'su-select__trigger--has-value': selectedOptions.value.length > 0,
    'su-select__trigger--placeholder': selectedOptions.value.length === 0
  }
])

// Attributs ARIA du déclencheur (motif « combobox » + « listbox »)
const ariaAttributes = computed<Record<string, any>>(() => ({
  role: 'combobox',
  'aria-haspopup': 'listbox',
  'aria-expanded': isOpen.value ? 'true' : 'false',
  'aria-controls': isOpen.value ? listboxId.value : undefined,
  // Avec recherche, c'est le champ de recherche qui porte l'option active
  'aria-activedescendant': props.searchable ? undefined : activeDescendant.value,
  'aria-label': props.ariaLabel,
  'aria-labelledby': fieldLabelledBy.value,
  'aria-describedby': fieldDescribedBy.value,
  'aria-invalid': fieldState.value === 'error' || props.ariaInvalid ? 'true' : undefined,
  'aria-required': fieldRequired.value || props.ariaRequired ? 'true' : undefined,
  'aria-disabled': fieldDisabled.value ? 'true' : undefined,
  'aria-readonly': props.readonly ? 'true' : undefined
}))

// ### Navigation dans la liste (les options désactivées sont sautées)

// Aucune option active si la liste filtrée n'en contient pas
const focusFirst = () => {
  if (nav.first() === -1) nav.setActiveIndex(-1)
}

const focusSelectedOrFirst = () => {
  const index = navigableOptions.value.findIndex(option => !option.disabled && isSelected(option))
  if (index !== -1) nav.setActiveIndex(index)
  else focusFirst()
}

const hoverOption = (index: number) => {
  if (!navigableOptions.value[index]?.disabled) nav.setActiveIndex(index)
}

// ### Ouverture et fermeture

const openDropdown = async () => {
  if (fieldDisabled.value || props.readonly || isOpen.value) return

  isOpen.value = true
  searchQuery.value = ''
  focusSelectedOrFirst()

  emit('open')

  await nextTick()

  if (props.searchable) {
    searchInputRef.value?.focus()
  }
}

/**
 * @param restoreFocus - rend le focus au déclencheur (faux quand le focus
 * quitte déjà le composant : clic extérieur, Tab)
 */
const closeDropdown = (restoreFocus = true) => {
  if (!isOpen.value) return

  // Le focus revient au déclencheur avant que le champ de recherche
  // ne soit démonté, pour ne pas le perdre
  if (restoreFocus) inputRef.value?.focus()

  isOpen.value = false
  nav.reset()
  searchQuery.value = ''

  emit('close')
}

const toggleDropdown = () => {
  if (fieldDisabled.value || props.readonly) return

  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

// ### Sélection

const selectOption = (option: SelectOption) => {
  if (option.disabled) return

  if (props.multiple) {
    const currentValues = (selectedValue.value as (string | number)[]) || []
    const wasSelected = currentValues.includes(option.value)

    if (!wasSelected && props.maxSelectedItems && currentValues.length >= props.maxSelectedItems) {
      announce(t('selectBox.maxReached', { count: props.maxSelectedItems }))
      return
    }

    selectedValue.value = wasSelected
      ? currentValues.filter(v => v !== option.value)
      : [...currentValues, option.value]

    // La liste reste ouverte : on annonce le changement
    announce(t(wasSelected ? 'selectBox.deselected' : 'selectBox.selected', { label: option.label }))
    return
  }

  selectedValue.value = option.value

  if (props.closeOnSelect) {
    closeDropdown()
  }
}

const selectFocused = () => {
  const option = navigableOptions.value[focusedIndex.value]
  if (option) selectOption(option)
}

const clearSelection = (event: Event) => {
  event.stopPropagation()

  selectedValue.value = props.multiple ? [] : undefined

  announce(t('selectBox.cleared'))
  inputRef.value?.focus()
}

const removeSelectedOption = (option: SelectOption, event?: Event) => {
  event?.stopPropagation()
  if (!props.multiple || fieldDisabled.value || props.readonly) return

  const currentValues = (selectedValue.value as (string | number)[]) || []
  selectedValue.value = currentValues.filter(v => v !== option.value)

  announce(t('selectBox.removed', { label: option.label }))
}

// Retour arrière : retire la dernière étiquette (sélection multiple)
const removeLastSelected = () => {
  const last = selectedOptions.value[selectedOptions.value.length - 1]
  if (!props.multiple || !last || fieldDisabled.value || props.readonly) return false
  removeSelectedOption(last)
  return true
}

// ### Recherche et saisie rapide

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  emit('search', searchQuery.value)
}

// La première option correspondante est mise en avant pendant la recherche
watch(searchQuery, (query) => {
  if (!isOpen.value) return
  if (query) focusFirst()
  else focusSelectedOrFirst()
})

// ### Clavier

/** Touches communes au déclencheur et au champ de recherche */
const handleNavigationKey = (event: KeyboardEvent, editable: boolean) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) openDropdown()
      else if (!event.altKey) nav.next()
      return true

    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) openDropdown()
      else if (event.altKey) selectFocused()
      else nav.previous()
      return true

    case 'Home':
    case 'End':
      // Dans le champ de recherche, Début/Fin déplacent le curseur
      if (!isOpen.value || editable) return false
      event.preventDefault()
      if (event.key === 'Home') nav.first()
      else nav.last()
      return true

    case 'Enter':
      event.preventDefault()
      if (!isOpen.value) openDropdown()
      else selectFocused()
      return true

    case 'Escape':
      if (!isOpen.value) return false
      // Ne ferme pas aussi une boîte de dialogue parente
      event.preventDefault()
      event.stopPropagation()
      closeDropdown()
      return true

    case 'Tab':
      if (isOpen.value) closeDropdown(false)
      return false
  }
  return false
}

const handleTriggerKeydown = (event: KeyboardEvent) => {
  if (fieldDisabled.value || props.readonly) return
  if (handleNavigationKey(event, false)) return

  if (event.key === 'Backspace' || event.key === 'Delete') {
    if (removeLastSelected()) event.preventDefault()
    return
  }

  const printable = event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
  if (!printable) return

  // Espace : ouvre ou sélectionne, sauf au milieu d'une saisie rapide
  if (event.key === ' ' && !nav.isTyping()) {
    event.preventDefault()
    if (!isOpen.value) openDropdown()
    else selectFocused()
    return
  }

  event.preventDefault()

  // Avec recherche : la lettre ouvre la liste et amorce la recherche
  if (props.searchable) {
    openDropdown()
    searchQuery.value = event.key
    emit('search', searchQuery.value)
    return
  }

  // Liste fermée sans valeur : la recherche part du début, première option incluse
  if (!isOpen.value) {
    openDropdown()
    if (selectedOptions.value.length === 0) nav.setActiveIndex(-1)
  }
  nav.searchTypeahead(event.key)
}

const handleSearchKeydown = (event: KeyboardEvent) => {
  if (handleNavigationKey(event, true)) return

  if (event.key === 'Backspace' && !searchQuery.value) {
    if (removeLastSelected()) event.preventDefault()
  }
}

// Un clic dans la liste ne doit pas retirer le focus du déclencheur
// (ni du champ de recherche), sinon la liste se fermerait avant le clic
const handleDropdownMousedown = (event: MouseEvent) => {
  if (event.target !== searchInputRef.value) event.preventDefault()
}

// ### Focus

const handleFocusIn = (event: FocusEvent) => {
  // N'émet `focus` que si le focus vient de l'extérieur du composant
  if (!selectRef.value?.contains(event.relatedTarget as Node | null)) {
    emit('focus', event)
  }
}

const handleFocusOut = (event: FocusEvent) => {
  if (selectRef.value?.contains(event.relatedTarget as Node | null)) return
  closeDropdown(false)
  emit('blur', event)
}

// Fermeture à l'appui extérieur (avant le clic lui-même). Échap est géré
// au clavier ci-dessus : il ne ferme que la liste, pas un parent
useDismiss(selectRef, {
  enabled: isOpen,
  escape: false,
  onDismiss: () => closeDropdown(false)
})

// L'option mise en avant reste visible dans la liste
watch(focusedIndex, async (index) => {
  if (index < 0 || !isOpen.value) return
  await nextTick()
  const element = dropdownRef.value?.querySelector<HTMLElement>(`[id="${optionId(index)}"]`)
  element?.scrollIntoView?.({ block: 'nearest' })
})

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
</script>

<template>
  <div class="su-select">
    <!-- Container principal -->
    <div
      ref="selectRef"
      :class="containerClasses"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <!-- Trigger -->
      <div
        :id="selectId"
        ref="inputRef"
        :class="triggerClasses"
        :tabindex="fieldDisabled ? -1 : 0"
        v-bind="ariaAttributes"
        @click="toggleDropdown"
        @keydown="handleTriggerKeydown"
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
              <!-- Hors tabulation : au clavier, Retour arrière retire la
                   dernière étiquette et la liste permet de désélectionner -->
              <button
                v-if="!fieldDisabled && !readonly"
                type="button"
                tabindex="-1"
                class="su-select-tag-remove"
                :aria-label="t('selectBox.removeTag', { label: option.label })"
                @click="removeSelectedOption(option, $event)"
              >
                <XMarkIcon
                  class="su-select-tag-remove-icon"
                  aria-hidden="true"
                />
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
            v-else-if="clearable && selectedOptions.length > 0 && !fieldDisabled && !readonly"
            type="button"
            class="su-select-clear"
            :aria-label="t('selectBox.clear')"
            @click="clearSelection"
          >
            <XMarkIcon
              class="su-select-clear-icon"
              aria-hidden="true"
            />
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
          class="su-select-dropdown"
          @mousedown="handleDropdownMousedown"
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
                role="combobox"
                aria-autocomplete="list"
                aria-expanded="true"
                :aria-controls="listboxId"
                :aria-activedescendant="activeDescendant"
                :aria-label="searchPlaceholderText"
                autocomplete="off"
                :placeholder="searchPlaceholderText"
                :value="searchQuery"
                @input="handleSearch"
                @keydown="handleSearchKeydown"
              >
            </div>
          </div>

          <!-- Options -->
          <div
            :id="listboxId"
            class="su-select-options"
            role="listbox"
            :aria-multiselectable="multiple ? 'true' : undefined"
            :aria-label="ariaLabel"
            :aria-labelledby="fieldLabelledBy"
            :style="{ maxHeight: maxHeight }"
          >
            <div
              v-for="section in optionSections"
              :key="section.labelId"
              :role="section.label ? 'group' : undefined"
              :aria-labelledby="section.label ? section.labelId : undefined"
              class="su-select-group"
            >
              <!-- Groupe header -->
              <div
                v-if="section.label"
                :id="section.labelId"
                class="su-select-group-header"
                role="presentation"
              >
                {{ section.label }}
              </div>

              <!-- Options du groupe -->
              <div
                v-for="{ option, index } in section.options"
                :id="optionId(index)"
                :key="option.value"
                class="su-select-option"
                :class="{
                  'su-select-option--selected': isSelected(option),
                  'su-select-option--disabled': option.disabled,
                  'su-select-option--focused': index === focusedIndex
                }"
                role="option"
                :aria-selected="isSelected(option) ? 'true' : 'false'"
                :aria-disabled="option.disabled ? 'true' : undefined"
                @click="selectOption(option)"
                @mousemove="hoverOption(index)"
              >
                <!-- Checkbox pour multiselect -->
                <div
                  v-if="multiple"
                  class="su-select-option-checkbox"
                  aria-hidden="true"
                >
                  <div
                    class="su-select-checkbox"
                    :class="{ 'su-select-checkbox--checked': isSelected(option) }"
                  >
                    <CheckIcon
                      v-if="isSelected(option)"
                      class="su-select-checkbox-icon"
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
                  v-if="!multiple && isSelected(option)"
                  class="su-select-option-check"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <!-- Aucun résultat (hors de la liste : ce n'est pas une option) -->
          <div
            v-if="filteredOptions.length === 0"
            class="su-select-no-options"
            role="status"
          >
            {{ emptyText }}
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

  // Contraste élevé : bordures pleines
  @include high-contrast {
    border-width: 2px;
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

    @include motion-reduce {
      animation-duration: 2.4s;
    }
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
  // Position fixe : left/top calculés par useFloatingPosition (retournée
  // au-dessus s'il manque de place, jamais coupée par un overflow)
  position: fixed;
  top: 0;
  left: 0;
  max-width: calc(100vw - 1rem);

  @include popover-surface;

  &[data-placement^='top'] {
    transform-origin: bottom center;
  }
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

</style>
