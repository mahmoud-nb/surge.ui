import type { Meta, StoryObj } from '@storybook/vue3'
import { HomeIcon } from '@heroicons/vue/24/outline'
import Breadcrumb from '../Breadcrumb.vue'

const items = [
  { label: 'Accueil', href: '#' },
  { label: 'Projets', href: '#' },
  { label: 'SurgeUI', href: '#' },
  { label: 'Composants', href: '#' },
  { label: 'Breadcrumb' }
]

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Fil d’Ariane : `<nav>` nommée, liste ordonnée, dernier élément en `aria-current="page"`, séparateurs masqués aux lecteurs d’écran. Un chemin long se replie (`maxItems`) derrière un bouton « … ». Slot `item` pour un rendu personnalisé (RouterLink).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Éléments : label, href, target, icon, iconOnly' },
    separator: { control: { type: 'select' }, options: ['chevron', 'slash', 'dot'], description: 'Séparateur' },
    maxItems: { control: { type: 'number', min: 2 }, description: 'Nombre d’éléments au-delà duquel le milieu se replie' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    ariaLabel: { control: 'text', description: 'Nom de la navigation (défaut : « Fil d’Ariane »)' },
    expandLabel: { control: 'text', description: 'Nom du bouton « … »' }
  },
  args: { items }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Separators: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ items }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Breadcrumb :items="items" separator="chevron" />
        <Breadcrumb :items="items" separator="slash" />
        <Breadcrumb :items="items" separator="dot" />
      </div>
    `
  })
}

export const Collapsed: Story = {
  name: 'Chemin replié',
  args: { maxItems: 3 }
}

export const WithIcon: Story = {
  name: 'Accueil en icône',
  args: {
    items: [{ label: 'Accueil', href: '#', icon: HomeIcon, iconOnly: true }, ...items.slice(1)]
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ items }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Breadcrumb :items="items" size="sm" />
        <Breadcrumb :items="items" size="md" />
        <Breadcrumb :items="items" size="lg" />
      </div>
    `
  })
}
