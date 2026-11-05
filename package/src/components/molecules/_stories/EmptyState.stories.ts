import type { Meta, StoryObj } from '@storybook/vue3'
import { FolderPlusIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import EmptyState from '../EmptyState.vue'
import Button from '../../atoms/Button.vue'

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Zone vide : liste sans résultat, premier usage, erreur de chargement. Icône, vrai titre (h2 à h6, `headingLevel`), explication et actions (slot par défaut).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Titre (ou slot `title`)' },
    description: { control: 'text', description: 'Explication (ou slot `description`)' },
    headingLevel: { control: { type: 'select' }, options: [2, 3, 4, 5, 6], description: 'Niveau du titre' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    bordered: { control: 'boolean', description: 'Cadre en pointillés' }
  },
  args: {
    title: 'Aucun projet',
    description: 'Créez votre premier projet pour commencer à collaborer avec votre équipe.',
    bordered: true
  },
  decorators: [() => ({ template: '<div style="width: 30rem;"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { EmptyState, Button },
    setup: () => ({ args, FolderPlusIcon }),
    template: `
      <EmptyState v-bind="args" :icon="FolderPlusIcon">
        <Button>Nouveau projet</Button>
        <Button variant="outline">Importer</Button>
      </EmptyState>
    `
  })
}

export const NoResults: Story = {
  name: 'Aucun résultat',
  render: () => ({
    components: { EmptyState, Button },
    setup: () => ({ MagnifyingGlassIcon }),
    template: `
      <EmptyState :icon="MagnifyingGlassIcon" title="Aucun résultat pour « tableau »" description="Vérifiez l’orthographe ou essayez un terme plus général." size="sm">
        <Button variant="ghost">Effacer la recherche</Button>
      </EmptyState>
    `
  })
}

export const LoadError: Story = {
  name: 'Erreur de chargement',
  render: () => ({
    components: { EmptyState, Button },
    setup: () => ({ ExclamationTriangleIcon }),
    template: `
      <EmptyState :icon="ExclamationTriangleIcon" title="Impossible de charger les factures" description="Le service ne répond pas. Réessayez dans quelques instants." bordered>
        <Button variant="outline">Réessayer</Button>
      </EmptyState>
    `
  })
}
