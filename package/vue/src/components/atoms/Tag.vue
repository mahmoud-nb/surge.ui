<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { TagProps } from '@/types'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// TAG — étiquette (filtre actif, mot-clé, valeur choisie), avec un
// bouton de retrait optionnel nommé « Retirer {libellé} ».
// Pour un simple indicateur (statut, compteur), voir SuBadge.
// ============================================================

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'md',
  removable: false,
  disabled: false
})

const emit = defineEmits<{
  remove: [event: MouseEvent]
}>()

const { t } = useLocale()

// Libellé lu dans le slot quand la prop `label` est absente
const labelRef = ref<HTMLElement>()
const slotText = ref('')
const readSlotText = () => {
  slotText.value = labelRef.value?.textContent?.trim() ?? ''
}
onMounted(readSlotText)
onUpdated(readSlotText)

const removeText = computed(() => props.removeLabel ?? t('tag.remove', { label: props.label ?? slotText.value }))

const classes = computed(() => [
  'su-tag',
  `su-tag--${props.variant}`,
  `su-tag--${props.size}`,
  {
    'su-tag--removable': props.removable,
    'su-tag--disabled': props.disabled
  }
])

const handleRemove = (event: MouseEvent) => {
  if (!props.disabled) emit('remove', event)
}
</script>

<template>
  <span :class="classes">
    <component
      :is="icon"
      v-if="icon"
      class="su-tag__icon"
      aria-hidden="true"
    />
    <span
      ref="labelRef"
      class="su-tag__label"
    >
      <slot>{{ label }}</slot>
    </span>
    <button
      v-if="removable"
      type="button"
      class="su-tag__remove"
      :aria-label="removeText"
      :disabled="disabled"
      @click="handleRemove"
    >
      <XMarkIcon
        class="su-tag__remove-icon"
        aria-hidden="true"
      />
    </button>
  </span>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TAG — pastille arrondie : neutre (fond atténué) ou teintée
// (soft-variant : fond 8 %, bordure 32 %, texte d'état)
// ============================================================

.su-tag {
  --_su-tag-height: 1.5rem;

  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  box-sizing: border-box;
  max-width: 100%;
  height: var(--_su-tag-height);
  padding-inline: 0.5rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-md);
  background-color: var(--su-bg-muted);
  color: var(--su-text-primary);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-medium);
  line-height: 1;
  vertical-align: middle;

  &--sm {
    --_su-tag-height: 1.25rem;

    padding-inline: 0.375rem;
    font-size: 0.6875rem;
  }

  &--lg {
    --_su-tag-height: 1.75rem;

    padding-inline: 0.625rem;
    font-size: var(--su-font-size-sm);
  }

  &--removable {
    padding-inline-end: 0.125rem;
  }

  &--primary {
    border-color: with-alpha(primary-default, 32%);
    background-color: with-alpha(primary-default, 8%);
    color: var(--su-primary-default);
  }

  @each $state in ('success', 'warning', 'error', 'info') {
    &--#{$state} {
      @include soft-variant($state);
    }
  }

  &--disabled {
    @include disabled-state;
  }

  @include high-contrast {
    border-color: currentcolor;
  }
}

.su-tag__icon {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
}

.su-tag__label {
  @include truncate;
}

.su-tag__remove {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: calc(var(--_su-tag-height) - 0.375rem);
  height: calc(var(--_su-tag-height) - 0.375rem);
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-sm);
  background: transparent;
  color: inherit;
  opacity: 0.72;
  cursor: pointer;

  @include transition(background-color, opacity);
  @include touch-target-overlay;

  &:hover:not(:disabled) {
    background-color: var(--su-bg-accent);
    opacity: 1;
  }

  &:focus-visible {
    @include focus-ring($offset: 0);

    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.su-tag__remove-icon {
  width: 0.875em;
  height: 0.875em;
  stroke-width: 2;
}
</style>
