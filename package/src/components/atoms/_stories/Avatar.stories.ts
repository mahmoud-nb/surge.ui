import type { Meta, StoryObj } from '@storybook/vue3'
import Avatar from '../Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Avatar basé sur le composant Image pour afficher une photo de profil ou les initiales d\'un utilisateur, avec support des badges et indicateurs de statut.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de l\'image de profil'
    },
    alt: {
      control: 'text',
      description: 'Texte alternatif pour l\'image'
    },
    fallback: {
      control: 'text',
      description: 'Image de fallback'
    },
    name: {
      control: 'text',
      description: 'Nom pour générer les initiales'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Taille de l\'avatar'
    },
    variant: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'square'],
      description: 'Forme de l\'avatar'
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Statut de l\'utilisateur'
    },
    badge: {
      control: 'text',
      description: 'Badge de notification'
    },
    badgeProps: {
      control: 'object',
      description: 'Badge props'
    },
    badgeColor: {
      control: 'color',
      description: 'Couleur personnalisée du badge'
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement'
    },
    clickable: {
      control: 'boolean',
      description: 'Avatar cliquable'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    alt: 'Photo de profil',
    name: 'John Doe'
  }
}

export const WithInitials: Story = {
  args: {
    name: 'Marie Dupont',
    alt: 'Avatar de Marie Dupont'
  }
}

export const Sizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div style="text-align: center;">
          <Avatar 
            size="xs"
            name="XS"
            alt="Avatar extra small"
          />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">XS</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            size="sm"
            name="SM"
            alt="Avatar small"
          />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">SM</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            size="md"
            name="MD"
            alt="Avatar medium"
          />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">MD</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            size="lg"
            name="LG"
            alt="Avatar large"
          />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">LG</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            size="xl"
            name="XL"
            alt="Avatar extra large"
          />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">XL</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            size="2xl"
            name="2XL"
            alt="Avatar 2x large"
          />
          <p style="margin-top: 0.5rem; font-size: 0.75rem;">2XL</p>
        </div>
      </div>
    `
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <Avatar 
            variant="circle"
            name="Circle"
            alt="Avatar circulaire"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Circle</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            variant="rounded"
            name="Rounded"
            alt="Avatar arrondi"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Rounded</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            variant="square"
            name="Square"
            alt="Avatar carré"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Square</p>
        </div>
      </div>
    `
  })
}

export const WithStatus: Story = {
  args: {
    size: "lg"
  },
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <Avatar 
            v-bind="args"
            name="Online"
            status="online"
            alt="Utilisateur en ligne"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Online</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            v-bind="args"
            name="Away"
            status="away"
            alt="Utilisateur absent"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Away</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            v-bind="args"
            name="Busy"
            status="busy"
            alt="Utilisateur occupé"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Busy</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            v-bind="args"
            name="Offline"
            status="offline"
            alt="Utilisateur hors ligne"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Offline</p>
        </div>
      </div>
    `
  })
}

export const WithBadge: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <Avatar 
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Avatar avec badge"
            name="John Doe"
            badge="3"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Badge numérique</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            name="Marie"
            badge="!"
            :badgeProps="{ backgroundColor: '#f59e0b', color: '#EEEEEE'}"
            alt="Avatar avec badge d'alerte"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Badge d'alerte</p>
        </div>
        <div style="text-align: center;">
          <Avatar 
            name="Pierre"
            badge="99+"
            alt="Avatar avec nombreuses notifications"
            size="lg"
          />
          <p style="margin-top: 0.5rem; font-size: 0.875rem;">Nombreuses notifications</p>
        </div>
      </div>
    `
  })
}

export const Clickable: Story = {
  render: () => ({
    components: { Avatar },
    setup() {
      const handleClick = (event) => {
        alert('Avatar cliqué!')
      }
      
      return { handleClick }
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <Avatar 
          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
          alt="Avatar cliquable"
          name="John Doe"
          :clickable="true"
          size="lg"
          @click="handleClick"
        />
        <p>Cliquez sur l'avatar</p>
      </div>
    `
  })
}

export const Loading: Story = {
  args: {
    name: 'Loading User',
    loading: true,
    alt: 'Avatar en chargement',
    size: 'lg'
  }
}

export const Fallback: Story = {
  args: {
    src: 'https://invalid-url.jpg',
    fallback: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    alt: 'Avatar avec fallback',
    name: 'User Fallback',
    size: 'lg'
  }
}

export const UserProfile: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center; padding: 2rem; background-color: #f9fafb; border-radius: 0.5rem;">
        <Avatar 
          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Photo de profil de John Doe"
          name="John Doe"
          status="online"
          badge="5"
          size="2xl"
          :clickable="true"
        />
        
        <div style="text-align: center;">
          <h3 style="margin: 0 0 0.25rem 0; color: #1f2937;">John Doe</h3>
          <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Développeur Frontend</p>
          <p style="margin: 0.5rem 0 0 0; color: #10b981; font-size: 0.75rem; font-weight: 500;">● En ligne</p>
        </div>
      </div>
    `
  })
}

export const TeamMembers: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1.5rem; max-width: 600px;">
        <div style="text-align: center;">
          <Avatar 
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="John Doe"
            name="John Doe"
            status="online"
            size="xl"
          />
          <h4 style="margin: 0.75rem 0 0.25rem 0;">John Doe</h4>
          <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">CEO</p>
        </div>
        
        <div style="text-align: center;">
          <Avatar 
            name="Marie Dupont"
            alt="Marie Dupont"
            status="away"
            badge="2"
            size="xl"
          />
          <h4 style="margin: 0.75rem 0 0.25rem 0;">Marie Dupont</h4>
          <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">Designer</p>
        </div>
        
        <div style="text-align: center;">
          <Avatar 
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Pierre Martin"
            name="Pierre Martin"
            status="busy"
            size="xl"
          />
          <h4 style="margin: 0.75rem 0 0.25rem 0;">Pierre Martin</h4>
          <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">Développeur</p>
        </div>
        
        <div style="text-align: center;">
          <Avatar 
            name="Sophie Chen"
            alt="Sophie Chen"
            status="offline"
            size="xl"
          />
          <h4 style="margin: 0.75rem 0 0.25rem 0;">Sophie Chen</h4>
          <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">Product Manager</p>
        </div>
      </div>
    `
  })
}