<script setup lang="ts">
import { computed } from 'vue'
import type { KbdProps } from '@/types'

// ============================================================
// KBD — touche ou raccourci clavier. Un raccourci suit la structure
// HTML recommandée : <kbd><kbd>Ctrl</kbd>+<kbd>K</kbd></kbd>.
// ============================================================

const props = withDefaults(defineProps<KbdProps>(), {
  separator: '+',
  size: 'md'
})

const isCombo = computed(() => !!props.keys?.length)

const classes = computed(() => [
  'su-kbd',
  `su-kbd--${props.size}`,
  { 'su-kbd--combo': isCombo.value }
])
</script>

<template>
  <kbd :class="classes">
    <template v-if="isCombo">
      <template
        v-for="(key, index) in keys"
        :key="index"
      >
        <span
          v-if="index > 0"
          class="su-kbd__separator"
        >{{ separator }}</span>
        <kbd class="su-kbd__key">{{ key }}</kbd>
      </template>
    </template>
    <slot v-else />
  </kbd>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// KBD — touche en relief discret : bordure, ombre basse de 1px
// ============================================================

@mixin kbd-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: var(--_su-kbd-size);
  height: var(--_su-kbd-size);
  padding: 0 0.3125rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-sm);
  background-color: var(--su-bg-surface);
  box-shadow: 0 1px 0 var(--su-border-alpha);
  color: var(--su-text-secondary);
  font-family: inherit;
  font-size: var(--_su-kbd-font);
  font-weight: var(--su-font-weight-medium);
  line-height: 1;
  white-space: nowrap;

  @include high-contrast {
    border-color: var(--su-border-strong);
  }
}

.su-kbd {
  --_su-kbd-size: 1.25rem;
  --_su-kbd-font: var(--su-font-size-xs);

  @include kbd-key;

  vertical-align: middle;

  &--sm {
    --_su-kbd-size: 1.125rem;
    --_su-kbd-font: 0.6875rem;
  }

  &--lg {
    --_su-kbd-size: 1.5rem;
    --_su-kbd-font: var(--su-font-size-sm);
  }

  // Raccourci : le conteneur n'a pas de relief, chaque touche en a un
  &--combo {
    gap: 0.25rem;
    min-width: 0;
    height: auto;
    padding: 0;
    border: 0;
    background: none;
    box-shadow: none;
  }
}

.su-kbd__key {
  @include kbd-key;
}

.su-kbd__separator {
  color: var(--su-text-tertiary);
  font-size: var(--_su-kbd-font);
}
</style>
