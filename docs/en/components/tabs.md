# Tabs

The **Tabs** component makes it easy to manage sets of accessible tabs.
It supports keyboards, custom labels, icons, and dynamic rendering via slots.

## Easy to use

```vue
<script setup>
import { ref } from 'vue'
import Tabs from '@/components/Tabs.vue'

const tabs = ref([
  { label: 'Accueil', content: 'Bienvenue sur la page d’accueil.' },
  { label: 'Profil', content: 'Votre espace personnel.' },
  { label: 'Paramètres', content: 'Réglez vos préférences.' }
])
</script>

<template>
  <SuTabs :tabs="tabs" />
</template>
```

## Advanced usage (with slots)


```vue
<SuTabs :tabs="tabs">
  <template #tab="{ tab }">
    <div style="display: flex; gap: 8px; align-items: center;">
      <Icon :name="tab.icon" />
      <span>{{ tab.label }}</span>
      <Badge v-if="tab.badge" :count="tab.badge" />
    </div>
  </template>
  <template #panel="{ tab }">
    <article>
      <h2>{{ tab.title }}</h2>
      <p>{{ tab.description }}</p>
      <component :is="tab.component" />
    </article>
  </template>
</SuTabs>
```