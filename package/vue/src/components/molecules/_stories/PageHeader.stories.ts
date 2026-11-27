import type { Meta, StoryObj } from '@storybook/vue3'
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import PageHeader from '../PageHeader.vue'
import Button from '../../atoms/Button.vue'
import Badge from '../../atoms/Badge.vue'
import Tabs from '../../organisms/Tabs.vue'

const breadcrumb = [
  { label: 'Accueil', href: '#' },
  { label: 'Projets', href: '#' },
  { label: 'Refonte du site' }
]

const meta: Meta<typeof PageHeader> = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'En-tête d’une page d’application : fil d’Ariane ou lien de retour, titre (`h1` par défaut, `level`), description, pastilles (slot `meta`) et actions (slot `actions`). Les actions passent sous le titre quand la place manque. Le slot par défaut accueille des onglets ou des filtres sous l’en-tête.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Titre de la page' },
    description: { control: 'text', description: 'Description sous le titre' },
    breadcrumb: { control: 'object', description: 'Fil d’Ariane (éléments de SuBreadcrumb)' },
    back: { control: 'text', description: 'Lien de retour (chemin ou route)' },
    backLabel: { control: 'text', description: 'Texte du lien de retour (défaut : « Retour »)' },
    level: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6], description: 'Niveau du titre' }
  },
  args: {
    title: 'Refonte du site',
    description: 'Nouvelle charte, pages produit et tunnel de commande. Livraison prévue fin mars.',
    breadcrumb
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { PageHeader, Button, Badge },
    setup: () => ({ args, PlusIcon, ArrowDownTrayIcon }),
    template: `
      <PageHeader v-bind="args">
        <template #meta>
          <Badge variant="success" size="sm">En cours</Badge>
        </template>
        <template #actions>
          <Button variant="outline" :icon="ArrowDownTrayIcon">Exporter</Button>
          <Button :icon="PlusIcon">Nouvelle tâche</Button>
        </template>
      </PageHeader>
    `
  })
}

export const BackLink: Story = {
  name: 'Lien de retour',
  args: { breadcrumb: undefined, back: '#', title: 'Réglages du projet', description: undefined }
}

export const WithTabs: Story = {
  name: 'Avec des onglets',
  render: (args) => ({
    components: { PageHeader, Button, Tabs },
    setup: () => ({
      args,
      tabs: [{ label: 'Aperçu' }, { label: 'Tâches', badge: 12 }, { label: 'Fichiers' }, { label: 'Réglages' }]
    }),
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <Button variant="outline">Partager</Button>
        </template>
        <Tabs :tabs="tabs" aria-label="Sections du projet" />
      </PageHeader>
    `
  })
}

export const Narrow: Story = {
  name: 'Conteneur étroit',
  render: (args) => ({
    components: { PageHeader, Button },
    setup: () => ({ args, PlusIcon }),
    template: `
      <div style="max-inline-size: 22rem; padding: 1rem; border: 1px dashed var(--su-border-default); border-radius: var(--su-radius-control);">
        <PageHeader v-bind="args">
          <template #actions>
            <Button variant="outline">Exporter</Button>
            <Button :icon="PlusIcon">Nouvelle tâche</Button>
          </template>
        </PageHeader>
      </div>
    `
  })
}
