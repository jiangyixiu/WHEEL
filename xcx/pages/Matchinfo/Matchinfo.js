// pages/Matchinfo/Matchinfo.js
var WxParse = require('../../wxParse/wxParse.js')
var request=getApp()
Page({
  data:{
    //////标题切换定位/////
    position:false,
    //////报名提醒////
    attend_warn:[{ value: '开始报名时短信提醒我', checked: true }, { value: '名额紧张时短信提醒我', checked: true }, { value: '报名截止前一周短信提醒我', checked: true }],
    attend_mask:true,
    ////////////banner信息//////
    image_src:[],
    title_image:[],
    current:'1',
    image_length:'',
    ////////////赛事信息//////////////
    city_hidden:false,
    //////赛事套餐介绍/////////////////
    dis_or_meal:true,
    //////////////////meal////
    meal:{},
    have_trip:[],
    ///////////////////////meal结束///////////////
    ///////////////赛程////////////////////////////
meal_course: {},
///////////////赛程////////////////////////////
//////附加优质服务//////////////////////////////
service: {},
show:{},
replyArr:[],
noticeArr: [],
priceExplan:[],
notice_hid:[],

more:{m_special:false,m_info:false,m_rules:false,m_route:false}
  },
  banner:function(e){
    var current=e.detail.current+1
    this.setData({current:current})
  },
  //////介绍与套餐选择切换
  discript_title:function(){
    this.setData({dis_or_meal:true})
  },
  meal_title:function(){
    this.setData({dis_or_meal:false})
  },
  //////////出发城市///////////////////
  go_city:function(){
    var go_city=[],city_id=[]
    var obj=this.data.meal
    for(var key in obj){
      if (obj[key][0]=='不限'){
        this.setData({city_hidden:true})
      }
      if (obj[key].length){
        go_city.push({ value: obj[key][0], id: key })
        go_city[0].checked = true
      }
    }
    this.setData({go_city:go_city})
  },
  city_select:function(e){
    var meal_id=e.detail.value
    var changed={}
    for(var i=0;i<this.data.go_city.length;i++){
      if (this.data.go_city[i].id==meal_id){
        changed['go_city[' + i + '].checked']=true
        }else{
        changed['go_city[' + i + '].checked'] = false
        }
    }
    this.setData({ replyArr: [], priceExplan:[],noticeArr:[]})
    // this.data.replyArr.push(meal_info[i]['g_des'])
    // this.data.priceExplan.push(meal_info[i]['g_priceinfo'])
    this.setData(changed)
    this.meal_list(meal_id)
  },
  /////拿对应出发城市里面的数据/////////////////
  meal_list:function(city_id){
    wx.setStorage({
      key: 'c_id',
      data: city_id,
    })
    var meallist = this.data.meal[city_id][1]
// /////套餐排序
    var meallisttmp=[]
    var meal_info=[]
    for (var key in meallist) {
      /////价格去零////
      meallist[key]['g_currprice'] = parseFloat(meallist[key]['g_currprice'])
      meallist[key]['g_price'] = parseFloat(meallist[key]['g_price'])
      //////单人间双人间///////
      if (meallist[key].g_isroom=='1'){
        meallist[key].g_isroom=false
      }else{
        meallist[key].g_isroom=true
      }
      if (parseInt(meallist[key].g_room) == 1 && meallist[key].g_name.substring(meallist[key].g_name.length - 2) != '定金' && meallist[key].g_name.substring(meallist[key].g_name.length - 2) != '预约') {
        meallist[key].g_room = '单人间';
      } else if (parseInt(meallist[key].g_room) == 2 && meallist[key].g_name.substring(meallist[key].g_name.length - 2) != '定金' && meallist[key].g_name.substring(meallist[key].g_name.length - 2) != '预约') {
        meallist[key].g_room = '双人间';
      }
    //////单人间双人间///////
///////////////价格标签///////////
      if (meallist[key].g_tips==''){
          meallist[key].g_tips=false
      }
      ///////////////价格标签///////////
      var g_mealid = this.buquan(meallist[key]['id'], 5);
      if (parseInt(meallist[key]['g_stockleft']) <= 0 || meallist[key]['g_sell_out'] == '1') {
        meallisttmp['1' + meallist[key]['g_order'] + g_mealid] = meallist[key];
      } else if (meallist[key]['g_order'].length < 4) {
        var g_order = this.buquan(meallist[key]['g_order'], 4);
        meallisttmp['2' + g_order + g_mealid] = meallist[key];
      } else {
        meallisttmp['2' + meallist[key]['g_order'] + g_mealid] = meallist[key];
      }
      

    }
    for(var key in meallisttmp){
      meal_info.unshift(meallisttmp[key])
    }
    var replyArr=[]
    var priceExplan=[]
    var noticeArr=[]
    var have_trip=[]
    for(var i=0;i<meal_info.length;i++){
      replyArr.push(meal_info[i]['g_des'])
      noticeArr.push(meal_info[i]['g_notice'])
      priceExplan.push(meal_info[i]['g_priceinfo'])
      var that=this
      wx.request({
        url: 'https://api.h5.zx-tour.com/H5Match/trip?meal_id=' + meal_info[i].id,
        dataType:'json',
        success:function(res){
          if (res.data.data.trip==''){
            have_trip.push(false)
          }else{
            have_trip.push(true)
          }
          that.setData({ have_trip: have_trip})
        }
      })
    }
    if(meal_info.length<=1){
      var show=[]
      show[meal_info[0].id]=true
      this.setData({show:show})
    }
    this.setData({ meal_info: meal_info, replyArr: replyArr, priceExplan: priceExplan, noticeArr: noticeArr})
    ///////////富文本///////
    var replyArr = this.data.replyArr
    var noticeArr = this.data.noticeArr
    var that = this
    for (let i = 0; i < replyArr.length; i++) {
      WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
      if (i === replyArr.length - 1) {
        WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
      }
    }
    for (let i = 0; i < noticeArr.length; i++) {
      WxParse.wxParse('notice' + i, 'html', noticeArr[i], that);
      if (i === noticeArr.length - 1) {
        WxParse.wxParseTemArray("noticeArray", 'notice', noticeArr.length, that)
      }
    }
    var priceExplan = this.data.priceExplan
    for (let i = 0; i < priceExplan.length; i++) {
      WxParse.wxParse('priceE' + i, 'html', priceExplan[i], that);
      if (i === priceExplan.length - 1) {
        WxParse.wxParseTemArray("priceArray", 'priceE', priceExplan.length, that)
      }
    }
  },
  buquan:function(s, Length) {
    var s= '0' + s;
    if(s.length>=Length) {
      s.substring(0, Length)
      return s;
    }else{
      return this.buquan(s, Length);	
    }
  },
  /////////////////赛程///////////////////
  match_course:function(){
    var match_course=this.data.meal_course.data
    var minprice=10000000
    for(var i=0;i<match_course.length;i++){
      match_course[i].g_price = parseFloat(match_course[i].g_price)
      match_course[i].g_currprice = parseFloat(match_course[i].g_currprice)
      if (minprice > match_course[i].g_currprice && match_course[i].g_currprice>0){
          minprice = match_course[i].g_currprice
      }

    }
    if (minprice != 10000000){
        this.setData({minprice:minprice})
    }
    this.setData({ meal_course_data: match_course})

  },
  ////////点击显示下拉/////
  meal_select:function(e){
    var show=this.data.show
    var index = e.currentTarget.dataset.index
    if (show[index]==true){
        show[index]=false
    }else{
      show[index]=true
    }
    this.setData({show:show})
    wx.setStorage({
      key: 'meal_id',
      data: index,
    })
  },
  /////重要提示/////
  notice:function(e){
    var index = e.currentTarget.dataset.notice
    var notice_hid=this.data.notice_hid
    if (notice_hid[index]==true){
      notice_hid[index]=false
    }else{
      notice_hid[index]=true
    }
   this.setData({notice_hid:notice_hid})
  },
  notice_close:function(e){
    var index = e.currentTarget.dataset.notice
    var notice_hid = this.data.notice_hid
      notice_hid[index] = false
    this.setData({ notice_hid: notice_hid })
  },
  ///////////////////附加优质服务/////////////
  add_service:function(){
    var obj=this.data.service
    if(obj.data.length>0){
      for (var i = 0; i < obj.data.length;i++){
        obj.data[i].g_currprice = parseFloat(obj.data[i].g_currprice)
        obj.data[i].g_price = parseFloat(obj.data[i].g_price)
        }
      this.setData({service_data:obj.data})
    }

  },
  /////////////优质服务点击///
  clk_service:function(){
    var service = this.data.service_hidden
    if (service==true){
      service = false
    }else{
      service = true
    }
    this.setData({service_hidden:service})
  },
introduce:function(e){
},
//////////点击展开更多//////////////
// more:function(e){
//   var value = e.currentTarget.dataset.type
//   var _more = this.data.more
//     if(_more[value]==false){
//         _more[value]=true
//     }else{
//         _more[value] = false
//     }
//     this.setData({more:_more})
// },
//////时间日期///
time:function(){
  console.log(this)
  var time={}
  var now_1 = this.data.now
  var now = this.get_Date(now_1).getTime()
  var start = this.data.info.m_signuptime
  var stop = this.data.info.m_untilTime
  var match_start = this.data.info.m_GameTime
  time.show_start=start.substring(0,10)
  time.show_stop = stop.substring(0, 10)
  time.show_matchStart = match_start.substring(0, 10)
  var start_1 = this.get_Date(start).getTime()
  var stop_1 = this.get_Date(stop).getTime()
  var match_start_1 = this.get_Date(match_start).getTime()
  if (now < start_1){
    time.time_state = 3
  }else if(now<stop_1){
    time.time_state=0
  } else if (now < match_start_1){
    time.time_state = 1
  }else{
    time.time_state = 2
  }
  this.setData(time)
},
get_Date:function (strDate) {
  var st = strDate;
  var a = st.split(" ");
  var b = a[0].split("-");
  var c = a[1].split(":");
  var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])
  return date;
},
///////////////加标签////////////////////
add_tag:function(){
    var m_auth=this.data.info.m_auth
    if(m_auth==''){
      var m_auth=[]
      m_auth.push('rz_log')
    }else{
      var m_auth = m_auth.split('|');
    }
    this.setData({ m_auth: m_auth })
},
////////////////返回顶部/////////
goTop:function(){
  this.setData({top:0})
},
///////赛事介绍套餐选择定位/////////////
position:function(e){
  var xishu=this.data.xishu
  var m_type = this.data.info.m_ptype
  // var m_type=
    var top = e.detail.scrollTop*xishu
    if (m_type=='海外'){
      if (top >= 784) {
        this.setData({ position: true })
      } else {
        this.setData({ position: false })
      }
  }else{
      if (top >= 656) {
        this.setData({ position: true })
      } else {
        this.setData({ position: false })
      }
  }
},
/////////////////////////报名提醒///////
remind:function(){
    this.setData({attend_mask:false})
},
attend_select:function(e){
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.attend_warn.length; i++) {
      if (checked.indexOf(this.data.attend_warn[i].value) !== -1) {
        changed['attend_warn[' + i + '].checked'] = true
      } else {
        changed['attend_warn[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
},
attend_sure:function(){
  this.setData({ attend_mask: true })
},
attend_concle:function(){
  this.setData({ attend_mask: true })
},
/////////////////////////客服//////////
  kefu:function(){
    wx.makePhoneCall({
      phoneNumber: '400-084-2195',
    })
  },

  onLoad:function(options){


    var a = getCurrentPages()
    // 页面初始化 options为页面跳转所带来的参数
    wx.setStorage({
      key: 'meal_id',
      data: true,
    })
    var m_id=options.m_id
    var that =this
    var fail = function (res, data) {
      var msg = res.data.msg
      wx.showModal({
        title: '提示',
        content: msg,
        showCancel: false
      })
    }
    var fail_service = function (res, data) {
      var msg = res.data.msg
      var meal_course={}
      that.setData({ meal_course: meal_course, service:true })
    }
    var url_1 = 'https://api.h5.zx-tour.com/H5Match/info?m_id=' + m_id
    var deal_data=function(res,that){
      ////////////获取设备信息////////
        var system = wx.getSystemInfoSync()
        var xishu = 750/system.windowWidth
        var data = res.data.data
        //////处理城市/////////////
        var city=data.m_city.split('-')
        if(city[0]==city[1]){
          data.m_city=city[0]
        }

        that.data.now = res.data.datetime
        var image_src = data.m_banner
        var meal = data.meal
        /////赛事介绍////
        var m_info = data.m_info
        var m_rules = data.m_rules
        var m_special = data.m_special
        var m_route = data.m_route
        wx.setNavigationBarTitle({
          title: data.m_name,
        })
        that.setData({ image_src: image_src, meal: meal, info: data, m_info: m_info, xishu: xishu })
        that.add_tag()
        that.time()
        that.go_city()
        that.meal_list(that.data.go_city[0].id)
        // that.match_course()
        // that.add_service()
        // var introduce = that.data.introduce
        WxParse.wxParse("m_special", 'html', m_special, that, 0)
        WxParse.wxParse("m_info", 'html', m_info, that, 0)
        WxParse.wxParse("m_rules", 'html', m_rules, that, 0)
        WxParse.wxParse("m_route", 'html', m_route, that, 0)
    } 
    request.wx_request(url_1, 'post', 'json', {}, that, deal_data, fail)
    // wx_request: function (url, method, datatype, data, that, fun, fail) {
    var deal_course=function(res,that){
      var meal_course = res.data
      that.setData({ meal_course: meal_course })
      that.match_course()
    }
    var url_2 = 'https://api.h5.zx-tour.com/H5Match/course?m_id=' + m_id + '&m_type=1'
    request.wx_request(url_2,'post','json',{},that,deal_course,fail)
    var url_3 = 'https://api.h5.zx-tour.com/H5Match/course?m_id=' + m_id + '&m_type=3'
    var deal_service=function(res,that){
      var service = res.data
      if (service.error == 1 || service.data.length <= 0) {
        that.setData({ service: true })
      } else {
        that.setData({ service: service })
        that.add_service()
      }
    }
    request.wx_request(url_3, 'post', 'json', {}, that, deal_service, fail_service)
    // var image_length=this.data.image_src.length
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //////////////分享函数////////
  onShareAppMessage: function (res) {
    return {
      title: this.data.info.m_name,
      desc: this.data.infom_des,
      path: '/pages/Matchinfo/Matchinfo?m_id=' + this.data.info.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})