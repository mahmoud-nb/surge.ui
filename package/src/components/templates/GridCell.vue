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
@use '../../styles/abstracts' as *;

.su-grid-cell {
  box-sizing: border-box;
  padding: $spacing-4;
  border: 1px solid transparent;
  border-radius: var(--su-radius-control);
  background-color: var(--su-bg-surface);
  background-clip: padding-box;
  color: var(--su-text-primary);

  @include transition(border-color, box-shadow);
  @include use-border-radius;

  &--bordered {
    border-color: var(--su-border-alpha);
    box-shadow: var(--su-shadow-control);
  }

  &:focus-within {
    @include focus-ring-field;
  }
}
</style>
