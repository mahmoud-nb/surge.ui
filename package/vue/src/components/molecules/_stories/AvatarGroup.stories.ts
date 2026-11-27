import type { Meta, StoryObj } from '@storybook/vue3'
import { PlusIcon, UsersIcon } from '@heroicons/vue/24/outline'
import AvatarGroup from '../AvatarGroup.vue'
import Button from '../../atoms/Button.vue'

const meta: Meta<typeof AvatarGroup> = {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant AvatarGroup pour afficher une série d\'avatars avec gestion du surplus et slots before/after.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    avatars: {
      control: 'object',
      description: 'Liste des avatars à afficher'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Taille des avatars'
    },
    variant: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'square'],
      description: 'Forme des avatars'
    },
    max: {
      control: 'number',
      description: 'Nombre maximum d\'avatars visibles'
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Espacement entre les avatars'
    },
    clickable: {
      control: 'boolean',
      description: 'Avatars cliquables'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const teamMembers = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    name: 'John Doe',
    alt: 'John Doe',
    status: 'online'
  },
  {
    id: '2',
    name: 'Marie Dupont',
    alt: 'Marie Dupont',
    status: 'away',
    badge: '2'
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    name: 'Pierre Martin',
    alt: 'Pierre Martin',
    status: 'busy'
  },
  {
    id: '4',
    name: 'Sophie Chen',
    alt: 'Sophie Chen',
    status: 'offline'
  },
  {
    id: '5',
    name: 'Alex Johnson',
    alt: 'Alex Johnson',
    status: 'online',
    badge: '1'
  },
  {
    id: '6',
    name: 'Emma Wilson',
    alt: 'Emma Wilson',
    status: 'away'
  },
  {
    id: '7',
    name: 'Lucas Brown',
    alt: 'Lucas Brown',
    status: 'online'
  }
]

export const Default: Story = {
  args: {
    avatars: teamMembers.slice(0, 4)
  }
}

export const WithOverflow: Story = {
  args: {
    avatars: teamMembers,
    max: 4
  }
}

