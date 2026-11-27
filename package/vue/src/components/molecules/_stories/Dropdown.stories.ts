import type { Meta, StoryObj } from '@storybook/vue3'
import { CogIcon, UserIcon, ArrowUturnLeftIcon, PlusIcon, DocumentIcon, TrashIcon, ShareIcon } from '@heroicons/vue/24/outline'
import Dropdown from '../Dropdown.vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Dropdown qui ressemble à un bouton mais affiche une liste d\'options au clic. Chaque option peut être un lien ou déclencher une action. Conforme aux normes W3C d\'accessibilité.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Liste des options du dropdown'
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover'],
      description: 'Déclencheur d\'ouverture'
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left-start', 'left-end', 'right-start', 'right-end'],
      description: 'Position du menu'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton'
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Variante du bouton'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le dropdown'
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement'
    },
    icon: {
      control: false,
      description: 'Icône du bouton'
    },
    iconDisplay: {
      control: { type: 'select' },
      options: ['left', 'right', 'only'],
      description: 'Position de l\'icône'
    },
    label: {
      control: 'text',
      description: 'Label du bouton'
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Fermer après sélection'
    },
    maxHeight: {
      control: 'text',
      description: 'Hauteur maximale du menu'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const basicOptions = [
  { value: 'profile', label: 'Mon profil', icon: UserIcon },
  { value: 'settings', label: 'Paramètres', icon: CogIcon },
  { value: 'separator1', separator: true },
  { value: 'logout', label: 'Déconnexion', icon: ArrowUturnLeftIcon }
]

const actionOptions = [
  { value: 'new', label: 'Nouveau document', icon: PlusIcon },
  { value: 'open', label: 'Ouvrir', icon: DocumentIcon },
  { value: 'separator1', separator: true },
  { value: 'share', label: 'Partager', icon: ShareIcon },
  { value: 'delete', label: 'Supprimer', icon: TrashIcon }
]

const linkOptions = [
  { value: 'docs', label: 'Documentation', href: '/docs', icon: DocumentIcon },
  { value: 'help', label: 'Centre d\'aide', href: '/help', icon: UserIcon },
  { value: 'separator1', separator: true },
  { value: 'github', label: 'GitHub', href: 'https://github.com', target: '_blank', icon: ShareIcon },
  { value: 'contact', label: 'Contact', href: 'mailto:contact@example.com', icon: UserIcon }
]

const mixedOptions = [
  { value: 'profile', label: 'Mon profil', icon: UserIcon },
  { value: 'docs', label: 'Documentation', href: '/docs', icon: DocumentIcon },
  { value: 'separator1', separator: true },
  { value: 'settings', label: 'Paramètres', icon: CogIcon },
  { value: 'help', label: 'Aide', href: 'https://help.example.com', target: '_blank', icon: UserIcon }
]

export const Default: Story = {
  args: {
    options: basicOptions,
    label: 'Menu utilisateur',
    icon: UserIcon
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
        alert(`Action: ${option.label}`)
      }
      
      return { args, handleSelect, UserIcon }
    },
    template: '<Dropdown v-bind="args" :icon="UserIcon" @select="handleSelect" />'
  })
}

export const ActionsMenu: Story = {
  args: {
    options: actionOptions,
    label: 'Actions',
    icon: CogIcon,
    variant: 'primary'
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Action sélectionnée:', option)
        alert(`Action: ${option.label}`)
      }
      
      return { args, handleSelect, CogIcon }
    },
    template: '<Dropdown v-bind="args" :icon="CogIcon" @select="handleSelect" />'
  })
}

export const WithLinks: Story = {
  args: {
    options: linkOptions,
    label: 'Ressources',
    icon: DocumentIcon,
    variant: 'outline'
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Lien sélectionné:', option)
        // Les liens avec href naviguent automatiquement
        if (!option.href) {
          alert(`Action: ${option.label}`)
        }
      }
      
      return { args, handleSelect, DocumentIcon }
    },
    template: '<Dropdown v-bind="args" :icon="DocumentIcon" @select="handleSelect" />'
  })
}

export const MixedOptions: Story = {
  args: {
    options: mixedOptions,
    label: 'Menu mixte',
    icon: CogIcon,
    variant: 'secondary'
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
        if (!option.href) {
          alert(`Action: ${option.label}`)
        }
      }
      
      return { args, handleSelect, CogIcon }
    },
    template: '<Dropdown v-bind="args" :icon="CogIcon" @select="handleSelect" />'
  })
}

export const IconOnly: Story = {
  args: {
    options: basicOptions,
    icon: CogIcon,
    iconDisplay: 'only',
    ariaLabel: 'Menu des options'
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
        alert(`Action: ${option.label}`)
      }
      
      return { args, handleSelect, CogIcon }
    },
    template: '<Dropdown v-bind="args" :icon="CogIcon" @select="handleSelect" />'
  })
}

