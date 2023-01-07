<template>
  <Layout>
    <template v-slot:doc-after>
      <div class="gitalk-container">
        <div id="gitalk-container" />
      </div>
    </template>
  </Layout>
</template>

<script setup>
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import { onMounted } from 'vue'

const rawHistoryPushState = history.pushState
const gittalk = () => {
  const id = location.pathname.split('/').pop().replace('.html', '')
  console.log('[gitalk]: page id ', id)
  if (window.Gitalk) {
    const gitalk = new window.Gitalk({
      clientID: 'd26d2255f05e766e9785',
      clientSecret: 'e5628eee6c3ea1fcbc2735d52ffa05db544383ce',
      repo: 'blog-image',
      owner: 'jmingzi',
      admin: ['jmingzi'],
      // number: 1,
      id,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')
    console.log('[gitalk]: render success', gitalk)
  }
}

onMounted(() => {
  gittalk()
  if (!history.pushState._flag) {
    history.pushState._flag = true
    history.pushState = function (data, title, url) {
      rawHistoryPushState.call(history, data, title, url)
      gittalk()
    }
  }
})
</script>

<style scoped>
.gitalk-container {
  padding-top: 50px;
}
</style>
