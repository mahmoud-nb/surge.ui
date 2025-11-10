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
  'su-checkbox-option',
  `su-checkbox-option--${props.size}`,
  `su-checkbox-option--${props.state}`,
  `su-checkbox-option--${props.displayType}`,
  {
    'su-checkbox-option--selected': selectedValues.value.includes(option.value),
    'su-checkbox-option--disabled': option.disabled || props.disabled
  }
]

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'group'
  }
  
  if (props.ariaLabel) attrs['aria-label'] = props.ariaLabel
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
      class="su-checkbox-group-options"
      :style="{ maxHeight: maxHeight || undefined, overflowY: maxHeight ? 'auto' : undefined }"
    >
      <!-- Slot before: contenu entre le label et les options -->
      <div v-if="$slots.before" class="su-checkbox-group-before">
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
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="isDisabled(option)"
          :required="required && selectedValues.length === 0"
          class="su-checkbox-input"
          @change="handleChange(option.value, ($event.target as HTMLInputElement).checked)"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Indicateur checkbox personnalisé -->
        <div 
          class="su-checkbox-indicator"
          :class="{
            'su-checkbox-indicator--checked': isChecked(option.value),
            'su-checkbox-indicator--indeterminate': false
          }"
        >
          <CheckIcon 
            v-if="isChecked(option.value)"
            class="su-checkbox-check" 
            aria-hidden="true"
          />
        </div>

        <!-- Contenu de l'option -->
        <div class="su-checkbox-content">
          <!-- Icône -->
          <component 
            v-if="option.icon" 
            :is="option.icon" 
            class="su-checkbox-icon"
            aria-hidden="true"
          />
          
          <!-- Texte -->
          <div class="su-checkbox-text">
            <div class="su-checkbox-label">{{ option.label }}</div>
          </div>
        </div>
      </label>
    </div>

    <!-- Slot after: contenu entre les options et le message -->
    <div v-if="$slots.after" class="su-checkbox-group-after">
      <slot name="after" />
    </div>
  </fieldset>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-checkbox-group-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.su-checkbox-group {
  border: none;
  padding: 0;
  margin: 0;
  
  &-label {
    display: block;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text-primary;
    line-height: $line-height-tight;
    margin-bottom: 0.75rem;
    
    &--required {
      .su-checkbox-group-required {
        color: $error-500;
        margin-left: 0.125rem;
      }
    }
    
    &--disabled {
      color: $text-tertiary;
      cursor: not-allowed;
    }
  }
  
  &-options {
    display: flex;
    gap: 0.75rem;
  }
  
  // Direction
  &--vertical {
    .su-checkbox-group-options {
      flex-direction: column;
    }
  }
  
  &--horizontal {
    .su-checkbox-group-options {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  
  // Style carte
  &--inline-card,
  &--block-card {
    .su-checkbox-group-options {
      gap: 0.75rem;
    }
  }
  
  &--inline-card {
    .su-checkbox-group-options {
      gap: 0.5rem;
    }
  }
  
  // Scroll
  &--scrollable {
    .su-checkbox-group-options {
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: $gray-400 $gray-100;
      
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: $gray-100;
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: $gray-400;
        border-radius: 3px;
        
        &:hover {
          background: $gray-500;
        }
      }
    }
  }
}

.su-checkbox-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  // Style par défaut
  &--default {
    padding: 0.25rem 0;
    
    &:hover:not(&--disabled) {
      .su-checkbox-indicator {
        border-color: $primary-400;
      }
    }
  }
  
  // Style carte
  &--inline-card,
  &--block-card {
    padding: 1rem;
    border: 1px solid $gray-200;
    border-radius: $border-radius-md;
    background-color: white;
    
    &:hover:not(&--disabled) {
      border-color: $primary-300;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    &--selected {
      border-color: $primary-500;
      background-color: $primary-50;
      box-shadow: 0 0 0 1px $primary-500;
    }
  }
  
  &--inline-card {
    .su-checkbox-content {
      text-align: center;
    }
    
    .su-checkbox-indicator {
      align-self: center;
    }
  }
  
  &--block-card {
    width: 100%;
  }
  
  // Tailles
  &--sm {
    .su-checkbox-indicator {
      width: 1rem;
      height: 1rem;
      
      .su-checkbox-check {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    
    .su-checkbox-label {
      font-size: $font-size-sm;
    }
    
    .su-checkbox-description {
      font-size: 0.75rem;
    }
    
    &.su-checkbox-option--inline-card,
    &.su-checkbox-option--block-card {
      padding: 0.75rem;
    }
  }
  
  &--md {
    .su-checkbox-indicator {
      width: 1.25rem;
      height: 1.25rem;
      
      .su-checkbox-check {
        width: 1rem;
        height: 1rem;
      }
    }
    
    .su-checkbox-label {
      font-size: $font-size-base;
    }
    
    .su-checkbox-description {
      font-size: $font-size-sm;
    }
  }
  
  &--lg {
    .su-checkbox-indicator {
      width: 1.5rem;
      height: 1.5rem;
      
      .su-checkbox-check {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
    
    .su-checkbox-label {
      font-size: $font-size-lg;
    }
    
    .su-checkbox-description {
      font-size: $font-size-base;
    }
    
    &.su-checkbox-option--inline-card,
    &.su-checkbox-option--block-card {
      padding: 1.25rem;
    }
  }
  
  // États
  &--error {
    &.su-checkbox-option--inline-card,
    &.su-checkbox-option--block-card {
      border-color: $error-300;
      
      &--selected {
        border-color: $error-500;
        background-color: $error-50;
      }
    }
    
    .su-checkbox-indicator {
      border-color: $error-500;
      
      &--checked {
        background-color: $error-500;
        border-color: $error-500;
      }
    }
  }
  
  &--success {
    &.su-checkbox-option--inline-card,
    &.su-checkbox-option--block-card {
      border-color: $success-300;
      
      &--selected {
        border-color: $success-500;
        background-color: $success-50;
      }
    }
    
    .su-checkbox-indicator {
      border-color: $success-500;
      
      &--checked {
        background-color: $success-500;
        border-color: $success-500;
      }
    }
  }
  
  &--warning {
    &.su-checkbox-option--inline-card,
    &.su-checkbox-option--block-card {
      border-color: $warning-300;
      
      &--selected {
        border-color: $warning-500;
        background-color: $warning-50;
      }
    }
    
    .su-checkbox-indicator {
      border-color: $warning-500;
      
      &--checked {
        background-color: $warning-500;
        border-color: $warning-500;
      }
    }
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &.su-checkbox-option--inline-card,
    &.su-checkbox-option--block-card {
      background-color: $gray-50;
      border-color: $gray-200;
    }
  }
}

.su-checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:focus + .su-checkbox-indicator {
    box-shadow: 0 0 0 3px rgba($primary-500, 0.2);
  }
  
  &:checked + .su-checkbox-indicator {
    border-color: $primary-500;
    background-color: $primary-500;
    
    .su-checkbox-check {
      color: white;
    }
  }
}

.su-checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid $gray-300;
  border-radius: $border-radius-sm;
  background-color: white;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  
  &--checked {
    border-color: $primary-500;
    background-color: $primary-500;
  }
  
  &--indeterminate {
    border-color: $primary-500;
    background-color: $primary-500;
    
    &::after {
      content: '';
      width: 60%;
      height: 2px;
      background-color: white;
      border-radius: 1px;
    }
  }
}

.su-checkbox-check {
  color: white;
  stroke-width: 3;
}

.su-checkbox-content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.su-checkbox-icon {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
  color: $text-secondary;
  margin-top: 0.125rem;
}

.su-checkbox-text {
  flex: 1;
  min-width: 0;
}

.su-checkbox-label {
  font-weight: 500;
  color: $text-primary;
  line-height: $line-height-tight;
}

.su-checkbox-description {
  color: $text-secondary;
  line-height: $line-height-normal;
  margin-top: 0.25rem;
}

.su-checkbox-group-message {
  font-size: $font-size-sm;
  line-height: $line-height-tight;
  
  &--default {
    color: $text-secondary;
  }
  
  &--error {
    color: $error-600;
  }
  
  &--success {
    color: $success-600;
  }
  
  &--warning {
    color: $warning-600;
  }
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

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-checkbox-group-label {
    color: $text-primary-dark;
    
    &--disabled {
      color: $text-tertiary-dark;
    }
  }
  
  .su-checkbox-option {
    &--inline-card,
    &--block-card {
      background-color: $gray-800;
      border-color: $gray-600;
      
      &:hover:not(&--disabled) {
        border-color: $primary-400;
      }
      
      &--selected {
        border-color: $primary-400;
        background-color: rgba($primary-400, 0.1);
      }
      
      &--disabled {
        background-color: $gray-900;
        border-color: $gray-700;
      }
    }
  }
  
  .su-checkbox-indicator {
    border-color: $gray-500;
    background-color: $gray-800;
    
    &--checked {
      border-color: $primary-400;
      background-color: $primary-400;
    }
  }
  
  .su-checkbox-label {
    color: $text-primary-dark;
  }
  
  .su-checkbox-description {
    color: $text-secondary-dark;
  }
  
  .su-checkbox-group-toggle {
    background-color: $gray-800;
    border-color: $gray-600;
    color: $primary-400;
    
    &:hover {
      background-color: $gray-700;
      border-color: $primary-400;
    }
  }
  
  .su-checkbox-group-message {
    &--default {
      color: $text-secondary-dark;
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-checkbox-indicator {
    border-width: 3px;
  }
  
  .su-checkbox-option--inline-card,
  .su-checkbox-option--block-card {
    border-width: 2px;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-checkbox-option,
  .su-checkbox-indicator {
    transition: none;
  }
}
</style>