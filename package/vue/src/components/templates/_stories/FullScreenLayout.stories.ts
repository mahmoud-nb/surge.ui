import type { Meta, StoryObj } from '@storybook/vue3'
import FullScreenLayout from '../FullScreenLayout.vue'

const meta: Meta<typeof FullScreenLayout> = {
  title: 'Templates/FullScreenLayout',
  component: FullScreenLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Récit en plein écran, une idée par écran. Chaque enfant direct du slot `default` (par exemple un `<section>`) occupe la hauteur de la zone et le défilement s\'aimante sur chacun. La zone se focalise au clavier pour défiler avec les flèches et Page suivante / précédente.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    snap: {
      control: { type: 'radio' },
      options: ['mandatory', 'proximity', 'none'],
      description: 'Aimantation : `mandatory` s\'arrête toujours sur un écran, `proximity` seulement à proximité',
      table: { defaultValue: { summary: 'proximity' } }
    },
    height: {
      control: 'text',
      description: 'Hauteur de la zone de défilement (un écran)',
      table: { defaultValue: { summary: '100svh' } }
    },
    label: {
      control: 'text',
      description: 'Nom accessible de la zone (la rend repérable comme région)'
    }
  },
  args: {
    snap: 'mandatory',
    height: '100svh',
    label: 'Présentation du produit'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Écrans successifs',
  render: (args) => ({
    components: { FullScreenLayout },
    setup: () => ({
      args,
      screens: [
        { title: 'Une idée par écran', tone: 'var(--su-bg-muted)' },
        { title: 'Le défilement s\'aimante', tone: 'color-mix(in srgb, var(--su-primary-default) 12%, transparent)' },
        { title: 'Au clavier aussi', tone: 'var(--su-bg-muted)' },
        { title: 'Dernier écran', tone: 'color-mix(in srgb, var(--su-primary-default) 20%, transparent)' }
      ]
    }),
    template: `
      <FullScreenLayout v-bind="args">
        <section
          v-for="(screen, i) in screens"
          :key="i"
          :style="{ display: 'grid', placeItems: 'center', padding: '2rem', background: screen.tone }"
        >
          <div style="text-align: center;">
            <p style="margin: 0 0 0.5rem; color: var(--su-text-secondary);">Écran {{ i + 1 }} / {{ screens.length }}</p>
            <h2 style="margin: 0; font-size: var(--su-font-size-3xl);">{{ screen.title }}</h2>
          </div>
        </section>
      </FullScreenLayout>
    `
  })
}
