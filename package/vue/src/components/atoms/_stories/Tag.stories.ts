import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { HashtagIcon } from '@heroicons/vue/24/outline'
import Tag from '../Tag.vue'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Étiquette (filtre actif, mot-clé, valeur choisie) avec bouton de retrait optionnel, nommé « Retirer {libellé} ». Pour un simple indicateur de statut, voir Badge.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Libellé (ou slot par défaut)' },
    variant: { control: { type: 'select' }, options: ['default', 'primary', 'success', 'warning', 'error', 'info'], description: 'Variante' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    removable: { control: 'boolean', description: 'Bouton de retrait (événement remove)' },
    removeLabel: { control: 'text', description: 'Nom du bouton de retrait' },
    disabled: { control: 'boolean', description: 'Désactive l’étiquette' }
  },
  args: { label: 'Vue.js' }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        <Tag label="Neutre" />
        <Tag label="Primaire" variant="primary" />
        <Tag label="Validé" variant="success" />
        <Tag label="En attente" variant="warning" />
        <Tag label="Rejeté" variant="error" />
        <Tag label="Brouillon" variant="info" />
      </div>
    `
  })
}

export const Removable: Story = {
  name: 'Filtres retirables',
  render: () => ({
    components: { Tag },
    setup() {
      const filters = ref(['Paris', 'Moins de 500 €', 'Livraison gratuite'])
      return { filters, HashtagIcon }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; max-width: 24rem;">
        <Tag v-for="filter in filters" :key="filter" :label="filter" :icon="HashtagIcon" removable @remove="filters = filters.filter((f) => f !== filter)" />
        <span v-if="!filters.length" style="font-size: 14px; color: var(--su-text-tertiary);">Aucun filtre</span>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <Tag size="sm" label="Petit" removable />
        <Tag size="md" label="Moyen" removable />
        <Tag size="lg" label="Grand" removable />
      </div>
    `
  })
}
