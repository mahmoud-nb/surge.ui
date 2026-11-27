import type { Meta, StoryObj } from '@storybook/vue3'
import Kbd from '../Kbd.vue'
import VisuallyHidden from '../VisuallyHidden.vue'

const meta: Meta<typeof Kbd> = {
  title: 'Atoms/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Touche ou raccourci clavier, rendu en `<kbd>` imbriqués (`<kbd><kbd>Ctrl</kbd>+<kbd>K</kbd></kbd>`). Une touche seule passe par le slot.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    keys: { control: 'object', description: 'Touches d’un raccourci' },
    separator: { control: 'text', description: 'Séparateur entre les touches' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' }
  },
  args: { keys: ['Ctrl', 'K'] }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleKey: Story = {
  name: 'Touche seule',
  render: () => ({
    components: { Kbd },
    template: '<div style="display: flex; gap: 0.5rem;"><Kbd>Échap</Kbd><Kbd>⌘</Kbd><Kbd>↵</Kbd></div>'
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Kbd },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Kbd size="sm" :keys="['Ctrl', 'S']" />
        <Kbd size="md" :keys="['Ctrl', 'S']" />
        <Kbd size="lg" :keys="['Ctrl', 'S']" />
      </div>
    `
  })
}

export const InText: Story = {
  name: 'Dans un texte',
  render: () => ({
    components: { Kbd, VisuallyHidden },
    template: `
      <p style="font-size: 14px; color: var(--su-text-secondary);">
        Appuyez sur <Kbd :keys="['Ctrl', 'K']" /> pour ouvrir la recherche<VisuallyHidden> (raccourci clavier)</VisuallyHidden>.
      </p>
    `
  })
}
