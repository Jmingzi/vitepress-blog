module.exports = {
  title: '讯盟前端团队',
  description: '讯盟前端团队文档中心',
  base: '/',

  themeConfig: {
    repo: 'https://git.shinemo.com/projects/FEGJ',
    repoLabel: 'Git',
    docsDir: 'docs',
    editLinks: true,
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
            { text: '组件库', link: '/foundation/components' },
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
