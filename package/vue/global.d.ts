// Types des composants enregistrés par `app.use(SurgeUI)` avec le préfixe
// par défaut « Su » : props, événements et slots de <SuButton>, <SuDialog>…
// vérifiés dans les templates (Volar, vue-tsc).
//
// tsconfig.json : { "compilerOptions": { "types": ["@surgeui/vue/global"] } }
//
// Autre préfixe : déclarer soi-même
//   declare module 'vue' { interface GlobalComponents extends SurgeGlobalComponents<'Ui'> {} }
import type { SurgeGlobalComponents } from './dist/index'

declare module 'vue' {
  export interface GlobalComponents extends SurgeGlobalComponents<'Su'> {}
}

export {}
