<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { announceToScreenReader } from '@/utils/accessibility'
import type { CheckboxGroupProps } from '@/types'

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

// Utilisation de defineModel pour v-model
const modelValue = defineModel<(string | number)[]>({ default: () => [] })

const emit = defineEmits<{
  change: [value: (string | number)[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

// Génération d'IDs uniques
const fieldId = 'checkbox-group-' + useId()
const checkboxGroupId = computed(() => attrs.id as string || fieldId)

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
  `su-checkbox-group--${props.size}`,
  `su-checkbox-group--${props.state}`,
  `su-checkbox-group--${props.displayType}`,
  `su-checkbox-group--${props.direction}`,
  {
    'su-checkbox-group--disabled': props.disabled,
    'su-checkbox-group--scrollable': props.maxHeight
  }
])

const getOptionClasses = (option: any) => [
  'su-checkbox__option',
  `su-checkbox__option--${props.size}`,
  `su-checkbox__option--${props.state}`,
  `su-checkbox__option--${props.displayType}`,
  {
    'su-checkbox__option--selected': selectedValues.value.includes(option.value),
    'su-checkbox__option--disabled': option.disabled || props.disabled
  }
]

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'group'
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
  if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy
  if (props.ariaDescribedBy) {
    const describedBy = [props.ariaDescribedBy].filter(Boolean).join(' ')
    attrs['aria-describedby'] = describedBy
  }
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
})

// Gestionnaires d'événements
const handleChange = (optionValue: string | number, checked: boolean) => {
  if (props.disabled) return
  
  let newValue: (string | number)[]
  
  if (checked) {
    // Vérifier la limite de sélections
    if (props.maxSelections && selectedValues.value.length >= props.maxSelections) {
      announceToScreenReader(`Maximum ${props.maxSelections} sélections autorisées`)
      return
    }
    newValue = [...selectedValues.value, optionValue]
  } else {
    newValue = selectedValues.value.filter(v => v !== optionValue)
  }
  
  selectedValues.value = newValue
  
  // Annonce pour les lecteurs d'écran
  const option = props.options.find(opt => opt.value === optionValue)
  const action = checked ? 'sélectionné' : 'désélectionné'
  announceToScreenReader(`${option?.label} ${action}`)
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
  return option.disabled || props.disabled
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
          :required="required && selectedValues.length === 0"
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
