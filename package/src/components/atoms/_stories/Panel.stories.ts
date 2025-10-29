import type { Meta, StoryFn } from '@storybook/vue3'
import Panel from '@/components/atoms/Panel.vue'
import Heading from '@/components/atoms/Heading.vue'

export default {
  title: 'Atoms/Panel',
  component: Panel,
  argTypes: {
    tag: {
      control: { type: 'select' },
      options: ['section', 'div', 'article'],
      description: 'Balise du conteneur principal',
      table: { defaultValue: { summary: 'section' } },
    },
    bordered: {
      control: 'boolean',
      description: 'Ajoute une bordure visible autour du panel',
      table: { defaultValue: { summary: false } },
    },
    elevated: {
      control: 'boolean',
      description: 'Ajoute une ombre portée au panel',
      table: { defaultValue: { summary: false } },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'subtle', 'highlight'],
      description: 'Style visuel du panel',
      table: { defaultValue: { summary: 'default' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Le composant `Panel` agit comme un conteneur structuré avec slots `head`, `default` et `footer`. Il prend en charge les variantes visuelles, les bordures, et le mode sombre.',
      },
    },
  },
} as Meta<typeof Panel>

const Template: StoryFn<typeof Panel> = (args) => ({
  components: { Panel, Heading },
  setup() {
    return { args }
  },
  template: `
    <Panel v-bind="args">
      <template #head>
        <Heading level="3">Entête du panel</Heading>
      </template>

      <p>Voici le contenu principal du panel. Il peut contenir tout type d’élément HTML ou de composant.</p>

      <template #footer>
        <small>Pied du panel</small>
      </template>
    </Panel>
  `,
})

export const Default = Template.bind({})
Default.args = {
  tag: 'section',
  bordered: false,
  elevated: false,
  variant: 'default',
}

export const Bordered = Template.bind({})
Bordered.args = {
  bordered: true,
}

export const Elevated = Template.bind({})
Elevated.args = {
  elevated: true,
}

export const Variants: StoryFn<typeof Panel> = () => ({
  components: { Panel, Heading },
  template: `
    <div style="display: grid; gap: 1rem;">
      <Panel variant="default"><Heading level="4">Default</Heading></Panel>
      <Panel variant="subtle"><Heading level="4">Subtle</Heading></Panel>
      <Panel variant="highlight"><Heading level="4">Highlight</Heading></Panel>
    </div>
  `,
})

export const WithHeadAndFooter: StoryFn<typeof Panel> = () => ({
  components: { Panel, Heading },
  template: `
    <Panel bordered elevated>
      <template #head>
        <Heading level="3">Titre du panel</Heading>
      </template>

      <p>Contenu principal du panel.</p>

      <template #footer>
        <button class="su-btn">Action</button>
      </template>
    </Panel>
  `,
})
