// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import AxiosOld from 'axios'
import VueTouch from 'vue-touch'
import VueScroller from 'vue-scroller'
import axiosApi from '@/service/axios.js/'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueTouch)
Vue.use(VueScroller)
// Vue.use(VueRouter)
Vue.use(axiosApi)

Vue.prototype.$axios = AxiosOld
process.env.MOCK && require('@/mock/index')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
