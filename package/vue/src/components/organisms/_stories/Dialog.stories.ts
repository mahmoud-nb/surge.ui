import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
import Dialog from '../Dialog.vue'
import Button from '../../atoms/Button.vue'

const meta: Meta<typeof Dialog> = {
  title: 'Organisms/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen', // Utiliser fullscreen pour mieux visualiser les modales/tiroirs
    docs: {
      description: {
        component: 'Composant Dialog flexible qui peut servir de modale ou de tiroir (drawer) selon la prop `display`. Il supporte des slots pour l\'en-tête, le contenu et le pied de page, et gère l\'accessibilité (focus trap, ARIA).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Contrôle l\'état d\'ouverture/fermeture du Dialog (v-model)'
    },
    display: {
      control: { type: 'select' },
      options: ['center', 'start', 'end', 'top', 'bottom', 'full', 'left', 'right'],
      description: 'Mode d\'affichage du Dialog (modale centrée, tiroir latéral, etc.)'
    },
    title: {
      control: 'text',
      description: 'Titre du Dialog (utilisé dans le slot head par défaut et pour aria-labelledby)'
    },
    description: {
      control: 'text',
      description: 'Description du Dialog (utilisée pour aria-describedby)'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Permet de fermer le Dialog en cliquant sur l\'overlay'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Permet de fermer le Dialog avec la touche Escape'
    },
    width: {
      control: 'text',
      description: 'Largeur personnalisée du Dialog (ex: "500px", "80%")'
    },
    height: {
      control: 'text',
      description: 'Hauteur personnalisée du Dialog (ex: "400px", "90vh")'
    },
    disableScroll: {
      control: 'boolean',
      description: 'Désactive le défilement du corps de la page lorsque le Dialog est ouvert'
    },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onOpen: { action: 'open' },
    onClose: { action: 'close' },
  }
}

export default meta
type Story = StoryObj<typeof meta>

const createDialogStory = (args: any): Story => ({
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const isOpen = ref(args.modelValue)
      const openDialog = () => { isOpen.value = true }
      const closeDialog = () => { isOpen.value = false }

      // Watch for changes in args.modelValue to update internal isOpen state
      watch(() => args.modelValue, (newValue) => {
        isOpen.value = newValue
      })

      return { args, isOpen, openDialog, closeDialog }
    },
    template: `
      <div style="padding: 2rem; min-height: 100vh; background-color: #f8fafc;">
        <h1>Page de démonstration</h1>
        <p>Cliquez sur le bouton pour ouvrir le Dialog.</p>
        <Button @click="openDialog">Ouvrir le Dialog</Button>

        <Dialog v-bind="args" v-model="isOpen" @open="args.onOpen" @close="args.onClose">
          <template #head v-if="args.title">
            <h2 style="margin: 0; font-size: 1.5rem; font-weight: 600;">{{ args.title }}</h2>
          </template>
          <template #default>
            <p>{{ args.description || 'Ceci est le contenu principal du Dialog.' }}</p>
            <p>Vous pouvez placer n'importe quel contenu ici.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </template>
          <template #footer>
            <Button variant="secondary" @click="closeDialog">Annuler</Button>
            <Button variant="primary">Confirmer</Button>
          </template>
        </Dialog>
      </div>
    `,
  }),
  args,
})

export const CenterModal: Story = createDialogStory({
  modelValue: false,
  display: 'center',
  title: 'Titre de la Modale',
  description: 'Ceci est une description de la modale.',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  width: '500px',
  disableScroll: true,
})

export const LeftDrawer: Story = createDialogStory({
  modelValue: false,
  display: 'start',
  title: 'Tiroir Gauche',
  description: 'Contenu du tiroir latéral gauche.',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  width: '350px',
  disableScroll: true,
})

export const RightDrawer: Story = createDialogStory({
  modelValue: false,
  display: 'end',
  title: 'Tiroir Droit',
  description: 'Contenu du tiroir latéral droit.',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  width: '400px',
  disableScroll: true,
})

export const TopDrawer: Story = createDialogStory({
  modelValue: false,
  display: 'top',
  title: 'Tiroir Haut',
  description: 'Contenu du tiroir supérieur.',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  height: '200px',
  disableScroll: true,
})

export const BottomDrawer: Story = createDialogStory({
  modelValue: false,
  display: 'bottom',
  title: 'Tiroir Bas',
  description: 'Contenu du tiroir inférieur.',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  height: '300px',
  disableScroll: true,
})

export const FullScreen: Story = createDialogStory({
  modelValue: false,
  display: 'full',
  title: 'Plein Écran',
  description: 'Contenu en plein écran.',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  disableScroll: true,
})

export const CustomContent: Story = {
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div style="padding: 2rem; min-height: 100vh; background-color: #f8fafc;">
        <h1>Page avec contenu personnalisé</h1>
        <p>Cliquez sur le bouton pour ouvrir le Dialog avec des slots personnalisés.</p>
        <Button @click="isOpen = true">Ouvrir Dialog personnalisé</Button>

        <Dialog v-bind="args" v-model="isOpen">
          <template #head>
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <h3 style="margin: 0; color: #3b82f6;">🚀 Bienvenue !</h3>
              <Button variant="ghost" size="sm" @click="isOpen = false">Fermer</Button>
            </div>
          </template>
          <template #default>
            <p>Ce Dialog utilise des slots pour un contrôle total de son contenu.</p>
            <p>Vous pouvez y insérer des formulaires, des images, ou tout autre composant.</p>
            <img src="https://via.placeholder.com/300x150" alt="Placeholder" style="max-width: 100%; height: auto; margin-top: 1rem;">
          </template>
          <template #footer>
            <Button variant="outline" @click="isOpen = false">Plus tard</Button>
            <Button variant="primary" @click="isOpen = false">Commencer</Button>
          </template>
        </Dialog>
      </div>
    `,
  }),
  args: {
    display: 'center',
    width: '600px',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    disableScroll: true,
  }
}

export const NoOverlayClose: Story = createDialogStory({
  modelValue: false,
  display: 'center',
  title: 'Fermeture uniquement par bouton',
  description: 'Ce Dialog ne se ferme pas en cliquant sur l\'overlay.',
  closeOnOverlayClick: false,
  closeOnEscape: true,
})

export const NoEscapeClose: Story = createDialogStory({
  modelValue: false,
  display: 'center',
  title: 'Fermeture sans Escape',
  description: 'Ce Dialog ne se ferme pas avec la touche Escape.',
  closeOnOverlayClick: true,
  closeOnEscape: false,
})

export const NoScrollDisable: Story = createDialogStory({
  modelValue: false,
  display: 'center',
  title: 'Scroll activé',
  description: 'Le scroll de la page reste actif.',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  disableScroll: false,
})