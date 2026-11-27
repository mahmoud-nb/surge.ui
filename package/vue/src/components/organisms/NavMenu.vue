<script setup lang="ts">
import { computed, getCurrentInstance, ref, useId, watch } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import type { LinkTo, NavMenuItem, NavMenuProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useLinkComponent } from '@/composables/useLinkComponent'
import Badge from '../atoms/Badge.vue'
import Tooltip from '../molecules/Tooltip.vue'

// ============================================================
// NAV MENU — navigation latérale d'une application (motif APG
// « disclosure navigation ») : un repère <nav> nommé, des listes de
// liens, des groupes titrés, un niveau de sous-éléments dépliables
// (bouton aria-expanded). Pas de role="menu" : ce sont des liens.
// - Élément actif (aria-current="page") : prop `active`, sinon
//   v-model (value), sinon route courante (Vue Router, Nuxt).
// - `collapsed` : icônes seules ; le libellé reste lu et s'affiche
//   dans une infobulle visuelle. Un parent déplie le menu.
// - Clavier : Tab parcourt les liens, Entrée / Espace déplie.
// ============================================================

const props = withDefaults(defineProps<NavMenuProps>(), {
  match: 'exact'
})

/** Élément actif (value), pour une navigation gérée par l'application */
const model = defineModel<string | number>()
/** Icônes seules (barre latérale réduite) */
const collapsed = defineModel<boolean>('collapsed', { default: false })

const emit = defineEmits<{
  /** Élément choisi (lien suivi ou bouton) */
  select: [item: NavMenuItem, event: MouseEvent]
}>()

const { t } = useLocale()
const labelText = computed(() => props.label ?? t('navMenu.label'))
const baseId = `su-nav-menu-${useId()}`

// ### Sections : groupes titrés, et éléments libres regroupés

interface Section {
  key: string
  label?: string
  items: NavMenuItem[]
}

const sections = computed<Section[]>(() => {
  const result: Section[] = []
  let loose: NavMenuItem[] | undefined
  props.items.forEach((entry, index) => {
    if (entry.type === 'group') {
      loose = undefined
      result.push({ key: `g${index}`, label: entry.label, items: entry.items })
      return
    }
    if (!loose) {
      loose = []
      result.push({ key: `s${index}`, items: loose })
    }
    loose.push(entry)
  })
  return result
})

const keyOf = (section: Section, item: NavMenuItem, index: number) =>
  item.value !== undefined ? `v-${item.value}` : `${section.key}-${index}`

// ### Élément actif

interface RouterLike {
  currentRoute?: { value?: { path?: string } }
  resolve?: (to: LinkTo) => { path?: string }
}
const router = getCurrentInstance()?.appContext.config.globalProperties.$router as RouterLike | undefined
const currentPath = computed(() => router?.currentRoute?.value?.path)

