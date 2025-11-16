<script setup lang="ts">

interface PreviewProps {
  title?: string
  message?: string
}

defineProps<PreviewProps>()
</script>

<template>
  <div class="su-preview">
    <header
      v-if="$slots.header || title"
      class="su-preview__header"
    >
      <slot name="header" />
      {{ title }}
    </header>

    <div class="su-preview__content">
      <slot />
    </div>

    <footer
      v-if="$slots.footer || message"
      class="su-preview__footer"
    >
      {{ message }}
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.su-preview {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;

  &__content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
