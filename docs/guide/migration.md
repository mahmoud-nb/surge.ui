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

## API retirées

Ces API étaient dépréciées pendant la 3.x. Elles sont supprimées en 4.0.0 :

| Retirée | Remplacement |
|---------|--------------|
| `useTheme().toggleTheme()` | `toggleMode()` |
| `setTheme('light')`, `setTheme('dark')` | `setTheme('default')` pour l'identité, puis `setThemeMode('light')` ou `setThemeMode('dark')` |
| Type `DeprecatedThemeName` | `ThemeName` (identité de couleur) et `ThemeMode` (luminosité) |
| `accessibility.trapFocus(container)` | `createFocusTrap(container)` puis `activate()`, ou `useFocusTrap()` dans un composant |
| `accessibility.announceToScreenReader(message, priority)` | `announce(message, { priority })`, ou `useAnnouncer()` dans un composant |
| Option de `SuDropdown` `separator: true` | `{ type: 'separator' }` pour un séparateur seul, `separatorBefore: true` pour un trait avant une option |
| Prop `zIndex` de `SuDialog` | Aucun : elle était sans effet, le dialog s'ouvre dans la couche supérieure du navigateur |

```ts
// Avant
import { accessibility } from '@surgeui/ds-vue'

const release = accessibility.trapFocus(panel)
accessibility.announceToScreenReader('Modifications enregistrées', 'polite')

// Après
import { createFocusTrap, announce } from '@surgeui/vue'

const trap = createFocusTrap(panel, { returnFocus: false })
trap.activate()
const release = trap.deactivate
announce('Modifications enregistrées', { priority: 'polite' })
```

À noter :

- `createFocusTrap()` rend par défaut le focus à l'élément qui l'avait avant l'activation ; `{ returnFocus: false }` reproduit l'ancien comportement de `trapFocus()`.
- Une option de menu qui garde `separator: true` s'affiche désormais comme une option ordinaire (et TypeScript signale la propriété inconnue).
- Les préférences enregistrées dans le navigateur par une ancienne version (`theme: 'light'` ou `'dark'`) restent converties au chargement par `useTheme()`.
