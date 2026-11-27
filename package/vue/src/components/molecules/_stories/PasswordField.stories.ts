import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { LockClosedIcon } from '@heroicons/vue/24/outline'
import PasswordField from '../PasswordField.vue'

const meta: Meta<typeof PasswordField> = {
  title: 'Molecules/PasswordField',
  component: PasswordField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Password qui hérite du composant Input avec validation de complexité, barre de progression et toggle de visibilité. Conforme aux normes W3C d\'accessibilité.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du champ password'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel du champ'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le champ'
    },
    readonly: {
      control: 'boolean',
      description: 'Champ en lecture seule'
    },
    required: {
      control: 'boolean',
      description: 'Champ requis'
    },
    placeholder: {
      control: 'text',
      description: 'Texte de placeholder'
    },
    value: {
      control: 'text',
      description: 'Valeur du mot de passe'
    },
    rules: {
      control: 'object',
      description: 'Règles de validation du mot de passe'
    },
    showProgress: {
      control: 'boolean',
      description: 'Afficher la barre de progression'
    },
    showToggle: {
      control: 'boolean',
      description: 'Afficher le bouton toggle de visibilité'
    },
    label: {
      control: 'text',
      description: 'Label du champ'
    },
    message: {
      control: 'text',
      description: 'Message affiché'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Mot de passe',
    placeholder: 'Entrez votre mot de passe',
    showProgress: true
  }
}

export const WithValue: Story = {
  args: {
    label: 'Mot de passe',
    placeholder: 'Entrez votre mot de passe',
    modelValue: 'MonMotDePasse123!',
    showProgress: true
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Mot de passe',
    placeholder: 'Entrez votre mot de passe',
    prefixIcon: LockClosedIcon,
    showProgress: true
  }
}

export const CustomRules: Story = {
  args: {
    label: 'Mot de passe sécurisé',
    placeholder: 'Entrez un mot de passe très sécurisé',
    showProgress: true,
    rules: {
      minLength: 12,
      minUppercase: 2,
      minLowercase: 2,
      minDigits: 2,
      minSpecialChars: 2
    }
  }
}

export const SimpleRules: Story = {
  args: {
    label: 'Mot de passe simple',
    placeholder: 'Entrez un mot de passe simple',
    showProgress: true,
    rules: {
      minLength: 6,
      minUppercase: 0,
      minLowercase: 1,
      minDigits: 1,
      minSpecialChars: 0
    }
  }
}

export const WithoutToggle: Story = {
  args: {
    label: 'Mot de passe sans toggle',
    placeholder: 'Mot de passe toujours masqué',
    showToggle: false,
    showProgress: true
  }
}

export const WithoutProgress: Story = {
  args: {
    label: 'Mot de passe sans barre',
    placeholder: 'Pas de barre de progression',
    showProgress: false
  }
}

