import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import OtpInput from '../OtpInput.vue'
import OtpInputField from '../OtpInputField.vue'
import Button from '../../atoms/Button.vue'
import Badge from '../../atoms/Badge.vue'

const meta: Meta<typeof OtpInput> = {
  title: 'Molecules/OtpInput',
  component: OtpInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant de saisie OTP (One-Time Password) flexible avec variantes visuelles, groupement configurable et validation personnalisable.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Valeur du code OTP (v-model)',
    },
    length: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Nombre de caractères du code',
    },
    variant: {
      control: { type: 'select' },
      options: ['boxes', 'underline', 'seamless'],
      description: 'Variante visuelle',
    },
    inputType: {
      control: { type: 'select' },
      options: ['numeric', 'alphanumeric', 'alphabetic'],
      description: 'Type de caractères acceptés',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille des champs',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État de validation',
    },
    disabled: {
      control: 'boolean',
      description: 'État désactivé',
    },
    readonly: {
      control: 'boolean',
      description: 'Lecture seule',
    },
    masked: {
      control: 'boolean',
      description: 'Masquer les caractères (mode mot de passe)',
    },
    autoSubmit: {
      control: 'boolean',
      description: 'Soumettre automatiquement quand complet',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus au montage',
    },
    placeholder: {
      control: 'text',
      description: 'Caractère placeholder par champ',
    },
    separator: {
      control: 'text',
      description: 'Caractère séparateur entre groupes',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ========================================
// Stories
// ========================================

export const Default: Story = {
  args: {
    length: 6,
    variant: 'boxes',
    inputType: 'numeric',
    size: 'md',
  },
}

export const Variants: Story = {
  name: 'Variantes visuelles',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Boxes (défaut)</p>
          <OtpInput variant="boxes" :length="6" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Underline</p>
          <OtpInput variant="underline" :length="6" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Seamless</p>
          <OtpInput variant="seamless" :length="6" />
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'Tailles',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Small</p>
          <OtpInput size="sm" :length="6" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Medium</p>
          <OtpInput size="md" :length="6" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Large</p>
          <OtpInput size="lg" :length="6" />
        </div>
      </div>
    `,
  }),
}

export const WithGrouping: Story = {
  name: 'Avec groupement',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">6 digits en [3, 3]</p>
          <OtpInput :length="6" :grouping="[3, 3]" separator="-" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">6 digits en [2, 2, 2]</p>
          <OtpInput :length="6" :grouping="[2, 2, 2]" separator="·" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">8 digits en [4, 4]</p>
          <OtpInput :length="8" :grouping="[4, 4]" separator="-" />
        </div>
      </div>
    `,
  }),
}

export const CustomGrouping: Story = {
  name: 'Groupement personnalisé',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Underline [3, 3]</p>
          <OtpInput variant="underline" :length="6" :grouping="[3, 3]" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Seamless [4, 4]</p>
          <OtpInput variant="seamless" :length="8" :grouping="[4, 4]" separator=" " />
        </div>
      </div>
    `,
  }),
}

export const Alphanumeric: Story = {
  name: 'Alphanumérique',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <p style="margin: 0; font-size: 0.875rem; color: var(--su-text-secondary);">Accepte lettres et chiffres</p>
        <OtpInput inputType="alphanumeric" :length="6" :grouping="[3, 3]" />
      </div>
    `,
  }),
}

