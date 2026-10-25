<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '@/types'
import Spinner from './Spinner.vue'
import { useLocale } from '@/composables/useLocale'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  iconDisplay: 'left',
  tabIndex: 0
})

// Textes par défaut : prop explicite, sinon locale courante
const { t } = useLocale()
const loadingText = computed(() => props.loadingLabel ?? t('common.loading'))

const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const classes = computed(() => {
  return [
    'su-button',
    props.size && `su-button--${props.size}`,
    props.variant && `su-button--${props.variant}`,
    // Sans `radius`, le bouton prend le rayon des contrôles (--su-radius-control)
    props.radius && `su-button--radius-${props.radius}`,
    {
      'su-button--disabled': props.disabled,
      'su-button--loading': props.loading,
      'su-button--block': props.block,
      'su-button--icon-only': props.icon && props.iconDisplay === 'only',
      'su-button--icon-right': props.icon && props.iconDisplay === 'right'
    }
  ]
})

// Détermine si le bouton contient du texte
const hasText = computed(() => {
  return !(props.icon && props.iconDisplay === 'only')
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

// Entrée et Espace déclenchent nativement le clic (et la soumission d'un
// formulaire pour type="submit") : aucune émulation clavier n'est nécessaire.
const handleKeydown = (event: KeyboardEvent) => emit('keydown', event)

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Calcul des attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {}

  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.ariaExpanded !== undefined) attrs['aria-expanded'] = props.ariaExpanded
  if (props.ariaPressed !== undefined) attrs['aria-pressed'] = props.ariaPressed
  if (props.role) attrs['role'] = props.role

  // États automatiques
  if (props.loading) {
    attrs['aria-busy'] = 'true'
  }

  if (props.disabled) {
    attrs['aria-disabled'] = 'true'
  }

  return attrs
})

// Un bouton icône seule doit avoir un nom accessible (vérifié une seule fois)
if (props.icon && props.iconDisplay === 'only' && !props.ariaLabel && !props.ariaLabelledBy) {
  console.warn('[SuButton] Un bouton avec iconDisplay="only" doit recevoir ariaLabel pour être accessible.')
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    :tabindex="disabled ? -1 : tabIndex"
    v-bind="ariaAttributes"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- Icône -->
    <component
      :is="icon"
      v-if="icon"
      class="su-button__icon"
      aria-hidden="true"
    />

    <!-- Contenu textuel (conservé pendant le chargement pour garder la largeur) -->
    <span
      v-if="hasText && $slots.default"
      class="su-button__content"
    >
      <slot />
    </span>

    <Spinner
      v-if="loading"
      class="su-button__spinner"
      :label="loadingText"
      color="currentColor"
      :size="16"
    />
  </button>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// BUTTON — base et variantes partagées (abstracts/_patterns.scss)
// ============================================================

.su-button {
  @include button-base;

  // Radius explicites (prop `radius`)
  @include use-border-radius;

  // ### Tailles (36/32 · 32/28 · 40/36 px, compactes dès `sm`)

  &--sm { @include control-size('sm'); }
  &--md { @include control-size('md'); }
  &--lg { @include control-size('lg'); }

  &--icon-only {
    padding-inline: 0;
    aspect-ratio: 1;
  }

  // ### Variantes

  @include button-variants;

  &--custom {
    background-color: var(--su-custom-button-bg, var(--su-primary-default));
    color: var(--su-custom-button-color, var(--su-primary-text));
    border: var(--su-custom-button-border, 1px solid transparent);

    &:hover:not(:disabled) {
      background-color: var(--su-custom-button-hover-bg, var(--su-primary-hover));
      box-shadow: var(--su-custom-button-hover-shadow, none);
    }
  }

  // ### États

  &--disabled {
    @include button-disabled;
  }

  &--loading {
    // Le contenu reste en place (largeur stable) mais devient invisible
    .su-button__icon,
    .su-button__content {
      opacity: 0;
    }
  }

  &__spinner {
    position: absolute;
    inset: 0;
    margin: auto;
  }

  &--block {
    width: 100%;
  }

  // Direction de l'icône
  &--icon-right {
    flex-direction: row-reverse;
  }

  &__icon {
    @include button-icon;

    margin-inline: -0.125rem;
  }

  &--icon-only &__icon {
    margin-inline: 0;
    opacity: 1;
  }
}
</style>
