<script setup lang="ts">
import HomeHero from './HomeHero.vue'
// import HomeFeatures from './HomeFeatures.vue'
import HomeFooter from './HomeFooter.vue'
import ArticleGroup from './ArticleGroup.vue'
import { useSideBar } from '../composables/sideBar'

const items = useSideBar()
</script>

<template>
  <HomeHero />
  <main class="home" aria-labelledby="main-title">
    <div class="home-content">
      <ArticleGroup v-for="item of items" :item="item" />
    </div>
    <HomeFooter />
  </main>
</template>

<style scoped>
.home {
  padding-top: var(--header-height);
}

.home-content {
  max-width: 48em;
  margin: 0px auto;
  padding: 0 1.5rem;
}
</style>
