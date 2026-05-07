<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import type { InputProps } from '@/types'

defineOptions({ inheritAttrs: false })

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
  'su-input',
  `su-input--${props.size}`,
  `su-input--${props.state}`,
  `su-input--align-${props.textAlign}`,
  {
    'su-input--disabled': props.disabled,
    'su-input--readonly': props.readonly,
    'su-input--has-prefix': props.prefix || props.prefixIcon,
    'su-input--has-suffix': props.suffix || props.suffixIcon
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
  const inputAttrs: Record<string, any> = {}

  const { name } = attrs as Record<string, any>

  if (name) inputAttrs.name = name
  if (props.autocomplete) inputAttrs.autocomplete = props.autocomplete
  if (props.min !== undefined) inputAttrs.min = props.min
  if (props.max !== undefined) inputAttrs.max = props.max
  if (props.step !== undefined) inputAttrs.step = props.step
  if (props.minLength !== undefined) inputAttrs.minlength = props.minLength
  if (props.maxLength !== undefined) inputAttrs.maxlength = props.maxLength
  if (props.pattern) inputAttrs.pattern = props.pattern
  if (props.placeholder) inputAttrs.placeholder = props.placeholder
  
  return inputAttrs
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
    <div
      v-if="prefix || prefixIcon || $slots.prefix"
      class="su-input__prefix"
    >
      <!-- Préfixe slot -->
      <slot
        v-if="$slots.prefix"
        name="prefix"
        class="su-input__prefix__slot"
      />
    
      <!-- Préfixe icône -->
      <div
        v-if="prefixIcon"
        class="su-input__prefix__icon"
        :class="{ 'su-input__prefix--clickable': hasPrefixIconClickListener }"
        :tabindex="hasPrefixIconClickListener && !disabled && !readonly ? 0 : -1"
        :role="hasPrefixIconClickListener ? 'button' : undefined"
        :aria-label="hasPrefixIconClickListener ? prefixIconLabel : undefined"
        @click="handlePrefixIconClick"
        @keydown.enter.prevent="handlePrefixIconClick"
        @keydown.space.prevent="handlePrefixIconClick"
      >
        <component
          :is="prefixIcon"
          class="su-input-icon"
          aria-hidden="true"
        />
      </div>
      
      <!-- Préfixe texte -->
      <div
        v-if="prefix"
        class="su-input__prefix__text"
        :class="{ 'su-input__prefix--clickable': hasPrefixClickListener }"
        :tabindex="hasPrefixClickListener && !disabled && !readonly ? 0 : -1"
        :role="hasPrefixClickListener ? 'button' : undefined"
        :aria-label="hasPrefixClickListener ? prefixLabel : undefined"
        @click="handlePrefixClick"
        @keydown.enter.prevent="handlePrefixClick"
        @keydown.space.prevent="handlePrefixClick"
      >
        {{ prefix }}
      </div>
    </div>

    <input
      :id="inputId"
      ref="inputRef"
      class="su-input__element"
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
    >

    <!-- Suffixe -->
    <div
      v-if="suffix || suffixIcon || $slots.suffix"
      class="su-input__suffix"
    >
      <!-- Suffixe texte -->
      <div
        v-if="suffix"
        class="su-input__suffix__text"
        :class="{ 'su-input__suffix--clickable': hasSuffixClickListener }"
        :tabindex="hasSuffixClickListener && !disabled && !readonly ? 0 : -1"
        :role="hasSuffixClickListener ? 'button' : undefined"
        :aria-label="hasSuffixClickListener ? suffixLabel : undefined"
        @click="handleSuffixClick"
        @keydown.enter.prevent="handleSuffixClick"
        @keydown.space.prevent="handleSuffixClick"
      >
        {{ suffix }}
      </div>

      <!-- Suffixe icône -->
      <div
        v-if="suffixIcon"
        class="su-input__suffix__icon"
        :class="{ 'su-input__suffix--clickable': hasSuffixIconClickListener }"
        :tabindex="hasSuffixIconClickListener && !disabled && !readonly ? 0 : -1"
        :role="hasSuffixIconClickListener ? 'button' : undefined"
        :aria-label="hasSuffixIconClickListener ? suffixIconLabel : undefined"
        @click="handleSuffixIconClick"
        @keydown.enter.prevent="handleSuffixIconClick"
        @keydown.space.prevent="handleSuffixIconClick"
      >
        <component
          :is="suffixIcon"
          class="su-input-icon"
          aria-hidden="true"
        />
      </div>

      <!-- Suffixe slot -->
      <slot
        v-if="$slots.suffix"
        name="suffix"
        class="su-input__suffix__slot"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

@mixin su-input--size($self, $name, $fontSize, $padding, $minHeight) {
  &--#{$name} {
    //min-height: $minHeight; // calc(#{$padding} * 2 + 1rem);

    #{$self}__element {
      padding: $padding;
      font-size: $fontSize; 
    }

    .su-input__prefix,
    .su-input__suffix {
      padding: $padding;
      font-size: $fontSize;
    }
  }
}

@mixin su-input--align($self, $align) {
  &--align-#{$align} {
    #{$self}__element {
      text-align: $align;
    }
  }
}

.su-input {
  $self: &;
  
  display: flex;
  align-items: center;

  @include su-form-field-container;

  &__element {
    @include su-formfield-box($self);

    width: 100%;
    line-height: var(--su-line-height-normal);

    &[type='number'] {
      appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }
    }

    &[type='search'] {
      &::-webkit-search-cancel-button {
        appearance: none;
      }
    }
  }

  // Sizes
  @include su-input--size(&, sm, var(--su-font-size-sm), 0.25rem 0.5rem, 2rem);
  @include su-input--size(&, md, var(--su-font-size-base), 0.5rem 0.75rem, 2.5rem);
  @include su-input--size(&, lg, var(--su-font-size-lg), 0.75rem 1rem, 3rem);

  // Text align
  @include su-input--align(&, left);
  @include su-input--align(&, center);
  @include su-input--align(&, right);

  // Prefix & Suffix
  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    color: var(--su-text-secondary);
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
      
      &:hover:not(.su-input--disabled, .su-input--readonly) {
        background-color: var(--su-bg-hover);
        color: var(--su-text-primary);
      }
      
      &:active:not(.su-input--disabled, .su-input--readonly) {
        background-color: var(--su-bg-active);
      }
    }
  }

  &__prefix {
    border-top-left-radius: var(--su-radius-md);
    border-bottom-left-radius: var(--su-radius-md);
  }

  &__suffix {
    border-top-right-radius: var(--su-radius-md);
    border-bottom-right-radius: var(--su-radius-md);
  }
}
</style>
