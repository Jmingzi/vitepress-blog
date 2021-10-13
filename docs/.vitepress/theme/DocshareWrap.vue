<template>
  <div v-if="!exist" style="padding-top: 40px;padding-bottom: 100px;text-align: center">
    <h1>404</h1>
    <p>文章不存在哦，试试新的链接吧～</p>
  </div>
  <template v-else-if="detail">
    <p style="color:#888">
      {{ detail.modifier.name }} {{ detail.gmtModified.replace(/-/g, '/') }}
      <span style="float: right">
        <a :href="detail.originUrl" target="_blank">编辑此文章</a>
        <svg class="icon outbound icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" data-v-575cf0ac=""><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
      </span>
    </p>
    <div v-html="detail.content" />
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import config from '../config'
import { findByPath } from './utils'
import { highlight } from './highlight'
import { preWrapperPlugin } from './preWrapper'

const { themeConfig } = config
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight
})
md.use(preWrapperPlugin)
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

onMounted(() => {
  item = findByPath(themeConfig.sidebar['/'])
  // console.log('匹配到路径', item)
  if (item && item.id) {
    get(item.id).then(res => {
      const { modifier, content, gmtModified } = res.data.detail
      exist.value = true
      detail.value = {
        content: md.render(content.replace('[TOC]', '')),
        modifier,
        gmtModified,
        originUrl: item.url
      }
    })
  }
})
</script>
