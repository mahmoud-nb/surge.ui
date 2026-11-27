import type { Meta, StoryObj } from '@storybook/vue3'
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/vue/24/outline'
import Link from '../Link.vue'

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Link flexible pour les liens internes et externes avec support des icônes, variantes et accessibilité complète.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL de destination (liens externes)'
    },
    to: {
      control: 'text',
      description: 'Route de destination (Vue Router)'
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Cible du lien'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'muted'],
      description: 'Variante visuelle du lien'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du lien'
    },
    underline: {
      control: { type: 'select' },
      description: 'Comportement du soulignement'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le lien'
    },
    external: {
      control: 'boolean',
      description: 'Marque le lien comme externe'
    },
    icon: {
      control: false,
      description: 'Icône à afficher'
    },
    iconDisplay: {
      control: { type: 'select' },
      options: ['top', 'left', 'right', 'only'],
      description: 'Position de l\'icône'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Lien par défaut</Link>'
  })
}

export const External: Story = {
  args: {
    href: 'https://vuejs.org',
    external: true
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Site officiel Vue.js</Link>'
  })
}

export const WithIcon: Story = {
  args: {
    href: '/home',
    icon: HomeIcon,
    iconDisplay: 'left'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args, HomeIcon }
    },
    template: `<div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <h4>Liens avec icônes</h4>
      <Link v-bind="args" :icon="HomeIcon">Accueil</Link>

      <h4>Icône en haut</h4>
      <Link v-bind="args" :icon="HomeIcon" iconDisplay="top">Accueil</Link>

      <h4>Icône à droite</h4>
      <Link v-bind="args" :icon="HomeIcon" iconDisplay="right">Accueil</Link>
    </div>`
  })
}

export const IconOnly: Story = {
  args: {
    href: '/profile',
    icon: UserIcon,
    iconDisplay: 'only',
    ariaLabel: 'Profil utilisateur'
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args, UserIcon }
    },
    template: '<Link v-bind="args" :icon="UserIcon" />'
  })
}

export const linkBlock: Story = {
  args: {
    href: '#',
    variant: 'primary',
    icon: HomeIcon,
    external: false,
    block: true
  },
  render: (args) => ({
    components: { Link
     },
    setup() {
      return { args, HomeIcon, UserIcon }
    },
    template: `<div class="sb-flex-cols" style="width: 300px;">
      <Link v-bind="args" :icon="HomeIcon">Lien en bloc</Link>
      <Link v-bind="args" :icon="UserIcon" external>Lien externe en bloc</Link>
    </div>`
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <Link variant="default" href="#">Lien par défaut</Link>
        <Link variant="primary" href="#">Lien primaire</Link>
        <Link variant="secondary" href="#">Lien secondaire</Link>
        <Link variant="muted" href="#">Lien discret</Link>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Link size="sm" href="#">Small</Link>
        <Link size="md" href="#">Medium</Link>
        <Link size="lg" href="#">Large</Link>
      </div>
    `
  })
}

export const Underlines: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <Link underline="always" href="#">Toujours souligné</Link>
        <Link underline="hover" href="#">Souligné au survol</Link>
        <Link underline="never" href="#">Jamais souligné</Link>
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    href: '#',
    disabled: true
  },
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: '<Link v-bind="args">Lien désactivé</Link>'
  })
}

export const Navigation: Story = {
  render: () => ({
    components: { Link },
    setup() {
      return { HomeIcon, UserIcon, CogIcon }
    },
    template: `
    <div style="display: flex; flex-direction: column; gap: 4rem; align-items: center;">
      <nav style="display: flex; gap: 2rem;">
        <Link href="/" :icon="HomeIcon" iconDisplay="left">Accueil</Link>
        <Link href="/profile" :icon="UserIcon" iconDisplay="left">Profil</Link>
        <Link href="/settings" :icon="CogIcon" iconDisplay="left">Paramètres</Link>
      </nav>

      <nav style="display: flex; gap: 2rem;">
        <Link href="/" :icon="HomeIcon" iconDisplay="top">Accueil</Link>
        <Link href="/profile" :icon="UserIcon" iconDisplay="top">Profil</Link>
        <Link href="/settings" :icon="CogIcon" iconDisplay="top">Paramètres</Link>
      </nav>
    </div>
    `
  })
}

export const ExternalLinks: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <Link href="https://vuejs.org" external>Documentation Vue.js</Link>
        <Link href="https://github.com/vuejs/vue" external variant="secondary">Code source Vue</Link>
        <Link href="mailto:contact@example.com" external variant="muted">Nous contacter</Link>
      </div>
    `
  })
}

export const DefaultConfigurations: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Utilisation des valeurs par défaut</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Link variant="default" size="default" underline="default" href="#">Tout par défaut</Link>
            <Link size="default" underline="default" href="#">Variante explicite</Link>
            <Link variant="default" underline="default" href="#">Taille explicite</Link>
            <Link variant="default" size="default" href="#">Soulignement explicite</Link>
          </div>
        </div>
      </div>
    `
  })
}

export const GlobalConfiguration: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Configuration globale simulée</h4>
          <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">
            Ces liens utilisent les valeurs configurées globalement lors de l'installation
          </p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Link href="#">Lien avec config globale</Link>
            <Link variant="default" size="default" underline="default" href="#">Même chose explicitement</Link>
            <Link variant="primary" href="#">Variante surchargée</Link>
          </div>
        </div>
      </div>
    `
  })
}