import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MyLayout from './MyLayout.vue'
import DocshareWrap from './DocshareWrap.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: MyLayout,
  enhanceApp({ app }) {
    // register global components
    app.component('docshare-wrap', DocshareWrap)
  }
}
