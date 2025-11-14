<script setup lang="ts">
import { computed, ref, useAttrs, useId } from 'vue'
import { announceToScreenReader } from '@/utils/accessibility'
import FormField from '@/components/atoms/FormField.vue'
import type { SliderFieldProps } from '@/types'

export interface Props extends Omit<SliderFieldProps, 'value'> {}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  orientation: 'horizontal',
  tooltip: 'none',
  marks: () => [],
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
const sliderRef = ref<HTMLDivElement>()
const trackRef = ref<HTMLDivElement>()
const thumb1Ref = ref<HTMLDivElement>()
const thumb2Ref = ref<HTMLDivElement>()
const isDragging = ref(false)
const activeThumb = ref<'min' | 'max' | null>(null)
const showTooltip1 = ref(false)
const showTooltip2 = ref(false)

const fieldId = 'slider-' + useId()
const sliderId = computed(() => attrs.id as string || fieldId)

// Détection automatique du mode dual-range
const isDualRange = computed(() => {
  return Array.isArray(modelValue.value)
})

// Valeurs normalisées
const currentValue = computed({
  get() {
    // Si modelValue n'est pas défini, utiliser les valeurs par défaut
    if (modelValue.value === undefined || modelValue.value === null) {
      return props.min
    }
    return modelValue.value
  },
  set(newValue: number | [number, number]) {
    modelValue.value = newValue
    emit('change', newValue)
    emit('input', newValue)
  }
})

const minValue = computed(() => {
  return isDualRange.value ? (currentValue.value as [number, number])[0] : (currentValue.value as number)
})

const maxValue = computed(() => {
  return isDualRange.value ? (currentValue.value as [number, number])[1] : (currentValue.value as number)
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
  'su-slider-container',
  `su-slider-container--${props.size}`,
  `su-slider-container--${props.state}`,
  `su-slider-container--${props.orientation}`,
  {
    'su-slider-container--disabled': props.disabled,
    'su-slider-container--readonly': props.readonly,
    'su-slider-container--dual': isDualRange.value,
    'su-slider-container--dragging': isDragging.value
  }
])

const trackClasses = computed(() => [
  'su-slider-track',
  `su-slider-track--${props.size}`,
  `su-slider-track--${props.state}`,
  `su-slider-track--${props.orientation}`
])

