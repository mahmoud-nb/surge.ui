<script setup lang="ts">
import { ref } from 'vue'
import Panel from '../atoms/Panel.vue'
import Heading from '../atoms/Heading.vue'
import Button from '../atoms/Button.vue'
import Badge from '../atoms/Badge.vue'
import Input from '../atoms/Input.vue'
import GlobalPreview from './GlobalPreview.vue'
import { useCustomTheme } from '@/composables/useCustomTheme'

// ============================================================
// Vitrine « Thèmes » : thème, mode, sens et langue se règlent dans la
// barre d'outils de Storybook ; cette page montre en plus les variables
// CSS --su-custom-* appliquées à la volée (useCustomTheme).
// ============================================================

const { applyCustomTheme, resetCustomTheme } = useCustomTheme()
const applied = ref<string | null>(null)

const applyRedBrand = () => {
  applyCustomTheme({
    primaryDefault: '#dc2626',
    primaryHover: '#b91c1c',
    primaryActive: '#991b1b',
    primaryText: '#ffffff'
  })
  applied.value = 'Red Brand'
}

const applyBlueSky = () => {
  applyCustomTheme({
    primaryDefault: '#0284c7',
    primaryHover: '#0369a1',
    primaryActive: '#075985',
    primaryText: '#ffffff'
  })
  applied.value = 'Blue Sky'
}

const reset = () => {
  resetCustomTheme()
  applied.value = null
}
</script>

<template>
  <GlobalPreview
    eyebrow="Global · 04"
    description="Les quatre thèmes (default, ocean, forest, sunset), le mode clair ou sombre, le sens de lecture et la langue se règlent dans la barre d'outils, en haut. Cette page applique en plus des variables CSS --su-custom-* à la volée."
  >
    <template #head>
      <h2>Thèmes</h2>
    </template>

    <div class="section">
      <h3>Variables CSS personnalisées</h3>
      <Panel bordered>
        <template #head>
          <Heading level="4">
            useCustomTheme
          </Heading>
        </template>

        <p class="su-theme-playground__text">
          Les variables <code>--su-custom-*</code> surchargent celles du thème choisi, quel que soit le mode.
        </p>

        <div class="su-theme-playground__actions">
          <Button
            variant="primary"
            size="sm"
            @click="applyRedBrand"
          >
            Appliquer « Red Brand »
          </Button>
          <Button
            variant="secondary"
            size="sm"
            @click="applyBlueSky"
          >
            Appliquer « Blue Sky »
          </Button>
          <Button
            variant="ghost"
            size="sm"
            :disabled="!applied"
            @click="reset"
          >
            Réinitialiser
          </Button>
        </div>

        <template #footer>
          <span class="su-theme-playground__status">
            <Badge
              :variant="applied ? 'success' : 'default'"
              dot
            >
              {{ applied ? `Thème « ${applied} » appliqué` : 'Thème d’origine' }}
            </Badge>
          </span>
        </template>
      </Panel>
    </div>

    <div class="section">
      <h3>Aperçu</h3>
      <div class="su-theme-playground__preview">
        <Button variant="primary">
          Primaire
        </Button>
        <Button variant="secondary">
          Secondaire
        </Button>
        <Button variant="outline">
          Contour
        </Button>
        <Badge variant="primary">
          Badge
        </Badge>
        <Input
          placeholder="Champ de saisie"
          aria-label="Champ de démonstration"
        />
      </div>
    </div>
  </GlobalPreview>
</template>

<style lang="scss" scoped>
@use '../../styles/abstracts' as *;

.su-theme-playground__text {
  margin: 0 0 $spacing-4;
  color: var(--su-text-secondary);
}

.su-theme-playground__actions,
.su-theme-playground__preview {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-3;
  align-items: center;
}

.su-theme-playground__preview {
  padding: $spacing-6;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-container);
  background: var(--su-bg-surface);
}
</style>
