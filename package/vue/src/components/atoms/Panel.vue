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
@use '../../styles/abstracts' as *;

// ============================================================
// PANEL — bloc de contenu sur fond doux, variantes bordée,
// surélevée, discrète et mise en avant
// ============================================================

.su-panel {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  box-sizing: border-box;
  padding: $spacing-4;
  border: 1px solid transparent;
  border-radius: var(--su-radius-xl);
  background-color: var(--su-bg-canvas);
  background-clip: padding-box;
  color: var(--su-text-primary);

  @include transition(background-color, border-color, box-shadow);

  &--bordered {
    border-color: var(--su-border-alpha);
    background-color: var(--su-bg-surface);
  }

  &--elevated {
    border-color: var(--su-border-alpha);
    background-color: var(--su-bg-surface);
    box-shadow: var(--su-shadow-popover);
  }

  &--subtle {
    background-color: var(--su-bg-muted);
  }

  &--highlight {
    border-color: with-alpha(primary-default, 20%);
    background-color: with-alpha(primary-default, 6%);
  }
}
</style>
