<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import Dialog from './Dialog.vue'
import Kbd from '../atoms/Kbd.vue'
import type { CommandItem, CommandPaletteProps } from '@/types'
import { useLocale } from '@/composables/useLocale'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { useListNavigation } from '@/composables/useListNavigation'

// ============================================================
// COMMAND PALETTE — recherche et exécution de commandes au clavier,
// ouverte par Ctrl / ⌘ + K. SuDialog modal natif contenant un champ
// combobox et une liste groupée (role="listbox" > "group" > "option").
// - Le focus reste dans le champ ; ↑ / ↓ parcourent les résultats
//   (aria-activedescendant), Entrée exécute, Échap ferme.
// - Résultats triés : début du libellé, puis libellé, puis mots-clés.
// - Le nombre de résultats est annoncé (dans le dialog).
// ============================================================

const props = withDefaults(defineProps<CommandPaletteProps>(), {
  commands: () => [],
  hotkey: 'k'
})

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  select: [command: CommandItem]
}>()

const { t } = useLocale()
const { announce } = useAnnouncer()
const label = computed(() => props.ariaLabel ?? t('commandPalette.label'))
const placeholderText = computed(() => props.placeholder ?? t('commandPalette.placeholder'))
const emptyText = computed(() => props.emptyText ?? t('commandPalette.empty'))

const uid = useId()
const listboxId = `command-list-${uid}`
const optionId = (index: number) => `${listboxId}-${index}`
const groupId = (index: number) => `${listboxId}-group-${index}`

const query = ref('')
const inputRef = ref<HTMLInputElement>()

// ### Recherche

const fold = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase()

const score = (command: CommandItem, folded: string): number => {
  const label = fold(command.label)
  if (label.startsWith(folded)) return 0
  if (label.includes(folded)) return 1
  const extra = fold([command.description, ...(command.keywords ?? [])].filter(Boolean).join(' '))
  return extra.includes(folded) ? 2 : -1
}

// Résultats triés par pertinence puis regroupés (groupes dans l'ordre d'apparition)
const results = computed<CommandItem[]>(() => {
  const folded = fold(query.value.trim())
  const ranked = folded
    ? props.commands
      .map((command, index) => ({ command, index, rank: score(command, folded) }))
      .filter((entry) => entry.rank >= 0)
      .sort((a, b) => a.rank - b.rank || a.index - b.index)
      .map((entry) => entry.command)
    : props.commands
  const groups = [...new Set(ranked.map((command) => command.group ?? ''))]
  return groups.flatMap((group) => ranked.filter((command) => (command.group ?? '') === group))
})

const groupedResults = computed(() => {
  const groups: { name: string; items: { command: CommandItem; index: number }[] }[] = []
  results.value.forEach((command, index) => {
    const name = command.group ?? ''
    let group = groups.find((item) => item.name === name)
    if (!group) groups.push((group = { name, items: [] }))
    group.items.push({ command, index })
  })
  return groups
})

const nav = useListNavigation({
  items: results,
  isDisabled: (command) => !!command.disabled,
  mode: 'virtual',
  loop: true
})
const activeIndex = nav.activeIndex

// Premier résultat actif : Entrée exécute directement la meilleure commande
watch(results, () => {
  nav.reset()
  nav.first()
})

watch(activeIndex, async (index) => {
  if (index < 0) return
  await nextTick()
  document.getElementById(optionId(index))?.scrollIntoView?.({ block: 'nearest' })
})

// ### Ouverture

watch(open, (value) => {
  if (!value) return
  query.value = ''
  nav.reset()
  nav.first()
}, { immediate: true })

const run = async (command: CommandItem) => {
  if (command.disabled) return
  open.value = false
  emit('select', command)
  // Après la fermeture : le focus est revenu au déclencheur
  await nextTick()
  command.onSelect?.()
}

// ### Annonce du nombre de résultats

let announceTimer: ReturnType<typeof setTimeout> | undefined
watch([results, open], () => {
  clearTimeout(announceTimer)
  if (!open.value) return
  announceTimer = setTimeout(() => {
    const count = results.value.length
    announce(count ? t('commandPalette.results', { count }) : emptyText.value)
  }, 600)
})

// ### Clavier

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const command = results.value[activeIndex.value]
    if (command) {
      event.preventDefault()
      run(command)
    }
    return
  }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || ((event.key === 'Home' || event.key === 'End') && event.ctrlKey)) {
    event.preventDefault()
    if (event.key === 'ArrowDown') nav.next()
    else if (event.key === 'ArrowUp') nav.previous()
    else if (event.key === 'Home') nav.first()
    else nav.last()
  }
}

