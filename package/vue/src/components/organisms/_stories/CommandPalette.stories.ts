import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Cog6ToothIcon, DocumentPlusIcon, HomeIcon, MoonIcon, UserPlusIcon, ArchiveBoxIcon } from '@heroicons/vue/24/outline'
import CommandPalette from '../CommandPalette.vue'
import Button from '../../atoms/Button.vue'
import Kbd from '../../atoms/Kbd.vue'
import type { CommandItem } from '@/types'

const meta: Meta<typeof CommandPalette> = {
  title: 'Organisms/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Recherche et exécution de commandes (Ctrl / ⌘ + K) dans un SuDialog modal : champ combobox, liste groupée, ↑ / ↓ pour parcourir, Entrée pour exécuter, Échap pour fermer. Résultats triés par pertinence, nombre de résultats annoncé.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Ouverture (v-model:open)' },
    commands: { control: 'object', description: 'Commandes : id, label, group, description, icon, shortcut, keywords, disabled, onSelect' },
    placeholder: { control: 'text', description: 'Texte du champ de recherche' },
    hotkey: { control: 'text', description: 'Touche du raccourci avec Ctrl / ⌘ (false : aucun)' },
    emptyText: { control: 'text', description: 'Texte sans résultat' },
    ariaLabel: { control: 'text', description: 'Nom du dialog' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CommandPalette, Button, Kbd },
    setup() {
      const open = ref(false)
      const last = ref('—')
      const commands: CommandItem[] = [
        { id: 'home', label: 'Aller à l’accueil', group: 'Navigation', icon: HomeIcon, onSelect: () => (last.value = 'Accueil') },
        { id: 'settings', label: 'Paramètres', group: 'Navigation', icon: Cog6ToothIcon, keywords: ['préférences', 'compte'], shortcut: ['Ctrl', ','], onSelect: () => (last.value = 'Paramètres') },
        { id: 'new-doc', label: 'Nouveau document', group: 'Actions', icon: DocumentPlusIcon, shortcut: ['Ctrl', 'N'], onSelect: () => (last.value = 'Nouveau document') },
        { id: 'invite', label: 'Inviter un membre', group: 'Actions', icon: UserPlusIcon, description: 'Par e-mail ou lien de partage', onSelect: () => (last.value = 'Invitation') },
        { id: 'theme', label: 'Basculer en thème sombre', group: 'Préférences', icon: MoonIcon, keywords: ['dark', 'nuit'], onSelect: () => (last.value = 'Thème') },
        { id: 'archive', label: 'Archiver le projet', group: 'Actions', icon: ArchiveBoxIcon, disabled: true }
      ]
      return { open, last, commands }
    },
    template: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <Button variant="outline" @click="open = true">Ouvrir la palette <Kbd :keys="['Ctrl', 'K']" size="sm" style="margin-inline-start: 0.5rem" /></Button>
        <p style="margin: 0; font-size: 12px; color: var(--su-text-tertiary);">Dernière commande : {{ last }}</p>
      </div>
      <CommandPalette v-model:open="open" :commands="commands" />
    `
  })
}
