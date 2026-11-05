<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { DividerProps } from '@/types'

// ============================================================
// DIVIDER — trait de séparation horizontal ou vertical.
// - Sans texte : role="separator" (aria-orientation en vertical),
//   sauf `decorative` (trait masqué aux lecteurs d'écran).
// - Avec texte (« ou », « Aujourd'hui ») : le texte reste lisible,
//   les traits sont décoratifs.
// ============================================================

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  variant: 'solid',
  labelAlign: 'center',
  spacing: 'md',
  decorative: false
})

const slots = useSlots()
const hasLabel = computed(() => props.orientation === 'horizontal' && !!(props.label || slots.default))

const classes = computed(() => [
  'su-divider',
  `su-divider--${props.orientation}`,
  `su-divider--${props.variant}`,
  `su-divider--spacing-${props.spacing}`,
  { [`su-divider--labeled su-divider--label-${props.labelAlign}`]: hasLabel.value }
])

const separatorAttrs = computed<Record<string, string | undefined>>(() => {
  if (hasLabel.value) return {}
  if (props.decorative) return { 'aria-hidden': 'true' }
  return {
    role: 'separator',
    'aria-orientation': props.orientation === 'vertical' ? 'vertical' : undefined
  }
})
</script>

<template>
  <div
    :class="classes"
    v-bind="separatorAttrs"
  >
    <template v-if="hasLabel">
      <span
        class="su-divider__line"
        aria-hidden="true"
      />
      <span class="su-divider__label">
        <slot>{{ label }}</slot>
      </span>
      <span
        class="su-divider__line"
        aria-hidden="true"
      />
    </template>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// DIVIDER — trait de 1px en --su-border-alpha (suit le thème)
// ============================================================

$divider-spacings: (
  'none': 0,
  'sm': 0.5rem,
  'md': 1rem,
  'lg': 1.5rem
);

.su-divider {
  --_su-divider-style: solid;

  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0;
  border: 0 var(--_su-divider-style) var(--su-border-alpha);

  &--dashed {
    --_su-divider-style: dashed;
  }

  &--horizontal {
    width: 100%;
    border-top-width: 1px;
  }

  &--vertical {
    align-self: stretch;
    width: 0;
    min-height: 1em;
    border-inline-start-width: 1px;
  }

  @each $name, $space in $divider-spacings {
    &--horizontal.su-divider--spacing-#{$name} {
      margin-block: $space;
    }

    &--vertical.su-divider--spacing-#{$name} {
      margin-inline: $space;
    }
  }

  // Avec texte : deux traits de part et d'autre du libellé
  &--labeled {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-top-width: 0;
  }

  &--label-start .su-divider__line:first-child,
  &--label-end .su-divider__line:last-child {
    flex: 0 0 1.5rem;
  }

  @include high-contrast {
    border-color: var(--su-border-strong);
  }
}

.su-divider__line {
  flex: 1;
  border-top: 1px var(--_su-divider-style) var(--su-border-alpha);

  @include high-contrast {
    border-color: var(--su-border-strong);
  }
}

.su-divider__label {
  flex-shrink: 0;
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-medium);
  color: var(--su-text-tertiary);
  white-space: nowrap;
}
</style>
