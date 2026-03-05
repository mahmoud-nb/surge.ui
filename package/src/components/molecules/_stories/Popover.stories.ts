import type { Meta, StoryObj } from '@storybook/vue3';
import Popover from '../Popover.vue';
import { ref } from 'vue';

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Position du popover par rapport au déclencheur',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'focus', 'manual'],
      description: 'Méthode de déclenchement du popover',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'click' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: 'Affiche ou masque la flèche',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closable: {
      control: 'boolean',
      description: 'Affiche un bouton de fermeture',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Ferme le popover lors d\'un clic à l\'extérieur',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Ferme le popover avec la touche Échap',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    modal: {
      control: 'boolean',
      description: 'Active le mode modal avec arrière-plan',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Ferme le popover lors d\'un clic sur l\'arrière-plan',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le popover',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    openDelay: {
      control: 'number',
      description: 'Délai avant l\'ouverture (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    closeDelay: {
      control: 'number',
      description: 'Délai avant la fermeture (ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Label ARIA pour le popover',
      table: {
        type: { summary: 'string' },
      },
    },
    closeAriaLabel: {
      control: 'text',
      description: 'Label ARIA pour le bouton de fermeture',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Fermer' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Version légère du composant Popover utilisant uniquement du CSS pour le positionnement. Idéal pour des cas d\'usage simples sans dépendances externes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <Popover v-bind="args">
          <template #trigger>
            <button style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
              Cliquez-moi
            </button>
          </template>
          <template #default>
            <div>
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Titre du Popover</h3>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Ceci est le contenu du popover. Version légère sans dépendances.
              </p>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    closable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple basique d\'un popover avec déclenchement au clic.',
      },
    },
  },
};

export const WithCloseButton: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <Popover v-bind="args">
          <template #trigger>
            <button style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
              Ouvrir avec bouton fermer
            </button>
          </template>
          <template #default>
            <div>
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Information</h3>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Ce popover peut être fermé avec le bouton X ou en cliquant à l'extérieur.
              </p>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom',
    closable: true,
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover avec un bouton de fermeture intégré dans le coin supérieur.',
      },
    },
  },
};

export const HoverTrigger: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <Popover v-bind="args">
          <template #trigger>
            <span style="padding: 8px 16px; background: #10b981; color: white; border-radius: 6px; cursor: pointer; display: inline-block; font-family: system-ui;">
              Survolez-moi
            </span>
          </template>
          <template #default>
            <div>
              <p style="margin: 0; font-size: 14px;">
                Ce popover s'ouvre au survol de la souris avec un délai de 200ms.
              </p>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    trigger: 'hover',
    placement: 'top',
    showArrow: true,
    openDelay: 200,
    closeDelay: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover qui s\'ouvre au survol avec des délais configurables pour éviter les ouvertures accidentelles.',
      },
    },
  },
};

export const FocusTrigger: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <Popover v-bind="args">
          <template #trigger>
            <input 
              type="text" 
              placeholder="Focus sur ce champ"
              style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; font-family: system-ui;"
            />
          </template>
          <template #default>
            <div>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                💡 Conseil : Tapez au moins 8 caractères pour un mot de passe sécurisé.
              </p>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    trigger: 'focus',
    placement: 'bottom-start',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover qui s\'ouvre lorsque l\'élément reçoit le focus, idéal pour les champs de formulaire avec des conseils.',
      },
    },
  },
};

export const ControlledMode: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <div style="margin-bottom: 16px;">
          <button 
            @click="isOpen = !isOpen"
            style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 8px; font-family: system-ui;"
          >
            {{ isOpen ? 'Fermer' : 'Ouvrir' }} le Popover
          </button>
          <span style="font-size: 14px; color: #6b7280; font-family: system-ui;">État: {{ isOpen ? 'Ouvert' : 'Fermé' }}</span>
        </div>
        
        <Popover v-bind="args" v-model="isOpen" trigger="manual">
          <template #trigger>
            <button style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
              Élément cible
            </button>
          </template>
          <template #default="{ close }">
            <div>
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Mode contrôlé</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">
                Ce popover est contrôlé par v-model.
              </p>
              <button 
                @click="close"
                style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-family: system-ui;"
              >
                Fermer depuis l'intérieur
              </button>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover en mode contrôlé avec v-model, permettant de gérer l\'ouverture/fermeture depuis l\'extérieur.',
      },
    },
  },
};

