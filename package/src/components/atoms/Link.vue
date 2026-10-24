<script setup lang="ts">
import { computed } from 'vue'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import type { LinkProps } from '@/types'

const props = withDefaults(defineProps<LinkProps>(), {
  variant: 'default',
  size: 'md',
  underline: 'hover',
  disabled: false,
  iconDisplay: 'left',
  external: false,
  externalLabel: "(s'ouvre dans un nouvel onglet)",
  tabIndex: 0
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

// Détermination du type de lien (interne Vue Router vs externe)
const isRouterLink = computed(() => {
  return props.to !== undefined
})

const isExternalLink = computed(() => {
  return props.external || (props.href && (props.href.startsWith('http') || props.href.startsWith('//') || props.target === '_blank'))
})

const linkAttributes = computed(() => {
  const attrs: Record<string, any> = {}
  
  if (!isRouterLink.value) {
    attrs.href = props.href
    
    if (isExternalLink.value) {
      attrs.target = props.target || '_blank'
      attrs.rel = props.rel || 'noopener noreferrer'
    } else {
      if (props.target) attrs.target = props.target
      if (props.rel) attrs.rel = props.rel
    }
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaDescribedBy) attrs['aria-describedby'] = props.ariaDescribedBy
  if (props.role) attrs['role'] = props.role
  if (props.disabled) {
    attrs['aria-disabled'] = 'true'
    attrs.tabindex = -1
  } else {
    attrs.tabindex = props.tabIndex
  }
  
  return attrs
})

// Classes CSS
const linkClasses = computed(() => [
  'su-link',
  `su-link--${props.variant}`,
  `su-link--${props.size}`,
  `su-link--underline-${props.underline}`,
  {
    'su-link--disabled': props.disabled,
    'su-link--external': isExternalLink.value,
    'su-link--block': props.block,
    'su-link--icon-only': props.icon && props.iconDisplay === 'only',
    'su-link--icon-top': props.icon && props.iconDisplay === 'top',
    'su-link--icon-right': props.icon && props.iconDisplay === 'right'
  }
])

// Détermine si le lien contient du texte
const hasText = computed(() => {
  return !(props.icon && props.iconDisplay === 'only')
})

// Gestionnaires d'événements
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    if (props.disabled) {
      event.preventDefault()
      return
    }
  }
  emit('keydown', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Validation pour les liens avec icône seule
if (props.icon && props.iconDisplay === 'only' && !props.ariaLabel) {
  console.warn('Link with icon and iconDisplay="only" should have an ariaLabel for accessibility')
}
</script>

<template>
  <component
    :is="isRouterLink ? 'router-link' : 'a'"
    :class="linkClasses"
    v-bind="isRouterLink ? { to: to, ...linkAttributes } : linkAttributes"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- Icône -->
    <component 
      :is="icon" 
      v-if="icon" 
      class="su-link__icon"
      aria-hidden="true"
    />
    <!-- Contenu textuel -->
    <span
      v-if="hasText"
      class="su-link__content"
    >
      <slot />
    </span>

    <!-- Icône externe -->
    <ArrowTopRightOnSquareIcon
      v-if="isExternalLink && hasText"
      class="su-link__icon su-link__icon--external"
      aria-hidden="true"
    />
    <span
      v-if="isExternalLink && linkAttributes.target === '_blank'"
      class="sr-only"
    >{{ externalLabel }}</span>
  </component>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// LINK — lien texte sans marge parasite, soulignement décalé,
// anneau de focus arrondi. Les variantes avec fond au survol
// (primary, secondary, custom) gagnent une marge compensée.
// ============================================================

.su-link {
  $self: &;

  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  box-sizing: border-box;
  border-radius: var(--su-radius-sm);
  font-family: inherit;
  font-weight: var(--su-font-weight-medium);
  text-decoration-line: none;
  text-decoration-thickness: from-font;
  text-underline-offset: 0.25em;
  cursor: pointer;
  outline: none;
  @include transition(color, background-color, text-decoration-color);

  &:focus-visible {
    @include focus-ring;
  }

  // ### Disposition

  &--block {
    display: flex;
    width: 100%;

    #{$self}__content {
      flex: 1;
    }
  }

  &--icon-right {
    flex-direction: row-reverse;
  }

  &--icon-top {
    flex-direction: column;
  }

  // ### Tailles

  &--sm {
    font-size: var(--su-font-size-sm);
    line-height: var(--su-line-height-tight);
    --_su-link-icon: 0.875rem;
  }

  &--md {
    font-size: var(--su-font-size-base);
    line-height: var(--su-line-height-normal);
    --_su-link-icon: 1rem;

    @include up('sm') {
      font-size: var(--su-font-size-sm);
    }
  }

  &--lg {
    font-size: var(--su-font-size-base);
    line-height: var(--su-line-height-normal);
    --_su-link-icon: 1.125rem;
  }

  &__icon {
    width: var(--_su-link-icon, 1em);
    height: var(--_su-link-icon, 1em);
    flex-shrink: 0;

    &--external {
      width: calc(var(--_su-link-icon, 1em) * 0.85);
      height: calc(var(--_su-link-icon, 1em) * 0.85);
      opacity: 0.7;
    }
  }

  &__content {
    min-width: 0;
  }

  // ### Variantes

  &--default {
    color: var(--su-link-default);

    &:hover {
      color: var(--su-link-hover);
    }
  }

  &--muted {
    color: var(--su-text-tertiary);
    font-weight: var(--su-font-weight-normal);

    &:hover {
      color: var(--su-text-primary);
    }
  }

  // Variantes « pastille » : fond au survol, marge compensée
  &--primary,
  &--secondary,
  &--custom {
    margin-inline: -0.375rem;
    padding: 0.125rem 0.375rem;
  }

  &--primary {
    color: var(--su-link-default);

    &:hover {
      color: var(--su-link-hover);
      background-color: with-alpha(link-default, 8%);
    }
  }

  &--secondary {
    color: var(--su-text-primary);

    &:hover {
      background-color: var(--su-bg-accent);
    }
  }

  &--custom {
    color: var(--su-custom-link-color, var(--su-link-default));

    &:hover {
      color: var(--su-custom-link-hover-color, var(--su-link-hover));
      background-color: var(--su-custom-link-hover-bg, with-alpha(link-default, 8%));
    }
  }

  // ### Soulignement (décoration en transparence, pleine au survol)

  &--underline-always {
    text-decoration-line: underline;
    text-decoration-color: color-mix(in srgb, currentcolor 40%, transparent);

    &:hover {
      text-decoration-color: currentcolor;
    }
  }

  &--underline-default,
  &--underline-hover {
    &:hover {
      text-decoration-line: underline;
    }
  }

  // ### États

  &--disabled {
    @include disabled-state;

    pointer-events: none;
  }

  &--icon-only {
    justify-content: center;
    gap: 0;
    margin-inline: 0;
    padding: 0.375rem;

    #{$self}__icon {
      width: calc(var(--_su-link-icon, 1em) * 1.125);
      height: calc(var(--_su-link-icon, 1em) * 1.125);
    }
  }

  @include high-contrast {
    text-decoration-line: underline;

    &:focus-visible {
      outline-width: 3px;
    }
  }
}
</style>
