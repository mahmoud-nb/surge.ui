import type { Meta, StoryObj } from '@storybook/vue3'
import Prose from '../Prose.vue'

const content = `
  <h2>Installer SurgeUI</h2>
  <p>SurgeUI s’installe avec npm. Le paquet <code>@surgeui/vue</code> fournit les composants, les styles et les types ; voir le <a href="#">guide d’installation</a>.</p>
  <pre><code>npm install @surgeui/vue</code></pre>
  <h3>Prérequis</h3>
  <ul>
    <li>Vue <strong>3.5</strong> ou plus récent</li>
    <li>Un outil de build qui importe le CSS (Vite, Nuxt)
      <ul><li>Tailwind CSS 4 en option</li></ul>
    </li>
  </ul>
  <ol>
    <li>Installer le paquet</li>
    <li>Enregistrer le plugin</li>
    <li>Importer la feuille de style</li>
  </ol>
  <blockquote><p>Les composants suivent les motifs ARIA : clavier, lecteurs d’écran, préférences de mouvement.</p></blockquote>
  <h3>Options du plugin</h3>
  <table>
    <thead><tr><th>Option</th><th>Type</th><th>Défaut</th></tr></thead>
    <tbody>
      <tr><td><code>prefix</code></td><td><code>string</code></td><td><code>'Su'</code></td></tr>
      <tr><td><code>locale</code></td><td><code>SurgeLocale</code></td><td>français</td></tr>
    </tbody>
  </table>
  <p>Appuyez sur <kbd>Ctrl</kbd> + <kbd>K</kbd> pour ouvrir la palette de commandes. <mark>Nouveau</mark> en 4.0.</p>
  <hr>
  <p><small>Dernière mise à jour : novembre 2026.</small></p>
`

const meta: Meta<typeof Prose> = {
  title: 'Atoms/Prose',
  component: Prose,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typographie d’un contenu rédigé (Markdown, CMS) : titres, paragraphes, listes, citations, code, tableaux, images. La classe `.su-prose` s’utilise aussi seule, sur un élément qui reçoit du HTML de confiance. Sélecteurs `:where()` (faciles à surcharger), propriétés logiques (RTL).'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text', description: 'Élément rendu (div, article, section…)' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Taille du texte' }
  },
  args: { as: 'article' }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Prose },
    setup: () => ({ args, content }),
    template: `<Prose v-bind="args" style="max-inline-size: 42rem;"><div v-html="content" /></Prose>`
  })
}
