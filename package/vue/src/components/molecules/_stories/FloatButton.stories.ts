import type { Meta, StoryObj } from '@storybook/vue3'
import { PlusIcon, ChatBubbleLeftIcon, QuestionMarkCircleIcon, CogIcon, HeartIcon, ShareIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import FloatButton from '../FloatButton.vue'
import Button from '../../atoms/Button.vue'
import ButtonGroup from '../ButtonGroup.vue'
import Link from '../../atoms/Link.vue'
import LinkGroup from '../LinkGroup.vue'

const meta: Meta<typeof FloatButton> = {
  title: 'Molecules/FloatButton',
  component: FloatButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Composant FloatButton pour placer un bouton flottant dans le coin de l\'écran avec support des slots, badges, tooltips et accessibilité complète selon les normes W3C.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position du bouton flottant'
    },
    offset: {
      control: 'object',
      description: 'Décalage personnalisé {x, y} en pixels'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton flottant'
    },
    icon: {
      control: false,
      description: 'Icône du bouton'
    },
    label: {
      control: 'text',
      description: 'Label du bouton (affiché dans le tooltip)'
    },
    href: {
      control: 'text',
      description: 'URL de destination (transforme en lien)'
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Cible du lien'
    },
    badge: {
      control: 'text',
      description: 'Texte du badge affiché en haut à droite'
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Variante du bouton'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le bouton'
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement'
    },
    zIndex: {
      control: 'number',
      description: 'Z-index du bouton'
    },
    hideOnScroll: {
      control: 'boolean',
      description: 'Masquer lors du scroll vers le bas'
    },
    showTooltip: {
      control: 'boolean',
      description: 'Afficher le tooltip au survol'
    },
    tooltipPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position du tooltip'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: PlusIcon,
    label: 'Ajouter un élément',
    position: 'right'
  },
  render: (args) => ({
    components: { FloatButton },
    setup() {
      return { args, PlusIcon }
    },
    template: `
      <div style="height: 100%; padding: 2rem; background-color: #f3f4f6;">
        <h1>Page d'exemple</h1>
        <p>Faites défiler pour voir le bouton flottant en action.</p>
        <div style="height: 200vh; background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);">
          <p style="margin-top: 50vh;">Contenu de la page...</p>
        </div>
        <FloatButton v-bind="args" :icon="PlusIcon" />
      </div>
    `
  })
}

