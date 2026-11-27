import type { Meta, StoryObj } from '@storybook/vue3'
import SkipLink from '../SkipLink.vue'

const meta: Meta<typeof SkipLink> = {
  title: 'Atoms/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Lien d’évitement (WCAG 2.4.1) : premier élément atteint au clavier, il mène au contenu principal sans repasser par l’en-tête et la navigation. Masqué jusqu’au focus clavier (touche Tab), il donne le focus à la cible par programme, sans dépendre du routage par ancre. Intégré à `SuAppShell` et `SuHolyGrailLayout`.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    target: { control: 'text', description: 'id de l’élément atteint (contenu principal)' },
    label: { control: 'text', description: 'Texte du lien (défaut : « Aller au contenu principal »)' }
  },
  args: { target: 'story-main' }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { SkipLink },
    setup: () => ({ args }),
    template: `
      <div>
        <SkipLink v-bind="args" />
        <p style="color: var(--su-text-secondary);">Cliquez ici, puis appuyez sur Tab : le lien apparaît en haut à gauche.</p>
        <nav aria-label="Démo" style="display: flex; gap: 1rem; margin-block: 1rem;">
          <a href="#">Accueil</a><a href="#">Projets</a><a href="#">Équipe</a>
        </nav>
        <main :id="args.target" style="padding: 1rem; border: 1px dashed var(--su-border-default); border-radius: var(--su-radius-control);">
          Contenu principal : il reçoit le focus quand on suit le lien.
        </main>
      </div>
    `
  })
}
