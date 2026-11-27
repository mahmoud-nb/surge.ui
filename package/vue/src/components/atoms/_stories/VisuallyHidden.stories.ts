import type { Meta, StoryObj } from '@storybook/vue3'
import { TrashIcon } from '@heroicons/vue/24/outline'
import VisuallyHidden from '../VisuallyHidden.vue'

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Contenu lu par les lecteurs d’écran mais invisible à l’écran. Avec `focusable`, il réapparaît au focus : lien d’évitement (« Aller au contenu »).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text', description: 'Élément rendu (span par défaut)' },
    focusable: { control: 'boolean', description: 'Visible quand il a le focus' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const IconButton: Story = {
  name: 'Libellé d’un bouton icône',
  render: () => ({
    components: { VisuallyHidden, TrashIcon },
    template: `
      <button type="button" style="display: inline-flex; padding: 0.5rem; border: 1px solid var(--su-border-alpha); border-radius: 8px; background: none; color: inherit;">
        <TrashIcon style="width: 1rem; height: 1rem;" aria-hidden="true" />
        <VisuallyHidden>Supprimer le fichier</VisuallyHidden>
      </button>
    `
  })
}

export const SkipLink: Story = {
  name: 'Lien d’évitement (Tab pour l’afficher)',
  render: () => ({
    components: { VisuallyHidden },
    template: `
      <div>
        <VisuallyHidden as="a" href="#contenu" focusable style="padding: 0.5rem 0.75rem; border-radius: 8px; background: var(--su-bg-surface-elevated); box-shadow: var(--su-shadow-popover);">
          Aller au contenu principal
        </VisuallyHidden>
        <p id="contenu" style="font-size: 14px;">Contenu de la page.</p>
      </div>
    `
  })
}
