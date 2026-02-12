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
@use '../../styles/foundations/colors' as *;

.su-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--su-text-primary);
  background-color: var(--su-bg-canvas);
  border-radius: var(--su-radius-md);
  padding: var(--su-spacing-4);
  transition: background-color var(--su-duration-normal) ease, box-shadow var(--su-duration-normal) ease;

  &--bordered {
    border: 1px solid var(--su-border-default);
  }

  &--elevated {
    box-shadow: var(--su-shadow-md);
  }

  &--subtle {
    background-color: var(--su-bg-hover);
  }

  &--highlight {
    background-color: var(--su-bg-selected);
  }

  [data-theme='dark'] &, .dark & {    
    &--subtle {
      background-color: var(--su-bg-hover);
    }

    &--highlight {
      background-color: var(--su-bg-selected);
    }
  }
}
</style>
