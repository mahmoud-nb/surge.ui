import { describe, expect, it } from 'vitest'
import vuePkg from '../package.json'
import relayPkg from '../../ds-vue/package.json'
import { writeVersion } from '../../ds-vue/scripts/version-updater.cjs'

// Le relais déprécié @surgeui/ds-vue doit rester aligné sur @surgeui/vue :
// même version, dépendance exacte, mêmes chemins d'import, même peer Vue.
describe('relais @surgeui/ds-vue', () => {
  it('suit la version de @surgeui/vue et en dépend exactement', () => {
    expect(relayPkg.version).toBe(vuePkg.version)
    expect(relayPkg.dependencies['@surgeui/vue']).toBe(vuePkg.version)
  })

  it('expose les mêmes chemins d’import', () => {
    expect(Object.keys(relayPkg.exports).sort()).toEqual(Object.keys(vuePkg.exports).sort())
  })

  it('demande la même version de Vue', () => {
    expect(relayPkg.peerDependencies).toEqual(vuePkg.peerDependencies)
  })

  it('met à jour version et dépendance à chaque release', () => {
    const next = JSON.parse(writeVersion(JSON.stringify(relayPkg, null, 2), '9.9.9'))
    expect(next.version).toBe('9.9.9')
    expect(next.dependencies['@surgeui/vue']).toBe('9.9.9')
  })
})
