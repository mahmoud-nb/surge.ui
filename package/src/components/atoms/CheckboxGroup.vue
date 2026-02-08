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
@use '../../styles2/main' as *;
@use '../../styles2/foundations/colors' as *;

@mixin su-checkbox-state($stateColor50, $stateColor300, $stateColor500) {
  &.su-checkbox__option--inline-card,
  &.su-checkbox__option--block-card {
    border-color: #{$stateColor300};
    
    &--selected {
      border-color: #{$stateColor500};
      background-color: #{$stateColor50};
    }
  }
  
  .su-checkbox__indicator {
    border-color: #{$stateColor500};
    
    &--checked {
      background-color: #{$stateColor500};
      border-color: #{$stateColor500};
    }
  }
}

.su-checkbox-group {
  border: none;
  padding: 0;
  margin: 0;
  
  &__label {
    display: block;
    margin-bottom: 0.75rem;
    
    @include su-text('sm', 'primary', 'medium', 'tight');
    
    &--required {
      .su-checkbox-group-required {
        color: var(--su-error-500);
        margin-inline-start: 0.125rem;
      }
    }
    
    &--disabled {
      color: var(--su-text-tertiary);
      cursor: not-allowed;
    }
  }
  
  &__options {
    display: flex;
    gap: 0.75rem;
  }
  
  // Direction
  &--vertical {
    .su-checkbox-group__options {
      flex-direction: column;
    }
  }
  
  &--horizontal {
    .su-checkbox-group__options {
      flex-flow: row wrap;
    }
  }
  
  // Style carte
  &--inline-card,
  &--block-card {
    .su-checkbox-group__options {
      gap: 0.75rem;
    }
  }
  
  &--inline-card {
    .su-checkbox-group__options {
      gap: 0.5rem;
    }
  }
  
  // Scroll
  &--scrollable {
    @include scrollable-container;

    padding-inline-end: 0.75rem;
  }
}

.su-checkbox__option {
  $self: &;

  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-sizing: border-box;
  
  // Style par défaut
  &--default {
    padding: 0.25rem 0;
    
    &:hover:not(&--disabled) {
      .su-checkbox__indicator {
        border-color: var('--su-border-hover', $primary-400);
      }
    }
  }

  &--block-card {
    width: 100%;
  }
  
  // Style carte
  &--inline-card,
  &--block-card {
    padding: 1rem;
    border: 1px solid $gray-200;
    border-radius: var(--su-radius-md);
    background-color: var(--su-bg-surface);
    
    &:hover:not(&--disabled) {
      border-color: var(--su-border-default);
      box-shadow: var(--su-shadow-md);
    }
    
    &--selected {
      border-color: var(--su-border-default);
      background-color: var(--su-primary-50);
      box-shadow: var(--su-shadow-md);
    }
  }
  
  &--inline-card {
    .su-checkbox__content {
      text-align: center;
    }
    
    .su-checkbox__indicator {
      align-self: center;
    }
  }
  
  // Tailles
  &--sm {
    .su-checkbox__indicator {
      @include squareSize(1rem);
      
      .su-checkbox__check {
        @include squareSize(0.75rem);
      }
    }
    
    .su-checkbox__label {
      font-size: var(--su-font-size-sm);
    }
    
    .su-checkbox__description {
      font-size: var(--su-font-size-xs);
    }
    
    &.su-checkbox__option--inline-card,
    &.su-checkbox__option--block-card {
      padding: 0.75rem;
    }
  }
  
  &--md {
    .su-checkbox__indicator {
      @include squareSize(1.25rem);
      
      .su-checkbox__check {
        @include squareSize(1rem);
      }
    }
    
    .su-checkbox__label {
      font-size: var(--su-font-size-base);
    }
    
    .su-checkbox__description {
      font-size: var(--su-font-size-sm);
    }

    &.su-checkbox__option--inline-card,
    &.su-checkbox__option--block-card {
      padding: 1rem;
    }
  }
  
  &--lg {
    .su-checkbox__indicator {
      @include squareSize(1.5rem);
      
      .su-checkbox__check {
        @include squareSize(1.25rem);
      }
    }
    
    .su-checkbox__label {
      font-size: var(--su-font-size-lg);
    }
    
    .su-checkbox__description {
      font-size: var(--su-font-size-base);
    }
    
    &.su-checkbox__option--inline-card,
    &.su-checkbox__option--block-card {
      padding: 1.25rem;
    }
  }
  
  // États
  &--error {
    @include su-checkbox-state($error-50, $error-300, $error-500);
  }
  
  &--success {
    @include su-checkbox-state($success-50, $success-300, $success-500);
  }
  
  &--warning {
    @include su-checkbox-state($warning-50, $warning-300, $warning-500);
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &.su-checkbox__option--inline-card,
    &.su-checkbox__option--block-card {
      background-color: var(--su-bg-disabled);
      border-color: var(--su-border-disabled);
    }
  }
}

.su-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:focus + .su-checkbox__indicator {
    box-shadow: 0 0 0 3px rgba($primary-500, 0.2);
  }
  
  &:checked + .su-checkbox__indicator {
    border-color: $primary-500;
    background-color: $primary-500;
    
    .su-checkbox__check {
      color: white;
    }
  }
}

.su-checkbox__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--su-border-default);
  border-radius: var(--su-radius-sm);
  background-color: var(--su-bg-surface);
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

.su-checkbox__check {
  color: white;
  stroke-width: 3;
}

.su-checkbox__content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.su-checkbox__icon {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
  color: var(--su-text-secondary);
  margin-top: 0.125rem;
}

.su-checkbox__text {
  flex: 1;
  min-width: 0;
}

.su-checkbox__label {
  font-weight: 500;
  color: var(--su-text-primary);
  line-height: var(--su-line-height-tight);
}

.su-checkbox__description {
  color: var(--su-text-secondary);
  line-height: var(--su-line-height-normal);
  margin-top: 0.25rem;
}

.su-checkbox-group-message {
  font-size: var(--su-font-size-sm);
  line-height: var(--su-line-height-tight);
  
  &--default {
    color: var(--su-text-secondary);
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
  .su-checkbox-group__label {
    color: var(--su-text-primary)-dark;
    
    &--disabled {
      color: var(--su-text-tertiary);
    }
  }
  
  .su-checkbox__option {
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
  
  .su-checkbox__indicator {
    border-color: $gray-500;
    background-color: $gray-800;
    
    &--checked {
      border-color: $primary-400;
      background-color: $primary-400;
    }
  }
  
  .su-checkbox__label {
    color: var(--su-text-primary)-dark;
  }
  
  .su-checkbox__description {
    color: var(--su-text-secondary)-dark;
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
      color: var(--su-text-secondary)-dark;
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-checkbox__indicator {
    border-width: 3px;
  }
  
  .su-checkbox__option--inline-card,
  .su-checkbox__option--block-card {
    border-width: 2px;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-checkbox__option,
  .su-checkbox__indicator {
    transition: none;
  }
}
</style>