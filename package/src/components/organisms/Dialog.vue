<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick, useAttrs, useId } from 'vue'
import { trapFocus } from '../../utils/accessibility'
import type { AccessibilityProps } from '@/types'

export type DialogDisplay = 'center' | 'left' | 'right' | 'top' | 'bottom' | 'full'
export interface DialogProps extends AccessibilityProps {
  modelValue?: boolean
  display?: DialogDisplay
  title?: string
  description?: string
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  width?: string
  height?: string
  zIndex?: number
  disableScroll?: boolean
}

export interface Props extends DialogProps {}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  display: 'center',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  zIndex: 1000,
  disableScroll: true
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

// État d'ouverture interne
const isOpen = ref(props.modelValue)

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
    'aria-modal': 'true',
    'aria-hidden': !isOpen.value
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  else if (titleId.value) attrs['aria-labelledby'] = titleId.value
  
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  else if (descriptionId.value) attrs['aria-describedby'] = descriptionId.value
  
  return attrs
})

// Gestion de l'ouverture/fermeture
const openDialog = async () => {
  if (isOpen.value) return
  isOpen.value = true
  emit('update:modelValue', true)
  emit('open')
  
  if (props.disableScroll) {
    document.body.style.overflow = 'hidden'
  }
  
  await nextTick()
  if (dialogRef.value) {
    cleanupFocusTrap.value = trapFocus(dialogRef.value)
  }
}

const closeDialog = () => {
  if (!isOpen.value) return
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')
  
  if (props.disableScroll) {
    document.body.style.overflow = ''
  }
  
  if (cleanupFocusTrap.value) {
    cleanupFocusTrap.value()
    cleanupFocusTrap.value = null
  }
}

// Gestionnaire de clic sur l'overlay
const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    closeDialog()
  }
}

// Gestionnaire de touche Escape
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    closeDialog()
  }
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
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  if (props.disableScroll) {
    document.body.style.overflow = ''
  }
  if (cleanupFocusTrap.value) {
    cleanupFocusTrap.value()
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
    <div v-if="isOpen" :class="overlayClasses" :style="{ zIndex: zIndex }" @click="handleOverlayClick">
      <div
        ref="dialogRef"
        :id="dialogId"
        :class="dialogClasses"
        :style="{ width: width, height: height }"
        v-bind="ariaAttributes"
        @click.stop 
      >
        <!-- Header -->
        <div v-if="$slots.head || title" class="su-dialog-header">
          <slot name="head">
            <h2 :id="titleId" class="su-dialog-title">{{ title }}</h2>
          </slot>
        </div>

        <!-- Description (pour l'accessibilité si pas de slot head) -->
        <p v-if="description && !$slots.head" :id="descriptionId" class="sr-only">{{ description }}</p>

        <!-- Contenu principal -->
        <div class="su-dialog-content">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="su-dialog-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.su-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  &--open {
    opacity: 1;
    visibility: visible;
  }

  // Styles spécifiques pour les tiroirs (drawers)
  &--left, &--right, &--top, &--bottom, &--full {
    align-items: flex-start; // Pour que le tiroir ne soit pas centré verticalement par défaut
    justify-content: flex-start; // Pour que le tiroir ne soit pas centré horizontalement par défaut
  }
}

.su-dialog {
  background-color: white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  max-width: 90vw;
  transform: scale(0.95);
  opacity: 0;
  transition: all 0.3s ease;

  .su-dialog-overlay--open & {
    opacity: 1;
    transform: scale(1);
  }

  // Display: center (default modal)
  &--center {
    min-width: 320px;
    width: auto;
  }

  // Display: left (drawer from left)
  &--left {
    height: 100%;
    max-height: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: translateX(-100%);
    
    .su-dialog-overlay--open & {
      transform: translateX(0);
    }
  }

  // Display: right (drawer from right)
  &--right {
    height: 100%;
    max-height: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-left: auto; // Pousse le tiroir à droite
    transform: translateX(100%);

    .su-dialog-overlay--open & {
      transform: translateX(0);
    }
  }

  // Display: top (drawer from top)
  &--top {
    width: 100%;
    max-width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transform: translateY(-100%);

    .su-dialog-overlay--open & {
      transform: translateY(0);
    }
  }

  // Display: bottom (drawer from bottom)
  &--bottom {
    width: 100%;
    max-width: 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: auto; // Pousse le tiroir en bas
    transform: translateY(100%);

    .su-dialog-overlay--open & {
      transform: translateY(0);
    }
  }

  // Display: full (full screen)
  &--full {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
    transform: scale(1.05); // Légère animation pour le plein écran

    .su-dialog-overlay--open & {
      transform: scale(1);
    }
  }
}

.su-dialog-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid $gray-200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.su-dialog-title {
  margin: 0;
  font-size: $font-size-xl;
  font-weight: 600;
  color: $text-primary;
}

.su-dialog-content {
  padding: 1.5rem;
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // Améliore le défilement sur iOS
}

.su-dialog-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid $gray-200;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-shrink: 0;
}

// Transitions
.su-dialog-transition-enter-active,
.su-dialog-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.su-dialog-transition-enter-from,
.su-dialog-transition-leave-to {
  opacity: 0;
  
  .su-dialog--center & {
    transform: scale(0.95);
  }
  .su-dialog--left & {
    transform: translateX(-100%);
  }
  .su-dialog--right & {
    transform: translateX(100%);
  }
  .su-dialog--top & {
    transform: translateY(-100%);
  }
  .su-dialog--bottom & {
    transform: translateY(100%);
  }
  .su-dialog--full & {
    transform: scale(1.05);
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-dialog {
    background-color: $gray-800;
    box-shadow: $shadow-lg; // Garder une ombre visible
  }

  .su-dialog-header {
    border-bottom-color: $gray-700;
  }

  .su-dialog-title {
    color: $text-primary-dark;
  }

  .su-dialog-footer {
    border-top-color: $gray-700;
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-dialog-overlay {
    background-color: rgba(0, 0, 0, 0.8); // Contraste plus élevé pour l'overlay
  }

  .su-dialog {
    border: 2px solid windowText; // Bordure visible en contraste élevé
  }
}

// Réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-dialog-overlay,
  .su-dialog {
    transition: none !important;
    transform: none !important;
  }
}
</style>