export const WithBadge: Story = {
  args: {
    icon: ChatBubbleLeftIcon,
    label: 'Messages',
    badge: '3',
    position: 'right'
  },
  render: (args) => ({
    components: { FloatButton },
    setup() {
      return { args, ChatBubbleLeftIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Bouton avec badge</h1>
        <p>Le badge indique le nombre de notifications non lues.</p>
        <FloatButton v-bind="args" :icon="ChatBubbleLeftIcon" />
      </div>
    `
  })
}

export const AsLink: Story = {
  args: {
    icon: QuestionMarkCircleIcon,
    label: 'Centre d\'aide',
    href: 'https://help.example.com',
    target: '_blank',
    position: 'left'
  },
  render: (args) => ({
    components: { FloatButton },
    setup() {
      return { args, QuestionMarkCircleIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Bouton flottant comme lien</h1>
        <p>Ce bouton redirige vers une page externe.</p>
        <FloatButton v-bind="args" :icon="QuestionMarkCircleIcon" />
      </div>
    `
  })
}

export const WithButtonGroup: Story = {
  render: () => ({
    components: { FloatButton, ButtonGroup, Button },
    setup() {
      return { PlusIcon, CogIcon, HeartIcon, ShareIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Bouton flottant avec groupe d'actions</h1>
        <p>Cliquez sur le bouton principal pour voir les actions secondaires.</p>
        
        <FloatButton 
          :icon="PlusIcon" 
          label="Actions rapides"
          position="right"
        >
          <ButtonGroup gap="sm" variant="secondary" size="sm">
            <Button :icon="CogIcon" iconDisplay="only" aria-label="Paramètres" />
            <Button :icon="HeartIcon" iconDisplay="only" aria-label="Favoris" />
            <Button :icon="ShareIcon" iconDisplay="only" aria-label="Partager" />
          </ButtonGroup>
        </FloatButton>
      </div>
    `
  })
}

export const WithLinkGroup: Story = {
  render: () => ({
    components: { FloatButton, LinkGroup, Link },
    setup() {
      return { QuestionMarkCircleIcon, PhoneIcon, EnvelopeIcon, ChatBubbleLeftIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Bouton flottant avec liens d'aide</h1>
        <p>Accès rapide aux différents canaux de support.</p>
        
        <FloatButton 
          :icon="QuestionMarkCircleIcon" 
          label="Besoin d'aide ?"
          position="left"
        >
          <LinkGroup gap="sm" variant="secondary" size="sm">
            <Link href="/help" :icon="QuestionMarkCircleIcon" iconDisplay="left">Centre d'aide</Link>
            <Link href="tel:+33123456789" :icon="PhoneIcon" iconDisplay="left">Téléphone</Link>
            <Link href="mailto:support@example.com" :icon="EnvelopeIcon" iconDisplay="left">Email</Link>
            <Link href="/chat" :icon="ChatBubbleLeftIcon" iconDisplay="left">Chat en direct</Link>
          </LinkGroup>
        </FloatButton>
      </div>
    `
  })
}

export const Positions: Story = {
  render: () => ({
    components: { FloatButton },
    setup() {
      return { PlusIcon, CogIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Positions du bouton flottant</h1>
        <p>Deux boutons flottants dans les coins opposés.</p>
        
        <FloatButton 
          :icon="PlusIcon" 
          label="Ajouter"
          position="right"
        />
        
        <FloatButton 
          :icon="CogIcon" 
          label="Paramètres"
          position="left"
          variant="secondary"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { FloatButton },
    setup() {
      return { PlusIcon, CogIcon, HeartIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Tailles du bouton flottant</h1>
        <p>Différentes tailles disponibles.</p>
        
        <FloatButton 
          :icon="PlusIcon" 
          label="Small"
          position="right"
          size="sm"
          :offset="{ x: 24, y: 160 }"
        />
        
        <FloatButton 
          :icon="CogIcon" 
          label="Medium"
          position="right"
          size="md"
          :offset="{ x: 24, y: 96 }"
        />
        
        <FloatButton 
          :icon="HeartIcon" 
          label="Large"
          position="right"
          size="lg"
          :offset="{ x: 24, y: 24 }"
        />
      </div>
    `
  })
}

export const CustomOffset: Story = {
  args: {
    icon: PlusIcon,
    label: 'Position personnalisée',
    position: 'right',
    offset: { x: 100, y: 100 }
  },
  render: (args) => ({
    components: { FloatButton },
    setup() {
      return { args, PlusIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Position personnalisée</h1>
        <p>Bouton avec offset personnalisé (100px du bord).</p>
        <FloatButton v-bind="args" :icon="PlusIcon" />
      </div>
    `
  })
}

export const HideOnScroll: Story = {
  args: {
    icon: PlusIcon,
    label: 'Masqué au scroll',
    position: 'right',
    hideOnScroll: true
  },
  render: (args) => ({
    components: { FloatButton },
    setup() {
      return { args, PlusIcon }
    },
    template: `
      <div style="background-color: #f3f4f6;">
        <div style="height: 100vh; padding: 2rem;">
          <h1>Bouton masqué au scroll</h1>
          <p>Faites défiler vers le bas pour voir le bouton disparaître.</p>
          <p>Faites défiler vers le haut pour le voir réapparaître.</p>
        </div>
        <div style="height: 200vh; background: linear-gradient(to bottom, #e5e7eb, #d1d5db); padding: 2rem;">
          <h2>Contenu de la page</h2>
          <p>Continuez à faire défiler...</p>
          <div style="margin-top: 50vh;">
            <p>Plus de contenu ici...</p>
          </div>
        </div>
        <FloatButton v-bind="args" :icon="PlusIcon" />
      </div>
    `
  })
}

export const TooltipPositions: Story = {
  render: () => ({
    components: { FloatButton },
    setup() {
      return { PlusIcon, CogIcon, HeartIcon, ShareIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Positions des tooltips</h1>
        <p>Différentes positions de tooltip selon l'emplacement du bouton.</p>

        <FloatButton 
          :icon="HeartIcon" 
          label="Tooltip en haut"
          position="right"
          tooltipPosition="top"
          :offset="{ x: 24, y: 220 }"
        />
        
        <FloatButton 
          :icon="PlusIcon" 
          label="Tooltip à gauche"
          position="right"
          tooltipPosition="left"
          :offset="{ x: 24, y: 148 }"
        />
        
        <FloatButton 
          :icon="ShareIcon" 
          label="Tooltip en bas"
          position="right"
          tooltipPosition="bottom"
          :offset="{ x: 24, y: 76 }"
        />

        <FloatButton 
          :icon="CogIcon" 
          label="Tooltip à droite"
          position="left"
          tooltipPosition="right"
          :offset="{ x: 24, y: 24 }"
        />
      </div>
    `
  })
}

export const States: Story = {
  render: () => ({
    components: { FloatButton },
    setup() {
      return { PlusIcon, CogIcon, HeartIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>États du bouton flottant</h1>
        <p>Différents états et variantes.</p>
        
        <FloatButton 
          :icon="PlusIcon" 
          label="Normal"
          position="right"
          :offset="{ x: 24, y: 176 }"
        />
        
        <FloatButton 
          :icon="CogIcon" 
          label="Chargement..."
          position="right"
          :loading="true"
          :offset="{ x: 24, y: 100 }"
        />
        
        <FloatButton 
          :icon="HeartIcon" 
          label="Désactivé"
          position="right"
          :disabled="true"
          :offset="{ x: 24, y: 24 }"
        />
      </div>
    `
  })
}

export const Variants: Story = {
  render: () => ({
    components: { FloatButton },
    setup() {
      return { PlusIcon, CogIcon, HeartIcon, ShareIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Variantes du bouton flottant</h1>
        <p>Différentes variantes visuelles.</p>
        
        <FloatButton 
          :icon="PlusIcon" 
          label="Primary"
          variant="primary"
          position="right"
          :offset="{ x: 24, y: 260 }"
        />
        
        <FloatButton 
          :icon="CogIcon" 
          label="Secondary"
          variant="secondary"
          position="right"
          :offset="{ x: 24, y: 180 }"
        />
        
        <FloatButton 
          :icon="HeartIcon" 
          label="Outline"
          variant="outline"
          position="right"
          :offset="{ x: 24, y: 102 }"
        />
        
        <FloatButton 
          :icon="ShareIcon" 
          label="Ghost"
          variant="ghost"
          position="right"
          :offset="{ x: 24, y: 24 }"
        />
      </div>
    `
  })
}

export const ComplexExample: Story = {
  render: () => ({
    components: { FloatButton, ButtonGroup, Button, LinkGroup, Link },
    setup() {
      const handleMainClick = () => {
        console.log('Bouton principal cliqué!')
      }
      
      return { 
        PlusIcon, 
        CogIcon, 
        HeartIcon, 
        ShareIcon, 
        QuestionMarkCircleIcon,
        PhoneIcon,
        EnvelopeIcon,
        ChatBubbleLeftIcon,
        handleMainClick 
      }
    },
    template: `
      <div style="height: 150vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Exemple complexe avec plusieurs boutons flottants</h1>
        <p>Démonstration de plusieurs boutons flottants avec différentes fonctionnalités.</p>
        
        <div style="margin: 2rem 0;">
          <h2>Contenu de la page</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        
        <!-- Bouton principal avec actions -->
        <FloatButton 
          :icon="PlusIcon" 
          label="Actions rapides"
          position="right"
          badge="2"
          @click="handleMainClick"
        >
          <ButtonGroup gap="none" variant="secondary" size="sm" direction="vertical">
            <Button :icon="CogIcon" iconDisplay="only" aria-label="Paramètres" />
            <Button :icon="HeartIcon" iconDisplay="only" aria-label="Favoris" />
            <Button :icon="ShareIcon" iconDisplay="only" aria-label="Partager" />
          </ButtonGroup>
        </FloatButton>
        
        <!-- Bouton d'aide avec liens -->
        <FloatButton 
          :icon="QuestionMarkCircleIcon" 
          label="Besoin d'aide ?"
          position="left"
          variant="secondary"
          tooltipPosition="right"
        >
          <LinkGroup gap="sm" variant="muted" size="sm">
            <Link href="/help" :icon="QuestionMarkCircleIcon" iconDisplay="left">Centre d'aide</Link>
            <Link href="tel:+33123456789" :icon="PhoneIcon" iconDisplay="left">Téléphone</Link>
            <Link href="mailto:support@example.com" :icon="EnvelopeIcon" iconDisplay="left">Email</Link>
            <Link href="/chat" :icon="ChatBubbleLeftIcon" iconDisplay="left">Chat</Link>
          </LinkGroup>
        </FloatButton>
      </div>
    `
  })
}

export const Interactive: Story = {
  render: () => ({
    components: { FloatButton },
    setup() {
      const handleClick = () => {
        alert('Bouton flottant cliqué!')
      }
      
      return { PlusIcon, handleClick }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Bouton flottant interactif</h1>
        <p>Cliquez sur le bouton pour voir l'interaction.</p>
        
        <FloatButton 
          :icon="PlusIcon" 
          label="Cliquez-moi !"
          position="right"
          @click="handleClick"
        />
      </div>
    `
  })
}

export const WithoutTooltip: Story = {
  args: {
    icon: PlusIcon,
    label: 'Ajouter',
    position: 'right',
    showTooltip: false
  },
  render: (args) => ({
    components: { FloatButton },
    setup() {
      return { args, PlusIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6;">
        <h1>Sans tooltip</h1>
        <p>Bouton flottant sans tooltip au survol.</p>
        <FloatButton v-bind="args" :icon="PlusIcon" />
      </div>
    `
  })
}

export const HighZIndex: Story = {
  args: {
    icon: PlusIcon,
    label: 'Z-index élevé',
    position: 'right',
    zIndex: 9999
  },
  render: (args) => ({
    components: { FloatButton },
    setup() {
      return { args, PlusIcon }
    },
    template: `
      <div style="height: 100vh; padding: 2rem; background-color: #f3f4f6; position: relative;">
        <h1>Z-index personnalisé</h1>
        <p>Bouton avec z-index élevé pour passer au-dessus d'autres éléments.</p>
        
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0,0,0,0.8); color: white; padding: 2rem; border-radius: 0.5rem; z-index: 500;">
          Modal avec z-index 500
        </div>
        
        <FloatButton v-bind="args" :icon="PlusIcon" />
      </div>
    `
  })
}