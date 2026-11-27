# Migration vers la 4.0

La version 4.0.0 publie la bibliothèque sous un nouveau nom, **`@surgeui/vue`**, et retire les API dépréciées pendant la 3.x.

## Nouveau nom : @surgeui/vue

Seul le nom du paquet change pour l'import : les chemins, les feuilles de style et les types restent les mêmes.

| Avant | Après |
|-------|-------|
| `@surgeui/ds-vue` | `@surgeui/vue` |
| `@surgeui/ds-vue/style.css` | `@surgeui/vue/style.css` |
| `@surgeui/ds-vue/style.layer.css` | `@surgeui/vue/style.layer.css` |
| `@surgeui/ds-vue/tailwind.css` | `@surgeui/vue/tailwind.css` |
| `@surgeui/ds-vue/global` | `@surgeui/vue/global` |
| `@surgeui/ds-vue/types` | `@surgeui/vue/types` |

`@surgeui/ds-vue@4.0.0` est la dernière version publiée sous l'ancien nom : un relais qui dépend de `@surgeui/vue@4.0.0` et le réexporte. Les imports en `@surgeui/ds-vue` fonctionnent donc encore en 4.0.0, mais les versions suivantes ne sont publiées que sous `@surgeui/vue`.

### 1. Remplacer la dépendance

::: code-group

```bash [npm]
npm uninstall @surgeui/ds-vue
npm install @surgeui/vue
```

```bash [yarn]
yarn remove @surgeui/ds-vue
yarn add @surgeui/vue
```

```bash [pnpm]
pnpm remove @surgeui/ds-vue
pnpm add @surgeui/vue
```

:::

### 2. Mettre à jour les imports

Remplacez `@surgeui/ds-vue` par `@surgeui/vue` dans le code, les feuilles de style et la configuration (`tsconfig.json`, `nuxt.config.ts`, `vite.config.ts`…) :

```ts
// Avant
import SurgeUI, { locales } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'

// Après
import SurgeUI, { locales } from '@surgeui/vue'
import '@surgeui/vue/style.css'
```

Dans un dépôt Git, une seule commande suffit (GNU sed : Linux, Git Bash ; sous macOS, écrire `sed -i ''`) :

```bash
git grep -l "@surgeui/ds-vue" -- ":(exclude)*lock*" | xargs sed -i "s#@surgeui/ds-vue#@surgeui/vue#g"
```

### 3. Vérifier

`git grep "@surgeui/ds-vue"` ne doit plus rien trouver. Relancez ensuite le build, la vérification des types et les tests de l'application.

### Les deux noms en même temps

Pendant une migration progressive (monorepo, dépendance tierce encore sur l'ancien nom), les deux paquets peuvent cohabiter en 4.0.0. Le relais réexporte le même module : le plugin, les clés d'injection et les composables sont partagés. Deux précautions :

- gardez `@surgeui/vue` en **4.0.0** tant que `@surgeui/ds-vue` est installé : le relais dépend de cette version exacte, une autre version en installerait une seconde copie ;
- importez la feuille de style **une seule fois**, depuis l'un ou l'autre nom : le relais en contient une copie, l'importer deux fois l'ajouterait deux fois au bundle.

### L'ancien nom sur npm

- **3.3.0** : dernière version complète publiée sous `@surgeui/ds-vue`.
- **4.0.0** : premier `@surgeui/vue` ; `@surgeui/ds-vue@4.0.0` est un relais, puis l'ancien nom est marqué comme déprécié sur npm.
- **4.0.1 et suivantes** : publiées uniquement sous `@surgeui/vue`.
