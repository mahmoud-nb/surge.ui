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

.su-grid-cell {
  &--bordered {
    border: 1px solid var(--su-border-color, #ddd);
  }

  // Radius
  @include use-border-radius();
  padding: 1rem;
  background: var(--su-bg-surface, #fff);
  color: var(--su-text-primary, #111);
  transition: background-color 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (prefers-color-scheme: dark) {
    background: var(--su-bg-surface-dark, #1f1f1f);
    color: var(--su-text-light, #f5f5f5);
  }

  &:focus-within {
    outline: 2px solid var(--su-focus-color, #2563eb);
    outline-offset: 2px;
  }
}
</style>
