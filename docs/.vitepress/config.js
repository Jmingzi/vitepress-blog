export default {
  title: '讯盟前端团队',
  description: '讯盟前端团队文档中心',
  base: '/',

  themeConfig: {
    repo: 'https://git.shinemo.com/projects/FEGJ/repos/shinemofe/browse',
    repoLabel: 'Git',
    docsDir: 'docs',
    logo: '/logo.png',
    /**
     * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/composables/editLink.ts
     * 编辑的链接生成有问题
     * 直接修改 node_modules 源码 vitepress/dist/client/theme-default/composables/editLink.js#L41
     * 将 createBitbucketUrl 返回 /docs/foundation/index.md?useDefaultHandler=true 类似链接
     */
    editLinkText: 'Edit this page on Git',
    editLinks: false,
    // lastUpdated: 'Last Updated',

    nav: [
      { text: '新人入职', link: '/guide/' },
      { text: '技术体系', link: '/tech-solutions/micro', activeMatch: '^/tech-solutions' },
    ],

    sidebar: {
      '/': [
        {
          text: '新人入职',
          children: [
            {
              text: '团队介绍',
              link: '/guide/',
              id: 'bde1ba1d5f9e29861e7b6f46b93e6b74',
              url: 'https://docs.uban360.com/project-detail/article/101/52/1726'
            },
            {
              text: '开发环境及账号',
              link: '/guide/env-account',
              id: '56df0f4458e9a3269a287946f59c28ed',
              url: 'https://docs.uban360.com/project-detail/article/101/52/1727'
            },
            {
              text: '工作平台及方式',
              link: '/guide/platform',
              id: '8065cfeb88d7d204835cd0a13b0f6fd0',
              url: 'https://docs.uban360.com/project-detail/article/101/52/1729'
            },
            {
              text: '团队规范',
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
                },
                {
                  text: '开发流程规范',
                  link: '/guide/dev-process',
                  id: 'b62f59be971fbef243b2b6e3bf29c729',
                  url: 'https://docs.uban360.com/project-detail/article/40/52/1072'
                }
              ]
            }
            // {
            //   text: '新人入职',
            //   link: '/guide/recruits',
            //   id: 'ad3332efbc2c9cead31e8023924c8422',
            //   url: 'https://docs.uban360.com/project-detail/article/40/52/524'
            // }
          ]
        },
        {
          text: '开发与发布流程',
          children: [
            { text: '创建项目', link: '/guide/dev-create-project', id: 'f79f843924cc8e7557e4ac0cfbf438fd', url: 'https://docs.uban360.com/project-detail/article/101/52/1737' },
            { text: '发布流程', link: '/guide/publish', id: 'a17bae25d3d91f0120108518cb54f41d', url: 'https://docs.uban360.com/project-detail/article/101/52/1738' },
            { text: '子应用配置发布', link: '/guide/publish-micro-child', id: '9ea2d7947ac9e2cc6f2db412c65084ef', url: 'https://docs.uban360.com/project-detail/article/97/92/1832' }
          ]
        },
        {
          text: '业务环境介绍',
          children: [
            { text: 'Baas 环境', link: '/business/baas', id: 'ae9540ab84d62c9e7b43a3779f147802', url: 'https://docs.uban360.com/project-detail/article/101/52/1730' },
            { text: 'Saas 环境', link: '/business/saas', id: '0a5e446264043213a2f4bb67a618e80c', url: 'https://docs.uban360.com/project-detail/article/101/52/1731' },
            { text: '智慧城市', link: '/business/smart-city', id: 'a76754f04092655b2030e583b403ecad', url: 'https://docs.uban360.com/project-detail/article/101/52/1732' }
          ]
        },
        {
          text: '技术体系',
          children: [
            { text: '微前端', link: '/tech-solutions/micro', id: '9e7fb17be090dfe4d29a148431b910cf', url: 'https://docs.uban360.com/project-detail/article/101/52/1733' },
            { text: '数据可视化', link: '/tech-solutions/visual', id: '05838b1d4aca81df040947cddc00ce79', url: 'https://docs.uban360.com/project-detail/article/101/52/1734' },
            { text: '小程序', link: '/tech-solutions/mp', id: 'fd9d5e608e16f979a9f2d57bd25ccdba', url: 'https://docs.uban360.com/project-detail/article/101/52/1735' },
            { text: 'H5 Hybrid', link: '/tech-solutions/h5-hybrid', id: 'a529409623bffedea0efa96ba504ecb0', url: 'https://docs.uban360.com/project-detail/article/101/52/1736' },
            { text: '流水线', link: '/tech-solutions/flow', id: '6ee965422068b7748f8d613b263d76f8', url: 'https://docs.uban360.com/project-detail/article/101/52/2056' },
            { text: '组件库和工具', link: '/tech-solutions/components', id: 'd842de5c2f71bd4befdfc31526b7ee1a', url: 'https://docs.uban360.com/project-detail/article/101/52/2057' }
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
