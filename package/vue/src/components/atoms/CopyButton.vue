<script setup lang="ts">
import { computed } from 'vue'
import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/vue/24/outline'
import type { CopyButtonProps } from '@/types'
import { useClipboard } from '@/composables/useClipboard'
import { useAnnouncer } from '@/composables/useAnnouncer'
import { useLocale } from '@/composables/useLocale'
import Button from './Button.vue'

// ============================================================
// COPY BUTTON — copie un texte dans le presse-papiers.
// Le nom du bouton reste stable (« Copier ») ; le résultat est
// annoncé par une région live (« Copié dans le presse-papiers »,
// ou l'erreur), et le libellé visible passe à « Copié ».
// ============================================================

const props = withDefaults(defineProps<CopyButtonProps>(), {
  iconOnly: false,
  variant: 'ghost',
  size: 'sm',
  timeout: 2000
})

const emit = defineEmits<{
  /** Copie réussie */
  copy: [value: string]
  /** Copie impossible (permission refusée, navigateur) */
  error: [error: unknown]
}>()

const { t } = useLocale()
const { announce } = useAnnouncer()
const { copy, copied, error } = useClipboard({ timeout: props.timeout })

const labelText = computed(() => props.label ?? t('copyButton.copy'))
const copiedText = computed(() => props.copiedLabel ?? t('copyButton.copied'))

const handleClick = async () => {
  if (await copy(props.value)) {
    announce(t('copyButton.announce'))
    emit('copy', props.value)
  } else {
    announce(t('copyButton.error'), { priority: 'assertive' })
    emit('error', error.value)
  }
}
</script>

<template>
  <Button
    :class="['su-copy-button', { 'su-copy-button--copied': copied }]"
    :variant="variant"
    :size="size"
    :icon="copied ? CheckIcon : ClipboardDocumentIcon"
    :icon-display="iconOnly ? 'only' : 'left'"
    :aria-label="iconOnly ? labelText : undefined"
    @click="handleClick"
  >
    <template v-if="!iconOnly">
      {{ copied ? copiedText : labelText }}
    </template>
  </Button>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// Coche de confirmation en couleur de succès
.su-copy-button--copied .su-button__icon {
  color: var(--su-state-success-fg);
}
</style>
