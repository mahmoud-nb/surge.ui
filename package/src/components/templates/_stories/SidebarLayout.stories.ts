import type { Meta, StoryObj } from '@storybook/vue3'
import SidebarLayout from '../SidebarLayout.vue'
import { DemoBox, paragraphs } from './layoutDemo'

const meta: Meta<typeof SidebarLayout> = {
  title: 'Templates/SidebarLayout',
  component: SidebarLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Deux colonnes : barre latérale de largeur fixe + contenu fluide (documentation, tableaux de bord, administration). Slots `sidebar` et `default`. Mobile first : les zones sont empilées dans l\'ordre du DOM, puis côte à côte dès que le **conteneur** atteint `breakpoint`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    sidebarPosition: {
      control: { type: 'radio' },
      options: ['start', 'end'],
      description: 'Côté de la barre latérale (l\'ordre du DOM suit l\'ordre visuel)',
      table: { defaultValue: { summary: 'start' } }
    },
    sidebarWidth: {
      control: 'text',
      description: 'Largeur de la barre latérale en colonnes (longueur CSS)',
      table: { defaultValue: { summary: '16rem' } }
    },
    breakpoint: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Largeur de conteneur à partir de laquelle les colonnes apparaissent',
      table: { defaultValue: { summary: 'md' } }
    },
    stickySidebar: {
      control: 'boolean',
      description: 'Barre latérale collante (en colonnes)',
      table: { defaultValue: { summary: 'false' } }
    },
    stickyOffset: {
      control: 'text',
      description: 'Distance au haut de l\'écran de la barre collante',
      table: { defaultValue: { summary: '0px' } }
    },
    sidebarTag: {
      control: { type: 'select' },
      options: ['aside', 'nav', 'div'],
      description: 'Élément de la barre latérale',
      table: { defaultValue: { summary: 'aside' } }
    },
    sidebarLabel: {
      control: 'text',
      description: 'Nom accessible de la barre latérale'
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre les colonnes',
      table: { defaultValue: { summary: 'lg' } }
    }
  },
  args: {
    sidebarPosition: 'start',
    sidebarWidth: '16rem',
    breakpoint: 'md',
    stickySidebar: false,
    stickyOffset: '0px',
    sidebarTag: 'nav',
    sidebarLabel: 'Documentation',
    gap: 'lg'
  }
}

export default meta
type Story = StoryObj<typeof meta>

const render: Story['render'] = (args) => ({
  components: { SidebarLayout, DemoBox },
  setup: () => ({ args, paragraphs: paragraphs(8) }),
  template: `
    <SidebarLayout v-bind="args" style="padding: 1.5rem;">
      <template #sidebar>
        <DemoBox label="Barre latérale (navigation, filtres…)" height="240px" />
      </template>

      <h1 style="margin: 0 0 1rem; font-size: var(--su-font-size-2xl);">Contenu principal</h1>
      <DemoBox label="Contenu" height="160px" tone="accent" />
      <p v-for="(text, i) in paragraphs" :key="i" style="line-height: 1.7;">{{ text }}</p>
    </SidebarLayout>
  `
})

export const Default: Story = {
  name: 'Barre à gauche',
  render
}

export const SidebarEnd: Story = {
  name: 'Barre à droite',
  args: { sidebarPosition: 'end', sidebarTag: 'aside', sidebarLabel: 'Sur cette page' },
  render
}

export const Sticky: Story = {
  name: 'Barre collante',
  args: { stickySidebar: true, stickyOffset: '1.5rem' },
  render
}
