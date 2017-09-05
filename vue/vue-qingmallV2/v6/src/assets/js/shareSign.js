import { getUrlParameter } from './global'
import axios from 'axios'
let _shareData_ = {}

let wx = require('weixin-js-sdk')
/**
 * 微信签名
 */
export default ({
  title = '要减肥 | 上轻加',
  pic = require('../img/logo.png'),
  desc = '要减肥 上轻加',
  url = location.href,
  uuid = 'sharePage',
  appname = 'bodymaker',
  type = 1
}) => {
  if (window.fitness_app && window.fitness_app.onEvent) {
    let jsonStr = JSON.stringify({
      url,
      pic,
      title,
      desc,
      type
    })
    window.fitness_app.onEvent(10, jsonStr)
    window.fitness_app.onEvent(11, true)
  } else {
    let params = {
      pageurl: url || location.href,
      title: title.replace(/<[^>]+>/ig, ''),
      desc: desc.replace(/<[^>]+>/ig, ''),
      appname: appname,
      img: pic,
      uuid
    }
    axios
      .post('https://weixin.sythealth.com/weixin/ws/share/wxshare', {
        params
      })
      .then(({ data: { data, head } }) => {
        if (head && (head.ret === 0 || head.ret >= 211000)) {
          _shareData_ = {
            appid: data.appid,
            timestamp: data.timestamp,
            noncestr: data.noncestr,
            signature: data.signature,
            title: data.title,
            desc: data.desc,
            link: data.url,
            imgurl: data.imgurl
          }
          var options = {
            debug: false,
            appId: _shareData_.appid,
            timestamp: _shareData_.timestamp,
            nonceStr: _shareData_.noncestr,
            signature: _shareData_.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareQZone'
            ] // 功能列表，我们要使用JS-SDK的什么功能
          }
          wx.config(options)
        }
      })
  }
}

wx.ready(function() {
  // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
  wx.onMenuShareTimeline({
    title: _shareData_.title, // 分享标题
    desc: _shareData_.desc, // 分享描述
    link: _shareData_.link,
    imgUrl: _shareData_.imgurl, // 分享图标
    success: function() {
      // 用户确认分享后执行的回调函数
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
    },
    fail: function(res) {
      // alert(JSON.stringify(res));
    }
  })
  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
  wx.onMenuShareAppMessage({
    title: _shareData_.title, // 分享标题
    desc: _shareData_.desc, // 分享描述
    link: _shareData_.link,
    imgUrl: _shareData_.imgurl, // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '',
    success: function() {
      // 用户确认分享后执行的回调函数
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
    },
    fail: function(res) {
      // alert(JSON.stringify(res));
    }
  })
})

wx.error(function(res) {
  console.log(res)

  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
})
