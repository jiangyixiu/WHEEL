var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //   成功报名图片
    //   head_img:'http://weixin.zx-tour.com/static/xcx_img/success_page.png',
    //   缺少资料图片
      head_img: 'http://weixin.zx-tour.com/static/xcx_img/lack_passId.png',
      perfect_ok:false,
      orderid:'',
  },
  go_orderinfo:function(){
    var that = this;
    wx.redirectTo({
        url: '/pages/orderinfo/orderinfo?order_id=' + that.data.orderid,
    })
  },
  later_finish:function(){
      wx.reLaunch({
          url: '/pages/index/index',
      });
  },
  go_finish:function(){
      wx.redirectTo({
          url: '/pages/perfect/perfect?_group_id=1&orderid=' + this.data.orderid,
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        orderid: options.order_id
    })
    var that = this;
    app.wx_request('https://api.h5.zx-tour.com/H5Order/getorderstats?orderid=' + that.data.orderid,'post','json',{},that,function(res){
        if(res.data.data == '10'){
            that.setData({
                perfect_ok:true,
            head_img:'http://weixin.zx-tour.com/static/xcx_img/success_page.png',

            })
        }
    });
    wx.setNavigationBarTitle({
        title: '订单状态'
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