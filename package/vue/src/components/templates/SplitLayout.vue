<script setup lang="ts">
import { computed } from 'vue'
import type { SplitLayoutProps } from '@/types'

// Deux zones côte à côte : écran partagé (visuel + argumentaire, A vs B)
// ou composition asymétrique (ratio 2:1, 3:2…). Empilées sous le point
// de rupture. Plusieurs SplitLayout alternant `reverse` forment un
// parcours en Z (zigzag de sections).

const props = withDefaults(defineProps<SplitLayoutProps>(), {
  ratio: '1:1',
  breakpoint: 'md',
  reverse: false,
  align: 'stretch',
  fullHeight: false,
  gap: 'none'
})

defineSlots<{
  /** Première zone (gauche en colonnes, ou droite avec `reverse`) */
  start?(): any
  /** Seconde zone */
  end?(): any
}>()

// '2:1' → minmax(0, 2fr) minmax(0, 1fr) ; les colonnes suivent l'ordre visuel
const columns = computed(() => {
  const [first, second] = props.ratio.split(':').map(Number)
  const valid = (n: number) => Number.isFinite(n) && n > 0
  const start = valid(first) ? first : 1
  const end = valid(second) ? second : 1
  const tracks = [`minmax(0, ${start}fr)`, `minmax(0, ${end}fr)`]
  return (props.reverse ? tracks.reverse() : tracks).join(' ')
})

const classes = computed(() => [
  'su-split-layout',
  `su-split-layout--from-${props.breakpoint}`,
  `su-split-layout--align-${props.align}`,
  `su-split-layout--gap-${props.gap}`,
  {
    'su-split-layout--reverse': props.reverse,
    'su-split-layout--full-height': props.fullHeight
  }
])
</script>

<template>
  <div
    :class="classes"
    :style="{ '--su-split-layout-columns': columns }"
  >
    <div class="su-split-layout__inner">
      <div class="su-split-layout__pane su-split-layout__pane--start">
        <slot name="start" />
      </div>
      <div class="su-split-layout__pane su-split-layout__pane--end">
        <slot name="end" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SPLIT — deux zones aux proportions réglables, empilées sous le
// point de rupture du conteneur
// ============================================================

.su-split-layout {
  @include layout-container(su-split-layout);

  &__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--su-layout-gap);
  }

  &__pane {
    @include layout-region;

    display: flex;
    flex-direction: column;
  }
}

@each $bp in (sm, md, lg, xl) {
  .su-split-layout--from-#{$bp} {
    @include container-up($bp, su-split-layout) {
      .su-split-layout__inner {
        grid-template-columns: var(--su-split-layout-columns);
      }
    }

    // Ordre visuel inversé en colonnes seulement : sur mobile, la zone
    // `start` (souvent le visuel) reste en premier
    &.su-split-layout--reverse {
      @include container-up($bp, su-split-layout) {
        .su-split-layout__pane--start {
          order: 1;
        }
      }
    }

    &.su-split-layout--full-height {
      @include container-up($bp, su-split-layout) {
        .su-split-layout__inner {
          min-block-size: 100svh;
        }
      }
    }

    @each $align, $value in (start: start, center: center, end: end, stretch: stretch) {
      &.su-split-layout--align-#{$align} {
        @include container-up($bp, su-split-layout) {
          .su-split-layout__inner {
            align-items: $value;
          }
        }
      }
    }
  }
}
</style>
