<template>
  <div v-if="!exist" style="padding-top: 40px;padding-bottom: 100px;text-align: center">
    <h1>404</h1>
    <p>文章不存在哦，试试新的链接吧～</p>
  </div>
  <template v-else-if="detail">
    <p style="color:#888">{{ detail.modifier.name }} {{ detail.gmtModified.replace(/-/g, '/') }}</p>
    <div v-html="detail.content" />
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import config from '../config'

const { themeConfig } = config
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})
const detail = ref(null)
let item = null
const exist = ref(!!item)

function get (id) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const callback = `_callback_${Date.now()}_${Math.ceil(Math.random() * 10000)}`
    window[callback] = (data) => {
      resolve(data)
      window[callback] = undefined
      script.remove()
    }
    const url = `http://tms.uban360.net/xmflow/jsonp?url=https://docshare.uban360.com/docapi/share/detail?shareId=${id}&_callback=${callback}`
    script.src = url
    script.onload = () => {
    }
    script.onerror = (e) => {
      reject(e)
    }
    document.body.appendChild(script)
  })
}

function findByPath (array) {
  const path = location.pathname.replace('.html', '')
  const find = (arr, path) => {
    for (const item of arr) {
      if (item.children) {
        const result = find(item.children, path)
        if (result) {
          return result
        }
      }
      if (item.link === path) {
        return item
      }
    }
  }
  return find(array, path)
}

onMounted(() => {
  item = findByPath(themeConfig.sidebar['/'])
  // console.log('匹配到路径', item)
  if (item && item.id) {
    get(item.id).then(res => {
      console.log(res.data.detail)
      const { modifier, content, gmtModified } = res.data.detail
      detail.value = {
        content: md.render(content.replace('[TOC]', '')),
        modifier,
        gmtModified
      }
    })
  }
})

</script>
