<script setup lang="ts">
import { computed } from 'vue'
import { GridCellProps } from '@/types'

const props = withDefaults(defineProps<GridCellProps>(), {
  bordered: false,
  radius: 'none'
})

// Styles personnalisés
const customStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor
    styles.borderColor = props.backgroundColor
  }
  
  return styles
})
</script>

<template>
  <div
    :class="[
      'su-grid-cell', 
      bordered && 'su-grid-cell--bordered',
      radius && `su-grid-cell--radius-${radius}`
    ]" 
    role="listitem"
    :style="customStyles"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;
@use '../../styles/foundations/colors' as *;

.su-grid-cell {
  padding: var(--su-spacing-4);
  background: var(--su-bg-surface);
  color: var(--su-text-primary);
  transition: all var(--su-duration-normal) var(--su-ease-in-out);
  border-radius: var(--su-radius-md);

  @include use-border-radius;

  &--bordered {
    border: 1px solid var(--su-border-default);
  }

  &:hover {
    box-shadow: var(--su-shadow-md);
  }

  &:focus-within {
    outline: var(--su-focus-ring-width) solid var(--su-border-focus);
    outline-offset: var(--su-focus-ring-offset);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
</style>
