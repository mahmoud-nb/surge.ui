<script setup lang="ts" generic="T extends string | number = number">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch, useId, useSlots, type Component } from 'vue'
import type { TabItem, TabsProps } from '@/types'
import { useListNavigation } from '@/composables/useListNavigation'
import { useLinkComponent } from '@/composables/useLinkComponent'

// ============================================================
// TABS — trois usages :
//   - un panneau par onglet (slot `panel` ou `content`) ;
//   - panneau unique : le slot par défaut est le contenu de l'onglet
//     actif, géré par la page (v-model sur la `value` des onglets) ;
//   - navigation : des onglets avec `to` forment une <nav> de liens
//     (aria-current="page") et l'onglet actif suit la route.
// ============================================================

const props = withDefaults(defineProps<TabsProps<T>>(), {
  tabs: () => [],
  variant: 'underline'
})

const emit = defineEmits<{ 'update:modelValue': [value: T] }>()
const slots = useSlots()

// Panneaux par onglet : seulement s'il y a un contenu à y mettre (sinon un
// panneau vide et focalisable par onglet, sans rien à lire)
const hasPanels = computed(() =>
  !!slots.panel || props.tabs.some((tab) => tab.content !== undefined && tab.content !== '')
)

const tabsId = useId()
const tabId = (index: number) => `tab-${tabsId}-${index}`
const panelId = (index: number) => `panel-${tabsId}-${index}`
const singlePanelId = `panel-${tabsId}`

// Clé d'un onglet pour le v-model : sa `value`, sinon son indice
const keyOf = (tab: TabItem<T>, index: number) => (tab.value ?? index) as T
const indexOf = (key: T | undefined) => {
  if (key === undefined) return 0
  const index = props.tabs.findIndex((tab, i) => keyOf(tab, i) === key)
  return index === -1 ? 0 : index
}

// Navigation : l'onglet actif vient de la route (détecté après le rendu),
// sauf si un v-model le fixe
const isNavigation = computed(() => props.tabs.some((tab) => tab.to !== undefined))
const followsRoute = () => isNavigation.value && props.modelValue === undefined

const activeIndex = ref(followsRoute() ? -1 : indexOf(props.modelValue))
const activeTab = computed(() => props.tabs[activeIndex.value])

watch(() => props.modelValue, (key) => {
  if (!followsRoute()) activeIndex.value = indexOf(key)
})
watch(() => props.tabs.map(keyOf).join('|'), () => {
  if (props.modelValue !== undefined) activeIndex.value = indexOf(props.modelValue)
})
watch(activeIndex, (index) => {
  const tab = props.tabs[index]
  if (!tab) return
  const key = keyOf(tab, index)
  if (key !== props.modelValue) emit('update:modelValue', key)
})

// Onglets (boutons ou liens), pour le focus et la mesure de l'indicateur
const tabRefs = ref<(HTMLElement | null)[]>([])
const setTabRef = (el: unknown, index: number) => {
  tabRefs.value[index] = (el as { $el?: HTMLElement } | null)?.$el ?? (el as HTMLElement | null)
}

// Gestion du clavier : flèches gauche / droite (inversées en RTL), Début /
// Fin, en boucle. Le focus suit l'onglet, qui est activé aussitôt
// (pattern WAI-ARIA « activation automatique »)
const tabNav = useListNavigation({
  items: () => props.tabs,
  orientation: 'horizontal',
  loop: true,
  mode: 'roving',
  getElement: (index) => tabRefs.value[index] ?? undefined,
  onActiveChange: (index) => {
    activeIndex.value = index
  }
})

const handleKeydown = (event: KeyboardEvent) => {
  // Point de départ : l'onglet actif (ou l'onglet focalisé, repris par la navigation)
  tabNav.activeIndex.value = activeIndex.value
  tabNav.handleKeydown(event)
}

// ### Navigation

const { component: routerLink, linkFor, toHref } = useLinkComponent()

// Lien d'un onglet de navigation. Sans routeur, aria-current est posé ici ;
// avec RouterLink, c'est lui qui le pose (un attribut, même vide, l'écraserait).
const tabLink = (tab: TabItem<T>, index: number): { is: Component | string; attrs: Record<string, unknown> } => {
  if (tab.to === undefined) return { is: 'span', attrs: {} }
  const link = linkFor(tab.to)
  if (!routerLink && index === activeIndex.value) return { is: link.is, attrs: { ...link.attrs, 'aria-current': 'page' } }
  return link
}

