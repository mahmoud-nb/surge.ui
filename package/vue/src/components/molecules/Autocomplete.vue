<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useAttrs, useId, watch, type HTMLAttributes, type StyleValue } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Spinner from '../atoms/Spinner.vue'
import type { AutocompleteOption, AutocompleteProps } from '@/types'
import { useFormField } from '@/composables/useFormField'
import { useLocale } from '@/composables/useLocale'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { useDismiss } from '@/composables/useDismiss'
import { useFloatingPosition } from '@/composables/useFloatingPosition'
import { useListNavigation } from '@/composables/useListNavigation'

// ============================================================
// AUTOCOMPLETE — champ texte à saisie libre avec suggestions (motif APG
// « combobox » avec aria-autocomplete="list"). Le texte reste celui
// saisi ; choisir une suggestion le remplace. Pour choisir parmi une
// liste fermée, voir SuSelectBox.
// - Flèches : ouvrir la liste et la parcourir (le focus reste dans le
//   champ, aria-activedescendant) ; Entrée : choisir ; Échap : fermer,
//   puis effacer (`clearable`) ; Tab : fermer en gardant le texte.
// - Le nombre de suggestions est annoncé quand la liste change.
// ============================================================

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AutocompleteProps>(), {
  options: () => [],
  filter: true,
  minChars: 0,
  openOnFocus: false,
  loading: false,
  clearable: false,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  maxHeight: '16rem'
})

const query = defineModel<string>({ default: '' })

const emit = defineEmits<{
  select: [option: AutocompleteOption]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

defineSlots<{
  /** Rendu d'une suggestion */
  option?: (props: { option: AutocompleteOption; query: string; active: boolean }) => unknown
}>()

const {
  field,
  id: controlId,
  state: fieldState,
  size: fieldSize,
  disabled: fieldDisabled,
  required: fieldRequired,
  describedBy,
  labelledBy
} = useFormField(props, { idPrefix: 'autocomplete' })

const { t } = useLocale()
const { announce } = useAnnouncer()
const noResultsText = computed(() => props.noResultsText ?? t('autocomplete.noResults'))
const loadingText = computed(() => props.loadingText ?? t('autocomplete.loading'))
const clearText = computed(() => props.clearLabel ?? t('autocomplete.clear'))

// class/style décorent le conteneur, le reste va sur l'input
const attrs = useAttrs()
const containerAttrs = computed(() => ({
  class: attrs.class as HTMLAttributes['class'],
  style: attrs.style as StyleValue
}))
const inputAttrs = computed(() => {
  const { class: _class, style: _style, id: _id, ...rest } = attrs
  return rest
})

const listboxId = `autocomplete-list-${useId()}`
const optionId = (index: number) => `${listboxId}-${index}`

const controlRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const popupRef = ref<HTMLElement>()

// ### Suggestions

const options = computed<AutocompleteOption[]>(() =>
  props.options.map((option) => (typeof option === 'string' ? { label: option, value: option } : option))
)

// Comparaison sans accents ni casse (« ete » trouve « Été »)
const fold = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase()

const filtered = computed(() => {
  const text = query.value.trim()
  if (props.filter === false || !text) return options.value
  if (typeof props.filter === 'function') {
    const predicate = props.filter
    return options.value.filter((option) => predicate(option, text))
  }
  const folded = fold(text)
  return options.value.filter((option) => fold(option.label).includes(folded))
})

// ### Ouverture

const isOpen = ref(false)
const hasQuery = computed(() => query.value.trim().length > 0)
const showList = computed(() =>
  isOpen.value &&
  query.value.trim().length >= props.minChars &&
  (filtered.value.length > 0 || props.loading || hasQuery.value)
)

const canEdit = computed(() => !fieldDisabled.value && !props.readonly)

const nav = useListNavigation({
  items: filtered,
  isDisabled: (option) => !!option.disabled,
  mode: 'virtual',
  loop: true
})
const activeIndex = nav.activeIndex

const open = () => {
  if (canEdit.value) isOpen.value = true
}

const close = () => {
  isOpen.value = false
  nav.reset()
}

// Nouvelle liste : aucune suggestion active (pas de sélection automatique)
watch(filtered, () => nav.reset())

// La suggestion active reste visible dans la liste
watch(activeIndex, async (index) => {
  if (index < 0) return
  await nextTick()
  document.getElementById(optionId(index))?.scrollIntoView?.({ block: 'nearest' })
})

const select = (option: AutocompleteOption) => {
  if (option.disabled) return
  query.value = option.label
  emit('select', option)
  close()
  inputRef.value?.focus()
}

const clear = () => {
  query.value = ''
  nav.reset()
  inputRef.value?.focus()
}

useFloatingPosition(controlRef, popupRef, {
  placement: 'bottom-start',
  open: showList,
  offset: 4,
  matchReferenceWidth: true
})

// Appui extérieur ou focus sorti : fermeture (Échap est géré dans le champ)
useDismiss([controlRef, popupRef], {
  enabled: showList,
  escape: false,
  focusOutside: true,
  onDismiss: () => close()
})

// ### Annonce du nombre de suggestions (après une pause de saisie)

let announceTimer: ReturnType<typeof setTimeout> | undefined
watch([filtered, () => props.loading, showList], () => {
  clearTimeout(announceTimer)
  if (!showList.value || props.loading) return
  announceTimer = setTimeout(() => {
    const count = filtered.value.length
    announce(count ? t('autocomplete.results', { count }) : noResultsText.value)
  }, 600)
})
onBeforeUnmount(() => clearTimeout(announceTimer))

// ### Événements du champ

const handleInput = (event: Event) => {
  query.value = (event.target as HTMLInputElement).value
  open()
}

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!showList.value) {
        open()
        if (!event.altKey) nextTick(() => nav.first())
      } else {
        nav.next()
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!showList.value) {
        open()
        nextTick(() => nav.last())
      } else {
        nav.previous()
      }
      break
    case 'Enter': {
      const option = filtered.value[activeIndex.value]
      if (showList.value && option) {
        event.preventDefault()
        select(option)
      } else if (showList.value) {
        close()
      }
      break
    }
    case 'Escape':
      if (showList.value) {
        // Empêche aussi la fermeture d'un <dialog> parent
        event.preventDefault()
        close()
      } else if (props.clearable && query.value && canEdit.value) {
        event.preventDefault()
        clear()
      }
      break
    case 'Tab':
      close()
      break
  }
}

