import type { Meta, StoryObj } from '@storybook/vue3'
import { PlusIcon, ArrowRightIcon, HeartIcon, TrashIcon } from '@heroicons/vue/24/outline'
import Button from '../Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant bouton flexible avec plusieurs variantes, tailles et états. Supporte les interactions au clavier et les états de chargement.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'default'],
      description: 'Variante visuelle du bouton'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'default'],
      description: 'Taille du bouton'
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full', 'default'],
      description: 'Rayon de bordure du bouton'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le bouton'
    },
    loading: {
      control: 'boolean',
      description: 'Affiche un spinner de chargement'
    },
    block: {
      control: 'boolean',
      description: 'Prend toute la largeur disponible'
    },
    icon: {
      control: false,
      description: 'Icône à afficher'
    },
    iconDisplay: {
      control: { type: 'select' },
      options: ['left', 'right', 'only'],
      description: 'Position de l\'icône'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Primary Button</Button>'
  })
}

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Secondary Button</Button>'
  })
}

export const Outline: Story = {
  args: {
    variant: 'outline'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Outline Button</Button>'
  })
}

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Ghost Button</Button>'
  })
}

export const Default: Story = {
  args: {
    variant: 'default'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Default Button</Button>'
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    `
  })
}

export const RadiusVariations: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <Button radius="none">None</Button>
          <Button radius="xs">xSmall</Button>
          <Button radius="sm">Small</Button>
          <Button radius="md">Medium</Button>
          <Button radius="lg">Large</Button>
          <Button radius="xl">Extra Large</Button>
          <Button radius="full">Full...</Button>
        </div>
      </div>
    `
  })
}

export const DefaultConfigurations: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Utilisation des valeurs par défaut</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Button variant="default" size="default" radius="default">Tout par défaut</Button>
            <Button size="default" radius="default">Variante explicite</Button>
            <Button variant="default" radius="default">Taille explicite</Button>
            <Button variant="default" size="default">Radius explicite</Button>
          </div>
        </div>
      </div>
    `
  })
}
export const WithIconBefore: Story = {
  args: {
    variant: 'primary',
    icon: PlusIcon,
    iconDisplay: 'left'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, PlusIcon }
    },
    template: '<Button v-bind="args" :icon="PlusIcon">Ajouter</Button>'
  })
}

export const WithIconAfter: Story = {
  args: {
    variant: 'secondary',
    icon: ArrowRightIcon,
    iconDisplay: 'right'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, ArrowRightIcon }
    },
    template: '<Button v-bind="args" :icon="ArrowRightIcon">Suivant</Button>'
  })
}

export const IconOnly: Story = {
  args: {
    variant: 'outline',
    icon: HeartIcon,
    iconDisplay: 'only',
    ariaLabel: 'Aimer'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, HeartIcon }
    },
    template: '<Button v-bind="args" :icon="HeartIcon" />'
  })
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Chargement...</Button>'
  })
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Disabled Button</Button>'
  })
}

export const Block: Story = {
  args: {
    variant: 'primary',
    block: true
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<div style="width: 320px;"><Button v-bind="args">Block Button</Button></div>'
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
        <div style="display: flex; gap: 1rem; align-items: center;">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
    `
  })
}