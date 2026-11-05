<script setup lang="ts">
import { computed } from 'vue'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import type { StepItem, StepStatus, StepperProps } from '@/types'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// STEPPER — progression d'un parcours en plusieurs étapes.
// Liste ordonnée nommée (la position « 2 sur 4 » est donnée par la
// liste), étape courante en aria-current="step", statut « terminée » /
// « à corriger » lu après le libellé. Avec `clickable`, les étapes
// franchies deviennent des boutons pour revenir en arrière.
// ============================================================

const props = withDefaults(defineProps<StepperProps>(), {
  steps: () => [],
  orientation: 'horizontal',
  clickable: false,
  linear: true,
  size: 'md'
})

const current = defineModel<number>({ default: 0 })

const emit = defineEmits<{
  change: [index: number]
}>()

defineSlots<{
  /** Contenu sous l'étape courante (orientation verticale) */
  content?: (props: { step: StepItem; index: number }) => unknown
}>()

const { t } = useLocale()
const label = computed(() => props.ariaLabel ?? t('stepper.label'))

const statusOf = (step: StepItem, index: number): StepStatus => {
  if (step.error) return 'error'
  if (index < current.value) return 'complete'
  if (index === current.value) return 'current'
  return 'upcoming'
}

const statusText = (status: StepStatus) => {
  if (status === 'complete') return t('stepper.complete')
  if (status === 'error') return t('stepper.error')
  return ''
}

const isInteractive = (step: StepItem, index: number) =>
  props.clickable && !step.disabled && index !== current.value && (!props.linear || index < current.value)

const goTo = (index: number) => {
  const step = props.steps[index]
  if (!step || !isInteractive(step, index)) return
  current.value = index
  emit('change', index)
}

const classes = computed(() => [
  'su-stepper',
  `su-stepper--${props.orientation}`,
  `su-stepper--${props.size}`
])
</script>

<template>
  <ol
    :class="classes"
    :aria-label="label"
  >
    <li
      v-for="(step, index) in steps"
      :key="index"
      :class="['su-stepper__step', `su-stepper__step--${statusOf(step, index)}`, { 'su-stepper__step--disabled': step.disabled }]"
      :aria-current="index === current ? 'step' : undefined"
    >
      <component
        :is="isInteractive(step, index) ? 'button' : 'div'"
        :type="isInteractive(step, index) ? 'button' : undefined"
        class="su-stepper__trigger"
        @click="goTo(index)"
      >
        <span
          class="su-stepper__indicator"
          aria-hidden="true"
        >
          <CheckIcon
            v-if="statusOf(step, index) === 'complete'"
            class="su-stepper__icon"
          />
          <ExclamationTriangleIcon
            v-else-if="statusOf(step, index) === 'error'"
            class="su-stepper__icon"
          />
          <component
            :is="step.icon"
            v-else-if="step.icon"
            class="su-stepper__icon"
          />
          <template v-else>{{ index + 1 }}</template>
        </span>

        <span class="su-stepper__text">
          <span class="su-stepper__label">
            {{ step.label }}<span
              v-if="statusText(statusOf(step, index))"
              class="su-stepper__status"
            >, {{ statusText(statusOf(step, index)) }}</span>
          </span>
          <span
            v-if="step.description"
            class="su-stepper__description"
          >{{ step.description }}</span>
        </span>
      </component>

      <span
        v-if="index < steps.length - 1"
        class="su-stepper__connector"
        aria-hidden="true"
      />

      <div
        v-if="orientation === 'vertical' && index === current && $slots.content"
        class="su-stepper__content"
      >
        <slot
          name="content"
          :step="step"
          :index="index"
        />
      </div>
    </li>
  </ol>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// STEPPER — pastilles numérotées reliées par un trait ; étape
// franchie et courante en couleur primaire, erreur en rouge.
// Sélecteurs de liste préfixés : la page hôte stylise souvent ol/li.
// ============================================================

