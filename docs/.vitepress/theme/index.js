import Layout from './Layout.vue'
import theme from 'vitepress/dist/client/theme-default/index.js'
// import { Content } from 'vitepress/dist/client/app/components/Content.js'
import './index.css'
// import { h } from 'vue'

export default {
  ...theme,
  Layout,
  // enhanceApp: ({ app }) => {
  //   app.component('Content', {
  //     props: {
  //       onContentUpdated: Function
  //     },
  //     setup (props) {
  //       console.log('666')
  //       return () => h('div', [
  //         h(Content, props),
  //         h('div', 'ddddddd')
  //       ])
  //     }
  //   })
  // }
}
