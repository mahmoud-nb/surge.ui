<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch, useId } from 'vue'
import type { TabsProps } from '@/types'
import { useListNavigation } from '@/composables/useListNavigation'

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'underline',
  modelValue: 0
})

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const activeIndex = ref(props.modelValue)
const tabsId = useId()

watch(() => props.modelValue, v => (activeIndex.value = v))
watch(activeIndex, v => emit('update:modelValue', v))

// Boutons d'onglet, pour déplacer le focus avec l'onglet actif
const tabRefs = ref<HTMLButtonElement[]>([])
const setTabRef = (el: unknown, index: number) => {
  if (el) tabRefs.value[index] = el as HTMLButtonElement
}

// Gestion du clavier : flèches gauche / droite (inversées en RTL), Début /
// Fin, en boucle. Le focus suit l'onglet, qui est activé aussitôt
// (pattern WAI-ARIA « activation automatique »)
const tabNav = useListNavigation({
  items: () => props.tabs ?? [],
  orientation: 'horizontal',
  loop: true,
  mode: 'roving',
  getElement: (index) => tabRefs.value[index],
  onActiveChange: (index) => {
    activeIndex.value = index
  }
})

const handleKeydown = (event: KeyboardEvent) => {
  // Point de départ : l'onglet actif (ou l'onglet focalisé, repris par la navigation)
  tabNav.activeIndex.value = activeIndex.value
  tabNav.handleKeydown(event)
}

// ============================================================
// Indicateur animé (variantes underline et pills) : il glisse
// jusqu'à l'onglet actif, dont on mesure la position.
// ============================================================

const listRef = ref<HTMLElement>()
const hasIndicator = computed(() => props.variant !== 'contained')
const indicator = reactive({ left: 0, top: 0, width: 0, height: 0, ready: false })

const updateIndicator = () => {
  const tab = tabRefs.value[activeIndex.value]
  if (!tab) return
  indicator.left = tab.offsetLeft
  indicator.top = tab.offsetTop
  indicator.width = tab.offsetWidth
  indicator.height = tab.offsetHeight
  indicator.ready = true
}

const indicatorStyle = computed(() => ({
  '--su-tabs-indicator-left': `${indicator.left}px`,
  '--su-tabs-indicator-top': `${indicator.top}px`,
  '--su-tabs-indicator-width': `${indicator.width}px`,
  '--su-tabs-indicator-height': `${indicator.height}px`
}))

watch([activeIndex, () => props.tabs?.length, () => props.variant], () => nextTick(updateIndicator))

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  updateIndicator()
  if (typeof ResizeObserver !== 'undefined' && listRef.value) {
    // Recalcule si la liste change de taille (police chargée, responsive…)
    resizeObserver = new ResizeObserver(updateIndicator)
    resizeObserver.observe(listRef.value)
  }
})

onBeforeUnmount(() => resizeObserver?.disconnect())

// Classes
const tabClasses = (index: number) => [
  'su-tab',
  props.variant && `su-tab--${props.variant}`,
  { 'su-tab--active': index === activeIndex.value }
]
</script>

<template>
  <div
    class="su-tabs"
    :class="`su-tabs--${variant}`"
  >
    <!-- Liste des onglets -->
    <div
      ref="listRef"
      role="tablist"
      class="su-tabs-list"
      :style="hasIndicator ? indicatorStyle : undefined"
      @keydown="handleKeydown"
    >
      <span
        v-if="hasIndicator"
        class="su-tabs-indicator"
        :class="{ 'su-tabs-indicator--ready': indicator.ready }"
        aria-hidden="true"
      />

      <button
        v-for="(tab, index) in tabs"
        :id="`tab-${tabsId}-${index}`"
        :key="index"
        :ref="(el) => setTabRef(el, index)"
        type="button"
        role="tab"
        :aria-controls="`panel-${tabsId}-${index}`"
        :aria-selected="index === activeIndex"
        :tabindex="index === activeIndex ? 0 : -1"
        :class="tabClasses(index)"
        @click="activeIndex = index"
      >
        <!-- Slot custom ou rendu par défaut -->
        <slot
          name="tab"
          :tab="tab"
          :index="index"
        >
          <span>{{ tab.label }}</span>
        </slot>
      </button>
    </div>

    <!-- Contenu -->
    <div
      v-for="(tab, index) in tabs"
      v-show="index === activeIndex"
      :id="`panel-${tabsId}-${index}`"
      :key="index"
      role="tabpanel"
      tabindex="0"
      :aria-labelledby="`tab-${tabsId}-${index}`"
      class="su-tab-panel"
    >
      <slot
        name="panel"
        :tab="tab"
        :index="index"
      >
        <p>{{ tab.content }}</p>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// TABS — trois variantes :
