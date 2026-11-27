import type { Meta, StoryObj } from '@storybook/vue3'
import Skeleton from '../Skeleton.vue'

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Silhouette d’un contenu en cours de chargement : texte (une ou plusieurs lignes), cercle ou rectangle. Décoratif (`aria-hidden`) : signaler le chargement avec `aria-busy="true"` sur le conteneur.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['text', 'circle', 'rect'], description: 'Forme' },
    width: { control: 'text', description: 'Largeur CSS ; diamètre pour `circle`' },
    height: { control: 'text', description: 'Hauteur CSS' },
    lines: { control: { type: 'number', min: 1, max: 10 }, description: 'Nombre de lignes (variante `text`)' },
    animated: { control: 'boolean', description: 'Pulsation (désactivée avec prefers-reduced-motion)' },
    radius: { control: { type: 'select' }, options: [undefined, 'none', 'sm', 'md', 'lg', 'xl', 'full'], description: 'Rayon de bordure' }
  },
  decorators: [() => ({ template: '<div style="width: 20rem;"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'text', lines: 3 }
}

export const Variants: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Skeleton variant="text" />
        <Skeleton variant="circle" width="3rem" />
        <Skeleton variant="rect" height="6rem" radius="lg" />
      </div>
    `
  })
}

export const CardPlaceholder: Story = {
  name: 'Carte en chargement',
  render: () => ({
    components: { Skeleton },
    template: `
      <div aria-busy="true" style="display: flex; gap: 0.75rem; padding: 1rem; border: 1px solid var(--su-border-alpha); border-radius: var(--su-radius-container);">
        <Skeleton variant="circle" width="2.5rem" />
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
          <Skeleton width="40%" />
          <Skeleton :lines="2" />
        </div>
      </div>
    `
  })
}

export const Static: Story = {
  name: 'Sans animation',
  args: { lines: 2, animated: false }
}
