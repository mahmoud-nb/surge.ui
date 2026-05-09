<script setup lang="ts">
  import { ref } from 'vue'
  import Heading from '../atoms/Heading.vue'
  import Panel from '../atoms/Panel.vue'
  import Button from '../atoms/Button.vue'
  import ThemeSelector from './ThemeSelector.vue'
  //import ThemeSelector2 from './ThemeSelector2.vue'
  import { useTheme } from '@/composables/useTheme'
  import { useCustomTheme } from '@/composables/useCustomTheme'

  const { themeName, themeMode, effectiveThemeMode, contrastMode, motionMode } = useTheme()
  const { applyCustomTheme, resetCustomTheme } = useCustomTheme()
  const textDirection = ref('ltr')
  const showCustomThemeExample = ref(false)

  // Functions for custom theme examples
  const applyRedBrandTheme = () => {
    applyCustomTheme({
      textPrimary: '#dc2626',
      primaryDefault: '#dc2626',
      primaryHover: '#b91c1c',
      primaryActive: '#991b1b',
      primaryText: '#ffffff'
    })
    showCustomThemeExample.value = true
  }

  const applyBlueSkyTheme = () => {
    applyCustomTheme({
      textPrimary: '#1e3a8a',
      bgSurface: '#f0f9ff',
      bgCanvas: '#e0f2fe',
      primaryDefault: '#3b82f6',
      primaryHover: '#2563eb',
      primaryActive: '#1d4ed8',
      primaryText: '#ffffff',
      borderDefault: '#bfdbfe'
    })
    showCustomThemeExample.value = true
  }

  const resetCustom = () => {
    resetCustomTheme()
    showCustomThemeExample.value = false
  }

 
</script>

<template>
  <div
    class="su-global-preview"
    :data-theme="themeName"
    :data-theme-mode="effectiveThemeMode"
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
        <li><strong>Thème :</strong> {{ themeName }}</li>
        <li><strong>Mode :</strong> {{ themeMode }} <em>(effectif : {{ effectiveThemeMode }})</em></li>
        <!-- <li><strong>Direction :</strong> {{ textDirection === 'rtl' ? 'Droite à gauche' : 'Gauche à droite' }}</li> -->
        <li><strong>Contraste :</strong> {{ contrastMode === 'high' ? 'Élevé' : 'Normal' }}</li>
        <li><strong>Animations :</strong> {{ motionMode === 'reduce' ? 'Réduites' : 'Normal' }}</li>
      </ul>

      <template #footer>
        <small>Respect des normes WCAG 2.1 AA et W3C</small>
      </template>
    </Panel>

    <!-- Section Personnalisation Avancée -->
    <Panel
      bordered
      elevated
    >
      <template #head>
        <Heading level="2">
          Personnalisation Avancée - Variables CSS Custom
        </Heading>
      </template>

      <p>
        Découvrez comment appliquer des thèmes personnalisés en définissant des variables CSS globales.
      </p>

      <div style="display: flex; gap: 12px; margin-top: 16px;">
        <Button
          variant="primary"
          size="sm"
          @click="applyRedBrandTheme"
        >
          Appliquer Thème Red Brand
        </Button>

        <Button
          variant="secondary"
          size="sm"
          @click="applyBlueSkyTheme"
        >
          Appliquer Thème Blue Sky
        </Button>

        <Button
          variant="ghost"
          size="sm"
          @click="resetCustom"
        >
          Réinitialiser
        </Button>
      </div>

      <div
        v-if="showCustomThemeExample"
        style="
          margin-top: 20px;
          padding: 16px;
          background-color: var(--su-bg-canvas);
          border-radius: 8px;
          border-left: 4px solid var(--su-custom-primary-default, var(--su-primary-default));
        "
      >
        <p style="margin: 0 0 12px; font-weight: 600;">
          ✓ Thème personnalisé appliqué !
        </p>
        <p style="margin: 0; font-size: 14px; color: var(--su-text-secondary);">
          Les variables CSS <code>--su-custom-*</code> surcharges les variables du thème sélectionné.
          Observez comme les couleurs reflètent votre sélection, même en changeant de thème.
        </p>
      </div>

      <template #footer>
        <small>Les variables CSS custom utilisent le préfixe <code>--su-custom-</code></small>
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