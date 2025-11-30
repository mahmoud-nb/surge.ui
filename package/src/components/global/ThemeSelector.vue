<template>
  <div class="theme-selector">
    <div class="theme-option">
      <SelectBoxField
        v-model="themeMode"
        label="Thème"
        message="Choisir le thème de l'application"  
        :options="[
          { value: 'auto', label: 'Automatique' },
          { value: 'light', label: 'Clair' },
          { value: 'dark', label: 'Sombre' }
        ]"
      />
    </div>
    
    <div class="theme-option">
      <SelectBoxField
        v-model="textDirection"
        label="Direction du texte"
        message="Choisir la direction du texte de l'application"  
        :options="[
          { value: 'ltr', label: 'Gauche à droite' },
          { value: 'rtl', label: 'Droite à gauche' }
        ]"
      />
    </div>

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
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import SelectBoxField from '../molecules/SelectBoxField.vue'

const { themeMode, contrastMode, motionMode, textDirection } = useTheme()
</script>

<style scoped lang="scss">
.theme-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: var(--color-surface);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.theme-option {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
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