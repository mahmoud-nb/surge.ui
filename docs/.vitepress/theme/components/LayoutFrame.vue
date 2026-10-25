<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// Cadre de démonstration des layouts : il simule un conteneur de 375,
// 768 ou 1024px. Les layouts réagissent à la largeur de leur conteneur
// (container queries) ; le cadre est réduit avec `zoom` pour tenir dans
// la colonne de la doc sans changer la largeur vue par les layouts.

type FrameWidth = 'mobile' | 'tablet' | 'desktop'

const props = withDefaults(defineProps<{
  /** Largeur initiale du cadre */
  width?: FrameWidth
  lang?: 'fr' | 'en'
}>(), {
  width: 'desktop',
  lang: 'fr'
})

const sizes: Record<FrameWidth, number> = { mobile: 375, tablet: 768, desktop: 1024 }
// Marge intérieure du cadre, ajoutée à la largeur simulée
const PADDING = 16

const current = ref<FrameWidth>(props.width)
const viewportRef = ref<HTMLElement>()
const available = ref(0)
let observer: ResizeObserver | undefined

onMounted(() => {
  if (!viewportRef.value || typeof ResizeObserver === 'undefined') return
  observer = new ResizeObserver(([entry]) => {
    available.value = entry.contentRect.width
  })
  observer.observe(viewportRef.value)
})

onBeforeUnmount(() => observer?.disconnect())

const canvasWidth = computed(() => sizes[current.value] + PADDING * 2)
const scale = computed(() => available.value ? Math.min(1, available.value / canvasWidth.value) : 1)

const labels = computed(() => props.lang === 'en'
  ? { mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop', group: 'Demo width', scale: 'shown at' }
  : { mobile: 'Mobile', tablet: 'Tablette', desktop: 'Bureau', group: 'Largeur de la démo', scale: 'affiché à' })
</script>

<template>
  <div class="layout-frame">
    <div class="layout-frame__toolbar">
      <div
        class="layout-frame__buttons"
        role="group"
        :aria-label="labels.group"
      >
        <button
          v-for="(px, key) in sizes"
          :key="key"
          type="button"
          class="layout-frame__button"
          :aria-pressed="current === key"
          @click="current = key"
        >
          {{ labels[key] }}
          <span class="layout-frame__px">{{ px }}px</span>
        </button>
      </div>
      <span
        v-if="scale < 1"
        class="layout-frame__scale"
      >
        {{ labels.scale }} {{ Math.round(scale * 100) }} %
      </span>
    </div>

    <div
      ref="viewportRef"
      class="layout-frame__viewport"
    >
      <div
        class="layout-frame__canvas"
        :style="{ width: `${canvasWidth}px`, padding: `${PADDING}px`, zoom: scale }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-frame {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layout-frame__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.layout-frame__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.layout-frame__button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8125rem;
  cursor: pointer;
}

.layout-frame__button[aria-pressed='true'] {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.layout-frame__button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.layout-frame__px,
.layout-frame__scale {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}

.layout-frame__viewport {
  display: flex;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
}

.layout-frame__canvas {
  box-sizing: border-box;
  flex-shrink: 0;
  background: var(--su-bg-canvas, var(--vp-c-bg));
}

.layout-frame__canvas :deep(p) {
  margin: 0;
}
</style>
