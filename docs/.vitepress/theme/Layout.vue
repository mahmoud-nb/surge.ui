<script setup lang="ts">
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

// Version publiée, injectée par la config (vite.define), pas le package.json entier
declare const __SURGEUI_VERSION__: string

const { Layout } = DefaultTheme
const { lang } = useData()

const version = __SURGEUI_VERSION__
const releaseUrl = `https://github.com/mahmoud-nb/surge.ui/releases/tag/v${version}`
const label = computed(() => (lang.value === 'en' ? 'What’s new' : 'Nouveautés'))
</script>

<template>
  <Layout>
    <!-- [pill] Version publiée et lien vers ses notes, au-dessus du nom -->
    <template #home-hero-info-before>
      <a
        class="su-home-pill"
        :href="releaseUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          class="su-home-pill__dot"
          aria-hidden="true"
        />
        <span class="su-home-pill__version">v{{ version }}</span>
        <span>{{ label }}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </template>
  </Layout>
</template>
