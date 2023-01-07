import syncDoc from './sync-doc.json'
import fs from 'fs'
import path from 'path'

export default {
  lang: 'zh-CN',
  title: 'Jmingzi 的博客',
  description: 'jmingzi的个人博客，前端基础教程、前端框架学习、前端代码分享、前端技术指导、分享在工作中总结的实战开发经验',
  base: '/',
  themeConfig: {
    siteTitle: 'Yang Ming',
    nav: [
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jmingzi' }
    ],
    lastUpdatedText: '上次更新',
    algolia: {
      appId: 'QY2UJ6SVZF',
      apiKey: 'd87733071ba6a4be70246956285214a3',
      indexName: 'ym',
      searchParameters: {
        facetFilters: ['tags:en'],
      },
    }, sidebar: syncDoc,
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // }
  },
  transformPageData (pageData) {
    const file = path.resolve(__dirname, `../${pageData.relativePath}`)
    return {
      lastUpdated: Math.round(fs.statSync(file).mtimeMs)
    }
  }
}
