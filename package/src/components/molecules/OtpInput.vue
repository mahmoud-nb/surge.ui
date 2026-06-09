<script setup lang="ts">
import { computed, ref, shallowRef, watch, onMounted, nextTick, useId } from 'vue'
import type { OtpInputProps } from '@/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<OtpInputProps>(), {
  length: 6,
  variant: 'boxes',
  inputType: 'numeric',
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  masked: false,
  autoSubmit: false,
  autoFocus: false,
  placeholder: '',
  separator: '-',
})

const modelValue = defineModel<string>({ default: '' })

const emit = defineEmits<{
  complete: [value: string]
  change: [value: string]
  focus: [event: FocusEvent, index: number]
  blur: [event: FocusEvent, index: number]
}>()

defineSlots<{
  /** Contenu personnalisé du séparateur entre groupes */
  separator?(): any
}>()

// ========================================
// Refs
// ========================================

const inputRefs = shallowRef<(HTMLInputElement | null)[]>([])
const groupId = 'otp-' + useId()

// ========================================
// Validation pattern
// ========================================

const inputPattern = computed(() => {
  if (props.pattern) return new RegExp(props.pattern)

  switch (props.inputType) {
    case 'alphanumeric': return /^[a-zA-Z0-9]$/
    case 'alphabetic': return /^[a-zA-Z]$/
    case 'numeric':
    default: return /^[0-9]$/
  }
})

const inputMode = computed(() => {
  if (props.inputType === 'numeric') return 'numeric'
  return 'text'
})

// ========================================
// Digits array
// ========================================

const digits = ref<string[]>(Array.from({ length: props.length }, () => ''))

// Sync digits from modelValue
const syncDigitsFromModel = (value: string) => {
  const chars = (value || '').split('')
  digits.value = Array.from({ length: props.length }, (_, i) => chars[i] || '')
}

// Init from modelValue
syncDigitsFromModel(modelValue.value)

// Watch for external modelValue changes
watch(modelValue, (newVal) => {
  const currentJoined = digits.value.join('')
  if (newVal !== currentJoined) {
    syncDigitsFromModel(newVal)
  }
})

// Watch length changes
watch(() => props.length, () => {
  syncDigitsFromModel(modelValue.value)
})

// ========================================
// Groups computation
// ========================================

interface OtpGroup {
  startIndex: number
  fields: string[]
}

const groups = computed<OtpGroup[]>(() => {
  if (!props.grouping || props.grouping.length === 0) {
    return [{ startIndex: 0, fields: [...digits.value] }]
  }

  const result: OtpGroup[] = []
  let offset = 0

  for (const size of props.grouping) {
    result.push({
      startIndex: offset,
      fields: digits.value.slice(offset, offset + size),
    })
    offset += size
  }

  // Champs restants si la somme des groupes < length
  if (offset < props.length) {
    result.push({
      startIndex: offset,
      fields: digits.value.slice(offset),
    })
  }

  return result
})

// ========================================
// CSS classes
// ========================================

const containerClasses = computed(() => [
  'su-otp-input',
  `su-otp-input--${props.variant}`,
  `su-otp-input--${props.size}`,
  {
    [`su-otp-input--${props.state}`]: props.state !== 'default',
    'su-otp-input--disabled': props.disabled,
    'su-otp-input--readonly': props.readonly,
    'su-otp-input--masked': props.masked,
  },
])

// ========================================
// ARIA
// ========================================

const ariaAttributes = computed(() => {
  const attrs: Record<string, string> = {}
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  if (props.required || props.ariaRequired) attrs['aria-required'] = 'true'
  return attrs
})

const defaultAriaLabel = computed(() => {
  return props.ariaLabel || `Code de vérification à ${props.length} caractères`
})

const progressText = computed(() => {
  const filled = digits.value.filter((d) => d !== '').length
  if (filled === 0) return ''
  return `${filled} caractère${filled > 1 ? 's' : ''} saisi${filled > 1 ? 's' : ''} sur ${props.length}`
})

// ========================================
// Validation
// ========================================

const isCharValid = (char: string, index: number): boolean => {
  if (props.validate) return props.validate(char, index)
  return inputPattern.value.test(char)
}

// ========================================
// Value management
// ========================================

const updateValue = () => {
  const value = digits.value.join('')
  modelValue.value = value
  emit('change', value)

  // Auto-submit si complet
  const isComplete = digits.value.every((d) => d !== '')
  if (isComplete && props.autoSubmit) {
    emit('complete', value)
  }
}

// ========================================
// Focus management
// ========================================

const focusField = (index: number) => {
  const clampedIndex = Math.max(0, Math.min(index, props.length - 1))
  nextTick(() => {
    const input = inputRefs.value[clampedIndex]
    if (input) {
      input.focus()
      input.select()
    }
  })
}

// ========================================
// Event handlers
// ========================================

