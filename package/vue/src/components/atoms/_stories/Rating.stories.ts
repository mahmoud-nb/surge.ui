import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Rating from '../Rating.vue'
import FormField from '../FormField.vue'

const meta: Meta<typeof Rating> = {
  title: 'Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Note en étoiles. Saisie : groupe de boutons radio natifs (flèches pour changer la note, envoi dans un formulaire avec `name`), chaque étoile nommée (« 3 étoiles sur 5 »), aperçu au survol, `clearable` pour revenir à zéro. Lecture seule : image nommée (« Note : 4,5 sur 5 ») avec étoiles partielles. Se lie à `SuFormField`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 0, max: 5, step: 0.5 }, description: 'Note (v-model)' },
    max: { control: { type: 'number', min: 1, max: 10 }, description: 'Nombre d’étoiles' },
    readonly: { control: 'boolean', description: 'Lecture seule (note décimale possible)' },
    clearable: { control: 'boolean', description: 'Choisir de nouveau la note la remet à zéro' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    disabled: { control: 'boolean', description: 'Désactivé' },
    name: { control: 'text', description: 'Nom des boutons radio (formulaire)' },
    ariaLabel: { control: 'text', description: 'Nom du groupe (défaut : « Note »)' },
    onChange: { action: 'change', description: 'Note choisie' }
  },
  args: { modelValue: 3 }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Rating },
    setup: () => ({ args, value: ref(args.modelValue ?? 0) }),
    template: `<div style="display: flex; align-items: center; gap: 0.75rem;"><Rating v-bind="args" v-model="value" /><span style="color: var(--su-text-secondary);">{{ value }} / {{ args.max ?? 5 }}</span></div>`
  })
}

export const ReadOnly: Story = {
  name: 'Lecture seule',
  args: { modelValue: 4.5, readonly: true }
}

export const Sizes: Story = {
  name: 'Tailles',
  render: () => ({
    components: { Rating },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <Rating :model-value="4" size="sm" readonly />
        <Rating :model-value="4" readonly />
        <Rating :model-value="4" size="lg" readonly />
      </div>
    `
  })
}

export const InFormField: Story = {
  name: 'Dans un FormField',
  render: () => ({
    components: { Rating, FormField },
    setup: () => ({ value: ref(0) }),
    template: `
      <FormField label="Votre avis sur la livraison" message="Facultatif" style="min-inline-size: 18rem;">
        <Rating v-model="value" clearable name="avis" />
      </FormField>
    `
  })
}
