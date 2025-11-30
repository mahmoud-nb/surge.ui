import type { Meta, StoryObj } from '@storybook/vue3'
import Icon from '../Icon.vue'

/**
 * Composant Icon avec import dynamique des Heroicons
 * 
 * Ce composant charge les icônes à la demande pour optimiser les performances.
 * Supporte les variantes solid et outline avec une excellente accessibilité.
 */
const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Nom de l\'icône Heroicons (sans le suffixe "Icon")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Variante de l\'icône',
      table: {
        type: { summary: 'solid | outline' },
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      control: 'number',
      description: 'Taille de l\'icône en pixels',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '24' },
      },
    },
    color: {
      control: 'color',
      description: 'Couleur CSS (hex, rgb, nom de couleur)',
      table: {
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Label accessible pour les lecteurs d\'écran',
      table: {
        type: { summary: 'string' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Marque l\'icône comme décorative (ignorée par les lecteurs d\'écran)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    class: {
      control: 'text',
      description: 'Classes CSS additionnelles',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    variant: 'outline',
    size: 24,
    decorative: false,
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Utilisation basique d'une icône
 */
export const Default: Story = {
  args: {
    name: 'Home',
    ariaLabel: 'Accueil',
  },
}

/**
 * Icône en variante solid
 */
export const Solid: Story = {
  args: {
    name: 'CheckCircle',
    variant: 'solid',
    ariaLabel: 'Validé',
    color: '#10b981',
  },
}

/**
 * Icône en variante outline
 */
export const Outline: Story = {
  args: {
    name: 'User',
    variant: 'outline',
    ariaLabel: 'Utilisateur',
    color: '#3b82f6',
  },
}

/**
 * Différentes tailles d'icônes
 */
export const Sizes: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      const sizes = [16, 24, 32, 48, 64]
      return { args, sizes }
    },
    template: `
      <div style="display: flex; align-items: flex-end; gap: 1rem;">
        <div v-for="size in sizes" :key="size" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <Icon v-bind="args" :size="size" />
          <span style="font-size: 0.75rem; color: #6b7280;">{{ size }}px</span>
        </div>
      </div>
    `,
  }),
  args: {
    name: 'Star',
    variant: 'solid',
    ariaLabel: 'Étoile',
    color: '#eab308',
  },
}

/**
 * Différentes couleurs
 */
export const Colors: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      const colors = [
        { color: '#ef4444', label: 'Rouge' },
        { color: '#3b82f6', label: 'Bleu' },
        { color: '#10b981', label: 'Vert' },
        { color: '#eab308', label: 'Jaune' },
        { color: '#a855f7', label: 'Violet' },
        { color: '#6b7280', label: 'Gris' },
      ]
      return { args, colors }
    },
    template: `
      <div style="display: flex; gap: 1.5rem;">
        <div v-for="colorItem in colors" :key="colorItem.color" style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <Icon v-bind="args" :color="colorItem.color" :aria-label="colorItem.label" />
          <span style="font-size: 0.75rem; color: #6b7280;">{{ colorItem.label }}</span>
        </div>
      </div>
    `,
  }),
  args: {
    name: 'Heart',
    variant: 'solid',
    size: 32,
  },
}

/**
 * Icône décorative (cachée aux lecteurs d'écran)
 */
export const Decorative: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <Icon v-bind="args" />
        <span>Icône purement décorative à côté du texte</span>
      </div>
    `,
  }),
  args: {
    name: 'Sparkles',
    variant: 'solid',
    decorative: true,
    color: '#eab308',
  },
}

/**
 * Icône avec label accessible
 */
export const WithAriaLabel: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <Icon v-bind="args" />
          <span style="font-size: 0.875rem; color: #4b5563;">
            Cette icône a un aria-label "Rechercher" pour les lecteurs d'écran
          </span>
        </div>
        <div style="padding: 1rem; background-color: #dbeafe; border-radius: 0.5rem; font-size: 0.875rem;">
          <strong>♿ Accessibilité :</strong> L'icône est annoncée comme "Rechercher" 
          par les technologies d'assistance.
        </div>
      </div>
    `,
  }),
  args: {
    name: 'MagnifyingGlass',
    variant: 'outline',
    ariaLabel: 'Rechercher',
    size: 24,
  },
}

/**
 * Galerie d'icônes populaires
 */
