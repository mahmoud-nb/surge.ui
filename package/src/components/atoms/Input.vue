<script setup lang="ts">
import { computed, getCurrentInstance, ref, useAttrs, type HTMLAttributes, type StyleValue } from 'vue'
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

// Les écouteurs d'événements déclarés dans defineEmits ne figurent pas dans
// attrs : on les lit sur les props du vnode.
const vnodeProps = getCurrentInstance()?.vnode.props ?? {}
const hasListener = (name: string) => typeof vnodeProps[name] === 'function'
const hasPrefixClickListener = computed(() => hasListener('onPrefixClick'))
const hasPrefixIconClickListener = computed(() => hasListener('onPrefixIconClick'))
const hasSuffixClickListener = computed(() => hasListener('onSuffixClick'))
const hasSuffixIconClickListener = computed(() => hasListener('onSuffixIconClick'))

// class et style décorent le conteneur ; tous les autres attributs
// (id, inputmode, enterkeyhint, data-*, écouteurs non déclarés…) vont sur l'input.
const containerAttrs = computed(() => ({
  class: attrs.class as HTMLAttributes['class'],
  style: attrs.style as StyleValue
}))
const passthroughAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

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
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.required || props.ariaRequired) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'

  return attrs
})

// Attributs HTML natifs
const nativeAttributes = computed(() => {
  const inputAttrs: Record<string, any> = {}

  if (props.name) inputAttrs.name = props.name
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

// Gestionnaires d’événements
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  // Un champ numérique vidé reste vide (et non 0)
  modelValue.value = props.type === 'number' && target.value !== ''
    ? target.valueAsNumber
    : target.value
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
  <div
    :class="[containerClasses, containerAttrs.class]"
    :style="containerAttrs.style"
  >
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
      ref="inputRef"
      class="su-input__element"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      v-bind="{ ...passthroughAttrs, ...nativeAttributes, ...ariaAttributes }"
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
@use '../../styles/abstracts' as *;

// ============================================================
// INPUT — surface de contrôle : bordure en transparence, reflet interne,
// halo de focus de 3px, hauteurs 36/32px (compactes dès `sm`)
// ============================================================

@mixin su-input--size($self, $name, $padding) {
  &--#{$name} {
    min-height: var(--su-control-height-#{$name});

    @include up('sm') {
      min-height: var(--su-control-height-#{$name}-compact);
    }

    #{$self}__element {
      padding-inline: $padding;
    }

    #{$self}__prefix {
      padding-inline-start: $padding;
    }

    #{$self}__suffix {
      padding-inline-end: $padding;
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

@mixin su-input--state($state) {
  &--#{$state} {
    border-color: with-alpha(state-#{$state}, 48%);

    &:focus-within {
      @include focus-ring-field(var(--su-state-#{$state}));
    }
  }
}

.su-input {
  $self: &;

  display: flex;
  align-items: stretch;
  width: 100%;
  color: var(--su-text-primary);

  // 16px sur mobile (pas de zoom iOS), 14px dès `sm`
  font-size: var(--su-font-size-base);

  @include control-surface;

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  &__element {
    flex: 1;
    min-width: 0;
    margin: 0;
    padding-block: 0;
    border: 0;
    outline: none;
    background: transparent;
    font: inherit;
    line-height: 1.5;
    color: inherit;
    border-radius: inherit;

    &::placeholder {
      color: var(--su-text-tertiary);
    }

    // Empêche le fond jaune de l'autoremplissage
    &:autofill {
      -webkit-text-fill-color: var(--su-text-primary);
      transition: background-color 5000000s ease-in-out 0s;
    }

    &[type='number'] {
      appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }
    }

    &[type='search'] {
      &::-webkit-search-cancel-button,
      &::-webkit-search-decoration {
        appearance: none;
      }
    }
  }

  // Champ autorempli : léger voile pour le signaler
  &:has(#{$self}__element:autofill) {
    background-image: linear-gradient(with-alpha(text-primary, 4%), with-alpha(text-primary, 4%));
  }

  // ### Tailles

  @include su-input--size(&, sm, calc(0.625rem - 1px));
  @include su-input--size(&, md, calc(0.75rem - 1px));
  @include su-input--size(&, lg, calc(0.875rem - 1px));

  // ### Alignement du texte

  @include su-input--align(&, left);
  @include su-input--align(&, center);
  @include su-input--align(&, right);

  // ### États (l'erreur passe par aria-invalid, géré par control-surface)

  @include su-input--state(success);
  @include su-input--state(warning);

  &--disabled {
    @include disabled-state;

    box-shadow: none;
  }

  &--readonly {
    background-image: linear-gradient(var(--su-bg-muted), var(--su-bg-muted));
  }

  // ### Préfixe et suffixe

  &--has-prefix #{$self}__element {
    padding-inline-start: 0.5rem;
  }

  &--has-suffix #{$self}__element {
    padding-inline-end: 0.5rem;
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 0.375rem;
    white-space: nowrap;
    color: var(--su-text-tertiary);

    &__text {
      font-weight: var(--su-font-weight-medium);
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;

      // 18px sur mobile, 16px dès `sm`
      .su-input-icon {
        width: 1.125rem;
        height: 1.125rem;
        opacity: 0.8;

        @include up('sm') {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    &--clickable {
      margin: -0.25rem;
      padding: 0.25rem;
      border-radius: var(--su-radius-sm);
      cursor: pointer;

      @include transition(background-color, color);

      &:hover {
        background-color: var(--su-bg-accent);
        color: var(--su-text-primary);
      }

      &:focus-visible {
        @include focus-ring($offset: 0);
      }

      #{$self}--disabled &,
      #{$self}--readonly & {
        pointer-events: none;
      }
    }
  }
}
</style>
