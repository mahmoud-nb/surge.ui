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
@use '../../styles/abstracts' as *;

@use 'sass:map';

// Titres : interlignage serré et léger resserrement des grands corps
$heading-level: (
  1: (font-size: var(--su-font-size-3xl), line-height: 1.2, letter-spacing: -0.025em),
  2: (font-size: var(--su-font-size-2xl), line-height: 1.25, letter-spacing: -0.02em),
  3: (font-size: var(--su-font-size-xl), line-height: 1.3, letter-spacing: -0.01em),
  4: (font-size: var(--su-font-size-lg), line-height: 1.35, letter-spacing: 0),
  5: (font-size: var(--su-font-size-md), line-height: 1.4, letter-spacing: 0),
  6: (font-size: var(--su-font-size-sm), line-height: 1.4, letter-spacing: 0)
);

.su-heading {
  font-family: var(--su-font-family-heading, var(--su-font-family-base));
  font-weight: var(--su-font-weight-semibold);
  color: var(--su-text-primary);
  text-wrap: balance;

  &--primary {
    color: var(--su-text-primary);
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
    gap: $spacing-2;

    svg {
      display: inline-block;
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
  }

  &--truncate {
    display: block;
    @include truncate;
  }

  @each $level, $styles in $heading-level {
    &--level-#{$level} {
      font-size: map.get($styles, font-size);
      line-height: map.get($styles, line-height);
      letter-spacing: map.get($styles, letter-spacing);
    }
  }
}
</style>
