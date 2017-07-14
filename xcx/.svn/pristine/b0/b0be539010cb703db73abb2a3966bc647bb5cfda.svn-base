// other.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
call:function(){
  wx.makePhoneCall({
    phoneNumber: '400-084-2195',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderid=options.orderid
    var that=this
    wx.request({
      url: 'https://api.h5.zx-tour.com/H5Enroll/getorderinfo?orderid='+orderid,
      dataType:'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
          var info_data=res.data.data
          that.setData({info_data:info_data})
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
  
  }
})