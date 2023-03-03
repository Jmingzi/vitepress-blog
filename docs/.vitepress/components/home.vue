<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
import j from './images/javascript.png'
import t from './images/typescript.png'
import n from './images/nodejs.png'
import r from './images/react.png'
import v from './images/vue.png'
import s from './images/swc.png'
import p from './images/puppeteer.png'
import xx from './images/xx.png'

const works = [
  {

  },
]
const skills = [
  {
    title: 'javascript',
    icon: j
  },
  {
    title: 'typescript',
    icon: t
  },
  {
    title: 'nodejs',
    icon: n
  },
  {
    title: 'react',
    icon: r
  },
  {
    title: 'vue',
    icon: v
  },
  // {
  //   title: 'swc',
  //   icon: s
  // },
  {
    title: 'puppeteer',
    icon: p
  }
]

const onOpen = () => {
  window.open('https://iming.work/xprocess')
}
</script>

<template>
  <VPTeamPage>
    <VPTeamPageTitle style="text-align: left;">
      <template #title>
        <div style="font-family: monospace;font-weight: bold">
          <p>Welcome,</p>
          <h1 style="font-size: inherit;font-weight: inherit">I`m Jmingzi</h1>
        </div>

        <div class="lead-text">
          从事前端行业，日常使用 {{ skills.map(x => x.title).join('、') }} 实现生活中的小灵感。
        </div>
        <div class="lead-code">
          <code v-for="item in skills">
            <img :alt="item.title" :src="item.icon">
          </code>
        </div>

        <p style="font-family: monospace;font-weight: bold">Projects</p>
        <div class="works">
          <div class="work" @click="onOpen">
            <div class="work__img">
              <img :src="xx" alt="">
            </div>
            <div>
              <p class="work__title">XProcess</p>
              <p class="work__desc">流程图、架构图绘制工具</p>
            </div>
          </div>
        </div>

        <p style="font-size: 14px;color: #999999;">鄂ICP备18011687号-1.</p>
      </template>
    </VPTeamPageTitle>
  </VPTeamPage>
</template>

<style lang="css">
.lead-text {
  font-size: 16px;
  line-height: 30px;
  margin-top: 25px;
  word-break: break-all;
}
.lead-code {
  display: flex;
  /*justify-content: center;*/
  margin: 30px 0 80px 0;
}
.lead-code code {
  display: flex;
  align-items: end;
  padding: 0.3em 0.2em 0.1em 0.2em;
  font-size: 85%;
  white-space: break-spaces;
  background-color: rgba(175,184,193,0.2);
  border-radius: 4px;
  margin-right: 10px;
  height: 0;
}
.lead-code code img {
  /*height: 20px;*/
  width: 20px;
}

.works {
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 100px;
  margin-top: 20px;
}
.work {
  display: flex;
  align-items: center;
  max-width: 400px;
  padding: 15px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
}
.work__desc {
  font-size: 14px;
  color: #999;
  margin-top: 15px;
}
.work__img {
  width: 50px;
  margin-right: 20px;
}
.work__img img {
  width: 100%;
}
</style>