export const WithCustomMessage: Story = {
  render: () => ({
    components: { PasswordField },
    setup() {
      const password = ref('')
      
      return { password, LockClosedIcon }
    },
    template: `
      <div style="width: 400px;">
        <PasswordField 
          label="Mot de passe avec message personnalisé"
          placeholder="Entrez votre mot de passe"
          :prefixIcon="LockClosedIcon"
          showProgress
          v-model="password"
        >
          <template #default="{ validation, isValid, score, satisfied, unsatisfied, details }">
            <div style="margin-top: 0.5rem;">
              <div v-if="!password" style="color: #6b7280; font-size: 0.875rem;">
                Entrez un mot de passe pour voir les critères
              </div>
              <div v-else>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-weight: 600; font-size: 0.875rem;" :style="{ color: isValid ? '#059669' : '#dc2626' }">
                    {{ isValid ? '✓ Mot de passe valide' : '⚠ Mot de passe invalide' }}
                  </span>
                  <span style="font-size: 0.75rem; color: #6b7280;">
                    Force : {{ score }}%
                  </span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 0.25rem;">
                    <span :style="{ color: details.length.satisfied ? '#059669' : '#dc2626' }">
                      {{ details.length.satisfied ? '✓' : '✗' }}
                    </span>
                    <span>{{ details.length.current }}/{{ details.length.required }} caractères</span>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 0.25rem;">
                    <span :style="{ color: details.uppercase.satisfied ? '#059669' : '#dc2626' }">
                      {{ details.uppercase.satisfied ? '✓' : '✗' }}
                    </span>
                    <span>{{ details.uppercase.current }}/{{ details.uppercase.required }} majuscules</span>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 0.25rem;">
                    <span :style="{ color: details.lowercase.satisfied ? '#059669' : '#dc2626' }">
                      {{ details.lowercase.satisfied ? '✓' : '✗' }}
                    </span>
                    <span>{{ details.lowercase.current }}/{{ details.lowercase.required }} minuscules</span>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 0.25rem;">
                    <span :style="{ color: details.digits.satisfied ? '#059669' : '#dc2626' }">
                      {{ details.digits.satisfied ? '✓' : '✗' }}
                    </span>
                    <span>{{ details.digits.current }}/{{ details.digits.required }} chiffres</span>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 0.25rem;">
                    <span :style="{ color: details.specialChars.satisfied ? '#059669' : '#dc2626' }">
                      {{ details.specialChars.satisfied ? '✓' : '✗' }}
                    </span>
                    <span>{{ details.specialChars.current }}/{{ details.specialChars.required }} spéciaux</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Password>
      </div>
    `
  })
}

