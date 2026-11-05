<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useId, useSlots, watch } from 'vue'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import Button from '../atoms/Button.vue'
import type { ToastProps } from '@/types'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// TOAST — une notification de la pile (rendue par SuToaster). Gère son
// propre délai, suspendu par `paused` (survol, focus, onglet masqué) et
// relancé quand son contenu change. N'annonce rien : useToast s'en charge.
// ============================================================

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'neutral',
  dismissible: true,
  duration: 5000,
  paused: false
})

const emit = defineEmits<{
  dismiss: [reason: 'timeout' | 'close' | 'action']
}>()

const { t } = useLocale()
const slots = useSlots()
const dismissLabelText = computed(() => props.dismissLabel ?? t('toast.dismiss'))

const titleId = `toast-title-${useId()}`
const hasTitle = computed(() => !!(props.title || slots.title))

const icons = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon
}
const icon = computed(() => (props.type === 'neutral' ? undefined : icons[props.type]))

const classes = computed(() => [
  'su-toast',
  `su-toast--${props.type}`,
  { 'su-toast--dismissible': props.dismissible }
])

// ### Délai : temps restant conservé pendant les pauses

let timer: ReturnType<typeof setTimeout> | undefined
let remaining = props.duration
let startedAt = 0

const stop = () => {
  clearTimeout(timer)
  timer = undefined
}

const start = () => {
  stop()
  if (props.duration <= 0 || props.paused || remaining <= 0) return
  startedAt = Date.now()
  timer = setTimeout(() => emit('dismiss', 'timeout'), remaining)
}

const pause = () => {
  if (!timer) return
  stop()
  remaining -= Date.now() - startedAt
}

watch(() => props.paused, (paused) => (paused ? pause() : start()))

// Contenu remplacé (même id) : le délai repart de zéro
watch(
  () => [props.duration, props.title, props.description, props.type],
  () => {
    remaining = props.duration
    start()
  }
)

onMounted(start)
onBeforeUnmount(stop)

const handleAction = () => {
  props.action?.onClick()
  emit('dismiss', 'action')
}
</script>

<template>
  <div
    :class="classes"
    :aria-labelledby="hasTitle ? titleId : undefined"
    role="group"
  >
    <component
      :is="icon"
      v-if="icon"
      class="su-toast__icon"
      aria-hidden="true"
    />

    <div class="su-toast__content">
      <div
        v-if="hasTitle"
        :id="titleId"
        class="su-toast__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="description || $slots.description"
        class="su-toast__description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
      <slot />
    </div>

    <Button
      v-if="action"
      class="su-toast__action"
      variant="outline"
      size="sm"
      @click="handleAction"
    >
      {{ action.label }}
    </Button>

    <button
      v-if="dismissible"
      type="button"
      class="su-toast__close"
      :aria-label="dismissLabelText"
      @click="emit('dismiss', 'close')"
    >
      <XMarkIcon
        class="su-toast__close-icon"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TOAST — surface surélevée, icône colorée selon le type, action
// optionnelle et bouton de fermeture
// ============================================================

.su-toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-container);
  background-color: var(--su-bg-surface-elevated);
  background-clip: padding-box;
  color: var(--su-text-primary);
  box-shadow: var(--su-shadow-lg);
  font-size: var(--su-font-size-base);
  line-height: 1.4;

  @include inner-highlight;

  @include up('sm') {
    font-size: var(--su-font-size-sm);
  }

  &--dismissible {
    padding-inline-end: 2.75rem;
  }

  @each $type in ('success', 'warning', 'error', 'info') {
    &--#{$type} .su-toast__icon {
      color: var(--su-state-#{$type});
    }
  }

  @include high-contrast {
    border-width: 2px;
  }
}

// Icône centrée sur la première ligne du texte
.su-toast__icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1.4em;
}

.su-toast__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.su-toast__title {
  font-weight: var(--su-font-weight-medium);
}

.su-toast__description {
  color: var(--su-text-secondary);
}

.su-toast__action {
  align-self: center;
}

.su-toast__close {
  position: absolute;
  top: 0.5rem;
  inset-inline-end: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: var(--su-text-tertiary);
  cursor: pointer;

  @include transition(background-color, color);
  @include touch-target-overlay;

  &:hover {
    background-color: var(--su-bg-accent);
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: 0);
  }
}

.su-toast__close-icon {
  width: 1rem;
  height: 1rem;
}
</style>