.su-stepper {
  --_su-step-size: 1.75rem;
  --_su-step-gap: 0.75rem;

  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--su-font-size-sm);
  line-height: 1.4;

  &--sm {
    --_su-step-size: 1.5rem;

    font-size: var(--su-font-size-xs);
  }

  &--lg {
    --_su-step-size: 2rem;

    font-size: var(--su-font-size-base);
  }

  &--horizontal {
    flex-direction: row;
    align-items: center;
    gap: var(--_su-step-gap);
  }

  &--vertical {
    flex-direction: column;
  }

  .su-stepper__step {
    position: relative;
    display: flex;
    min-width: 0;
    margin: 0;
  }
}

// ### Horizontal : [●] Libellé ───── [●] Libellé

.su-stepper--horizontal .su-stepper__step {
  flex: 1;
  align-items: center;
  gap: var(--_su-step-gap);

  &:last-child {
    flex: 0 0 auto;
  }
}

.su-stepper--horizontal .su-stepper__connector {
  flex: 1;
  min-width: 1rem;
  height: 1px;
}

// Sur mobile, seul le libellé de l'étape courante reste affiché
@include down('sm') {
  .su-stepper--horizontal .su-stepper__step:not([aria-current='step']) .su-stepper__text {
    @include sr-only;
  }
}

// ### Vertical : pastilles en colonne, trait entre elles

.su-stepper--vertical .su-stepper__step {
  flex-direction: column;
  padding-bottom: 1.25rem;

  &:last-child {
    padding-bottom: 0;
  }
}

.su-stepper--vertical .su-stepper__connector {
  position: absolute;
  top: calc(var(--_su-step-size) + 0.25rem);
  bottom: 0.25rem;
  inset-inline-start: calc(var(--_su-step-size) / 2);
  width: 1px;
}

.su-stepper__content {
  padding-top: 0.5rem;
  padding-inline-start: calc(var(--_su-step-size) + var(--_su-step-gap));
}

// ### Pastille, texte, déclencheur

.su-stepper__trigger {
  display: flex;
  align-items: flex-start;
  gap: var(--_su-step-gap);
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--su-radius-md);
  background: none;
  color: inherit;
  font: inherit;
  text-align: start;

  &:is(button) {
    cursor: pointer;

    &:hover .su-stepper__label {
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
}

.su-stepper__indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: var(--_su-step-size);
  height: var(--_su-step-size);
  border: 1px solid var(--su-border-input);
  border-radius: var(--su-radius-full);
  background-color: var(--su-bg-surface);
  color: var(--su-text-tertiary);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-semibold);
  font-variant-numeric: tabular-nums;

  @include transition(background-color, border-color, color);

  @include high-contrast {
    border-width: 2px;
  }
}

.su-stepper__icon {
  width: 55%;
  height: 55%;
  stroke-width: 2.5;
}

.su-stepper__text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;

  // Centre la première ligne sur la pastille
  padding-top: calc((var(--_su-step-size) - 1.4em) / 2);
}

.su-stepper__label {
  font-weight: var(--su-font-weight-medium);
  color: var(--su-text-secondary);
}

.su-stepper__status {
  @include sr-only;
}

.su-stepper__description {
  font-size: var(--su-font-size-xs);
  color: var(--su-text-tertiary);
}

.su-stepper__connector {
  background-color: var(--su-border-default);
}

// ### Statuts

.su-stepper__step--complete {
  .su-stepper__indicator {
    border-color: var(--su-primary-default);
    background-color: var(--su-primary-default);
    color: var(--su-primary-text);
  }

  .su-stepper__connector {
    background-color: var(--su-primary-default);
  }
}

.su-stepper__step--current {
  .su-stepper__indicator {
    border-color: var(--su-primary-default);
    color: var(--su-primary-default);
    box-shadow: 0 0 0 3px with-alpha(primary-default, 16%);
  }

  .su-stepper__label {
    color: var(--su-text-primary);
  }
}

.su-stepper__step--error {
  .su-stepper__indicator {
    border-color: var(--su-state-error);
    background-color: with-alpha(state-error, 8%);
    color: var(--su-state-error);
  }

  .su-stepper__label {
    color: var(--su-state-error-fg);
  }
}

.su-stepper__step--disabled {
  opacity: var(--su-opacity-disabled);
}
</style>
