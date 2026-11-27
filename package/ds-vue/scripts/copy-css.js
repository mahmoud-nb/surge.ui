// Copie les feuilles de style de @surgeui/vue dans le relais : les chemins
// @surgeui/ds-vue/style.css, style.layer.css et tailwind.css restent valides
// sans dépendre de la résolution des @import par l'outil de build de l'application.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const source = resolve(here, '../../vue/dist')
const target = resolve(here, '../dist')
const files = ['style.css', 'style.layer.css', 'tailwind.css']

const missing = files.filter((file) => !existsSync(resolve(source, file)))
if (missing.length > 0) {
  console.error(`Fichiers absents de package/vue/dist : ${missing.join(', ')}. Lancer d'abord le build de package/vue.`)
  process.exit(1)
}

mkdirSync(target, { recursive: true })
for (const file of files) {
  copyFileSync(resolve(source, file), resolve(target, file))
}
console.log(`@surgeui/ds-vue : ${files.length} feuilles de style copiées depuis @surgeui/vue`)
