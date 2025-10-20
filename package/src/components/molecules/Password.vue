<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import Input from './InputField.vue'
import type { InputProps } from './InputField.vue'

export interface PasswordValidation {
  isValid: boolean
  score: number // 0-100
  satisfied: string[]
  unsatisfied: string[]
  details: {
    length: { required: number; current: number; satisfied: boolean }
    uppercase: { required: number; current: number; satisfied: boolean }
    lowercase: { required: number; current: number; satisfied: boolean }
    digits: { required: number; current: number; satisfied: boolean }
    specialChars: { required: number; current: number; satisfied: boolean }
  }
}

export interface PasswordRules {
  minLength?: number
  minUppercase?: number
  minLowercase?: number
  minDigits?: number
  minSpecialChars?: number
}

export interface PasswordProps extends Omit<InputProps, 'type' | 'suffixIcon'> {
  rules?: PasswordRules
  showProgress?: boolean
  showToggle?: boolean
}

export interface Props extends PasswordProps {}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  state: 'default',
  disabled: false,
  readonly: false,
  required: false,
  showProgress: false,
  showToggle: true,
  rules: () => ({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minDigits: 1,
    minSpecialChars: 1
  })
})

// Utilisation de defineModel pour v-model
const modelValue = defineModel<string>({ default: '' })

const emit = defineEmits<{
  validation: [validation: PasswordValidation]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
  'toggle-visibility': [visible: boolean]
}>()

// État local
const isVisible = ref(false)

// Type d'input calculé
const inputType = computed(() => isVisible.value ? 'text' : 'password')

// Icône de suffixe calculée
const suffixIcon = computed(() => isVisible.value ? EyeSlashIcon : EyeIcon)

// Validation du mot de passe
const validatePassword = (password: string): PasswordValidation => {
  const rules = props.rules || {}
  
  // Compteurs
  const length = password.length
  const uppercase = (password.match(/[A-Z]/g) || []).length
  const lowercase = (password.match(/[a-z]/g) || []).length
  const digits = (password.match(/[0-9]/g) || []).length
  const specialChars = (password.match(/[^A-Za-z0-9]/g) || []).length
  
  // Vérification des règles
  const checks = {
    length: {
      required: rules.minLength || 0,
      current: length,
      satisfied: length >= (rules.minLength || 0)
    },
    uppercase: {
      required: rules.minUppercase || 0,
      current: uppercase,
      satisfied: uppercase >= (rules.minUppercase || 0)
    },
    lowercase: {
      required: rules.minLowercase || 0,
      current: lowercase,
      satisfied: lowercase >= (rules.minLowercase || 0)
    },
    digits: {
      required: rules.minDigits || 0,
      current: digits,
      satisfied: digits >= (rules.minDigits || 0)
    },
    specialChars: {
      required: rules.minSpecialChars || 0,
      current: specialChars,
      satisfied: specialChars >= (rules.minSpecialChars || 0)
    }
  }
  
  // Règles satisfaites et non satisfaites
  const satisfied: string[] = []
  const unsatisfied: string[] = []
  
  Object.entries(checks).forEach(([key, check]) => {
    if (check.required > 0) {
      if (check.satisfied) {
        satisfied.push(key)
      } else {
        unsatisfied.push(key)
      }
    }
  })
  
  // Calcul du score (0-100)
  const totalRules = Object.values(checks).filter(check => check.required > 0).length
  const satisfiedRules = satisfied.length
  const score = totalRules > 0 ? Math.round((satisfiedRules / totalRules) * 100) : 100
  
  // Validation globale
  const isValid = unsatisfied.length === 0 && password.length > 0
  
  return {
    isValid,
    score,
    satisfied,
    unsatisfied,
    details: checks
  }
}

// Validation réactive
const validation = computed(() => validatePassword(modelValue.value || ''))

// État calculé basé sur la validation
const computedState = computed(() => {
  if (props.state !== 'default') return props.state
  if (!modelValue.value) return 'default'
  
  if (validation.value.isValid) return 'success'
  if (validation.value.score < 25) return 'error'
  if (validation.value.score < 75) return 'warning'
  return 'default'
})

// Classes pour la barre de progression
const progressClasses = computed(() => [
  'su-password-progress',
  `su-password-progress--${computedState.value}`,
  {
    'su-password-progress--empty': !modelValue.value,
    'su-password-progress--weak': validation.value.score < 25,
    'su-password-progress--fair': validation.value.score >= 25 && validation.value.score < 50,
    'su-password-progress--good': validation.value.score >= 50 && validation.value.score < 75,
    'su-password-progress--strong': validation.value.score >= 75
  }
])

// Gestionnaires d'événements
const toggleVisibility = () => {
  if (props.disabled || props.readonly) return
  
  isVisible.value = !isVisible.value
  emit('toggle-visibility', isVisible.value)
}

const handleSuffixIconClick = () => {
  toggleVisibility()
}

