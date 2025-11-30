<script setup lang="ts">
  import Heading from '../atoms/Heading.vue'
  import Panel from '../atoms/Panel.vue'
  import ThemeSelector from './ThemeSelector.vue'
  import { useTheme } from '@/composables/useTheme'

  const { themeMode, textDirection, contrastMode, motionMode } = useTheme()
</script>

<template>
  <div 
    class="su-global-preview"
    :data-theme="themeMode"
  >
    <ThemeSelector />
    <Panel
      bordered
      elevated
    >
      <template #head>
        <Heading level="2">
          Aperçu global du Design System
        </Heading>
      </template>

      <p>
        Testez ici les styles généraux, les couleurs, les typographies et les comportements RTL/dark des composants.
      </p>

      <ul>
        <li><strong>Thème :</strong> {{ themeMode }}</li>
        <li><strong>Direction :</strong> {{ textDirection === 'rtl' ? 'Droite à gauche' : 'Gauche à droite' }}</li>
        <li><strong>Contraste :</strong> {{ contrastMode === 'high' ? 'Élevé' : 'Normal' }}</li>
        <li><strong>Animations :</strong> {{ motionMode === 'reduce' ? 'Réduites' : 'Normal' }}</li>
      </ul>

      <template #footer>
        <small>Respect des normes WCAG 2.1 AA et W3C</small>
      </template>
    </Panel>

    <div 
      class="su-global-preview__content"
      :dir="textDirection === 'rtl' ? 'rtl' : 'ltr'"
    >
      <header
        v-if="$slots.head"
        class="su-global-preview__head"
      >
        <slot name="head" />
      </header>
      <div class="su-global-preview__body">
        <slot />
      </div>
      <footer
        v-if="$slots.footer"
        class="su-global-preview__footer"
      >
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.su-global-preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  &__controls {
    padding: 1rem;
  }
}
</style>