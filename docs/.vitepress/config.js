export default {
  title: '讯盟前端团队',
  description: '讯盟前端团队文档中心',
  base: '/',

  themeConfig: {
    repo: 'https://git.shinemo.com/projects/FEGJ/repos/shinemofe/browse',
    repoLabel: 'Git',
    docsDir: 'docs',
    editLinks: true,
    logo: 'https://user-images.githubusercontent.com/9743418/104887549-680c1e80-59a6-11eb-8222-40e1d38a0fe2.png',
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
              link: '/guide/recruits',
              id: 'ad3332efbc2c9cead31e8023924c8422',
              url: 'https://docs.uban360.com/project-detail/article/40/52/524'
            },
            {
              text: '代码规范',
              children: [
                {
                  text: 'vue 相关规范',
                  link: '/guide/standard-vue',
                  id: '59ea6b5d07da1fcb6cc88b4d593d84aa',
                  url: 'https://docs.uban360.com/project-detail/article/40/52/527'
                },
                {
                  text: 'react 相关规范',
                  link: '/guide/standard-react',
                  id: 'f37aa43cccfc7fc928d0af9d5e691828',
                  url: 'https://docs.uban360.com/project-detail/article/40/52/873'
                },
                {
                  text: '项目分支创建规范',
                  link: '/guide/standard-branch',
                  id: 'd43dd0cfb331dab2f94a0943cc796e72',
                  url: 'https://docs.uban360.com/project-detail/article/40/52/528'
                },
                {
                  text: '代码提交规范',
                  link: '/guide/standard-code-submit',
                  id: '6c23fcf258d86372ffe39752cb92797f',
                  url: 'https://docs.uban360.com/project-detail/article/40/52/529'
                }
              ]
            },
            {
              text: '开发流程',
              link: '/guide/dev-process',
              id: 'b62f59be971fbef243b2b6e3bf29c729',
              url: 'https://docs.uban360.com/project-detail/article/40/52/1072'
            }
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
        {
          text: '文档贡献',
          link: '/contribute'
        }
      ]
    }
  }
}
