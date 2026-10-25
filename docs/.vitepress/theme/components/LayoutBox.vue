<script setup lang="ts">
// Zone de démonstration des layouts (bordure pointillée et libellé)
withDefaults(defineProps<{
  label?: string
  /** Hauteur minimale (longueur CSS) */
  height?: string
  /** Zone mise en avant (contenu principal, à la une…) */
  accent?: boolean
}>(), {
  label: '',
  height: 'auto',
  accent: false
})
</script>

<template>
  <div
    class="layout-box"
    :class="{ 'layout-box--accent': accent }"
    :style="{ minHeight: height }"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<style scoped>
.layout-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem;
  border: 1px dashed var(--su-border-default, var(--vp-c-divider));
  border-radius: 10px;
  background: var(--su-bg-muted, var(--vp-c-bg-soft));
  color: var(--su-text-secondary, var(--vp-c-text-2));
  font-size: 0.8125rem;
  line-height: 1.4;
  text-align: center;
}

.layout-box--accent {
  border-color: color-mix(in srgb, var(--su-primary-default, var(--vp-c-brand-1)) 48%, transparent);
  background: color-mix(in srgb, var(--su-primary-default, var(--vp-c-brand-1)) 10%, transparent);
}
</style>
