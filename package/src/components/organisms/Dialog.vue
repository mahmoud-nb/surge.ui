<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, useAttrs, useId } from 'vue'
import Button from '../atoms/Button.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { DialogProps } from '@/types'

// ============================================================
// Dialog sur l'élément natif <dialog> ouvert avec showModal() :
// couche supérieure (plus de z-index), arrière-plan rendu inerte
// par le navigateur (focus piégé), touche Échap native (`cancel`)
// et fond `::backdrop`.
// ============================================================

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  display: 'center',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  zIndex: 1000,
  disableScroll: true,
  closeLabel: 'Fermer'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const attrs = useAttrs()

const dialogRef = ref<HTMLDialogElement>()

const fieldId = 'dialog-' + useId()
const dialogId = computed(() => attrs.id as string || fieldId)
const titleId = computed(() => props.title ? dialogId.value + '-title' : undefined)
const descriptionId = computed(() => props.description ? dialogId.value + '-description' : undefined)

// isOpen : état logique ; isRendered : contenu monté (il reste monté le
// temps de l'animation de fermeture, puis est démonté)
const isOpen = ref(false)
const isRendered = ref(false)
let unmountTimer: ReturnType<typeof setTimeout> | undefined

// Élément qui avait le focus avant l'ouverture, pour le lui rendre à la fermeture
let previouslyFocused: HTMLElement | null = null

const dialogClasses = computed(() => [
  'su-dialog',
  `su-dialog--${props.display}`,
  {
    'su-dialog--lock-scroll': props.disableScroll
  }
])

// <dialog> porte déjà le rôle dialog (et aria-modal implicite via showModal)
const ariaAttributes = computed(() => {
  const attrs: Record<string, string> = {}

  if (props.ariaLabelledBy) {
    attrs['aria-labelledby'] = props.ariaLabelledBy
  } else if (props.ariaLabel) {
    attrs['aria-label'] = props.ariaLabel
  } else if (titleId.value) {
    attrs['aria-labelledby'] = titleId.value
  }

  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  else if (descriptionId.value) attrs['aria-describedby'] = descriptionId.value

  return attrs
})

// Durée de transition calculée (la plus longue), pour démonter le contenu
// une fois l'animation de fermeture terminée
const getTransitionMs = (el?: HTMLElement): number => {
  if (!el || typeof getComputedStyle === 'undefined') return 0
  return Math.max(0, ...getComputedStyle(el).transitionDuration.split(',').map((value) => {
    const n = parseFloat(value) || 0
    return value.trim().endsWith('ms') ? n : n * 1000
  }))
}

const openDialog = async () => {
  if (isOpen.value) return
  clearTimeout(unmountTimer)
  previouslyFocused = document.activeElement as HTMLElement | null
  isRendered.value = true
  isOpen.value = true
  emit('update:modelValue', true)
  emit('open')

  await nextTick()
  const el = dialogRef.value
  if (!el || el.open) return
  // Repli pour les environnements sans showModal (anciens navigateurs, tests)
  if (typeof el.showModal === 'function') el.showModal()
  else el.setAttribute('open', '')
}

const closeDialog = () => {
  if (!isOpen.value) return
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')

  const el = dialogRef.value
  if (el?.open) {
    if (typeof el.close === 'function') el.close()
    else el.removeAttribute('open')
  }

  // Rend le focus à l'élément déclencheur
  if (previouslyFocused?.isConnected) {
    previouslyFocused.focus()
  }
  previouslyFocused = null

  unmountTimer = setTimeout(() => {
    if (!isOpen.value) isRendered.value = false
  }, getTransitionMs(el))
}

// Échap : le navigateur émet `cancel` sur le dialog du dessus uniquement
const handleCancel = (event: Event) => {
  event.preventDefault()
  if (props.closeOnEscape) closeDialog()
}

// Fermeture native (ex. <form method="dialog">) : resynchronise l'état
const handleNativeClose = () => {
  if (isOpen.value) closeDialog()
}

// Clic sur le fond : le conteneur couvre tout le dialog, un clic dont la
// cible est le <dialog> lui-même tombe donc sur ::backdrop. Le geste doit
// aussi commencer sur le fond (pas de fermeture en fin de sélection de texte).
let pointerDownOnBackdrop = false
const handleBackdropPointerDown = (event: PointerEvent) => {
  pointerDownOnBackdrop = event.target === event.currentTarget
}

const handleBackdropClick = (event: MouseEvent) => {
  const startedOnBackdrop = pointerDownOnBackdrop
  pointerDownOnBackdrop = false
  if (event.target !== event.currentTarget || !startedOnBackdrop) return
  if (props.closeOnOverlayClick) closeDialog()
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) openDialog()
  else closeDialog()
})

onMounted(() => {
  if (props.modelValue) openDialog()
})

onBeforeUnmount(() => {
  clearTimeout(unmountTimer)
  if (dialogRef.value?.open && typeof dialogRef.value.close === 'function') {
    dialogRef.value.close()
  }
})

defineExpose({
  open: openDialog,
  close: closeDialog,
  dialogRef
})
</script>

<template>
  <dialog
    :id="dialogId"
    ref="dialogRef"
    :class="dialogClasses"
    :style="width ? { width, maxWidth: '100%' } : undefined"
    v-bind="ariaAttributes"
    @cancel="handleCancel"
    @close="handleNativeClose"
    @pointerdown="handleBackdropPointerDown"
    @click="handleBackdropClick"
  >
    <template v-if="isRendered">
      <Button
        class="su-dialog__close"
        variant="ghost"
        size="sm"
        :icon="XMarkIcon"
        icon-display="only"
        :aria-label="closeLabel"
        @click="closeDialog"
      />

      <div
        class="su-dialog__container"
        :style="{ height: height }"
      >
        <!-- Header -->
        <div
          v-if="$slots.head || title || description"
          class="su-dialog-header"
        >
          <slot name="head">
            <h2
              v-if="title"
              :id="titleId"
              class="su-dialog-title"
            >
              {{ title }}
            </h2>
            <p
              v-if="description"
              :id="descriptionId"
              class="su-dialog-description"
            >
              {{ description }}
            </p>
          </slot>
        </div>

        <!-- Contenu principal -->
        <div class="su-dialog-content">
          <slot />
        </div>

        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="su-dialog-footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </template>
  </dialog>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// DIALOG — <dialog> natif en couche supérieure, fond ::backdrop
