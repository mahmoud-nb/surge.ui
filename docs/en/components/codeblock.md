<script setup>
const install = `import { createApp } from 'vue'
import SurgeUI from '@surgeui/vue'
import '@surgeui/vue/style.css'
import App from './App.vue'

createApp(App).use(SurgeUI).mount('#app')`
</script>

# CodeBlock

Captioned code block, with a copy button and optional line numbers. It ships no syntax highlighting: plug in the one you prefer (Shiki, Prism) through the default slot.

## Usage

### Title, language and copy

<div class="component-demo">
  <div class="demo-section">
    <SuCodeBlock :code="install" title="main.ts" language="ts" />
  </div>
</div>

```vue
<SuCodeBlock :code="code" title="main.ts" language="ts" />
```

### Line numbers

<div class="component-demo">
  <div class="demo-section">
    <SuCodeBlock :code="install" language="ts" line-numbers />
  </div>
</div>

```vue
<SuCodeBlock :code="code" language="ts" line-numbers />
```

Numbers are drawn with CSS: they are not selected, not copied and not read by screen readers.

### Without caption

<div class="component-demo">
  <div class="demo-section">
    <SuCodeBlock code="npm install @surgeui/vue" />
  </div>
</div>

```vue
<SuCodeBlock code="npm install @surgeui/vue" />
```

### Highlighted code

The default slot replaces the display; `code` is still the copied text.

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | - | Displayed and copied code |
| `language` | `string` | - | Language: shown, set as `data-language` and as a `language-*` class |
| `title` | `string` | - | Title (file name), as the caption |
| `copyable` | `boolean` | `true` | Copy button |
| `lineNumbers` | `boolean` | `false` | Line numbers |
| `maxHeight` | `string` | - | Maximum height; scrolls beyond |
| `copyLabel` | `string` | `'Copy code'` | Copy button name |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Already highlighted code (replaces the display of `code`) |

## Accessibility

- `<figure>` captioned by `<figcaption>` (title and language).
- The block only becomes focusable (`tabindex="0"`) when it scrolls: its content can then be read with the keyboard.
- Copy button named "Copy code", result announced ([CopyButton](/en/components/copybutton)).
- Code stays left to right in an RTL page.
