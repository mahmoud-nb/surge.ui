import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
import SurgeUI, { locales } from '@surgeui/ds-vue'
import type { Router } from 'vitepress'
import '@surgeui/ds-vue/style.css'
import './custom.css'
// Mise en page : thème par défaut + pastille de version sur l'accueil
import Layout from './Layout.vue'
// Démos des layouts (cadre à largeur réglable, zones)
import LayoutFrame from './components/LayoutFrame.vue'
import LayoutBox from './components/LayoutBox.vue'
// Catégories de l'accueil (compteurs lus dans nav.ts)
import HomeCategories from './components/HomeCategories.vue'

// [spotlight] Halo sous le pointeur : position du pointeur dans la carte
// survolée (souris seulement, jamais au toucher)
const setupSpotlight = () => {
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return
    const card = (event.target as Element | null)?.closest?.('.lm-spotlight, .VPHome .VPFeature') as HTMLElement | null
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    card.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, { passive: true })
}

// Import global des icônes Heroicons les plus courantes
import {
  PlusIcon,
  TrashIcon,
  ArrowRightIcon,
  HeartIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
  StarIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  FlagIcon,
  HomeIcon,
  CogIcon,
  ArrowUturnLeftIcon
} from '@heroicons/vue/24/outline'

export default {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({ app, router }: { app: import('vue').App; router: Router }) {
    // Rendu aussi au build (SSR) : cartes de l’accueil
    app.component('HomeCategories', HomeCategories)

    if (inBrowser) {
      setupSpotlight()

      // Textes par défaut des composants dans la langue de la page :
      // anglais sous /en, français ailleurs. La route est réactive, la
      // locale suit donc le changement de langue sans rechargement.
      app.use(SurgeUI, {
        locale: () => (router.route.data.relativePath.startsWith('en/') ? locales.en : undefined)
      })
      app.component('LayoutFrame', LayoutFrame)
      app.component('LayoutBox', LayoutBox)

      // Enregistrement global des icônes courantes
      app.component('PlusIcon', PlusIcon)
      app.component('TrashIcon', TrashIcon)
      app.component('ArrowRightIcon', ArrowRightIcon)
      app.component('HeartIcon', HeartIcon)
      app.component('ShareIcon', ShareIcon)
      app.component('ArrowDownTrayIcon', ArrowDownTrayIcon)
      app.component('ArrowTopRightOnSquareIcon', ArrowTopRightOnSquareIcon)
      app.component('XMarkIcon', XMarkIcon)
      app.component('CheckIcon', CheckIcon)
      app.component('ExclamationTriangleIcon', ExclamationTriangleIcon)
      app.component('InformationCircleIcon', InformationCircleIcon)
      app.component('MagnifyingGlassIcon', MagnifyingGlassIcon)
      app.component('AtSymbolIcon', AtSymbolIcon)
      app.component('LockClosedIcon', LockClosedIcon)
      app.component('UserIcon', UserIcon)
      app.component('StarIcon', StarIcon)
      app.component('BuildingOfficeIcon', BuildingOfficeIcon)
      app.component('GlobeAltIcon', GlobeAltIcon)
      app.component('FlagIcon', FlagIcon)
      app.component('HomeIcon', HomeIcon)
      app.component('CogIcon', CogIcon)
      app.component('ArrowUturnLeftIcon', ArrowUturnLeftIcon)
    }
  }
}