export const IconGallery: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      const icons = [
        { name: 'Home', label: 'Accueil' },
        { name: 'User', label: 'Utilisateur' },
        { name: 'Cog', label: 'Paramètres' },
        { name: 'Bell', label: 'Notifications' },
        { name: 'Heart', label: 'Favoris' },
        { name: 'ShoppingCart', label: 'Panier' },
        { name: 'MagnifyingGlass', label: 'Recherche' },
        { name: 'Envelope', label: 'Messages' },
        { name: 'Star', label: 'Étoile' },
        { name: 'CheckCircle', label: 'Validé' },
        { name: 'XCircle', label: 'Erreur' },
        { name: 'InformationCircle', label: 'Info' },
      ]
      return { args, icons }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1.5rem;">
        <div 
          v-for="icon in icons" 
          :key="icon.name"
          style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border-radius: 0.5rem; transition: background-color 0.2s;"
          @mouseenter="e => e.currentTarget.style.backgroundColor = '#f3f4f6'"
          @mouseleave="e => e.currentTarget.style.backgroundColor = 'transparent'"
        >
          <Icon 
            :name="icon.name" 
            :variant="args.variant"
            :aria-label="icon.label"
            :size="32"
          />
          <span style="font-size: 0.75rem; color: #4b5563; text-align: center;">{{ icon.name }}</span>
        </div>
      </div>
    `,
  }),
  args: {
    variant: 'outline',
  },
}

/**
 * Comparaison Solid vs Outline
 */
export const SolidVsOutline: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      const icons = ['Heart', 'Star', 'CheckCircle', 'User', 'Home']
      return { args, icons }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Outline</h3>
          <div style="display: flex; gap: 1.5rem;">
            <Icon 
              v-for="icon in icons" 
              :key="icon"
              :name="icon" 
              variant="outline"
              :aria-label="icon"
              :size="40"
              color="#3b82f6"
            />
          </div>
        </div>
        <div>
          <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Solid</h3>
          <div style="display: flex; gap: 1.5rem;">
            <Icon 
              v-for="icon in icons" 
              :key="icon"
              :name="icon" 
              variant="solid"
              :aria-label="icon"
              :size="40"
              color="#3b82f6"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

/**
 * Exemple d'icône introuvable
 */
export const IconNotFound: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <Icon v-bind="args" />
          <span style="font-size: 0.875rem; color: #4b5563;">
            Cette icône n'existe pas - un indicateur d'erreur s'affiche
          </span>
        </div>
        <div style="padding: 1rem; background-color: #fee2e2; border-radius: 0.5rem; font-size: 0.875rem; color: #991b1b;">
          <strong>⚠️ Note :</strong> Vérifiez la console pour voir l'erreur de chargement.
        </div>
      </div>
    `,
  }),
  args: {
    name: 'IconInexistante',
    ariaLabel: 'Icône test',
  },
}

/**
 * Utilisation dans un bouton
 */
export const InButton: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      const buttonStyle = (bgColor: string) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: bgColor,
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'opacity 0.2s',
      })
      
      const iconButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        backgroundColor: '#e5e7eb',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
      }
      
      return { args, buttonStyle, iconButtonStyle }
    },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button 
          :style="buttonStyle('#3b82f6')"
          @mouseenter="e => e.currentTarget.style.opacity = '0.9'"
          @mouseleave="e => e.currentTarget.style.opacity = '1'"
        >
          <Icon v-bind="args" name="Plus" decorative :size="20" color="white" />
          <span>Ajouter</span>
        </button>
        
        <button 
          :style="buttonStyle('#10b981')"
          @mouseenter="e => e.currentTarget.style.opacity = '0.9'"
          @mouseleave="e => e.currentTarget.style.opacity = '1'"
        >
          <Icon v-bind="args" name="CheckCircle" decorative :size="20" color="white" />
          <span>Valider</span>
        </button>
        
        <button 
          :style="buttonStyle('#ef4444')"
          @mouseenter="e => e.currentTarget.style.opacity = '0.9'"
          @mouseleave="e => e.currentTarget.style.opacity = '1'"
        >
          <Icon v-bind="args" name="Trash" decorative :size="20" color="white" />
          <span>Supprimer</span>
        </button>
        
        <button 
          :style="iconButtonStyle"
          aria-label="Paramètres"
          @mouseenter="e => e.currentTarget.style.opacity = '0.9'"
          @mouseleave="e => e.currentTarget.style.opacity = '1'"
        >
          <Icon v-bind="args" name="Cog" :size="20" decorative color="#374151" />
        </button>
      </div>
    `,
  }),
}

/**
 * États interactifs (hover, disabled)
 */
export const InteractiveStates: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: #374151;">Hover Effect</h4>
          <div 
            style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s;"
            @mouseenter="e => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.borderColor = '#3b82f6'; }"
            @mouseleave="e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#d1d5db'; }"
          >
            <Icon name="Heart" :size="20" decorative color="#ef4444" />
            <span style="font-size: 0.875rem;">Survolez-moi</span>
          </div>
        </div>
        
        <div>
          <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: #374151;">État désactivé</h4>
          <div 
            style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; opacity: 0.5; cursor: not-allowed;"
          >
            <Icon name="Star" :size="20" decorative color="#6b7280" />
            <span style="font-size: 0.875rem; color: #6b7280;">Désactivé</span>
          </div>
        </div>
        
        <div>
          <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: #374151;">Avec animation</h4>
          <div 
            style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border: 2px solid #3b82f6; border-radius: 0.5rem; cursor: pointer;"
          >
            <Icon 
              name="Cog" 
              :size="20" 
              decorative 
              color="#3b82f6"
              style="transition: transform 0.3s;"
              @mouseenter="e => e.currentTarget.style.transform = 'rotate(90deg)'"
              @mouseleave="e => e.currentTarget.style.transform = 'rotate(0deg)'"
            />
            <span style="font-size: 0.875rem; color: #3b82f6;">Animation au survol</span>
          </div>
        </div>
      </div>
    `,
  }),
}