const handleInput = (event: Event, index: number) => {
  if (props.disabled || props.readonly) return

  const input = event.target as HTMLInputElement
  const value = input.value

  // Gestion multi-caractères (IME ou paste dans le champ)
  if (value.length > 1) {
    const chars = value.split('').filter((c, i) => isCharValid(c, index + i))
    for (let i = 0; i < chars.length && index + i < props.length; i++) {
      digits.value[index + i] = chars[i]
    }
    updateValue()
    const nextIndex = Math.min(index + chars.length, props.length - 1)
    focusField(nextIndex)
    return
  }

  // Caractère unique
  if (value && !isCharValid(value, index)) {
    input.value = digits.value[index]
    return
  }

  digits.value[index] = value
  updateValue()

  // Auto-focus champ suivant si valide
  if (value && index < props.length - 1) {
    focusField(index + 1)
  }
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Backspace':
      event.preventDefault()
      if (digits.value[index]) {
        // Effacer le champ courant
        digits.value[index] = ''
        updateValue()
      } else if (index > 0) {
        // Focus et effacement du champ précédent
        digits.value[index - 1] = ''
        updateValue()
        focusField(index - 1)
      }
      break

    case 'Delete':
      event.preventDefault()
      digits.value[index] = ''
      updateValue()
      break

    case 'ArrowLeft':
      event.preventDefault()
      if (index > 0) focusField(index - 1)
      break

    case 'ArrowRight':
      event.preventDefault()
      if (index < props.length - 1) focusField(index + 1)
      break

    case 'Home':
      event.preventDefault()
      focusField(0)
      break

    case 'End':
      event.preventDefault()
      focusField(props.length - 1)
      break
  }
}

const handlePaste = (event: ClipboardEvent) => {
  if (props.disabled || props.readonly) return

  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text') || ''

  // Filtrer les caractères valides
  const validChars = pasteData.split('').filter((c, i) => isCharValid(c, i))

  if (validChars.length === 0) return

  // Trouver le champ actuellement focusé
  const activeElement = document.activeElement as HTMLInputElement
  const activeIndex = inputRefs.value.indexOf(activeElement)
  const startIndex = activeIndex >= 0 ? activeIndex : 0

  // Distribuer les caractères à partir du champ courant
  for (let i = 0; i < validChars.length && startIndex + i < props.length; i++) {
    digits.value[startIndex + i] = validChars[i]
  }

  updateValue()

  // Focus sur le prochain champ vide ou le dernier rempli
  const nextEmpty = digits.value.findIndex((d) => d === '')
  if (nextEmpty >= 0) {
    focusField(nextEmpty)
  } else {
    focusField(props.length - 1)
  }
}

const handleFocus = (event: FocusEvent, index: number) => {
  const input = event.target as HTMLInputElement
  // Sélectionner le contenu au focus
  nextTick(() => input.select())
  emit('focus', event, index)
}

const handleBlur = (event: FocusEvent, index: number) => {
  emit('blur', event, index)
}

// ========================================
// Template ref callback
// ========================================

const setInputRef = (el: unknown, absoluteIndex: number) => {
  if (el && inputRefs.value[absoluteIndex] !== el) {
    inputRefs.value[absoluteIndex] = el as HTMLInputElement
  }
}

// ========================================
// Lifecycle
// ========================================

onMounted(() => {
  if (props.autoFocus) {
    focusField(0)
  }
})

// ========================================
// Expose
// ========================================

const focus = () => focusField(0)
const clear = () => {
  digits.value = Array.from({ length: props.length }, () => '')
  modelValue.value = ''
  emit('change', '')
  nextTick(() => focusField(0))
}

defineExpose({
  focus,
  clear,
  inputRefs,
})
</script>

<template>
  <div
    :class="containerClasses"
    role="group"
    :aria-label="defaultAriaLabel"
    v-bind="ariaAttributes"
  >
    <template
      v-for="(group, groupIndex) in groups"
      :key="groupIndex"
    >
      <!-- Séparateur entre groupes (pas avant le premier) -->
      <div
        v-if="groupIndex > 0"
        class="su-otp-input__separator"
        aria-hidden="true"
      >
        <slot name="separator">
          <span>{{ separator }}</span>
        </slot>
      </div>

      <!-- Groupe de champs -->
      <div class="su-otp-input__group">
        <input
          v-for="(digit, fieldIndex) in group.fields"
          :id="`${groupId}-${group.startIndex + fieldIndex}`"
          :key="group.startIndex + fieldIndex"
          :ref="(el) => setInputRef(el, group.startIndex + fieldIndex)"
          class="su-otp-input__field"
          :class="{
            'su-otp-input__field--filled': digit !== '',
          }"
          :type="masked ? 'password' : 'text'"
          :inputmode="inputMode"
          :value="digit"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :aria-label="`Caractère ${group.startIndex + fieldIndex + 1} sur ${length}`"
          autocomplete="one-time-code"
          maxlength="1"
          @input="handleInput($event, group.startIndex + fieldIndex)"
          @keydown="handleKeydown($event, group.startIndex + fieldIndex)"
          @focus="handleFocus($event, group.startIndex + fieldIndex)"
          @blur="handleBlur($event, group.startIndex + fieldIndex)"
          @paste="handlePaste($event)"
        >
      </div>
    </template>

    <!-- Live region pour lecteurs d'écran -->
    <div
      class="su-otp-input__sr-only"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ progressText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;

