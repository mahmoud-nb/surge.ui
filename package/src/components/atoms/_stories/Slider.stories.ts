import type { Meta, StoryObj } from '@storybook/vue3'
import Slider from '../Slider.vue'

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant Slider pour la sélection de valeurs numériques avec support du dual-range, orientation verticale/horizontale, tooltips, marques et accessibilité complète selon les normes W3C.'
      }
    },
    viewport: {
      width: 800,
      height: 300
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'object',
      description: 'Valeur du slider (nombre ou tableau pour dual-range)'
    },
    min: {
      control: 'number',
      description: 'Valeur minimale'
    },
    max: {
      control: 'number',
      description: 'Valeur maximale'
    },
    step: {
      control: 'number',
      description: 'Pas d\'incrémentation'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille du slider'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'État visuel'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le slider'
    },
    readonly: {
      control: 'boolean',
      description: 'Slider en lecture seule'
    },
    required: {
      control: 'boolean',
      description: 'Champ requis'
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation du slider'
    },
    tooltip: {
      control: { type: 'select' },
      options: ['none', 'top', 'bottom'],
      description: 'Position du tooltip'
    },
    marks: {
      control: 'object',
      description: 'Marques à afficher sur le slider'
    },
    showValue: {
      control: 'boolean',
      description: 'Afficher la valeur'
    },
    showTicks: {
      control: 'boolean',
      description: 'Afficher les graduations'
    },
    showLabels: {
      control: 'boolean',
      description: 'Afficher les labels min/max'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    modelValue: 40,
    showValue: true
  }
}

export const WithTooltip: Story = {
  args: {
    label: 'Volume avec tooltip',
    min: 0,
    max: 100,
    modelValue: 50,
    tooltip: 'top',
    showValue: false
  }
}

export const WithLabels: Story = {
  args: {
    label: 'Température',
    min: -10,
    max: 40,
    modelValue: 20,
    showValue: true,
    showLabels: true,
    formatValue: (value: number) => `${value}°C`
  }
}

export const WithTicks: Story = {
  args: {
    label: 'Note',
    min: 0,
    max: 10,
    step: 1,
    modelValue: 7,
    showValue: true,
    showTicks: true,
    showLabels: true
  }
}

export const WithMarks: Story = {
  args: {
    label: 'Niveau de difficulté',
    min: 0,
    max: 100,
    modelValue: 60,
    marks: [0, 25, 50, 75, 100],
    tooltip: 'top',
    formatValue: (value: number) => {
      if (value === 0) return 'Facile'
      if (value === 25) return 'Moyen'
      if (value === 50) return 'Difficile'
      if (value === 75) return 'Expert'
      if (value === 100) return 'Maître'
      return value.toString()
    }
  }
}

export const DualRange: Story = {
  args: {
    label: 'Fourchette de prix',
    min: 0,
    max: 1000,
    step: 10,
    modelValue: [200, 800],
    tooltip: 'top',
    showLabels: true,
    formatValue: (value: number) => `${value}€`
  }
}

export const DualRangeWithMarks: Story = {
  args: {
    label: 'Plage de température',
    min: 0,
    max: 40,
    step: 1,
    modelValue: [18, 24],
    marks: [0, 10, 18, 24, 30, 40],
    tooltip: 'bottom',
    showLabels: true,
    formatValue: (value: number) => `${value}°C`
  }
}

export const Vertical: Story = {
  args: {
    label: 'Volume vertical',
    min: 0,
    max: 100,
    modelValue: 75,
    orientation: 'vertical',
    tooltip: 'top',
    showLabels: true
  }
}

export const VerticalDual: Story = {
  args: {
    label: 'Plage verticale',
    min: 0,
    max: 100,
    modelValue: [30, 70],
    orientation: 'vertical',
    tooltip: 'top',
    showLabels: true
  }
}

export const WithSlots: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="width: 400px;">
        <Slider 
          label="Volume avec contrôles"
          :min="0"
          :max="100"
          :modelValue="60"
          tooltip="top"
        >
          <template #before>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem;">🔇</span>
              <span style="font-size: 0.875rem; color: #6b7280;">Silencieux</span>
            </div>
          </template>
          <template #after>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
              <span style="font-size: 0.875rem; color: #6b7280;">Fort</span>
              <span style="font-size: 1.5rem;">🔊</span>
            </div>
          </template>
        </Slider>
      </div>
    `
  })
}

export const RTLSupport2: Story = {
  args: {
    label: 'مستوى الصوت (RTL)',
    min: 0,
    max: 100,
    modelValue: 70,
    tooltip: 'top',
    showLabels: true,
    formatValue: (value: number) => `${value}%`
  }
}

export const RTLSupport: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div dir="rtl" style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
        <Slider 
          label="مستوى الصوت (RTL)"
          :min="0"
          :max="100"
          :modelValue="70"
          tooltip="top"
          showLabels
          formatValue="(value) => \`\${value}%\`"
        />
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 300px;">
        <Slider 
          size="sm"
          label="Small"
          :min="0"
          :max="100"
          :modelValue="25"
          tooltip="top"
        />
        <Slider 
          size="md"
          label="Medium"
          :min="0"
          :max="100"
          :modelValue="50"
          tooltip="top"
        />
        <Slider 
          size="lg"
          label="Large"
          :min="0"
          :max="100"
          :modelValue="75"
          tooltip="top"
        />
      </div>
    `
  })
}

