---
title: 首页
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: '/logo.png',
    name: 'Jmingzi',
    title: '工作在杭州',
    links: [
      { icon: 'github', link: 'https://github.com/jmingzi' },
      { icon: 'twitter', link: 'https://twitter.com/jmingzi' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      🤔 Welcome
    </template>
    <template #lead>
      <div class="lead-text"> 
        从事前端行业，使用 React、Vue、Typescript、Nodejs 实现生活中的小灵感
      </div>
      <div class="lead-code">  
        <code><img alt="javascript" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"></code>
        <code><img alt="typescript" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png"></code>
        <code><img alt="react" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png"></code>
        <code><img alt="vue" src="https://raw.githubusercontent.com/github/explore/5c058a388828bb5fde0bcafd4bc867b5bb3f26f3/topics/vue/vue.png"></code>
        <code><img alt="nodejs" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png"></code>
      </div>
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
<p style="text-align: center;font-size: 14px;color: #999;">Released under the MIT License.</p>
<p style="text-align: center;font-size: 14px;color: #999;">Copyright © 2019-present Jmingzi 鄂ICP备18011687号-1.</p>
