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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme'
import Button from '../atoms/Button.vue';
import SelectBoxField from '../molecules/SelectBoxField.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const { 
  availableThemes,
  themeName, 
  contrastMode, 
  motionMode,  
  clearConfig } = useTheme()

const textDirection = computed({
  get: () => document.documentElement.dir || 'ltr',
  set: (value) => {
    document.documentElement.dir = value;
  }
})

const setTextDirection = () => {
  document.documentElement.dir = textDirection.value;
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