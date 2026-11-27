import type { Meta, StoryObj } from '@storybook/vue3'
import CopyButton from '../CopyButton.vue'

const meta: Meta<typeof CopyButton> = {
  title: 'Atoms/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Copie un texte dans le presse-papiers (`useClipboard`). Le nom du bouton reste stable ; le résultat est annoncé aux lecteurs d’écran (« Copié dans le presse-papiers », ou l’erreur) et le libellé visible passe à « Copié » pendant `timeout` ms.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Texte copié' },
    label: { control: 'text', description: 'Nom du bouton (défaut : « Copier »)' },
    copiedLabel: { control: 'text', description: 'Libellé après la copie (défaut : « Copié »)' },
    iconOnly: { control: 'boolean', description: 'Icône seule (le nom reste lu)' },
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'outline', 'ghost'], description: 'Variante du bouton' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    timeout: { control: 'number', description: 'Durée de l’état « copié » (ms)' },
    onCopy: { action: 'copy', description: 'Copie réussie' },
    onError: { action: 'error', description: 'Copie impossible' }
  },
  args: { value: 'npm install @surgeui/vue', variant: 'outline' }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const IconOnly: Story = {
  name: 'Icône seule',
  args: { iconOnly: true, label: 'Copier la commande', variant: 'ghost' }
}

export const Inline: Story = {
  name: 'À côté d’une valeur',
  render: () => ({
    components: { CopyButton },
    template: `
      <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.25rem 0.25rem 0.75rem; border: 1px solid var(--su-border-default); border-radius: var(--su-radius-control); font-family: ui-monospace, monospace; font-size: 0.875rem;">
        sk_live_51Hx…4f2a
        <CopyButton value="sk_live_51Hx4f2a" icon-only label="Copier la clé" />
      </div>
    `
  })
}