// ========================================
// Base
// ========================================

.su-otp-input {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  // ========================================
  // Group
  // ========================================

  &__group {
    display: flex;
    gap: 0.5rem;
  }

  // ========================================
  // Field (base commune)
  // ========================================

  &__field {
    box-sizing: border-box;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    color: var(--su-text-primary);
    text-align: center;
    caret-color: var(--su-primary-default);
    font-weight: 600;
    letter-spacing: 0.05em;
    @include transition(border-color, box-shadow, background-color);

    &::placeholder {
      color: var(--su-text-placeholder);
      font-weight: 400;
    }

    &:focus-visible {
      @include focus-ring;
    }

    // Masquer les flèches de spin (numeric)
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  // ========================================
  // Variant: boxes
  // ========================================

  &--boxes {
    .su-otp-input__field {
      background-color: var(--su-bg-surface);
      border: 1px solid var(--su-border-default);
      border-radius: 0.5rem;

      &:focus {
        border-color: var(--su-border-focus);
      }

      &--filled {
        border-color: var(--su-border-strong);
      }
    }
  }

  // ========================================
  // Variant: underline
  // ========================================

  &--underline {
    .su-otp-input__field {
      border: none;
      border-bottom: 2px solid var(--su-border-default);
      border-radius: 0;
      background: transparent;

      &:focus {
        border-bottom-color: var(--su-primary-default);
      }

      &--filled {
        border-bottom-color: var(--su-border-strong);
      }
    }
  }

  // ========================================
  // Variant: seamless
  // ========================================

  &--seamless {
    .su-otp-input__field {
      border: none;
      background: var(--su-bg-hover);
      border-radius: 0.375rem;

      &:focus {
        background: var(--su-bg-active);
      }
    }

    .su-otp-input__group {
      gap: 0.25rem;
    }
  }

  // ========================================
  // Sizes
  // ========================================

  &--sm {
    gap: 0.375rem;

    .su-otp-input__field {
      width: 2rem;
      height: 2rem;
      font-size: 0.875rem;
    }

    .su-otp-input__group {
      gap: 0.375rem;
    }

    .su-otp-input__separator {
      font-size: 0.875rem;
    }
  }

  &--md {
    .su-otp-input__field {
      width: 2.75rem;
      height: 2.75rem;
      font-size: 1.125rem;
    }

    .su-otp-input__separator {
      font-size: 1.125rem;
    }
  }

  &--lg {
    gap: 0.625rem;

    .su-otp-input__field {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 1.5rem;
    }

    .su-otp-input__group {
      gap: 0.625rem;
    }

    .su-otp-input__separator {
      font-size: 1.5rem;
    }
  }

  // ========================================
  // States
  // ========================================

  &--error {
    .su-otp-input__field {
      border-color: var(--su-state-error);

      &:focus {
        border-color: var(--su-state-error);
      }
    }

    &.su-otp-input--underline .su-otp-input__field {
      border-bottom-color: var(--su-state-error);

      &:focus {
        border-bottom-color: var(--su-state-error);
      }
    }
  }

  &--success {
    .su-otp-input__field {
      border-color: var(--su-state-success);

      &:focus {
        border-color: var(--su-state-success);
      }
    }

    &.su-otp-input--underline .su-otp-input__field {
      border-bottom-color: var(--su-state-success);

      &:focus {
        border-bottom-color: var(--su-state-success);
      }
    }
  }

  &--warning {
    .su-otp-input__field {
      border-color: var(--su-state-warning);

      &:focus {
        border-color: var(--su-state-warning);
      }
    }

    &.su-otp-input--underline .su-otp-input__field {
      border-bottom-color: var(--su-state-warning);

      &:focus {
        border-bottom-color: var(--su-state-warning);
      }
    }
  }

  // ========================================
  // Disabled
  // ========================================

  &--disabled {
    .su-otp-input__field {
      background-color: var(--su-bg-disabled);
      border-color: var(--su-border-disabled);
      color: var(--su-text-disabled);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .su-otp-input__separator {
      color: var(--su-text-disabled);
    }
  }

  // ========================================
  // Readonly
  // ========================================

  &--readonly {
    .su-otp-input__field {
      background-color: var(--su-bg-canvas);
      cursor: default;
    }
  }

  // ========================================
  // Separator
  // ========================================

  &__separator {
    display: flex;
    align-items: center;
    color: var(--su-text-secondary);
    font-weight: 500;
    user-select: none;
    flex-shrink: 0;
  }

  // ========================================
  // Screen reader only
  // ========================================

  &__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

// ========================================
// High contrast
// ========================================

@media (prefers-contrast: high) {
  .su-otp-input {
    &__field {
      border-width: 2px;

      &:focus-visible {
        outline-width: 3px;
      }
    }

    &--underline .su-otp-input__field {
      border-bottom-width: 3px;
    }
  }
}

// ========================================
// Reduced motion
// ========================================

@media (prefers-reduced-motion: reduce) {
  .su-otp-input__field {
    transition: none;
  }
}
</style>
