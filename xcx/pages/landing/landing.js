// landing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      test:'获取验证码',
      lck:true,
      phone:0,
      check_num:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  check:function(e){
    var phone = e.detail.value
    if(phone==''){
      this.data.phone=0
    }
    else if (/^1[\d]{10}$/.test(phone)){
      this.data.phone = 2
      this.setData({phone_num:phone})
    }else{
      this.data.phone = 1
    }
  },
  play_test:function(){
    var phone= this.data.phone
    if(phone==0){
      this.landing('请输入手机号')
    }else if(phone==1){
      this.landing('手机号码不正确')
    }else{
      // https://alipay.zx-tour.com/Account/verify
      var phone=this.data.phone_num
      var that=this
        if (this.data.lck) {
          var data={}
           data['rd_session'] = wx.getStorageSync('rd_session')
          wx.request({
            url: 'https://api.h5.zx-tour.com/h5Login/verify?phone='+phone,
            dataType:'json',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method:'post',
            data:data,
            success:function(res){
                that.setData({ lck: false })
                var num = 60
                that.setData({ lck: false })
                that.setData({ test: '已发送(60秒)' })
                var time = setInterval(function () {
                  num--
                  that.setData({ test: '已发送(' + num + '秒)' })
                  if (num <= 0) {
                    that.setData({ lck: true })
                    that.setData({ test: '重新获取验证码' })
                    clearInterval(time)
                  }
                }, 1000)
            }
          })
        } else {
          return false
        }
    }
  },
  landing:function(content){
      wx.showModal({
        title: '提示',
        content: content,
        showCancel:false
      })
  },
  check_num:function(e){
    var check_num=e.detail.value
    this.setData({ check_num: check_num})

  },
  landing_btn:function(){
    var option=this.data.options
    var check_num=this.data.check_num
    var phone_state=this.data.phone
    if (phone_state==0){
      this.landing('请输入手机号')
    } else if (phone_state == 1){
      this.landing('手机号码不正确')
    }else{
      if (check_num.length != 6) {
          this.landing('验证码不正确')
          return false
        }
        var phone = this.data.phone_num
        var data = {}
        data['rd_session'] = wx.getStorageSync('rd_session')
        wx.request({
          url: 'https://api.h5.zx-tour.com/h5Login/auth?phone=' + phone + '&code=' + check_num,
          method: 'post',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          dataType: 'json',
          data: data,
          success: function (res) {
            var msg=res.data.msg
            if (res.data.error==0){
                if(option=='order'){
                    wx.switchTab({
                      url: '/pages/order/order',
                    })
                } else if (option == 'userinfo'){
                  wx.switchTab({
                    url: '/pages/userinfo/userinfo',
                  })
                }else{
                  var routeArr = getCurrentPages()
                  if (routeArr.length>2){
                    var route = routeArr[routeArr.length - 2].route
                  } else if (routeArr.length==2){
                    var route = routeArr[routeArr.length - 1].route
                  }else{
                    route='pages/index/index'
                  }
                  if (route == 'pages/enroll/enroll') {
                    wx.navigateBack({

                    })
                  } else {
                    wx.redirectTo({
                      url: '/' + route,
                    })
                  }
                }
            }else{
              wx.showModal({
                title: '提示',
                content: msg,
                showCancel: false
              })
            }
          }
        })
    }
  },
  onLoad: function (options) {
    var op=options.type
    this.setData({options:op})
  wx.login({
    success:function(res){
      var code=res.code
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
    fail:function(){

    },
    complete:function(){

    }
  })
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
  onShareAppMessage: function () {
  
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