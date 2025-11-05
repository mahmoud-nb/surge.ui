<script setup lang="ts">
import Button from '../atoms/Button.vue'
import Link from '../atoms/Link.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="su-actions">
    <Button variant="primary" :icon="PlusIcon" iconDisplay="left">
      Ajouter
    </Button>

    <Link href="/home">Lien interne</Link>
  </div>
</template>

<style scoped>
.su-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>