<script setup lang="ts">
import Button from '../atoms/Button.vue'
import Link from '../atoms/Link.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import Grid from '../templates/Grid.vue'
import GridCell from '../templates/GridCell.vue'
import Preview from './Preview.vue'
import GlobalPreview from './GlobalPreview.vue'
</script>

<template>
  <GlobalPreview>
    <template #head>
      <h2>Actions</h2>
    </template>
    <div class="su-actions">
      <Grid>
        <GridCell
          radius="md"
          background-color="#F9F9F9"
        >
          <Preview>
            <Button
              variant="primary"
              :icon="PlusIcon"
              icon-display="left"
            >
              Ajouter
            </Button>
          </Preview>
        </GridCell>
        <GridCell
          radius="md"
          background-color="#F9F9F9"
        >
          <Preview>
            <Link href="/home">
              Lien interne
            </Link>
          </Preview>
        </GridCell>
      </Grid>
    </div>
  </GlobalPreview>
</template>

<style scoped>
.su-actions {
  padding: 1rem;
}
</style>