// Raccourci global : Ctrl / ⌘ + touche
const handleHotkey = (event: KeyboardEvent) => {
  if (!props.hotkey || event.altKey || event.shiftKey) return
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== props.hotkey.toLowerCase()) return
  event.preventDefault()
  open.value = !open.value
}

onMounted(() => window.addEventListener('keydown', handleHotkey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleHotkey)
  clearTimeout(announceTimer)
})
</script>

<template>
  <Dialog
    v-model="open"
    class="su-command-palette"
    :aria-label="label"
    width="36rem"
  >
    <div class="su-command-palette__search">
      <MagnifyingGlassIcon
        class="su-command-palette__search-icon"
        aria-hidden="true"
      />
      <input
        ref="inputRef"
        v-model="query"
        class="su-command-palette__input"
        type="text"
        role="combobox"
        autocomplete="off"
        spellcheck="false"
        autofocus
        aria-autocomplete="list"
        aria-expanded="true"
        :aria-controls="listboxId"
        :aria-activedescendant="activeIndex >= 0 ? optionId(activeIndex) : undefined"
        :aria-label="placeholderText"
        :placeholder="placeholderText"
        @keydown="handleKeydown"
      >
    </div>

    <div
      :id="listboxId"
      role="listbox"
      class="su-command-palette__list"
      :aria-label="label"
      @pointerdown.prevent
    >
      <div
        v-for="(group, groupIndex) in groupedResults"
        :key="group.name || 'default'"
        role="group"
        class="su-command-palette__group"
        :aria-labelledby="group.name ? groupId(groupIndex) : undefined"
      >
        <div
          v-if="group.name"
          :id="groupId(groupIndex)"
          role="presentation"
          class="su-command-palette__group-label"
        >
          {{ group.name }}
        </div>
        <div
          v-for="{ command, index } in group.items"
          :id="optionId(index)"
          :key="command.id"
          role="option"
          :aria-selected="index === activeIndex ? 'true' : 'false'"
          :aria-disabled="command.disabled ? 'true' : undefined"
          :class="['su-command-palette__option', { 'su-command-palette__option--active': index === activeIndex }]"
          @click="run(command)"
          @pointermove="!command.disabled && nav.setActiveIndex(index)"
        >
          <component
            :is="command.icon"
            v-if="command.icon"
            class="su-command-palette__icon"
            aria-hidden="true"
          />
          <span class="su-command-palette__text">
            <span class="su-command-palette__label">{{ command.label }}</span>
            <span
              v-if="command.description"
              class="su-command-palette__description"
            >{{ command.description }}</span>
          </span>
          <Kbd
            v-if="command.shortcut?.length"
            class="su-command-palette__shortcut"
            :keys="command.shortcut"
            size="sm"
          />
        </div>
      </div>

      <div
        v-if="!results.length"
        class="su-command-palette__empty"
      >
        {{ emptyText }}
      </div>
    </div>
  </Dialog>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// ============================================================
// COMMAND PALETTE — dialog placé dans le tiers haut de l'écran,
// champ de recherche sans cadre, liste groupée défilante
// ============================================================

.su-dialog.su-command-palette {
  margin-top: 12vh;

  // Échap ou le fond ferment la palette : pas de bouton de fermeture
  > .su-dialog__close {
    display: none;
  }

  .su-dialog-content {
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }
}

.su-command-palette__search {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--su-border-alpha);
}

.su-command-palette__search-icon {
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  color: var(--su-text-tertiary);
}

.su-command-palette__input {
  flex: 1;
  min-width: 0;
  height: 3rem;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--su-text-primary);
  font: inherit;
  font-size: var(--su-font-size-base);

  &::placeholder {
    color: var(--su-text-tertiary);
  }
}

.su-command-palette__list {
  max-height: min(24rem, 60vh);
  padding: 0.375rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.su-command-palette__group + .su-command-palette__group {
  margin-top: 0.375rem;
}

.su-command-palette__group-label {
  padding: 0.375rem 0.5rem 0.25rem;
  color: var(--su-text-tertiary);
  font-size: var(--su-font-size-xs);
  font-weight: var(--su-font-weight-medium);
}

.su-command-palette__option {
  @include menu-item('&--active');

  min-height: 2.5rem;
  font-size: var(--su-font-size-sm);

  @include up('sm') {
    min-height: 2.25rem;
  }
}

.su-command-palette__icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: var(--su-text-tertiary);
}

.su-command-palette__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.su-command-palette__label {
  @include truncate;
}

.su-command-palette__description {
  color: var(--su-text-tertiary);
  font-size: var(--su-font-size-xs);

  @include truncate;
}

.su-command-palette__shortcut {
  flex-shrink: 0;
  margin-inline-start: auto;
}

.su-command-palette__empty {
  padding: 2rem 1rem;
  color: var(--su-text-tertiary);
  font-size: var(--su-font-size-sm);
  text-align: center;
}
</style>
