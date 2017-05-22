import api from '../../api/api.js'

//index.js
//获取应用实例
var app = getApp();
Page({
  // 下拉刷新
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  //参会指引
  bindGuideTap: function() {
    wx.navigateTo({
        url: '../guide/guide'
    })
  },
  bindVideoTap: function() {
    wx.navigateTo({
        url: '../video/video'
    })
  },
  //到教师课程页面
  bindClassTap: function(e){
  	var id = e.currentTarget.dataset.id;
  	wx.navigateTo({
      url: '../class/class?id=' +　id
    })
  },
  //点击查看大图，需image添加data-src属性，值等于src
  previewImage: function(e){
	var _self = this;
  	wx.previewImage({
  		current: e.currentTarget.dataset.src,
  		urls: [e.currentTarget.dataset.src]
  	})
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '好多课',
      desc: '插坐学院出品的在线课程产品',
      path: 'pages/index/index'
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
//  app.getUserInfo(function(userInfo){
//    //更新数据
//    that.setData({
//      userInfo:userInfo
//    })
//  })
    //获取教师列表
    api.getTeacherList({
    	success: function(data){
  	  	if(data.data && data.data.status == "200"){
	  	    that.setData({
	  	      teachers: data.data.data
	  	    })
  	  	} else {
  	  		that.setData({
	  	      teachers: []
	  	    })
  	  	}
  	  }
    })
  }
})

function trim(str) {
  return str.replace(/^(\s*)|(\s*)$/g,"");
}
