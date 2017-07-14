// payorder.js
var request=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  agreement:false
  },
  //////////////倒计时/////////////
  countdown:function(that,e){
      var num=e
      var time=setInterval(function(){
          num--
          var h=Math.floor(num/60/60)
          var m=Math.floor(num/60%60)
          var s = Math.floor(num % 60)
          var _h=that.slice_time(h)
          var _m = that.slice_time(m)
          var _s = that.slice_time(s)
          that.setData({ h0: _h[0], h1: _h[1], m0: _m[0], m1: _m[1], s0: _s[0], s1: _s[1]})
          if(num<=0){
            clearInterval(time)
          }
        },1000)
      
  },
  slice_time:function(e){
    var str = e.toString()
      if(str.length>=2){
        var a=str.split('')
      }else{
        var a=['0',str]
      }
      return a
  },
agreement:function(e){
  var agre = e.detail.value
  this.setData({agreement:agre})
},
pay:function(){
  var that=this
  if(this.data.agreement){
    wx.showLoading({
      title: '处理中',
    })
    var fail = function (res, data) {
      var msg = res.data.msg
      wx.showModal({
        title: '提示',
        content: msg,
        showCancel: false
      })
    }
    var orderid = this.data.orderid
    var url = 'https://api.h5.zx-tour.com/H5Enroll/payorder?orderid=' + orderid
    var deal_with=function(res,that){
      wx.hideLoading()
      var orderid = that.data.orderid
      wx.requestPayment({
        'timeStamp': res.data.data.timeStamp,
        'nonceStr': res.data.data.nonceStr,
        'package': res.data.data.package,
        'signType': res.data.data.signType,
        'paySign': res.data.data.paySign,
        'success':function(res){
          if (res.errMsg =='requestPayment:ok'){
              setTimeout(function(){
                wx.redirectTo({
                  url: "/pages/paysuccess/paysuccess?orderid=" + orderid,
                })
              },2000)
            }
        },
        'fail':function(res){
          if (res.errMsg == 'questPayment:fail'){
              wx.showModal({
                title: '提示',
                content: '支付失败',
                showCancel: false
              })
            }
          if (res.errMsg == 'requestPayment:fail cancel') {
            wx.showModal({
              title: '提示',
              content: '取消支付',
              showCancel: false
            })
          }
        }
      })
    }
    request.wx_request(url,'post','json',{},that,deal_with,fail)
  }else{
    wx.showModal({
      title: '提示',
      content: '您还未同意我们的《报名须知及服务协议》！',
      success:function(res){
        if (res.confirm) {
            that.setData({agreement:true})
        } 
      }
    })
  }
},
get_Date: function (strDate) {
  var st = strDate;
  var a = st.split(" ");
  var b = a[0].split("-");
  var c = a[1].split(":");
  var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])
  return date;
},
back_meal:function(){
  wx.navigateBack({
    delta: 1,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderid=options.order_id
    this.setData({ orderid: orderid})
    var that=this
    var url = 'https://api.h5.zx-tour.com/H5Enroll/getorderinfo?orderid='+orderid
    
    var deal_with=function(res,that){
        var data=res.data.data
        var price = parseFloat(data.payprice)
        that.setData({info_data:data,price:price})
        var pay_deadline = data.pay_deadline
        var now = res.data.datetime

        var pay_deadline2 = that.get_Date(pay_deadline).getTime()
        var now2 = that.get_Date(now).getTime()
        var time = (pay_deadline2-now2)/1000
        that.countdown(that, time)
    }
    var fail=function(res,data){
      var msg = res.data.msg
      wx.showModal({
        title: '提示',
        content: msg,
        showCancel: false
      })
    }
    request.wx_request(url, 'post', 'json', {}, this,deal_with,fail)
  },
  // 587170527160203700136

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