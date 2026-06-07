<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CardProps } from '@/types'

const slots = useSlots()

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  size: 'md',
  direction: 'vertical',
  radius: 'md',
  clickable: false,
  imageFit: 'cover',
  imageRatio: '16/9',
  imagePosition: 'top',
  titleLevel: 3,
  disabled: false,
  fullWidth: false,
})

defineSlots<{
  /** Contenu personnalisé de la zone image (remplace l'image prop) */
  image?(): any
  /** Badge ou overlay sur l'image */
  'image-overlay'?(): any
  /** En-tête au-dessus du body (après l'image) */
  header?(): any
  /** Contenu principal de la carte */
  default?(): any
  /** Titre personnalisé (remplace la prop title) */
  title?(): any
  /** Sous-titre personnalisé (remplace la prop subtitle) */
  subtitle?(): any
  /** Zone d'actions en bas de carte (boutons, liens) */
  footer?(): any
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// ========================================
// Composant racine dynamique
// ========================================

const rootTag = computed(() => {
  if (props.href && !props.disabled) return 'a'
  return 'article'
})

const rootAttrs = computed(() => {
  const attrs: Record<string, any> = {}

  if (props.href && !props.disabled) {
    attrs.href = props.href
    if (props.target) attrs.target = props.target
    if (props.target === '_blank') attrs.rel = 'noopener noreferrer'
  }

  if (props.clickable && !props.disabled && !props.href) {
    attrs.tabindex = '0'
    attrs.role = 'button'
  }

  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.disabled) attrs['aria-disabled'] = 'true'

  if (props.maxWidth) {
    attrs.style = { maxWidth: props.maxWidth }
  }

  return attrs
})

// ========================================
// Classes CSS
// ========================================

const cardClasses = computed(() => [
  'su-card',
  `su-card--${props.variant}`,
  `su-card--${props.size}`,
  `su-card--${props.direction}`,
  `su-card--radius-${props.radius}`,
  {
    'su-card--clickable': (props.clickable || props.href) && !props.disabled,
    'su-card--disabled': props.disabled,
    'su-card--full-width': props.fullWidth,
    'su-card--has-image': !!props.image || !!slots.image,
    'su-card--image-bottom': props.imagePosition === 'bottom',
  },
])

// ========================================
// Image
// ========================================

const imageStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.imageRatio && props.imageRatio !== 'auto') {
    styles.aspectRatio = props.imageRatio
  }

  return styles
})

// ========================================
// Heading tag
// ========================================

const headingTag = computed(() => `h${props.titleLevel}`)

// ========================================
// Event handlers
// ========================================

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return
  if (props.clickable && !props.href && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    emit('click', event as unknown as MouseEvent)
  }
}
</script>

<template>
  <component
    :is="rootTag"
    :class="cardClasses"
    v-bind="rootAttrs"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- Zone image -->
    <div
      v-if="image || $slots.image"
      class="su-card__image-wrapper"
      :class="{ 'su-card__image-wrapper--bottom': imagePosition === 'bottom' }"
    >
      <slot name="image">
        <img
          :src="image"
          :alt="imageAlt || ''"
          class="su-card__image"
          :class="`su-card__image--${imageFit}`"
          :style="imageStyle"
          loading="lazy"
        >
      </slot>

      <!-- Overlay sur l'image (badge, tag, etc.) -->
      <div
        v-if="$slots['image-overlay']"
        class="su-card__image-overlay"
      >
        <slot name="image-overlay" />
      </div>
    </div>

    <!-- Corps de la carte -->
    <div class="su-card__body">
      <!-- Header optionnel -->
      <div
        v-if="$slots.header"
        class="su-card__header"
      >
        <slot name="header" />
      </div>

      <!-- Titre -->
      <div
        v-if="title || $slots.title || subtitle || $slots.subtitle"
        class="su-card__titles"
      >
        <component
          :is="headingTag"
          v-if="title || $slots.title"
          class="su-card__title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </component>

        <p
          v-if="subtitle || $slots.subtitle"
          class="su-card__subtitle"
        >
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </p>
      </div>

      <!-- Contenu principal -->
      <div
        v-if="$slots.default"
        class="su-card__content"
      >
        <slot />
      </div>

      <!-- Footer / Actions -->
      <div
        v-if="$slots.footer"
        class="su-card__footer"
      >
        <slot name="footer" />
      </div>
    </div>
  </component>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;

// ========================================
// Base
// ========================================

