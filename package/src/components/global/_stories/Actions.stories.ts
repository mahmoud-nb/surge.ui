import type { Meta, StoryObj } from '@storybook/vue3'
import Actions from '../Actions.vue'

const meta: Meta<typeof Actions> = {
  title: 'Global/Actions',
  component: Actions,
  layout: 'fullscreen',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Composant Actions

Le composant **Actions** démontre les **cas d'usage réels** et les **patterns pratiques** des composants d'action (Button, Link, ButtonGroup, LinkGroup, Dropdown, FloatButton) dans des scénarios courants.

## Cas d'usage inclus

### Interfaces utilisateur
- **Barre d'outils (Toolbar)** — Actions d'édition et de contrôle groupées
- **Menu utilisateur** — Navigation avec profil et paramètres
- **Menu de document** — Actions sur fichiers/documents
- **Actions de formulaire** — Boutons de confirmation et annulation
- **Actions de ligne** — Actions contextuelles sur des éléments de tableau

### Navigation et organisation
- **Navigation horizontale** — Liens de navigation avec séparateurs
- **Actions groupées** — Création, gestion, et autres catégories d'actions
- **Actions contextuelles** — Actions de sélection et de gestion

### Interactions
- **Boutons flottants** — FAB avec et sans notifications
- **Menus déroulants** — Options avec icônes et séparateurs

## Caractéristiques

- **Patterns réalistes** — Exemples issus d'applications réelles
- **Responsive** — Adaptés au mobile et desktop
- **Accessibilité** — ARIA labels et navigation au clavier
- **Iconographie** — Utilisation cohérente des icônes
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  })
}

export const ToolbarPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Barre d\'outils avec actions groupées et bien espacées. Idéal pour les éditeurs et les applications de productivité.'
      }
    }
  }
}

export const UserMenuPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Pattern courant pour les menus utilisateur avec profil, paramètres, et déconnexion via Dropdown.'
      }
    }
  }
}

export const FormActionsPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Actions de formulaire standard : boutons Envoyer/Annuler et actions destructives avec confirmation.'
      }
    }
  }
}

export const NavigationPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Navigation par liens avec différentes configurations : espacement, variantes, et séparateurs.'
      }
    }
  }
}

export const RowActionsPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Actions de ligne pour les tableaux : éditer, partager, et menu "plus d\'options" sur chaque ligne.'
      }
    }
  }
}

export const GroupedActionsPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Actions groupées par contexte : création, gestion, et autres catégories d\'actions.'
      }
    }
  }
}

export const ContextualActionsPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Barre d\'actions contextuelle qui apparaît lors de la sélection d\'éléments, avec options de gestion.'
      }
    }
  }
}

export const FloatingActionsPattern: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Boutons flottants (FAB) pour les actions primaires, avec et sans badges de notification.'
      }
    }
  }
}

export const RealWorldScenarios: Story = {
  render: () => ({
    components: { Actions },
    template: '<Actions />'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Scénarios réels montrant tous les patterns d\'actions utilisés ensemble dans une application complète.'
      }
    }
  }
}
