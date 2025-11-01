import type { Meta, StoryObj } from '@storybook/vue3'
import { HomeIcon, UserIcon, CogIcon, DocumentIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import LinkGroup from '../LinkGroup.vue'
import Link from '../../atoms/Link.vue'

const meta: Meta<typeof LinkGroup> = {
  title: 'Molecules/LinkGroup',
  component: LinkGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant LinkGroup pour organiser et aligner des liens avec un espacement contrôlé. Supporte la propagation des props size, variant et underline aux liens enfants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'none'],
      description: 'Espacement entre les liens'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille forcée pour tous les liens'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'muted'],
      description: 'Variante forcée pour tous les liens'
    },
    underline: {
      control: { type: 'select' },
      options: ['always', 'hover', 'never'],
      description: 'Soulignement forcé pour tous les liens'
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction du groupe'
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible pour le groupe'
    },
    role: {
      control: 'text',
      description: 'Rôle ARIA personnalisé'
    },
    separator: {
      control: { type: 'select' },
      options: ['none', 'dot', 'slash', 'pipe', 'arrow'],
      description: 'Séparateur entre les liens'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { LinkGroup, Link },
    setup() {
      return { args }
    },
    template: `
      <LinkGroup v-bind="args">
        <Link href="/home">Accueil</Link>
        <Link href="/about">À propos</Link>
        <Link href="/contact">Contact</Link>
      </LinkGroup>
    `
  })
}

