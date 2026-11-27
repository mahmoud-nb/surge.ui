import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Stepper from '../Stepper.vue'
import Button from '../../atoms/Button.vue'

const steps = [
  { label: 'Panier', description: '3 articles' },
  { label: 'Livraison', description: 'Adresse et mode' },
  { label: 'Paiement', description: 'Carte ou virement' },
  { label: 'Confirmation' }
]

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progression d’un parcours en étapes : liste ordonnée nommée, étape courante en `aria-current="step"`, statut « terminée » / « à corriger » lu après le libellé. Avec `clickable`, les étapes franchies deviennent des boutons (toutes avec `linear: false`).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 0, max: 3 }, description: 'Étape courante (v-model, à partir de 0)' },
    steps: { control: 'object', description: 'Étapes : label, description, error, disabled, icon' },
    orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'], description: 'Orientation' },
    clickable: { control: 'boolean', description: 'Étapes franchies cliquables' },
    linear: { control: 'boolean', description: 'false : étapes suivantes aussi cliquables' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    ariaLabel: { control: 'text', description: 'Nom de la liste (défaut : « Étapes »)' }
  },
  args: { steps, modelValue: 1, clickable: true }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Stepper, Button },
    setup() {
      const current = ref(args.modelValue ?? 0)
      return { args, current }
    },
    template: `
      <Stepper v-bind="args" v-model="current" />
      <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
        <Button variant="outline" :disabled="current === 0" @click="current--">Précédent</Button>
        <Button :disabled="current === args.steps.length - 1" @click="current++">Suivant</Button>
      </div>
    `
  })
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    components: { Stepper, Button },
    setup() {
      const current = ref(1)
      return { args, current }
    },
    template: `
      <div style="max-width: 24rem;">
        <Stepper v-bind="args" v-model="current">
          <template #content="{ step }">
            <p style="margin: 0 0 0.75rem; font-size: 14px; color: var(--su-text-secondary);">Contenu de l’étape « {{ step.label }} ».</p>
            <Button size="sm" :disabled="current === args.steps.length - 1" @click="current++">Continuer</Button>
          </template>
        </Stepper>
      </div>
    `
  })
}

export const WithError: Story = {
  name: 'Étape en erreur',
  args: {
    modelValue: 2,
    steps: [steps[0], { ...steps[1], error: true, description: 'Code postal invalide' }, steps[2], steps[3]]
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Stepper },
    setup: () => ({ steps }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <Stepper :steps="steps" :model-value="1" size="sm" />
        <Stepper :steps="steps" :model-value="1" size="md" />
        <Stepper :steps="steps" :model-value="1" size="lg" />
      </div>
    `
  })
}