export const ModalMode: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <Popover v-bind="args">
          <template #trigger>
            <button style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
              Ouvrir en mode modal
            </button>
          </template>
          <template #default="{ close }">
            <div>
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Confirmation</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #6b7280;">
                Êtes-vous sûr de vouloir continuer cette action ?
              </p>
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button 
                  @click="close"
                  style="padding: 6px 12px; background: #e5e7eb; color: #374151; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui;"
                >
                  Annuler
                </button>
                <button 
                  @click="close"
                  style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui;"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom',
    modal: true,
    closable: true,
    closeOnBackdropClick: true,
    showArrow: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover en mode modal avec un arrière-plan sombre et piégeage du focus pour les dialogues de confirmation.',
      },
    },
  },
};

export const AllPlacements: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 250px; display: flex; flex-direction: column; gap: 100px; align-items: center;">
        <!-- Top Placements -->
        <div style="display: flex; gap: 16px;">
          <Popover placement="top">
            <template #trigger>
              <button style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                Top
              </button>
            </template>
            <template #default>
              <div style="padding: 8px; font-family: system-ui;">Placement: Top</div>
            </template>
          </Popover>

          <Popover placement="top-start">
            <template #trigger>
              <button style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                Top Start
              </button>
            </template>
            <template #default>
              <div style="padding: 8px; font-family: system-ui;">Placement: Top Start</div>
            </template>
          </Popover>

          <Popover placement="top-end">
            <template #trigger>
              <button style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                Top End
              </button>
            </template>
            <template #default>
              <div style="padding: 8px; font-family: system-ui;">Placement: Top End</div>
            </template>
          </Popover>
        </div>

        <!-- Bottom Placements -->
        <div style="display: flex; gap: 16px;">
          <Popover placement="bottom">
            <template #trigger>
              <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                Bottom
              </button>
            </template>
            <template #default>
              <div style="padding: 8px; font-family: system-ui;">Placement: Bottom</div>
            </template>
          </Popover>

          <Popover placement="bottom-start">
            <template #trigger>
              <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                Bottom Start
              </button>
            </template>
            <template #default>
              <div style="padding: 8px; font-family: system-ui;">Placement: Bottom Start</div>
            </template>
          </Popover>

          <Popover placement="bottom-end">
            <template #trigger>
              <button style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                Bottom End
              </button>
            </template>
            <template #default>
              <div style="padding: 8px; font-family: system-ui;">Placement: Bottom End</div>
            </template>
          </Popover>
        </div>

        <!-- Left & Right Placements -->
        <div style="display: flex; gap: 100px;">
          <!-- Left -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Popover placement="left">
              <template #trigger>
                <button style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                  Left
                </button>
              </template>
              <template #default>
                <div style="padding: 8px; font-family: system-ui;">Placement: Left</div>
              </template>
            </Popover>

            <Popover placement="left-start">
              <template #trigger>
                <button style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                  Left Start
                </button>
              </template>
              <template #default>
                <div style="padding: 8px; font-family: system-ui;">Placement: Left Start</div>
              </template>
            </Popover>

            <Popover placement="left-end">
              <template #trigger>
                <button style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                  Left End
                </button>
              </template>
              <template #default>
                <div style="padding: 8px; font-family: system-ui;">Placement: Left End</div>
              </template>
            </Popover>
          </div>

          <!-- Right -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Popover placement="right">
              <template #trigger>
                <button style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                  Right
                </button>
              </template>
              <template #default>
                <div style="padding: 8px; font-family: system-ui;">Placement: Right</div>
              </template>
            </Popover>

            <Popover placement="right-start">
              <template #trigger>
                <button style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                  Right Start
                </button>
              </template>
              <template #default>
                <div style="padding: 8px; font-family: system-ui;">Placement: Right Start</div>
              </template>
            </Popover>

            <Popover placement="right-end">
              <template #trigger>
                <button style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
                  Right End
                </button>
              </template>
              <template #default>
                <div style="padding: 8px; font-family: system-ui;">Placement: Right End</div>
              </template>
            </Popover>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Démonstration de tous les 12 placements possibles du popover avec positionnement CSS pur.',
      },
    },
  },
};

