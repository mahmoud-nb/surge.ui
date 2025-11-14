<script setup lang="ts">
import type { PanelProps } from '@/types'

withDefaults(defineProps<PanelProps>(), {
  tag: 'div',
  radius: 'sm',
  bordered: false,
  elevated: false,
  variant: 'default'
})
</script>

<template>
  <component
    :is="tag"
    class="su-panel"
    :class="[
      `su-panel--${variant}`,
      { 'su-panel--bordered': bordered, 'su-panel--elevated': elevated }
    ]"
    role="region"
  >
    <header
      v-if="$slots.head"
      class="su-panel__head"
    >
      <slot name="head" />
    </header>

    <div class="su-panel__body">
      <slot />
    </div>

    <footer
      v-if="$slots.footer"
      class="su-panel__footer"
    >
      <slot name="footer" />
    </footer>
  </component>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;

.su-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--su-text-primary-color);
  background-color: var(--su-bg-global-color);
  border-radius: $su-default-border-radius;
  padding: $spacing-4;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &--bordered {
    border: 1px solid $gray-200;
  }

  &--elevated {
    box-shadow: $shadow-md;
  }

  &--subtle {
    background-color: $gray-100;
  }

  &--highlight {
    background-color: $primary-50;
  }

  [data-theme='dark'] &, .dark & {    
    &--subtle {
      background-color: $gray-700;
    }
    &--highlight {
      background-color: rgba($primary-600, 0.15);
    }
  }
}
</style>
