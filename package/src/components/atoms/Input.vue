<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import type { Component } from 'vue'
import type { Size, State, TextAlign, AccessibilityProps } from '@/types'

defineOptions({ inheritAttrs: false })

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
export interface InputProps extends AccessibilityProps {
  type?: InputType
  size?: Size
  state?: State
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  placeholder?: string
  prefix?: string
  suffix?: string
  prefixIcon?: Component
  suffixIcon?: Component
  textAlign?: TextAlign
  autocomplete?: string
  min?: number | string
  max?: number | string
  step?: number | string
  minLength?: number
  maxLength?: number
  pattern?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  textAlign: 'default'
})

const emit = defineEmits<{
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
  'prefix-click': [event: MouseEvent]
  'prefix-icon-click': [event: MouseEvent]
  'suffix-click': [event: MouseEvent]
  'suffix-icon-click': [event: MouseEvent]
}>()

const modelValue = defineModel<string | number>({ default: '' })

const attrs = useAttrs()
const inputId = computed(() => (attrs.id as string) || undefined)

// Détection des écouteurs d'événements pour l'accessibilité conditionnelle
const hasPrefixClickListener = computed(() => typeof attrs.onPrefixClick === 'function')
const hasPrefixIconClickListener = computed(() => typeof attrs.onPrefixIconClick === 'function')
const hasSuffixClickListener = computed(() => typeof attrs.onSuffixClick === 'function')
const hasSuffixIconClickListener = computed(() => typeof attrs.onSuffixIconClick === 'function')

// Classes CSS
const containerClasses = computed(() => [
  'su-input-container',
  `su-input-container--${props.size}`,
  `su-input-container--${props.state}`,
  {
    'su-input-container--disabled': props.disabled,
    'su-input-container--readonly': props.readonly,
    'su-input-container--has-prefix': props.prefix || props.prefixIcon,
    'su-input-container--has-suffix': props.suffix || props.suffixIcon
  }
])

const inputClasses = computed(() => [
  'su-input',
  `su-input--${props.size}`,
  `su-input--${props.state}`,
  `su-input--align-${props.textAlign}`,
  {
    'su-input--disabled': props.disabled,
    'su-input--readonly': props.readonly
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.required || props.ariaRequired) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
})

// Attributs HTML natifs
const nativeAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (props.autocomplete) attrs.autocomplete = props.autocomplete
  if (props.min !== undefined) attrs.min = props.min
  if (props.max !== undefined) attrs.max = props.max
  if (props.step !== undefined) attrs.step = props.step
  if (props.minLength !== undefined) attrs.minlength = props.minLength
  if (props.maxLength !== undefined) attrs.maxlength = props.maxLength
  if (props.pattern) attrs.pattern = props.pattern
  if (props.placeholder) attrs.placeholder = props.placeholder
  
  return attrs
})

const dataAttributes = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key.startsWith('data-'))
  )
)

// Gestionnaires d’événements
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  modelValue.value = props.type === 'number' ? Number(target.value) : target.value
  emit('input', event)
}

const handleChange = (event: Event) => emit('change', event)
const handleFocus = (event: FocusEvent) => emit('focus', event)
const handleBlur = (event: FocusEvent) => emit('blur', event)
const handleKeydown = (event: KeyboardEvent) => emit('keydown', event)
const handleKeyup = (event: KeyboardEvent) => emit('keyup', event)

// Gestionnaires d'événements pour prefix et suffix
const handlePrefixClick = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled || props.readonly) return
  emit('prefix-click', event as MouseEvent)
}

const handlePrefixIconClick = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled || props.readonly) return
  emit('prefix-icon-click', event as MouseEvent)
}

const handleSuffixClick = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled || props.readonly) return
  emit('suffix-click', event as MouseEvent)
}

const handleSuffixIconClick = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled || props.readonly) return
  emit('suffix-icon-click', event as MouseEvent)
}

// Référence au champ input
const inputRef = ref<HTMLInputElement>()
const focus = () => inputRef.value?.focus()
const select = () => inputRef.value?.select()

defineExpose({ focus, select, inputRef })
</script>

