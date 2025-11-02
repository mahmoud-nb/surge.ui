<script setup lang="ts">
import type { Radius } from '@/types/index'

export interface PanelProps {
  tag?: 'div' | 'section' | 'article'
  radius?: Radius
  bordered?: boolean
  elevated?: boolean
  variant?: 'default' | 'subtle' | 'highlight'
}

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
    <header v-if="$slots.head" class="su-panel__head">
      <slot name="head" />
    </header>

    <div class="su-panel__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="su-panel__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<style lang="scss" scoped>
@use '../../styles/variables' as *;

.su-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: $gray-50;
  border-radius: $border-radius-md;
  padding: $spacing-4;
  color: $text-primary;
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

  [data-theme='dark'] & {
    background-color: $gray-800;
    color: $text-primary-dark;
    &--subtle {
      background-color: $gray-700;
    }
    &--highlight {
      background-color: rgba($primary-600, 0.15);
    }
  }
}
</style>
