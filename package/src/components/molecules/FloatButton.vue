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
const showTooltip = ref(false)
const lastScrollY = ref(0)

// Calcul de la position
const positionStyles = computed(() => {
  const styles: Record<string, string> = {
    position: 'fixed',
    zIndex: props.zIndex.toString()
  }
  
  // Position horizontale
  if (props.position === 'right') {
    styles.right = `${props.offset.x || 24}px`
  } else {
    styles.left = `${props.offset.x || 24}px`
  }
  
  // Position verticale
  styles.bottom = `${props.offset.y || 24}px`
  
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
  `su-float-button-tooltip--in-${props.position}`
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
    showTooltip.value = true
  }
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  showTooltip.value = false
  emit('blur', event)
}

const handleMouseEnter = () => {
  if (props.showTooltip && props.label && !props.disabled) {
    showTooltip.value = true
  }
}

const handleMouseLeave = () => {
  showTooltip.value = false
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
        :aria-label="`Badge: ${badge}`"
      >
        {{ badge }}
      </div>

      <!-- Tooltip -->
      <div 
        v-if="true || showTooltip && label && showTooltip"
        :class="tooltipClasses"
        role="tooltip"
        :id="`${$attrs.id || 'float-button'}-tooltip`"
      >
        {{ label }}
        <div class="su-float-button-tooltip-arrow"></div>
      </div>

      <!-- Lien ou Bouton -->
      <component
        :is="href ? Link : Button"
        ref="floatButtonRef"
        :class="buttonClasses"
        :variant="variant"
        :size="size"
        :icon="icon"
        iconDisplay="only"
        :disabled="disabled"
        :loading="loading"
        :aria-label="label || ariaLabel"
        :aria-describedby="showTooltip && label ? `${$attrs.id || 'float-button'}-tooltip` : ariaDescribedBy"
        v-bind="href ? linkAttributes : {}"
        label="test"
        @click="handleClick"
        @focus="handleFocus"
        @blur="handleBlur"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-float-button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &--left {
    align-items: flex-start;
  }
  
  &--hidden {
    opacity: 0;
    visibility: hidden;
    transform: translateY(100px);
  }
  
  &--disabled {
    pointer-events: none;
  }
  
  // Tailles
  &--sm {
    gap: 0.75rem;
  }
  
  &--md {
    gap: 1rem;
  }
  
  &--lg {
    gap: 1.25rem;
  }
}

.su-float-button-slot {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: white;
  border: 1px solid $gray-200;
  border-radius: $border-radius-lg;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
  
  // Animation d'apparition
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &--left {
    align-items: flex-start;
  }
}

.su-float-button-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.su-float-button {
  border-radius: 50% !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  // Tailles spécifiques pour les boutons flottants
  &--sm {
    width: 3rem !important;
    height: 3rem !important;
    padding: 0 !important;
    
    .su-button__icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &--md {
    width: 3.5rem !important;
    height: 3.5rem !important;
    padding: 0 !important;
    
    .su-button__icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  
  &--lg {
    width: 4rem !important;
    height: 4rem !important;
    padding: 0 !important;
    
    .su-button__icon {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
}

.su-float-button-badge {
  position: absolute;
  top: -0.375rem;
  right: -0.375rem;
  min-width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $error-500;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  padding: 0 0.375rem;
  border: 1px solid white;
  z-index: 1;
  
  // Animation de pulsation pour attirer l'attention
  // animation: pulse 2s infinite;
}

.su-float-button-tooltip {
  position: absolute;
  padding: 0.5rem 0.75rem;
  background-color: $gray-900;
  color: white;
  font-size: $font-size-sm;
  font-weight: 500;
  border-radius: $border-radius-md;
  white-space: nowrap;
  pointer-events: none;
  z-index: 2;
  max-width: 200px;
  
  // Positions du tooltip
  &--top {
    bottom: 100%;
    margin-bottom: 0.75rem;
    
    &.su-float-button-tooltip--in-right {
      right: 0;
    }
    
    &.su-float-button-tooltip--in-left {
      left: 0;
    }
    
    .su-float-button-tooltip-arrow {
      top: 100%;
      border-top-color: $gray-900;
    }
  }
  
  &--bottom {
    top: 100%;
    margin-top: 0.75rem;
    
    &.su-float-button-tooltip--in-right {
      right: 0;
    }
    
    &.su-float-button-tooltip--in-left {
      left: 0;
    }
    
    .su-float-button-tooltip-arrow {
      bottom: 100%;
      border-bottom-color: $gray-900;
    }
  }
  
  &--left {
    right: 100%;
    margin-right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    
    .su-float-button-tooltip-arrow {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: $gray-900;
    }
  }
  
  &--right {
    left: 100%;
    margin-left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    
    .su-float-button-tooltip-arrow {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: $gray-900;
    }
  }
}

.su-float-button-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

// Animations
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-float-button-slot {
    background-color: $gray-800;
    border-color: $gray-600;
  }
  
  .su-float-button-tooltip {
    background-color: $gray-100;
    color: $gray-900;
    
    &--top .su-float-button-tooltip-arrow {
      border-top-color: $gray-100;
    }
    
    &--bottom .su-float-button-tooltip-arrow {
      border-bottom-color: $gray-100;
    }
    
    &--left .su-float-button-tooltip-arrow {
      border-left-color: $gray-100;
    }
    
    &--right .su-float-button-tooltip-arrow {
      border-right-color: $gray-100;
    }
  }
  
  .su-float-button-badge {
    border-color: $gray-800;
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-float-button {
    border: 3px solid currentColor;
  }
  
  .su-float-button-badge {
    border-width: 3px;
  }
  
  .su-float-button-tooltip {
    border: 2px solid $gray-600;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-float-button-container,
  .su-float-button,
  .su-float-button-slot {
    transition: none;
    animation: none;
  }
  
  .su-float-button-container--hidden {
    transform: none;
  }
  
  .su-float-button:hover:not(:disabled) {
    transform: none;
  }
  
  .su-float-button-badge {
    animation: none;
  }
}

// Responsive
@media (max-width: 768px) {
  .su-float-button-container {
    bottom: 16px !important;
  
    // Ajustement automatique des offsets sur mobile
    &--right {
      right: 16px !important;
    }
    
    &--left {
      left: 16px !important;
    }
  }
  
  .su-float-button-slot {
    max-width: calc(100vw - 80px);
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
  
  .su-float-button-tooltip {
    max-width: 150px;
    font-size: 0.75rem;
  }
}

// Support des zones sûres (iPhone X+)
@supports (padding: max(0px)) {
  .su-float-button-container {
    bottom: max(24px, env(safe-area-inset-bottom));
    
    &--right {
      right: max(24px, env(safe-area-inset-right));
    }
    
    &--left {
      left: max(24px, env(safe-area-inset-left));
    }
  }
}
</style>