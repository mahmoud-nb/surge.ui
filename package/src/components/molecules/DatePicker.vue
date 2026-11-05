<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch, type HTMLAttributes, type StyleValue } from 'vue'
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import Calendar from './Calendar.vue'
import type { DatePickerProps } from '@/types'
import { useFormField } from '@/composables/useFormField'
import { useLocale } from '@/composables/useLocale'
import { useDismiss } from '@/composables/useDismiss'
import { useFocusTrap } from '@/composables/useFocusTrap'
import { useFloatingPosition } from '@/composables/useFloatingPosition'
import { getDateFormatPattern, isOutOfRange, isSameDay, isValidDate, parseDateInput } from '@/utils/date'

// ============================================================
// DATE PICKER — champ date saisissable + calendrier (motif APG
// « date picker dialog »).
// - Saisie au format de la langue (« 05/11/2026 »), validée à la
//   sortie du champ ou avec Entrée ; une date illisible, inexistante
//   ou hors bornes rend la valeur précédente.
// - Le bouton (nommé avec la date choisie) ouvre le calendrier dans
//   une boîte de dialogue : focus sur le jour actif, Tab piégé, Échap
//   ou appui extérieur ferme ; choisir un jour ferme et rend le focus
//   au bouton. Alt + ↓ ouvre depuis le champ.
// ============================================================

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DatePickerProps>(), {
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false
})

const modelValue = defineModel<Date | null>({ default: null })

const emit = defineEmits<{
  change: [value: Date | null]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const {
  id: controlId,
  state: fieldState,
  size: fieldSize,
  disabled: fieldDisabled,
  required: fieldRequired,
  describedBy,
  labelledBy
} = useFormField(props, { idPrefix: 'date-picker' })

const { t, locale: componentLocale } = useLocale()
const code = computed(() => props.locale ?? componentLocale.value.code)

const attrs = useAttrs()
const containerAttrs = computed(() => ({
  class: attrs.class as HTMLAttributes['class'],
  style: attrs.style as StyleValue
}))
const inputAttrs = computed(() => {
  const { class: _class, style: _style, id: _id, ...rest } = attrs
  return rest
})

const controlRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const buttonRef = ref<HTMLButtonElement>()
const panelRef = ref<HTMLElement>()

// ### Format

const createFormatter = (options: Intl.DateTimeFormatOptions) => {
  try {
    return new Intl.DateTimeFormat(code.value, options)
  } catch {
    return new Intl.DateTimeFormat(undefined, options)
  }
}

const shortFormatter = computed(() => createFormatter({ day: '2-digit', month: '2-digit', year: 'numeric' }))
const longFormatter = computed(() => createFormatter({ day: 'numeric', month: 'long', year: 'numeric' }))

const format = (value: Date | null) => (value && isValidDate(value) ? shortFormatter.value.format(value) : '')

const placeholderText = computed(() => {
  if (props.placeholder) return props.placeholder
  const { order, separator } = getDateFormatPattern(code.value)
  return order.map((part) => t(`datePicker.${part}`)).join(separator)
})

const buttonLabel = computed(() => {
  if (props.openLabel) return props.openLabel
  return modelValue.value && isValidDate(modelValue.value)
    ? t('datePicker.openSelected', { date: longFormatter.value.format(modelValue.value) })
    : t('datePicker.open')
})

// ### Valeur

const text = ref(format(modelValue.value))
watch([modelValue, shortFormatter], () => {
  text.value = format(modelValue.value)
})

const isAllowed = (date: Date) => !isOutOfRange(date, props.min, props.max) && !props.isDateDisabled?.(date)

const setValue = (value: Date | null) => {
  const previous = modelValue.value
  const changed = value === null ? previous !== null : !isSameDay(value, previous)
  modelValue.value = value
  text.value = format(value)
  if (changed) emit('change', value)
}

const commit = () => {
  const parsed = parseDateInput(text.value, code.value)
  if (parsed === undefined || (parsed && !isAllowed(parsed))) {
    text.value = format(modelValue.value)
    return
  }
  setValue(parsed)
}

// ### Calendrier

const isOpen = ref(false)
const canEdit = computed(() => !fieldDisabled.value && !props.readonly)

const open = () => {
  if (canEdit.value) isOpen.value = true
}

// Le focus revient au bouton une fois le piège désactivé (sinon il le ramènerait dans le calendrier)
const close = async (returnFocus = true) => {
  isOpen.value = false
  if (!returnFocus) return
  await nextTick()
  buttonRef.value?.focus()
}

useFloatingPosition(controlRef, panelRef, {
  placement: 'bottom-start',
  open: isOpen,
  offset: 4
})

// Focus sur le jour actif à l'ouverture, Tab piégé dans le calendrier
useFocusTrap(panelRef, {
  active: isOpen,
  initialFocus: () => panelRef.value?.querySelector<HTMLElement>('[data-date][tabindex="0"]'),
  returnFocus: false
})

useDismiss([controlRef, panelRef], {
  enabled: isOpen,
  onDismiss: (reason) => close(reason === 'escape')
})

const handleSelect = (date: Date) => {
  setValue(date)
  close()
}

// ### Champ

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') commit()
  if (event.key === 'ArrowDown' && event.altKey) {
    event.preventDefault()
    commit()
    open()
  }
}

