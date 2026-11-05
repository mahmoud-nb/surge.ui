<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, useId, useSlots } from 'vue'
import type { TooltipProps } from '@/types'
import { useFloatingPosition } from '@/composables/useFloatingPosition'
import { useDismiss } from '@/composables/useDismiss'
import { mergeIds } from '@/composables/useFormField'

// ============================================================
// TOOLTIP — courte description d'un élément, au survol et au focus
// clavier (motif APG « tooltip »).
// - role="tooltip", relié au déclencheur par aria-describedby : la
//   description est lue même quand l'infobulle est masquée.
// - WCAG 1.4.13 : survolable (on peut y amener le pointeur), Échap la
//   ferme, elle reste ouverte tant que le pointeur ou le focus y est.
// - Pas d'ouverture au toucher : sur mobile, prévoir un libellé visible.
// ============================================================

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  openDelay: 300,
  closeDelay: 100,
  showArrow: false,
  disabled: false
})

const isOpen = defineModel<boolean>({ default: false })

const slots = useSlots()
const rootRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

const tooltipId = `tooltip-${useId()}`
const hasContent = computed(() => !!(props.content || slots.content))

const { placement: actualPlacement } = useFloatingPosition(rootRef, tooltipRef, {
  placement: () => props.placement,
  open: isOpen,
  offset: props.showArrow ? 10 : 6,
  arrow: arrowRef
})

// ### Ouverture et fermeture

let timer: ReturnType<typeof setTimeout> | undefined
const hovered = ref(false)
const focused = ref(false)

const clearTimer = () => {
  clearTimeout(timer)
  timer = undefined
}

const setOpen = (value: boolean, delay = 0) => {
  clearTimer()
  if (value && (props.disabled || !hasContent.value)) return
  if (value === isOpen.value) return
  if (delay > 0) timer = setTimeout(() => (isOpen.value = value), delay)
  else isOpen.value = value
}

const handlePointerEnter = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return
  hovered.value = true
  setOpen(true, isOpen.value ? 0 : props.openDelay)
}

const handlePointerLeave = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return
  hovered.value = false
  if (!focused.value) setOpen(false, props.closeDelay)
}

// Un clic sur le déclencheur masque l'infobulle (l'action prend le relais)
const handlePointerDown = () => {
  hovered.value = false
  setOpen(false)
}

// Focus au clavier seulement : un clic donne aussi le focus, sans :focus-visible
const isFocusVisible = (element: Element) => {
  try {
    return element.matches(':focus-visible')
  } catch {
    return true
  }
}

const handleFocusIn = (event: FocusEvent) => {
  if (event.target === tooltipRef.value) return
  if (!isFocusVisible(event.target as Element)) return
  focused.value = true
  setOpen(true)
}

const handleFocusOut = (event: FocusEvent) => {
  const next = event.relatedTarget as Node | null
  if (next && rootRef.value?.contains(next)) return
  focused.value = false
  if (!hovered.value) setOpen(false)
}

// Échap ferme l'infobulle (couche du dessus seulement) ; pas d'appui extérieur
useDismiss(rootRef, {
  enabled: isOpen,
  outside: false,
  onDismiss: () => setOpen(false)
})

// ### Liaison avec le déclencheur (aria-describedby)

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
let describedElement: HTMLElement | null = null

/** Déclencheur : premier élément du slot, ou le premier élément focusable qu'il contient */
const getTrigger = (): HTMLElement | null => {
  const first = Array.from(rootRef.value?.children ?? []).find((element) => element !== tooltipRef.value) as HTMLElement | undefined
  if (!first) return null
  if (first.matches(FOCUSABLE)) return first
  return first.querySelector<HTMLElement>(FOCUSABLE) ?? first
}

const unlinkTrigger = () => {
  if (!describedElement) return
  const rest = (describedElement.getAttribute('aria-describedby') ?? '')
    .split(/\s+/)
    .filter((id) => id && id !== tooltipId)
  if (rest.length) describedElement.setAttribute('aria-describedby', rest.join(' '))
  else describedElement.removeAttribute('aria-describedby')
  describedElement = null
}

const linkTrigger = () => {
  const trigger = hasContent.value ? getTrigger() : null
  if (trigger !== describedElement) unlinkTrigger()
  if (!trigger) return
  trigger.setAttribute('aria-describedby', mergeIds(trigger.getAttribute('aria-describedby'), tooltipId) as string)
  describedElement = trigger
}

onMounted(linkTrigger)
onUpdated(linkTrigger)

onBeforeUnmount(() => {
  clearTimer()
  unlinkTrigger()
})

defineExpose({
  open: () => setOpen(true),
  close: () => setOpen(false)
})
</script>

<template>
  <span
    ref="rootRef"
    class="su-tooltip"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    @pointerdown="handlePointerDown"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <slot />

    <Transition name="su-tooltip-fade">
      <span
        v-show="isOpen"
        :id="tooltipId"
        ref="tooltipRef"
        role="tooltip"
        class="su-tooltip__content"
        :data-placement="actualPlacement"
      >
        <slot name="content">{{ content }}</slot>
        <span
          v-if="showArrow"
          ref="arrowRef"
          class="su-tooltip__arrow"
          aria-hidden="true"
        />
      </span>
    </Transition>
  </span>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TOOLTIP — petite surface flottante (position fixed calculée par
// useFloatingPosition), au-dessus des popovers (--su-z-tooltip)
// ============================================================

.su-tooltip {
  display: inline-flex;
  max-width: 100%;
}

.su-tooltip__content {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--su-z-tooltip);
  box-sizing: border-box;
  width: max-content;
  max-width: min(20rem, calc(100vw - 1rem));
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-md);
  background-color: var(--su-bg-surface-elevated);
  background-clip: padding-box;
  color: var(--su-text-primary);
  box-shadow: var(--su-shadow-popover);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-normal);
  line-height: var(--su-line-height-normal);
  text-align: start;
  white-space: normal;
  overflow-wrap: break-word;

  // L'animation part du côté du déclencheur
  &[data-placement^='top'] {
    transform-origin: bottom center;
  }

  &[data-placement^='bottom'] {
    transform-origin: top center;
  }

  &[data-placement^='left'] {
    transform-origin: center right;
  }

  &[data-placement^='right'] {
    transform-origin: center left;
  }

  @include high-contrast {
    border-width: 2px;
  }
}

// Flèche : carré pivoté qui reprend fond et bordure ; position le long
// du bord calculée en JS
.su-tooltip__arrow {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid var(--su-border-alpha);
  background-color: var(--su-bg-surface-elevated);
  background-clip: padding-box;
  rotate: 45deg;

  [data-placement^='top'] > & {
    bottom: -0.25rem;
    border-width: 0 1px 1px 0;
  }

  [data-placement^='bottom'] > & {
    top: -0.25rem;
    border-width: 1px 0 0 1px;
  }

  [data-placement^='left'] > & {
    right: -0.25rem;
    border-width: 1px 1px 0 0;
  }

  [data-placement^='right'] > & {
    left: -0.25rem;
    border-width: 0 0 1px 1px;
  }
}

@include popover-transition('su-tooltip-fade');
</style>
