module.exports = {
  title: '讯盟前端团队',
  description: '讯盟前端团队文档中心',
  base: '/',

  themeConfig: {
    repo: 'https://git.shinemo.com/projects/FEGJ/repos/shinemofe/browse',
    repoLabel: 'Git',
    docsDir: 'docs',
    editLinks: true,
    /**
     * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/composables/editLink.ts
     * 编辑的链接生成有问题
     * 直接修改 node_modules 源码 vitepress/dist/client/theme-default/composables/editLink.js#L41
     * 将 createBitbucketUrl 返回 /docs/foundation/index.md?useDefaultHandler=true 类似链接
     */
    editLinkText: 'Edit this page on Git',
    lastUpdated: 'Last Updated',

    nav: [
      { text: '新人入职', link: '/guide/recruits' },
      { text: '基础建设', link: '/foundation/', activeMatch: '^/foundation' },
    ],

    sidebar: {
      '/': [
        {
          text: '团队介绍',
          children: [
            {
              text: '人员结构',
              link: '/guide/'
            },
            {
              text: '团队文化',
              link: '/guide/culture'
            },
            {
              text: '新人入职',
              link: '/guide/recruits'
            },
            { text: '代码规范', link: '/' },
            { text: '开发流程', link: '/' }
          ]
        },
        {
          text: '基础建设',
          children: [
            { text: '总览', link: '/foundation/' },
            { text: '工具和组件库', link: '/foundation/components' },
            { text: '微前端', link: '/foundation/singleapp' },
            { text: '流水线', link: '/foundation/xmflow' },
            { text: '讯盟文档', link: '/foundation/xmdoc' }
          ]
        },
        {
          text: '未来规划',
          children: [
            { text: '技术方向', link: '/' }
          ]
        },
        { text: '文档贡献', link: '/' }
      ]
    }
  }
}
