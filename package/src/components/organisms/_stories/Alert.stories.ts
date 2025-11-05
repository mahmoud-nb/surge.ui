import type { Meta, StoryObj } from '@storybook/vue3'
import Alert from '../Alert.vue'

const meta: Meta<typeof Alert> = {
  title: 'Organisms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info', 'neutral'],
      description: 'Type d\'alerte déterminant la couleur et l\'icône'
    },
    title: {
      control: { type: 'text' },
      description: 'Titre de l\'alerte'
    },
    description: {
      control: { type: 'text' },
      description: 'Description de l\'alerte'
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Si l\'alerte peut être fermée'
    },
    dismissLabel: {
      control: { type: 'text' },
      description: 'Label d\'accessibilité pour le bouton de fermeture'
    },
    ariaLive: {
      control: { type: 'select' },
      options: ['assertive', 'polite', 'off'],
      description: 'Politesse de l\'annonce screen reader'
    },
    ariaAtomic: {
      control: { type: 'boolean' },
      description: 'Indique si le screen reader doit lire tout le contenu'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'alerte'
    },
    onDismiss: {
      action: 'dismiss',
      description: 'Événement émis lors de la fermeture'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Le composant Alert permet d'afficher des messages importants et contextuels à l'utilisateur.

### Fonctionnalités d'accessibilité
- Rôle ARIA "alert" approprié
- Support des annonces screen reader avec aria-live
- Navigation au clavier complète
- Contraste des couleurs WCAG AA
- Support RTL, mode sombre et haute contraste
        `
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/design-system/alerts'
    }
  }
}

export default meta
type Story = StoryObj<typeof Alert>

// Stories de base
export const Default: Story = {
  args: {
    title: 'Titre de l\'alerte',
    description: 'Ceci est une description de l\'alerte avec un texte un peu plus long pour montrer comment le composant se comporte avec du contenu étendu.'
  }
}

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Succès',
    description: 'L\'opération a été réalisée avec succès.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisez ce type pour les messages de confirmation et les opérations réussies.'
      }
    }
  }
}

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Attention',
    description: 'Cette action est irréversible. Veuillez confirmer votre choix.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisez ce type pour les avertissements et les actions nécessitant une confirmation.'
      }
    }
  }
}

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Erreur',
    description: 'Une erreur s\'est produite lors du traitement de votre demande.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisez ce type pour les erreurs et les échecs d\'opération.'
      }
    }
  }
}

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    description: 'Nouvelle fonctionnalité disponible dans votre espace.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisez ce type pour les informations générales et les notifications.'
      }
    }
  }
}

export const Neutral: Story = {
  args: {
    type: 'neutral',
    title: 'Note importante',
    description: 'Ceci est une information neutre sans coloration particulière.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisez ce type pour les informations neutres sans connotation particulière.'
      }
    }
  }
}

// Stories avec fonctionnalités avancées
export const Dismissible: Story = {
  args: {
    type: 'info',
    title: 'Notification',
    description: 'Cette alerte peut être fermée en cliquant sur le bouton de fermeture.',
    dismissible: true,
    dismissLabel: 'Fermer cette notification'
  },
  parameters: {
    docs: {
      description: {
        story: 'Alertes qui peuvent être fermées par l\'utilisateur. Émet un événement `dismiss` lors de la fermeture.'
      }
    }
  }
}

export const WithActions: Story = {
  args: {
    type: 'warning',
    title: 'Action requise',
    description: 'Veuillez choisir une action parmi les options disponibles.'
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <Alert v-bind="args">
        <button class="storybook-button storybook-button--primary">Confirmer</button>
        <button class="storybook-button storybook-button--secondary">Annuler</button>
      </Alert>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Alertes avec des boutons d\'action dans le slot par défaut.'
      }
    }
  }
}

export const WithCustomContent: Story = {
  args: {
    type: 'success'
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <Alert v-bind="args">
        <template #title>
          <strong>Titre personnalisé</strong> avec <em>formatage</em>
        </template>
        <template #description>
          <p>Description avec <a href="#" class="storybook-link">un lien</a> et du contenu riche.</p>
          <ul style="margin-top: 8px; padding-left: 20px;">
            <li>Élément de liste 1</li>
            <li>Élément de liste 2</li>
            <li>Élément de liste 3</li>
          </ul>
        </template>
        <button class="storybook-button storybook-button--primary">Action principale</button>
        <button class="storybook-button storybook-button--secondary">Action secondaire</button>
      </Alert>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Alertes avec contenu personnalisé dans les slots title et description.'
      }
    }
  }
}

// Stories de taille
export const SmallSize: Story = {
  args: {
    size: 'sm',
    type: 'info',
    title: 'Petite alerte',
    description: 'Cette alerte utilise la taille small.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Version compacte de l\'alerte pour les espaces restreints.'
      }
    }
  }
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    type: 'warning',
    title: 'Alerte importante',
    description: 'Cette alerte utilise la taille large pour plus de visibilité.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Version plus grande pour les alertes importantes nécessitant plus d\'attention.'
      }
    }
  }
}

// Stories d'accessibilité
export const AssertiveAlert: Story = {
  args: {
    type: 'error',
    title: 'Erreur critique',
    description: 'Cette alerte utilise aria-live="assertive" pour une annonce immédiate.',
    ariaLive: 'assertive',
    ariaAtomic: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisez aria-live="assertive" pour les alertes critiques qui doivent interrompre l\'utilisateur.'
      }
    }
  }
}

export const PoliteAlert: Story = {
  args: {
    type: 'info',
    title: 'Information',
    description: 'Cette alerte utilise aria-live="polite" pour une annonce non intrusive.',
    ariaLive: 'polite',
    ariaAtomic: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Utilisez aria-live="polite" pour les informations non critiques.'
      }
    }
  }
}

// Stories d'état
export const TitleOnly: Story = {
  args: {
    type: 'info',
    title: 'Alerte avec titre uniquement',
    description: undefined
  },
  parameters: {
    docs: {
      description: {
        story: 'Alertes avec seulement un titre, utile pour les messages très courts.'
      }
    }
  }
}

export const DescriptionOnly: Story = {
  args: {
    type: 'info',
    title: undefined,
    description: 'Alerte avec description uniquement, sans titre.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Alertes avec seulement une description.'
      }
    }
  }
}

// Story de démonstration interactive
export const InteractiveDemo: Story = {
  args: {
    type: 'info',
    title: 'Alerte démo interactive',
    description: 'Modifiez les contrôles dans le panneau pour voir les changements en temps réel.',
    dismissible: false,
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Démonstration interactive permettant de tester toutes les props du composant.'
      }
    }
  }
}

// Story de groupe - Tous les types
export const AllTypes: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Alert type="success" title="Succès" description="Opération réalisée avec succès." />
        <Alert type="warning" title="Attention" description="Action nécessitant confirmation." />
        <Alert type="error" title="Erreur" description="Une erreur s'est produite." />
        <Alert type="info" title="Information" description="Nouvelle fonctionnalité disponible." />
        <Alert type="neutral" title="Note" description="Information générale sans coloration." />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Vue d\'ensemble de tous les types d\'alertes disponibles.'
      }
    }
  }
}

// Story de groupe - Toutes les tailles
export const AllSizes: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Alert size="sm" type="info" title="Petite alerte" description="Taille sm - compacte" />
        <Alert size="md" type="info" title="Alerte moyenne" description="Taille md - par défaut" />
        <Alert size="lg" type="info" title="Grande alerte" description="Taille lg - importante" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparaison des différentes tailles d\'alertes disponibles.'
      }
    }
  }
}