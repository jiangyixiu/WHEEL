import Vue from 'vue'
import axios from 'axios'

// 注册一个全局自定义指令 v-download-link
const downloadLink = Vue.directive('download-link', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    var ua = navigator.userAgent.toLowerCase()
    if ('' + ua.match(/iPhone\sOS/i) === 'iphone os' || navigator.userAgent.indexOf('iPad') !== -1) {
      el.setAttribute('href', 'https://itunes.apple.com/us/app/%E8%BD%BB%E5%8A%A0-%E8%96%84%E8%8D%B7%E9%A5%AE%E9%A3%9F%E8%B0%B1%E7%98%A6%E8%BA%AB%E8%BD%AF%E4%BB%B6/id665855293?mt=8&uo=4')
    } else if ('' + ua.match(/Android/i) === 'android') {
      axios
        .get('https://file.sythealth.com/app/info/toutiao/com.sythealth.fitness.json')
        .then(function (ret) {
          el.setAttribute('href', ret.data.downloadUrl)
        })
    }
  }
})

export default downloadLink
