<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CardProps } from '@/types'

const slots = useSlots()

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  size: 'md',
  direction: 'vertical',
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
  // Sans `radius`, la carte prend le rayon des conteneurs (--su-radius-container)
  props.radius && `su-card--radius-${props.radius}`,
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
@use '../../styles/abstracts' as *;

// ============================================================
// CARD — conteneur arrondi (16px), bordure en transparence,
// ombre légère, typo resserrée
// ============================================================

.su-card {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--su-radius-container);
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
  background-clip: padding-box;
  text-decoration: none;

  @include transition(box-shadow, border-color, background-color);

  // ### Variantes

  &--default {
    border: 1px solid var(--su-border-alpha);
    box-shadow: var(--su-shadow-control);
  }

  &--outlined {
    border: 1px solid var(--su-border-default);
    background-color: transparent;
  }

  &--elevated {
    border: 1px solid var(--su-border-alpha);
    box-shadow: var(--su-shadow-popover);
  }

  &--filled {
    border: 1px solid transparent;
    background-color: var(--su-bg-muted);
  }

  // ### Rayons explicites (prop `radius`)

  &--radius-none { border-radius: 0; }
  &--radius-sm { border-radius: var(--su-radius-md); }
  &--radius-md { border-radius: var(--su-radius-lg); }
  &--radius-lg { border-radius: var(--su-radius-xl); }
  &--radius-xl { border-radius: var(--su-radius-2xl); }
  &--radius-full { border-radius: 1.5rem; }

  // ### Tailles (marges et typographie)

  &--sm {
    --_su-card-pad: 1rem;
    --_su-card-gap: 0.5rem;
    --_su-card-title: var(--su-font-size-base);
    --_su-card-text: var(--su-font-size-xs);
  }

  &--md {
    --_su-card-pad: 1.5rem;
    --_su-card-gap: 0.75rem;
    --_su-card-title: var(--su-font-size-lg);
    --_su-card-text: var(--su-font-size-sm);
  }

  &--lg {
    --_su-card-pad: 2rem;
    --_su-card-gap: 1rem;
    --_su-card-title: var(--su-font-size-xl);
    --_su-card-text: var(--su-font-size-base);
  }

  // ### Direction

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

    // Empilement vertical sur petit écran
    @include down('sm') {
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

  // Image en bas (vertical uniquement)
  &--image-bottom {
    .su-card__image-wrapper--bottom {
      order: 1;
    }

    .su-card__body {
      order: 0;
    }
  }

  // ### Interactive (clickable / lien)

  &--clickable {
    cursor: pointer;

    &:hover {
      border-color: var(--su-border-default);
      box-shadow: var(--su-shadow-popover);
    }

    &:focus-visible {
      @include focus-ring;
    }
  }

  &--disabled {
    opacity: var(--su-opacity-disabled);
    pointer-events: none;
    cursor: default;
  }

  &--full-width {
    width: 100%;
  }

  // ### Image

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
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0.75rem;
    pointer-events: none;

    > * {
      pointer-events: auto;
    }
  }

  // ### Corps

  &__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--_su-card-gap);
    min-width: 0;
    padding: var(--_su-card-pad);
  }

  &__header {
    margin-bottom: 0.25rem;
  }

  &__titles {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  &__title {
    margin: 0;
    font-size: var(--_su-card-title);
    font-weight: var(--su-font-weight-semibold);
    line-height: var(--su-line-height-tight);
    color: var(--su-text-primary);
  }

  &__subtitle {
    margin: 0;
    font-size: var(--_su-card-text);
    line-height: 1.4;
    color: var(--su-text-tertiary);
  }

  &__content {
    font-size: var(--_su-card-text);
    line-height: var(--su-line-height-normal);
    color: var(--su-text-secondary);
  }

  // Pied : séparé par un filet qui traverse la carte
  &__footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: auto calc(var(--_su-card-pad) * -1) calc(var(--_su-card-pad) * -1);
    padding: calc(var(--_su-card-gap) + 0.25rem) var(--_su-card-pad);
    border-top: 1px solid var(--su-border-alpha);
  }

  @include high-contrast {
    border-width: 2px;

    &.su-card--clickable:focus-visible {
      outline-width: 3px;
    }
  }
}
</style>