export const UserMenu: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <Popover v-bind="args">
          <template #trigger>
            <button style="padding: 8px 16px; background: #ec4899; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
              Profil utilisateur
            </button>
          </template>
          <template #default>
            <div style="min-width: 280px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                <div>
                  <div style="font-weight: 600; font-size: 14px; font-family: system-ui;">Marie Dupont</div>
                  <div style="font-size: 12px; color: #6b7280; font-family: system-ui;">marie.dupont@example.com</div>
                </div>
              </div>
              <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
                <button style="width: 100%; padding: 8px; text-align: left; background: transparent; border: none; cursor: pointer; font-size: 14px; border-radius: 4px; transition: background 0.2s; font-family: system-ui;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                  📊 Tableau de bord
                </button>
                <button style="width: 100%; padding: 8px; text-align: left; background: transparent; border: none; cursor: pointer; font-size: 14px; border-radius: 4px; transition: background 0.2s; font-family: system-ui;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                  ⚙️ Paramètres
                </button>
                <button style="width: 100%; padding: 8px; text-align: left; background: transparent; border: none; cursor: pointer; font-size: 14px; border-radius: 4px; transition: background 0.2s; color: #ef4444; font-family: system-ui;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='transparent'">
                  🚪 Déconnexion
                </button>
              </div>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom-end',
    showArrow: true,
    closable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple de popover avec un menu utilisateur personnalisé, idéal pour les profils.',
      },
    },
  },
};

export const WithForm: Story = {
  render: (args) => ({
    components: { Popover },
    setup() {
      const name = ref('');
      const comment = ref('');
      
      const handleSubmit = (close: () => void) => {
        console.log('Formulaire soumis:', { name: name.value, comment: comment.value });
        name.value = '';
        comment.value = '';
        close();
      };
      
      return { args, name, comment, handleSubmit };
    },
    template: `
      <div style="padding: 150px; text-align: center;">
        <Popover v-bind="args">
          <template #trigger>
            <button style="padding: 8px 16px; background: #14b8a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: system-ui;">
              Ajouter un commentaire
            </button>
          </template>
          <template #default="{ close }">
            <div style="min-width: 320px;">
              <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; font-family: system-ui;">Nouveau commentaire</h3>
              <form @submit.prevent="handleSubmit(close)">
                <div style="margin-bottom: 12px;">
                  <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500; text-align: left; font-family: system-ui;">Nom</label>
                  <input 
                    v-model="name"
                    type="text" 
                    placeholder="Votre nom"
                    required
                    style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; font-family: system-ui;"
                  />
                </div>
                <div style="margin-bottom: 12px;">
                  <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500; text-align: left; font-family: system-ui;">Commentaire</label>
                  <textarea 
                    v-model="comment"
                    placeholder="Votre commentaire..."
                    rows="3"
                    required
                    style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; resize: vertical; font-family: system-ui;"
                  ></textarea>
                </div>
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                  <button 
                    type="button"
                    @click="close"
                    style="padding: 6px 12px; background: #e5e7eb; color: #374151; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui;"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    style="padding: 6px 12px; background: #14b8a6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-family: system-ui;"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom',
    closable: true,
    closeOnClickOutside: false,
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover contenant un formulaire. Le `closeOnClickOutside` est désactivé pour éviter les pertes de données accidentelles.',
      },
    },
  },
};

