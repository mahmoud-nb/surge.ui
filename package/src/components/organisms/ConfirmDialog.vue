<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Dialog from './Dialog.vue'
import Button from '../atoms/Button.vue'
import { useConfirm } from '@/composables/useConfirm'
import { useLocale } from '@/composables/useLocale'

// ============================================================
// CONFIRM DIALOG — affiche les demandes de useConfirm(), une à la
// fois, dans un SuDialog en role="alertdialog". Échap, le fond ou
// « Annuler » répondent false. Focus initial (autofocus, honoré par
// showModal) : Annuler pour une action dangereuse, Confirmer sinon.
// ============================================================

const confirmer = useConfirm()
const unregister = confirmer.register()
onBeforeUnmount(unregister)

const { t } = useLocale()
const request = computed(() => confirmer.current.value)
const isDanger = computed(() => request.value?.tone === 'danger')

const title = computed(() => request.value?.title ?? t('confirm.title'))
const confirmText = computed(() => request.value?.confirmLabel ?? t('confirm.confirm'))
const cancelText = computed(() => request.value?.cancelLabel ?? t('confirm.cancel'))

const dialogRef = ref<InstanceType<typeof Dialog>>()

// Fermeture par Échap ou par le fond : la demande affichée est refusée.
// S'il en reste une, le dialog se rouvre (le v-model n'a pas changé).
const handleClose = async () => {
  if (!confirmer.current.value) return
  confirmer.settle(false)
  await nextTick()
  if (confirmer.current.value) dialogRef.value?.open()
}

// Demande suivante dans un dialog resté ouvert : les boutons sont
// recréés, le focus va au bouton par défaut (autofocus)
watch(() => request.value?.id, async (id, previous) => {
  if (id === undefined || previous === undefined) return
  await nextTick()
  dialogRef.value?.dialogRef?.querySelector<HTMLElement>('[autofocus]')?.focus()
})
</script>

<template>
  <Dialog
    ref="dialogRef"
    :model-value="!!request"
    :title="title"
    :description="request?.description"
    :close-on-overlay-click="!isDanger"
    width="28rem"
    role="alertdialog"
    class="su-confirm-dialog"
    @close="handleClose"
  >
    <template #footer>
      <Button
        :key="`cancel-${request?.id}`"
        variant="outline"
        :autofocus="isDanger || undefined"
        @click="confirmer.settle(false)"
      >
        {{ cancelText }}
      </Button>
      <Button
        :key="`confirm-${request?.id}`"
        :variant="isDanger ? 'custom' : 'primary'"
        :class="{ 'su-confirm-dialog__danger': isDanger }"
        :autofocus="!isDanger || undefined"
        @click="confirmer.settle(true)"
      >
        {{ confirmText }}
      </Button>
    </template>
  </Dialog>
</template>

<style lang="scss">
@use '../../styles/abstracts' as *;

// Action dangereuse : bouton plein rouge (variante custom du bouton).
// text-on-inverse : blanc en clair, sombre en mode sombre, lisible sur
// la teinte d'erreur de chaque mode.
.su-confirm-dialog__danger {
  --su-custom-button-bg: var(--su-state-error);
  --su-custom-button-hover-bg: #{with-alpha(state-error, 90%)};
  --su-custom-button-color: var(--su-text-on-inverse);
  --su-custom-button-border: 1px solid var(--su-state-error);
}
</style>
