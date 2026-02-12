<script setup lang="ts">
import { computed } from 'vue'
// TODO : to use > import type { HeadingProps } from '@/types'

const props = defineProps({
  level: {
    type: [Number, String],
    default: 2,
    validator: (value: number | string) => {
      const n = Number(value)
      return (n >= 1 && n <= 6) || value === 'div'
    }
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (val: string) => ['primary', 'secondary', 'tertiary'].includes(val)
  },
  truncate: {
    type: Boolean,
    default: false
  }
})

const tag = computed(() => (props.level === 'div' ? 'div' : `h${props.level}`))
</script>

<template>
  <component
    :is="tag"
    class="su-heading"
    :class="[
      `su-heading--level-${level}`,
      `su-heading--${variant}`,
      { 'su-heading--with-slots': $slots.before || $slots.after, 'su-heading--truncate': truncate }
    ]"
  >
    <div
      v-if="$slots.before"
      class="su-heading__slot"
    >
      <slot name="before" />
    </div>

    <slot />
    
    <div
      v-if="$slots.after"
      class="su-heading__slot"
    >
      <slot name="after" />
    </div>
  </component>
</template>

<style lang="scss" scoped>
@use '../../styles/main' as *;
@use '../../styles/foundations/colors' as *;
@use 'sass:map';

$heading-level: (
  1: (
    font-size: var(--su-font-size-3xl),
    line-height: var(--su-line-height-relaxed)
  ),
  2: (
    font-size: var(--su-font-size-2xl),
    line-height: var(--su-line-height-relaxed)
  ),
  3: (
    font-size: var(--su-font-size-xl),
    line-height: var(--su-line-height-normal)
  ),
  4: (
    font-size: var(--su-font-size-lg),
    line-height: var(--su-line-height-normal)
  ),
  5: (
    font-size: var(--su-font-size-md),
    line-height: var(--su-line-height-tight)
  ),
  6: (
    font-size: var(--su-font-size-sm),
    line-height: var(--su-line-height-tight)
  )
);

.su-heading {
  $self: &;

  //@include su-reset-styles;

  font-family: var(--su-font-family-base);
  font-weight: 600;
  color: var(--su-text-primary);

  &--primary {
    color: var(--su-text-primary)
  }

  &--secondary {
    color: var(--su-text-secondary);
  }

  &--tertiary {
    color: var(--su-text-tertiary);
  }

  &__slot {
    display: inline-flex;
  }

  &--with-slots {
    display: flex;
    align-items: center;
    gap: var(--su-spacing-2);

    svg {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &--truncate {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @each $level, $styles in $heading-level {
    &--level-#{$level} {
      font-size: map.get($styles, font-size);
      line-height: map.get($styles, line-height);
    }
  }
}
</style>