//   underline : filet sous la liste + indicateur primaire animé
//   pills     : liste en fond doux + pastille en surface animée
//   contained : onglets « classeur » attachés au panneau
// ============================================================

.su-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.su-tabs-list {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}

.su-tab {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-sizing: border-box;
  min-height: var(--su-control-height-md);
  padding: 0 0.75rem;
  border: 1px solid transparent;
  border-radius: var(--su-radius-md);
  background: transparent;
  color: var(--su-text-tertiary);
  font: inherit;
  font-size: var(--su-font-size-base);
  font-weight: var(--su-font-weight-medium);
  white-space: nowrap;
  cursor: pointer;
  outline: none;

  @include transition(color, background-color, box-shadow);

  @include up('sm') {
    min-height: var(--su-control-height-md-compact);
    font-size: var(--su-font-size-sm);
  }

  &:hover:not(&--active) {
    color: var(--su-text-secondary);
  }

  &--active {
    color: var(--su-text-primary);
  }

  &:focus-visible {
    @include focus-ring($offset: calc(var(--su-focus-ring-width) * -1));
  }

  &:disabled {
    @include disabled-state;

    pointer-events: none;
  }
}

// Indicateur partagé : position et taille lues sur la liste
.su-tabs-indicator {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: var(--su-tabs-indicator-width);
  height: var(--su-tabs-indicator-height);
  translate: var(--su-tabs-indicator-left) var(--su-tabs-indicator-top);
  pointer-events: none;
  opacity: 0;

  &--ready {
    opacity: 1;

    @include transition(translate, width, height);
  }

  @include high-contrast {
    outline: 1px solid currentcolor;
  }
}

// ### Underline

.su-tabs--underline {
  .su-tabs-list {
    gap: 0.25rem;
    padding-block: 0.25rem;
    box-shadow: inset 0 -1px var(--su-border-alpha);
  }

  .su-tab:hover:not(.su-tab--active) {
    background-color: var(--su-bg-accent);
  }

  // Filet de 2px au pied de l'onglet actif
  .su-tabs-indicator {
    z-index: 1;
    top: auto;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background-color: var(--su-primary-default);
    translate: var(--su-tabs-indicator-left) 0;
  }
}

// ### Pills (contrôle segmenté)

.su-tabs--pills {
  .su-tabs-list {
    align-self: flex-start;
    gap: 0.125rem;
    padding: 0.125rem;
    border-radius: var(--su-radius-control);
    background-color: var(--su-bg-muted);
  }

  .su-tab {
    border-radius: calc(var(--su-radius-control) - 0.125rem);
  }

  // Pastille en surface de contrôle
  .su-tabs-indicator {
    border-radius: calc(var(--su-radius-control) - 0.125rem);
    background-color: var(--su-bg-surface);
    box-shadow: var(--su-shadow-control), 0 0 0 1px var(--su-border-alpha);
  }
}

// ### Contained (classeur)

.su-tabs--contained {
  gap: 0;

  .su-tabs-list {
    gap: 0.25rem;
    padding-inline: 0.5rem;
    box-shadow: inset 0 -1px var(--su-border-alpha);
  }

  .su-tab {
    border-end-start-radius: 0;
    border-end-end-radius: 0;

    &:hover:not(.su-tab--active) {
      background-color: var(--su-bg-accent);
    }

    &--active {
      border-color: var(--su-border-alpha);
      border-bottom-color: var(--su-bg-surface);
      background-color: var(--su-bg-surface);
    }
  }

  .su-tab-panel {
    padding: 1rem;
    border: 1px solid var(--su-border-alpha);
    border-top: 0;
    border-end-start-radius: var(--su-radius-control);
    border-end-end-radius: var(--su-radius-control);
    background-color: var(--su-bg-surface);
  }
}

// ### Panneau

.su-tab-panel {
  outline: none;
  border-radius: var(--su-radius-md);
  animation: su-tab-panel-in var(--su-duration-normal) var(--su-ease-out);

  &:focus-visible {
    @include focus-ring;
  }

  @include motion-reduce {
    animation: none;
  }
}

@keyframes su-tab-panel-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