export const Placements: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]
      
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
      }
      
      return { options, handleSelect, CogIcon }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; padding: 4rem;">
        <div>
          <h4 style="margin-bottom: 1rem;">Bottom Start</h4>
          <Dropdown 
            :options="options"
            label="Bottom Start"
            placement="bottom-start"
            @select="handleSelect"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Bottom End</h4>
          <Dropdown 
            :options="options"
            label="Bottom End"
            placement="bottom-end"
            @select="handleSelect"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Top Start</h4>
          <Dropdown 
            :options="options"
            label="Top Start"
            placement="top-start"
            @select="handleSelect"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Top End</h4>
          <Dropdown 
            :options="options"
            label="Top End"
            placement="top-end"
            @select="handleSelect"
          />
        </div>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
      
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
      }
      
      return { options, handleSelect }
    },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <Dropdown 
          :options="options"
          label="Small"
          size="sm"
          @select="handleSelect"
        />
        <Dropdown 
          :options="options"
          label="Medium"
          size="md"
          @select="handleSelect"
        />
        <Dropdown 
          :options="options"
          label="Large"
          size="lg"
          @select="handleSelect"
        />
      </div>
    `
  })
}

export const Variants: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
      
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
      }
      
      return { options, handleSelect }
    },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <Dropdown 
          :options="options"
          label="Primary"
          variant="primary"
          @select="handleSelect"
        />
        <Dropdown 
          :options="options"
          label="Secondary"
          variant="secondary"
          @select="handleSelect"
        />
        <Dropdown 
          :options="options"
          label="Outline"
          variant="outline"
          @select="handleSelect"
        />
        <Dropdown 
          :options="options"
          label="Ghost"
          variant="ghost"
          @select="handleSelect"
        />
      </div>
    `
  })
}

export const HoverTrigger: Story = {
  args: {
    options: basicOptions,
    label: 'Survol pour ouvrir',
    trigger: 'hover',
    icon: UserIcon
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
        alert(`Action: ${option.label}`)
      }
      
      return { args, handleSelect, UserIcon }
    },
    template: '<Dropdown v-bind="args" :icon="UserIcon" @select="handleSelect" />'
  })
}

export const WithDescriptions: Story = {
  args: {
    options: [
      { 
        value: 'create', 
        label: 'Créer un document', 
        description: 'Nouveau document vierge',
        icon: PlusIcon 
      },
      { 
        value: 'template', 
        label: 'Utiliser un modèle', 
        description: 'Partir d\'un modèle existant',
        icon: DocumentIcon 
      },
      { value: 'separator1', separator: true },
      { 
        value: 'import', 
        label: 'Importer', 
        description: 'Importer depuis un fichier',
        icon: ShareIcon 
      }
    ],
    label: 'Nouveau',
    icon: PlusIcon,
    variant: 'primary'
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
        alert(`Action: ${option.label}`)
      }
      
      return { args, handleSelect, PlusIcon }
    },
    template: '<Dropdown v-bind="args" :icon="PlusIcon" @select="handleSelect" />'
  })
}

export const Loading: Story = {
  args: {
    options: basicOptions,
    label: 'Chargement...',
    loading: true,
    icon: CogIcon
  }
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    label: 'Menu désactivé',
    disabled: true,
    icon: CogIcon
  }
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'edit', label: 'Modifier', icon: CogIcon },
      { value: 'share', label: 'Partager', icon: ShareIcon, disabled: true },
      { value: 'separator1', separator: true },
      { value: 'delete', label: 'Supprimer', icon: TrashIcon, disabled: true }
    ],
    label: 'Actions',
    icon: CogIcon
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
        alert(`Action: ${option.label}`)
      }
      
      return { args, handleSelect, CogIcon }
    },
    template: '<Dropdown v-bind="args" :icon="CogIcon" @select="handleSelect" />'
  })
}

export const UserProfileMenu: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const userOptions = [
        { value: 'profile', label: 'Mon profil', href: '/profile', icon: UserIcon },
        { value: 'settings', label: 'Paramètres', href: '/settings', icon: CogIcon },
        { value: 'separator1', separator: true },
        { value: 'help', label: 'Centre d\'aide', href: 'https://help.example.com', target: '_blank', icon: DocumentIcon },
        { value: 'separator2', separator: true },
        { value: 'logout', label: 'Déconnexion', icon: ArrowUturnLeftIcon }
      ]
      
      const handleSelect = (option) => {
        console.log('Option sélectionnée:', option)
        if (option.value === 'logout') {
          alert('Déconnexion...')
        } else if (!option.href) {
          alert(`Action: ${option.label}`)
        }
      }
      
      return { userOptions, handleSelect, UserIcon }
    },
    template: `
      <div style="display: flex; justify-content: flex-end; padding: 1rem; background-color: #f8fafc; border-radius: 0.5rem;">
        <Dropdown 
          :options="userOptions"
          :icon="UserIcon"
          iconDisplay="only"
          aria-label="Menu utilisateur"
          variant="ghost"
          @select="handleSelect"
        />
      </div>
    `
  })
}

