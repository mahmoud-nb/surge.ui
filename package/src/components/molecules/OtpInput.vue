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
          :autocomplete="group.startIndex + fieldIndex === 0 ? 'one-time-code' : 'off'"
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
@use '../../styles/abstracts' as *;

// ============================================================
// OTP INPUT — cases de saisie en surface de contrôle,
// tailles alignées sur les autres champs (36/32px par défaut)
// ============================================================

@mixin su-otp-size($size) {
  --_su-otp-cell: var(--su-control-height-#{$size});

  @include up('sm') {
    --_su-otp-cell: var(--su-control-height-#{$size}-compact);
  }
}

@mixin su-otp-state($state, $border-alpha) {
  &--#{$state} .su-otp-input__field {
    border-color: with-alpha(state-#{$state}, $border-alpha);

    &:focus {
      @include focus-ring-field(var(--su-state-#{$state}));
    }
  }

  &--#{$state}.su-otp-input--underline .su-otp-input__field:focus {
    border-bottom-color: var(--su-state-#{$state});
    box-shadow: none;
  }
}

.su-otp-input {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  // 16px sur mobile (pas de zoom iOS), 14px dès `sm`
  font-size: var(--su-font-size-base);

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  // ### Tailles (largeur = hauteur d'un contrôle)

  &--sm { @include su-otp-size('sm'); }
  &--md { @include su-otp-size('md'); }

  &--lg {
    @include su-otp-size('lg');

    font-size: var(--su-font-size-lg);

    @include up('sm') {
      font-size: var(--su-font-size-base);
    }
  }

  &__group {
    display: flex;
    gap: 0.5rem;
  }

  // ### Case (variante « boxes » par défaut)

  &__field {
    position: relative;
    box-sizing: border-box;
    width: var(--_su-otp-cell);
    height: var(--_su-otp-cell);
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 1px solid var(--su-border-input);
    border-radius: var(--su-radius-control);
    outline: none;
    background-color: var(--su-bg-control);
    background-clip: padding-box;
    box-shadow: var(--su-shadow-control);
    font: inherit;
    font-weight: var(--su-font-weight-medium);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    text-align: center;
    color: var(--su-text-primary);
    caret-color: var(--su-ring);

    // Masquer les flèches de spin (numeric)
    appearance: textfield;

    @include transition(border-color, box-shadow, background-color);

    &::placeholder {
      color: var(--su-text-tertiary);
      font-weight: var(--su-font-weight-normal);
    }

    &:focus {
      z-index: 1;

      @include focus-ring-field;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
  }

  // ### Variante : soulignée

  &--underline &__field {
    border-width: 0 0 2px;

    // Trait seul : couleur pleine pour rester visible sur fond sombre
    border-color: var(--su-border-default);
    border-radius: 0;
    background: transparent;
    box-shadow: none;

    &:focus {
      border-bottom-color: var(--su-ring);
      box-shadow: none;
    }
  }

  // ### Variante : sans bordure

  &--seamless {
    .su-otp-input__group {
      gap: 0.25rem;
    }

    .su-otp-input__field {
      border-color: transparent;
      background-color: var(--su-bg-muted);
      box-shadow: none;

      &:focus {
        background-color: var(--su-bg-control);
      }
    }
  }

  // ### États

  @include su-otp-state(error, 36%);
  @include su-otp-state(success, 48%);
  @include su-otp-state(warning, 48%);

  &--disabled {
    @include disabled-state;

    .su-otp-input__field {
      box-shadow: none;
      cursor: not-allowed;
    }
  }

  &--readonly .su-otp-input__field {
    background-image: linear-gradient(var(--su-bg-muted), var(--su-bg-muted));
    cursor: default;
  }

  // ### Séparateur entre groupes

  &__separator {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--su-text-tertiary);
    user-select: none;
  }

  &__sr-only {
    @include sr-only;
  }

  @include high-contrast {
    .su-otp-input__field {
      border-width: 2px;
    }

    &.su-otp-input--underline .su-otp-input__field {
      border-width: 0 0 3px;
    }
  }
}
</style>
