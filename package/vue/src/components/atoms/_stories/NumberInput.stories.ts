import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NumberInput from '../NumberInput.vue'
import NumberInputField from '../../molecules/NumberInputField.vue'

const meta: Meta<typeof NumberInput> = {
  title: 'Atoms/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Champ numérique (`role="spinbutton"`) : saisie au format de la langue, validée à la sortie du champ (bornée, arrondie), affichage avec `formatOptions` (devise, unité). Flèches ± step, Page préc./suiv. ± largeStep, Début / Fin = min / max. Boutons − / + hors tabulation, maintien pour répéter.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number', description: 'Valeur (v-model), null si vide' },
    min: { control: 'number', description: 'Minimum' },
    max: { control: 'number', description: 'Maximum' },
    step: { control: 'number', description: 'Pas des flèches et des boutons' },
    largeStep: { control: 'number', description: 'Pas de Page préc. / suiv. (défaut : 10 × step)' },
    precision: { control: 'number', description: 'Décimales conservées' },
    formatOptions: { control: 'object', description: 'Options Intl.NumberFormat de l’affichage' },
    locale: { control: 'text', description: 'Langue du format (défaut : locale des composants)' },
    controls: { control: 'boolean', description: 'Boutons − / +' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    state: { control: { type: 'select' }, options: ['default', 'error', 'success', 'warning'], description: 'État de validation' },
    disabled: { control: 'boolean', description: 'Désactive le champ' },
    readonly: { control: 'boolean', description: 'Lecture seule' },
    placeholder: { control: 'text', description: 'Texte indicatif' },
    ariaLabel: { control: 'text', description: 'Nom accessible (sans label)' }
  },
  args: { min: 0, max: 99, step: 1, ariaLabel: 'Quantité' },
  decorators: [() => ({ template: '<div style="width: 12rem;"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof meta>

const withModel = (initial: number | null): Story['render'] => (args) => ({
  components: { NumberInput },
  setup() {
    const value = ref<number | null>(initial)
    return { args, value }
  },
  template: `
    <NumberInput v-bind="args" v-model="value" />
    <p style="margin: 0.5rem 0 0; font-size: 12px; color: var(--su-text-tertiary);">Valeur : {{ value === null ? 'vide' : value }}</p>
  `
})

export const Default: Story = { render: withModel(1) }

export const Currency: Story = {
  name: 'Devise',
  args: { min: 0, max: undefined, step: 0.5, formatOptions: { style: 'currency', currency: 'EUR' }, ariaLabel: 'Prix' },
  render: withModel(12.5)
}

export const Percent: Story = {
  name: 'Unité (kg)',
  args: { min: 0, max: 500, step: 0.1, formatOptions: { style: 'unit', unit: 'kilogram' }, ariaLabel: 'Poids' },
  render: withModel(72.4)
}

export const WithoutControls: Story = {
  name: 'Sans boutons',
  args: { controls: false, placeholder: 'Année', min: 1900, max: 2100, ariaLabel: 'Année' },
  render: withModel(null)
}

export const Sizes: Story = {
  render: () => ({
    components: { NumberInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <NumberInput size="sm" :model-value="1" aria-label="Petit" />
        <NumberInput size="md" :model-value="1" aria-label="Moyen" />
        <NumberInput size="lg" :model-value="1" aria-label="Grand" />
      </div>
    `
  })
}

export const Field: Story = {
  name: 'NumberInputField',
  render: () => ({
    components: { NumberInputField },
    setup: () => ({ guests: ref<number | null>(2) }),
    template: '<NumberInputField v-model="guests" label="Voyageurs" message="Entre 1 et 9 personnes" :min="1" :max="9" required />'
  })
}
