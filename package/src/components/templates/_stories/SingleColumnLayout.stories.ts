import type { Meta, StoryObj } from '@storybook/vue3'
import SingleColumnLayout from '../SingleColumnLayout.vue'
import { DemoBox, paragraphs } from './layoutDemo'

const meta: Meta<typeof SingleColumnLayout> = {
  title: 'Templates/SingleColumnLayout',
  component: SingleColumnLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Une colonne centrée à la longueur de ligne confortable (articles, blogs, formulaires, pages mobiles). Slots `header`, `default` et `footer`. Mobile first : pleine largeur avec marge latérale, puis largeur maximale centrée.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'select' },
      options: ['prose', 'narrow', 'medium', 'wide', 'full'],
      description: 'Largeur maximale : prose ≈ 65 caractères, narrow 36rem, medium 48rem, wide 72rem, full sans limite',
      table: { defaultValue: { summary: 'prose' } }
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre en-tête, contenu et pied',
      table: { defaultValue: { summary: 'lg' } }
    },
    padded: {
      control: 'boolean',
      description: 'Marges latérales (16px, puis 24px dès un conteneur de 768px)',
      table: { defaultValue: { summary: 'true' } }
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'article', 'main', 'section'],
      description: 'Élément racine',
      table: { defaultValue: { summary: 'div' } }
    }
  },
  args: {
    width: 'prose',
    gap: 'lg',
    padded: true,
    as: 'article'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Article',
  render: (args) => ({
    components: { SingleColumnLayout, DemoBox },
    setup: () => ({ args, paragraphs: paragraphs(5) }),
    template: `
      <SingleColumnLayout v-bind="args" style="padding-block: 2rem;">
        <template #header>
          <h1 style="margin: 0; font-size: var(--su-font-size-3xl);">Titre de l'article</h1>
          <p style="margin: 0.5rem 0 0; color: var(--su-text-secondary);">Publié le 25 octobre · 4 min de lecture</p>
        </template>

        <DemoBox label="Image d'illustration" height="200px" tone="accent" />
        <p v-for="(text, i) in paragraphs" :key="i" style="line-height: 1.7;">{{ text }}</p>

        <template #footer>
          <DemoBox label="Auteur, partage, articles suivants" />
        </template>
      </SingleColumnLayout>
    `
  })
}

export const Widths: Story = {
  name: 'Largeurs',
  render: (args) => ({
    components: { SingleColumnLayout, DemoBox },
    setup: () => ({ args, widths: ['narrow', 'prose', 'medium', 'wide', 'full'] }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; padding-block: 2rem;">
        <SingleColumnLayout v-for="width in widths" :key="width" v-bind="args" as="div" :width="width">
          <DemoBox :label="width" />
        </SingleColumnLayout>
      </div>
    `
  })
}
