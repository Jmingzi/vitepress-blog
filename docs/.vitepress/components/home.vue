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
import vscode from './images/vscode.png'

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
  {
    title: 'puppeteer',
    icon: p
  },
  {
    title: 'swc',
    icon: s
  }
]

const onOpen = () => {
  window.open('https://iming.work/xprocess')
}
</script>

<template>
  <VPTeamPage>
    <VPTeamPageTitle style="text-align: left;font-family: var(--vp-font-family-mono)">
      <template #title>
        <div style="font-weight: bold">
          <p>Welcome,</p>
          <p>I`m Jmingzi</p>
        </div>

        <div class="lead-text">
          🤔 Engaged in front-end industry, daily use of {{ skills.map(x => x.title).join('、') }} to realize small inspiration in life.
        </div>
        <div class="lead-code">
          <code v-for="item in skills">
            <img :alt="item.title" :src="item.icon">
          </code>
        </div>

        <p style="font-weight: bold">Projects</p>
        <div class="works">
          <div class="work" @click="onOpen">
            <div class="work__img">
              <img :src="xx" alt="">
            </div>
            <div>
              <p class="work__title">XProcess</p>
              <p class="work__desc">Flow chart and architecture drawing tool</p>
            </div>
          </div>
          <div class="work" @click="onOpen">
            <div class="work__img">
              <img :src="vscode" alt="">
            </div>
            <div>
              <p class="work__title">Vscode Blog</p>
              <p class="work__desc">Using vitepress and vscode extension to develop static blog</p>
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
  font-size: 18px;
  line-height: 25px;
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
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 100px;
  margin-top: 20px;
}
.work {
  display: flex;
  align-items: center;
  width: 45%;
  padding: 15px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  margin-bottom: 15px;
}
.work:nth-of-type(2n-1) {
  margin-right: 15px;
}

@media screen and (max-width: 800px) {
  .work:nth-of-type(2n-1) {
    margin-right: 0;
  }
  .works {
    display: block;
  }
  .work {
    width: 100%;
  }
}

.work__desc {
  font-size: 14px;
  color: #999;
  margin-top: 15px;
  word-break: break-all;
}
.work__img {
  width: 50px;
  margin-right: 20px;
}
.work__img img {
  width: 100%;
}
</style>
