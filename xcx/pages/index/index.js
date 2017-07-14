var getinfo=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.openSetting({
    //   success:function(res){
    //     console.log(res)
    //   },
    //   fail:function(res){
    //     console.log(res)
    //   },
    //   complete:function(res){
    //     console.log(res)
    //   }
    // })

    wx.login({
      success:function(res){
        var code=res.code
        wx.request({
          url: 'https://api.h5.zx-tour.com/h5Login/login?jscode='+code,
          dataType:'json',
          method:'get',
          success:function(res){
            var data=res.data.data
            wx.setStorageSync('rd_session', data)
          }
        })
      },
      fail:function(res){
      },
      complete:function(res){
      }
    })
    wx.getUserInfo({
      withCredentials:true,
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      },
      fail:function(res){
      },
      complete:function(res){
      }
    })

//     wx.checkSession({
//       success: function (res) {
//         console.log(res)
//         //session 未过期，并且在本生命周期一直有效
//       },
//       fail: function (res) {
//         console.log(res)
//         //登录态过期
//         wx.login() //重新登录
//   }
// })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '知行合逸', // 分享标题
      desc: '全球跑步赛事，一站直达', // 分享描述
      path: '/pages/run/run' // 分享路径
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})