export const States: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; width: 300px;">
        <Slider 
          label="État par défaut"
          :min="0"
          :max="100"
          :modelValue="50"
          tooltip="top"
          message="Ajustez la valeur"
        />
        <Slider 
          state="error"
          label="État d'erreur"
          :min="0"
          :max="100"
          :modelValue="90"
          tooltip="top"
          message="Valeur trop élevée"
        />
        <Slider 
          state="success"
          label="État de succès"
          :min="0"
          :max="100"
          :modelValue="75"
          tooltip="top"
          message="Valeur optimale !"
        />
        <Slider 
          state="warning"
          label="État d'avertissement"
          :min="0"
          :max="100"
          :modelValue="85"
          tooltip="top"
          message="Valeur proche de la limite"
        />
      </div>
    `
  })
}

export const CustomFormatting: Story = {
  args: {
    label: 'Pourcentage',
    min: 0,
    max: 1,
    step: 0.01,
    modelValue: 0.65,
    tooltip: 'bottom',
    formatValue: (value: number) => `${Math.round(value * 100)}%`
  }
}

export const PriceRange: Story = {
  args: {
    label: 'Fourchette de prix',
    min: 0,
    max: 2000,
    step: 50,
    modelValue: [300, 1200],
    tooltip: 'top',
    showLabels: true,
    marks: [0, 500, 1000, 1500, 2000],
    formatValue: (value: number) => `${value}€`
  }
}

export const VolumeControl: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div>
          <h4 style="margin-bottom: 1rem;">Volume horizontal</h4>
          <Slider 
            label="Volume"
            :min="0"
            :max="100"
            :modelValue="60"
            tooltip="top"
            :formatValue="(value) => value + '%'"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 1rem;">Volume vertical</h4>
          <Slider 
            label="Volume"
            :min="0"
            :max="100"
            :modelValue="60"
            orientation="vertical"
            tooltip="top"
            :formatValue="(value) => value + '%'"
          />
        </div>
      </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    label: 'Slider désactivé',
    min: 0,
    max: 100,
    modelValue: 50,
    disabled: true,
    showValue: true,
    message: 'Ce slider est désactivé'
  }
}

export const Readonly: Story = {
  args: {
    label: 'Slider en lecture seule',
    min: 0,
    max: 100,
    modelValue: 75,
    readonly: true,
    showValue: true,
    message: 'Cette valeur ne peut pas être modifiée'
  }
}

export const Required: Story = {
  args: {
    label: 'Niveau requis',
    min: 1,
    max: 10,
    modelValue: 5,
    required: true,
    tooltip: 'top',
    showTicks: true,
    message: 'Sélectionnez un niveau'
  }
}

export const AdvancedExample: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="max-width: 500px; margin: 0 auto;">
        <h3 style="margin-bottom: 2rem;">Filtres de recherche</h3>
        
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Slider 
            label="Fourchette de prix"
            :min="0"
            :max="5000"
            :step="100"
            :modelValue="[500, 2000]"
            tooltip="top"
            showLabels
            :marks="[0, 1000, 2000, 3000, 4000, 5000]"
            :formatValue="(value) => value + '€'"
            message="Définissez votre budget"
          />
          
          <Slider 
            label="Distance maximale"
            :min="0"
            :max="50"
            :step="5"
            :modelValue="20"
            tooltip="bottom"
            showTicks
            showLabels
            :formatValue="(value) => value + ' km'"
            message="Rayon de recherche"
          />
          
          <Slider 
            label="Note minimale"
            :min="1"
            :max="5"
            :step="0.5"
            :modelValue="3.5"
            tooltip="top"
            :marks="[1, 2, 3, 4, 5]"
            :formatValue="(value) => '★'.repeat(Math.floor(value)) + (value % 1 ? '☆' : '')"
            message="Note minimum souhaitée"
          >
            <template #before>
              <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.75rem; color: #6b7280;">
                <span>Mauvais</span>
                <span>Excellent</span>
              </div>
            </template>
          </Slider>
        </div>
      </div>
    `
  })
}