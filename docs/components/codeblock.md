<script setup>
const install = `import { createApp } from 'vue'
import SurgeUI from '@surgeui/vue'
import '@surgeui/vue/style.css'
import App from './App.vue'

createApp(App).use(SurgeUI).mount('#app')`
</script>

# CodeBlock

Bloc de code légendé, avec bouton de copie et numéros de ligne en option. Il n'embarque pas de coloration syntaxique : branchez celle de votre choix (Shiki, Prism) par le slot par défaut.

## Exemples d'utilisation

### Titre, langage et copie

<div class="component-demo">
  <div class="demo-section">
    <SuCodeBlock :code="install" title="main.ts" language="ts" />
  </div>
</div>

```vue
<SuCodeBlock :code="code" title="main.ts" language="ts" />
```

### Numéros de ligne

<div class="component-demo">
  <div class="demo-section">
    <SuCodeBlock :code="install" language="ts" line-numbers />
  </div>
</div>

```vue
<SuCodeBlock :code="code" language="ts" line-numbers />
```

Les numéros sont dessinés en CSS : ils ne sont ni sélectionnés ni copiés, et pas lus par les lecteurs d'écran.

### Sans légende

<div class="component-demo">
  <div class="demo-section">
    <SuCodeBlock code="npm install @surgeui/vue" />
  </div>
</div>

```vue
<SuCodeBlock code="npm install @surgeui/vue" />
```

### Code coloré

Le slot par défaut remplace l'affichage ; `code` reste le texte copié.

```vue
<script setup>
import { codeToHtml } from 'shiki'

const html = await codeToHtml(code, { lang: 'ts', theme: 'github-light' })
</script>

<template>
  <SuCodeBlock :code="code" language="ts">
    <span v-html="html" />
  </SuCodeBlock>
</template>
```

## API

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `code` | `string` | - | Code affiché et copié |
| `language` | `string` | - | Langage : affiché, posé en `data-language` et en classe `language-*` |
| `title` | `string` | - | Titre (nom de fichier), en légende |
| `copyable` | `boolean` | `true` | Bouton de copie |
| `lineNumbers` | `boolean` | `false` | Numéros de ligne |
| `maxHeight` | `string` | - | Hauteur maximale ; défilement au-delà |
| `copyLabel` | `string` | `'Copier le code'` | Nom du bouton de copie |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Code déjà coloré (remplace l'affichage de `code`) |

## Accessibilité

- `<figure>` légendée par `<figcaption>` (titre et langage).
- Le bloc ne devient focalisable (`tabindex="0"`) que lorsqu'il défile : son contenu reste alors lisible au clavier.
- Bouton de copie nommé « Copier le code », résultat annoncé ([CopyButton](/components/copybutton)).
- Le code reste écrit de gauche à droite dans une page en RTL.
