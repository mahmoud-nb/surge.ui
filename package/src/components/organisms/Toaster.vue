<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Toast from '../molecules/Toast.vue'
import type { ToasterProps } from '@/types'
import { useToast, type ToastItem } from '@/composables/useToast'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// TOASTER — pile des toasts de useToast(), à placer une fois dans
// l'application. Zone nommée (« Notifications ») mais pas live : les
// annonces passent par useAnnouncer. Les délais sont suspendus au
// survol, au focus et quand l'onglet est masqué (WCAG 2.2.1).
// Affichée en couche supérieure (popover="manual") quand c'est possible,
// pour rester visible au-dessus d'un <dialog> modal.
// ============================================================

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'bottom-right',
  max: 3,
  duration: 5000
})

defineSlots<{
  default?: (props: { toast: ToastItem; dismiss: () => void }) => unknown
}>()

const toaster = useToast()
// Régions live prêtes avant la première annonce
useAnnouncer()

const { t } = useLocale()
const label = computed(() => props.ariaLabel ?? t('toast.region'))

const regionRef = ref<HTMLElement>()
const visibleToasts = computed(() => toaster.toasts.value.slice(-Math.max(1, props.max)))

const classes = computed(() => [
  'su-toaster',
  `su-toaster--${props.position}`,
  { 'su-toaster--top': props.position.startsWith('top') }
])

// ### Pause des délais

const hovered = ref(false)
const focused = ref(false)
const pageHidden = ref(false)
const paused = computed(() => hovered.value || focused.value || pageHidden.value)

const handleFocusOut = (event: FocusEvent) => {
  focused.value = !!regionRef.value?.contains(event.relatedTarget as Node | null)
}

const handleVisibility = () => {
  pageHidden.value = document.visibilityState === 'hidden'
}

// ### Couche supérieure

const supportsPopover = () => typeof regionRef.value?.showPopover === 'function'

const isPopoverOpen = (element: HTMLElement) => {
  try {
    return element.matches(':popover-open')
  } catch {
    return false
  }
}

// Ré-afficher place la pile au-dessus des couches ouvertes depuis (dialog modal)
const raise = () => {
  const element = regionRef.value
  if (!element || !supportsPopover()) return
  if (isPopoverOpen(element)) element.hidePopover()
  element.showPopover()
}

const lower = () => {
  const element = regionRef.value
  if (element && supportsPopover() && isPopoverOpen(element)) element.hidePopover()
}

watch(
  () => toaster.toasts.value.length,
  async (length, previous = 0) => {
    await nextTick()
    // Un toast retiré avec le focus dedans ne déclenche pas toujours focusout
    focused.value = !!regionRef.value?.contains(document.activeElement)
    if (!length) hovered.value = false
    else if (length > previous) raise()
  }
)

// Pile vide : sortie de la couche après l'animation du dernier toast
const handleAfterLeave = () => {
  if (!toaster.toasts.value.length) lower()
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibility)
  if (toaster.toasts.value.length) raise()
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <section
    ref="regionRef"
    :class="classes"
    :aria-label="label"
    tabindex="-1"
    v-bind="{ popover: 'manual' }"
    @pointerenter="hovered = true"
    @pointerleave="hovered = false"
    @focusin="focused = true"
    @focusout="handleFocusOut"
  >
    <TransitionGroup
      tag="ol"
      name="su-toast"
      class="su-toaster__list"
      @after-leave="handleAfterLeave"
    >
      <li
        v-for="item in visibleToasts"
        :key="item.id"
        class="su-toaster__item"
      >
        <slot
          :toast="item"
          :dismiss="() => toaster.dismiss(item.id)"
        >
          <Toast
            :type="item.type"
            :title="item.title"
            :description="item.description"
            :dismissible="item.dismissible"
            :action="item.action"
            :duration="item.duration ?? duration"
            :paused="paused"
            @dismiss="toaster.dismiss(item.id)"
          />
        </slot>
      </li>
    </TransitionGroup>
  </section>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TOASTER — pile fixée dans un coin (pleine largeur sur mobile).
// Les styles du [popover] natif (bordure, fond, marge auto) sont neutralisés.
// ============================================================

.su-toaster {
  position: fixed;
  inset: auto;
  z-index: var(--su-z-tooltip);
  box-sizing: border-box;
  width: min(24rem, 100%);
  height: auto;
  margin: 0;
  padding: 1rem;
  overflow: visible;
  border: 0;
  background: transparent;
  color: inherit;
  outline: none;

  // La zone vide ne bloque pas les clics de la page
  pointer-events: none;

  &--top-left,
  &--top-center,
  &--top-right {
    top: 0;
  }

  &--bottom-left,
  &--bottom-center,
  &--bottom-right {
    bottom: 0;
  }

  &--top-left,
  &--bottom-left {
    inset-inline-start: 0;
  }

  &--top-right,
  &--bottom-right {
    inset-inline-end: 0;
  }

  &--top-center,
  &--bottom-center {
    inset-inline: 0;
    margin-inline: auto;
  }

  @include down('sm') {
    inset-inline: 0;
    width: 100%;
    padding: 0.75rem;
  }
}

// Préfixé : la page hôte stylise souvent ol et li (documentation, CMS)
.su-toaster .su-toaster__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

// En haut, le plus récent est contre le bord
.su-toaster--top .su-toaster__list {
  flex-direction: column-reverse;
}

.su-toaster .su-toaster__item {
  margin: 0;
  pointer-events: auto;
}

// ### Entrée et sortie

.su-toast-enter-active,
.su-toast-leave-active {
  transition:
    opacity var(--su-duration-normal) var(--su-ease-out),
    translate var(--su-duration-normal) var(--su-ease-out),
    scale var(--su-duration-normal) var(--su-ease-out);
}

.su-toast-move {
  transition: translate var(--su-duration-normal) var(--su-ease-out);
}

.su-toast-enter-from {
  opacity: 0;
  translate: 0 0.5rem;
}

.su-toaster--top .su-toast-enter-from {
  translate: 0 -0.5rem;
}

.su-toast-leave-to {
  opacity: 0;
  scale: 0.96;
}
</style>
