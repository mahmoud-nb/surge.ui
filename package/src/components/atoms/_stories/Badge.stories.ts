import type { Meta, StoryObj } from '@storybook/vue3'
import { CheckIcon, XMarkIcon, StarIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import Badge from '../Badge.vue'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Badge moderne et minimaliste pour afficher des informations courtes, des statuts ou des notifications. Support des icônes, variantes et accessibilité complète.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'dot'],
      description: 'Variante visuelle du badge'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du badge'
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Rayon de bordure du badge'
    },
    icon: {
      control: false,
      description: 'Icône à afficher'
    },
    iconDisplay: {
      control: { type: 'select' },
      options: ['left', 'right', 'only'],
      description: 'Position de l\'icône'
    },
    dotText: {
      control: 'text',
      description: 'Texte affiché à côté du dot (variante dot uniquement)'
    },
    color: {
      control: 'color',
      description: 'Couleur personnalisée du texte'
    },
    backgroundColor: {
      control: 'color',
      description: 'Couleur personnalisée de l\'arrière-plan'
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Badge par défaut</Badge>'
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    `
  })
}

export const Radius: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Badge radius="none">None</Badge>
        <Badge radius="sm">Small</Badge>
        <Badge radius="md">Medium</Badge>
        <Badge radius="lg">Large</Badge>
        <Badge radius="xl">Extra Large</Badge>
        <Badge radius="full">Full</Badge>
      </div>
    `
  })
}

export const WithIcons: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      return { CheckIcon, XMarkIcon, StarIcon, ExclamationTriangleIcon, InformationCircleIcon }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Badge variant="success" :icon="CheckIcon" iconDisplay="left">Validé</Badge>
        <Badge variant="error" :icon="XMarkIcon" iconDisplay="left">Erreur</Badge>
        <Badge variant="warning" :icon="ExclamationTriangleIcon" iconDisplay="left">Attention</Badge>
        <Badge variant="primary" :icon="StarIcon" iconDisplay="right">Premium</Badge>
        <Badge variant="default" :icon="InformationCircleIcon" iconDisplay="left">Info</Badge>
      </div>
    `
  })
}

export const IconOnly: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      return { CheckIcon, XMarkIcon, StarIcon, ExclamationTriangleIcon }
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Badge variant="success" :icon="CheckIcon" iconDisplay="only" aria-label="Validé" />
        <Badge variant="error" :icon="XMarkIcon" iconDisplay="only" aria-label="Erreur" />
        <Badge variant="warning" :icon="ExclamationTriangleIcon" iconDisplay="only" aria-label="Attention" />
        <Badge variant="primary" :icon="StarIcon" iconDisplay="only" aria-label="Premium" />
      </div>
    `
  })
}

export const DotVariant: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Dots simples</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Badge variant="dot" />
            <Badge variant="dot" size="sm" />
            <Badge variant="dot" size="lg" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Dots avec couleurs</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Badge variant="dot" backgroundColor="#10b981" />
            <Badge variant="dot" backgroundColor="#f59e0b" />
            <Badge variant="dot" backgroundColor="#ef4444" />
            <Badge variant="dot" backgroundColor="#3b82f6" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Dots avec texte</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start;">
            <Badge variant="dot" dotText="En ligne" backgroundColor="#10b981" />
            <Badge variant="dot" dotText="Absent" backgroundColor="#f59e0b" />
            <Badge variant="dot" dotText="Occupé" backgroundColor="#ef4444" />
            <Badge variant="dot" dotText="Hors ligne" backgroundColor="#6b7280" />
          </div>
        </div>
      </div>
    `
  })
}

export const CustomColors: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <Badge v-bind="args" backgroundColor="#8b5cf6" color="white">Violet</Badge>
        <Badge v-bind="args" backgroundColor="#ec4899" color="white">Rose</Badge>
        <Badge v-bind="args" backgroundColor="#06b6d4" color="white">Cyan</Badge>
        <Badge v-bind="args" backgroundColor="#84cc16" color="white">Lime</Badge>
        <Badge v-bind="args" backgroundColor="#f97316" color="white">Orange</Badge>
      </div>
    `
  })
}

