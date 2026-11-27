import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'
import pkg from '../package.json'

// ============================================================
// Interface de Storybook : marque SurgeUI avec la version publiée
// (lue dans package/package.json, mis à jour par standard-version)
// et lien vers la documentation.
// ============================================================

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: `<span style="display:inline-flex;align-items:baseline;gap:8px;font-weight:700;letter-spacing:-0.01em">SurgeUI<span style="font:500 11px ui-monospace,SFMono-Regular,Menlo,monospace;color:#2563eb;padding:2px 6px;border:1px solid rgb(37 99 235 / 0.3);border-radius:999px">v${pkg.version}</span></span>`,
    brandUrl: 'https://surgeui.com/',
    brandTarget: '_blank',
    colorPrimary: '#2563eb',
    colorSecondary: '#2563eb'
  })
})