export const Spacing: Story = {
  render: () => ({
    components: { AvatarGroup },
    setup() {
      return { teamMembers: teamMembers.slice(0, 4) }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Spacing None (superposés)</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            spacing="none"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Spacing Small</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            spacing="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Spacing Medium (défaut)</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            spacing="md"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Spacing Large</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            spacing="lg"
          />
        </div>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { AvatarGroup },
    setup() {
      return { teamMembers: teamMembers.slice(0, 3) }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Small</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            size="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Medium</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            size="md"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Large</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            size="lg"
          />
        </div>
      </div>
    `
  })
}

export const Clickable: Story = {
  render: () => ({
    components: { AvatarGroup },
    setup() {
      const handleAvatarClick = (avatar) => {
        if (avatar.type === 'more') {
          alert(`${avatar.count} autres utilisateurs`)
        } else {
          alert(`Avatar cliqué: ${avatar.name}`)
        }
      }
      
      return { teamMembers, handleAvatarClick }
    },
    template: `
      <div>
        <h4 style="margin-bottom: 1rem;">Avatars cliquables</h4>
        <AvatarGroup 
          :avatars="teamMembers"
          :max="3"
          :clickable="true"
          @avatar-click="handleAvatarClick"
        />
        <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
          Cliquez sur un avatar ou sur "+4"
        </p>
      </div>
    `
  })
}

export const WithSlots: Story = {
  render: () => ({
    components: { AvatarGroup, Button },
    setup() {
      return { teamMembers: teamMembers.slice(0, 4), PlusIcon, UsersIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 1rem;">Avec slot before</h4>
          <AvatarGroup :avatars="teamMembers">
            <template #before>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-right: 0.75rem;">
                <UsersIcon style="width: 1.25rem; height: 1.25rem; color: #6b7280;" />
                <span style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">Équipe:</span>
              </div>
            </template>
          </AvatarGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Avec slot after</h4>
          <AvatarGroup :avatars="teamMembers">
            <template #after>
              <Button 
                :icon="PlusIcon" 
                iconDisplay="only" 
                variant="outline" 
                size="sm"
                aria-label="Ajouter un membre"
                style="margin-left: 0.75rem;"
              />
            </template>
          </AvatarGroup>
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Avec les deux slots</h4>
          <AvatarGroup :avatars="teamMembers" spacing="sm">
            <template #before>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-right: 1rem;">
                <UsersIcon style="width: 1.25rem; height: 1.25rem; color: #6b7280;" />
                <span style="font-size: 0.875rem; color: #374151; font-weight: 600;">Collaborateurs</span>
              </div>
            </template>
            <template #after>
              <div style="margin-left: 1rem;">
                <Button 
                  :icon="PlusIcon" 
                  iconDisplay="left"
                  variant="ghost" 
                  size="sm"
                >
                  Inviter
                </Button>
              </div>
            </template>
          </AvatarGroup>
        </div>
      </div>
    `
  })
}

export const ProjectTeam: Story = {
  render: () => ({
    components: { AvatarGroup, Button },
    setup() {
      const projectTeam = [
        {
          id: '1',
          src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
          name: 'John Doe',
          alt: 'John Doe - Chef de projet',
          status: 'online'
        },
        {
          id: '2',
          name: 'Marie Dupont',
          alt: 'Marie Dupont - Designer',
          status: 'away',
          badge: '3'
        },
        {
          id: '3',
          src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
          name: 'Pierre Martin',
          alt: 'Pierre Martin - Développeur',
          status: 'busy'
        },
        {
          id: '4',
          name: 'Sophie Chen',
          alt: 'Sophie Chen - QA',
          status: 'online'
        },
        {
          id: '5',
          name: 'Alex Johnson',
          alt: 'Alex Johnson - DevOps',
          status: 'offline'
        }
      ]
      
      const handleAvatarClick = (avatar) => {
        console.log('Avatar cliqué:', avatar.name)
      }
      
      return { projectTeam, handleAvatarClick, PlusIcon }
    },
    template: `
      <div style="padding: 1.5rem; background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); max-width: 400px;">
        <div style="margin-bottom: 1.5rem;">
          <h3 style="margin: 0 0 0.25rem 0; color: #1f2937;">Projet Alpha</h3>
          <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Application web moderne</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <AvatarGroup 
            :avatars="projectTeam"
            :max="4"
            spacing="none"
            :clickable="true"
            @avatar-click="handleAvatarClick"
          >
            <template #before>
              <span style="font-size: 0.875rem; color: #374151; font-weight: 500; margin-right: 0.75rem;">
                Équipe:
              </span>
            </template>
          </AvatarGroup>
          
          <Button 
            :icon="PlusIcon" 
            iconDisplay="only" 
            variant="outline" 
            size="sm"
            aria-label="Ajouter un membre à l'équipe"
          />
        </div>
        
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
          <div style="display: flex; justify-content: between; align-items: center; gap: 1rem;">
            <div style="flex: 1;">
              <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">Progression</p>
              <div style="width: 100%; height: 0.25rem; background-color: #e5e7eb; border-radius: 9999px; margin-top: 0.25rem;">
                <div style="width: 75%; height: 100%; background-color: #10b981; border-radius: 9999px;"></div>
              </div>
            </div>
            <span style="font-size: 0.875rem; font-weight: 600; color: #10b981;">75%</span>
          </div>
        </div>
      </div>
    `
  })
}

export const ChatParticipants: Story = {
  render: () => ({
    components: { AvatarGroup },
    setup() {
      const participants = [
        {
          id: '1',
          src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
          name: 'John Doe',
          alt: 'John Doe',
          status: 'online'
        },
        {
          id: '2',
          name: 'Marie Dupont',
          alt: 'Marie Dupont',
          status: 'online',
          badge: '!'
        },
        {
          id: '3',
          src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
          name: 'Pierre Martin',
          alt: 'Pierre Martin',
          status: 'away'
        }
      ]
      
      return { participants }
    },
    template: `
      <div style="padding: 1rem; background-color: #f9fafb; border-radius: 0.5rem; border: 1px solid #e5e7eb;">
        <AvatarGroup 
          :avatars="participants"
          size="sm"
          spacing="sm"
        >
          <template #before>
            <span style="font-size: 0.75rem; color: #6b7280; margin-right: 0.5rem;">
              En ligne:
            </span>
          </template>
          <template #after>
            <span style="font-size: 0.75rem; color: #6b7280; margin-left: 0.5rem;">
              ({{ participants.length }} participants)
            </span>
          </template>
        </AvatarGroup>
      </div>
    `
  })
}

export const StackedAvatars: Story = {
  render: () => ({
    components: { AvatarGroup },
    setup() {
      return { teamMembers: teamMembers.slice(0, 6) }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Avatars superposés (spacing="none")</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            :max="5"
            spacing="none"
            size="md"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Avec limite de 3</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            :max="3"
            spacing="none"
            size="lg"
          />
        </div>
      </div>
    `
  })
}

export const Interactive: Story = {
  render: () => ({
    components: { AvatarGroup },
    setup() {
      const handleAvatarClick = (avatar) => {
        if (avatar.type === 'more') {
          alert(`Voir ${avatar.count} autres utilisateurs`)
        } else {
          alert(`Profil de ${avatar.name}`)
        }
      }
      
      return { teamMembers, handleAvatarClick }
    },
    template: `
      <div>
        <h4 style="margin-bottom: 1rem;">Groupe interactif</h4>
        <AvatarGroup 
          :avatars="teamMembers"
          :max="4"
          :clickable="true"
          spacing="sm"
          @avatar-click="handleAvatarClick"
        />
        <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
          Cliquez sur un avatar pour voir son profil
        </p>
      </div>
    `
  })
}

export const DifferentVariants: Story = {
  render: () => ({
    components: { AvatarGroup },
    setup() {
      return { teamMembers: teamMembers.slice(0, 4) }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem;">Circle (défaut)</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            variant="circle"
            spacing="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Rounded</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            variant="rounded"
            spacing="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 0.5rem;">Square</h4>
          <AvatarGroup 
            :avatars="teamMembers"
            variant="square"
            spacing="sm"
          />
        </div>
      </div>
    `
  })
}