const pathOf = (to: LinkTo): string | undefined => {
  try {
    const path = router?.resolve?.(to).path
    if (path) return path
  } catch {
    // Route inconnue : repli sur le chemin donné
  }
  if (typeof to === 'string') return to.split(/[?#]/)[0]
  const path = (to as { path?: unknown }).path
  return typeof path === 'string' ? path : undefined
}

const matchesRoute = (to: LinkTo): boolean => {
  const current = currentPath.value
  const target = pathOf(to)
  if (!current || !target) return false
  if (current === target) return true
  if (props.match !== 'prefix' || target === '/') return false
  return current.startsWith(target.endsWith('/') ? target : `${target}/`)
}

const isActive = (item: NavMenuItem): boolean => {
  if (item.active !== undefined) return item.active
  if (model.value !== undefined && item.value !== undefined) return model.value === item.value
  return item.to !== undefined && matchesRoute(item.to)
}

const containsActive = (item: NavMenuItem) => !!item.items?.some(isActive)

// ### Sous-éléments dépliés

const openKeys = ref(new Set<string>())

sections.value.forEach((section) =>
  section.items.forEach((item, index) => {
    if (item.items?.length && item.defaultOpen) openKeys.value.add(keyOf(section, item, index))
  })
)

// Le parent de l'élément actif s'ouvre (au premier rendu et à chaque navigation)
const activeParents = computed(() =>
  sections.value.flatMap((section) =>
    section.items.flatMap((item, index) => (containsActive(item) ? [keyOf(section, item, index)] : []))
  )
)
watch(activeParents, (keys) => keys.forEach((key) => openKeys.value.add(key)), { immediate: true })

const isOpen = (key: string) => !collapsed.value && openKeys.value.has(key)

const toggle = (key: string) => {
  // Barre réduite : le parent déplie le menu et s'ouvre
  if (collapsed.value) {
    collapsed.value = false
    openKeys.value.add(key)
    return
  }
  if (openKeys.value.has(key)) openKeys.value.delete(key)
  else openKeys.value.add(key)
}

// ### Rendu d'un élément : lien du routeur, lien ou bouton

const { linkFor } = useLinkComponent()

const elementOf = (item: NavMenuItem): { is: unknown; attrs: Record<string, unknown> } => {
  const current = isActive(item) ? { 'aria-current': 'page' } : {}
  if (item.disabled) return { is: 'a', attrs: { role: 'link', 'aria-disabled': 'true' } }
  const rel = item.rel ?? (item.target === '_blank' ? 'noopener noreferrer' : undefined)
  if (item.to !== undefined) {
    const link = linkFor(item.to)
    return { is: link.is, attrs: { ...link.attrs, target: item.target, rel, ...current } }
  }
  if (item.href) return { is: 'a', attrs: { href: item.href, target: item.target, rel, ...current } }
  return { is: 'button', attrs: { type: 'button', ...current } }
}

const handleSelect = (item: NavMenuItem, event: MouseEvent) => {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  if (item.value !== undefined) model.value = item.value
  emit('select', item, event)
}

const hasBadge = (item: NavMenuItem) => item.badge !== undefined && item.badge !== ''
</script>

<template>
  <nav
    :class="['su-nav-menu', { 'su-nav-menu--collapsed': collapsed }]"
    :aria-label="labelText"
  >
    <div
      v-for="section in sections"
      :key="section.key"
      class="su-nav-menu__section"
    >
      <span
        v-if="section.label"
        :id="`${baseId}-${section.key}`"
        class="su-nav-menu__group-label"
      >{{ section.label }}</span>

      <ul
        class="su-nav-menu__list"
        :aria-labelledby="section.label ? `${baseId}-${section.key}` : undefined"
      >
        <li
          v-for="(item, index) in section.items"
          :key="keyOf(section, item, index)"
          class="su-nav-menu__item"
        >
          <Tooltip
            class="su-nav-menu__tooltip"
            :content="item.label"
            placement="right"
            :describe="false"
            :disabled="!collapsed"
          >
            <!-- Parent : bouton qui déplie ses sous-éléments -->
            <button
              v-if="item.items?.length"
              type="button"
              :class="['su-nav-menu__link', 'su-nav-menu__link--parent', { 'su-nav-menu__link--has-active': containsActive(item) }]"
              :aria-expanded="isOpen(keyOf(section, item, index))"
              :aria-controls="`${baseId}-${keyOf(section, item, index)}`"
              :disabled="item.disabled"
              @click="toggle(keyOf(section, item, index))"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="su-nav-menu__icon"
                aria-hidden="true"
              />
              <span
                v-else-if="collapsed"
                class="su-nav-menu__initial"
                aria-hidden="true"
              >{{ item.label.charAt(0) }}</span>
              <span class="su-nav-menu__label">{{ item.label }}</span>
              <ChevronDownIcon
                class="su-nav-menu__chevron"
                aria-hidden="true"
              />
            </button>

            <!-- Lien (ou bouton d'une navigation gérée par l'application) -->
            <component
              :is="elementOf(item).is"
              v-else
              v-bind="elementOf(item).attrs"
              class="su-nav-menu__link"
              @click="handleSelect(item, $event)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="su-nav-menu__icon"
                aria-hidden="true"
              />
              <span
                v-else-if="collapsed"
                class="su-nav-menu__initial"
                aria-hidden="true"
              >{{ item.label.charAt(0) }}</span>
              <span class="su-nav-menu__label">{{ item.label }}</span>
              <template v-if="hasBadge(item)">
                <span
                  v-if="collapsed"
                  class="su-nav-menu__dot"
                  aria-hidden="true"
                />
                <Badge
                  v-else
                  class="su-nav-menu__badge"
                  :variant="item.badgeVariant ?? 'default'"
                  size="sm"
                  :aria-hidden="item.badgeLabel ? 'true' : undefined"
                >
                  {{ item.badge }}
                </Badge>
                <span
                  v-if="collapsed || item.badgeLabel"
                  class="sr-only"
                >{{ item.badgeLabel ?? item.badge }}</span>
              </template>
            </component>
          </Tooltip>

          <ul
            v-if="item.items?.length"
            v-show="isOpen(keyOf(section, item, index))"
            :id="`${baseId}-${keyOf(section, item, index)}`"
            class="su-nav-menu__sublist"
          >
            <li
              v-for="(child, childIndex) in item.items"
              :key="child.value ?? childIndex"
              class="su-nav-menu__item"
            >
              <component
                :is="elementOf(child).is"
                v-bind="elementOf(child).attrs"
                class="su-nav-menu__link su-nav-menu__link--child"
                @click="handleSelect(child, $event)"
              >
                <component
                  :is="child.icon"
                  v-if="child.icon"
                  class="su-nav-menu__icon"
                  aria-hidden="true"
                />
                <span class="su-nav-menu__label">{{ child.label }}</span>
                <template v-if="hasBadge(child)">
                  <Badge
                    class="su-nav-menu__badge"
                    :variant="child.badgeVariant ?? 'default'"
                    size="sm"
                    :aria-hidden="child.badgeLabel ? 'true' : undefined"
                  >
                    {{ child.badge }}
                  </Badge>
                  <span
                    v-if="child.badgeLabel"
                    class="sr-only"
                  >{{ child.badgeLabel }}</span>
                </template>
              </component>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// NAV MENU — liens pleine largeur (36px), élément actif posé sur
// --su-bg-selected ; en mode réduit, icônes centrées et libellés
// masqués (toujours lus)
// ============================================================

.su-nav-menu {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  font-size: var(--su-font-size-sm);

  .su-nav-menu__section {
    display: flex;
    flex-direction: column;
    gap: $spacing-1;
  }

  .su-nav-menu__group-label {
    padding-inline: $spacing-3;
    color: var(--su-text-tertiary);
    font-size: var(--su-font-size-xs);
    font-weight: var(--su-font-weight-semibold);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .su-nav-menu__list,
  .su-nav-menu__sublist {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .su-nav-menu__sublist {
    margin-block-start: 2px;
    margin-inline-start: calc(#{$spacing-3} + 0.625rem);
    padding-inline-start: $spacing-2;
    border-inline-start: 1px solid var(--su-border-subtle);
  }

  // Sélecteurs imbriqués : résistent aux styles de contenu de la page (li + li…)
  .su-nav-menu__item {
    margin: 0;
  }

  .su-nav-menu__tooltip {
    display: flex;
    inline-size: 100%;
  }

  .su-nav-menu__link {
    position: relative;
    display: flex;
    align-items: center;
    gap: $spacing-2;
    inline-size: 100%;
    min-block-size: var(--su-control-height-md);
    padding-inline: $spacing-3;
    border: 0;
    border-radius: var(--su-radius-control);
    background: transparent;
    color: var(--su-text-secondary);
    font: inherit;
    text-align: start;
    text-decoration: none;
    cursor: pointer;

    @include transition(background-color, color);

    &:hover {
      background-color: var(--su-bg-hover);
      color: var(--su-text-primary);
    }

    &:focus-visible {
      @include focus-ring;
    }

    &[aria-current='page'] {
      background-color: var(--su-bg-selected);
      color: var(--su-text-primary);
      font-weight: var(--su-font-weight-medium);
    }

    &[aria-disabled='true'],
    &:disabled {
      @include disabled-state;

      background: transparent;
      color: var(--su-text-secondary);
    }
  }

  .su-nav-menu__link--has-active {
    color: var(--su-text-primary);
  }

  .su-nav-menu__link--child {
    min-block-size: var(--su-control-height-sm);
  }

  .su-nav-menu__icon,
  .su-nav-menu__initial {
    flex-shrink: 0;
    inline-size: 1.25rem;
    block-size: 1.25rem;
  }

  .su-nav-menu__initial {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--su-font-weight-semibold);
  }

  .su-nav-menu__label {
    flex: 1;
    min-inline-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .su-nav-menu__chevron {
    flex-shrink: 0;
    inline-size: 1rem;
    block-size: 1rem;

    @include transition(rotate);
  }

  .su-nav-menu__link[aria-expanded='true'] .su-nav-menu__chevron {
    rotate: 180deg;
  }

  .su-nav-menu__badge {
    flex-shrink: 0;
  }

  .su-nav-menu__dot {
    position: absolute;
    inset-block-start: 0.375rem;
    inset-inline-end: 0.375rem;
    inline-size: 0.5rem;
    block-size: 0.5rem;
    border-radius: 50%;
    background-color: var(--su-primary-default);
  }

  // ### Barre réduite : icônes seules

  &--collapsed {
    .su-nav-menu__group-label,
    .su-nav-menu__label {
      @include sr-only;
    }

    .su-nav-menu__section + .su-nav-menu__section {
      padding-block-start: $spacing-3;
      border-block-start: 1px solid var(--su-border-subtle);
    }

    .su-nav-menu__link {
      justify-content: center;
      padding-inline: 0;
    }

    .su-nav-menu__chevron {
      display: none;
    }
  }
}
</style>
