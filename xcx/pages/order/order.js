//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
var timmer ;
Page({
  data:{
    data_ready: false,
    sign_ok: false,
    order_list:false,
    AllOrder_id:'order_tap_show',
    NopayOrder_id:'',
    NoperfectOrder_id:'',
    show_order3:'0',
    show_order5:'0',
    show_order10:'0',
    list_data: {},
  },
  getDate:function(strDate) {
        var st = strDate;
        var a = st.split(" ");
        var b = a[0].split("-");
        var c = a[1].split(":");
        var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])
        return date;
  },
  count_time:function(event){
    var that = this;
    var arr = this.data.list_data.data;
    var tempdata = this.data.list_data;
    var temp_dieindex = [];
    var temp_dietime = [];
    var temp_showdata = [];
    for(var i = 0 ;i<arr.length;i++){
      if(arr[i].paystats == '5'){
      temp_dieindex.push(i);
      temp_dietime.push((that.getDate(arr[i].pay_deadline) - that.getDate(tempdata.datetime))/1000);
      }
    }
    for(var j = 0 ; j < temp_dietime.length ; j++){
      var last_time = temp_dietime[j];
      var lastDay = Math.floor(last_time/(3600*24));
      var lastHour =  Math.floor((last_time - lastDay*3600*24)/3600);
      var lastMinute =  Math.floor((last_time - lastDay*3600*24 -lastHour * 3600)/60);
      if(lastMinute < 0){lastMinute = 0;}
      var lastSecond = Math.floor(last_time - lastDay*3600*24 - lastHour * 3600 - lastMinute*60);
      if(lastSecond < 0){lastSecond = 0;}
      if(lastSecond < 10) lastSecond = '0' + lastSecond;
      if(lastMinute < 10) lastMinute = '0' + lastMinute;
      if(lastHour < 10) lastHour = '0' + lastHour;
      temp_showdata[j] = lastHour + ':' + lastMinute + ':' + lastSecond;
      temp_dietime[j] -= 1;
      tempdata.data[temp_dieindex[j]].dietime = temp_showdata[j];
    }
    this.setData({
      list_data:tempdata
    })
   timmer = setInterval(function(){
      for(var j = 0 ; j < temp_dietime.length ; j++){
        var last_time = temp_dietime[j];
        var lastDay = Math.floor(last_time/(3600*24));
        var lastHour =  Math.floor((last_time - lastDay*3600*24)/3600);
        var lastMinute =  Math.floor((last_time - lastDay*3600*24 -lastHour * 3600)/60);
        if(lastMinute < 0){lastMinute = 0;}
        var lastSecond = Math.floor(last_time - lastDay*3600*24 - lastHour * 3600 - lastMinute*60);
        if(lastSecond < 0){lastSecond = 0;}
        if(lastSecond < 10) lastSecond = '0' + lastSecond;
        if(lastMinute < 10) lastMinute = '0' + lastMinute;
        if(lastHour < 10) lastHour = '0' + lastHour; 
        temp_showdata[j] = lastHour + ':' + lastMinute + ':' + lastSecond;
        temp_dietime[j] -= 1;
        if(temp_dietime[j] <= 0){
          temp_dietime[j] = 0;
        } 
        tempdata.data[temp_dieindex[j]].dietime = temp_showdata[j];
      }
      that.setData({
        list_data:tempdata
      })
    },1000)
  },
  //事件处理函数
  taptoindex: function() {
   wx.redirectTo({
     url: '/pages/index/index',
   })
  },
  all_order:function(){
    this.setData({
      AllOrder_id:'order_tap_show',
      NopayOrder_id:'',
      NoperfectOrder_id:'',
      show_order3:'0',
      show_order5:'0',
      show_order10:'0'
    })
  },
  nopay_order:function(){
    this.setData({
      AllOrder_id:'',
      NopayOrder_id:'order_tap_show',
      NoperfectOrder_id:'',
      show_order3:'1',
      show_order5:'10'
    })
  },
  noperfect_order:function(){
    this.setData({
      AllOrder_id:'',
      NopayOrder_id:'',
      NoperfectOrder_id:'order_tap_show',
      show_order3:'3',
      show_order5:'5',
      show_order10:'10'
    })
  },
  go_trip:function(event){
    var mealid = event.target.dataset.mealId;
    wx.navigateTo({
        url: '/pages/trip/trip?meal_id=' + mealid,
    })
  },
  go_perfect:function(event){
        wx.navigateTo({
            url: '/pages/perfect/perfect?_group_id=1&order_id=' + event.target.dataset.orderid,
        })
  },
  go_pay:function(event){
      wx.navigateTo({
          url: '/pages/payorder/payorder?order_id=' + event.target.dataset.orderid,
      })
  },
  re_sign:function(event){
      wx.navigateTo({
          url: '/pages/Matchinfo/Matchinfo?m_id=' + event.target.dataset.mid,
      })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '订单'
    })
  },
  onShow:function(){
      var that = this;
      app.wx_request('https://api.h5.zx-tour.com/H5Order/getorderlist', 'post', 'json', {}, that, function (res) {
          that.setData({
              sign_ok: true,
              data_ready: true,
              list_data: res.data
          })
          that.count_time();
      }, function (res) {
          that.setData({
              order_list: true
          })
      }, true, function (res, that) {
          if (res.data.error == '305') {
              that.setData({
                  data_ready: true,
                  sign_ok: false
              })
          }
      })
  },
  onHide:function(){
      clearInterval(timmer);
  }
})

