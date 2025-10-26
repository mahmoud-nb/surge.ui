import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { UserIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
import RadioGroup from '../RadioGroup.vue'

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant RadioGroup pour la sélection unique avec deux styles d\'affichage : classique ou en cartes. Support complet de l\'accessibilité selon les normes W3C.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Liste des options radio'
    },
    value: {
      control: 'text',
      description: 'Valeur sélectionnée'
    },
    name: {
      control: 'text',
      description: 'Nom du groupe radio'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille des éléments'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive tout le groupe'
    },
    required: {
      control: 'boolean',
      description: 'Champ requis'
    },
    displayType: {
      control: { type: 'select' },
      options: ['default', 'inline-card', 'block-card'],
      description: 'Type d\'affichage'
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction du groupe'
    },
    maxHeight: {
      control: 'text',
      description: 'Hauteur maximale avec scroll automatique'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true }
]

const planOptions = [
  { 
    value: 'basic', 
    label: 'Plan Basic', 
    description: 'Fonctionnalités de base pour débuter'
  },
  { 
    value: 'pro', 
    label: 'Plan Pro', 
    description: 'Fonctionnalités avancées pour les professionnels'
  },
  { 
    value: 'enterprise', 
    label: 'Plan Enterprise', 
    description: 'Solution complète pour les grandes entreprises'
  }
]

const accountOptions = [
  { value: 'user', label: 'Particulier', icon: UserIcon },
  { value: 'business', label: 'Entreprise', icon: BuildingOfficeIcon },
  { value: 'organization', label: 'Organisation', icon: GlobeAltIcon }
]

const longCountriesList = [
  { value: 'country1', label: 'France' },
  { value: 'country2', label: 'Allemagne' },
  { value: 'country3', label: 'Espagne' },
  { value: 'country4', label: 'Italie' },
  { value: 'country5', label: 'Portugal' },
  { value: 'country6', label: 'Belgique' },
  { value: 'country7', label: 'Pays-Bas' },
  { value: 'country8', label: 'Suisse' },
  { value: 'country9', label: 'Autriche' },
  { value: 'country10', label: 'Luxembourg' },
  { value: 'country11', label: 'Danemark' },
  { value: 'country12', label: 'Suède' },
  { value: 'country13', label: 'Norvège' },
  { value: 'country14', label: 'Finlande' },
  { value: 'country15', label: 'Islande' }
]

export const Default: Story = {
  args: {
    options: basicOptions,
    label: 'Sélection unique',
    name: 'basic-radio'
  }
}

export const WithValue: Story = {
  args: {
    options: basicOptions,
    name: 'preselected-radio',
    modelValue: 'option2'
  }
}

export const BlockCard: Story = {
  args: {
    options: planOptions,
    displayType: 'block-card',
    name: 'plan-radio',
    modelValue: 'enterprise'
  }
}

export const InlineCard: Story = {
  args: {
    options: [
      { value: 'small', label: 'Small', description: 'Jusqu\'à 5 utilisateurs' },
      { value: 'medium', label: 'Medium', description: 'Jusqu\'à 25 utilisateurs' },
      { value: 'large', label: 'Large', description: 'Utilisateurs illimités' }
    ],
    displayType: 'inline-card',
    direction: 'horizontal',
    label: 'Taille d\'équipe',
    name: 'team-size-radio'
  }
}

export const WithIcons: Story = {
  args: {
    options: accountOptions,
    displayType: 'block-card',
    label: 'Type de compte',
    name: 'account-type-radio'
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      return { args, accountOptions }
    },
    template: '<RadioGroup v-bind="args" :options="accountOptions" />'
  })
}

export const ScrollableList: Story = {
  args: {
    options: longCountriesList,
    maxHeight: '180px',
    label: 'Pays (avec scroll)',
    name: 'countries-scroll',
    message: 'Liste avec hauteur limitée et scroll automatique'
  }
}

export const States: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      return { basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: row; gap: 4rem; width: 500px;">
        <RadioGroup 
          :options="basicOptions"
          name="default-state"
        />
        <RadioGroup 
          :options="basicOptions"
          state="error"
          name="error-state"
          :required="true"
        />
        <RadioGroup 
          :options="basicOptions"
          state="success"
          name="success-state"
          modelValue="option1"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      return { basicOptions }
    },
    template: `
      <div style="display: flex; flex-direction: row; gap: 4rem; width: 500px;">
        <RadioGroup size="sm" :options="basicOptions" label="Small" name="size-sm" />
        <RadioGroup size="md" :options="basicOptions" label="Medium" name="size-md" />
        <RadioGroup size="lg" :options="basicOptions" label="Large" name="size-lg" />
      </div>
    `
  })
}

export const Horizontal: Story = {
  args: {
    options: [
      { value: 'yes', label: 'Oui' },
      { value: 'no', label: 'Non' },
      { value: 'maybe', label: 'Peut-être' }
    ],
    direction: 'horizontal',
    label: 'Acceptez-vous les conditions ?',
    name: 'horizontal-radio'
  }
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    label: 'Groupe désactivé',
    name: 'disabled-radio',
    modelValue: 'option1'
  }
}

export const Required: Story = {
  args: {
    options: [
      { value: 'accept', label: 'J\'accepte les conditions' },
      { value: 'decline', label: 'Je refuse les conditions' }
    ],
    required: true,
    label: 'Conditions d\'utilisation',
    name: 'required-radio',
    message: 'Vous devez accepter ou refuser les conditions'
  }
}

export const WithSlots: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const plans = [
        { value: 'basic', label: 'Plan Basic', description: '9€/mois - Fonctionnalités de base' },
        { value: 'pro', label: 'Plan Pro', description: '19€/mois - Fonctionnalités avancées' },
        { value: 'enterprise', label: 'Plan Enterprise', description: '49€/mois - Solution complète' }
      ]
      const modelValue = ref('')
      
      return { plans, modelValue }
    },
    template: `
      <div style="width: 500px;">
        <RadioGroup 
          :options="plans"
          displayType="block-card"
          label="Choisissez votre plan"
          name="plan-with-slots"
          v-model="modelValue"
        >
          <template #before>
            <div style="padding: 0.75rem; background-color: #dbeafe; border-radius: 0.375rem; margin-bottom: 0.75rem;">
              <p style="margin: 0; font-size: 0.875rem; color: #1e40af;">
                🎯 Choisissez le plan qui correspond le mieux à vos besoins. Vous pourrez changer à tout moment.
              </p>
            </div>
          </template>
          <template #after>
            <div style="text-align: center; margin-top: 0.75rem;">
              <a href="#" style="font-size: 0.875rem; color: #3b82f6; text-decoration: underline;">
                Comparer tous les plans en détail →
              </a>
            </div>
          </template>
        </RadioGroup>
      </div>
    `
  })
}