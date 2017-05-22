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
          var code = res.code;//code用户获取用户openid
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
  getInformation: function(options, cb){
    console.log(options)
    wx.request({
      url: 'https://sslapi.chazuomba.com/WXRoutine/' + options.url,
      data: options.data || {},
      method: options.ploy || 'GET',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        cb && cb(res);
      },
      fail: function(res){
        console.log(res)
      }
    })
  },
  globalData:{
    userInfo:null
  }
})

// 接口请求封装
// app.getInformation({
//   "url": "teacherDetail", //接口名 必传
//   "data": {              //  选传
//     "id": teacherId
//   },
//   "ploy": "POST"       //  选传
// },function(data){
//   console.log(data)
// }) 