export const StatusBadges: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      return { CheckIcon, ExclamationTriangleIcon, XMarkIcon, InformationCircleIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">États de commande</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Badge variant="success" :icon="CheckIcon" iconDisplay="left">Livré</Badge>
            <Badge variant="warning" :icon="ExclamationTriangleIcon" iconDisplay="left">En cours</Badge>
            <Badge variant="error" :icon="XMarkIcon" iconDisplay="left">Annulé</Badge>
            <Badge variant="default" :icon="InformationCircleIcon" iconDisplay="left">En attente</Badge>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Niveaux d'utilisateur</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Badge variant="default" radius="full">Débutant</Badge>
            <Badge variant="primary" radius="full">Intermédiaire</Badge>
            <Badge variant="warning" radius="full">Avancé</Badge>
            <Badge variant="error" radius="full">Expert</Badge>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Notifications</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Badge variant="error" radius="full" size="sm">3</Badge>
            <Badge variant="warning" radius="full" size="sm">12</Badge>
            <Badge variant="success" radius="full" size="sm">99+</Badge>
          </div>
        </div>
      </div>
    `
  })
}

export const InContext: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      return { StarIcon, CheckIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 100%; width: 500px;">
        <div>
          <h4 style="margin-bottom: 1rem;">Dans une liste</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
              <span>Tâche importante</span>
              <Badge variant="error" size="sm">Urgent</Badge>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
              <span>Projet en cours</span>
              <Badge variant="warning" size="sm">En cours</Badge>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
              <span>Tâche terminée</span>
              <Badge variant="success" size="sm" :icon="CheckIcon" iconDisplay="left">Terminé</Badge>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Avec des utilisateurs</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 2rem; height: 2rem; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem;">
                  JD
                </div>
                <span>John Doe</span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <Badge variant="dot" dotText="En ligne" backgroundColor="#10b981" />
                <Badge variant="primary" size="sm" :icon="StarIcon" iconDisplay="only" aria-label="Utilisateur premium" />
              </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 2rem; height: 2rem; background-color: #ec4899; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem;">
                  MD
                </div>
                <span>Marie Dupont</span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <Badge variant="dot" dotText="Absent" backgroundColor="#f59e0b" />
                <Badge variant="secondary" size="sm">Admin</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
}

export const ProductLabels: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; max-width: 800px;">
        <div style="padding: 1.5rem; background-color: white; border-radius: 0.75rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">MacBook Pro</h3>
            <Badge variant="success" size="sm" radius="full">En stock</Badge>
          </div>
          <p style="margin: 0 0 1rem 0; color: #6b7280; font-size: 0.875rem;">
            Ordinateur portable haute performance
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <Badge variant="primary" size="sm" radius="full">Nouveau</Badge>
            <Badge variant="warning" size="sm" radius="full">Promo</Badge>
            <Badge variant="default" size="sm" radius="full">13"</Badge>
          </div>
        </div>
        
        <div style="padding: 1.5rem; background-color: white; border-radius: 0.75rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">iPhone 15</h3>
            <Badge variant="error" size="sm" radius="full">Rupture</Badge>
          </div>
          <p style="margin: 0 0 1rem 0; color: #6b7280; font-size: 0.875rem;">
            Smartphone dernière génération
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <Badge variant="secondary" size="sm" radius="full">128GB</Badge>
            <Badge variant="default" size="sm" radius="full">Bleu</Badge>
          </div>
        </div>
      </div>
    `
  })
}

