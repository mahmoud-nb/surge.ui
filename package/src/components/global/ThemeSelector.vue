<template>
  <div class="theme-selector">
    <!-- Header -->
    <div class="theme-selector__header">
      <h3 class="theme-selector__title">
        Personnalisation
      </h3>
      <Button 
        v-if="hasChanges"
        class="theme-selector__reset"
        title="Réinitialiser"
        variant="ghost"
        :icon="ArrowPathIcon"
        icon-display="only"
        @click="clearConfig"
      />
    </div>

    <div class="theme-option">
      <SelectBoxField
        v-model="themeName"
        label="Thème"
        message="Choisir le thème de l'application"  
        :options="availableThemesOptions"
      />
    </div>
    
    <!--
    <div class="theme-option">
      <SelectBoxField
        v-model="textDirection"
        label="Direction du texte"
        message="Choisir la direction du texte de l'application"  
        :options="[
          { value: 'ltr', label: 'Gauche à droite' },
          { value: 'rtl', label: 'Droite à gauche' }
        ]"
        @change="setTextDirection"
      />
    </div>
    -->

    <div class="theme-option">
      <SelectBoxField
        v-model="contrastMode"
        label="Contraste"
        message="Ajuster le contraste pour une meilleure visibilité"  
        :options="[
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'Élevé' }
        ]"
      />
    </div>
    
    <div class="theme-option">
      <SelectBoxField
        v-model="motionMode"
        label="Animations"
        message="Réduire les animations pour une meilleure accessibilité"  
        :options="[
          { value: 'normal', label: 'Normal' },
          { value: 'reduce', label: 'Réduites' }
        ]"
      />
    </div>

    <!-- Custom Colors Section -->
    <div class="theme-option">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <label style="margin: 0; font-weight: 600;">Couleurs Personnalisées</label>
        <Button
          v-if="showCustomColorSection"
          variant="ghost"
          size="sm"
          @click="resetCustomColors"
        >
          Réinitialiser
        </Button>
      </div>
      <p style="margin: 0 0 12px; font-size: 13px; color: var(--su-text-secondary);">
        Définissez vos propres couleurs pour surcharger le thème sélectionné
      </p>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 140px;">
          <label style="display: block; font-size: 12px; color: var(--su-text-secondary); margin-bottom: 6px;">Primaire</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input 
              type="color" 
              style="width: 44px; height: 44px; border: 2px solid var(--su-border-default); border-radius: 6px; cursor: pointer;"
              :value="customColors.primaryColor"
              @input="(e) => applyCustomColor('primaryColor', (e.target as HTMLInputElement).value)"
            >
            <code style="font-size: 11px;">{{ customColors.primaryColor }}</code>
          </div>
        </div>

        <div style="flex: 1; min-width: 140px;">
          <label style="display: block; font-size: 12px; color: var(--su-text-secondary); margin-bottom: 6px;">Secondaire</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input 
              type="color" 
              style="width: 44px; height: 44px; border: 2px solid var(--su-border-default); border-radius: 6px; cursor: pointer;"
              :value="customColors.secondaryColor"
              @input="(e) => applyCustomColor('secondaryColor', (e.target as HTMLInputElement).value)"
            >
            <code style="font-size: 11px;">{{ customColors.secondaryColor }}</code>
          </div>
        </div>

        <div style="flex: 1; min-width: 140px;">
          <label style="display: block; font-size: 12px; color: var(--su-text-secondary); margin-bottom: 6px;">Succès</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input 
              type="color" 
              style="width: 44px; height: 44px; border: 2px solid var(--su-border-default); border-radius: 6px; cursor: pointer;"
              :value="customColors.successColor"
              @input="(e) => applyCustomColor('successColor', (e.target as HTMLInputElement).value)"
            >
            <code style="font-size: 11px;">{{ customColors.successColor }}</code>
          </div>
        </div>

        <div style="flex: 1; min-width: 140px;">
          <label style="display: block; font-size: 12px; color: var(--su-text-secondary); margin-bottom: 6px;">Erreur</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input 
              type="color" 
              style="width: 44px; height: 44px; border: 2px solid var(--su-border-default); border-radius: 6px; cursor: pointer;"
              :value="customColors.errorColor"
              @input="(e) => applyCustomColor('errorColor', (e.target as HTMLInputElement).value)"
            >
            <code style="font-size: 11px;">{{ customColors.errorColor }}</code>
          </div>
        </div>
      </div>

      <p style="margin: 12px 0 0; font-size: 12px; color: var(--su-text-tertiary);">
        💡 Les couleurs modifiées surchargeront le thème actuel via des variables CSS custom
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTheme } from '@/composables/useTheme'
import { useCustomTheme } from '@/composables/useCustomTheme'
import Button from '../atoms/Button.vue';
import SelectBoxField from '../molecules/SelectBoxField.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const { 
  availableThemes,
  themeName, 
  contrastMode, 
  motionMode,  
  clearConfig } = useTheme()

const { setCustomVariable, resetCustomTheme } = useCustomTheme()

// const textDirection = computed({
//   get: () => document.documentElement.dir || 'ltr',
//   set: (value) => {
//     document.documentElement.dir = value;
//   }
// })

// Custom theme colors
const customColors = ref({
  primaryColor: '#3b82f6',
  secondaryColor: '#6b7280',
  successColor: '#10b981',
  errorColor: '#ef4444'
})

const showCustomColorSection = ref(false)

const applyCustomColor = (colorName: string, value: string) => {
  customColors.value[colorName as keyof typeof customColors.value] = value
  
  // Map color names to theme properties
  const colorMap: Record<string, string> = {
    primaryColor: 'primaryDefault',
    secondaryColor: 'secondaryDefault',
    successColor: 'stateSuccess',
    errorColor: 'stateError'
  }
  
  const themeProperty = colorMap[colorName]
  if (themeProperty) {
    setCustomVariable(themeProperty, value)
  }
}

const resetCustomColors = () => {
  customColors.value = {
    primaryColor: '#3b82f6',
    secondaryColor: '#6b7280',
    successColor: '#10b981',
    errorColor: '#ef4444'
  }
  resetCustomTheme()
  showCustomColorSection.value = false
}

const availableThemesOptions = computed(() => 
  availableThemes.value.map(t => ({ value: t.id, label: t.name }))
)

const hasChanges = computed(() => {
  return themeName.value !== 'auto' || 
         contrastMode.value !== 'auto' || 
         motionMode.value !== 'auto';
})
</script>

<style scoped lang="scss">
.theme-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--color-surface);
  border-radius: 8px;
  border: 1px solid var(--color-border);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0 0 8px;
  }
}

.theme-option {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: var(--su-spacing-3) var(--su-spacing-6);
  background-color: var(--su-bg-canvas);
  border-radius: var(--su-radius-lg);

  // border: 1px solid var(--su-border-default);
  
  label {
    font-weight: 600;
    color: var(--color-text-primary);
  }
  
  select {
    padding: 8px 12px;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-size: 14px;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
}
</style>