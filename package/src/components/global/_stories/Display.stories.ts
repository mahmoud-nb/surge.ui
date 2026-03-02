import type { Meta, StoryObj } from '@storybook/vue3'
import Display from '@/components/global/Display.vue'

const meta: Meta<typeof Display> = {
  title: 'Global/Display',
  component: Display,
  layout: 'fullscreen',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Composant Display

Le composant **Display** est une démonstration complète des composants d'affichage disponibles dans la bibliothèque. Il inclut:

## Composants inclus

- **Heading** — Titres stylisés avec niveaux et variantes (h1–h6)
- **Panel** — Conteneurs structurés avec slots head, contenu et footer
- **Image** — Images responsives avec ratios d'aspect et lazy loading
- **Avatar** — Photos de profil ou initiales avec badges et statuts
- **AvatarGroup** — Groupes d'avatars avec gestion du surplus
- **Badge** — Badges pour afficher des informations courtes ou des statuts
- **Dialog** — Modales et tiroirs (drawers) accessibles
- **Alert** — Messages d'alerte avec types (success, warning, error, info)
- **Tabs** — Onglets pour organiser le contenu en sections
- **Accordion** — Sections dépliables pour le contenu accordéon
- **Progress** — Barres de progression avec états
- **Spinner** — Indicateurs de chargement avec plusieurs styles

## Caractéristiques principales

- Tous les composants sont responsifs
- Support complet de l'accessibilité (WCAG AA)
- Support du mode sombre et RTL
- Configurations exhaustives et exemples d'utilisation
- Intégration avec le Grid pour une mise en page cohérente

## Utilisation

Ce composant est principalement destiné à la démonstration et aux tests. Vous pouvez l'utiliser comme:
- **Référence visuelle** pour explorer les composants disponibles
- **Documentation interactive** dans Storybook
- **Base pour créer** des exemples personnalisés
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Display>

export const Default: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  })
}

export const HeadingsSection: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Explorez les différents niveaux de titres (h1–h6) et variantes de couleurs. Les titres sont essentiels pour la structure sémantique et la hiérarchie visuelle.'
      }
    }
  }
}

export const MediaComponents: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Découvrez comment utiliser les Images, Avatars et AvatarGroups pour afficher des contenus médias et des identités utilisateur.'
      }
    }
  }
}

export const ContainerComponents: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Explorez les Panels comme conteneurs pour organiser le contenu avec en-têtes, contenu principal et pieds de page.'
      }
    }
  }
}

export const BadgesAndIndicators: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Utilisez les Badges pour afficher des statuts, des étiquettes, des notifications ou d\'autres informations courtes.'
      }
    }
  }
}

export const Notifications: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Les Alerts permettent de communiquer des messages importants à l\'utilisateur avec différents types (success, warning, error, info).'
      }
    }
  }
}

export const LoadingStates: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Les Progress bars et Spinners affichent les états de chargement et les opérations en cours avec différents styles et configurations.'
      }
    }
  }
}

export const ContentOrganization: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Les Tabs et Accordions permettent d\'organiser le contenu de manière compacte et accessible, idéal pour de grandes quantités d\'informations.'
      }
    }
  }
}

export const ModalInteractions: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Les Dialogs fournissent des modales centrées ou des tiroirs latéraux (drawers) pour afficher du contenu ou demander une confirmation de l\'utilisateur.'
      }
    }
  }
}

export const AllComponents: Story = {
  render: () => ({
    components: { Display },
    template: '<Display />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Vue complète de tous les composants Display disponibles dans la bibliothèque, organisés par catégorie et avec des exemples pratiques.'
      }
    }
  }
}
