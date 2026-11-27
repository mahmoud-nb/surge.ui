import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ConfirmDialog from '../ConfirmDialog.vue'
import Button from '../../atoms/Button.vue'
import { useConfirm } from '@/composables/useConfirm'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Organisms/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Confirmations par promesse : `const { confirm } = useConfirm()` puis `if (await confirm({...}))`. SuConfirmDialog, placé une fois dans l’application, affiche les demandes une à une dans un `SuDialog` en `role="alertdialog"`. Échap, le fond ou Annuler répondent false ; `tone: "danger"` met le focus initial sur Annuler.'
      }
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ConfirmDialog, Button },
    setup() {
      const { confirm } = useConfirm()
      const result = ref('—')
      const publish = async () => {
        const ok = await confirm({ title: 'Publier l’article ?', description: 'Il sera visible par tous les lecteurs.', confirmLabel: 'Publier' })
        result.value = ok ? 'publié' : 'annulé'
      }
      const remove = async () => {
        const ok = await confirm({
          title: 'Supprimer le projet ?',
          description: 'Le projet et ses 24 fichiers seront supprimés définitivement.',
          confirmLabel: 'Supprimer',
          tone: 'danger'
        })
        result.value = ok ? 'supprimé' : 'annulé'
      }
      return { publish, remove, result }
    },
    template: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <div style="display: flex; gap: 0.5rem;">
          <Button variant="outline" @click="publish">Publier</Button>
          <Button variant="outline" @click="remove">Supprimer le projet</Button>
        </div>
        <p style="margin: 0; font-size: 14px; color: var(--su-text-tertiary);">Résultat : {{ result }}</p>
      </div>
      <ConfirmDialog />
    `
  })
}
