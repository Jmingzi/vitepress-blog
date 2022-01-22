<script setup lang="ts">
import { onMounted } from 'vue'
import PageFooter from './PageFooter.vue'
import NextAndPrevLinks from './NextAndPrevLinks.vue'
import HomeHero from './HomeHero.vue'

onMounted(() => {
  if (window.Gitalk) {
    const gitalk = new window.Gitalk({
      clientID: 'd26d2255f05e766e9785',
      clientSecret: 'e5628eee6c3ea1fcbc2735d52ffa05db544383ce',
      repo: 'blog-image',
      owner: 'jmingzi',
      admin: ['jmingzi'],
      number: 1,
      id: location.pathname.split('/').pop(),      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')
  }
})
</script>

<template>
  <HomeHero />
  <main class="page">
    <div class="container">
      <slot name="top" />

      <Content class="content" />
      <PageFooter />
      <NextAndPrevLinks />

      <slot name="bottom" />
      <div style="padding-top: 50px">
        <div id="gitalk-container"></div>
      </div>
    </div>
  </main>
</template>

<style lang="less" scoped>
.page {
  padding-top: var(--header-height);
}

@media (min-width: 720px) {
  .page {
    margin-left: 16.4rem;
  }
}

@media (min-width: 960px) {
  .page {
    margin-left: 20rem;
  }
}

.container {
  //margin: 0 auto;
  padding: 0 1.5rem 4rem;
  max-width: 48rem;
}

.content {
  padding-bottom: 1.5rem;
}

@media (max-width: 420px) {
  .content {
    /* fix carbon ads display */
    clear: both;
  }
}
</style>