export const ContextMenu: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const contextOptions = [
        { value: 'copy', label: 'Copier', description: 'Ctrl+C' },
        { value: 'cut', label: 'Couper', description: 'Ctrl+X' },
        { value: 'paste', label: 'Coller', description: 'Ctrl+V' },
        { value: 'separator1', separator: true },
        { value: 'select-all', label: 'Tout sélectionner', description: 'Ctrl+A' },
        { value: 'separator2', separator: true },
        { value: 'properties', label: 'Propriétés' }
      ]
      
      const handleSelect = (option) => {
        console.log('Action de contexte:', option)
        alert(`Action: ${option.label}`)
      }
      
      return { contextOptions, handleSelect }
    },
    template: `
      <div style="padding: 2rem; background-color: #f8fafc; border-radius: 0.5rem; text-align: center;">
        <p style="margin-bottom: 1rem;">Clic droit simulé</p>
        <Dropdown 
          :options="contextOptions"
          label="Menu contextuel"
          variant="outline"
          placement="bottom-start"
          @select="handleSelect"
        />
      </div>
    `
  })
}

export const NavigationDropdown: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const navOptions = [
        { value: 'products', label: 'Tous les produits', href: '/products' },
        { value: 'laptops', label: 'Ordinateurs portables', href: '/products/laptops' },
        { value: 'phones', label: 'Téléphones', href: '/products/phones' },
        { value: 'separator1', separator: true },
        { value: 'accessories', label: 'Accessoires', href: '/products/accessories' },
        { value: 'support', label: 'Support', href: '/support' }
      ]
      
      const handleSelect = (option) => {
        console.log('Navigation vers:', option)
        if (!option.href) {
          alert(`Navigation: ${option.label}`)
        }
      }
      
      return { navOptions, handleSelect }
    },
    template: `
      <nav style="padding: 1rem; background-color: white; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; gap: 2rem; align-items: center;">
          <h1 style="margin: 0; font-size: 1.25rem; font-weight: 600;">surgeUI</h1>
          
          <div style="display: flex; gap: 1rem; align-items: center;">
            <a href="/" style="text-decoration: none; color: #374151;">Accueil</a>
            
            <Dropdown 
              :options="navOptions"
              label="Produits"
              variant="ghost"
              trigger="hover"
              @select="handleSelect"
            />
            
            <a href="/about" style="text-decoration: none; color: #374151;">À propos</a>
          </div>
        </div>
      </nav>
    `
  })
}

export const Interactive: Story = {
  render: () => ({
    components: { Dropdown },
    setup() {
      const quickActions = [
        { value: 'new-project', label: 'Nouveau projet', icon: PlusIcon },
        { value: 'new-file', label: 'Nouveau fichier', icon: DocumentIcon },
        { value: 'separator1', separator: true },
        { value: 'settings', label: 'Paramètres', icon: CogIcon },
        { value: 'help', label: 'Aide', href: '/help', icon: UserIcon }
      ]
      
      const handleSelect = (option) => {
        console.log('Action rapide:', option)
        
        switch (option.value) {
          case 'new-project':
            alert('Création d\'un nouveau projet...')
            break
          case 'new-file':
            alert('Création d\'un nouveau fichier...')
            break
          case 'settings':
            alert('Ouverture des paramètres...')
            break
          default:
            if (!option.href) {
              alert(`Action: ${option.label}`)
            }
        }
      }
      
      const handleOpen = () => {
        console.log('Menu ouvert')
      }
      
      const handleClose = () => {
        console.log('Menu fermé')
      }
      
      return { quickActions, handleSelect, handleOpen, handleClose, PlusIcon }
    },
    template: `
      <div style="padding: 2rem; background-color: #f8fafc; border-radius: 0.5rem;">
        <h3 style="margin-bottom: 1rem;">Actions rapides</h3>
        <p style="margin-bottom: 2rem; color: #6b7280;">
          Cliquez sur le bouton pour voir les actions disponibles. 
          Utilisez les flèches du clavier pour naviguer.
        </p>
        
        <Dropdown 
          :options="quickActions"
          label="Actions rapides"
          :icon="PlusIcon"
          variant="primary"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
        />
      </div>
    `
  })
}