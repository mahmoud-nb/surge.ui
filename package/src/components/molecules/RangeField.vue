<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import { announceToScreenReader } from '@/utils/accessibility'
import FormField from '@/components/atoms/FormField.vue'
import type { AccessibilityProps, Size, State, Orientation, FormFieldProps } from '@/types'

export interface BaseRangeProps extends AccessibilityProps {
  min?: number
  max?: number
  step?: number
  size?: Size
  state?: State
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  orientation?: Orientation
  dual?: boolean
  showValue?: boolean
  showTicks?: boolean
  showLabels?: boolean
  formatValue?(value: number): string
}

export type RangeFieldProps = FormFieldProps & BaseRangeProps

const props = withDefaults(defineProps<RangeFieldProps>(), {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  orientation: 'horizontal',
  dual: false,
  showValue: true,
  showTicks: false,
  showLabels: false
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<number | [number, number]>()

const emit = defineEmits<{
  change: [value: number | [number, number]]
  input: [value: number | [number, number]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()

const attrs = useAttrs()

// Refs
const rangeRef = ref<HTMLDivElement>()
const trackRef = ref<HTMLDivElement>()
const thumb1Ref = ref<HTMLDivElement>()
const thumb2Ref = ref<HTMLDivElement>()
const isDragging = ref(false)
const activeThumb = ref<'min' | 'max' | null>(null)

const fieldId = 'range-' + useId()
const rangeId = computed(() => attrs.id as string || fieldId)

// Valeurs normalisées
const currentValue = computed({
  get() {
    // Si modelValue n'est pas défini, utiliser les valeurs par défaut
    if (modelValue.value === undefined || modelValue.value === null) {
      return props.dual ? [props.min, props.max] : props.min
    }
    
    if (props.dual) {
      const val = modelValue.value as [number, number]
      return Array.isArray(val) ? val : [props.min, props.max]
    }
    return modelValue.value as number || props.min
  },
  set(newValue: number | [number, number]) {
    modelValue.value = newValue
    emit('change', newValue)
    emit('input', newValue)
  }
})

const minValue = computed(() => {
  return props.dual ? (currentValue.value as [number, number])[0] : (currentValue.value as number)
})

const maxValue = computed(() => {
  return props.dual ? (currentValue.value as [number, number])[1] : (currentValue.value as number)
})

// Formatage des valeurs
const formatValue = (value: number): string => {
  if (props.formatValue) {
    return props.formatValue(value)
  }
  return value.toString()
}

// Calcul des pourcentages
const minPercent = computed(() => {
  return ((minValue.value - props.min) / (props.max - props.min)) * 100
})

const maxPercent = computed(() => {
  return ((maxValue.value - props.min) / (props.max - props.min)) * 100
})

// Classes CSS
const containerClasses = computed(() => [
  'su-range-container',
  `su-range-container--${props.size}`,
  `su-range-container--${props.state}`,
  `su-range-container--${props.orientation}`,
  {
    'su-range-container--disabled': props.disabled,
    'su-range-container--readonly': props.readonly,
    'su-range-container--dual': props.dual,
    'su-range-container--dragging': isDragging.value
  }
])

const trackClasses = computed(() => [
  'su-range-track',
  `su-range-track--${props.size}`,
  `su-range-track--${props.state}`,
  `su-range-track--${props.orientation}`
])

const getThumbClasses = (thumbType: 'min' | 'max') => [
  'su-range-thumb',
  `su-range-thumb--${props.size}`,
  `su-range-thumb--${props.state}`,
  `su-range-thumb--${props.orientation}`,
  {
    'su-range-thumb--disabled': props.disabled,
    'su-range-thumb--readonly': props.readonly,
    'su-range-thumb--active': activeThumb.value === thumbType
  }
]

// Attributs ARIA
const getAriaAttributes = (thumbType: 'min' | 'max') => {
  const value = thumbType === 'min' ? minValue.value : maxValue.value
  const attrs: Record<string, any> = {
    role: 'slider',
    'aria-valuemin': props.min,
    'aria-valuemax': props.max,
    'aria-valuenow': value,
    'aria-valuetext': props.ariaValueText || formatValue(value),
    'aria-orientation': props.orientation
  }
  
  if (props.ariaLabel) {
    attrs['aria-label'] = props.dual 
      ? `${props.ariaLabel} ${thumbType === 'min' ? 'minimum' : 'maximum'}` 
      : props.ariaLabel
  }
  if (props.ariaInvalid !== undefined) attrs['aria-invalid'] = props.ariaInvalid
  if (props.ariaRequired !== undefined) attrs['aria-required'] = props.ariaRequired
  if (props.required) attrs['aria-required'] = 'true'
  if (props.state === 'error') attrs['aria-invalid'] = 'true'
  
  return attrs
}

// Utilitaires de calcul
const clampValue = (value: number): number => {
  return Math.max(props.min, Math.min(props.max, value))
}

const snapToStep = (value: number): number => {
  const steps = Math.round((value - props.min) / props.step)
  return props.min + (steps * props.step)
}

const getValueFromPosition = (clientX: number, clientY: number): number => {
  if (!trackRef.value) return props.min
  
  const rect = trackRef.value.getBoundingClientRect()
  let percent: number
  
  if (props.orientation === 'horizontal') {
    percent = (clientX - rect.left) / rect.width
  } else {
    percent = 1 - (clientY - rect.top) / rect.height
  }
  
  percent = Math.max(0, Math.min(1, percent))
  const rawValue = props.min + (percent * (props.max - props.min))
  return snapToStep(clampValue(rawValue))
}

// Gestionnaires d'événements
const updateValue = (newValue: number, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  const clampedValue = clampValue(snapToStep(newValue))
  
  if (props.dual) {
    const [currentMin, currentMax] = currentValue.value as [number, number]
    
    if (thumbType === 'min') {
      currentValue.value = [Math.min(clampedValue, currentMax), currentMax]
    } else {
      currentValue.value = [currentMin, Math.max(clampedValue, currentMin)]
    }
  } else {
    currentValue.value = clampedValue
  }
  
  // Annonce pour les lecteurs d'écran
  const announcement = props.dual 
    ? `${thumbType === 'min' ? 'Minimum' : 'Maximum'} : ${formatValue(clampedValue)}`
    : formatValue(clampedValue)
  announceToScreenReader(announcement)
}

const handleMouseDown = (event: MouseEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  event.preventDefault()
  isDragging.value = true
  activeThumb.value = thumbType
  
  const handleMouseMove = (e: MouseEvent) => {
    const newValue = getValueFromPosition(e.clientX, e.clientY)
    updateValue(newValue, thumbType)
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    activeThumb.value = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleTrackClick = (event: MouseEvent) => {
  if (props.disabled || props.readonly) return
  
  const newValue = getValueFromPosition(event.clientX, event.clientY)
  
  if (props.dual) {
    const [currentMin, currentMax] = currentValue.value as [number, number]
    const distanceToMin = Math.abs(newValue - currentMin)
    const distanceToMax = Math.abs(newValue - currentMax)
    const thumbType = distanceToMin <= distanceToMax ? 'min' : 'max'
    updateValue(newValue, thumbType)
  } else {
    updateValue(newValue)
  }
}

const handleKeyDown = (event: KeyboardEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.disabled || props.readonly) return
  
  const currentVal = thumbType === 'min' ? minValue.value : maxValue.value
  let newValue = currentVal
  const largeStep = (props.max - props.min) / 10
  
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault()
      newValue = currentVal + props.step
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault()
      newValue = currentVal - props.step
      break
    case 'PageUp':
      event.preventDefault()
      newValue = currentVal + largeStep
      break
    case 'PageDown':
      event.preventDefault()
      newValue = currentVal - largeStep
      break
    case 'Home':
      event.preventDefault()
      newValue = props.min
      break
    case 'End':
      event.preventDefault()
      newValue = props.max
      break
    default:
      return
  }
  
  updateValue(newValue, thumbType)
  emit('keydown', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Génération des ticks
const ticks = computed(() => {
  if (!props.showTicks) return []
  
  const tickCount = Math.min(21, (props.max - props.min) / props.step + 1)
  const tickStep = (props.max - props.min) / (tickCount - 1)
  
  return Array.from({ length: tickCount }, (_, i) => {
    const value = props.min + (i * tickStep)
    const percent = ((value - props.min) / (props.max - props.min)) * 100
    return { value: snapToStep(value), percent }
  })
})

// Méthodes exposées
const focus = () => {
  if (props.dual) {
    thumb1Ref.value?.focus()
  } else {
    thumb1Ref.value?.focus()
  }
}

defineExpose({
  focus,
  rangeRef,
  thumb1Ref,
  thumb2Ref
})
</script>

<template>
  <FormField
    :field-id="rangeId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <div :class="containerClasses">
        <!-- Labels min/max (si activés) -->
        <div
          v-if="showLabels"
          class="su-range-labels"
        >
          <span class="su-range-label su-range-label--min">{{ formatValue(min) }}</span>
          <span class="su-range-label su-range-label--max">{{ formatValue(max) }}</span>
        </div>

        <!-- Container du slider -->
        <div class="su-range-wrapper">
          <!-- Valeur affichée (si activée) -->
          <div
            v-if="showValue"
            class="su-range-value"
          >
            <span
              v-if="!dual"
              class="su-range-value-display"
            >
              {{ formatValue(minValue) }}
            </span>
            <div
              v-else
              class="su-range-value-dual"
            >
              <span class="su-range-value-min">{{ formatValue(minValue) }}</span>
              <span class="su-range-value-separator">-</span>
              <span class="su-range-value-max">{{ formatValue(maxValue) }}</span>
            </div>
          </div>

          <!-- Slider -->
          <div 
            ref="rangeRef"
            class="su-range-slider"
            :aria-describedby="messageId"
            @click="handleTrackClick"
          >
            <!-- Track de fond -->
            <div
              ref="trackRef"
              :class="trackClasses"
            >
              <!-- Track actif -->
              <div 
                class="su-range-track-active"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${dual ? minPercent : 0}%`,
                  [orientation === 'horizontal' ? 'width' : 'height']: `${dual ? maxPercent - minPercent : minPercent}%`
                }"
              />

              <!-- Ticks (si activés) -->
              <div
                v-if="showTicks"
                class="su-range-ticks"
              >
                <div
                  v-for="tick in ticks"
                  :key="tick.value"
                  class="su-range-tick"
                  :style="{
                    [orientation === 'horizontal' ? 'left' : 'bottom']: `${tick.percent}%`
                  }"
                />
              </div>

              <!-- Thumb principal (ou minimum pour dual) -->
              <div
                :id="dual ? `${id}-min` : id"
                ref="thumb1Ref"
                :class="getThumbClasses('min')"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${minPercent}%`
                }"
                :tabindex="disabled ? -1 : 0"
                v-bind="getAriaAttributes('min')"
                @mousedown="handleMouseDown($event, 'min')"
                @keydown="handleKeyDown($event, 'min')"
                @focus="handleFocus"
                @blur="handleBlur"
              >
                <div class="su-range-thumb-handle" />
              </div>

              <!-- Thumb maximum (dual seulement) -->
              <div
                v-if="dual"
                :id="`${id}-max`"
                ref="thumb2Ref"
                :class="getThumbClasses('max')"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${maxPercent}%`
                }"
                :tabindex="disabled ? -1 : 0"
                v-bind="getAriaAttributes('max')"
                @mousedown="handleMouseDown($event, 'max')"
                @keydown="handleKeyDown($event, 'max')"
                @focus="handleFocus"
                @blur="handleBlur"
              >
                <div class="su-range-thumb-handle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </FormField>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-range-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  &--horizontal {
    .su-range-wrapper {
      flex-direction: column;
    }
  }
  
  &--vertical {
    .su-range-wrapper {
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }
    
    .su-range-slider {
      height: 200px;
      width: auto;
    }
    
    .su-range-labels {
      flex-direction: column-reverse;
      height: 200px;
      justify-content: space-between;
    }
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.su-range-wrapper {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.su-range-labels {
  display: flex;
  justify-content: space-between;
  font-size: $font-size-sm;
  color: $text-secondary;
  
  .su-range-label {
    font-weight: 500;
    
    &--min {
      color: $text-secondary;
    }
    
    &--max {
      color: $text-secondary;
    }
  }
}

.su-range-value {
  display: flex;
  justify-content: center;
  min-width: 4rem;
  
  &-display {
    font-weight: 600;
    color: $text-primary;
    font-size: $font-size-sm;
    padding: 0.25rem 0.5rem;
    background-color: $gray-100;
    border-radius: $border-radius-sm;
  }
  
  &-dual {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
    color: $text-primary;
    font-size: $font-size-sm;
  }
  
  &-min,
  &-max {
    padding: 0.25rem 0.5rem;
    background-color: $gray-100;
    border-radius: $border-radius-sm;
  }
  
  &-separator {
    color: $text-secondary;
  }
}

.su-range-slider {
  position: relative;
  flex: 1;
  cursor: pointer;
  width: 100%;
  
  // Tailles
  &--sm {
    height: 1.5rem;
  }
  
  &--md {
    height: 2rem;
  }
  
  &--lg {
    height: 2.5rem;
  }
}

.su-range-track {
  position: absolute;
  background-color: $gray-200;
  border-radius: 9999px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  // Orientation horizontale
  &--horizontal {
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }
  
  // Orientation verticale
  &--vertical {
    left: 50%;
    top: 0;
    bottom: 0;
    transform: translateX(-50%);
  }
  
  // Tailles
  &--sm {
    &.su-range-track--horizontal {
      height: 0.25rem;
    }
    &.su-range-track--vertical {
      width: 0.25rem;
    }
  }
  
  &--md {
    &.su-range-track--horizontal {
      height: 0.375rem;
    }
    &.su-range-track--vertical {
      width: 0.375rem;
    }
  }
  
  &--lg {
    &.su-range-track--horizontal {
      height: 0.5rem;
    }
    &.su-range-track--vertical {
      width: 0.5rem;
    }
  }
  
  // États
  &--error {
    background-color: $error-50;
  }
  
  &--success {
    background-color: $success-50;
  }
  
  &--warning {
    background-color: $warning-50;
  }
}

.su-range-track-active {
  position: absolute;
  background-color: $primary-500;
  border-radius: inherit;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  // Orientation
  .su-range-track--horizontal & {
    top: 0;
    height: 100%;
  }
  
  .su-range-track--vertical & {
    left: 0;
    width: 100%;
  }
  
  // États
  .su-range-track--error & {
    background-color: $error-500;
  }
  
  .su-range-track--success & {
    background-color: $success-500;
  }
  
  .su-range-track--warning & {
    background-color: $warning-500;
  }
}

.su-range-ticks {
  position: absolute;
  
  .su-range-track--horizontal & {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }
  
  .su-range-track--vertical & {
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}

.su-range-tick {
  position: absolute;
  background-color: $gray-400;
  
  .su-range-track--horizontal & {
    width: 1px;
    height: 100%;
    transform: translateX(-50%);
  }
  
  .su-range-track--vertical & {
    height: 1px;
    width: 100%;
    transform: translateY(-50%);
  }
}

.su-range-thumb {
  position: absolute;
  cursor: grab;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  
  &:focus {
    outline: none;
    z-index: 2;
    
    .su-range-thumb-handle {
      box-shadow: 0 0 0 3px rgba($primary-500, 0.3);
    }
  }
  
  &:active,
  &--active {
    cursor: grabbing;
    z-index: 3;
    
    .su-range-thumb-handle {
      transform: scale(1.1);
    }
  }
  
  // Orientation
  &--horizontal {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  &--vertical {
    left: 50%;
    transform: translate(-50%, 50%);
  }
  
  // Tailles
  &--sm {
    .su-range-thumb-handle {
      width: 1rem;
      height: 1rem;
    }
  }
  
  &--md {
    .su-range-thumb-handle {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &--lg {
    .su-range-thumb-handle {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  
  // États
  &--disabled {
    cursor: not-allowed;
    
    .su-range-thumb-handle {
      background-color: $gray-300;
      border-color: $gray-400;
    }
  }
  
  &--readonly {
    cursor: default;
  }
  
  &--error {
    .su-range-thumb-handle {
      border-color: $error-500;
    }
    
    &:focus .su-range-thumb-handle {
      box-shadow: 0 0 0 3px rgba($error-500, 0.3);
    }
  }
  
  &--success {
    .su-range-thumb-handle {
      border-color: $success-500;
    }
    
    &:focus .su-range-thumb-handle {
      box-shadow: 0 0 0 3px rgba($success-500, 0.3);
    }
  }
  
  &--warning {
    .su-range-thumb-handle {
      border-color: $warning-500;
    }
    
    &:focus .su-range-thumb-handle {
      box-shadow: 0 0 0 3px rgba($warning-500, 0.3);
    }
  }
}

.su-range-thumb-handle {
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border: 2px solid $primary-500;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-range-track {
    background-color: $gray-600;
  }
  
  .su-range-track-active {
    background-color: $primary-400;
    
    .su-range-track--error & {
      background-color: $error-400;
    }
    
    .su-range-track--success & {
      background-color: $success-400;
    }
    
    .su-range-track--warning & {
      background-color: $warning-400;
    }
  }
  
  .su-range-thumb-handle {
    background-color: $gray-800;
    border-color: $primary-400;
  }
  
  .su-range-value-display,
  .su-range-value-min,
  .su-range-value-max {
    background-color: $gray-700;
    color: $text-primary-dark;
  }
  
  .su-range-labels {
    color: $text-secondary-dark;
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-range-thumb-handle {
    border-width: 3px;
  }
  
  .su-range-track {
    border: 1px solid $gray-400;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-range-track,
  .su-range-track-active,
  .su-range-thumb,
  .su-range-thumb-handle {
    transition: none;
  }
  
  .su-range-thumb:active .su-range-thumb-handle,
  .su-range-thumb--active .su-range-thumb-handle {
    transform: none;
  }
}
</style>