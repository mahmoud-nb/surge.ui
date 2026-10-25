<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'
import type { RadioGroupProps } from '@/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<RadioGroupProps>(), {
  options: () => [],
  size: 'md',
  state: 'default',
  disabled: false,
  required: false,
  displayType: 'default',
  direction: 'vertical',
  maxHeight: null,
})

// Définition du modèle en premier
const modelValue = defineModel<string | number>('modelValue')

const emit = defineEmits<{
  change: [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const attrs = useAttrs()

// Génération d'IDs uniques
const fieldId = 'radio-group-' + useId()
const radioGroupId = computed(() => attrs.id as string || fieldId)
const radioName = computed(() => props.name || fieldId)

// Classes CSS
const groupClasses = computed(() => [
  'su-radio-group',
  `su-radio-group--${props.size}`,
  `su-radio-group--${props.state}`,
  `su-radio-group--${props.displayType}`,
  `su-radio-group--${props.direction}`,
  {
    'su-radio-group--disabled': props.disabled,
    'su-radio-group--scrollable': props.maxHeight
  }
])

const getOptionClasses = (option: any) => [
  'su-radio-option',
  `su-radio-option--${props.size}`,
  `su-radio-option--${props.state}`,
  `su-radio-option--${props.displayType}`,
  {
    'su-radio-option--selected': modelValue.value === option.value,
    'su-radio-option--disabled': option.disabled || props.disabled
  }
]

// Attributs ARIA
const ariaAttributes = computed(() => {
  const attrs: Record<string, any> = {
    role: 'radiogroup'
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
const handleChange = (value: string | number) => {
  if (props.disabled) return
  
  modelValue.value = value
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <fieldset 
    :class="groupClasses"
    v-bind="ariaAttributes"
  >
    <!-- Options -->
    <div 
      class="su-radio-group-options"
      :style="{ maxHeight: maxHeight || undefined, overflowY: maxHeight ? 'auto' : undefined }"
    >
      <!-- Slot before: contenu entre le label et les options -->
      <div
        v-if="$slots.before"
        class="su-radio-group-before"
      >
        <slot name="before" />
      </div>

      <label
        v-for="option in options"
        :key="option.value"
        :class="getOptionClasses(option)"
        :for="`${radioGroupId}-${option.value}`"
      >
        <!-- Input radio caché -->
        <input
          :id="`${radioGroupId}-${option.value}`"
          type="radio"
          :name="radioName"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="option.disabled || disabled"
          :required="required"
          class="su-radio-input"
          @change="handleChange(option.value)"
          @focus="handleFocus"
          @blur="handleBlur"
        >

        <!-- Indicateur radio personnalisé -->
        <div class="su-radio-indicator">
          <div class="su-radio-dot" />
        </div>

        <!-- Contenu de l'option -->
        <div class="su-radio-content">
          <!-- Icône -->
          <component 
            :is="option.icon" 
            v-if="option.icon" 
            class="su-radio-icon"
            aria-hidden="true"
          />
          
          <!-- Texte -->
          <div class="su-radio-text">
            <div class="su-radio-label">{{ option.label }}</div>
            <div 
              v-if="option.description" 
              class="su-radio-description"
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
      class="su-radio-group-after"
    >
      <slot name="after" />
    </div>
  </fieldset>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// RADIO GROUP — motifs partagés « choix » (abstracts/_patterns)
// ============================================================

.su-radio-group {
  @include choice-group('.su-radio-group-options');
}

.su-radio-option {
  @include choice-option('.su-radio-option', '.su-radio-input', '.su-radio-indicator');
}

.su-radio-indicator {
  @include choice-indicator('circle');
}

// Point central : visible une fois l'option cochée
.su-radio-dot {
  width: 40%;
  height: 40%;
  border-radius: var(--su-radius-full);
  background-color: currentcolor;
  scale: 0;

  @include transition(scale);
}

.su-radio-input:checked + .su-radio-indicator {
  @include choice-indicator-checked;

  .su-radio-dot {
    scale: 1;
  }
}

.su-radio-content {
  display: flex;
  flex: 1;
  align-items: flex-start;
  gap: 0.5rem;
  min-width: 0;
}

.su-radio-icon {
  width: 1.125em;
  height: 1.125em;
  flex-shrink: 0;
  margin-top: 0.125em;
  opacity: 0.8;
}

.su-radio-text {
  flex: 1;
  min-width: 0;
}

.su-radio-label {
  font-weight: var(--su-font-weight-medium);
}

.su-radio-description {
  margin-top: 0.125rem;
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-normal);
  line-height: var(--su-line-height-normal);
  color: var(--su-text-tertiary);
}

.su-radio-group-before,
.su-radio-group-after {
  margin: 0.75rem 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
