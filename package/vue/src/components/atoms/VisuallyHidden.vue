<script setup lang="ts">
import type { VisuallyHiddenProps } from '@/types'

// ============================================================
// VISUALLY HIDDEN — contenu lu par les lecteurs d'écran mais
// invisible à l'écran (libellé d'un bouton icône, précision de
// contexte). `focusable` le rend visible au focus (lien d'évitement).
// ============================================================

withDefaults(defineProps<VisuallyHiddenProps>(), {
  as: 'span',
  focusable: false
})
</script>

<template>
  <component
    :is="as"
    :class="['su-visually-hidden', { 'su-visually-hidden--focusable': focusable }]"
  >
    <slot />
  </component>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

.su-visually-hidden:not(.su-visually-hidden--focusable),
.su-visually-hidden--focusable:not(:focus, :focus-within) {
  @include sr-only;
}
</style>
