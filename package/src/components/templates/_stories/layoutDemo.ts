import { defineComponent, h, type PropType } from 'vue'

// Bloc de démonstration des stories de layouts : matérialise une zone
// (bordure pointillée, libellé) sans dépendre d'un vrai contenu.

export const DemoBox = defineComponent({
  name: 'DemoBox',
  props: {
    label: { type: String, default: '' },
    /** Hauteur minimale (longueur CSS) */
    height: { type: String, default: 'auto' },
    /** `accent` : zone mise en avant (contenu principal, à la une…) */
    tone: { type: String as PropType<'muted' | 'accent'>, default: 'muted' }
  },
  setup(props, { slots }) {
    return () => h('div', {
      style: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem',
        minHeight: props.height,
        padding: '1rem',
        border: '1px dashed',
        borderColor: props.tone === 'accent'
          ? 'color-mix(in srgb, var(--su-primary-default) 48%, transparent)'
          : 'var(--su-border-default)',
        borderRadius: 'var(--su-radius-control)',
        background: props.tone === 'accent'
          ? 'color-mix(in srgb, var(--su-primary-default) 10%, transparent)'
          : 'var(--su-bg-muted)',
        color: 'var(--su-text-secondary)',
        fontSize: 'var(--su-font-size-sm)',
        textAlign: 'center'
      }
    }, slots.default?.() ?? props.label)
  }
})

/** Paragraphes de remplissage */
export const paragraphs = (count: number) => Array.from({ length: count }, (_, i) =>
  `Paragraphe ${i + 1}. La longueur de ligne reste confortable à la lecture : ` +
  'environ soixante-cinq caractères, quelle que soit la largeur de l\'écran. ' +
  'Sur mobile, la colonne occupe toute la largeur avec une marge latérale.'
)

/** Hauteurs variées pour le mur (masonry) */
export const tileHeights = ['180px', '120px', '240px', '150px', '200px', '110px', '260px', '140px', '190px', '130px', '220px', '160px']
