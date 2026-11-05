import type { Meta, StoryObj } from '@storybook/vue3'
import Divider from '../Divider.vue'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Trait de séparation horizontal ou vertical (`role="separator"`). Avec un texte (« ou »), le texte reste lisible et les traits sont décoratifs ; `decorative` masque un trait purement visuel.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'], description: 'Orientation' },
    variant: { control: { type: 'select' }, options: ['solid', 'dashed'], description: 'Style du trait' },
    label: { control: 'text', description: 'Texte au milieu (horizontal seulement)' },
    labelAlign: { control: { type: 'select' }, options: ['start', 'center', 'end'], description: 'Position du texte' },
    spacing: { control: { type: 'select' }, options: ['none', 'sm', 'md', 'lg'], description: 'Espace autour du trait' },
    decorative: { control: 'boolean', description: 'Trait décoratif, masqué aux lecteurs d’écran' }
  },
  decorators: [() => ({ template: '<div style="width: 22rem;"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<p style="margin: 0">Au-dessus</p><Divider v-bind="args" /><p style="margin: 0">En dessous</p>'
  })
}

export const WithLabel: Story = {
  name: 'Avec texte',
  render: () => ({
    components: { Divider },
    template: `
      <Divider label="ou" />
      <Divider label="Aujourd'hui" label-align="start" />
      <Divider label="Fin de la liste" variant="dashed" label-align="end" />
    `
  })
}

export const Vertical: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="display: flex; align-items: center; height: 1.5rem; font-size: 14px;">
        <span>Profil</span>
        <Divider orientation="vertical" spacing="sm" />
        <span>Paramètres</span>
        <Divider orientation="vertical" spacing="sm" />
        <span>Déconnexion</span>
      </div>
    `
  })
}
