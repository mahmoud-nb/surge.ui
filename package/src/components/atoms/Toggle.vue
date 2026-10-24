<script setup lang="ts">
import { computed } from 'vue'
import type { ToggleProps } from '@/types'

const props = withDefaults(defineProps<ToggleProps>(), {
  size: 'md',
  variant: 'default',
  disabled: false
})

const modelValue = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  change: [value: boolean]
}>()

const classes = computed(() => [
  'su-toggle',
  `su-toggle--${props.size}`,
  `su-toggle--${props.variant}`,
  // Sans `radius`, le rayon des contrôles s'applique
  props.radius && `su-toggle--radius-${props.radius}`,
  {
    'su-toggle--active': modelValue.value,
    'su-toggle--disabled': props.disabled,
    'su-toggle--icon-only': props.icon && !props.label
  }
])

const currentIcon = computed(() => {
  if (modelValue.value && props.activeIcon) return props.activeIcon
  return props.icon
})

const handleToggle = () => {
  if (props.disabled) return
  const newValue = !modelValue.value
  modelValue.value = newValue
  emit('change', newValue)
}


const ariaAttributes = computed(() => {
  const attrs: Record<string, unknown> = {
    role: 'switch',
    'aria-checked': modelValue.value
  }
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  else if (props.label) attrs['aria-label'] = props.label
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  return attrs
})
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    v-bind="ariaAttributes"
    @click="handleToggle"
  >
    <component
      v-if="currentIcon"
      :is="currentIcon"
      class="su-toggle__icon"
      aria-hidden="true"
    />
    <span v-if="label" class="su-toggle__label">{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use '../../styles/abstracts' as *;

// ============================================================
// TOGGLE — bouton bascule sur la base de bouton partagée
//   default : transparent, voile neutre une fois activé
//   outline : surface de contrôle, voile neutre une fois activé
//   ghost   : transparent, teinte primaire une fois activé
// ============================================================

.su-toggle {
  @include button-base;

  color: var(--su-text-secondary);

  &--sm { @include control-size('sm'); }
  &--md { @include control-size('md'); }
  &--lg { @include control-size('lg'); }

  &--icon-only {
    padding-inline: 0;
    aspect-ratio: 1;
  }

  // Rayons explicites (prop `radius`)
  @include use-border-radius;

  &:hover:not(:disabled) {
    color: var(--su-text-primary);
  }

  // ### Variantes

  &--default,
  &--ghost {
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--su-bg-accent);
    }
  }

  &--default.su-toggle--active {
    background-color: with-alpha(text-primary, 8%);
    color: var(--su-text-primary);
  }

  &--outline {
    @include button-variant('outline');

    color: var(--su-text-secondary);

    &.su-toggle--active {
      background-image: linear-gradient(with-alpha(text-primary, 6%), with-alpha(text-primary, 6%));
      color: var(--su-text-primary);
    }
  }

  &--ghost.su-toggle--active {
    background-color: with-alpha(primary-default, 10%);
    color: var(--su-primary-default);

    &:hover:not(:disabled) {
      background-color: with-alpha(primary-default, 14%);
    }
  }

  &--disabled {
    @include button-disabled;
  }
}

.su-toggle__icon {
  @include button-icon;
}

.su-toggle--active .su-toggle__icon {
  opacity: 1;
}

.su-toggle__label {
  flex-shrink: 0;
}
</style>
