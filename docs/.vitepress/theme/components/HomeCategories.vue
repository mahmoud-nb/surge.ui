<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { getNavItems } from '../../nav'

// ============================================================
// Catégories de l'accueil : une carte par section de la sidebar,
// avec le nombre réel de pages (lu dans nav.ts, jamais codé en dur).
// Effets Lumen : sheen, lift, spotlight (halo posé par le thème).
// ============================================================

const { lang } = useData()
const isEn = computed(() => lang.value === 'en')
const t = (fr: string, en: string) => (isEn.value ? en : fr)

// Icônes au trait (style Lucide), décoratives : [élément SVG, attributs]
type IconNode = [string, Record<string, string>]
const icons: Record<string, IconNode[]> = {
  display: [
    ['path', { d: 'M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0' }],
    ['circle', { cx: '12', cy: '12', r: '3' }]
  ],
  actions: [
    ['path', { d: 'M14 4.1 12 6' }],
    ['path', { d: 'm5.1 8-2.9-.8' }],
    ['path', { d: 'm6 12-1.9 2' }],
    ['path', { d: 'M7.2 2.2 8 5.1' }],
    ['path', { d: 'M9.04 9.69a.5.5 0 0 1 .65-.65l11 4.5a.5.5 0 0 1-.07.95l-4.35 1.04a1 1 0 0 0-.74.74l-1.04 4.35a.5.5 0 0 1-.95.07z' }]
  ],
  forms: [
    ['path', { d: 'M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1' }],
    ['path', { d: 'M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5' }],
    ['path', { d: 'M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1' }],
    ['path', { d: 'M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7' }],
    ['path', { d: 'M9 7v10' }]
  ],
  layouts: [
    ['rect', { width: '7', height: '9', x: '3', y: '3', rx: '1' }],
    ['rect', { width: '7', height: '5', x: '14', y: '3', rx: '1' }],
    ['rect', { width: '7', height: '9', x: '14', y: '12', rx: '1' }],
    ['rect', { width: '7', height: '5', x: '3', y: '16', rx: '1' }]
  ],
  composables: [
    ['polyline', { points: '16 18 22 12 16 6' }],
    ['polyline', { points: '8 6 2 12 8 18' }]
  ]
}

const categories = computed(() => {
  const code = isEn.value ? 'en' : 'fr'
  const prefix = isEn.value ? '/en' : ''
  const items = (section: string) => getNavItems(section, code) as { link: string }[]

  return [
    {
      id: 'display',
      title: t('Affichage', 'Display'),
      text: t('Titres, badges, dialogs, onglets, tableaux, toasts…', 'Headings, badges, dialogs, tabs, tables, toasts…'),
      link: `${prefix}/components/display`,
      count: items('display').length,
      unit: t('composants', 'components')
    },
    {
      id: 'actions',
      title: 'Actions',
      text: t('Boutons, liens, menus, fil d’Ariane, pagination…', 'Buttons, links, menus, breadcrumb, pagination…'),
      link: `${prefix}/components/actions`,
      count: items('actions').length,
      unit: t('composants', 'components')
    },
    {
      id: 'forms',
      title: t('Formulaires', 'Forms'),
      text: t('Champs, listes, dates, curseurs, fichiers…', 'Fields, selects, dates, sliders, files…'),
      link: `${prefix}/components/form`,
      count: items('forms').length,
      unit: t('composants', 'components')
    },
    {
      id: 'layouts',
      title: t('Mise en page', 'Layouts'),
      text: t('Grilles et gabarits de page mobile first.', 'Mobile-first grids and page templates.'),
      link: items('layouts')[0]?.link ?? `${prefix}/components/`,
      count: items('layouts').length,
      unit: t('gabarits', 'layouts')
    },
    {
      id: 'composables',
      title: 'Composables',
      text: t('Thème, langue, focus, annonces, listes au clavier…', 'Theme, locale, focus, announcements, keyboard lists…'),
      link: items('composables')[0]?.link ?? `${prefix}/composables/usetheme`,
      count: items('composables').length,
      unit: 'composables'
    }
  ]
})
</script>

<template>
  <div class="su-home-categories">
    <a
      v-for="category in categories"
      :key="category.id"
      :href="withBase(category.link)"
      class="su-home-card lm-spotlight"
    >
      <span class="su-home-card__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <component
            :is="node[0]"
            v-for="(node, index) in icons[category.id]"
            :key="index"
            v-bind="node[1]"
          />
        </svg>
      </span>
      <span class="su-home-card__title">{{ category.title }}</span>
      <span class="su-home-card__text">{{ category.text }}</span>
      <span class="su-home-card__meta">{{ category.count }} {{ category.unit }}</span>
    </a>
  </div>
</template>

<style scoped>
.su-home-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.su-home-card {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background:
    linear-gradient(90deg, transparent, var(--lm-highlight), transparent) 50% 0 / 68% 1px no-repeat,
    var(--lm-surface-grad),
    var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition: transform 0.45s var(--lm-ease), border-color 0.3s, box-shadow 0.3s;
}

.su-home-card:hover {
  transform: translateY(-4px);
  border-color: rgb(var(--lm-accent-rgb) / 0.35);
  box-shadow: var(--lm-shadow-soft);
}

.su-home-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.su-home-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid rgb(var(--lm-accent-rgb) / 0.2);
  border-radius: 10px;
  background: rgb(var(--lm-accent-rgb) / 0.08);
  color: var(--vp-c-brand-1);
}

.su-home-card__icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.su-home-card__title {
  color: var(--vp-c-text-1);
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.su-home-card__text {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.55;
}

.su-home-card__meta {
  margin-top: auto;
  padding-top: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .su-home-card {
    transition: none;
  }

  .su-home-card:hover {
    transform: none;
  }
}
</style>
