<script setup lang="ts">
import { computed, ref, useAttrs, useId, useSlots } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import type { CheckboxProps } from '@/types'
import { useFormField, mergeIds } from '@/composables/useFormField'

// ============================================================
// CHECKBOX — case à cocher seule sur un <input type="checkbox"> natif
// (masqué visuellement mais focusable). État mixte (`indeterminate`)
// pour une case « tout sélectionner » : il est lu par les lecteurs
// d'écran (« partiellement coché ») et levé au premier clic.
// ============================================================

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'md',
  state: 'default',
  displayType: 'default',
  disabled: false,
  required: false
})

const modelValue = defineModel<boolean>({ default: false })
const indeterminate = defineModel<boolean>('indeterminate', { default: false })

const emit = defineEmits<{
  change: [value: boolean]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

// Contexte du SuFormField parent : id, message et états du champ
const {
  id: controlId,
  state: fieldState,
  size: fieldSize,
  disabled: fieldDisabled,
  required: fieldRequired,
  describedBy: fieldDescribedBy
} = useFormField(props, { idPrefix: 'checkbox' })

const attrs = useAttrs()
const slots = useSlots()
const inputRef = ref<HTMLInputElement>()

// L'id va sur l'input (cible des <label for>), le reste sur le conteneur
const rootAttrs = computed(() => {
  const { id: _id, ...rest } = attrs as Record<string, unknown>
  return rest
})

const descriptionId = `checkbox-description-${useId()}`
const hasLabel = computed(() => !!(props.label || slots.default))
const hasDescription = computed(() => !!(props.description || slots.description))

const classes = computed(() => [
  'su-checkbox',
  `su-checkbox--${fieldSize.value}`,
  `su-checkbox--${fieldState.value}`,
  `su-checkbox--${props.displayType}`,
  {
    'su-checkbox--selected': modelValue.value || indeterminate.value,
    'su-checkbox--disabled': fieldDisabled.value,
    'su-checkbox--bare': !hasLabel.value && !hasDescription.value
  }
])

const boxClasses = computed(() => [
  'su-checkbox__box',
  {
    'su-checkbox__box--checked': modelValue.value && !indeterminate.value,
    'su-checkbox__box--indeterminate': indeterminate.value
  }
])

const ariaAttributes = computed(() => {
  const result: Record<string, string> = {}
  if (props.ariaLabel) result['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) result['aria-labelledby'] = props.ariaLabelledBy
  const describedBy = mergeIds(fieldDescribedBy.value, hasDescription.value ? descriptionId : undefined)
  if (describedBy) result['aria-describedby'] = describedBy
  if (fieldState.value === 'error' || props.ariaInvalid) result['aria-invalid'] = 'true'
  return result
})

const handleChange = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  // Le navigateur lève l'état mixte au clic : on le synchronise
  indeterminate.value = false
  modelValue.value = checked
  emit('change', checked)
}

defineExpose({
  inputRef,
  focus: () => inputRef.value?.focus()
})
</script>

<template>
  <label
    :class="classes"
    v-bind="rootAttrs"
  >
    <input
      :id="controlId"
      ref="inputRef"
      type="checkbox"
      class="su-checkbox__input"
      :name="name"
      :value="value"
      :checked="modelValue"
      :indeterminate="indeterminate"
      :disabled="fieldDisabled"
      :required="fieldRequired"
      v-bind="ariaAttributes"
      @change="handleChange"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >

    <span
      :class="boxClasses"
      aria-hidden="true"
    >
      <span
        v-if="indeterminate"
        class="su-checkbox__dash"
      />
      <CheckIcon
        v-else-if="modelValue"
        class="su-checkbox__mark"
      />
    </span>

    <span
      v-if="hasLabel || hasDescription"
      class="su-checkbox__body"
    >
      <span
        v-if="hasLabel"
        class="su-checkbox__title"
      >
        <slot>{{ label }}</slot>
      </span>
      <span
        v-if="hasDescription"
        :id="descriptionId"
        class="su-checkbox__hint"
      >
        <slot name="description">{{ description }}</slot>
      </span>
    </span>
  </label>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// CHECKBOX — motifs partagés « choix » (abstracts/_patterns), comme
// CheckboxGroup ; éléments propres (__box, __mark…) pour ne pas
// dépendre des classes du groupe.
// ============================================================

.su-checkbox {
  @include choice-option('.su-checkbox', '.su-checkbox__input', '.su-checkbox__box');

  display: inline-flex;
  vertical-align: top;

  &--block-card {
    display: flex;
  }

  // Case seule (nommée par aria-label ou un label externe)
  &--bare {
    gap: 0;
  }

  &--bare .su-checkbox__box {
    margin-top: 0;
  }
}

.su-checkbox__box {
  @include choice-indicator('box');

  &--checked,
  &--indeterminate {
    @include choice-indicator-checked;
  }

  @include high-contrast {
    border-width: 2px;
  }
}

.su-checkbox__mark {
  width: 75%;
  height: 75%;
  stroke-width: 3;
}

.su-checkbox__dash {
  width: 50%;
  height: 2px;
  border-radius: 1px;
  background-color: currentcolor;
}

.su-checkbox__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.su-checkbox__title {
  font-weight: var(--su-font-weight-medium);
}

.su-checkbox__hint {
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-normal);
  line-height: var(--su-line-height-normal);
  color: var(--su-text-tertiary);
}
</style>
