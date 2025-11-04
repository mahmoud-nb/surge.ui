// Spinner.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import Spinner from '../Spinner.vue';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['classic', 'modern', 'dots', 'pulse', 'bars'],
      description: 'Type de spinner à afficher'
    },
    size: {
      control: { type: 'number' },
      description: 'Taille du spinner en pixels'
    },
    color: {
      control: { type: 'color' },
      description: 'Couleur du spinner'
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Épaisseur du trait (pour les types classic et modern)'
    },
    speed: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Vitesse de l\'animation en secondes'
    },
    label: {
      control: { type: 'text' },
      description: 'Texte accessibilité'
    },
    fill: {
      control: { type: 'text' },
      description: 'Couleur de fond (pour SVG)'
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Un composant Spinner moderne et accessible pour afficher des états de chargement'
      }
    }
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    label: 'Chargement en cours...'
  }
};

// Tous les types de spinners
export const AllTypes: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      const types = ['classic', 'modern', 'dots', 'pulse', 'bars'] as const;
      return { args, types };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; padding: 2rem;">
        <div v-for="type in types" :key="type" style="text-align: center;">
          <Spinner :type="type" :label="'Type: ' + type" />
          <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">{{ type }}</div>
        </div>
      </div>
    `
  })
};

// Spinner Classique
export const Classic: Story = {
  args: {
    type: 'classic',
    size: 40,
    thickness: 3,
    color: '#3b82f6',
    label: 'Chargement classique...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner classique avec un cercle animé en continu'
      }
    }
  }
};

// Spinner Moderne
export const Modern: Story = {
  args: {
    type: 'modern',
    size: 48,
    thickness: 4,
    color: '#8b5cf6',
    speed: 1.5,
    label: 'Chargement moderne...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner moderne avec effet de dash animé'
      }
    }
  }
};

// Spinner à Points
export const Dots: Story = {
  args: {
    type: 'dots',
    size: 32,
    color: '#10b981',
    label: 'Chargement avec points...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Animation de points rebondissants'
      }
    }
  }
};

// Spinner Pulse
export const Pulse: Story = {
  args: {
    type: 'pulse',
    size: 36,
    color: '#f59e0b',
    speed: 1.2,
    label: 'Chargement pulsé...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Effet de pulsation simple et élégant'
      }
    }
  }
};

// Spinner Barres
export const Bars: Story = {
  args: {
    type: 'bars',
    size: 40,
    color: '#ef4444',
    label: 'Chargement avec barres...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Animation de barres ondulantes'
      }
    }
  }
};

// Variations de taille
export const Sizes: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      const sizes = [16, 24, 32, 48, 64, 80];
      return { args, sizes };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; padding: 2rem;">
        <div v-for="size in sizes" :key="size" style="text-align: center;">
          <Spinner :size="size" :label="'Taille: ' + size + 'px'" />
          <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #666;">{{ size }}px</div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Différentes tailles de spinner disponibles'
      }
    }
  }
};

// Variations de couleurs
export const Colors: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      const colors = [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
        '#06b6d4', '#84cc16', '#ec4899', '#000000', '#64748b'
      ];
      return { args, colors };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; padding: 2rem;">
        <div v-for="color in colors" :key="color" style="text-align: center;">
          <Spinner :color="color" :label="'Couleur: ' + color" />
          <div 
            style="margin-top: 0.5rem; font-size: 0.75rem; color: #666; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
          >
            <div :style="{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '2px' }"></div>
            {{ color }}
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Spinners avec différentes couleurs personnalisées'
      }
    }
  }
};

// Variations de vitesse
export const Speeds: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      const speeds = [0.5, 1, 1.5, 2, 3];
      return { args, speeds };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; padding: 2rem;">
        <div v-for="speed in speeds" :key="speed" style="text-align: center;">
          <Spinner :speed="speed" :label="'Vitesse: ' + speed + 's'" />
          <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #666;">{{ speed }}s</div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Différentes vitesses d\'animation'
      }
    }
  }
};

// Avec labels personnalisés
export const WithLabels: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      const examples = [
        { label: 'Chargement des données...', type: 'modern' as const },
        { label: 'Traitement en cours...', type: 'dots' as const },
        { label: 'Veuillez patienter...', type: 'pulse' as const },
        { label: 'Mise à jour...', type: 'bars' as const }
      ];
      return { args, examples };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem;">
        <div v-for="(example, index) in examples" :key="index" style="display: flex; align-items: center; gap: 1rem;">
          <Spinner :type="example.type" :label="example.label" />
          <span style="color: #374151;">{{ example.label }}</span>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Spinners avec différents labels textuels'
      }
    }
  }
};

// Usage dans un contexte réel
export const InContext: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 2rem; max-width: 400px; margin: 0 auto;">
        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 2rem; text-align: center;">
          <h3 style="margin-bottom: 1rem; color: #1f2937;">Chargement du profil</h3>
          <div style="margin-bottom: 1.5rem;">
            <Spinner type="modern" size="48" color="#3b82f6" />
          </div>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">Récupération de vos informations...</p>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <Spinner type="dots" size="16" color="#10b981" />
            <span style="font-size: 0.875rem; color: #6b7280;">Chargement des données utilisateur</span>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'utilisation dans un contexte réel'
      }
    }
  }
};

// Accessibilité
export const Accessibility: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 2rem;">
        <div style="margin-bottom: 2rem;">
          <h3 style="margin-bottom: 1rem;">Avec label accessible</h3>
          <Spinner label="Chargement des données du tableau de bord" hide-label />
          <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
            Le label est lu par les technologies d'assistance mais masqué visuellement.
          </p>
        </div>
        
        <div style="background: #f3f4f6; padding: 1rem; border-radius: 4px;">
          <h4 style="margin-bottom: 0.5rem;">Note d'accessibilité :</h4>
          <ul style="font-size: 0.875rem; color: #374151; margin: 0; padding-left: 1.25rem;">
            <li>Le composant utilise <code>role="status"</code> et <code>aria-live="polite"</code></li>
            <li>Respecte les préférences de réduction d'animation</li>
            <li>Les labels sont masqués visuellement mais accessibles aux lecteurs d'écran</li>
            <li>Support complet du contraste des couleurs</li>
          </ul>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Fonctionnalités d\'accessibilité du composant Spinner'
      }
    }
  }
};