const handleInput = (event: Event) => {
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

// Watcher pour émettre la validation
watch(validation, (newValidation) => {
  emit('validation', newValidation)
}, { immediate: true })

// Calcul du label du bouton toggle
// const toggleLabel = computed(() => {
//   return isVisible.value ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
// })
</script>

<template>
  <div class="su-password-wrapper">
    <!-- Input avec toggle de visibilité -->
    <Input
      v-model="modelValue"
      :type="inputType"
      :size="size"
      :state="computedState"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :placeholder="placeholder"
      :prefix="prefix"
      :prefixIcon="prefixIcon"
      :suffixIcon="showToggle ? suffixIcon : undefined"
      :textAlign="textAlign"
      :label="label"
      :message="message"
      :ariaLabel="ariaLabel"
      :ariaDescribedBy="ariaDescribedBy"
      :ariaInvalid="ariaInvalid"
      :ariaRequired="ariaRequired"
      :autocomplete="autocomplete"
      :minLength="minLength"
      :maxLength="maxLength"
      :pattern="pattern"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @suffix-icon-click="handleSuffixIconClick"
    >
      <!-- Slot pour message personnalisé basé sur la validation -->
      <template v-if="$slots.default" #message>
        <slot 
          :validation="validation"
          :isValid="validation.isValid"
          :score="validation.score"
          :satisfied="validation.satisfied"
          :unsatisfied="validation.unsatisfied"
          :details="validation.details"
        />
      </template>
    </Input>

    <!-- Barre de progression (si activée) -->
    <div 
      v-if="showProgress && modelValue" 
      class="su-password-progress-container"
      role="progressbar"
      :aria-valuenow="validation.score"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`Force du mot de passe : ${validation.score}%`"
    >
      <div 
        :class="progressClasses"
        :style="{ width: `${validation.score}%` }"
      />
      
      <!-- Label de force (optionnel) -->
      <div class="su-password-strength-label">
        <span v-if="validation.score < 25" class="su-password-strength-text su-password-strength-text--weak">
          Faible
        </span>
        <span v-else-if="validation.score < 50" class="su-password-strength-text su-password-strength-text--fair">
          Moyen
        </span>
        <span v-else-if="validation.score < 75" class="su-password-strength-text su-password-strength-text--good">
          Bon
        </span>
        <span v-else class="su-password-strength-text su-password-strength-text--strong">
          Fort
        </span>
      </div>
    </div>

    <!-- Message d'accessibilité pour les lecteurs d'écran -->
    <div 
      class="sr-only" 
      aria-live="polite"
      :aria-atomic="true"
    >
      <span v-if="modelValue">
        Mot de passe {{ validation.isValid ? 'valide' : 'invalide' }}. 
        Force : {{ validation.score }}%. 
        {{ validation.satisfied.length }} règle(s) respectée(s), 
        {{ validation.unsatisfied.length }} règle(s) non respectée(s).
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.su-password-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.su-password-progress-container {
  position: relative;
  height: 0.25rem;
  background-color: $gray-200;
  border-radius: 9999px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.su-password-progress {
  height: 100%;
  border-radius: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0.25rem;
  
  &--empty {
    width: 0 !important;
  }
  
  &--weak {
    background-color: $error-500;
  }
  
  &--fair {
    background-color: $warning-500;
  }
  
  &--good {
    background-color: $warning-400;
  }
  
  &--strong {
    background-color: $success-500;
  }
  
  // États basés sur le state du composant
  &--error {
    background-color: $error-500;
  }
  
  &--success {
    background-color: $success-500;
  }
  
  &--warning {
    background-color: $warning-500;
  }
  
  &--default {
    background-color: $primary-500;
  }
}

.su-password-strength-label {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.su-password-strength-text {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  
  &--weak {
    color: $error-600;
  }
  
  &--fair {
    color: $warning-600;
  }
  
  &--good {
    color: $warning-500;
  }
  
  &--strong {
    color: $success-600;
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .su-password-progress-container {
    background-color: $gray-600;
  }
  
  .su-password-progress {
    &--weak {
      background-color: $error-400;
    }
    
    &--fair {
      background-color: $warning-400;
    }
    
    &--good {
      background-color: $warning-300;
    }
    
    &--strong {
      background-color: $success-400;
    }
    
    &--error {
      background-color: $error-400;
    }
    
    &--success {
      background-color: $success-400;
    }
    
    &--warning {
      background-color: $warning-400;
    }
    
    &--default {
      background-color: $primary-400;
    }
  }
  
  .su-password-strength-text {
    &--weak {
      color: $error-400;
    }
    
    &--fair {
      color: $warning-400;
    }
    
    &--good {
      color: $warning-300;
    }
    
    &--strong {
      color: $success-400;
    }
  }
}

// Support de la réduction des animations
@media (prefers-reduced-motion: reduce) {
  .su-password-progress {
    transition: none;
  }
}
</style>