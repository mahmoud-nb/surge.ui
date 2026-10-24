<script lang="ts">
// État partagé entre toutes les instances : pile des dialogs ouverts
// et verrou de défilement du body (gère les dialogs imbriqués)
const openDialogs: string[] = []
let scrollLocks = 0
let previousBodyOverflow = ''
</script>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick, useAttrs, useId } from 'vue'
import Button from '../atoms/Button.vue'
import { trapFocus } from '../../utils/accessibility'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { DialogProps } from '@/types'

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

// Refs
const dialogRef = ref<HTMLDivElement>()
const cleanupFocusTrap = ref<(() => void) | null>(null)

const fieldId = 'dialog-' + useId()
const dialogId = computed(() => attrs.id as string || fieldId)
const titleId = computed(() => props.title ? dialogId.value + '-title' : undefined)
const descriptionId = computed(() => props.description ? dialogId.value + '-description' : undefined)

// État d'ouverture interne (l'ouverture initiale passe par openDialog au montage)
const isOpen = ref(false)

// Élément qui avait le focus avant l'ouverture, pour le lui rendre à la fermeture
let previouslyFocused: HTMLElement | null = null

// Classes CSS
const overlayClasses = computed(() => [
  'su-dialog-overlay',
  `su-dialog-overlay--${props.display}`,
  {
    'su-dialog-overlay--open': isOpen.value
  }
])

const dialogClasses = computed(() => [
  'su-dialog',
  `su-dialog--${props.display}`,
  {
    'su-dialog--open': isOpen.value
  }
])

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'dialog',
    'aria-modal': 'true'
  }
  
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

// Pile des dialogs ouverts : Échap et le verrou de défilement ne
// concernent que le dialog du dessus
const isTopmost = () => openDialogs[openDialogs.length - 1] === dialogId.value

const lockScroll = () => {
  if (!props.disableScroll) return
  if (scrollLocks++ === 0) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
}

const unlockScroll = () => {
  if (!props.disableScroll || scrollLocks === 0) return
  if (--scrollLocks === 0) {
    document.body.style.overflow = previousBodyOverflow
  }
}

// Gestion de l'ouverture/fermeture
const openDialog = async () => {
  if (isOpen.value) return
  previouslyFocused = document.activeElement as HTMLElement | null
  isOpen.value = true
  openDialogs.push(dialogId.value)
  emit('update:modelValue', true)
  emit('open')

  lockScroll()
  document.addEventListener('keydown', handleEscape)

  await nextTick()
  if (dialogRef.value) {
    cleanupFocusTrap.value = trapFocus(dialogRef.value)
  }
}

const releaseDialog = () => {
  const index = openDialogs.lastIndexOf(dialogId.value)
  if (index !== -1) openDialogs.splice(index, 1)

  document.removeEventListener('keydown', handleEscape)
  unlockScroll()

  if (cleanupFocusTrap.value) {
    cleanupFocusTrap.value()
    cleanupFocusTrap.value = null
  }
}

const closeDialog = () => {
  if (!isOpen.value) return
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')

  releaseDialog()

  // Rend le focus à l'élément déclencheur
  if (previouslyFocused?.isConnected) {
    previouslyFocused.focus()
  }
  previouslyFocused = null
}

// Clic sur l'overlay : seulement si le geste a commencé sur l'overlay
// (évite de fermer en relâchant une sélection de texte hors du dialog)
let pointerDownOnOverlay = false
const handleOverlayPointerDown = (event: PointerEvent) => {
  pointerDownOnOverlay = event.target === event.currentTarget
}

const handleOverlayClick = (event: MouseEvent) => {
  const startedOnOverlay = pointerDownOnOverlay
  pointerDownOnOverlay = false
  if (event.target !== event.currentTarget || !startedOnOverlay) return
  if (props.closeOnOverlayClick) {
    closeDialog()
  }
}

// Gestionnaire de touche Escape (dialog du dessus uniquement)
const handleEscape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !props.closeOnEscape || !isTopmost()) return
  event.stopPropagation()
  closeDialog()
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    openDialog()
  } else {
    closeDialog()
  }
})

// Lifecycle hooks
onMounted(() => {
  if (props.modelValue) {
    openDialog()
  }
})

