import { Vue, i18n } from 'js/base'
import App from './index.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
