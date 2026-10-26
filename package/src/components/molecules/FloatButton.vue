<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Link from '../atoms/Link.vue'
import Button from '../atoms/Button.vue'
import type { FloatButtonProps } from '@/types'

export interface Props extends FloatButtonProps {}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  offset: () => ({ x: 24, y: 24 }),
  size: 'lg',
  variant: 'primary',
  disabled: false,
  loading: false,
  zIndex: 1000,
  hideOnScroll: false,
  showTooltip: true,
  tooltipPosition: 'left'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const slots = defineSlots<{
  default?(): any
}>()

// Refs
const floatButtonRef = ref<HTMLElement>()
const isVisible = ref(true)
const isTooltipVisible = ref(false)
const lastScrollY = ref(0)

// Calcul de la position
const positionStyles = computed(() => {
  const styles: Record<string, string> = {
    position: 'fixed',
    zIndex: props.zIndex.toString()
  }
  
  // Position horizontale
  const side = props.position === 'right' ? 'right' : 'left'
  styles[side] = `max(${props.offset.x ?? 24}px, env(safe-area-inset-${side}))`
  
  // Position verticale
  styles.bottom = `max(${props.offset.y ?? 24}px, env(safe-area-inset-bottom))`
  
  return styles
})

// Classes CSS
const containerClasses = computed(() => [
  'su-float-button-container',
  `su-float-button-container--${props.position}`,
  `su-float-button-container--${props.size}`,
  {
    'su-float-button-container--hidden': !isVisible.value,
    'su-float-button-container--has-slot': slots.default,
    'su-float-button-container--disabled': props.disabled
  }
])

const buttonClasses = computed(() => [
  'su-float-button',
  `su-float-button--${props.size}`,
  {
    'su-float-button--has-badge': props.badge,
    'su-float-button--has-tooltip': props.showTooltip && props.label
  }
])

const tooltipClasses = computed(() => [
  'su-float-button-tooltip',
  `su-float-button-tooltip--${props.tooltipPosition}`,
  `su-float-button-tooltip--in-${props.position}`,
  { 'su-float-button-tooltip--visible': isTooltipVisible.value }
])

// Attributs pour le lien/bouton
const linkAttributes = computed(() => {
  if (!props.href) return {}
  
  const attrs: Record<string, any> = {
    href: props.href
  }
  
  if (props.target) attrs.target = props.target
  if (props.rel) attrs.rel = props.rel
  if (props.target === '_blank' && !props.rel) {
    attrs.rel = 'noopener noreferrer'
  }
  
  return attrs
})

// Gestion du scroll pour hideOnScroll
const handleScroll = () => {
  if (!props.hideOnScroll) return
  
  const currentScrollY = window.scrollY
  
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    // Scroll vers le bas - cacher
    isVisible.value = false
  } else {
    // Scroll vers le haut - montrer
    isVisible.value = true
  }
  
  lastScrollY.value = currentScrollY
}

// Gestionnaires d'événements
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

const handleFocus = (event: FocusEvent) => {
  if (props.showTooltip && props.label) {
    isTooltipVisible.value = true
  }
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isTooltipVisible.value = false
  emit('blur', event)
}

const handleMouseEnter = () => {
  if (props.showTooltip && props.label && !props.disabled) {
    isTooltipVisible.value = true
  }
}

const handleMouseLeave = () => {
  isTooltipVisible.value = false
}

// Échap masque l'infobulle sans déplacer le focus (WCAG 1.4.13)
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') isTooltipVisible.value = false
}

// Lifecycle
onMounted(() => {
  if (props.hideOnScroll) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (props.hideOnScroll) {
    window.removeEventListener('scroll', handleScroll)
  }
})

// Méthodes exposées
const focus = () => {
  floatButtonRef.value?.focus()
}

defineExpose({
  focus,
  floatButtonRef
})
</script>

