<script setup lang="ts">
import { computed } from 'vue'
import type { SkipLinkProps } from '@/types'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// SKIP LINK — premier élément atteint au clavier : mène au contenu
// principal sans repasser par l'en-tête et la navigation (WCAG 2.4.1).
// Invisible tant qu'il n'a pas le focus clavier. Le focus est donné
// à la cible par programme : ne dépend pas du routage par ancre (#).
// ============================================================

const props = withDefaults(defineProps<SkipLinkProps>(), {
  target: 'main-content'
})

const { t } = useLocale()
const text = computed(() => props.label ?? t('skipLink.label'))

const handleClick = (event: MouseEvent) => {
  const element = document.getElementById(props.target)
  if (!element) return
  event.preventDefault()
  // Une cible non focalisable (main, section) le devient par programme seulement
  if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1')
  element.focus()
}
</script>

<template>
  <a
    class="su-skip-link"
    :href="`#${target}`"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </a>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// SKIP LINK — masqué (sr-only) jusqu'au focus clavier, puis posé
// en haut de la fenêtre, au-dessus des barres collantes
// ============================================================

.su-skip-link {
  @include sr-only;

  &:focus-visible {
    position: fixed;
    inset-block-start: $spacing-2;
    inset-inline-start: $spacing-2;
    z-index: var(--su-z-tooltip);
    clip-path: none;
    inline-size: auto;
    block-size: auto;
    margin: 0;
    padding: $spacing-2 $spacing-3;
    overflow: visible;
    border-radius: var(--su-radius-control);
    background-color: var(--su-bg-surface-elevated);
    color: var(--su-text-primary);
    font-weight: var(--su-font-weight-medium);
    text-decoration: none;
    white-space: nowrap;
    box-shadow: var(--su-shadow-popover);

    @include focus-ring;
  }
}
</style>