export const NotificationBadges: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Compteurs de notifications</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <Badge variant="error" radius="full" size="sm">3</Badge>
            <Badge variant="error" radius="full" size="sm">12</Badge>
            <Badge variant="error" radius="full" size="sm">99+</Badge>
            <Badge variant="error" radius="full" size="sm">999+</Badge>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Dans des boutons</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <div style="position: relative; display: inline-block;">
              <button style="padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
                Messages
              </button>
              <Badge 
                variant="error" 
                radius="full" 
                size="sm" 
                style="position: absolute; top: -0.375rem; right: -0.375rem;"
              >
                5
              </Badge>
            </div>
            
            <div style="position: relative; display: inline-block;">
              <button style="padding: 0.5rem 1rem; background-color: #6b7280; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
                Notifications
              </button>
              <Badge 
                variant="warning" 
                radius="full" 
                size="sm" 
                style="position: absolute; top: -0.375rem; right: -0.375rem;"
              >
                2
              </Badge>
            </div>
          </div>
        </div>
      </div>
    `
  })
}

export const StatusIndicators: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">États de connexion</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start;">
            <Badge variant="dot" dotText="En ligne" backgroundColor="#10b981" />
            <Badge variant="dot" dotText="Absent" backgroundColor="#f59e0b" />
            <Badge variant="dot" dotText="Occupé" backgroundColor="#ef4444" />
            <Badge variant="dot" dotText="Hors ligne" backgroundColor="#6b7280" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">États de service</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start;">
            <Badge variant="dot" dotText="Opérationnel" backgroundColor="#10b981" />
            <Badge variant="dot" dotText="Dégradé" backgroundColor="#f59e0b" />
            <Badge variant="dot" dotText="Panne" backgroundColor="#ef4444" />
            <Badge variant="dot" dotText="Maintenance" backgroundColor="#3b82f6" />
          </div>
        </div>
      </div>
    `
  })
}