<template>
  <div :class="containerClasses">

    <!-- Préfixe -->
    <div v-if="prefix || prefixIcon || $slots.prefix" class="su-input-prefix">
      <!-- Préfixe slot -->
      <slot v-if="$slots.prefix" name="prefix" class="su-input-prefix__slot" />
    
      <!-- Préfixe icône -->
      <div 
        v-if="prefixIcon" 
        class="su-input-prefix__icon"
        :class="{ 'su-input-prefix--clickable': hasPrefixIconClickListener }"
        :tabindex="hasPrefixIconClickListener && !disabled && !readonly ? 0 : -1"
        @click="handlePrefixIconClick"
        @keydown.enter.prevent="handlePrefixIconClick"
        @keydown.space.prevent="handlePrefixIconClick"
      >
        <component :is="prefixIcon" class="su-input-icon" aria-hidden="true" />
      </div>
      
      <!-- Préfixe texte -->
      <div 
        v-if="prefix" 
        class="su-input-prefix__text"
        :class="{ 'su-input-prefix--clickable': hasPrefixClickListener }"
        :tabindex="hasPrefixClickListener && !disabled && !readonly ? 0 : -1"
        @click="handlePrefixClick"
        @keydown.enter.prevent="handlePrefixClick"
        @keydown.space.prevent="handlePrefixClick"
      >
        {{ prefix }}
      </div>
    </div>

    <input
      ref="inputRef"
      :id="inputId"
      :class="inputClasses"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      v-bind="{ ...nativeAttributes, ...ariaAttributes, ...dataAttributes }"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
    />

    <!-- Suffixe -->
    <div v-if="suffix || suffixIcon || $slots.suffix" class="su-input-suffix">
      <!-- Suffixe texte -->
      <div 
        v-if="suffix" 
        class="su-input-suffix__text"
        :class="{ 'su-input-suffix--clickable': hasSuffixClickListener }"
        :tabindex="hasSuffixClickListener && !disabled && !readonly ? 0 : -1"
        @click="handleSuffixClick"
        @keydown.enter.prevent="handleSuffixClick"
        @keydown.space.prevent="handleSuffixClick"
      >
        {{ suffix }}
      </div>

      <!-- Suffixe icône -->
      <div
        v-if="suffixIcon"
        class="su-input-suffix__icon"
        :class="{ 'su-input-suffix--clickable': hasSuffixIconClickListener }"
        :tabindex="hasSuffixIconClickListener && !disabled && !readonly ? 0 : -1"
        @click="handleSuffixIconClick"
        @keydown.enter.prevent="handleSuffixIconClick"
        @keydown.space.prevent="handleSuffixIconClick"
      >
        <component :is="suffixIcon" class="su-input-icon" aria-hidden="true" />
      </div>

      <!-- Suffixe slot -->
      <slot v-if="$slots.suffix" name="suffix" class="su-input-suffix__slot" />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

@mixin su-input-container-size($name, $fontSize, $padding, $minHeight) {
  &--#{$name} {
    min-height: $minHeight; // calc(#{$padding} * 2 + 1rem);
    .su-input {
      padding: $padding;
      font-size: $fontSize;
    }
    .su-input-prefix,
    .su-input-suffix {
      padding: $padding;
      font-size: $fontSize;
    }
  }
}

.su-input-container {
  display: flex;
  align-items: center;
  @include su-form-field-container;
  
  // Tailles
  @include su-input-container-size(sm, $font-size-sm, 0.375rem 0.5rem, 2rem);
  @include su-input-container-size(md, $font-size-base, 0.5rem 0.75rem, 2.5rem);
  @include su-input-container-size(lg, $font-size-sm, 0.75rem 1rem, 3rem);
}

.su-input {
  width: 100%;
  line-height: $line-height-normal;
  @include su-form-field-element;

  &--sm {
    padding: 0.375rem 0.75rem;
    font-size: $font-size-sm;
  }

  &--md {
    padding: 0.5rem 0.75rem;
    font-size: $font-size-base;
  }

  &--lg {
    padding: 0.75rem 1rem;
    font-size: $font-size-lg;
  }

  &--align-left {
    text-align: left;
  }

  &--align-center {
    text-align: center;
  }

  &--align-right {
    text-align: right;
  }

  &[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &[type='search'] {
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--readonly {
    background-color: $gray-100;
    cursor: default;
  }
}

.su-input-prefix,
.su-input-suffix {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: $text-secondary;
  height: -webkit-fill-available;
  
  &__text {
    font-weight: 500;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    .su-input-icon {
      width: 1.25em;
      height: 1.25em;
    }
  }
  
  &--clickable {
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover:not(.su-input-container--disabled):not(.su-input-container--readonly) {
      background-color: $gray-100;
      color: $text-primary;
    }
    
    &:active:not(.su-input-container--disabled):not(.su-input-container--readonly) {
      background-color: $gray-200;
    }
  }
}

.su-input-prefix {
  border-top-left-radius: $border-radius-md;
  border-bottom-left-radius: $border-radius-md;
}

.su-input-suffix {
  border-top-right-radius: $border-radius-md;
  border-bottom-right-radius: $border-radius-md;
}

// Styles spécifiques au mode sombre pour les préfixes/suffixes
@media (prefers-color-scheme: dark) {
  .su-input-prefix,
  .su-input-suffix {
    color: $text-secondary-dark;
    
    &--clickable:hover:not(.su-input-container--disabled):not(.su-input-container--readonly) {
      background-color: $gray-700;
      color: $text-primary-dark;
    }
    
    &--clickable:active:not(.su-input-container--disabled):not(.su-input-container--readonly) {
      background-color: $gray-600;
    }
  }
}
</style>