export const States: Story = {
  render: () => ({
    components: { PasswordField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <PasswordField 
          label="État par défaut"
          placeholder="Entrez votre mot de passe"
          showProgress
        />
        <PasswordField 
          state="error"
          label="État d'erreur"
          placeholder="Mot de passe invalide"
          modelValue="123"
          showProgress
          message="Le mot de passe ne respecte pas les critères"
        />
        <PasswordField 
          state="success"
          label="État de succès"
          placeholder="Mot de passe valide"
          modelValue="MonMotDePasse123!"
          showProgress
          message="Mot de passe sécurisé !"
        />
        <PasswordField 
          state="warning"
          label="État d'avertissement"
          placeholder="Mot de passe moyen"
          modelValue="Password1"
          showProgress
          message="Mot de passe acceptable mais peut être amélioré"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { PasswordField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <PasswordField 
          size="sm"
          label="Small"
          placeholder="Petit champ password"
          showProgress
        />
        <PasswordField 
          size="md"
          label="Medium"
          placeholder="Champ password moyen"
          showProgress
        />
        <PasswordField 
          size="lg"
          label="Large"
          placeholder="Grand champ password"
          showProgress
        />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    label: 'Password désactivé',
    disabled: true,
    modelValue: 'MotDePasseDesactive123!',
    showProgress: true,
    message: 'Ce champ est temporairement désactivé'
  }
}

export const Readonly: Story = {
  args: {
    label: 'Password en lecture seule',
    readonly: true,
    modelValue: 'MotDePasseLectureSeule123!',
    showProgress: true,
    message: 'Ce mot de passe ne peut pas être modifié'
  }
}

export const Required: Story = {
  args: {
    label: 'Mot de passe requis',
    required: true,
    placeholder: 'Ce champ est obligatoire',
    showProgress: true,
    message: 'Veuillez entrer un mot de passe sécurisé'
  }
}

export const RegistrationForm: Story = {
  render: () => ({
    components: { PasswordField },
    setup() {
      const password = ref('')
      const confirmPassword = ref('')
      
      const handleValidation = (validation) => {
        console.log('Validation du mot de passe:', validation)
      }
      
      return { password, confirmPassword, handleValidation, LockClosedIcon }
    },
    template: `
      <form style="max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
        <h2>Créer un compte</h2>
        
        <PasswordField 
          label="Mot de passe"
          placeholder="Choisissez un mot de passe sécurisé"
          :prefixIcon="LockClosedIcon"
          required
          showProgress
          v-model="password"
          @validation="handleValidation"
        >
          <template #default="{ validation, details }">
            <div v-if="password" style="margin-top: 0.75rem;">
              <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600; color: #374151;">
                Critères de sécurité :
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span :style="{ color: details.length.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.length.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>Au moins {{ details.length.required }} caractères ({{ details.length.current }})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span :style="{ color: details.uppercase.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.uppercase.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>Au moins {{ details.uppercase.required }} majuscule ({{ details.uppercase.current }})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span :style="{ color: details.lowercase.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.lowercase.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>Au moins {{ details.lowercase.required }} minuscule ({{ details.lowercase.current }})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span :style="{ color: details.digits.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.digits.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>Au moins {{ details.digits.required }} chiffre ({{ details.digits.current }})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span :style="{ color: details.specialChars.satisfied ? '#059669' : '#dc2626', fontWeight: '600' }">
                    {{ details.specialChars.satisfied ? '✓' : '✗' }}
                  </span>
                  <span>Au moins {{ details.specialChars.required }} caractère spécial ({{ details.specialChars.current }})</span>
                </div>
              </div>
            </div>
          </template>
        </Password>
        
        <PasswordField 
          label="Confirmer le mot de passe"
          placeholder="Confirmez votre mot de passe"
          :prefixIcon="LockClosedIcon"
          required
          :showProgress="false"
          v-model="confirmPassword"
        />
        
        <button 
          type="submit" 
          style="padding: 0.75rem 1.5rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer;"
        >
          Créer le compte
        </button>
      </form>
    `
  })
}

export const ValidationStates: Story = {
  render: () => ({
    components: { PasswordField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Mot de passe faible</h4>
          <PasswordField 
            label="Faible"
            modelValue="123"
            showProgress
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Mot de passe moyen</h4>
          <PasswordField 
            label="Moyen"
            modelValue="Password1"
            showProgress
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Mot de passe bon</h4>
          <PasswordField 
            label="Bon"
            modelValue="MyPassword123"
            showProgress
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Mot de passe fort</h4>
          <PasswordField 
            label="Fort"
            modelValue="MySecurePassword123!"
            showProgress
          />
        </div>
      </div>
    `
  })
}

export const DifferentRules: Story = {
  render: () => ({
    components: { PasswordField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Règles basiques</h4>
          <PasswordField 
            label="Mot de passe basique"
            placeholder="6 caractères minimum"
            showProgress
            :rules="{ minLength: 6, minUppercase: 0, minLowercase: 1, minDigits: 1, minSpecialChars: 0 }"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Règles standard</h4>
          <PasswordField 
            label="Mot de passe standard"
            placeholder="8 caractères avec variété"
            showProgress
            :rules="{ minLength: 8, minUppercase: 1, minLowercase: 1, minDigits: 1, minSpecialChars: 1 }"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Règles strictes</h4>
          <PasswordField 
            label="Mot de passe strict"
            placeholder="12 caractères très sécurisé"
            showProgress
            :rules="{ minLength: 12, minUppercase: 2, minLowercase: 2, minDigits: 2, minSpecialChars: 2 }"
          />
        </div>
      </div>
    `
  })
}

export const Interactive: Story = {
  render: () => ({
    components: { PasswordField },
    setup() {
      const password = ref('')
      const validation = ref(null)
      
      const handleValidation = (val) => {
        validation.value = val
      }
      
      const handleToggle = (visible) => {
        console.log('Visibilité changée:', visible)
      }
      
      return { password, validation, handleValidation, handleToggle }
    },
    template: `
      <div style="max-width: 500px; margin: 0 auto;">
        <h3 style="margin-bottom: 1.5rem;">Test interactif du composant Password</h3>
        
        <PasswordField 
          label="Mot de passe interactif"
          placeholder="Tapez pour voir la validation en temps réel"
          showProgress
          required
          v-model="password"
          @validation="handleValidation"
          @toggle-visibility="handleToggle"
        />
        
        <div v-if="validation" style="margin-top: 1.5rem; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem;">État de validation :</h4>
          <pre style="font-size: 0.75rem; margin: 0; white-space: pre-wrap;">{{ JSON.stringify(validation, null, 2) }}</pre>
        </div>
      </div>
    `
  })
}