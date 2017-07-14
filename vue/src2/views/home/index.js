import { Vue, i18n } from 'js/base'
import App from './index.vue'
import './scss/home.scss'

// import message from '../../plugins/message'
// Vue.use(message)
let vm = new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')

console.log(vm)
