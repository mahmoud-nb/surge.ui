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
.su-grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.su-grid-header {
  display: flex;
  justify-content: flex-end;
}

.su-grid-toggle {
  background: none;
  border: 1px solid var(--su-border-color, #ccc);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: var(--su-text-primary, #111);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    background-color: var(--su-hover-bg, #f5f5f5);
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
