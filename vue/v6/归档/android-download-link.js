import Vue from 'vue'
import axios from 'axios'

// 注册一个全局自定义指令 v-android-download-link
Vue.directive('android-download-link', {
  // 当绑定元素插入到 DOM 中。
  inserted: function(el) {
    axios
      .get('https://file.sythealth.com/app/info/官网/com.sythealth.fitness.json')
      .then(function(ret) {
        el.setAttribute('href', ret.data.downloadUrl)
      })
  }
})
