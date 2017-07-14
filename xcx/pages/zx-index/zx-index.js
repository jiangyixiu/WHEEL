Page({
  data:{
    arr:[{name:'多伦多马拉松',time:'2017-12-03',city:'加拿大-芝加哥',               src:'http://download.zx-tour.com/public/image/20160929/20160929172953_21852.jpg'},
        {name:'多伦多dhjk马拉松',time:'2017-12-09',city:'加拿大-芝加哥123',src:'http://download.zx-tour.com/public/image/20170112/20170112144745_40780.png'},
        {name:'多伦多asdsa马拉松',time:'2017-02-03',city:'加拿大-芝加哥456',src:'http://download.zx-tour.com/public/image/20160622/20160622110331_97028.jpg'}]
  ,name:'chen'},
  changename:function(e){
    this.setData({name:'ning'});
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})