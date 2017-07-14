// pages/index/hengxing.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phone:"",
    scrollTop:0,
  },
  bindmsg:function(event){
      var temp_name = event.target.dataset.name;
      this.setData({
          [temp_name]: event.detail.value
      })
  },
  scroll_bottom:function(e){
    this.setData({
        scrollTop:2000,
    })
  },
  btn_tj:function(event){
    var temp_phone = this.data.phone;
    var tepm_name = this.data.name;
    if (!tepm_name){
        wx.showModal({
            title: '信息错误',
            content: '请填写您的姓名！',
            showCancel: false,
        })
        return false;
    }
    if (!temp_phone){
        wx.showModal({
            title: '信息错误',
            content: '请填写您的手机！',
            showCancel: false,
        }) 
        return false;
    }
    if (!/^1[\d]{10}$/.test(temp_phone)){
        wx.showModal({
            title: '信息错误',
            content: '请填写正确的手机号！',
            showCancel: false,
        })
        return false;
    }
    var that = this;
    // app.wx_request('https://api.h5.zx-tour.com/h5/ht_collection?phone=' + temp_phone + '&name=' + tepm_name,'post','json',{type:'json'},that,function(res,that){
    wx.request({
        url: 'https://api.h5.zx-tour.com/h5/ht_collection?phone=' + temp_phone + '&name=' + tepm_name + '&type=json',
        success:function(res){
            console.log(res);
            if (res.data.msg == "ok") {
                wx.showToast({
                    title: '提交成功',
                    mask: true,
                    icon: 'success',
                    duration: 2000
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                })
            } 
        }
    })    
        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '恒行计划'
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