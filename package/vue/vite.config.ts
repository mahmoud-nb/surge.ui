/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// dist/style.layer.css : la même feuille dans la couche `surgeui`. Hors
// couche, elle l'emporterait sur toutes les couches (utilitaires Tailwind 4
// compris) ; en couche, l'application choisit sa place dans l'ordre :
//   @layer theme, base, surgeui, components, utilities;
// Sans @charset : ce fichier est fait pour être importé (@import), et
// l'import le placerait au milieu de la feuille finale, où il est invalide
// (esbuild l'y signale). L'encodage est celui du document (UTF-8).
const cssLayer = (layer = 'surgeui'): Plugin => ({
  name: 'surgeui-css-layer',
  apply: 'build',
  closeBundle() {
    const source = resolve(__dirname, 'dist/style.css')
    if (!existsSync(source)) return
    const css = readFileSync(source, 'utf8').replace(/^@charset "UTF-8";\s*/, '')
    writeFileSync(resolve(__dirname, 'dist/style.layer.css'), `@layer ${layer} {\n${css}\n}\n`)
  }
})

// dist/tailwind.css : préréglage Tailwind 4 (@theme inline), copié tel quel
// (Tailwind le lit dans le CSS de l'application, il ne passe pas par Sass)
const tailwindPreset = (): Plugin => ({
  name: 'surgeui-tailwind-preset',
  apply: 'build',
  closeBundle() {
    copyFileSync(resolve(__dirname, 'src/styles/tailwind.css'), resolve(__dirname, 'dist/tailwind.css'))
  }
})

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: false,
      rollupTypes: false
    }),
    cssLayer(),
    tailwindPreset()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SurgeUI',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    cssCodeSplit: false
  },
  // Tests unitaires : composants montés dans un DOM simulé (happy-dom)
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.spec.ts'],
    css: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})