onUnmounted(() => {
  if (isOpen.value) {
    releaseDialog()
  }
})

// Méthodes exposées
defineExpose({
  open: openDialog,
  close: closeDialog,
  dialogRef
})
</script>

<template>
  <Transition name="su-dialog-transition">
    <div
      v-if="isOpen"
      :class="overlayClasses"
      :style="{ zIndex: zIndex }"
      @pointerdown="handleOverlayPointerDown"
      @click="handleOverlayClick"
    >
      <dialog
        :id="dialogId"
        ref="dialogRef"
        :class="dialogClasses"
        :open="isOpen"
        :style="width ? { width, maxWidth: '100%' } : undefined"
        v-bind="ariaAttributes"
        @click.stop 
      >
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
      </dialog>
    </div>
  </Transition>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// DIALOG — fond assombri et flouté, fenêtre arrondie (16px) en
// surface flottante, apparition par fondu et léger zoom.
// Variantes tiroir (left/right/top/bottom) et plein écran.
// ============================================================

.su-dialog-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem;
  background-color: var(--su-overlay-backdrop);
  backdrop-filter: blur(4px);

  // Tiroirs et plein écran : collés aux bords
  &--left,
  &--right,
  &--top,
  &--bottom,
  &--full {
    padding: 0;
  }

  &--left {
    justify-content: flex-start;
  }

  &--right {
    justify-content: flex-end;
  }

  &--top {
    align-items: flex-start;
  }

  &--bottom {
    align-items: flex-end;
  }

  // Sur mobile, la fenêtre centrée devient une feuille ancrée en bas
  &--center {
    @include down('sm') {
      align-items: flex-end;
      padding: 0;
    }
  }
}

.su-dialog {
  // Réinitialisation de l'élément <dialog> natif
  position: relative;
  inset: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-width: 32rem;
  max-height: calc(100dvh - 2rem);
  margin: 0;
  padding: 0;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-container);
  background-color: var(--su-bg-surface-elevated);
  background-clip: padding-box;
  color: var(--su-text-primary);
  box-shadow: var(--su-shadow-xl);
  @include inner-highlight;

  &::before {
    z-index: 1;
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
    min-height: 0;
    max-height: inherit;
  }

  // ### Fenêtre centrée

  &--center {
    @include down('sm') {
      max-width: none;
      max-height: calc(100dvh - 3rem);
      border-width: 1px 0 0;
      border-end-start-radius: 0;
      border-end-end-radius: 0;
    }
  }

  // ### Tiroirs

  &--left,
  &--right {
    width: min(24rem, 100%);
    max-width: none;
    height: 100%;
    max-height: none;
  }

  &--left {
    border-width: 0 1px 0 0;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  &--right {
    border-width: 0 0 0 1px;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  &--top,
  &--bottom {
    max-width: none;
    max-height: 85dvh;
  }

  &--top {
    border-width: 0 0 1px;
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  &--bottom {
    border-width: 1px 0 0;
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  // ### Plein écran

  &--full {
    max-width: none;
    height: 100%;
    max-height: none;
    border: 0;
    border-radius: 0;
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
  background-color: var(--su-bg-muted);

  @include up('sm') {
    flex-direction: row;
    justify-content: flex-end;
  }
}

// ### Transitions (overlay : fondu ; fenêtre : fondu + zoom ou glissement)

.su-dialog-transition-enter-active,
.su-dialog-transition-leave-active {
  transition: opacity var(--su-duration-normal) var(--su-ease-out);

  .su-dialog {
    transition:
      opacity var(--su-duration-normal) var(--su-ease-out),
      scale var(--su-duration-normal) var(--su-ease-out),
      translate var(--su-duration-normal) var(--su-ease-out);
  }
}

.su-dialog-transition-enter-from,
.su-dialog-transition-leave-to {
  opacity: 0;

  .su-dialog {
    opacity: 0;
  }

  .su-dialog--center,
  .su-dialog--full {
    scale: 0.98;
  }

  .su-dialog--left {
    translate: -100% 0;
  }

  .su-dialog--right {
    translate: 100% 0;
  }

  .su-dialog--top {
    translate: 0 -100%;
  }

  .su-dialog--bottom {
    translate: 0 100%;
  }
}
</style>
