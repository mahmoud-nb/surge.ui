import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DatePicker from '../DatePicker.vue'
import FormField from '../../atoms/FormField.vue'

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Champ date : saisie au format de la langue (validée à la sortie du champ) et calendrier dans une boîte de dialogue (focus sur le jour actif, Tab piégé, Échap ferme, choisir un jour rend le focus au bouton). Alt + ↓ ouvre depuis le champ. Le bouton est nommé avec la date choisie. Le mois et l’année du titre du calendrier ouvrent le choix du mois et de l’année.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'date', description: 'Date (v-model), null si vide' },
    min: { control: 'date', description: 'Première date acceptée' },
    max: { control: 'date', description: 'Dernière date acceptée' },
    locale: { control: { type: 'select' }, options: [undefined, 'fr', 'en-US', 'en-GB', 'de'], description: 'Langue du format' },
    placeholder: { control: 'text', description: 'Défaut : format attendu' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    state: { control: { type: 'select' }, options: ['default', 'error', 'success', 'warning'], description: 'État de validation' },
    disabled: { control: 'boolean', description: 'Désactive le champ' },
    readonly: { control: 'boolean', description: 'Lecture seule (sans calendrier)' },
    ariaLabel: { control: 'text', description: 'Nom accessible (sans label)' }
  },
  args: { ariaLabel: 'Date' },
  decorators: [() => ({ template: '<div style="width: 16rem; min-height: 24rem;"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { args, date }
    },
    template: `
      <DatePicker v-bind="args" v-model="date" />
      <p style="margin: 0.5rem 0 0; font-size: 12px; color: var(--su-text-tertiary);">Valeur : {{ date ? date.toLocaleDateString('fr-FR') : 'vide' }}</p>
    `
  })
}

export const InFormField: Story = {
  name: 'Dans un FormField',
  render: () => ({
    components: { DatePicker, FormField },
    setup: () => ({ birth: ref<Date | null>(new Date(1990, 4, 17)), max: new Date() }),
    template: `
      <FormField label="Date de naissance" message="Format jj/mm/aaaa" required>
        <DatePicker v-model="birth" :max="max" />
      </FormField>
    `
  })
}

export const English: Story = {
  name: 'Anglais (US)',
  args: { locale: 'en-US', ariaLabel: 'Date' },
  render: Default.render
}