.su-card {
  display: flex;
  flex-direction: column;
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
  overflow: hidden;
  text-decoration: none;
  @include transition(box-shadow, border-color, transform);

  // ========================================
  // Variants
  // ========================================

  &--default {
    border: 1px solid var(--su-border-default);
  }

  &--outlined {
    border: 1px solid var(--su-border-strong);
    background-color: transparent;
  }

  &--elevated {
    border: 1px solid var(--su-border-subtle);
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px -1px rgba(0, 0, 0, 0.1);
  }

  &--filled {
    border: none;
    background-color: var(--su-bg-hover);
  }

  // ========================================
  // Radius
  // ========================================

  &--radius-none { border-radius: 0; }
  &--radius-sm { border-radius: 0.25rem; }
  &--radius-md { border-radius: 0.5rem; }
  &--radius-lg { border-radius: 0.75rem; }
  &--radius-xl { border-radius: 1rem; }
  &--radius-full { border-radius: 1.5rem; }

  // ========================================
  // Sizes (padding & typography)
  // ========================================

  &--sm {
    .su-card__body {
      padding: 0.75rem;
      gap: 0.5rem;
    }

    .su-card__title {
      font-size: 0.875rem;
    }

    .su-card__subtitle,
    .su-card__content {
      font-size: 0.75rem;
    }

    .su-card__footer {
      padding-top: 0.5rem;
    }
  }

  &--md {
    .su-card__body {
      padding: 1.25rem;
      gap: 0.75rem;
    }

    .su-card__title {
      font-size: 1.125rem;
    }

    .su-card__subtitle,
    .su-card__content {
      font-size: 0.875rem;
    }

    .su-card__footer {
      padding-top: 0.75rem;
    }
  }

  &--lg {
    .su-card__body {
      padding: 1.75rem;
      gap: 1rem;
    }

    .su-card__title {
      font-size: 1.375rem;
    }

    .su-card__subtitle,
    .su-card__content {
      font-size: 1rem;
    }

    .su-card__footer {
      padding-top: 1rem;
    }
  }

  // ========================================
  // Direction
  // ========================================

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;

    .su-card__image-wrapper {
      flex-shrink: 0;
      width: 40%;
      max-width: 280px;
    }

    .su-card__image {
      height: 100%;
      aspect-ratio: auto;
    }

    .su-card__body {
      flex: 1;
      min-width: 0;
    }
  }

  // Image en bas (vertical uniquement)
  &--image-bottom {
    .su-card__image-wrapper--bottom {
      order: 1;
    }

    .su-card__body {
      order: 0;
    }
  }

  // ========================================
  // Interactive (clickable / link)
  // ========================================

  &--clickable {
    cursor: pointer;

    &:hover {
      border-color: var(--su-border-hover);
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: scale(0.99);
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  // ========================================
  // Disabled
  // ========================================

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }

  // ========================================
  // Full width
  // ========================================

  &--full-width {
    width: 100%;
  }

  // ========================================
  // Image
  // ========================================

  &__image-wrapper {
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__image {
    display: block;
    width: 100%;
    object-position: center;

    &--cover {
      object-fit: cover;
    }

    &--contain {
      object-fit: contain;
    }

    &--fill {
      object-fit: fill;
    }
  }

  &__image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.5rem;
    pointer-events: none;

    > * {
      pointer-events: auto;
    }
  }

  // ========================================
  // Body
  // ========================================

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  &__header {
    margin-bottom: 0.25rem;
  }

  // ========================================
  // Titles
  // ========================================

  &__titles {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__title {
    margin: 0;
    font-weight: 600;
    line-height: 1.3;
    color: var(--su-text-primary);
  }

  &__subtitle {
    margin: 0;
    line-height: 1.4;
    color: var(--su-text-secondary);
  }

  // ========================================
  // Content
  // ========================================

  &__content {
    line-height: 1.5;
    color: var(--su-text-secondary);
  }

  // ========================================
  // Footer
  // ========================================

  &__footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    border-top: 1px solid var(--su-border-subtle);
  }
}

// ========================================
// Responsive — horizontal → vertical on small screens
// ========================================

@media (max-width: 640px) {
  .su-card--horizontal {
    flex-direction: column;

    .su-card__image-wrapper {
      width: 100%;
      max-width: none;
    }

    .su-card__image {
      height: auto;
      aspect-ratio: 16/9;
    }
  }
}

// ========================================
// High contrast
// ========================================

@media (prefers-contrast: high) {
  .su-card {
    border-width: 2px;

    &--clickable:focus-visible {
      outline-width: 3px;
    }
  }
}

// ========================================
// Reduced motion
// ========================================

@media (prefers-reduced-motion: reduce) {
  .su-card {
    transition: none;
  }
}
</style>
