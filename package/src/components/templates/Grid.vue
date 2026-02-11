<script setup lang="ts">
import { computed, ref } from 'vue'
import type { GridProps } from '@/types'

const props = defineProps<GridProps>()

const emit = defineEmits<{
  (e: 'update:viewMode', value: 'grid' | 'list'): void
}>()

// Mode actuel (grid ou liste)
const currentView = ref(props.viewMode || 'grid')

const toggleView = () => {
  currentView.value = currentView.value === 'grid' ? 'list' : 'grid'
  emit('update:viewMode', currentView.value)
}

// Génération du style de grille
const gridStyle = computed(() => {
  const gapValue = typeof props.gap === 'number' ? `${props.gap}px` : props.gap || '1rem'
  const { mobile = 1, tablet = 2, miniDesktop = 3, desktop = 4 } = props.columns || {}

  return {
    '--su-grid-gap': gapValue,
    '--su-grid-cols-mobile': mobile,
    '--su-grid-cols-tablet': tablet,
    '--su-grid-cols-mini-desktop': miniDesktop,
    '--su-grid-cols-desktop': desktop,
  }
})
</script>

<template>
  <div
    class="su-grid-wrapper"
    :data-view="currentView"
    :style="gridStyle"
  >
    <header
      class="su-grid-header"
      aria-label="Affichage"
    >
      <button
        class="su-grid-toggle"
        :aria-pressed="currentView === 'grid'"
        @click="toggleView"
      >
        <span v-if="currentView === 'grid'">Afficher en liste</span>
        <span v-else>Afficher en grille</span>
      </button>
    </header>

    <div
      class="su-grid"
      role="list"
      :class="[`su-grid--${currentView}`]"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles2/main' as *;

.su-grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--su-spacing-4);
}

.su-grid-header {
  display: flex;
  justify-content: flex-end;
}

.su-grid-toggle {
  background: transparent;
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  padding: var(--su-spacing-2) var(--su-spacing-4);
  cursor: pointer;
  color: var(--su-text-primary);
  font-size: var(--su-font-size-base);
  font-weight: var(--su-font-weight-medium);
  transition: all var(--su-duration-normal) var(--su-ease-in-out);

  &:hover {
    background-color: var(--su-bg-hover);
    border-color: var(--su-border-strong);
  }

  &:focus-visible {
    outline: var(--su-focus-ring-width) solid var(--su-border-focus);
    outline-offset: var(--su-focus-ring-offset);
  }

  &:active {
    background-color: var(--su-bg-active);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.su-grid {
  display: grid;
  gap: var(--su-grid-gap);

  &--grid {
    grid-template-columns: repeat(var(--su-grid-cols-mobile), 1fr);

    @media (width >= 600px) {
      grid-template-columns: repeat(var(--su-grid-cols-tablet), 1fr);
    }

    @media (width >= 900px) {
      grid-template-columns: repeat(var(--su-grid-cols-mini-desktop), 1fr);
    }

    @media (width >= 1200px) {
      grid-template-columns: repeat(var(--su-grid-cols-desktop), 1fr);
    }
  }

  &--list {
    display: flex;
    flex-direction: column;
  }
}
</style>
