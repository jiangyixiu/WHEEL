//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  wx_request: function (url, method, datatype, data, that,fun, fail,active,all_fun) {
      var that = that
      var data=data
      var session = wx.getStorageSync('rd_session')
      data['rd_session']=session
      data['platform']='xiaochengxu'
      wx.request({
        url: url,
        method: method,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        dataType: datatype,
        data: data,
        success: function (res) {
          if(all_fun){
              all_fun(res,that)
          }

          if (res.statusCode == 200) {
            if (res.data.error == 0) {
              fun(res, that)
            }
            if (res.data.error == 1) {
              ////请求错误
              fail(res,that)
            }
            if (res.data.error == 304) {
              //////拉授权////
                wx.login({
                  success: function (res) {
                    var code = res.code
                    wx.request({
                      url: 'https://api.h5.zx-tour.com/h5Login/login?jscode=' + code,
                      dataType: 'json',
                      method: 'get',
                      success: function (res) {
                        var data = res.data.data
                        wx.setStorageSync('rd_session', data)
                      }
                    })
                  },
                  fail: function () {

                  },
                  complete: function () {

                  }
                })
            }
            if (res.data.error == 305) {
              //////跳验证手机号页面
              if(!active){
                wx.navigateTo({
                  url: '/pages/landing/landing',
                })
              }
            }
          } else {
            /////请求失败
          }
        }
      })
  },
})