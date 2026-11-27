<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useId, watch } from 'vue'
import { Bars3Icon, ChevronDoubleLeftIcon } from '@heroicons/vue/24/outline'
import type { AppShellProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import Button from '../atoms/Button.vue'
import SkipLink from '../atoms/SkipLink.vue'
import Dialog from '../organisms/Dialog.vue'

// ============================================================
// APP SHELL — coquille d'une application : barre latérale, barre du
// haut, contenu principal, pied de page, lien d'évitement.
// - Dès le point de rupture (écran) : barre latérale fixe, réductible
//   en icônes (v-model:collapsed).
// - En dessous : la barre latérale s'ouvre dans un tiroir (Dialog
//   modal, focus piégé, Échap) depuis le bouton menu (v-model:open).
//   Un lien suivi dans le tiroir le ferme.
// - Repères : <header> (banner), <main>, <footer> (contentinfo) ; la
//   navigation (<nav>) vient du contenu de la barre latérale (SuNavMenu).
// ============================================================

const props = withDefaults(defineProps<AppShellProps>(), {
  breakpoint: 'lg',
  sidebarWidth: '16rem',
  collapsedWidth: '4.5rem',
  collapsible: false,
  stickyHeader: true,
  skipLink: true
})

/** Barre latérale réduite en icônes (grand écran) */
const collapsed = defineModel<boolean>('collapsed', { default: false })
/** Tiroir ouvert (petit écran) */
const open = defineModel<boolean>('open', { default: false })

const slots = defineSlots<{
  /** Logo, nom de l'application */
  brand?(props: { collapsed: boolean }): any
  /** Barre du haut : recherche, actions, menu utilisateur… */
  header?(props: { openMenu: () => void }): any
  /** Navigation (SuNavMenu) */
  sidebar?(props: { collapsed: boolean; close: () => void }): any
  /** Bas de la barre latérale : compte, réglages… */
  'sidebar-footer'?(props: { collapsed: boolean }): any
  /** Contenu principal */
  default?(): any
  footer?(): any
}>()

const { t } = useLocale()
const texts = computed(() => ({
  skipLink: props.skipLinkLabel ?? t('skipLink.label'),
  menu: props.menuLabel ?? t('appShell.menu'),
  drawer: props.drawerLabel ?? t('appShell.drawer'),
  collapse: props.collapseLabel ?? t('appShell.collapse')
}))

const mainId = `su-app-shell-main-${useId()}`

const openMenu = () => {
  open.value = true
}
const closeMenu = () => {
  open.value = false
}

// Un lien suivi dans le tiroir le ferme (navigation dans l'application)
const handleDrawerClick = (event: MouseEvent) => {
  if ((event.target as Element | null)?.closest('a[href]')) closeMenu()
}

// Passage au grand écran : le tiroir n'a plus lieu d'être
const BREAKPOINTS = { md: 768, lg: 1024, xl: 1280 } as const
let query: MediaQueryList | undefined
const handleQuery = (event: MediaQueryListEvent) => {
  if (event.matches) closeMenu()
}
const listen = () => {
  query?.removeEventListener('change', handleQuery)
  query = window.matchMedia(`(min-width: ${BREAKPOINTS[props.breakpoint]}px)`)
  query.addEventListener('change', handleQuery)
}
onMounted(listen)
watch(() => props.breakpoint, listen)
onBeforeUnmount(() => query?.removeEventListener('change', handleQuery))

// Les slots ne sont pas réactifs : présence évaluée à chaque rendu
const classes = () => [
  'su-app-shell',
  `su-app-shell--from-${props.breakpoint}`,
  {
    'su-app-shell--has-sidebar': !!slots.sidebar,
    'su-app-shell--collapsed': collapsed.value,
    'su-app-shell--sticky-header': props.stickyHeader
  }
]

const styles = computed(() => ({
  '--su-app-shell-sidebar-width': collapsed.value ? props.collapsedWidth : props.sidebarWidth
}))
</script>

<template>
  <div
    :class="classes()"
    :style="styles"
  >
    <SkipLink
      v-if="skipLink"
      :target="mainId"
      :label="texts.skipLink"
    />

    <!-- Barre latérale (grand écran) -->
    <div
      v-if="$slots.sidebar"
      class="su-app-shell__sidebar"
    >
      <div
        v-if="$slots.brand"
        class="su-app-shell__brand"
      >
        <slot
          name="brand"
          :collapsed="collapsed"
        />
      </div>

      <div class="su-app-shell__sidebar-body">
        <slot
          name="sidebar"
          :collapsed="collapsed"
          :close="closeMenu"
        />
      </div>

      <div
        v-if="$slots['sidebar-footer'] || collapsible"
        class="su-app-shell__sidebar-footer"
      >
        <slot
          name="sidebar-footer"
          :collapsed="collapsed"
        />
        <Button
          v-if="collapsible"
          class="su-app-shell__collapse"
          variant="ghost"
          size="sm"
          :icon="ChevronDoubleLeftIcon"
          icon-display="only"
          :aria-label="texts.collapse"
          :aria-pressed="collapsed"
          @click="collapsed = !collapsed"
        />
      </div>
    </div>

    <header
      v-if="$slots.header || $slots.sidebar || $slots.brand"
      class="su-app-shell__header"
    >
      <Button
        v-if="$slots.sidebar"
        class="su-app-shell__menu-button"
        variant="ghost"
        :icon="Bars3Icon"
        icon-display="only"
        :aria-label="texts.menu"
        :aria-expanded="open"
        aria-haspopup="dialog"
        @click="openMenu"
      />
      <div
        v-if="$slots.brand"
        class="su-app-shell__header-brand"
      >
        <slot
          name="brand"
          :collapsed="false"
        />
      </div>
      <div class="su-app-shell__header-content">
        <slot
          name="header"
          v-bind="{ openMenu }"
        />
      </div>
    </header>

    <main
      :id="mainId"
      class="su-app-shell__main"
      tabindex="-1"
    >
      <slot />
    </main>

    <footer
      v-if="$slots.footer"
      class="su-app-shell__footer"
    >
      <slot name="footer" />
    </footer>

    <!-- Tiroir (petit écran) : même contenu, jamais réduit -->
    <Dialog
      v-if="$slots.sidebar"
      v-model="open"
      class="su-app-shell__drawer"
      display="start"
      width="min(20rem, 85vw)"
      :aria-label="texts.drawer"
    >
      <div
        class="su-app-shell__drawer-body"
        @click="handleDrawerClick"
      >
        <div
          v-if="$slots.brand"
          class="su-app-shell__drawer-brand"
        >
          <slot
            name="brand"
            :collapsed="false"
          />
        </div>
        <slot
          name="sidebar"
          :collapsed="false"
          :close="closeMenu"
        />
        <slot
          name="sidebar-footer"
          :collapsed="false"
        />
      </div>
    </Dialog>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// APP SHELL — une colonne (barre du haut, contenu, pied) sous le
// point de rupture de l'écran ; au-delà, barre latérale collante
// à gauche (début de ligne en RTL) sur toute la hauteur
// ============================================================

.su-app-shell {
  display: grid;
  grid-template:
    'header' auto
    'main' 1fr
    'footer' auto / minmax(0, 1fr);
  min-block-size: 100svh;
  background-color: var(--su-bg-canvas);

  &__sidebar {
    display: none;
    grid-area: sidebar;
  }

  &__header {
    display: flex;
    grid-area: header;
    align-items: center;
    gap: $spacing-3;
    min-block-size: 3.5rem;
    padding-inline: $spacing-4;
    border-block-end: 1px solid var(--su-border-subtle);
    background-color: var(--su-bg-canvas);
  }

  &--sticky-header &__header {
    position: sticky;
    inset-block-start: 0;
    z-index: var(--su-z-sticky);
  }

  &__header-brand {
    display: flex;
    align-items: center;
    min-inline-size: 0;
  }

  &__header-content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    gap: $spacing-3;
    min-inline-size: 0;
  }

  &__main {
    grid-area: main;
    min-inline-size: 0;
    padding: $spacing-6 $spacing-4;

    // Cible du lien d'évitement : pas d'anneau au focus programmatique
    &:focus {
      outline: none;
    }
  }

  &__footer {
    grid-area: footer;
    padding: $spacing-4;
    border-block-start: 1px solid var(--su-border-subtle);
    color: var(--su-text-secondary);
    font-size: var(--su-font-size-sm);
  }

  &__brand {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    min-block-size: 3.5rem;
    padding-inline: $spacing-4;
    border-block-end: 1px solid var(--su-border-subtle);
  }

  &__sidebar-body {
    flex: 1;
    min-block-size: 0;
    padding: $spacing-3;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }

  &__sidebar-footer {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-2;
    padding: $spacing-3;
    border-block-start: 1px solid var(--su-border-subtle);
  }

  // Flèche du bouton de réduction : vers le début de ligne, retournée une fois réduite
  &__collapse .su-button__icon {
    @include transition(rotate);
  }

  &__collapse:dir(rtl) .su-button__icon {
    scale: -1 1;
  }

  &__collapse[aria-pressed='true'] .su-button__icon {
    rotate: 180deg;
  }

  &--collapsed {
    .su-app-shell__brand,
    .su-app-shell__sidebar-footer {
      justify-content: center;
      padding-inline: $spacing-2;
    }

    .su-app-shell__sidebar-footer {
      flex-direction: column;
    }

    .su-app-shell__sidebar-body {
      padding-inline: $spacing-2;
    }
  }

  &__drawer-body {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__drawer-brand {
    display: flex;
    align-items: center;
    min-block-size: 2.5rem;
    padding-inline-end: $spacing-8;
  }
}

@include up(md) {
  .su-app-shell__main {
    padding: $spacing-8;
  }
}

@each $bp in (md, lg, xl) {
  @include up($bp) {
    .su-app-shell--from-#{$bp}.su-app-shell--has-sidebar {
      grid-template:
        'sidebar header' auto
        'sidebar main' 1fr
        'sidebar footer' auto / var(--su-app-shell-sidebar-width) minmax(0, 1fr);

      .su-app-shell__sidebar {
        position: sticky;
        inset-block-start: 0;
        display: flex;
        flex-direction: column;
        block-size: 100svh;
        border-inline-end: 1px solid var(--su-border-subtle);
        background-color: var(--su-bg-surface);
      }

      .su-app-shell__menu-button,
      .su-app-shell__header-brand {
        display: none;
      }
    }
  }
}
</style>
