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

const rawHistoryPushState = globalThis?.history?.pushState
const getPageId = () => location.pathname.split('/').pop().replace('.html', '')
let gittalkTimer

const gittalk = () => {
  const id = getPageId()
  console.log('[gitalk]: page id ', id)
  if (window.Gitalk && id) {
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
    function render (domId) {
      if (gittalkTimer) {
        clearTimeout(gittalkTimer)
        gittalkTimer = null
      }
      gittalkTimer = setTimeout(() => {
        const container = document.getElementById(domId)
        if (container) {
          Array.from(container.childNodes).forEach(el => el.remove())
          gitalk.render(domId)
          console.log('[gitalk]: render success')
        } else {
          render(domId)
        }
      }, 200)
    }
    render('gitalk-container')
  }
}
const setPv = (num) => {
  const editInfo = document.querySelector('.edit-info')
  if (!editInfo) {
    return
  }
  const scopedId1 = editInfo.attributes[1].name
  const vPLastUpdated = editInfo.querySelector('.VPLastUpdated')
  let scopedId = vPLastUpdated.attributes[1].name
  if (scopedId === scopedId1) {
    scopedId = vPLastUpdated.attributes[2].name
  }

  const xxx = editInfo.querySelector('.xxx')
  xxx?.remove()

  const read = document.createElement('p')
  read.classList.add('VPLastUpdated')
  read.classList.add('xxx')
  read.setAttribute(scopedId, '')
  read.innerText = `已被阅读 ${num} 次`
  editInfo.appendChild(read)
}
const loadPv = () => {
  const id = getPageId()
  if (!id) {
    return
  }

  const callbackName = `cb_${Math.floor(Math.random() * 10000)}`
  window[callbackName] = ({ pv }) => {
    setPv(pv)
  }
  const s = document.createElement('script')
  s.src = `https://iming.work/api/blog/count?callback=${callbackName}`
  s.referrerPolicy = 'no-referrer-when-downgrade'
  s.defer = !0
  s.id = 'count'
  s.onload = () => {
    delete window[callbackName]
    s.remove()
  }
  const el = document.getElementById('count')
  if (el) {
    el.remove()
  }
  document.head.appendChild(s)
}

onMounted(() => {
  if (globalThis?.history?.pushState) {
    gittalk()
    loadPv()
    if (!globalThis.history.pushState._flag) {
      globalThis.history.pushState._flag = true
      globalThis.history.pushState = function (data, title, url) {
        rawHistoryPushState.call(globalThis.history, data, title, url)
        gittalk()
        loadPv()
      }
    }
  }
})
</script>

<style scoped>
.gitalk-container {
  padding-top: 50px;
}
</style>
