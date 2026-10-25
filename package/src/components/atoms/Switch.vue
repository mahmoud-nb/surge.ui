<script setup lang="ts">
import { computed, useAttrs, ref } from 'vue'
import type { SwitchProps } from '@/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'md',
  state: 'default',
  padded: true,
  disabled: false,
  readonly: false,
  required: false
})

const modelValue = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  //'update:modelValue': [boolean] 
  change: [value: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const attrs = useAttrs()
const switchId = computed(() => attrs.id as string || undefined)
// Transmet tous les attrs sauf id (id est appliqué sur l'élément interactif via switchId)
const containerAttrs = computed(() => {
  const { id: _id, ...rest } = attrs as Record<string, unknown>
  return rest
})
const switchRef = ref<HTMLButtonElement>()

// Classes CSS - reste identique
const containerClasses = computed(() => [
  'su-switch-container',
  `su-switch-container--${props.size}`,
  `su-switch-container--${props.state}`,
  {
    'su-switch-container--disabled': props.disabled,
    'su-switch-container--readonly': props.readonly,
    'su-switch-container--has-labels': props.leftLabel || props.rightLabel,
    'su-switch-container--centered': props.leftLabel && props.rightLabel
  }
])

const switchClasses = computed(() => [
  'su-switch',
  `su-switch--${props.size}`,
  `su-switch--${props.state}`,
  {
    'su-switch--checked': modelValue.value,
    'su-switch--flush': !props.padded,
    'su-switch--disabled': props.disabled,
    'su-switch--readonly': props.readonly
  }
])

// Attributs ARIA - reste identique
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'switch',
    'aria-checked': modelValue.value
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.readonly) attrs['aria-readonly'] = 'true'
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined) attrs['aria-required'] = props.ariaRequired
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
})

// Gestionnaires d'événements - reste identique
const handleToggle = () => {
  if (props.disabled || props.readonly) return
  
  const newValue = !modelValue.value
  modelValue.value = newValue
  emit('change', newValue)
}

// Entrée et Espace déclenchent nativement le clic du <button>
const handleKeydown = (event: KeyboardEvent) => emit('keydown', event)

const handleFocus = (event: FocusEvent) => emit('focus', event)
const handleBlur = (event: FocusEvent) => emit('blur', event)

defineExpose({
  switchRef,
  handleToggle
})
</script>
<template>
  <div
    :class="containerClasses"
    v-bind="containerAttrs"
  >
    <!-- Label gauche -->
    <span 
      v-if="leftLabel" 
      class="su-switch-side-label su-switch-side-label--left"
      :class="{
        'su-switch-side-label--active': !modelValue,
        'su-switch-side-label--disabled': disabled
      }"
    >
      {{ leftLabel }}
    </span>
    <!-- Switch : un <button> est « labelable », <label for> lui donne donc son nom -->
    <button
      :id="switchId"
      ref="switchRef"
      type="button"
      :class="switchClasses"
      :disabled="disabled"
      v-bind="ariaAttributes"
      @click="handleToggle"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <!-- Track -->
      <span class="su-switch-track">
        <!-- Thumb -->
        <span class="su-switch-thumb">
          <!-- Indicateur visuel optionnel -->
          <!-- Icône seulement si elle est fournie (leftIcon / rightIcon) -->
          <span
            v-if="modelValue ? rightIcon : leftIcon"
            class="su-switch-indicator"
          >
            <component
              :is="modelValue ? rightIcon : leftIcon"
              :class="['su-switch-icon', `su-switch-icon--${modelValue ? 'check' : 'cross'}`]"
              aria-hidden="true"
            />
          </span>
        </span>
      </span>
    </button>

    <!-- Label droite -->
    <span 
      v-if="rightLabel" 
      class="su-switch-side-label su-switch-side-label--right"
      :class="{
        'su-switch-side-label--active': modelValue,
        'su-switch-side-label--disabled': disabled
      }"
    >
      {{ rightLabel }}
    </span>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SWITCH — piste fine, pastille qui s'étire à l'appui.
// La taille de la pastille (--_su-thumb) pilote tout le reste.
// ============================================================

.su-switch-container {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;

  &--centered {
    justify-content: center;
  }
}

.su-switch-side-label {
  font-size: var(--su-font-size-base);
  font-weight: var(--su-font-weight-medium);
  color: var(--su-text-tertiary);
  user-select: none;

  @include transition(color);

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  &--active {
    color: var(--su-text-primary);
  }

  &--disabled {
    opacity: var(--su-opacity-disabled);
    cursor: not-allowed;
  }
}

.su-switch {
  // Réinitialisation du <button> natif
  appearance: none;
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  box-sizing: border-box;

  // --_su-switch-pad : marge entre la pastille et le bord de la piste
  --_su-switch-pad: 2px;

  width: calc(var(--_su-thumb) * 2 - 4px + 2 * var(--_su-switch-pad));
  height: calc(var(--_su-thumb) + 2 * var(--_su-switch-pad));
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-full);
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  outline: none;

  @include touch-target-overlay;

  // Tailles : 20px sur mobile puis 16px dès `sm` (md)
  &--sm {
    --_su-thumb: 0.875rem;
  }

  &--md {
    --_su-thumb: 1.25rem;

    @include up('sm') {
      --_su-thumb: 1rem;
    }
  }

  &--lg {
    --_su-thumb: 1.5rem;

    @include up('sm') {
      --_su-thumb: 1.25rem;
    }
  }

  // Sans marge : la pastille affleure le bord de la piste
  &--flush {
    --_su-switch-pad: 0px;
  }

  &:focus-visible {
    @include focus-ring;
  }

  // États de validation : couleur de la piste cochée
  @each $state in ('error', 'success', 'warning') {
    &--#{$state} {
      --_su-switch-on: var(--su-state-#{$state});
    }
  }

  &--disabled {
    @include disabled-state;
  }

  &--readonly {
    cursor: default;
  }
}

.su-switch-track {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;

  // Piste décochée assez marquée pour rester lisible sur tous les fonds
  background-color: var(--su-border-strong);

  @include transition(background-color);

  .su-switch--checked & {
    background-color: var(--_su-switch-on, var(--su-primary-default));
  }
}

.su-switch-thumb {
  position: absolute;
  top: var(--_su-switch-pad);
  left: var(--_su-switch-pad);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--_su-thumb);
  height: var(--_su-thumb);
  border-radius: var(--_su-thumb);
  background-color: var(--su-bg-surface);
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%), 0 0 0 0.5px rgb(0 0 0 / 4%);
  transform-origin: left center;

  @include transition(translate, scale, transform-origin);

  .su-switch--checked & {
    translate: calc(var(--_su-thumb) - 4px) 0;
    transform-origin: right center;
  }

  // À l'appui, la pastille s'étire légèrement
  .su-switch:active:not(.su-switch--disabled, .su-switch--readonly) & {
    scale: 1.1 1;
  }

  [dir='rtl'] & {
    left: auto;
    right: var(--_su-switch-pad);
    transform-origin: right center;
  }

  [dir='rtl'] .su-switch--checked & {
    translate: calc((var(--_su-thumb) - 4px) * -1) 0;
    transform-origin: left center;
  }
}

.su-switch-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.su-switch-icon {
  width: 70%;
  height: 70%;
  color: var(--su-text-tertiary);

  &--check {
    color: var(--_su-switch-on, var(--su-primary-default));
  }
}
</style>
