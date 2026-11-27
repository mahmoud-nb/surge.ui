import type { Meta, StoryObj } from '@storybook/vue3'
import HolyGrailLayout from '../HolyGrailLayout.vue'
import { DemoBox, paragraphs } from './layoutDemo'

const meta: Meta<typeof HolyGrailLayout> = {
  title: 'Templates/HolyGrailLayout',
  component: HolyGrailLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Mise en page d\'application : en-tête, navigation, contenu principal, colonne complémentaire et pied de page (slots `header`, `nav`, `default`, `aside`, `footer`). Mobile first : tout est empilé ; dès un conteneur de 768px, navigation | contenu ; dès 1024px, trois colonnes. Régions sémantiques et lien d\'évitement intégrés.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    navWidth: { control: 'text', description: 'Largeur de la navigation (dès md)', table: { defaultValue: { summary: '15rem' } } },
    asideWidth: { control: 'text', description: 'Largeur de la colonne complémentaire (dès lg)', table: { defaultValue: { summary: '16rem' } } },
    stickyHeader: { control: 'boolean', description: 'En-tête collant', table: { defaultValue: { summary: 'false' } } },
    stickySidebars: { control: 'boolean', description: 'Navigation et complément collants (en colonnes)', table: { defaultValue: { summary: 'false' } } },
    stickyOffset: { control: 'text', description: 'Distance au haut de l\'écran des colonnes collantes', table: { defaultValue: { summary: '0px' } } },
    fullHeight: { control: 'boolean', description: 'Au moins la hauteur de l\'écran (pied de page en bas)', table: { defaultValue: { summary: 'true' } } },
    landmarks: { control: 'boolean', description: 'Régions sémantiques (header, nav, main, aside, footer) ; false : de simples div', table: { defaultValue: { summary: 'true' } } },
    skipLink: { control: 'boolean', description: 'Lien d\'évitement vers le contenu principal', table: { defaultValue: { summary: 'true' } } },
    skipLinkLabel: { control: 'text', description: 'Texte du lien d\'évitement', table: { defaultValue: { summary: 'Aller au contenu principal' } } },
    navLabel: { control: 'text', description: 'Nom accessible de la navigation', table: { defaultValue: { summary: 'Navigation principale' } } },
    asideLabel: { control: 'text', description: 'Nom accessible de la colonne complémentaire', table: { defaultValue: { summary: 'Informations complémentaires' } } },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Écart entre les zones',
      table: { defaultValue: { summary: 'lg' } }
    }
  },
  args: {
    navWidth: '15rem',
    asideWidth: '16rem',
    stickyHeader: false,
    stickySidebars: false,
    stickyOffset: '0px',
    fullHeight: true,
    landmarks: true,
    skipLink: true,
    gap: 'lg'
  }
}

export default meta
type Story = StoryObj<typeof meta>

const template = (withAside = true) => `
  <HolyGrailLayout v-bind="args" style="padding: 1rem;">
    <template #header>
      <DemoBox label="En-tête : logo, recherche, compte" height="56px" />
    </template>
    <template #nav>
      <DemoBox label="Navigation" height="200px" />
    </template>

    <h1 style="margin: 0 0 1rem; font-size: var(--su-font-size-2xl);">Contenu principal</h1>
    <DemoBox label="Contenu" height="160px" tone="accent" />
    <p v-for="(text, i) in paragraphs" :key="i" style="line-height: 1.7;">{{ text }}</p>

    ${withAside ? '<template #aside><DemoBox label="Complément : filtres, sommaire…" height="200px" /></template>' : ''}
    <template #footer>
      <DemoBox label="Pied de page" height="56px" />
    </template>
  </HolyGrailLayout>
`

export const Default: Story = {
  name: 'Trois colonnes',
  render: (args) => ({
    components: { HolyGrailLayout, DemoBox },
    setup: () => ({ args, paragraphs: paragraphs(4) }),
    template: template()
  })
}

export const Sticky: Story = {
  name: 'En-tête et colonnes collants',
  args: { stickyHeader: true, stickySidebars: true, stickyOffset: '5rem' },
  render: (args) => ({
    components: { HolyGrailLayout, DemoBox },
    setup: () => ({ args, paragraphs: paragraphs(14) }),
    template: template()
  })
}

export const WithoutAside: Story = {
  name: 'Sans colonne complémentaire',
  render: (args) => ({
    components: { HolyGrailLayout, DemoBox },
    setup: () => ({ args, paragraphs: paragraphs(4) }),
    template: template(false)
  })
}
