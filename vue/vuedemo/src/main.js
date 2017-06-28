// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout.vue'
import VRouter from 'vue-router'
import VResource from 'vue-resource'
import IndexPage from './pages/index.vue'
Vue.use(VRouter)
Vue.use(VResource)
let router = new VRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    }
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  template: '<Layout/>',
  components: { Layout }
})