export const WithGaps: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Gap Small</h4>
          <LinkGroup gap="sm">
            <Link href="/page1">Page 1</Link>
            <Link href="/page2">Page 2</Link>
            <Link href="/page3">Page 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Gap Medium (défaut)</h4>
          <LinkGroup gap="md">
            <Link href="/page1">Page 1</Link>
            <Link href="/page2">Page 2</Link>
            <Link href="/page3">Page 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Gap Large</h4>
          <LinkGroup gap="lg">
            <Link href="/page1">Page 1</Link>
            <Link href="/page2">Page 2</Link>
            <Link href="/page3">Page 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Gap None (connecté)</h4>
          <LinkGroup gap="none">
            <Link href="/first">Premier</Link>
            <Link href="/middle">Milieu</Link>
            <Link href="/last">Dernier</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const ConnectedLinks: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    setup() {
      return { HomeIcon, UserIcon, CogIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Navigation connectée</h4>
          <LinkGroup gap="none" variant="secondary">
            <Link href="/dashboard">Tableau de bord</Link>
            <Link href="/projects">Projets</Link>
            <Link href="/settings">Paramètres</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Breadcrumb connecté</h4>
          <LinkGroup gap="none" variant="muted" size="sm">
            <Link href="/">Accueil</Link>
            <Link href="/products">Produits</Link>
            <Link href="/products/laptops">Ordinateurs portables</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Avec icônes</h4>
          <LinkGroup gap="none" variant="primary" size="sm">
            <Link href="/home" :icon="HomeIcon" iconDisplay="only" aria-label="Accueil" />
            <Link href="/profile" :icon="UserIcon" iconDisplay="only" aria-label="Profil" />
            <Link href="/settings" :icon="CogIcon" iconDisplay="only" aria-label="Paramètres" />
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const ForcedSize: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Taille Small forcée</h4>
          <LinkGroup size="sm">
            <Link href="/link1">Petit lien 1</Link>
            <Link href="/link2">Petit lien 2</Link>
            <Link href="/link3">Petit lien 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Taille Medium forcée</h4>
          <LinkGroup size="md">
            <Link href="/link1">Lien moyen 1</Link>
            <Link href="/link2">Lien moyen 2</Link>
            <Link href="/link3">Lien moyen 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Taille Large forcée</h4>
          <LinkGroup size="lg">
            <Link href="/link1">Grand lien 1</Link>
            <Link href="/link2">Grand lien 2</Link>
            <Link href="/link3">Grand lien 3</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const ForcedVariant: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Variante Default forcée</h4>
          <LinkGroup variant="default">
            <Link href="/link1">Lien 1</Link>
            <Link href="/link2">Lien 2</Link>
            <Link href="/link3">Lien 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Variante Primary forcée</h4>
          <LinkGroup variant="primary">
            <Link href="/link1">Lien 1</Link>
            <Link href="/link2">Lien 2</Link>
            <Link href="/link3">Lien 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Variante Secondary forcée</h4>
          <LinkGroup variant="secondary">
            <Link href="/link1">Lien 1</Link>
            <Link href="/link2">Lien 2</Link>
            <Link href="/link3">Lien 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Variante Muted forcée</h4>
          <LinkGroup variant="muted">
            <Link href="/link1">Lien 1</Link>
            <Link href="/link2">Lien 2</Link>
            <Link href="/link3">Lien 3</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const ForcedUnderline: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Toujours souligné</h4>
          <LinkGroup underline="always">
            <Link href="/link1">Lien 1</Link>
            <Link href="/link2">Lien 2</Link>
            <Link href="/link3">Lien 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Souligné au survol</h4>
          <LinkGroup underline="hover">
            <Link href="/link1">Lien 1</Link>
            <Link href="/link2">Lien 2</Link>
            <Link href="/link3">Lien 3</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Jamais souligné</h4>
          <LinkGroup underline="never">
            <Link href="/link1">Lien 1</Link>
            <Link href="/link2">Lien 2</Link>
            <Link href="/link3">Lien 3</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const Vertical: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    template: `
      <div style="display: flex; gap: 4rem;">
        <div>
          <h4 style="margin-bottom: 1rem;">Navigation verticale</h4>
          <LinkGroup direction="vertical" variant="secondary">
            <Link href="/dashboard">Tableau de bord</Link>
            <Link href="/projects">Projets</Link>
            <Link href="/team">Équipe</Link>
            <Link href="/settings">Paramètres</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Menu connecté vertical</h4>
          <LinkGroup direction="vertical" gap="none" variant="primary">
            <Link block href="/overview">Vue d'ensemble</Link>
            <Link block href="/analytics">Analytics</Link>
            <Link block href="/reports">Rapports</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const CombinedProps: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    setup() {
      return { DocumentIcon, QuestionMarkCircleIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Small + Primary + Connected</h4>
          <LinkGroup gap="none" size="sm" variant="primary">
            <Link href="/guide">Guide</Link>
            <Link href="/api">API</Link>
            <Link href="/examples">Exemples</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Large + Secondary + Gap Medium</h4>
          <LinkGroup gap="md" size="lg" variant="secondary">
            <Link href="/docs" :icon="DocumentIcon" iconDisplay="left">Documentation</Link>
            <Link href="/help" :icon="QuestionMarkCircleIcon" iconDisplay="left">Aide</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const WithSeparators: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Séparateur point (•)</h4>
          <LinkGroup separator="dot" variant="muted">
            <Link href="/home">Accueil</Link>
            <Link href="/about">À propos</Link>
            <Link href="/contact">Contact</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Séparateur slash (/)</h4>
          <LinkGroup separator="slash" variant="secondary">
            <Link href="/">Accueil</Link>
            <Link href="/products">Produits</Link>
            <Link href="/products/laptops">Ordinateurs portables</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Séparateur pipe (|)</h4>
          <LinkGroup separator="pipe" variant="primary">
            <Link href="/privacy">Confidentialité</Link>
            <Link href="/terms">Conditions</Link>
            <Link href="/cookies">Cookies</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Séparateur flèche (→)</h4>
          <LinkGroup separator="arrow" variant="default">
            <Link href="/step1">Étape 1</Link>
            <Link href="/step2">Étape 2</Link>
            <Link href="/step3">Étape 3</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const NavigationExamples: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    setup() {
      return { HomeIcon, UserIcon, CogIcon, QuestionMarkCircleIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Navigation principale</h4>
          <LinkGroup gap="lg" variant="primary" role="navigation" aria-label="Navigation principale">
            <Link href="/" :icon="HomeIcon" iconDisplay="left">Accueil</Link>
            <Link href="/products">Produits</Link>
            <Link href="/about">À propos</Link>
            <Link href="/contact">Contact</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Breadcrumb</h4>
          <LinkGroup gap="sm" variant="muted" size="sm" role="navigation" aria-label="Fil d'ariane">
            <Link href="/">Accueil</Link>
            <Link href="/products">Produits</Link>
            <Link href="/products/laptops">Ordinateurs portables</Link>
            <span style="color: #6b7280;">MacBook Pro</span>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Footer links</h4>
          <LinkGroup gap="md" variant="secondary" underline="never">
            <Link href="/privacy">Confidentialité</Link>
            <Link href="/terms">Conditions</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="https://github.com" external>GitHub</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Toolbar de liens</h4>
          <LinkGroup gap="none" variant="secondary" size="sm" role="toolbar" aria-label="Actions rapides">
            <Link href="/profile" :icon="UserIcon" iconDisplay="only" aria-label="Profil" />
            <Link href="/settings" :icon="CogIcon" iconDisplay="only" aria-label="Paramètres" />
            <Link href="/help" :icon="QuestionMarkCircleIcon" iconDisplay="only" aria-label="Aide" />
          </LinkGroup>
        </div>
      </div>
    `
  })
}

export const WithAccessibility: Story = {
  render: () => ({
    components: { LinkGroup, Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Navigation avec rôle</h4>
          <LinkGroup 
            gap="md" 
            role="navigation" 
            aria-label="Navigation secondaire"
          >
            <Link href="/docs">Documentation</Link>
            <Link href="/tutorials">Tutoriels</Link>
            <Link href="/examples">Exemples</Link>
          </LinkGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Liens sociaux</h4>
          <LinkGroup 
            gap="sm" 
            variant="muted"
            role="group" 
            aria-label="Liens vers les réseaux sociaux"
          >
            <Link href="https://twitter.com" external aria-label="Twitter">Twitter</Link>
            <Link href="https://github.com" external aria-label="GitHub">GitHub</Link>
            <Link href="https://linkedin.com" external aria-label="LinkedIn">LinkedIn</Link>
          </LinkGroup>
        </div>
      </div>
    `
  })
}