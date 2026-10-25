<script setup lang="ts">
import { computed, ref, watch, nextTick, useAttrs, type HTMLAttributes, type StyleValue } from 'vue'
import type { TextareaProps } from '@/types'

defineOptions({ inheritAttrs: false }) // name: 'Textarea'

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  rows: 3,
  minRows: 2,
  maxRows: 10,
  showCounter: false,
  autoResize: false,
  spellcheck: true,
  wrap: 'soft'
})

const modelValue = defineModel<string>({ default: '' })

const emit = defineEmits<{
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const attrs = useAttrs()

const textareaRef = ref<HTMLTextAreaElement>()
const textareaId = computed(() => attrs.id as string || undefined)

// class et style décorent le conteneur ; tous les autres attributs
// (id, name, data-*, écouteurs non déclarés…) vont sur le textarea.
const containerAttrs = computed(() => ({
  class: attrs.class as HTMLAttributes['class'],
  style: attrs.style as StyleValue
}))
const passthroughAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

// Valeur normalisée
const currentValue = computed(() => modelValue.value || '')

// Compteur de caractères
const characterCount = computed(() => currentValue.value.length)
const remainingCharacters = computed(() => {
  if (!props.maxLength) return null
  return props.maxLength - characterCount.value
})

const isNearLimit = computed(() => {
  if (!props.maxLength) return false
  return remainingCharacters.value !== null && remainingCharacters.value <= props.maxLength * 0.1
})

const isOverLimit = computed(() => {
  if (!props.maxLength) return false
  return remainingCharacters.value !== null && remainingCharacters.value < 0
})

// Classes CSS
const containerClasses = computed(() => [
  'su-textarea-container',
  `su-textarea-container--${props.size}`,
  `su-textarea-container--${props.state}`,
  {
    'su-textarea-container--disabled': props.disabled,
    'su-textarea-container--readonly': props.readonly,
    'su-textarea-container--auto-resize': props.autoResize,
    'su-textarea-container--over-limit': isOverLimit.value
  }
])

const textareaClasses = computed(() => [
  'su-textarea',
  `su-textarea--${props.size}`,
  `su-textarea--${props.state}`,
  {
    'su-textarea--disabled': props.disabled,
    'su-textarea--readonly': props.readonly,
    'su-textarea--auto-resize': props.autoResize,
    'su-textarea--over-limit': isOverLimit.value
  }
])

const counterClasses = computed(() => [
  'su-textarea-counter',
  {
    'su-textarea-counter--near-limit': isNearLimit.value,
    'su-textarea-counter--over-limit': isOverLimit.value
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined) attrs['aria-required'] = props.ariaRequired
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error' || isOverLimit.value) attrs['aria-invalid'] = 'true'

  // Message du champ + compteur de caractères
  const describedBy = [
    props.ariaDescribedBy,
    props.showCounter && props.maxLength && textareaId.value ? `${textareaId.value}-counter` : undefined
  ].filter(Boolean).join(' ')
  if (describedBy) attrs['aria-describedby'] = describedBy

  return attrs
})

// Attributs HTML natifs
const nativeAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.autocomplete) attrs.autocomplete = props.autocomplete
  if (props.maxLength) attrs.maxlength = props.maxLength
  if (props.spellcheck !== undefined) attrs.spellcheck = props.spellcheck
  if (props.wrap) attrs.wrap = props.wrap
  
  return attrs
})

// Auto-resize : natif en CSS (field-sizing: content) quand il est supporté,
// sinon calcul JS à partir de la hauteur de ligne réelle
const supportsFieldSizing = typeof CSS !== 'undefined' && CSS.supports?.('field-sizing', 'content')

// Bornes en nombre de lignes, lues par le CSS (min/max-height en `lh`)
const autoResizeStyle = computed(() => props.autoResize
  ? { '--su-textarea-min-rows': props.minRows ?? 2, '--su-textarea-max-rows': props.maxRows ?? 10 }
  : undefined
)

const adjustHeight = async () => {
  if (!props.autoResize || !textareaRef.value || supportsFieldSizing) return

  await nextTick()

  const textarea = textareaRef.value
  const style = getComputedStyle(textarea)
  const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5
  const chrome = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
    + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  const minHeight = (props.minRows ?? 2) * lineHeight + chrome
  const maxHeight = (props.maxRows ?? 10) * lineHeight + chrome

  textarea.style.height = 'auto'
  const newHeight = Math.max(minHeight, Math.min(maxHeight, textarea.scrollHeight))
  textarea.style.height = `${newHeight}px`
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
}

