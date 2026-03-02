<template>
  <div class="theme-selector">
    <!-- Header -->
    <div class="theme-selector__header">
      <h3 class="theme-selector__title">
        Personnalisation
      </h3>
      <button 
        v-if="hasChanges"
        class="theme-selector__reset"
        title="Réinitialiser"
        @click="handleReset"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2 8a6 6 0 0 1 10.392-4.392M14 8A6 6 0 0 1 3.608 12.392" 
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M12 3v3h-3M4 13v-3h3" 
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    
    <!-- Thèmes système -->
    <section class="theme-selector__section">
      <h4 class="theme-selector__subtitle">
        Thèmes système
      </h4>
      <div class="theme-grid">
        <button
          v-for="theme in systemThemes"
          :key="theme.id"
          :class="['theme-card', { 'theme-card--active': themeName === theme.id }]"
          @click="setTheme(theme.id)"
        >
          <div class="theme-card__preview">
            <div 
              class="theme-card__color" 
              :style="{ backgroundColor: theme.preview.background }"
            >
              <div 
                class="theme-card__surface"
                :style="{ backgroundColor: theme.preview.surface, borderColor: theme.preview.primary }"
              />
            </div>
          </div>
          <div class="theme-card__info">
            <span class="theme-card__name">{{ theme.name }}</span>
            <span
              v-if="themeName === theme.id"
              class="theme-card__check"
            >✓</span>
          </div>
        </button>
      </div>
    </section>
    
    <!-- Thèmes colorés -->
    <section class="theme-selector__section">
      <h4 class="theme-selector__subtitle">
        Thèmes colorés
      </h4>
      <div class="theme-grid">
        <button
          v-for="theme in colorThemes"
          :key="theme.id"
          :class="['theme-card', { 'theme-card--active': themeName === theme.id }]"
          @click="setTheme(theme.id)"
        >
          <div class="theme-card__preview">
            <div 
              class="theme-card__color" 
              :style="{ backgroundColor: theme.preview.background }"
            >
              <div 
                class="theme-card__surface"
                :style="{ backgroundColor: theme.preview.surface, borderColor: theme.preview.primary }"
              >
                <div 
                  class="theme-card__accent"
                  :style="{ backgroundColor: theme.preview.primary }"
                />
              </div>
            </div>
          </div>
          <div class="theme-card__info">
            <span class="theme-card__name">{{ theme.name }}</span>
            <span
              v-if="themeName === theme.id"
              class="theme-card__check"
            >✓</span>
          </div>
        </button>
      </div>
    </section>
    <!-- Options d'accessibilité -->
    <section class="theme-selector__section">
      <h4 class="theme-selector__subtitle">
        Accessibilité
      </h4>

      <div class="theme-option">
        <BoldIcon />
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
        <label
          class="theme-option__label"
          for="contrast-select"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M10 2v16"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <span>Contraste</span>
        </label>
        <select 
          id="contrast-select"
          :value="contrastMode" 
          class="theme-option__select"
          @change="setContrast($event.target.value)"
        >
          <option value="auto">
            Automatique
          </option>
          <option value="normal">
            Normal
          </option>
          <option value="high">
            Élevé
          </option>
        </select>
      </div>
  
      <div class="theme-option">
        <label
          class="theme-option__label"
          for="motion-select"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M3 10h14M10 3l7 7-7 7" 
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Animations</span>
        </label>
        <select 
          id="motion-select"
          :value="motionMode" 
          class="theme-option__select"
          @change="setMotion($event.target.value)"
        >
          <option value="auto">
            Automatique
          </option>
          <option value="normal">
            Activées
          </option>
          <option value="reduce">
            Réduites
          </option>
        </select>
      </div>
    </section>

    <!-- Préférences système détectées -->
    <div class="theme-selector__system-info">
      <p class="theme-selector__info-text">
        <strong>Préférences système :</strong>
      </p>
      <ul class="theme-selector__info-list">
        <li>Thème : {{ systemTheme === 'dark' ? 'Sombre' : 'Clair' }}</li>
        <li>Contraste : {{ systemContrast === 'high' ? 'Élevé' : 'Normal' }} - {{ systemContrast }}</li>
        <li>Animations : {{ systemMotion === 'reduce' ? 'Réduites' : 'Activées' }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import SelectBoxField from '../molecules/SelectBoxField.vue'
import { useTheme } from '@/composables/useTheme';
import { BoldIcon } from '@heroicons/vue/24/outline'


const { 
  themeName, 
  contrastMode, 
  motionMode,
  systemTheme,
  systemContrast,
  systemMotion,
  availableThemes,
  setTheme, 
  setContrast, 
  setMotion,
  clearConfig 
} = useTheme();

const systemThemes = computed(() => 
  availableThemes.value.filter(t => t.category === 'system')
);

const colorThemes = computed(() => 
  availableThemes.value.filter(t => t.category === 'color')
);

const hasChanges = computed(() => {
  return themeName.value !== 'auto' || 
         contrastMode.value !== 'auto' || 
         motionMode.value !== 'auto';
});

const handleReset = () => {
  if (confirm('Réinitialiser tous les paramètres de thème ?')) {
    clearConfig();
  }
};
</script>
<style scoped lang="scss">
@use '../../styles/core/mixins' as *;

.theme-selector {
  display: flex;
  flex-direction: column;
  gap: var(--su-spacing-6);
  padding: var(--su-spacing-6);
  background-color: var(--su-bg-surface);
  border-radius: var(--su-radius-xl);
  border: 1px solid var(--su-border-default);
  max-width: 600px;
}

.theme-selector__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.theme-selector__title {
  margin: 0;
  font-size: var(--su-font-size-xl);
  font-weight: 700;
  color: var(--su-text-primary);
}

.theme-selector__reset {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--su-spacing-2);
  background: transparent;
  border: none;
  border-radius: var(--su-radius-md);
  color: var(--su-text-secondary);
  cursor: pointer;

  @include transition(background-color, color);
  
  &:hover {
    background-color: var(--su-bg-hover);
    color: var(--su-text-primary);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.theme-selector__section {
  display: flex;
  flex-direction: column;
  gap: var(--su-spacing-3);
}

.theme-selector__subtitle {
  margin: 0;
  font-size: var(--su-font-size-sm);
  font-weight: 600;
  color: var(--su-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--su-spacing-3);
}

.theme-card {
  display: flex;
  flex-direction: column;
  gap: var(--su-spacing-2);
  padding: var(--su-spacing-3);
  background: transparent;
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-lg);
  cursor: pointer;
  box-sizing: border-box;

  @include transition(border-color, transform, box-shadow);
  
  &:hover {
    border-color: var(--su-border-strong);
    transform: translateY(calc(-2px * var(--su-animation-scale)));
  }
  
  &:focus-visible {
    @include focus-ring;
  }
  
  &--active {
    border-color: var(--su-primary-default);
    box-shadow: 0 0 0 1px var(--su-primary-default);
  }
}

.theme-card__preview {
  aspect-ratio: 4 / 3;
  border-radius: var(--su-radius-md);
  overflow: hidden;
}

.theme-card__color {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--su-spacing-2);
}

