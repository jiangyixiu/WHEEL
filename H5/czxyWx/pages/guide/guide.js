Page({
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
  //打开地图
  bindMapTap: function() {
    wx.openLocation({
      url: '../map/map',
      longitude: 121.451660,
      latitude: 31.226380,
      name: '上海商城剧院',
      address: '上海市南京西路1376号上海商城4层'
    })
  },
  //点击查看大图，需image添加data-src属性，值等于src
  previewImage: function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [e.currentTarget.dataset.src]
    })
  }
})