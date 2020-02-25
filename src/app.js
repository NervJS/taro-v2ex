import Vue from 'vue'
// import '@tarojs/async-await'
import "core-js/stable";
import "regenerator-runtime/runtime";
import './app.scss'

const app = new Vue({
  onShow (options) {
    console.log('app onshow', options)
  },
  render(h) {
    return h('block', this.$slots.default)
  }
})

export default app