const handleBlur = (event: FocusEvent) => {
  commit()
  emit('blur', event)
}

const classes = computed(() => [
  'su-date-picker',
  `su-date-picker--${fieldSize.value}`,
  `su-date-picker--${fieldState.value}`,
  { 'su-date-picker--readonly': props.readonly }
])

const ariaAttributes = computed(() => {
  const result: Record<string, string> = {}
  if (props.ariaLabel) result['aria-label'] = props.ariaLabel
  if (labelledBy.value) result['aria-labelledby'] = labelledBy.value
  if (describedBy.value) result['aria-describedby'] = describedBy.value
  if (fieldState.value === 'error' || props.ariaInvalid) result['aria-invalid'] = 'true'
  return result
})

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
      class="su-date-picker__control"
    >
      <input
        :id="controlId"
        ref="inputRef"
        v-model="text"
        class="su-date-picker__input"
        type="text"
        autocomplete="off"
        spellcheck="false"
        :name="name"
        :placeholder="placeholderText"
        :disabled="fieldDisabled"
        :readonly="readonly"
        :required="fieldRequired"
        v-bind="{ ...inputAttrs, ...ariaAttributes }"
        @keydown="handleKeydown"
        @focus="emit('focus', $event)"
        @blur="handleBlur"
      >
      <button
        v-if="!readonly"
        ref="buttonRef"
        type="button"
        class="su-date-picker__button"
        aria-haspopup="dialog"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-label="buttonLabel"
        :disabled="fieldDisabled"
        @click="isOpen ? close() : open()"
      >
        <CalendarDaysIcon
          class="su-date-picker__icon"
          aria-hidden="true"
        />
      </button>
    </div>

    <Transition name="su-date-picker-panel">
      <div
        v-if="isOpen"
        ref="panelRef"
        role="dialog"
        aria-modal="true"
        :aria-label="t('datePicker.dialog')"
        class="su-date-picker__panel"
      >
        <Calendar
          :model-value="modelValue"
          :min="min"
          :max="max"
          :is-date-disabled="isDateDisabled"
          :locale="code"
          :week-starts-on="weekStartsOn"
          @select="handleSelect"
        />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// DATE PICKER — surface de contrôle (comme SuInput), bouton
// calendrier intégré, calendrier dans une surface flottante
// ============================================================

.su-date-picker {
  --_su-date-height: var(--su-control-height-md);

  position: relative;
  width: 100%;
  font-size: var(--su-font-size-base);

  @include up('sm') {
    --_su-date-height: var(--su-control-height-md-compact);

    font-size: var(--su-font-size-sm);
  }

  &--sm {
    --_su-date-height: var(--su-control-height-sm);

    @include up('sm') {
      --_su-date-height: var(--su-control-height-sm-compact);
    }
  }

  &--lg {
    --_su-date-height: var(--su-control-height-lg);

    @include up('sm') {
      --_su-date-height: var(--su-control-height-lg-compact);
    }
  }

  @each $state in ('error', 'success', 'warning') {
    &--#{$state} .su-date-picker__control {
      border-color: with-alpha(state-#{$state}, 48%);

      &:focus-within {
        @include focus-ring-field(var(--su-state-#{$state}));
      }
    }
  }

  &--readonly .su-date-picker__control {
    background-color: var(--su-bg-muted);
  }
}

.su-date-picker__control {
  display: flex;
  align-items: center;
  min-height: var(--_su-date-height);
  color: var(--su-text-primary);

  @include control-surface;
}

.su-date-picker__input {
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
  font-variant-numeric: tabular-nums;
  line-height: 1.5;

  &::placeholder {
    color: var(--su-text-tertiary);
  }
}

.su-date-picker__button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  margin-inline-end: 0.25rem;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: var(--su-text-secondary);
  cursor: pointer;

  @include transition(background-color, color);
  @include touch-target-overlay;

  &:hover:not(:disabled) {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }
}

.su-date-picker__icon {
  @include button-icon;
}

.su-date-picker__panel {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.75rem;

  @include popover-surface;
}

@include popover-transition('su-date-picker-panel');
</style>
