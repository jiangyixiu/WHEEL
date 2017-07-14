var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      trip:{},
      day_week:[],
      race_type:'',
      race_name:'',
      over_time:'',
      money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var meal_id = options.meal_id;
    var that = this;
    var temp_words = ['天', '一', '二', '三', '四', '五', '六'];
    var temp_week = [];
    var temp_html = [];
    app.wx_request('https://api.h5.zx-tour.com/H5Match/trip?meal_id='+ meal_id,'post','json',{},that,function(res){
        var temp_type = '旅';
        if (res.data.data.meal.g_name == '赛事单独报名') {
            temp_type = '赛';
        }
        that.setData({
            trip: res.data.data.trip,
            race_type: temp_type,
            race_name: res.data.data.meal.g_name,
            over_time: res.data.data.meal.g_utime.split(' ')[0],
            money: res.data.data.meal.g_currprice

        });
        var temp_data = that.data.trip;
        for (var i = 0; i < temp_data.length; i++) {
            temp_data[i].trip_date = temp_data[i].trip_date.split(' ')[0];
            var week_index = new Date(temp_data[i].trip_date).getDay();
            temp_week.push(temp_words[week_index]);
            var _html = temp_data[i].trip_des;
            temp_html.push(_html);
        }
        for (var i = 0; i < temp_html.length; i++) {
            WxParse.wxParse('temp_html' + i, 'html', temp_html[i], that);
            if (i === temp_html.length - 1) {
                WxParse.wxParseTemArray("htmlarr", 'temp_html', temp_html.length, that)
            }
        }
        that.setData({
            day_week: temp_week,
            trip: temp_data
        })
    },function(_res){
        console.log(_res);
    });
    // wx.request({
    //     url: 'https://api.h5.zx-tour.com/H5Match/trip?meal_id='+meal_id,
    //     success:function(res){
    //         console.log(res);
    //         var temp_type = '旅';
    //         if (res.data.data.meal.g_name == '赛事单独报名'){
    //             temp_type = '赛';
    //         }
    //        that.setData({
    //            trip: res.data.data.trip,
    //            race_type: temp_type,
    //            race_name: res.data.data.meal.g_name,
    //            over_time: res.data.data.meal.g_utime.split(' ')[0],
    //            money: res.data.data.meal.g_currprice

    //        });
    //        var temp_data = that.data.trip;
    //        for (var i = 0; i < temp_data.length; i++) {
    //            temp_data[i].trip_date = temp_data[i].trip_date.split(' ')[0];
    //            var week_index = new Date(temp_data[i].trip_date).getDay();
    //            temp_week.push(temp_words[week_index]);
    //            var _html = temp_data[i].trip_des;
    //            temp_html.push(_html);
    //        }
    //        for (var i = 0; i < temp_html.length; i++) {
    //            WxParse.wxParse('temp_html' + i, 'html', temp_html[i], that);
    //            if (i === temp_html.length - 1) {
    //                WxParse.wxParseTemArray("htmlarr", 'temp_html', temp_html.length, that)
    //            }
    //        }
    //        that.setData({
    //            day_week: temp_week,
    //            trip: temp_data
    //        })
    //     }
    // })
    wx.setNavigationBarTitle({
        title: '套餐行程'
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