// Gestionnaires d'événements
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  modelValue.value = target.value
  emit('input', event)
  
  if (props.autoResize) {
    adjustHeight()
  }
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

// Méthodes exposées
const focus = () => {
  textareaRef.value?.focus()
}

const select = () => {
  textareaRef.value?.select()
}

defineExpose({
  focus,
  select,
  textareaRef
})

// Watchers
watch(modelValue, () => {
  if (props.autoResize) {
    adjustHeight()
  }
}, { immediate: true })

watch(() => props.autoResize, (newValue) => {
  if (newValue) {
    adjustHeight()
  }
})
</script>

<template>
  <div
    :class="containerAttrs.class"
    :style="containerAttrs.style"
  >
    <div :class="containerClasses">
      <textarea
        ref="textareaRef"
        :class="textareaClasses"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="autoResize ? minRows : rows"
        :style="autoResizeStyle"
        v-bind="{ ...passthroughAttrs, ...nativeAttributes, ...ariaAttributes }"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
      />
    </div>

    <!-- Footer avec compteur (si nécessaire) -->
    <div 
      v-if="showCounter && maxLength" 
      class="su-textarea-footer"
    >
      <div class="su-textarea-footer-spacer" />
      <div 
        :id="`${textareaId}-counter`"
        :class="counterClasses"
        :aria-live="isNearLimit || isOverLimit ? 'polite' : 'off'"
      >
        <span class="sr-only">
          {{ isOverLimit ? 'Limite de caractères dépassée' : 'Caractères restants' }}:
        </span>
        {{ characterCount }}/{{ maxLength }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TEXTAREA — même surface de contrôle que l'Input
// ============================================================

@mixin su-textarea--state($state) {
  &--#{$state} {
    border-color: with-alpha(state-#{$state}, 48%);

    &:focus-within {
      @include focus-ring-field(var(--su-state-#{$state}));
    }
  }
}

.su-textarea-container {
  display: flex;
  color: var(--su-text-primary);

  // 16px sur mobile (pas de zoom iOS), 14px dès `sm`
  font-size: var(--su-font-size-base);

  @include control-surface;

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  // Marges internes par taille (lues par .su-textarea)
  &--sm {
    --_su-textarea-pad-x: calc(0.625rem - 1px);
    --_su-textarea-pad-y: calc(0.25rem - 1px);
  }

  &--md {
    --_su-textarea-pad-x: calc(0.75rem - 1px);
    --_su-textarea-pad-y: calc(0.375rem - 1px);
  }

  &--lg {
    --_su-textarea-pad-x: calc(0.875rem - 1px);
    --_su-textarea-pad-y: calc(0.5rem - 1px);
  }

  // L'erreur et le dépassement passent par aria-invalid (control-surface)
  @include su-textarea--state(success);
  @include su-textarea--state(warning);

  &--disabled {
    @include disabled-state;

    box-shadow: none;
  }

  &--readonly {
    background-image: linear-gradient(var(--su-bg-muted), var(--su-bg-muted));
  }
}

.su-textarea {
  display: block;
  width: 100%;
  margin: 0;
  padding: var(--_su-textarea-pad-y) var(--_su-textarea-pad-x);
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  line-height: 1.5;
  color: inherit;
  border-radius: inherit;
  resize: vertical;

  &::placeholder {
    color: var(--su-text-tertiary);
  }

  &--disabled,
  &--readonly {
    resize: none;
  }

  &--disabled {
    cursor: not-allowed;
  }

  &--auto-resize {
    resize: none;
    overflow-y: hidden;

    // Redimensionnement natif : la hauteur suit le contenu entre min et max lignes
    @supports (field-sizing: content) {
      field-sizing: content;
      overflow-y: auto;
      min-height: calc(var(--su-textarea-min-rows, 2) * 1lh + 2 * var(--_su-textarea-pad-y));
      max-height: calc(var(--su-textarea-max-rows, 10) * 1lh + 2 * var(--_su-textarea-pad-y));
    }
  }
}

.su-textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 0.375rem;
}

.su-textarea-footer-spacer {
  flex: 1;
}

.su-textarea-counter {
  flex-shrink: 0;
  font-size: var(--su-font-size-xs);
  font-variant-numeric: tabular-nums;
  color: var(--su-text-tertiary);
  line-height: var(--su-line-height-tight);

  &--near-limit {
    color: var(--su-state-warning-fg);
  }

  &--over-limit {
    color: var(--su-state-error-fg);
    font-weight: var(--su-font-weight-medium);
  }
}
</style>