export const CustomValidation: Story = {
  name: 'Validation personnalisée',
  render: () => ({
    components: { OtpInput },
    setup() {
      // Accepte uniquement les caractères hexadécimaux
      const validateHex = (char: string) => /^[0-9a-fA-F]$/.test(char)
      return { validateHex }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <p style="margin: 0; font-size: 0.875rem; color: var(--su-text-secondary);">Hexadécimal uniquement (0-9, A-F)</p>
        <OtpInput :length="6" :validate="validateHex" inputType="alphanumeric" />
      </div>
    `,
  }),
}

export const Masked: Story = {
  name: 'Masqué',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <p style="margin: 0; font-size: 0.875rem; color: var(--su-text-secondary);">Les caractères sont masqués</p>
        <OtpInput :masked="true" :length="6" />
      </div>
    `,
  }),
}

export const States: Story = {
  name: 'États de validation',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-state-error);">Erreur</p>
          <OtpInput state="error" :length="6" modelValue="12" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-state-success);">Succès</p>
          <OtpInput state="success" :length="6" modelValue="482956" />
        </div>
        <div>
          <p style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--su-state-warning);">Avertissement</p>
          <OtpInput state="warning" :length="6" modelValue="482" />
        </div>
      </div>
    `,
  }),
}

export const AutoSubmit: Story = {
  name: 'Soumission automatique',
  render: () => ({
    components: { OtpInput, Badge },
    setup() {
      // ref importé en haut du fichier
      const submitted = ref(false)
      const code = ref('')
      const handleComplete = (value: string) => {
        submitted.value = true
        code.value = value
      }
      return { submitted, code, handleComplete }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <p style="margin: 0; font-size: 0.875rem; color: var(--su-text-secondary);">Émet "complete" quand tous les champs sont remplis</p>
        <OtpInput :length="4" :autoSubmit="true" @complete="handleComplete" />
        <Badge v-if="submitted" variant="success">Code soumis : {{ code }}</Badge>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  name: 'Désactivé',
  args: {
    length: 6,
    disabled: true,
    modelValue: '482956',
  },
}

export const FourDigits: Story = {
  name: '4 digits (code SMS)',
  render: () => ({
    components: { OtpInput },
    template: `
      <OtpInput :length="4" placeholder="0" />
    `,
  }),
}

export const WithPlaceholder: Story = {
  name: 'Avec placeholder',
  render: () => ({
    components: { OtpInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
        <OtpInput :length="6" placeholder="0" />
        <OtpInput :length="6" placeholder="·" variant="underline" />
        <OtpInput :length="6" placeholder="—" variant="seamless" />
      </div>
    `,
  }),
}

export const WithFormField: Story = {
  name: 'Avec FormField (OtpInputField)',
  render: () => ({
    components: { OtpInputField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
        <OtpInputField
          label="Code de vérification"
          message="Entrez le code reçu par SMS"
          :length="6"
          :grouping="[3, 3]"
        />
        <OtpInputField
          label="Code de récupération"
          message="Code invalide. Veuillez réessayer."
          state="error"
          :length="8"
          :grouping="[4, 4]"
          size="sm"
          modelValue="A3B2"
        />
        <OtpInputField
          label="Vérification réussie"
          message="Code vérifié avec succès !"
          state="success"
          :length="6"
          modelValue="482956"
          :required="true"
        />
      </div>
    `,
  }),
}

export const VerificationForm: Story = {
  name: 'Formulaire de vérification',
  render: () => ({
    components: { OtpInputField, Button },
    setup() {
      // ref importé en haut du fichier
      const code = ref('')
      const state = ref('default')
      const message = ref('Un code à 6 chiffres a été envoyé au +33 6 •• •• 42')

      const handleComplete = (_value: string) => {
        state.value = 'success'
        message.value = 'Code vérifié avec succès !'
      }

      const handleVerify = () => {
        if (code.value.length < 6) {
          state.value = 'error'
          message.value = 'Veuillez saisir le code complet.'
        } else {
          handleComplete(code.value)
        }
      }

      const handleResend = () => {
        code.value = ''
        state.value = 'default'
        message.value = 'Un nouveau code a été envoyé.'
      }

      return { code, state, message, handleComplete, handleVerify, handleResend }
    },
    template: `
      <div style="max-width: 400px; padding: 2rem; border: 1px solid var(--su-border-default); border-radius: 0.75rem; background: var(--su-bg-surface);">
        <h3 style="margin: 0 0 0.25rem; color: var(--su-text-primary);">Vérification en deux étapes</h3>
        <p style="margin: 0 0 1.5rem; font-size: 0.875rem; color: var(--su-text-secondary);">Confirmez votre identité pour continuer.</p>

        <OtpInputField
          v-model="code"
          label="Code de vérification"
          :message="message"
          :state="state"
          :length="6"
          :grouping="[3, 3]"
          :autoSubmit="true"
          :required="true"
          @complete="handleComplete"
        />

        <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
          <Button variant="primary" size="sm" @click="handleVerify">Vérifier</Button>
          <Button variant="ghost" size="sm" @click="handleResend">Renvoyer le code</Button>
        </div>
      </div>
    `,
  }),
}