const getThumbClasses = (thumbType: 'min' | 'max') => [
  'su-slider-thumb',
  `su-slider-thumb--${props.size}`,
  `su-slider-thumb--${props.state}`,
  `su-slider-thumb--${props.orientation}`,
  {
    'su-slider-thumb--disabled': props.disabled,
    'su-slider-thumb--readonly': props.readonly,
    'su-slider-thumb--active': activeThumb.value === thumbType
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
    attrs['aria-label'] = isDualRange.value 
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
  
  if (isDualRange.value) {
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
  const announcement = isDualRange.value 
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
  
  if (isDualRange.value) {
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

const handleFocus = (event: FocusEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    if (thumbType === 'min') {
      showTooltip1.value = true
    } else {
      showTooltip2.value = true
    }
  }
  emit('focus', event)
}

const handleBlur = (event: FocusEvent, thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    if (thumbType === 'min') {
      showTooltip1.value = false
    } else {
      showTooltip2.value = false
    }
  }
  emit('blur', event)
}

const handleMouseEnter = (thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none' && !props.disabled) {
    if (thumbType === 'min') {
      showTooltip1.value = true
    } else {
      showTooltip2.value = true
    }
  }
}

const handleMouseLeave = (thumbType: 'min' | 'max' = 'min') => {
  if (props.tooltip !== 'none') {
    if (thumbType === 'min') {
      showTooltip1.value = false
    } else {
      showTooltip2.value = false
    }
  }
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

// Génération des marques
const processedMarks = computed(() => {
  if (!props.marks || props.marks.length === 0) return []
  
  return props.marks
    .filter(mark => mark >= props.min && mark <= props.max)
    .map(mark => {
      const percent = ((mark - props.min) / (props.max - props.min)) * 100
      return { value: mark, percent }
    })
})

// Méthodes exposées
const focus = () => {
  thumb1Ref.value?.focus()
}

defineExpose({
  focus,
  sliderRef,
  thumb1Ref,
  thumb2Ref
})
</script>

<template>
  <FormField
    :field-id="sliderId"
    :label="label"
    :message="message"
    :state="state"
    :required="required"
    :disabled="disabled"
  >
    <template #default="{ fieldId: id, messageId }">
      <div :class="containerClasses">
        <!-- Slot before -->
        <div
          v-if="$slots.before"
          class="su-slider-before"
        >
          <slot name="before" />
        </div>

        <!-- Labels min/max (si activés) -->
        <div
          v-if="showLabels"
          class="su-slider-labels"
        >
          <span class="su-slider-label su-slider-label--min">{{ formatValue(min) }}</span>
          <span class="su-slider-label su-slider-label--max">{{ formatValue(max) }}</span>
        </div>

        <!-- Container du slider -->
        <div class="su-slider-wrapper">
          <!-- Valeur affichée (si activée et pas de tooltip) -->
          <div
            v-if="showValue && tooltip === 'none'"
            class="su-slider-value"
          >
            <span
              v-if="!isDualRange"
              class="su-slider-value-display"
            >
              {{ formatValue(minValue) }}
            </span>
            <div
              v-else
              class="su-slider-value-dual"
            >
              <span class="su-slider-value-min">{{ formatValue(minValue) }}</span>
              <span class="su-slider-value-separator">-</span>
              <span class="su-slider-value-max">{{ formatValue(maxValue) }}</span>
            </div>
          </div>

          <!-- Slider -->
          <div 
            ref="sliderRef"
            class="su-slider-slider"
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
                class="su-slider-track-active"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${isDualRange ? Math.min(minPercent, maxPercent) : 0}%`,
                  [orientation === 'horizontal' ? 'width' : 'height']: `${isDualRange ? Math.abs(maxPercent - minPercent) : Math.abs(minPercent)}%`
                }"
              />

              <!-- Ticks (si activés) -->
              <div
                v-if="showTicks"
                class="su-slider-ticks"
              >
                <div
                  v-for="tick in ticks"
                  :key="tick.value"
                  class="su-slider-tick"
                  :style="{
                    [orientation === 'horizontal' ? 'left' : 'bottom']: `${tick.percent}%`
                  }"
                />
              </div>

              <!-- Marques personnalisées -->
              <div
                v-if="processedMarks.length > 0"
                class="su-slider-marks"
              >
                <div
                  v-for="mark in processedMarks"
                  :key="mark.value"
                  class="su-slider-mark"
                  :style="{
                    [orientation === 'horizontal' ? 'left' : 'bottom']: `${mark.percent}%`
                  }"
                >
                  <div class="su-slider-mark-dot" />
                  <div class="su-slider-mark-label">
                    {{ formatValue(mark.value) }}
                  </div>
                </div>
              </div>

              <!-- Thumb principal (ou minimum pour dual) -->
              <div
                :id="isDualRange ? `${id}-min` : id"
                ref="thumb1Ref"
                :class="getThumbClasses('min')"
                :style="{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${minPercent}%`
                }"
                :tabindex="disabled ? -1 : 0"
                v-bind="getAriaAttributes('min')"
                @mousedown="handleMouseDown($event, 'min')"
                @keydown="handleKeyDown($event, 'min')"
                @focus="handleFocus($event, 'min')"
                @blur="handleBlur($event, 'min')"
                @mouseenter="handleMouseEnter('min')"
                @mouseleave="handleMouseLeave('min')"
              >
                <div class="su-slider-thumb-handle" />
                
                <!-- Tooltip pour le thumb principal -->
                <div 
                  v-if="tooltip !== 'none' && (showTooltip1 || isDragging && activeThumb === 'min')"
                  class="su-slider-tooltip"
                  :class="`su-slider-tooltip--${tooltip}`"
                >
                  {{ formatValue(minValue) }}
                </div>
              </div>

              <!-- Thumb maximum (dual seulement) -->
              <div
                v-if="isDualRange"
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
                @focus="handleFocus($event, 'max')"
                @blur="handleBlur($event, 'max')"
                @mouseenter="handleMouseEnter('max')"
                @mouseleave="handleMouseLeave('max')"
              >
                <div class="su-slider-thumb-handle" />
                
                <!-- Tooltip pour le thumb maximum -->
                <div 
                  v-if="tooltip !== 'none' && (showTooltip2 || isDragging && activeThumb === 'max')"
                  class="su-slider-tooltip"
                  :class="`su-slider-tooltip--${tooltip}`"
                >
                  {{ formatValue(maxValue) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slot after -->
        <div
          v-if="$slots.after"
          class="su-slider-after"
        >
          <slot name="after" />
        </div>
      </div>
    </template>
  </FormField>
</template>

<style lang="scss">
@use '../../styles/main' as *;

.su-slider-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  &--horizontal {
    .su-slider-wrapper {
      flex-direction: column;
    }
  }
  
  &--vertical {
    .su-slider-wrapper {
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }
    
    .su-slider-slider {
      height: 200px;
      width: auto;
    }
    
    .su-slider-labels {
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

.su-slider-wrapper {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.su-slider-before,
.su-slider-after {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.su-slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: $font-size-sm;
  color: $text-secondary;
  
  .su-slider-label {
    font-weight: 500;
    
    &--min {
      color: $text-secondary;
    }
    
    &--max {
      color: $text-secondary;
    }
  }
}

.su-slider-value {
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

.su-slider-slider {
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

.su-slider-track {
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
    &.su-slider-track--horizontal {
      height: 0.25rem;
    }
    &.su-slider-track--vertical {
      width: 0.25rem;
    }
  }
  
  &--md {
    &.su-slider-track--horizontal {
      height: 0.375rem;
    }
    &.su-slider-track--vertical {
      width: 0.375rem;
    }
  }
  
  &--lg {
    &.su-slider-track--horizontal {
      height: 0.5rem;
    }
    &.su-slider-track--vertical {
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

.su-slider-track-active {
  position: absolute;
  background-color: $primary-500;
  border-radius: inherit;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  // Orientation
  .su-slider-track--horizontal & {
    top: 0;
    height: 100%;
  }
  
  .su-slider-track--vertical & {
    left: 0;
    width: 100%;
  }
  
  // États
  .su-slider-track--error & {
    background-color: $error-500;
  }
  
  .su-slider-track--success & {
    background-color: $success-500;
  }
  
  .su-slider-track--warning & {
    background-color: $warning-500;
  }
}

.su-slider-ticks {
  position: absolute;
  
  .su-slider-track--horizontal & {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }
  
  .su-slider-track--vertical & {
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}

.su-slider-tick {
  position: absolute;
  background-color: $gray-400;
  
  .su-slider-track--horizontal & {
    width: 1px;
    height: 100%;
    transform: translateX(-50%);
  }
  
  .su-slider-track--vertical & {
    height: 1px;
    width: 100%;
    transform: translateY(-50%);
  }
}

.su-slider-marks {
  position: absolute;
  
  .su-slider-track--horizontal & {
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
  }
  
  .su-slider-track--vertical & {
    left: 100%;
    top: 0;
    bottom: 0;
    margin-left: 0.5rem;
  }
}

.su-slider-mark {
  position: absolute;
  display: flex;
  align-items: center;
  
  .su-slider-track--horizontal & {
    flex-direction: column;
    transform: translateX(-50%);
  }
  
  .su-slider-track--vertical & {
    flex-direction: row;
    transform: translateY(50%);
  }
  
  &-dot {
    width: 0.375rem;
    height: 0.375rem;
    background-color: $gray-400;
    border-radius: 50%;
    margin-bottom: 0.25rem;
    
    .su-slider-track--vertical & {
      margin-bottom: 0;
      margin-right: 0.25rem;
    }
  }
  
  &-label {
    font-size: 0.75rem;
    color: $text-secondary;
    font-weight: 500;
    white-space: nowrap;
  }
}

.su-slider-thumb {
  position: absolute;
  cursor: grab;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  
  &:focus {
    outline: none;
    z-index: 2;
    
    .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgba($primary-500, 0.3);
    }
  }
  
  &:active,
  &--active {
    cursor: grabbing;
    z-index: 3;
    
    .su-slider-thumb-handle {
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
    .su-slider-thumb-handle {
      width: 1rem;
      height: 1rem;
    }
  }
  
  &--md {
    .su-slider-thumb-handle {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &--lg {
    .su-slider-thumb-handle {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  
  // États
  &--disabled {
    cursor: not-allowed;
    
    .su-slider-thumb-handle {
      background-color: $gray-300;
      border-color: $gray-400;
    }
  }
  
  &--readonly {
    cursor: default;
  }
  
  &--error {
    .su-slider-thumb-handle {
      border-color: $error-500;
    }
    
    &:focus .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgba($error-500, 0.3);
    }
  }
  
  &--success {
    .su-slider-thumb-handle {
      border-color: $success-500;
    }
    
    &:focus .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgba($success-500, 0.3);
    }
  }
  
  &--warning {
    .su-slider-thumb-handle {
      border-color: $warning-500;
    }
    
    &:focus .su-slider-thumb-handle {
      box-shadow: 0 0 0 3px rgba($warning-500, 0.3);
    }
  }
}

.su-slider-thumb-handle {
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

.su-slider-tooltip {
  position: absolute;
  padding: 0.25rem 0.5rem;
  background-color: $gray-900;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: $border-radius-sm;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  
  // Flèche du tooltip
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 4px solid transparent;
  }
  
  &--top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0.5rem;
    
    &::after {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: $gray-900;
    }
  }
  
  &--bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
    
    &::after {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: $gray-900;
    }
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-slider-track {
    background-color: $gray-600;
  }
  
  .su-slider-track-active {
    background-color: $primary-400;
    
    .su-slider-track--error & {
      background-color: $error-400;
    }
    
    .su-slider-track--success & {
      background-color: $success-400;
    }
    
    .su-slider-track--warning & {
      background-color: $warning-400;
    }
  }
  
  .su-slider-thumb-handle {
    background-color: $gray-800;
    border-color: $primary-400;
  }
  
  .su-slider-value-display,
  .su-slider-value-min,
  .su-slider-value-max {
    background-color: $gray-700;
    color: $text-primary-dark;
  }
  
  .su-slider-labels {
    color: $text-secondary-dark;
  }
  
  .su-slider-mark-label {
    color: $text-secondary-dark;
  }
  
  .su-slider-tooltip {
    background-color: $gray-100;
    color: $gray-900;
    
    &--top::after {
      border-top-color: $gray-100;
    }
    
    &--bottom::after {
      border-bottom-color: $gray-100;
    }
  }
}

// Mode de contraste élevé
@media (prefers-contrast: high) {
  .su-slider-thumb-handle {
    border-width: 3px;
  }
  
  .su-slider-track {
    border: 1px solid $gray-400;
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-slider-track,
  .su-slider-track-active,
  .su-slider-thumb,
  .su-slider-thumb-handle {
    transition: none;
  }
  
  .su-slider-thumb:active .su-slider-thumb-handle,
  .su-slider-thumb--active .su-slider-thumb-handle {
    transform: none;
  }
}
</style>