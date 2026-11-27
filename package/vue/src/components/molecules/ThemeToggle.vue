<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import type { ThemeToggleProps } from '@/types'
import type { ThemeMode } from '@/types/theme'
import { useTheme } from '@/composables/useTheme'
import { useLocale } from '@/composables/useLocale'
import Button from '../atoms/Button.vue'

// ============================================================
// THEME TOGGLE — mode clair / sombre de useTheme (état partagé par
// toute l'application, enregistré si `persist`).
// - `button` : bouton bascule « Mode sombre » (aria-pressed).
// - `segmented` : trois boutons Clair / Sombre / Système (aria-pressed),
//   dans un groupe nommé.
// Rendu serveur : la préférence n'est lue qu'après le montage (pas
// d'écart d'hydratation).
// ============================================================

const props = withDefaults(defineProps<ThemeToggleProps>(), {
  variant: 'button',
  size: 'md'
})

const emit = defineEmits<{
  /** Mode choisi */
  change: [mode: ThemeMode]
}>()

const { t } = useLocale()
const { themeMode, isDarkMode, toggleMode, setThemeMode } = useTheme()

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const isDark = computed(() => mounted.value && isDarkMode.value)
const currentMode = computed<ThemeMode | undefined>(() => (mounted.value ? themeMode.value : undefined))

const toggleLabel = computed(() => props.label ?? t('themeToggle.toggle'))
const groupLabel = computed(() => props.label ?? t('themeToggle.group'))

const options = computed(() => [
  { mode: 'light' as const, label: props.lightLabel ?? t('themeToggle.light'), icon: SunIcon },
  { mode: 'dark' as const, label: props.darkLabel ?? t('themeToggle.dark'), icon: MoonIcon },
  { mode: 'system' as const, label: props.systemLabel ?? t('themeToggle.system'), icon: ComputerDesktopIcon }
])

const handleToggle = () => {
  toggleMode()
  emit('change', themeMode.value)
}

const handleSelect = (mode: ThemeMode) => {
  if (mode === themeMode.value) return
  setThemeMode(mode)
  emit('change', mode)
}
</script>

<template>
  <Button
    v-if="variant === 'button'"
    class="su-theme-toggle"
    variant="ghost"
    :size="size"
    :icon="isDark ? MoonIcon : SunIcon"
    icon-display="only"
    :aria-label="toggleLabel"
    :aria-pressed="isDark"
    @click="handleToggle"
  />

  <div
    v-else
    role="group"
    :aria-label="groupLabel"
    :class="['su-theme-toggle-group', `su-theme-toggle-group--${size}`]"
  >
    <button
      v-for="option in options"
      :key="option.mode"
      type="button"
      class="su-theme-toggle-group__option"
      :aria-pressed="currentMode === option.mode"
      @click="handleSelect(option.mode)"
    >
      <component
        :is="option.icon"
        class="su-theme-toggle-group__icon"
        aria-hidden="true"
      />
      <span>{{ option.label }}</span>
    </button>
  </div>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// THEME TOGGLE — variante segmentée : piste en retrait, option
// choisie posée en surface
// ============================================================

.su-theme-toggle-group {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--su-border-alpha);
  border-radius: var(--su-radius-control);
  background-color: var(--su-bg-muted);

  &__option {
    display: inline-flex;
    align-items: center;
    gap: $spacing-1;
    min-block-size: calc(var(--su-control-height-md) - 6px);
    padding-inline: $spacing-3;
    border: 0;
    border-radius: calc(var(--su-radius-control) - 2px);
    background: transparent;
    color: var(--su-text-secondary);
    font: inherit;
    font-size: var(--su-font-size-sm);
    font-weight: var(--su-font-weight-medium);
    cursor: pointer;

    @include transition(background-color, color, box-shadow);

    &:hover {
      color: var(--su-text-primary);
    }

    &:focus-visible {
      @include focus-ring;
    }

    &[aria-pressed='true'] {
      background-color: var(--su-bg-surface);
      color: var(--su-text-primary);
      box-shadow: var(--su-shadow-control);
    }
  }

  &__icon {
    inline-size: 1rem;
    block-size: 1rem;
    flex-shrink: 0;
  }

  &--sm &__option {
    min-block-size: calc(var(--su-control-height-sm) - 6px);
    padding-inline: $spacing-2;
    font-size: var(--su-font-size-xs);
  }

  &--lg &__option {
    min-block-size: calc(var(--su-control-height-lg) - 6px);
    padding-inline: $spacing-4;
    font-size: var(--su-font-size-base);
  }
}
</style>