// Onglet de la route courante : lien exact (aria-current), sinon lien
// actif (route parente, classe router-link-active), sinon chemin du document
const detectActive = () => {
  if (!followsRoute()) return
  let index = -1
  if (routerLink) {
    index = tabRefs.value.findIndex((el) => el?.getAttribute('aria-current') === 'page')
    if (index === -1) index = tabRefs.value.findIndex((el) => el?.classList.contains('router-link-active'))
  } else if (typeof window !== 'undefined') {
    index = props.tabs.findIndex((tab) => tab.to !== undefined && toHref(tab.to) === window.location.pathname)
  }
  activeIndex.value = index
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
  if (!tab) {
    indicator.ready = false
    return
  }
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

let resizeObserver: ResizeObserver | undefined
let dirObserver: MutationObserver | undefined
let routeObserver: MutationObserver | undefined

// Recalcule si la liste ou un onglet change de taille : police chargée,
// responsive, libellés traduits (un onglet qui s'élargit décale les suivants)
const observeSizes = () => {
  if (!resizeObserver) return
  resizeObserver.disconnect()
  if (listRef.value) resizeObserver.observe(listRef.value)
  tabRefs.value.forEach((tab) => tab && resizeObserver!.observe(tab))
}

// Navigation : RouterLink met à jour aria-current et ses classes à chaque
// changement de route ; on suit ces attributs plutôt que le routeur
const observeRoute = () => {
  routeObserver?.disconnect()
  if (!followsRoute() || !listRef.value || typeof MutationObserver === 'undefined') return
  routeObserver = new MutationObserver(detectActive)
  routeObserver.observe(listRef.value, { attributes: true, attributeFilter: ['aria-current', 'class'], subtree: true })
}

watch([activeIndex, () => props.tabs.length, () => props.variant], () => nextTick(updateIndicator))
watch(() => props.tabs.length, () => nextTick(() => {
  observeSizes()
  detectActive()
}))
watch(isNavigation, () => nextTick(() => {
  detectActive()
  observeRoute()
}))

onMounted(() => {
  detectActive()
  observeRoute()
  updateIndicator()
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(updateIndicator)
    observeSizes()
  }
  // Changement de sens à chaud (dir sur <html> ou un ancêtre) : les onglets
  // changent de place sans changer de taille, aucun ResizeObserver ne le voit
  if (typeof MutationObserver !== 'undefined') {
    dirObserver = new MutationObserver(() => nextTick(updateIndicator))
    dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'], subtree: true })
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  dirObserver?.disconnect()
  routeObserver?.disconnect()
})

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
    :class="[`su-tabs--${variant}`, { 'su-tabs--navigation': isNavigation }]"
  >
    <!-- Navigation : liens vers des pages -->
    <nav
      v-if="isNavigation"
      class="su-tabs-nav"
      :aria-label="label"
    >
      <div
        ref="listRef"
        class="su-tabs-list"
        :style="hasIndicator ? indicatorStyle : undefined"
      >
        <span
          v-if="hasIndicator"
          class="su-tabs-indicator"
          :class="{ 'su-tabs-indicator--ready': indicator.ready }"
          aria-hidden="true"
        />

        <component
          :is="tabLink(tab, index).is"
          v-for="(tab, index) in tabs"
          :key="index"
          :ref="(el: unknown) => setTabRef(el, index)"
          v-bind="tabLink(tab, index).attrs"
          :class="tabClasses(index)"
        >
          <slot
            name="tab"
            :tab="tab"
            :index="index"
          >
            <span>{{ tab.label }}</span>
          </slot>
        </component>
      </div>
    </nav>

    <!-- Onglets -->
    <div
      v-else
      ref="listRef"
      role="tablist"
      class="su-tabs-list"
      :aria-label="label"
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
        :id="tabId(index)"
        :key="index"
        :ref="(el: unknown) => setTabRef(el, index)"
        type="button"
        role="tab"
        :aria-controls="$slots.default ? (index === activeIndex ? singlePanelId : undefined) : hasPanels ? panelId(index) : undefined"
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

    <!-- Navigation : contenu libre sous les liens (ex. RouterView) -->
    <div
      v-if="isNavigation && $slots.default"
      class="su-tabs-content"
    >
      <slot
        :tab="activeTab"
        :index="activeIndex"
        :value="activeTab ? keyOf(activeTab, activeIndex) : undefined"
      />
    </div>

    <!-- Panneau unique : contenu de l'onglet actif, géré par la page -->
    <div
      v-else-if="$slots.default"
      :id="singlePanelId"
      role="tabpanel"
      tabindex="0"
      :aria-labelledby="activeTab ? tabId(activeIndex) : undefined"
      class="su-tab-panel"
    >
      <slot
        :tab="activeTab"
        :index="activeIndex"
        :value="activeTab ? keyOf(activeTab, activeIndex) : undefined"
      />
    </div>

    <!-- Un panneau par onglet (slot `panel` ou `content`) ; sans contenu, aucun
         panneau : la liste d'onglets sert alors de filtre ou de sélecteur -->
    <template v-else-if="!isNavigation && hasPanels">
      <div
        v-for="(tab, index) in tabs"
        v-show="index === activeIndex"
        :id="panelId(index)"
        :key="index"
        role="tabpanel"
        tabindex="0"
        :aria-labelledby="tabId(index)"
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
    </template>
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
  text-decoration: none; // onglets de navigation (liens)
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
