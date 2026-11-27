<script setup lang="ts">
import { computed, ref } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import type { RatingProps } from '@/types'
import { useFormField } from '@/composables/useFormField'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// RATING — note en étoiles.
// - Saisie : groupe de boutons radio natifs (role="radiogroup") :
//   flèches pour changer la note, Tab pour entrer et sortir, envoi
//   dans un formulaire (`name`). Chaque étoile est nommée
//   (« 3 étoiles sur 5 ») ; aperçu au survol.
// - Lecture seule : image nommée (« Note : 4,5 sur 5 »), étoiles
//   partielles possibles.
// - Lié à SuFormField (useFormField) : label, message, états.
// ============================================================

const props = withDefaults(defineProps<RatingProps>(), {
  max: 5,
  readonly: false,
  clearable: false,
  size: 'md',
  state: 'default',
  disabled: false,
  required: false
})

/** Note (0 : aucune) */
const model = defineModel<number>({ default: 0 })

const emit = defineEmits<{
  change: [value: number]
}>()

const { t, locale } = useLocale()

// Clic sur le label du SuFormField : focus sur l'étoile choisie, sinon la première
const focusInput = () => {
  const value = Math.min(Math.max(Math.round(model.value), 1), props.max)
  document.getElementById(inputId(value))?.focus()
}

const {
  id,
  state: fieldState,
  size: fieldSize,
  disabled: fieldDisabled,
  required: fieldRequired,
  describedBy,
  labelledBy
} = useFormField(props, { labelable: false, idPrefix: 'rating', focus: focusInput })

const groupName = computed(() => props.name || (id.value as string))
const inputId = (value: number) => `${id.value}-${value}`
const stars = computed(() => Array.from({ length: Math.max(1, Math.round(props.max)) }, (_, index) => index + 1))

// Nom du groupe : prop, sinon label du champ, sinon « Note »
const groupLabel = computed(() => props.ariaLabel ?? (labelledBy.value ? undefined : t('rating.label')))

// ### Saisie

const hovered = ref(0)
const shown = computed(() => hovered.value || model.value)

const select = (value: number) => {
  if (fieldDisabled.value) return
  model.value = value
  emit('change', value)
}

// Choisir de nouveau la note courante la remet à zéro (clearable)
const handleClick = (value: number) => {
  if (!props.clearable || fieldDisabled.value || model.value !== value) return
  model.value = 0
  emit('change', 0)
}

const handlePointerEnter = (value: number) => {
  if (!fieldDisabled.value) hovered.value = value
}

// ### Lecture seule

const readonlyLabel = computed(() => {
  let value: string
  try {
    value = new Intl.NumberFormat(locale.value.code, { maximumFractionDigits: 1 }).format(model.value)
  } catch {
    value = String(model.value)
  }
  return t('rating.value', { value, max: props.max })
})

// Part remplie de l'étoile `index` (0 à 100 %)
const fill = (index: number) => `${Math.min(Math.max(model.value - (index - 1), 0), 1) * 100}%`

const classes = computed(() => [
  'su-rating',
  `su-rating--${fieldSize.value}`,
  {
    'su-rating--readonly': props.readonly,
    'su-rating--disabled': fieldDisabled.value,
    'su-rating--error': fieldState.value === 'error'
  }
])
</script>

<template>
  <span
    v-if="readonly"
    :class="classes"
    role="img"
    :aria-label="readonlyLabel"
  >
    <span
      v-for="index in stars"
      :key="index"
      class="su-rating__star"
      aria-hidden="true"
    >
      <StarIcon class="su-rating__icon su-rating__icon--empty" />
      <span
        class="su-rating__fill"
        :style="{ inlineSize: fill(index) }"
      >
        <StarIcon class="su-rating__icon" />
      </span>
    </span>
  </span>

  <div
    v-else
    :id="id"
    :class="classes"
    role="radiogroup"
    :aria-label="groupLabel"
    :aria-labelledby="labelledBy"
    :aria-describedby="describedBy"
    :aria-required="fieldRequired ? 'true' : undefined"
    :aria-invalid="fieldState === 'error' ? 'true' : undefined"
    @pointerleave="hovered = 0"
  >
    <label
      v-for="index in stars"
      :key="index"
      :for="inputId(index)"
      :class="['su-rating__option', { 'su-rating__option--filled': index <= shown }]"
      @pointerenter="handlePointerEnter(index)"
    >
      <input
        :id="inputId(index)"
        class="su-rating__input"
        type="radio"
        :name="groupName"
        :value="index"
        :checked="model === index"
        :disabled="fieldDisabled"
        :required="fieldRequired"
        @change="select(index)"
        @click="handleClick(index)"
      >
      <StarIcon
        class="su-rating__icon"
        aria-hidden="true"
      />
      <span class="sr-only">{{ t('rating.star', { count: index, max }) }}</span>
    </label>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// RATING — étoiles pleines (--su-state-warning) ou vides ; focus
// clavier sur l'étoile ; remplissage partiel depuis le début de
// ligne en lecture seule (RTL compris)
// ============================================================

.su-rating {
  --su-rating-size: 1.25rem;
  --su-rating-on: var(--su-state-warning);
  --su-rating-off: var(--su-border-strong);

  display: inline-flex;
  align-items: center;
  gap: 2px;
  vertical-align: middle;

  &--sm {
    --su-rating-size: 1rem;
  }

  &--lg {
    --su-rating-size: 1.5rem;
  }

  .su-rating__icon {
    display: block;
    inline-size: var(--su-rating-size);
    block-size: var(--su-rating-size);
    color: var(--su-rating-off);

    @include transition(color, scale);
  }

  // ### Saisie

  .su-rating__option {
    position: relative;
    display: inline-flex;
    padding: 2px;
    border-radius: var(--su-radius-sm);
    cursor: pointer;
  }

  .su-rating__input {
    @include sr-only;
  }

  .su-rating__option--filled .su-rating__icon {
    color: var(--su-rating-on);
  }

  .su-rating__input:focus-visible + .su-rating__icon {
    border-radius: var(--su-radius-sm);

    @include focus-ring;
  }

  .su-rating__option:hover .su-rating__icon {
    scale: 1.1;

    @include motion-reduce {
      scale: none;
    }
  }

  &--disabled {
    @include disabled-state;

    .su-rating__option {
      cursor: not-allowed;
    }

    .su-rating__option:hover .su-rating__icon {
      scale: none;
    }
  }

  // ### Lecture seule

  .su-rating__star {
    position: relative;
    display: inline-flex;
  }

  .su-rating__fill {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    overflow: hidden;

    .su-rating__icon {
      color: var(--su-rating-on);
    }
  }
}
</style>
