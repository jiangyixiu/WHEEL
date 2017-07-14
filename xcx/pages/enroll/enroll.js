// enroll.js
var request=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:[],
    index:0,
    taocan_index:0,
    course_index:0,
    attach:true,
    service: {},
    bz_show:true,
    bz_value:'',
    sub_attach_id:[],
      /////广告/////////////
    advert: { value: '1', checked: true }
  },
  ////////////////出发城市//////////
  // city
  city_change:function(e){
      var index = e.detail.value
      this.setData({ index: e.detail.value,taocan_index:0})
      var cid=this.data.city_id[index]
      this.add_meal(cid,0)
  },
  taocan:function(e){
    var m_price = parseFloat(this.data.s_meal_price[e.detail.value])
    var sub_meal_id = this.data.s_meal_id[e.detail.value]
    this.setData({ taocan_index: e.detail.value, m_price: m_price, sub_meal_id: sub_meal_id })
  },
  course:function(e){
    var c_index=e.detail.value
    var c_price = parseFloat(this.data.course_price[c_index])
    var sub_course_id = parseFloat(this.data.course_id[c_index])
    this.setData({ course_index: c_index, c_price: c_price, sub_course_id: sub_course_id})
  },
  //////////////////附加优质服务///////////
  attach:function(){
    var backups = this.data.service_data
    this.setData({ attach: false, backups: backups})
  },
  close:function(){
    var backups=this.data.backups
    this.setData({ attach: true, service_data:backups})
  },
  sure:function(){
    var service=this.data.service_data
    var attach_price=0
    var num=0
    var sub_attach_id=[]
    for(var i=0;i<service.length;i++){
      if (service[i].checked==true){
        num++
        attach_price = attach_price + parseFloat(service[i].g_currprice)
        sub_attach_id.push(service[i].id)
      }
    }
    this.setData({ attach: true, attach_price: attach_price, num: num, sub_attach_id: sub_attach_id})
  },
  ///////////附加优质服务里面的价格/////////////
  service_data:function(){
    var service_data = this.data.service
    for (var i = 0; i < service_data.length;i++){
      service_data[i].g_currprice = parseFloat(service_data[i].g_currprice)
      if (service_data[i].g_isroom=='0'){
          service_data[i].checked=true
      }
    }
    this.setData({ service_data: service_data})
  },
  /////////////////选择附加优质服务////////////////
  select_service:function(e){
    var checked=e.detail.value
    var changed={}
    for (var i = 0; i < this.data.service_data.length;i++){
      if (checked.indexOf(this.data.service_data[i].g_name) !== -1) {
        changed['service_data[' + i + '].checked'] = true
      } else {
        changed['service_data[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  bz_text:function(e){
    var bz_text=e.detail.value
    if(bz_text!=''){
        this.setData({bz_text:bz_text,bz_color:true})
    }else{
      this.setData({ bz_text: bz_text, bz_color: false })
    }
  },
  bz:function(){
    wx.setNavigationBarTitle({
      title: '备注',
    })
    var bz_value=this.data.bz_value
    this.setData({ bz_value: bz_value, bz_text: bz_value})
    if (bz_value!=''){
      this.setData({ bz_color: true})
    }
    if(this.data.bz_show==true){
        this.setData({bz_show:false})
    }else{
      this.setData({ bz_show: true })
    }
  },
  fanhui: function () {
    wx.setNavigationBarTitle({
      title: '选择赛事服务',
    })
      this.setData({ bz_show: true })
  },
  bz_sub:function(){
    wx.setNavigationBarTitle({
      title: '选择赛事服务',
    })
    var bz_value = this.data.bz_text
    if(bz_value==''){
      return false
    }else{
      this.setData({ bz_value: bz_value })
      this.setData({ bz_show: true })
    }
  },
  add_city:function(){
    var meal=this.data.meal
    var city=[]
    var city_id=[]
    for(var key in meal){
        city.push(meal[key][0])
        city_id.push(key)
    }
    this.setData({city:city,city_id:city_id})
  },
  add_meal: function (cid){
    var meal=this.data.meal
    var taocan_index = this.data.taocan_index
      var s_meal=[]
      var s_meal_price=[] 
      var s_meal_id=[]
      for(var key in meal[cid][1]){
        s_meal.push(meal[cid][1][key]["g_name"])
        s_meal_price.push(meal[cid][1][key]["g_currprice"])
        s_meal_id.push(meal[cid][1][key]["id"])
      }
      var m_price = parseFloat(s_meal_price[taocan_index])
      var sub_meal_id = s_meal_id[taocan_index]
      this.setData({ s_meal: s_meal, s_meal_price: s_meal_price, taocan_index: taocan_index, m_price: m_price, s_meal_id: s_meal_id, sub_meal_id, sub_meal_id})
  },
  add_course:function(){
    var course = this.data.course
    var course_name=[]
    var course_price=[]
    var course_id=[]
      for(var i=0;i<course.length;i++){
        course_price.push(course[i].g_currprice)
        course_name.push(course[i].g_name)
        course_id.push(course[i].id)
      }
      var c_price = parseFloat(course_price[0]) 
      var sub_course_id = course_id[0]
      this.setData({ course_name: course_name, course_price: course_price, c_price: c_price, course_id: course_id, sub_course_id: sub_course_id})
  },
  pay_price:function(p_index,c_index){
    var taocan_price =this.data.s_meal_price[p_index]
    var course_price=this.data.course_price[c_index]
  },
  //////提交订单/////
  sub_meal:function(){
    var m_id=this
    var data={}
    data['mid']=this.data.m_id
    data['meal']=this.data.sub_meal_id
    data['course']=this.data.sub_course_id
    data['attach']=this.data.sub_attach_id
    data['remark']=this.data.bz_value
    data['hengtian']=this.data.advert.value
    var url = 'https://api.h5.zx-tour.com/H5Enroll/createorder'
    var that=this
    var sub_fun=function(res,that){
      var order_id=res.data.data
        wx.navigateTo({
          url: '/pages/payorder/payorder?order_id='+order_id,
        })
    }
    // request.wx_request(url, 'post', 'json', {}, this, deal_with, function (res, that) {    
    request.wx_request(url,'post','json',data,this,sub_fun,function(res,that){
      var msg=res.data.msg
        wx.showModal({
          title: '提示',
          content: msg,
          showCancel:false
        })
    })
  
  },
  ///////恒天广告///////////////////////
  advert:function(){
    var advert=this.data.advert
    if (advert.checked){
      advert.checked = false
      advert.value='0'
      }else{
      advert.checked=true
      advert.value='1'
      }
      this.setData({ advert: advert})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loc_city_id=wx.getStorageSync('c_id')
    var loc_meal_id=wx.getStorageSync('meal_id')
    var m_id=options.m_id
    var m_type = options.m_type
    this.setData({ m_id: m_id, m_type: m_type})
    var that=this
    var url = 'https://api.h5.zx-tour.com/H5Enroll/meal?m_id=' + m_id
    var deal_with=function(res,that){
        var meal = res.data.data.meal
        var course = res.data.data.course
        var attach = res.data.data.attach
        that.data.meal = meal
        that.setData({ meal: meal, course: course, service: attach })
        that.add_course()
        that.add_city()
        var city = that.data.city_id
        ///////////判断用户选的套餐/////////
        if (loc_meal_id == true) {
          if (loc_city_id) {
            that.add_meal(loc_city_id, 0)
            for (var i = 0; i < city.length; i++) {
              if (loc_city_id == city[i]) {
                that.setData({ index: i })
              }
            }
          } else {
            that.add_meal(city[0], 0)
          }
        } else if (loc_meal_id != '') {
          if (loc_city_id) {
            ////////
            for (var i = 0; i < city.length; i++) {
              if (loc_city_id == city[i]) {
                that.setData({ index: i })
              }
            }

            ///////
            var meal = that.data.meal
            var num = -1
            var N_num = ''
            for (var key in meal[loc_city_id][1]) {
              num++
              if (loc_meal_id == key) {
                N_num = num
              }
            }
            if (N_num == '') {
              that.add_meal(loc_city_id)
            } else {
              that.setData({ taocan_index: N_num })
              that.add_meal(loc_city_id)
            }
          } else {
            that.add_meal(city[0])
          }
        } else {
          that.add_meal(city[0])
        }
        that.service_data()
        that.sure()
    }
    request.wx_request(url, 'post', 'json', {}, this, deal_with,function(res,that){
      var msg = res.data.msg
      wx.showModal({
        title: '提示',
        content: msg,
        showCancel: false
      })
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