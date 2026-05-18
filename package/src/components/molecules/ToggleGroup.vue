<script setup lang="ts">
import { computed } from 'vue'
import Toggle from '../atoms/Toggle.vue'
import type { ToggleGroupProps } from '@/types'

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  mode: 'multi',
  size: 'md',
  variant: 'default',
  radius: 'md',
  gap: 'md',
  orientation: 'horizontal',
  disabled: false
})

const modelValue = defineModel<(string | number)[]>({ default: () => [] })

const emit = defineEmits<{
  change: [value: (string | number)[]]
  select: [item: string | number, active: boolean]
}>()

const containerClasses = computed(() => [
  'su-toggle-group',
  `su-toggle-group--gap-${props.gap}`,
  `su-toggle-group--${props.orientation}`,
  {
    'su-toggle-group--connected': props.gap === 'none'
  }
])

const containerRole = computed(() =>
  props.mode === 'exclusive' ? 'radiogroup' : 'group'
)

const ariaAttributes = computed(() => {
  const attrs: Record<string, unknown> = {
    role: containerRole.value
  }
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  return attrs
})

const isItemActive = (value: string | number): boolean => {
  return modelValue.value.includes(value)
}

const handleItemToggle = (value: string | number) => {
  if (props.disabled) return

  let newValue: (string | number)[]

  if (props.mode === 'exclusive') {
    newValue = isItemActive(value) ? [] : [value]
  } else {
    newValue = isItemActive(value)
      ? modelValue.value.filter(v => v !== value)
      : [...modelValue.value, value]
  }

  modelValue.value = newValue
  emit('select', value, !isItemActive(value))
  emit('change', newValue)
}
</script>

<template>
  <div
    :class="containerClasses"
    v-bind="ariaAttributes"
  >
    <Toggle
      v-for="item in items"
      :key="item.value"
      :model-value="isItemActive(item.value)"
      :label="item.label"
      :icon="item.icon"
      :active-icon="item.activeIcon"
      :size="size"
      :variant="variant"
      :radius="radius"
      :disabled="disabled || item.disabled"
      :aria-label="item.label"
      class="su-toggle-group__item"
      @change="handleItemToggle(item.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;

.su-toggle-group {
  display: inline-flex;
  align-items: center;

  &--horizontal { flex-direction: row; }
  &--vertical { flex-direction: column; }

  // Gap
  &--gap-sm { gap: 0.25rem; }
  &--gap-md { gap: 0.5rem; }
  &--gap-lg { gap: 0.75rem; }
  &--gap-none { gap: 0; }

  // Connected mode (gap=none)
  &--connected {
    &.su-toggle-group--horizontal {
      .su-toggle-group__item {
        &:not(:first-child) {
          margin-left: -1px;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }

        &:not(:last-child) {
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }

        &:focus-visible,
        &:hover:not(:disabled) {
          z-index: 1;
        }
      }
    }

    &.su-toggle-group--vertical {
      .su-toggle-group__item {
        width: 100%;

        &:not(:first-child) {
          margin-top: -1px;
          border-top-left-radius: 0 !important;
          border-top-right-radius: 0 !important;
        }

        &:not(:last-child) {
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }

        &:focus-visible,
        &:hover:not(:disabled) {
          z-index: 1;
        }
      }
    }
  }
}

.su-toggle-group__item {
  position: relative;
}
</style>
