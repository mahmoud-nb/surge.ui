import type { Meta, StoryObj } from '@storybook/vue3'
import { ClipboardDocumentIcon, TrashIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import Tooltip from '../Tooltip.vue'
import Button from '../../atoms/Button.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Infobulle au survol et au focus clavier (`role="tooltip"`), reliée au déclencheur par `aria-describedby`. Survolable, fermée par Échap, sans ouverture au toucher. Le déclencheur doit être focusable ; l’infobulle ne contient que du texte (pour du contenu interactif, utiliser `SuPopover`).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: 'Texte de l’infobulle (ou slot `content`)' },
    placement: {
      control: { type: 'select' },
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
      description: 'Placement souhaité (retourné s’il manque de place)'
    },
    openDelay: { control: { type: 'number', min: 0, step: 50 }, description: 'Délai d’ouverture au survol (ms)' },
    closeDelay: { control: { type: 'number', min: 0, step: 50 }, description: 'Délai de fermeture (ms)' },
    showArrow: { control: 'boolean', description: 'Affiche une flèche' },
    disabled: { control: 'boolean', description: 'Désactive l’infobulle' },
    modelValue: { control: 'boolean', description: 'Ouverture contrôlée (v-model)' }
  },
  args: {
    content: 'Copier le lien',
    placement: 'top',
    openDelay: 300,
    closeDelay: 100,
    showArrow: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args, ClipboardDocumentIcon }),
    template: `
      <Tooltip v-bind="args">
        <Button variant="outline" :icon="ClipboardDocumentIcon" icon-display="only" aria-label="Copier" />
      </Tooltip>
    `
  })
}

export const Placements: Story = {
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 1rem; padding: 3rem;">
        <Tooltip v-for="placement in ['top', 'bottom', 'left', 'right']" :key="placement" :content="'Placement ' + placement" :placement="placement" show-arrow>
          <Button variant="outline">{{ placement }}</Button>
        </Tooltip>
      </div>
    `
  })
}

export const Toolbar: Story = {
  name: 'Barre d’outils (icônes seules)',
  render: () => ({
    components: { Tooltip, Button },
    setup: () => ({ ClipboardDocumentIcon, TrashIcon, ArrowUpTrayIcon }),
    template: `
      <div style="display: flex; gap: 0.25rem;">
        <Tooltip content="Copier">
          <Button variant="ghost" :icon="ClipboardDocumentIcon" icon-display="only" aria-label="Copier" />
        </Tooltip>
        <Tooltip content="Partager">
          <Button variant="ghost" :icon="ArrowUpTrayIcon" icon-display="only" aria-label="Partager" />
        </Tooltip>
        <Tooltip content="Supprimer définitivement">
          <Button variant="ghost" :icon="TrashIcon" icon-display="only" aria-label="Supprimer" />
        </Tooltip>
      </div>
    `
  })
}

export const RichContent: Story = {
  name: 'Contenu par slot',
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <Tooltip>
        <Button variant="outline">Enregistrer</Button>
        <template #content>Enregistrer <kbd style="font-family: inherit; opacity: .7;">Ctrl S</kbd></template>
      </Tooltip>
    `
  })
}

export const Controlled: Story = {
  name: 'Ouverture contrôlée',
  args: { modelValue: true, content: 'Toujours visible' },
  render: Default.render
}