<template>
  <div 
    :class="containerClasses"
    :style="positionStyles"
  >
    <!-- Slot pour contenu additionnel (LinkGroup ou ButtonGroup) -->
    <div 
      v-if="$slots.default" 
      class="su-float-button-slot"
      :class="`su-float-button-slot--${position}`"
    >
      <slot />
    </div>

    <!-- Bouton flottant principal -->
    <div class="su-float-button-wrapper">
      <!-- Badge -->
      <div
        v-if="badge"
        class="su-float-button-badge"
        aria-hidden="true"
      >
        {{ badge }}
      </div>

      <!-- Tooltip -->
      <div
        v-if="showTooltip && label"
        :class="tooltipClasses"
        aria-hidden="true"
      >
        {{ label }}
      </div>

      <!-- Lien ou Bouton -->
      <component
        :is="href ? Link : Button"
        ref="floatButtonRef"
        :class="buttonClasses"
        :variant="variant"
        :size="size"
        :icon="icon"
        icon-display="only"
        :disabled="disabled"
        :loading="loading"
        :aria-label="badge ? `${label || ariaLabel} (${badge})` : (label || ariaLabel)"
        :aria-describedby="ariaDescribedBy"
        v-bind="href ? linkAttributes : {}"
        @click="handleClick"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/abstracts' as *;

// ============================================================
// FLOAT BUTTON — bouton rond flottant, infobulle et panneau
// en surface popover
// ============================================================

.su-float-button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: $spacing-3;

  @include transition(opacity, translate);

  &--left {
    align-items: flex-start;
  }

  &--hidden {
    opacity: 0;
    visibility: hidden;
    translate: 0 1.5rem;

    @include motion-reduce {
      translate: none;
    }
  }

  &--disabled {
    pointer-events: none;
  }

  &--lg {
    gap: $spacing-4;
  }

  // La position (prop `offset` + zones sûres) est appliquée en style inline :
  // aucune règle CSS ne doit l'écraser, quelle que soit la largeur d'écran.
}

// Panneau de contenu additionnel (LinkGroup, ButtonGroup…)
.su-float-button-slot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @include popover-surface;

  animation: su-float-button-in var(--su-duration-normal) var(--su-ease-out);

  @include motion-reduce {
    animation: none;
  }

  &--left {
    align-items: flex-start;
  }

  @include down('md') {
    max-width: calc(100vw - 5rem);
  }
}

.su-float-button-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

// Le bouton est un SuButton (ou SuLink) : la classe est posée sur sa racine
.su-float-button {
  border-radius: var(--su-radius-full);
  padding: 0;
  box-shadow: var(--su-shadow-lg);

  &:hover:not(:disabled) {
    box-shadow: var(--su-shadow-xl);
  }

  &--sm {
    width: 2.5rem;
    height: 2.5rem;

    :deep(.su-button__icon) {
      width: 1.125rem;
      height: 1.125rem;
    }
  }

  &--md {
    width: 3rem;
    height: 3rem;

    :deep(.su-button__icon) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &--lg {
    width: 3.5rem;
    height: 3.5rem;

    :deep(.su-button__icon) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}

// Pastille de compteur
.su-float-button-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.3125rem;
  border-radius: var(--su-radius-full);
  background-color: var(--su-state-error);
  color: var(--su-primary-text);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-semibold);
  font-variant-numeric: tabular-nums;

  // Anneau de la couleur du fond pour détacher la pastille du bouton
  box-shadow: 0 0 0 2px var(--su-bg-canvas);
  pointer-events: none;
}

// Infobulle : surface claire, sans flèche
.su-float-button-tooltip {
  position: absolute;
  z-index: var(--su-z-tooltip);
  box-sizing: border-box;
  max-width: 12.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-md);
  background-color: var(--su-bg-surface-elevated);
  background-clip: padding-box;
  color: var(--su-text-primary);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-medium);
  white-space: nowrap;
  box-shadow: var(--su-shadow-popover);
  pointer-events: none;
  opacity: 0;
  scale: 0.98;

  @include transition(opacity, scale);

  &--visible {
    opacity: 1;
    scale: 1;
  }

  &--top {
    bottom: calc(100% + 0.5rem);

    &.su-float-button-tooltip--in-right {
      right: 0;
    }

    &.su-float-button-tooltip--in-left {
      left: 0;
    }
  }

  &--bottom {
    top: calc(100% + 0.5rem);

    &.su-float-button-tooltip--in-right {
      right: 0;
    }

    &.su-float-button-tooltip--in-left {
      left: 0;
    }
  }

  &--left {
    right: calc(100% + 0.5rem);
    top: 50%;
    translate: 0 -50%;
  }

  &--right {
    left: calc(100% + 0.5rem);
    top: 50%;
    translate: 0 -50%;
  }

  @include high-contrast {
    border-width: 2px;
  }
}

@keyframes su-float-button-in {
  from {
    opacity: 0;
    translate: 0 0.5rem;
  }

  to {
    opacity: 1;
    translate: 0 0;
  }
}
</style>
