<script setup lang="ts">
import { computed } from 'vue'
import type { ToggleProps } from '@/types'

const props = withDefaults(defineProps<ToggleProps>(), {
  size: 'md',
  variant: 'default',
  radius: 'md',
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
  `su-toggle--radius-${props.radius}`,
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

const handleKeydown = (event: KeyboardEvent) => {
  if (['Enter', ' '].includes(event.key)) {
    event.preventDefault()
    handleToggle()
  }
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
    :tabindex="disabled ? -1 : 0"
    v-bind="ariaAttributes"
    @click="handleToggle"
    @keydown="handleKeydown"
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
@use '../../styles/main' as *;

.su-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  cursor: pointer;
  border: 1px solid var(--su-border-default);
  background-color: var(--su-bg-surface);
  color: var(--su-text-secondary);
  font-family: inherit;
  font-weight: 500;
  line-height: 1;
  user-select: none;
  white-space: nowrap;
  @include transition(background-color, color, border-color, box-shadow);

  &:hover:not(:disabled) {
    background-color: var(--su-bg-surface-hover);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring;
  }

  // Sizes
  &--sm {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;

    .su-toggle__icon {
      width: 0.875rem;
      height: 0.875rem;
    }
  }

  &--md {
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;

    .su-toggle__icon {
      width: 1rem;
      height: 1rem;
    }
  }

  &--lg {
    padding: 0.625rem 1.125rem;
    font-size: 1rem;

    .su-toggle__icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  // Icon-only sizing
  &--icon-only {
    &.su-toggle--sm { padding: 0.375rem; }
    &.su-toggle--md { padding: 0.5rem; }
    &.su-toggle--lg { padding: 0.625rem; }
  }

  // Radius
  &--radius-none { border-radius: 0; }
  &--radius-sm { border-radius: 0.25rem; }
  &--radius-md { border-radius: 0.5rem; }
  &--radius-lg { border-radius: 0.75rem; }
  &--radius-xl { border-radius: 1rem; }
  &--radius-full { border-radius: 9999px; }

  // Variants
  &--default {
    &.su-toggle--active {
      background-color: var(--su-link-default);
      border-color: var(--su-link-default);
      color: var(--su-primary-text);

      &:hover:not(:disabled) {
        background-color: var(--su-link-hover);
        border-color: var(--su-link-hover);
      }
    }
  }

  &--outline {
    background-color: transparent;

    &.su-toggle--active {
      border-color: var(--su-link-default);
      color: var(--su-link-default);
      background-color: transparent;

      &:hover:not(:disabled) {
        background-color: rgb(var(--su-link-default-rgb) / 8%);
      }
    }
  }

  &--ghost {
    background-color: transparent;
    border-color: transparent;

    &.su-toggle--active {
      background-color: rgb(var(--su-link-default-rgb) / 12%);
      color: var(--su-link-default);
      border-color: transparent;

      &:hover:not(:disabled) {
        background-color: rgb(var(--su-link-default-rgb) / 18%);
      }
    }

    &:hover:not(:disabled) {
      background-color: var(--su-bg-surface-hover);
    }
  }

  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Reduced motion
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.su-toggle__icon {
  flex-shrink: 0;
}

.su-toggle__label {
  flex-shrink: 0;
}
</style>