const handleFocus = (event: FocusEvent) => {
  if (props.openOnFocus) open()
  emit('focus', event)
}

// ### Classes et ARIA

const classes = computed(() => [
  'su-autocomplete',
  `su-autocomplete--${fieldSize.value}`,
  `su-autocomplete--${fieldState.value}`,
  { 'su-autocomplete--open': showList.value }
])

const ariaAttributes = computed(() => {
  const result: Record<string, string | undefined> = {
    role: 'combobox',
    'aria-autocomplete': 'list',
    'aria-expanded': showList.value ? 'true' : 'false',
    'aria-controls': listboxId,
    'aria-activedescendant': showList.value && activeIndex.value >= 0 ? optionId(activeIndex.value) : undefined
  }
  if (props.ariaLabel) result['aria-label'] = props.ariaLabel
  if (labelledBy.value) result['aria-labelledby'] = labelledBy.value
  if (describedBy.value) result['aria-describedby'] = describedBy.value
  if (fieldState.value === 'error' || props.ariaInvalid) result['aria-invalid'] = 'true'
  return result
})

// Nom de la liste : le label du champ, sinon le nom du champ lui-même
const listboxLabel = computed(() => (field?.labelId.value ? undefined : props.ariaLabel))

defineExpose({
  inputRef,
  focus: () => inputRef.value?.focus(),
  open,
  close
})
</script>

