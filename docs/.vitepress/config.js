import syncDoc from './sync-doc.json'

export default {
  lang: 'zh-CN',
  title: 'Jmingzi 的博客',
  description: 'jmingzi的个人博客，前端基础教程、前端框架学习、前端代码分享、前端技术指导、分享在工作中总结的实战开发经验',
  base: '/',

  themeConfig: {
    repo: 'https://github.com/jmingzi',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    logo: '/logo.png',
    editLinkText: 'Edit this page on Git',
    editLinks: false,
    lastUpdated: '上次更新',

    // navbar: false,
    nav: [
      // { text: '新人入职', link: '/sync-doc/xin_ren_ru_zhi/tuan_dui_jie_shao' },
      // { text: '文档贡献', link: '/contribute', activeMatch: '^/contribute' },
    ],

    sidebar: {
      '/': syncDoc
    }
  }
}
