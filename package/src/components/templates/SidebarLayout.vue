<script setup lang="ts">
import { computed } from 'vue'
import type { SidebarLayoutProps } from '@/types'

// Deux colonnes : une barre latérale de largeur fixe et un contenu
// fluide (documentation, tableaux de bord, administration).
// Empilées sous le point de rupture, dans l'ordre du DOM.

const props = withDefaults(defineProps<SidebarLayoutProps>(), {
  sidebarPosition: 'start',
  sidebarWidth: '16rem',
  breakpoint: 'md',
  stickySidebar: false,
  stickyOffset: '0px',
  sidebarTag: 'aside',
  sidebarLabel: undefined,
  gap: 'lg'
})

const slots = defineSlots<{
  /** Navigation, filtres, sommaire… */
  sidebar?(): any
  /** Contenu principal */
  default?(): any
}>()

// Les slots ne sont pas réactifs : présence évaluée à chaque rendu
const hasSidebar = () => !!slots.sidebar

// L'ordre du DOM suit l'ordre visuel : lecture et tabulation cohérentes
const zones = computed(() =>
  props.sidebarPosition === 'end' ? ['content', 'sidebar'] as const : ['sidebar', 'content'] as const
)

const classes = () => [
  'su-sidebar-layout',
  `su-sidebar-layout--${props.sidebarPosition}`,
  `su-sidebar-layout--from-${props.breakpoint}`,
  `su-sidebar-layout--gap-${props.gap}`,
  {
    'su-sidebar-layout--has-sidebar': hasSidebar(),
    'su-sidebar-layout--sticky': props.stickySidebar
  }
]

const styles = computed(() => ({
  '--su-sidebar-layout-width': props.sidebarWidth,
  '--su-sidebar-layout-sticky-offset': props.stickyOffset
}))
</script>

<template>
  <div
    :class="classes()"
    :style="styles"
  >
    <div class="su-sidebar-layout__inner">
      <template
        v-for="zone in zones"
        :key="zone"
      >
        <component
          :is="sidebarTag"
          v-if="zone === 'sidebar' && hasSidebar()"
          class="su-sidebar-layout__sidebar"
          :aria-label="sidebarTag !== 'div' ? sidebarLabel : undefined"
        >
          <slot name="sidebar" />
        </component>

        <div
          v-else-if="zone === 'content'"
          class="su-sidebar-layout__content"
        >
          <slot />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SIDEBAR — barre latérale fixe + contenu fluide ; empilés
// (ordre du DOM) sous le point de rupture du conteneur
// ============================================================

.su-sidebar-layout {
  @include layout-container(su-sidebar-layout);

  &__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--su-layout-gap);
  }

  &__sidebar,
  &__content {
    @include layout-region;
  }
}

@each $bp in (sm, md, lg, xl) {
  .su-sidebar-layout--from-#{$bp}.su-sidebar-layout--has-sidebar {
    @include container-up($bp, su-sidebar-layout) {
      .su-sidebar-layout__inner {
        grid-template-columns: var(--su-sidebar-layout-width) minmax(0, 1fr);
      }
    }

    &.su-sidebar-layout--end {
      @include container-up($bp, su-sidebar-layout) {
        .su-sidebar-layout__inner {
          grid-template-columns: minmax(0, 1fr) var(--su-sidebar-layout-width);
        }
      }
    }

    // Barre collante, avec son propre défilement si elle dépasse l'écran
    &.su-sidebar-layout--sticky {
      @include container-up($bp, su-sidebar-layout) {
        .su-sidebar-layout__sidebar {
          position: sticky;
          inset-block-start: var(--su-sidebar-layout-sticky-offset);
          align-self: start;
          max-block-size: calc(100svh - var(--su-sidebar-layout-sticky-offset));
          overflow-y: auto;
          overscroll-behavior: contain;
          scrollbar-width: thin;
        }
      }
    }
  }
}
</style>