export const Interactive: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      const handleBadgeClick = (type) => {
        alert(`Badge ${type} cliqué!`)
      }
      
      return { handleBadgeClick, StarIcon, CheckIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Badges cliquables</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <button 
              @click="handleBadgeClick('premium')"
              style="background: none; border: none; padding: 0; cursor: pointer;"
            >
              <Badge variant="primary" :icon="StarIcon" iconDisplay="left" radius="full">
                Premium
              </Badge>
            </button>
            
            <button 
              @click="handleBadgeClick('verified')"
              style="background: none; border: none; padding: 0; cursor: pointer;"
            >
              <Badge variant="success" :icon="CheckIcon" iconDisplay="left" radius="full">
                Vérifié
              </Badge>
            </button>
          </div>
          <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
            Cliquez sur les badges pour voir l'interaction
          </p>
        </div>
      </div>`
  })
}

export const AllSizesAndVariants: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args, CheckIcon, XMarkIcon, ExclamationTriangleIcon, StarIcon, InformationCircleIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h4 style="margin-bottom: 0.75rem;">Small</h4>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <Badge v-bind="args" variant="default" size="sm">Default</Badge>
            <Badge v-bind="args" variant="primary" size="sm">Primary</Badge>
            <Badge v-bind="args" variant="secondary" size="sm">Secondary</Badge>
            <Badge v-bind="args" variant="success" size="sm">Success</Badge>
            <Badge v-bind="args" variant="warning" size="sm">Warning</Badge>
            <Badge v-bind="args" variant="error" size="sm">Error</Badge>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.75rem;">Small with icons</h4>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <Badge v-bind="args" variant="default" size="sm" :icon="InformationCircleIcon" iconDisplay="right">Info</Badge>
            <Badge v-bind="args" variant="primary" size="sm" :icon="StarIcon" iconDisplay="right">Premium</Badge>
            <Badge v-bind="args" variant="success" size="sm" :icon="CheckIcon" iconDisplay="left">Validé</Badge>
            <Badge v-bind="args" variant="warning" size="sm" :icon="ExclamationTriangleIcon" iconDisplay="left">Attention</Badge>
            <Badge v-bind="args" variant="error" size="sm" :icon="XMarkIcon" iconDisplay="left">Erreur</Badge>

            <Badge v-bind="args" variant="default" size="sm" :icon="InformationCircleIcon" iconDisplay="only">Info</Badge>
            <Badge v-bind="args" variant="primary" size="sm" :icon="StarIcon" iconDisplay="only">Premium</Badge>
            <Badge v-bind="args" variant="success" size="sm" :icon="CheckIcon" iconDisplay="only">Validé</Badge>
            <Badge v-bind="args" variant="warning" size="sm" :icon="ExclamationTriangleIcon" iconDisplay="only">Attention</Badge>
            <Badge v-bind="args" variant="error" size="sm" :icon="XMarkIcon" iconDisplay="only">Erreur</Badge>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.75rem;">Medium</h4>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <Badge v-bind="args" variant="default" size="md">Default</Badge>
            <Badge v-bind="args" variant="primary" size="md">Primary</Badge>
            <Badge v-bind="args" variant="secondary" size="md">Secondary</Badge>
            <Badge v-bind="args" variant="success" size="md">Success</Badge>
            <Badge v-bind="args" variant="warning" size="md">Warning</Badge>
            <Badge v-bind="args" variant="error" size="md">Error</Badge>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.75rem;">Small with icons</h4>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <Badge v-bind="args" variant="default" size="md" :icon="InformationCircleIcon" iconDisplay="right">Info</Badge>
            <Badge v-bind="args" variant="primary" size="md" :icon="StarIcon" iconDisplay="right">Premium</Badge>
            <Badge v-bind="args" variant="success" size="md" :icon="CheckIcon" iconDisplay="left">Validé</Badge>
            <Badge v-bind="args" variant="warning" size="md" :icon="ExclamationTriangleIcon" iconDisplay="left">Attention</Badge>
            <Badge v-bind="args" variant="error" size="md" :icon="XMarkIcon" iconDisplay="left">Erreur</Badge>

            <Badge v-bind="args" variant="default" size="md" :icon="InformationCircleIcon" iconDisplay="only">Info</Badge>
            <Badge v-bind="args" variant="primary" size="md" :icon="StarIcon" iconDisplay="only">Premium</Badge>
            <Badge v-bind="args" variant="success" size="md" :icon="CheckIcon" iconDisplay="only">Validé</Badge>
            <Badge v-bind="args" variant="warning" size="md" :icon="ExclamationTriangleIcon" iconDisplay="only">Attention</Badge>
            <Badge v-bind="args" variant="error" size="md" :icon="XMarkIcon" iconDisplay="only">Erreur</Badge>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.75rem;">Large</h4>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <Badge v-bind="args" variant="default" size="lg">Default</Badge>
            <Badge v-bind="args" variant="primary" size="lg">Primary</Badge>
            <Badge v-bind="args" variant="secondary" size="lg">Secondary</Badge>
            <Badge v-bind="args" variant="success" size="lg">Success</Badge>
            <Badge v-bind="args" variant="warning" size="lg">Warning</Badge>
            <Badge v-bind="args" variant="error" size="lg">Error</Badge>
          </div>
        </div>
      </div>

      <div>
          <h4 style="margin-bottom: 0.75rem;">Small with icons</h4>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <Badge v-bind="args" variant="default" size="lg" :icon="InformationCircleIcon" iconDisplay="right">Info</Badge>
            <Badge v-bind="args" variant="primary" size="lg" :icon="StarIcon" iconDisplay="right">Premium</Badge>
            <Badge v-bind="args" variant="success" size="lg" :icon="CheckIcon" iconDisplay="left">Validé</Badge>
            <Badge v-bind="args" variant="warning" size="lg" :icon="ExclamationTriangleIcon" iconDisplay="left">Attention</Badge>
            <Badge v-bind="args" variant="error" size="lg" :icon="XMarkIcon" iconDisplay="left">Erreur</Badge>

            <Badge v-bind="args" variant="default" size="lg" :icon="InformationCircleIcon" iconDisplay="only">Info</Badge>
            <Badge v-bind="args" variant="primary" size="lg" :icon="StarIcon" iconDisplay="only">Premium</Badge>
            <Badge v-bind="args" variant="success" size="lg" :icon="CheckIcon" iconDisplay="only">Validé</Badge>
            <Badge v-bind="args" variant="warning" size="lg" :icon="ExclamationTriangleIcon" iconDisplay="only">Attention</Badge>
            <Badge v-bind="args" variant="error" size="lg" :icon="XMarkIcon" iconDisplay="only">Erreur</Badge>
          </div>
        </div>
    `
  })
}
