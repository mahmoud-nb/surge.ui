import type { Meta, StoryObj } from '@storybook/vue3'
import Toaster from '../Toaster.vue'
import Toast from '../../molecules/Toast.vue'
import Button from '../../atoms/Button.vue'
import Dialog from '../Dialog.vue'
import { useToast } from '@/composables/useToast'
import { ref } from 'vue'

const meta: Meta<typeof Toaster> = {
  title: 'Organisms/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pile des notifications de `useToast()`, à placer une fois dans l’application. Chaque toast est annoncé aux lecteurs d’écran (assertif pour une erreur) ; les délais sont suspendus au survol, au focus et quand l’onglet est masqué. Affichée en couche supérieure pour rester visible au-dessus d’un `SuDialog`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Coin de l’écran'
    },
    max: { control: { type: 'number', min: 1, max: 10 }, description: 'Nombre de toasts visibles' },
    duration: { control: { type: 'number', min: 0, step: 500 }, description: 'Durée par défaut (ms) ; 0 = persistant' },
    ariaLabel: { control: 'text', description: 'Nom de la zone (défaut : « Notifications »)' }
  },
  args: {
    position: 'bottom-right',
    max: 3,
    duration: 5000
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Toaster, Button },
    setup() {
      const toast = useToast()
      let count = 0
      const examples = {
        success: () => toast.success('Projet enregistré', { description: 'Vos modifications sont en ligne.' }),
        error: () => toast.error('Échec de l’envoi', { description: 'Vérifiez votre connexion puis réessayez.' }),
        warning: () => toast.warning('Quota presque atteint', { description: '90 % de l’espace utilisé.' }),
        info: () => toast.info(`Nouvelle version disponible (${++count})`),
        action: () => toast.show({
          title: 'Message archivé',
          action: { label: 'Annuler', onClick: () => toast.info('Archivage annulé') }
        }),
        persistent: () => toast.show({ title: 'Connexion perdue', type: 'error', duration: 0 }),
        progress: () => {
          const id = toast.show({ title: 'Export en cours…', duration: 0, dismissible: false })
          setTimeout(() => toast.update(id, { title: 'Export terminé', type: 'success', duration: 4000, dismissible: true }), 1500)
        }
      }
      return { args, examples, clear: () => toast.dismiss() }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; max-width: 34rem; justify-content: center;">
        <Button variant="outline" @click="examples.success">Succès</Button>
        <Button variant="outline" @click="examples.error">Erreur</Button>
        <Button variant="outline" @click="examples.warning">Avertissement</Button>
        <Button variant="outline" @click="examples.info">Info</Button>
        <Button variant="outline" @click="examples.action">Avec action</Button>
        <Button variant="outline" @click="examples.persistent">Persistant</Button>
        <Button variant="outline" @click="examples.progress">En cours → terminé</Button>
        <Button variant="ghost" @click="clear">Tout fermer</Button>
      </div>
      <Toaster v-bind="args" />
    `
  })
}

export const OverDialog: Story = {
  name: 'Au-dessus d’un Dialog',
  render: (args) => ({
    components: { Toaster, Button, Dialog },
    setup() {
      const toast = useToast()
      const open = ref(false)
      return { args, open, notify: () => toast.success('Enregistré depuis le dialog') }
    },
    template: `
      <Button @click="open = true">Ouvrir le dialog</Button>
      <Dialog v-model="open" title="Paramètres">
        <Button variant="outline" @click="notify">Afficher un toast</Button>
      </Dialog>
      <Toaster v-bind="args" />
    `
  })
}

export const ToastItems: Story = {
  name: 'Toast (élément seul)',
  render: () => ({
    components: { Toast },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 22rem;">
        <Toast :duration="0" type="success" title="Projet enregistré" description="Vos modifications sont en ligne." />
        <Toast :duration="0" type="error" title="Échec de l’envoi" description="Vérifiez votre connexion." />
        <Toast :duration="0" type="warning" title="Quota presque atteint" />
        <Toast :duration="0" type="info" title="Nouvelle version disponible" />
        <Toast :duration="0" title="Message archivé" :action="{ label: 'Annuler', onClick: () => {} }" />
      </div>
    `
  })
}
