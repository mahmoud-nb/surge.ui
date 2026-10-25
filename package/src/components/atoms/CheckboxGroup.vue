<script setup lang="ts">
import { computed } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import type { CheckboxGroupProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { useFormField } from '@/composables/useFormField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  options: () => [],
  size: 'md',
  state: 'default',
  disabled: false,
  required: false,
  displayType: 'default',
  direction: 'vertical'
})

// Contexte du SuFormField parent : id, label, message et états du champ
const { id: controlId, state: fieldState, size: fieldSize, disabled: fieldDisabled, required: fieldRequired, describedBy: fieldDescribedBy, labelledBy: fieldLabelledBy } = useFormField(props, { labelable: false, idPrefix: 'checkbox-group', focus: () => focusFirstCheckbox() })

// Textes par défaut et annonces dans la locale courante
const { t } = useLocale()
const { announce } = useAnnouncer()

// Utilisation de defineModel pour v-model
const modelValue = defineModel<(string | number)[]>({ default: () => [] })

const emit = defineEmits<{
  change: [value: (string | number)[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()


// Génération d'IDs uniques
const checkboxGroupId = computed(() => controlId.value as string)

// Clic sur le label du champ : focus sur la première case active
const focusFirstCheckbox = () => {
  const first = props.options.find((option) => !option.disabled)
  if (first) (document.getElementById(`${checkboxGroupId.value}-${first.value}`) as HTMLInputElement | null)?.focus()
}

// Valeur normalisée
const selectedValues = computed({
  get() {
    return Array.isArray(modelValue.value) ? modelValue.value : []
  },
  set(newValue: (string | number)[]) {
    modelValue.value = newValue
    emit('change', newValue)
  }
})

// Classes CSS
const groupClasses = computed(() => [
  'su-checkbox-group',
  `su-checkbox-group--${fieldSize.value}`,
  `su-checkbox-group--${fieldState.value}`,
  `su-checkbox-group--${props.displayType}`,
  `su-checkbox-group--${props.direction}`,
  {
    'su-checkbox-group--disabled': fieldDisabled.value,
    'su-checkbox-group--scrollable': props.maxHeight
  }
])

const getOptionClasses = (option: any) => [
  'su-checkbox__option',
  `su-checkbox__option--${fieldSize.value}`,
  `su-checkbox__option--${fieldState.value}`,
  `su-checkbox__option--${props.displayType}`,
  {
    'su-checkbox__option--selected': selectedValues.value.includes(option.value),
    'su-checkbox__option--disabled': option.disabled || fieldDisabled.value
  }
]

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'group'
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (fieldLabelledBy.value) attrs['aria-labelledby'] = fieldLabelledBy.value
  if (fieldDescribedBy.value) {
    const describedBy = [fieldDescribedBy.value].filter(Boolean).join(' ')
    attrs['aria-describedby'] = describedBy
  }
  if (fieldRequired.value) attrs['aria-required'] = 'true'
  if (fieldState.value === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
})

// Gestionnaires d'événements
const handleChange = (optionValue: string | number, checked: boolean) => {
  if (fieldDisabled.value) return
  
  let newValue: (string | number)[]
  
  if (checked) {
    // Vérifier la limite de sélections
    if (props.maxSelections && selectedValues.value.length >= props.maxSelections) {
      announce(t('checkboxGroup.maxReached', { count: props.maxSelections }))
      return
    }
    newValue = [...selectedValues.value, optionValue]
  } else {
    newValue = selectedValues.value.filter(v => v !== optionValue)
  }
  
  selectedValues.value = newValue

}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const isChecked = (value: string | number) => {
  return selectedValues.value.includes(value)
}

const isDisabled = (option: any) => {
  return option.disabled || fieldDisabled.value
}
</script>

<template>
  <fieldset 
    :class="groupClasses"
    v-bind="ariaAttributes"
  >
    <!-- Options -->
    <div 
      class="su-checkbox-group__options"
      :style="{ maxHeight: maxHeight || undefined, overflowY: maxHeight ? 'auto' : undefined }"
    >
      <!-- Slot before: contenu entre le label et les options -->
      <div
        v-if="$slots.before"
        class="su-checkbox-group-before"
      >
        <slot name="before" />
      </div>

      <label
        v-for="option in options"
        :key="option.value"
        :class="getOptionClasses(option)"
        :for="`${checkboxGroupId}-${option.value}`"
      >
        <!-- Input checkbox caché -->
        <input
          :id="`${checkboxGroupId}-${option.value}`"
          type="checkbox"
          :name="name"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="isDisabled(option)"
          :required="fieldRequired && selectedValues.length === 0"
          class="su-checkbox__input"
          @change="handleChange(option.value, ($event.target as HTMLInputElement).checked)"
          @focus="handleFocus"
          @blur="handleBlur"
        >

        <!-- Indicateur checkbox personnalisé -->
        <div 
          class="su-checkbox__indicator"
          :class="{
            'su-checkbox__indicator--checked': isChecked(option.value),
            'su-checkbox__indicator--indeterminate': false
          }"
        >
          <CheckIcon 
            v-if="isChecked(option.value)"
            class="su-checkbox__check" 
            aria-hidden="true"
          />
        </div>

        <!-- Contenu de l'option -->
        <div class="su-checkbox__content">
          <!-- Icône -->
          <component 
            :is="option.icon" 
            v-if="option.icon" 
            class="su-checkbox__icon"
            aria-hidden="true"
          />
          
          <!-- Texte -->
          <div class="su-checkbox__text">
            <div class="su-checkbox__label">{{ option.label }}</div>
            <div
              v-if="option.description"
              class="su-checkbox__description"
            >
              {{ option.description }}
            </div>
          </div>
        </div>
      </label>
    </div>

    <!-- Slot after: contenu entre les options et le message -->
    <div
      v-if="$slots.after"
      class="su-checkbox-group-after"
    >
      <slot name="after" />
    </div>
  </fieldset>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// CHECKBOX GROUP — motifs partagés « choix » (abstracts/_patterns)
// ============================================================

.su-checkbox-group {
  @include choice-group('.su-checkbox-group__options');
}

.su-checkbox__option {
  @include choice-option('.su-checkbox__option', '.su-checkbox__input', '.su-checkbox__indicator');
}

.su-checkbox__indicator {
  @include choice-indicator('box');

  &--checked,
  &--indeterminate {
    @include choice-indicator-checked;
  }

  // Tiret de l'état indéterminé
  &--indeterminate::after {
    content: '';
    width: 50%;
    height: 2px;
    border-radius: 1px;
    background-color: currentcolor;
  }
}

.su-checkbox__check {
  width: 75%;
  height: 75%;
  stroke-width: 3;
}

.su-checkbox__content {
  display: flex;
  flex: 1;
  align-items: flex-start;
  gap: 0.5rem;
  min-width: 0;
}

.su-checkbox__icon {
  width: 1.125em;
  height: 1.125em;
  flex-shrink: 0;
  margin-top: 0.125em;
  opacity: 0.8;
}

.su-checkbox__text {
  flex: 1;
  min-width: 0;
}

.su-checkbox__label {
  font-weight: var(--su-font-weight-medium);
}

.su-checkbox__description {
  margin-top: 0.125rem;
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-normal);
  line-height: var(--su-line-height-normal);
  color: var(--su-text-tertiary);
}

.su-checkbox-group-before,
.su-checkbox-group-after {
  margin: 0.75rem 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