<template>
  <div
    :class="[classes, containerAttrs.class]"
    :style="containerAttrs.style"
  >
    <div
      ref="controlRef"
      class="su-autocomplete__control"
    >
      <input
        :id="controlId"
        ref="inputRef"
        class="su-autocomplete__input"
        type="text"
        autocomplete="off"
        spellcheck="false"
        :name="name"
        :placeholder="placeholder"
        :value="query"
        :disabled="fieldDisabled"
        :readonly="readonly"
        :required="fieldRequired"
        v-bind="{ ...inputAttrs, ...ariaAttributes }"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="emit('blur', $event)"
      >

      <span
        v-if="loading"
        class="su-autocomplete__spinner"
        aria-hidden="true"
      >
        <Spinner
          :size="14"
          color="currentColor"
        />
      </span>

      <button
        v-if="clearable && query && canEdit"
        type="button"
        tabindex="-1"
        class="su-autocomplete__clear"
        :aria-label="clearText"
        @click="clear"
      >
        <XMarkIcon
          class="su-autocomplete__clear-icon"
          aria-hidden="true"
        />
      </button>
    </div>

    <Transition name="su-autocomplete-popup">
      <div
        v-show="showList"
        ref="popupRef"
        class="su-autocomplete__popup"
        :style="{ maxHeight }"
        @pointerdown.prevent
      >
        <ul
          :id="listboxId"
          role="listbox"
          class="su-autocomplete__list"
          :aria-labelledby="field?.labelId.value"
          :aria-label="listboxLabel"
        >
          <li
            v-for="(option, index) in filtered"
            :id="optionId(index)"
            :key="`${option.value ?? option.label}-${index}`"
            role="option"
            :aria-selected="index === activeIndex ? 'true' : 'false'"
            :aria-disabled="option.disabled ? 'true' : undefined"
            :class="['su-autocomplete__option', { 'su-autocomplete__option--active': index === activeIndex }]"
            @click="select(option)"
            @pointermove="!option.disabled && nav.setActiveIndex(index)"
          >
            <component
              :is="option.icon"
              v-if="option.icon"
              class="su-autocomplete__option-icon"
              aria-hidden="true"
            />
            <span class="su-autocomplete__option-text">
              <span class="su-autocomplete__option-label">
                <slot
                  name="option"
                  :option="option"
                  :query="query"
                  :active="index === activeIndex"
                >{{ option.label }}</slot>
              </span>
              <span
                v-if="option.description"
                class="su-autocomplete__option-description"
              >{{ option.description }}</span>
            </span>
          </li>
        </ul>

        <div
          v-if="loading"
          class="su-autocomplete__status"
        >
          {{ loadingText }}
        </div>
        <div
          v-else-if="!filtered.length"
          class="su-autocomplete__status"
        >
          {{ noResultsText }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// AUTOCOMPLETE — surface de contrôle (comme SuInput) et liste
// flottante partagée avec SuSelectBox (popover-surface, menu-item)
// ============================================================

.su-autocomplete {
  --_su-autocomplete-height: var(--su-control-height-md);

  position: relative;
  width: 100%;
  font-size: var(--su-font-size-base);

  @include up('sm') {
    --_su-autocomplete-height: var(--su-control-height-md-compact);

    font-size: var(--su-font-size-sm);
  }

  &--sm {
    --_su-autocomplete-height: var(--su-control-height-sm);

    @include up('sm') {
      --_su-autocomplete-height: var(--su-control-height-sm-compact);
    }
  }

  &--lg {
    --_su-autocomplete-height: var(--su-control-height-lg);

    @include up('sm') {
      --_su-autocomplete-height: var(--su-control-height-lg-compact);
    }
  }

  @each $state in ('error', 'success', 'warning') {
    &--#{$state} .su-autocomplete__control {
      border-color: with-alpha(state-#{$state}, 48%);

      &:focus-within {
        @include focus-ring-field(var(--su-state-#{$state}));
      }
    }
  }

  // Préfixés : la page hôte stylise souvent ul et li
  .su-autocomplete__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .su-autocomplete__option {
    @include menu-item('&--active');

    margin: 0;
  }
}

.su-autocomplete__control {
  display: flex;
  align-items: center;
  min-height: var(--_su-autocomplete-height);
  color: var(--su-text-primary);

  @include control-surface;
}

.su-autocomplete__input {
  flex: 1;
  align-self: stretch;
  min-width: 0;
  margin: 0;
  padding: 0 0.75rem;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: 1.5;

  &::placeholder {
    color: var(--su-text-tertiary);
  }
}

.su-autocomplete__spinner {
  display: inline-flex;
  margin-inline-end: 0.625rem;
  color: var(--su-text-tertiary);
}

.su-autocomplete__clear {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  margin-inline-end: 0.375rem;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: var(--su-text-tertiary);
  cursor: pointer;

  @include transition(background-color, color);
  @include touch-target-overlay;

  &:hover {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }
}

.su-autocomplete__clear-icon {
  width: 1rem;
  height: 1rem;
}

.su-autocomplete__popup {
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  overscroll-behavior: contain;

  @include popover-surface;
}

.su-autocomplete__option-icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: var(--su-text-tertiary);
}

.su-autocomplete__option-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.su-autocomplete__option-label {
  @include truncate;
}

.su-autocomplete__option-description {
  font-size: var(--su-font-size-xs);
  color: var(--su-text-tertiary);
}

.su-autocomplete__status {
  padding: 0.5rem;
  font-size: var(--su-font-size-sm);
  color: var(--su-text-tertiary);
  text-align: center;
}

@include popover-transition('su-autocomplete-popup');
</style>
