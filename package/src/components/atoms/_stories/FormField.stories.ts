import type { Meta, StoryObj } from '@storybook/vue3'
import FormField from '../FormField.vue'

const meta: Meta<typeof FormField> = {
  title: 'Atoms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Composant FormField — wrapper de base pour tous les éléments de formulaire. ' +
          'Fournit un label accessible, un indicateur de champ requis, ' +
          'un message d\'aide/erreur/succès et la gestion des états visuels. ' +
          'À utiliser via les composants "Field" (InputField, SelectBoxField…) ou directement avec un slot.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label affiché au-dessus du champ'
    },
    message: {
      control: 'text',
      description: 'Message d\'aide, d\'erreur ou de confirmation'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel du champ'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du label et du message'
    },
    required: {
      control: 'boolean',
      description: 'Affiche l\'indicateur de champ requis (*)'
    },
    disabled: {
      control: 'boolean',
      description: 'Style le label en état désactivé'
    },
    requiredText: {
      control: 'text',
      description: 'Texte ARIA pour l\'indicateur requis (i18n, défaut : « requis »)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Rendu avec un input natif pour illustrer la composition ───
const withInput = (args: Record<string, unknown>, inputAttrs = '') => ({
  components: { FormField },
  setup: () => ({ args }),
  template: `
    <div style="width: 320px;">
      <FormField v-bind="args">
        <template #default="{ fieldId, state }">
          <input
            :id="fieldId"
            ${inputAttrs}
            style="width:100%; box-sizing:border-box; padding:0.5rem 0.75rem; border:1px solid #d1d5db; border-radius:0.375rem; font-size:0.875rem;"
            :style="state === 'error' ? 'border-color:#ef4444' : state === 'success' ? 'border-color:#22c55e' : ''"
            placeholder="Entrez une valeur..."
          />
        </template>
      </FormField>
    </div>
  `
})

export const Default: Story = {
  args: { label: 'Nom', message: '' },
  render: (args) => withInput(args)
}

export const WithMessage: Story = {
  args: { label: 'Email', message: 'Entrez votre adresse email professionnelle.' },
  render: (args) => withInput(args)
}

export const Required: Story = {
  args: { label: 'Mot de passe', required: true, message: 'Minimum 8 caractères.' },
  render: (args) => withInput(args)
}

export const RequiredI18n: Story = {
  name: 'Required (EN)',
  args: { label: 'Password', required: true, requiredText: 'required', message: 'Minimum 8 characters.' },
  render: (args) => withInput(args)
}

export const States: Story = {
  render: () => ({
    components: { FormField },
    template: `
      <div style="display:flex; flex-direction:column; gap:1.25rem; width:320px;">
        <FormField label="Défaut" message="Message informatif.">
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.5rem 0.75rem;border:1px solid #d1d5db;border-radius:0.375rem;font-size:0.875rem;" placeholder="Valeur..." />
          </template>
        </FormField>
        <FormField state="error" label="Erreur" message="Ce champ est invalide.">
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.5rem 0.75rem;border:1px solid #ef4444;border-radius:0.375rem;font-size:0.875rem;" placeholder="Valeur..." />
          </template>
        </FormField>
        <FormField state="success" label="Succès" message="Valeur acceptée !">
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.5rem 0.75rem;border:1px solid #22c55e;border-radius:0.375rem;font-size:0.875rem;" placeholder="Valeur..." />
          </template>
        </FormField>
        <FormField state="warning" label="Avertissement" message="Valeur suspecte, vérifiez.">
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.5rem 0.75rem;border:1px solid #f59e0b;border-radius:0.375rem;font-size:0.875rem;" placeholder="Valeur..." />
          </template>
        </FormField>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { FormField },
    template: `
      <div style="display:flex; flex-direction:column; gap:1.25rem; width:320px;">
        <FormField size="sm" label="Small" message="Taille sm.">
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.375rem 0.625rem;border:1px solid #d1d5db;border-radius:0.375rem;font-size:0.75rem;" />
          </template>
        </FormField>
        <FormField size="md" label="Medium" message="Taille md (défaut).">
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.5rem 0.75rem;border:1px solid #d1d5db;border-radius:0.375rem;font-size:0.875rem;" />
          </template>
        </FormField>
        <FormField size="lg" label="Large" message="Taille lg.">
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.625rem 1rem;border:1px solid #d1d5db;border-radius:0.375rem;font-size:1rem;" />
          </template>
        </FormField>
      </div>
    `
  })
}

export const Disabled: Story = {
  args: { label: 'Champ désactivé', disabled: true, message: 'Ce champ est désactivé.' },
  render: (args) => ({
    components: { FormField },
    setup: () => ({ args }),
    template: `
      <div style="width:320px;">
        <FormField v-bind="args">
          <template #default="{ fieldId }">
            <input :id="fieldId" disabled style="width:100%;padding:0.5rem 0.75rem;border:1px solid #d1d5db;border-radius:0.375rem;font-size:0.875rem;opacity:0.5;cursor:not-allowed;" />
          </template>
        </FormField>
      </div>
    `
  })
}

export const CustomLabel: Story = {
  name: 'Slot label personnalisé',
  render: () => ({
    components: { FormField },
    template: `
      <div style="width:320px;">
        <FormField message="Cliquez sur l'icône pour en savoir plus.">
          <template #label="{ fieldId, required }">
            <label :for="fieldId" style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;font-weight:500;">
              Champ custom
              <span v-if="required" style="color:#ef4444;">*</span>
              <span title="Info" style="cursor:help;color:#6b7280;">ⓘ</span>
            </label>
          </template>
          <template #default="{ fieldId }">
            <input :id="fieldId" style="width:100%;padding:0.5rem 0.75rem;border:1px solid #d1d5db;border-radius:0.375rem;font-size:0.875rem;" placeholder="Valeur..." />
          </template>
        </FormField>
      </div>
    `
  })
}
