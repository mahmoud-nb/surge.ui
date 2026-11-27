import type { Meta, StoryObj } from '@storybook/vue3'
import ThemeToggle from '../ThemeToggle.vue'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mode clair / sombre de `useTheme` (état partagé par toute l’application, enregistré si `persist`). Variante `button` : bouton bascule « Mode sombre » (`aria-pressed`). Variante `segmented` : Clair, Sombre ou Système, dans un groupe nommé « Apparence ». La préférence n’est lue qu’après le montage (rendu serveur sans écart d’hydratation).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['button', 'segmented'], description: 'Bouton bascule, ou trois options' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille' },
    label: { control: 'text', description: 'Nom du bouton (« Mode sombre ») ou du groupe (« Apparence »)' },
    lightLabel: { control: 'text', description: 'Libellé de l’option claire (variante segmented)' },
    darkLabel: { control: 'text', description: 'Libellé de l’option sombre (variante segmented)' },
    systemLabel: { control: 'text', description: 'Libellé de l’option système (variante segmented)' },
    onChange: { action: 'change', description: 'Mode choisi' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Segmented: Story = {
  name: 'Clair, sombre ou système',
  args: { variant: 'segmented' }
}

export const Sizes: Story = {
  name: 'Tailles',
  render: () => ({
    components: { ThemeToggle },
    template: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <ThemeToggle variant="segmented" size="sm" />
        <ThemeToggle variant="segmented" />
        <ThemeToggle variant="segmented" size="lg" />
      </div>
    `
  })
}
