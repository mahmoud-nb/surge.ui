import type { Meta, StoryObj } from '@storybook/vue3'
import { CheckIcon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import SwitchField from '../SwitchField.vue'

const meta: Meta<typeof SwitchField> = {
  title: 'Molecules/SwitchField',
  component: SwitchField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant Switch (interrupteur) pour les actions de basculement on/off. Conforme aux normes W3C avec support complet de l\'accessibilité et positionnement intelligent des labels.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'État du switch (activé/désactivé)'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du switch'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel du switch'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le switch'
    },
    readonly: {
      control: 'boolean',
      description: 'Switch en lecture seule'
    },
    required: {
      control: 'boolean',
      description: 'Champ requis'
    },
    label: {
      control: 'text',
      description: 'Label principal du switch'
    },
    leftLabel: {
      control: 'text',
      description: 'Label affiché à gauche du switch'
    },
    rightLabel: {
      control: 'text',
      description: 'Label affiché à droite du switch'
    },
    message: {
      control: 'text',
      description: 'Message affiché'
    },
    leftIcon: {
      control: false,
      description: 'Icône affichée à gauche'
    },
    rightIcon: {
      control: false,
      description: 'Icône affichée à droite'
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['outside', 'inside'],
      description: 'Position des labels'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Notifications',
    message: 'Activer les notifications push'
  }
}

export const WithValue: Story = {
  args: {
    label: 'Mode sombre',
    modelValue: true,
    message: 'Interface en mode sombre'
  }
}

export const WithRightLabel: Story = {
  args: {
    label: 'Mode sombre',
    rightLabel: 'Activé',
    message: 'Basculer vers le thème sombre'
  }
}

export const WithBothLabels: Story = {
  args: {
    label: 'Visibilité du profil',
    leftLabel: 'Privé',
    rightLabel: 'Public',
    message: 'Contrôler qui peut voir votre profil'
  }
}

export const States: Story = {
  render: () => ({
    components: { SwitchField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <SwitchField 
          label="État par défaut"
          rightLabel="Normal"
          message="Fonctionnement normal"
        />
        <SwitchField 
          state="error"
          label="État d'erreur"
          rightLabel="Erreur"
          message="Une erreur s'est produite"
          :modelValue="true"
        />
        <SwitchField 
          state="success"
          label="État de succès"
          rightLabel="Succès"
          message="Configuration sauvegardée !"
          :modelValue="true"
        />
        <SwitchField 
          state="warning"
          label="État d'avertissement"
          rightLabel="Attention"
          message="Cette action nécessite une confirmation"
          :modelValue="true"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { SwitchField },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <SwitchField 
          size="sm"
          label="Small"
          rightLabel="Petit"
        />
        <SwitchField 
          size="md"
          label="Medium"
          rightLabel="Moyen"
        />
        <SwitchField 
          size="lg"
          label="Large"
          rightLabel="Grand"
        />
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    label: 'Switch désactivé',
    rightLabel: 'Désactivé',
    disabled: true,
    modelValue: true,
    message: 'Ce switch est désactivé'
  }
}

export const Readonly: Story = {
  args: {
    label: 'Switch en lecture seule',
    rightLabel: 'Lecture seule',
    readonly: true,
    modelValue: false,
    message: 'Cette valeur ne peut pas être modifiée'
  }
}

export const Required: Story = {
  args: {
    label: 'Champ requis',
    rightLabel: 'Requis',
    required: true,
    message: 'Ce paramètre est obligatoire'
  }
}

export const WithCustomIcons: Story = {
  render: () => ({
    components: { SwitchField },
    setup() {
      return { SunIcon, MoonIcon, XMarkIcon, CheckIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <SwitchField 
          label="Mode sombre avec icônes"
          :leftIcon="SunIcon"
          :rightIcon="MoonIcon"
          message="Basculer entre les thèmes"
        />
        <SwitchField 
          label="Notifications avec icônes"
          :leftIcon="XMarkIcon"
          :rightIcon="CheckIcon"
          message="Activer/désactiver les notifications"
        />
      </div>
    `
  })
}

export const LabelPositions: Story = {
  render: () => ({
    components: { SwitchField },
    setup() {
      return { SunIcon, MoonIcon }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <div>
          <h4 style="margin-bottom: 1rem;">Labels à l'extérieur (défaut)</h4>
          <SwitchField 
            label="Mode sombre"
            leftLabel="Clair"
            rightLabel="Sombre"
            labelPosition="outside"
            :leftIcon="SunIcon"
            :rightIcon="MoonIcon"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Labels à l'intérieur</h4>
          <SwitchField 
            label="Mode sombre"
            leftLabel="Clair"
            rightLabel="Sombre"
            labelPosition="inside"
            :leftIcon="SunIcon"
            :rightIcon="MoonIcon"
          />
        </div>
      </div>
    `
  })
}

export const SettingsPanel: Story = {
  render: () => ({
    components: { SwitchField },
    template: `
      <div style="max-width: 500px; margin: 0 auto;">
        <h3 style="margin-bottom: 2rem;">Paramètres</h3>
        
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; color: #374151; font-weight: 600;">Interface</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <SwitchField 
              label="Mode sombre"
              leftLabel="Clair"
              rightLabel="Sombre"
              message="Basculer entre les thèmes clair et sombre"
            />
            <SwitchField 
              label="Sauvegarde automatique"
              rightLabel="Activée"
              message="Sauvegarder automatiquement vos modifications"
            />
          </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; color: #374151; font-weight: 600;">Confidentialité</h4>
          <SwitchField 
            label="Profil public"
            leftLabel="Privé"
            rightLabel="Public"
            message="Contrôler la visibilité de votre profil"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem; color: #374151; font-weight: 600;">Notifications</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <SwitchField 
              label="Notifications push"
              rightLabel="Activées"
              message="Recevoir des notifications en temps réel"
            />
            <SwitchField 
              label="Mises à jour par email"
              rightLabel="Activées"
              message="Recevoir les nouveautés par email"
            />
          </div>
        </div>
      </div>
    `
  })
}