// assombri et flouté. Ouverture et fermeture animées grâce à
// @starting-style et transition-behavior: allow-discrete.
// ============================================================

// Verrou de défilement de la page, sans JavaScript
:root:has(.su-dialog--lock-scroll[open]) {
  overflow: hidden;
  scrollbar-gutter: stable;
}

.su-dialog {
  // Réinitialisation du <dialog> natif
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: calc(100% - 2rem);
  max-width: 32rem;
  max-height: calc(100dvh - 2rem);
  margin: auto;
  padding: 0;
  overflow: visible;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-container);
  background-color: var(--su-bg-surface-elevated);
  background-clip: padding-box;
  color: var(--su-text-primary);
  box-shadow: var(--su-shadow-xl);
  outline: none;

  @include inner-highlight;

  // Pose « masquée » (avant ouverture et pendant la fermeture)
  opacity: 0;
  transition:
    opacity var(--su-duration-normal) var(--su-ease-out),
    scale var(--su-duration-normal) var(--su-ease-out),
    translate var(--su-duration-normal) var(--su-ease-out),
    display var(--su-duration-normal) allow-discrete,
    overlay var(--su-duration-normal) allow-discrete;

  &:not([open]) {
    display: none;
  }

  &[open] {
    opacity: 1;
    scale: none;
    translate: none;

    @starting-style {
      opacity: 0;
    }
  }

  &::before {
    z-index: 1;
  }

  // Fond : assombri et flouté, en fondu
  &::backdrop {
    background-color: var(--su-overlay-backdrop);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition:
      opacity var(--su-duration-normal) var(--su-ease-out),
      display var(--su-duration-normal) allow-discrete,
      overlay var(--su-duration-normal) allow-discrete;
  }

  &[open]::backdrop {
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }

  > .su-dialog__close {
    position: absolute;
    top: 0.75rem;
    inset-inline-end: 0.75rem;
    z-index: 2;
  }

  &__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    max-height: inherit;
    border-radius: inherit;
  }

  // ### Fenêtre centrée (feuille ancrée en bas sur mobile)

  &--center {
    scale: 0.98;

    &[open] {
      @starting-style {
        scale: 0.98;
      }
    }

    @include down('sm') {
      width: 100%;
      max-width: none;
      max-height: calc(100dvh - 3rem);
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-end-start-radius: 0;
      border-end-end-radius: 0;
      scale: none;
      translate: 0 1rem;

      &[open] {
        @starting-style {
          translate: 0 1rem;
        }
      }
    }
  }

  // ### Tiroirs

  &--left,
  &--right {
    width: min(24rem, 100%);
    max-width: none;
    height: 100dvh;
    max-height: none;
  }

  &--left {
    margin: 0;
    margin-inline-end: auto;
    border-width: 0 1px 0 0;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    translate: -100% 0;

    &[open] {
      @starting-style {
        translate: -100% 0;
      }
    }
  }

  &--right {
    margin: 0;
    margin-inline-start: auto;
    border-width: 0 0 0 1px;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    translate: 100% 0;

    &[open] {
      @starting-style {
        translate: 100% 0;
      }
    }
  }

  &--top,
  &--bottom {
    width: 100%;
    max-width: none;
    max-height: 85dvh;
  }

  &--top {
    margin: 0 0 auto;
    border-width: 0 0 1px;
    border-start-start-radius: 0;
    border-start-end-radius: 0;
    translate: 0 -100%;

    &[open] {
      @starting-style {
        translate: 0 -100%;
      }
    }
  }

  &--bottom {
    margin: auto 0 0;
    border-width: 1px 0 0;
    border-end-start-radius: 0;
    border-end-end-radius: 0;
    translate: 0 100%;

    &[open] {
      @starting-style {
        translate: 0 100%;
      }
    }
  }

  // ### Plein écran

  &--full {
    width: 100%;
    max-width: none;
    height: 100dvh;
    max-height: none;
    margin: 0;
    border: 0;
    border-radius: 0;
    scale: 0.98;

    &[open] {
      @starting-style {
        scale: 0.98;
      }
    }
  }

  @include high-contrast {
    border-width: 2px;
  }
}

// ### Contenu

.su-dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;

  // Réserve la place du bouton de fermeture
  padding: 1.5rem 3.5rem 0.5rem 1.5rem;
}

.su-dialog-title {
  margin: 0;
  font-size: var(--su-font-size-xl);
  font-weight: var(--su-font-weight-semibold);
  line-height: var(--su-line-height-tight);
  color: var(--su-text-primary);
}

.su-dialog-description {
  margin: 0;
  font-size: var(--su-font-size-sm);
  line-height: var(--su-line-height-normal);
  color: var(--su-text-tertiary);
}

.su-dialog-content {
  flex-grow: 1;
  min-height: 0;
  padding: 1rem 1.5rem 1.5rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}

// Pied : boutons empilés sur mobile, alignés à droite au-delà
.su-dialog-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--su-border-alpha);
  border-end-start-radius: inherit;
  border-end-end-radius: inherit;
  background-color: var(--su-bg-muted);

  @include up('sm') {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
