# Migrating to 4.0

Version 4.0.0 publishes the library under a new name, **`@surgeui/vue`**, and removes the APIs deprecated during 3.x.

## New name: @surgeui/vue

Only the package name changes in imports: the subpaths, the stylesheets and the types stay the same.

| Before | After |
|--------|-------|
| `@surgeui/ds-vue` | `@surgeui/vue` |
| `@surgeui/ds-vue/style.css` | `@surgeui/vue/style.css` |
| `@surgeui/ds-vue/style.layer.css` | `@surgeui/vue/style.layer.css` |
| `@surgeui/ds-vue/tailwind.css` | `@surgeui/vue/tailwind.css` |
| `@surgeui/ds-vue/global` | `@surgeui/vue/global` |
| `@surgeui/ds-vue/types` | `@surgeui/vue/types` |

`@surgeui/ds-vue@4.0.0` is the last version published under the former name: a relay that depends on `@surgeui/vue@4.0.0` and re-exports it. Imports from `@surgeui/ds-vue` still work in 4.0.0, but later versions are only published as `@surgeui/vue`.

### 1. Replace the dependency

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

### 2. Update the imports

Replace `@surgeui/ds-vue` with `@surgeui/vue` in your code, stylesheets and configuration (`tsconfig.json`, `nuxt.config.ts`, `vite.config.ts`…):

```ts
// Before
import SurgeUI, { locales } from '@surgeui/ds-vue'
import '@surgeui/ds-vue/style.css'

// After
import SurgeUI, { locales } from '@surgeui/vue'
import '@surgeui/vue/style.css'
```

In a Git repository, one command does it (GNU sed: Linux, Git Bash; on macOS, write `sed -i ''`):

```bash
git grep -l "@surgeui/ds-vue" -- ":(exclude)*lock*" | xargs sed -i "s#@surgeui/ds-vue#@surgeui/vue#g"
```

### 3. Check

`git grep "@surgeui/ds-vue"` should find nothing. Then run your application's build, type check and tests again.

### Both names at once

During a gradual migration (monorepo, third-party dependency still on the former name), both packages can be installed together in 4.0.0. The relay re-exports the same module: the plugin, the injection keys and the composables are shared. Two precautions:

- keep `@surgeui/vue` at **4.0.0** while `@surgeui/ds-vue` is installed: the relay depends on that exact version, another version would install a second copy;
- import the stylesheet **once**, from either name: the relay ships a copy of it, importing both would add it twice to the bundle.

### The former name on npm

- **3.3.0**: last full release published as `@surgeui/ds-vue`.
- **4.0.0**: first `@surgeui/vue` release; `@surgeui/ds-vue@4.0.0` is a relay, then the former name is marked as deprecated on npm.
- **4.0.1 and later**: published as `@surgeui/vue` only.