.theme-card__surface {
  width: 60%;
  height: 60%;
  border-radius: var(--su-radius-sm);
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-card__accent {
  width: 30%;
  height: 30%;
  border-radius: var(--su-radius-sm);
}

.theme-card__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--su-spacing-2);
}

.theme-card__name {
  font-size: var(--su-font-size-sm);
  font-weight: 500;
  color: var(--su-text-primary);
}

.theme-card__check {
  color: var(--su-primary-default);
  font-weight: 700;
}

.theme-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--su-spacing-4);
  padding: var(--su-spacing-3);
  background-color: var(--su-bg-canvas);
  border-radius: var(--su-radius-md);
}

.theme-option__label {
  display: flex;
  align-items: center;
  gap: var(--su-spacing-2);
  font-size: var(--su-font-size-base);
  font-weight: 500;
  color: var(--su-text-primary);
  cursor: pointer;
  
  svg {
    color: var(--su-text-secondary);
  }
}

.theme-option__select {
  padding: var(--su-spacing-2) var(--su-spacing-3);
  font-size: var(--su-font-size-sm);
  font-family: var(--su-font-family-base);
  color: var(--su-text-primary);
  background-color: var(--su-bg-surface);
  border: 2px solid var(--su-border-default);
  border-radius: var(--su-radius-md);
  cursor: pointer;

  @include transition(border-color);
  
  &:hover {
    border-color: var(--su-border-strong);
  }
  
  &:focus-visible {
    @include focus-ring;
  }
}

.theme-selector__system-info {
  padding: var(--su-spacing-4);
  background-color: var(--su-bg-canvas);
  border-radius: var(--su-radius-md);
  border-left: 3px solid var(--su-primary-default);
}

.theme-selector__info-text {
  margin: 0 0 var(--su-spacing-2);
  font-size: var(--su-font-size-sm);
  color: var(--su-text-secondary);
}

.theme-selector__info-list {
  margin: 0;
  padding-left: var(--su-spacing-4);
  font-size: var(--su-font-size-sm);
  color: var(--su-text-tertiary);
  
  li {
    margin: var(--su-spacing-1) 0;
  }
}
</style>