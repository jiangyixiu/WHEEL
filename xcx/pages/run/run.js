var local=getApp()
Page({
  data:{
    /////搜索记录///
    loc_search:[],
    clear_input: true,
    page:1,
    //筛选栏显示变量
    select_show:{_type:false,_area:false,_time:false,search_ws:false},
   //筛选栏显示变量
   area_show:{hot:false,guonei:false,guoji:false,zhouji:false},
   ////时间显示变量/////
   time_show:{recent_info:false,time_year:false,time_mounth:false},
   qiehuan:false,
   ///国家切换/////////
  //  带出筛选条件变量
  show_condition:false,
  type_condition:[],
  time_condition:[],
  area_condition:[],
    country_tab:{city:'0',country:'0',zhouji:'0',hots_city:'0'},
    // //////////////////////类名操作
    _class:{select_icon:'select_icon'},
    match_recent:[{value:'近期'},{value:'年月'}],
    match_recent_info:[{value:'未来三周'},{value:'未来三个月'}],
    match_year:[{value:'2017'},{value:'2018'}],
    match_mounth:[
      {value:'1'},
      {value:'2'},
      {value:'3'},
      {value:'4'},
      {value:'5'},
      {value:'6'},
      {value:'7'},
      {value:'8'},
      {value:'9'},
      {value:'10'},
      {value:'11'},
      {value:'12'}
      ],
       /////类型内容
   match_type:[
        {value:'马拉松'},
        {value:'越野跑'},
        {value:'接力赛'},
        {value:'欢乐跑'},
        {value:'铁人三项'}
      ],
    ////地区选择/////////////
    title_radio:[
      {value:'热门'},
      {value:'国内'},
      {value:'海外'},
      {value:'洲际'}
    ],
      hots_checkbox:[],
      guonei_checkbox:[],
    guoji_checkbox:[],
      zhouji_checkbox:[
      {value:'北美洲'},
      {value:'亚洲'},
      {value:'欧洲'},
      {value:'南美洲'},
      {value:'大洋洲'},
      {value:'南极洲'},
      {value:'非洲'}
    ],
    countdown:[],
    ////////////////////关键字搜索
    input_place:{value:"搜索全球跑步赛事",focus:false},
    input_string:false,
    ///////////关键字搜索与列表切换
    search_or_list:false,
    ///////////加载更多/
    _length:10
  },
  // 筛选第一级切换
  search_kind:function(e){
    this.clear_all()
    // this.setData({match_type:this.data.match_type_cache})
    // this.setData({title_radio:this.data.title_radio_cache})
    if(e.target.id=='type'){
      if(this.data.select_show._type){
        this.setData({select_show:{_type:false,_area:false,_time:false,search_ws:false}})
      }else{
        this.setData({select_show:{_type:true,_area:false,_time:false,search_ws:false}})
      }
    }
    if(e.target.id=='area'){
      if(this.data.select_show._area){
        this.setData({select_show:{_type:false,_area:false,_time:false,search_ws:false}})
      }else{
        this.setData({select_show:{_type:false,_area:true,_time:false,search_ws:false}})
      }
    }
    if(e.target.id=='time'){
      if(this.data.select_show._time){
        this.setData({select_show:{_type:false,_area:false,_time:false,search_ws:false}})
      }else{
        this.setData({select_show:{_type:false,_area:false,_time:true,search_ws:false}})
      }
    }
    this.recover()
  },
  clear_all:function(){
    this.clear_area()
    this.clear_time()
    this.clear_type()
    this.setData({area_show:{hot:false,guonei:false,guoji:false,zhouji:false}})
    this.setData({time_show:{recent_info:false,time_year:false,time_mounth:false}})
  },
  clear_area:function(){
        // 地区
    var changed={}
    for (var i = 0; i < this.data.hots_checkbox.length; i ++) {
        changed['hots_checkbox['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.zhouji_checkbox.length; i ++) {
        changed['zhouji_checkbox['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.guonei_checkbox.length; i ++) {
        changed['guonei_checkbox['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.guoji_checkbox.length; i ++) {
        changed['guoji_checkbox['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.title_radio.length; i ++) {
        changed['title_radio['+i+'].checked'] = false
    }
    this.setData(changed)
  },
  clear_time:function(){
        ///时间////////////
    var changed={}
    for (var i = 0; i < this.data.match_recent.length; i ++) {
        changed['match_recent['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.match_recent_info.length; i ++) {
        changed['match_recent_info['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.match_year.length; i ++) {
        changed['match_year['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.match_mounth.length; i ++) {
        changed['match_mounth['+i+'].checked'] = false
    }
    this.setData(changed)
  },
  clear_type:function(){
        //////类型///
    var changed={}
    for (var i = 0; i < this.data.match_type.length; i ++) {
        changed['match_type['+i+'].checked'] = false
    }
    this.setData(changed)
  },
  recover:function(){
    //////恢复原状态数据
    this.setData({match_type:this.data.match_type_cache})
    this.setData({title_radio:this.data.title_radio_cache})
    this.setData({match_recent:this.data.match_recent_cache})
    this.setData({match_recent_info:this.data.match_recent_info_cache})
    this.setData({hots_checkbox:this.data.hots_checkbox_cache})
    this.setData({guonei_checkbox:this.data.guonei_checkbox_cache})
    this.setData({guoji_checkbox:this.data.guoji_checkbox_cache})
    this.setData({zhouji_checkbox:this.data.zhouji_checkbox_cache})
    this.setData({match_year:this.data.match_year_cache})
    this.setData({match_mounth:this.data.match_mounth_cache})
    /////地区
    for(var i=0;i<this.data.title_radio.length;i++){
      if(this.data.title_radio[i].checked){
        if(this.data.title_radio[i].value=='热门'){
          this.setData({area_show:{hot:true,guonei:false,guoji:false,zhouji:false}})
        }
        if(this.data.title_radio[i].value=='国内'){
          this.setData({area_show:{hot:false,guonei:true,guoji:false,zhouji:false}})
        }
        if(this.data.title_radio[i].value=='海外'){
          this.setData({area_show:{hot:false,guonei:false,guoji:true,zhouji:false}})
        }
        if(this.data.title_radio[i].value=='洲际'){
          this.setData({area_show:{hot:false,guonei:false,guoji:false,zhouji:true}})
        }
      }
    }
    for(var i=0;i<this.data.match_recent.length;i++){
      if(this.data.match_recent[i].checked){
          if(this.data.match_recent[i].value=='近期'){
            this.setData({time_show:{recent_info:true,time_year:false,time_mounth:false}})
          }
          if(this.data.match_recent[i].value=='年月'){
            this.setData({time_show:{recent_info:false,time_year:true,time_mounth:false}})
          }
      }
    }
    for(var i=0;i<this.data.match_year.length;i++){
      if(this.data.match_year[i].checked){
        this.setData({time_show:{recent_info:false,time_year:true,time_mounth:true}})
      }
    }
  },
  ///////////////重置按钮功能//////////////
  reset:function(e){
    var dif=e.target.id
    if(dif=='reset_type'){
      this.clear_type()
    }
    if(dif=='reset_area'){
      this.clear_area()
      this.setData({area_show:{hot:false,guonei:false,guoji:false,zhouji:false}})
    }
    if(dif=='reset_time'){
      this.clear_time()
      this.setData({time_show:{recent_info:false,time_year:false,time_mounth:false}})
    }

  },
  /////完成按钮功能////////////////////////
  success:function(e){
    var dif=e.target.id
    if(dif=='success_type'){
      this.save_data()
    }
    if(dif=='success_area'){
      this.save_data()
    }
    if(dif=='success_time'){
      this.save_data()
    }
    this.search_condition()
    this.setData({select_show:{_type:false,_area:false,_time:false,search_ws:false}})
  },
  //////////类型选中///////////////
  match_type:function(e){
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.match_type.length; i ++) {
      if (checked.indexOf(this.data.match_type[i].value) !== -1) {
        changed['match_type['+i+'].checked'] = true
      } else {
        changed['match_type['+i+'].checked'] = false

      }
    }
    this.setData(changed)
  },

  //////地区切换
  title_radio: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.title_radio.length; i ++) {
      if (checked.indexOf(this.data.title_radio[i].value) !== -1) {
        changed['title_radio['+i+'].checked'] = true
        if(checked=='热门'){
          this.setData({area_show:{hot:true,guonei:false,guoji:false,zhouji:false}})
        }
        if(checked=='国内'){
          this.setData({area_show:{hot:false,guonei:true,guoji:false,zhouji:false}})
        }
        if(checked=='海外'){
          this.setData({area_show:{hot:false,guonei:false,guoji:true,zhouji:false}})
        }
        if(checked=='洲际'){
          this.setData({area_show:{hot:false,guonei:false,guoji:false,zhouji:true}})
        }
        this.area_clear()
      } else {
        changed['title_radio['+i+'].checked'] = false
        //  this.setData({area_show:{hot:false,guonei:false,guoji:false,zhouji:false}})
      }
    }
    this.setData(changed)
  },
  // 地区切换清除函数
area_clear:function(){
  var changed = {};
    for (var i = 0; i < this.data.hots_checkbox.length; i ++) {
        changed['hots_checkbox['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.zhouji_checkbox.length; i ++) {
        changed['zhouji_checkbox['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.guonei_checkbox.length; i ++) {
        changed['guonei_checkbox['+i+'].checked'] = false
    }
    for (var i = 0; i < this.data.guoji_checkbox.length; i ++) {
        changed['guoji_checkbox['+i+'].checked'] = false
    }
    this.setData(changed)
},
hots_checkbox: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.hots_checkbox.length; i ++) {
      if (checked.indexOf(this.data.hots_checkbox[i].value) !== -1) {

        changed['hots_checkbox['+i+'].checked'] = true
      } else {
        changed['hots_checkbox['+i+'].checked'] = false

      }
    }
    this.setData(changed)
  },
  // 国内
  guonei_checkbox: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.guonei_checkbox.length; i ++) {
      if (checked.indexOf(this.data.guonei_checkbox[i].value) !== -1) {

        changed['guonei_checkbox['+i+'].checked'] = true
      } else {
        changed['guonei_checkbox['+i+'].checked'] = false

      }
    }
    this.setData(changed)
  },
  // 国外
  guoji_checkbox: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.guoji_checkbox.length; i ++) {
      if (checked.indexOf(this.data.guoji_checkbox[i].value) !== -1) {

        changed['guoji_checkbox['+i+'].checked'] = true
      } else {
        changed['guoji_checkbox['+i+'].checked'] = false

      }
    }
    this.setData(changed)
  },
  // 洲际
  zhouji_checkbox: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.zhouji_checkbox.length; i ++) {
      if (checked.indexOf(this.data.zhouji_checkbox[i].value) !== -1) {

        changed['zhouji_checkbox['+i+'].checked'] = true
      } else {
        changed['zhouji_checkbox['+i+'].checked'] = false

      }
    }
    this.setData(changed)
  },

  ////////地区筛选//////////////
  // 时间筛选
  time_title:function(e){
    var checked=e.detail.value
    var changed={}
    for (var i = 0; i < this.data.match_recent.length; i ++) {
      if (checked.indexOf(this.data.match_recent[i].value) !== -1) {
        changed['match_recent['+i+'].checked'] = true
        if(checked=='近期'){
          this.setData({time_show:{recent_info:true,time_year:false,time_mounth:false}})
        }
        if(checked=='年月'){
          this.setData({time_show:{recent_info:false,time_year:true,time_mounth:false}})
        }
        this.clear_title()
      } else {
        changed['match_recent['+i+'].checked'] = false
      }
    }
    this.setData(changed)
  },
  time_year:function(e){
    var checked=e.detail.value
    var changed={}
    for (var i = 0; i < this.data.match_year.length; i ++) {
      if (checked.indexOf(this.data.match_year[i].value) !== -1) {
        changed['match_year['+i+'].checked'] = true
        this.clear_mounth()
          this.setData({time_show:{recent_info:false,time_year:true,time_mounth:true}})
      } else {
        changed['match_year['+i+'].checked'] = false

      }
    }
    this.setData(changed)
  },
time_mounth:function(e){
    var checked=e.detail.value
    var changed={}
    for (var i = 0; i < this.data.match_mounth.length; i ++) {
      if (checked.indexOf(this.data.match_mounth[i].value) !== -1) {
        changed['match_mounth['+i+'].checked'] = true
      } else {
        changed['match_mounth['+i+'].checked'] = false
      }
    }
    this.setData(changed)
},
clear_mounth:function(){
  var changed={}
  for (var i = 0; i < this.data.match_mounth.length; i ++) {
        changed['match_mounth['+i+'].checked'] = false
    }
    this.setData(changed)
},
recent_info:function(e){
  var checked=e.detail.value
  var changed={}
  for(var i=0;i<this.data.match_recent_info.length;i++){
      if (checked.indexOf(this.data.match_recent_info[i].value) !== -1) {
        changed['match_recent_info['+i+'].checked'] = true
      } else {
        changed['match_recent_info['+i+'].checked'] = false
      }
  }
  this.setData(changed)
},
clear_title:function(){
  var changed={}
    for(var i=0;i<this.data.match_recent_info.length;i++){
        changed['match_recent_info['+i+'].checked'] = false
  }
    for (var i = 0; i < this.data.match_mounth.length; i ++) {
        changed['match_mounth['+i+'].checked'] = false
    }
      for (var i = 0; i < this.data.match_year.length; i ++) {
        changed['match_year['+i+'].checked'] = false
    }
    this.setData(changed)
},

//////将缓存数据存放到原始数据里///
save_data:function(){
    this.setData({match_type_cache:this.data.match_type})
    this.setData({title_radio_cache:this.data.title_radio})
    this.setData({match_recent_cache:this.data.match_recent})
    this.setData({match_recent_info_cache:this.data.match_recent_info})
    this.setData({hots_checkbox_cache:this.data.hots_checkbox})
    this.setData({guonei_checkbox_cache:this.data.guonei_checkbox})
    this.setData({guoji_checkbox_cache:this.data.guoji_checkbox})
    this.setData({zhouji_checkbox_cache:this.data.zhouji_checkbox})
    this.setData({match_year_cache:this.data.match_year})
    this.setData({match_mounth_cache:this.data.match_mounth})
},
//////////////////选中条件带出模块/////////////////////////
search_condition:function(){
  var search_data={}
  //////类型带出////
  var data_type=[]

  var type_condition=[]
  for(var i=0;i<this.data.match_type_cache.length;i++){
      if (this.data.match_type_cache[i].checked == 'true' || this.data.match_type_cache[i].checked == true) {
        type_condition.push(this.data.match_type_cache[i])
        data_type.push(this.data.match_type_cache[i].value)
      }
  }
  this.setData({type_condition:type_condition})
  //////地区带出//////////////
  var area_condition=[]
   for(var i=0;i<this.data.title_radio_cache.length;i++){
      if (this.data.title_radio_cache[i].checked == 'true' || this.data.title_radio_cache[i].checked == true) {
        area_condition.push(this.data.title_radio_cache[i])
        search_data.search_area_type = this.data.title_radio_cache[i].value
        if (search_data.search_area_type=='海外'){
          search_data.search_area_type='国际'
        }
      }
  }
  for(var i=0;i<this.data.hots_checkbox_cache.length;i++){
      if (this.data.hots_checkbox_cache[i].checked == true || this.data.hots_checkbox_cache[i].checked == 'true') {
        area_condition.push(this.data.hots_checkbox_cache[i])
      }
  }
  for(var i=0;i<this.data.guonei_checkbox_cache.length;i++){
      if (this.data.guonei_checkbox_cache[i].checked == 'true' || this.data.guonei_checkbox_cache[i].checked == true) {
        area_condition.push(this.data.guonei_checkbox_cache[i])
      }
  }
   for(var i=0;i<this.data.guoji_checkbox_cache.length;i++){
      if (this.data.guoji_checkbox_cache[i].checked == 'true' || this.data.guoji_checkbox_cache[i].checked == true) {
        area_condition.push(this.data.guoji_checkbox_cache[i])
      }
  }
   for(var i=0;i<this.data.zhouji_checkbox_cache.length;i++){
      if (this.data.zhouji_checkbox_cache[i].checked == 'true' || this.data.zhouji_checkbox_cache[i].checked == true) {
        area_condition.push(this.data.zhouji_checkbox_cache[i])
      }
  }
  this.setData({area_condition:area_condition})  
  ////////////时间带出///
  var time_condition=[]
   for(var i=0;i<this.data.match_recent_info_cache.length;i++){
      if (this.data.match_recent_info_cache[i].checked == 'true' || this.data.match_recent_info_cache[i].checked == true) {
        time_condition.push(this.data.match_recent_info_cache[i])
      }
  }
   for(var i=0;i<this.data.match_year_cache.length;i++){
      if (this.data.match_year_cache[i].checked == 'true' || this.data.match_year_cache[i].checked == true) {
        time_condition.push(this.data.match_year_cache[i])
      }
  }
   for(var i=0;i<this.data.match_mounth_cache.length;i++){
      if (this.data.match_mounth_cache[i].checked == 'true' || this.data.match_mounth_cache[i].checked == true) {
        time_condition.push(this.data.match_mounth_cache[i])
      }
  }
   this.setData({ time_condition: time_condition })
  //////data条件//////
  /////////////地区//////
  var data_area=[]
  if (this.data.area_condition.length>0){
      for (var i = 0; i < this.data.area_condition.length; i++) {
        if (i > 0) {
          data_area.push(this.data.area_condition[i].value)
        }
      }
  }
  ///////////////时间/////////
  var data_time=[]
  if (this.data.time_condition.length>0){
    if (this.data.time_condition.length == 1 || this.data.time_condition[0].value == '未来三周' || this.data.time_condition[0].value == '未来三个月') {
        for (var i = 0; i < this.data.time_condition.length;i++){
          data_time.push(this.data.time_condition[i].value)
        }
      } else {
        if (this.data.time_condition.length > 0) {
          for (var i = 0; i < this.data.time_condition.length; i++) {
            if (i > 0) {
              if (parseInt(this.data.time_condition[i].value) < 10) {
                data_time.push(this.data.time_condition[0].value + '-0' + this.data.time_condition[i].value)
              } else {
                data_time.push(this.data.time_condition[0].value + '-' + this.data.time_condition[i].value)
              }
            }
          }
        }
      }
  }
  search_data.search_coming_times = data_time
  search_data.search_area_bar = data_area
  search_data.search_type_bar = data_type
  search_data.lat = this.data.latitude
  search_data.lng = this.data.longitude
  this.ajax(this, search_data)
this.show_condition()
},
//////删除带出的筛选条件
close_condition:function(e){
  var close_value=e.currentTarget.dataset.text
  ///////////删除类型////////////////////
  var search_data = {}
  var data_type = []

  for(var i=0;i<this.data.type_condition.length;i++){
    var a=this.data.type_condition
    if(close_value==this.data.type_condition[i].value){
      this.data.type_condition.splice(i,1)
    }else{
      data_type.push(this.data.type_condition[i].value)
    }
  }
  this.setData({type_condition:this.data.type_condition})
  for(var i=0;i<this.data.match_type_cache.length;i++){
    if(close_value==this.data.match_type_cache[i].value){
      this.data.match_type_cache[i].checked=false
    }
  }
  this.setData({match_type_cache:this.data.match_type_cache})
  //////////////////删除地区////////////////
  var data_area = []
  for(var i=0;i<this.data.title_radio_cache.length;i++){
    if(close_value==this.data.title_radio_cache[i].value){
      this.data.title_radio_cache[i].checked=false
      var area_condition=[];
      this.setData({area_condition:area_condition})
      var changed={}
      for (var i = 0; i < this.data.hots_checkbox_cache.length; i ++) {
          changed['hots_checkbox_cache['+i+'].checked'] = false
      }
      for (var i = 0; i < this.data.zhouji_checkbox_cache.length; i ++) {
          changed['zhouji_checkbox_cache['+i+'].checked'] = false
      }
      for (var i = 0; i < this.data.guonei_checkbox_cache.length; i ++) {
          changed['guonei_checkbox_cache['+i+'].checked'] = false
      }
      for (var i = 0; i < this.data.guoji_checkbox_cache.length; i ++) {
          changed['guoji_checkbox_cache['+i+'].checked'] = false
      }
      this.setData(changed)
    }
  }
  if (this.data.area_condition.length>0){
    search_data.search_area_type = this.data.area_condition[0].value
  }else{
    search_data.search_area_type =''
  }
  for(var i=0;i<this.data.area_condition.length;i++){
    if(close_value==this.data.area_condition[i].value){
      this.data.area_condition.splice(i,1)
      this.setData({area_condition:this.data.area_condition})
      var changed={}
      for (var i = 0; i < this.data.hots_checkbox_cache.length; i ++) {
        if(close_value==this.data.hots_checkbox_cache[i].value){
            changed['hots_checkbox_cache['+i+'].checked'] = false
        }
      }
      for (var i = 0; i < this.data.guonei_checkbox_cache.length; i ++) {
        if(close_value==this.data.guonei_checkbox_cache[i].value){
            changed['guonei_checkbox_cache['+i+'].checked'] = false
        }
      }
      for (var i = 0; i < this.data.guoji_checkbox_cache.length; i ++) {
        if(close_value==this.data.guoji_checkbox_cache[i].value){
            changed['guoji_checkbox_cache['+i+'].checked'] = false
        }
      }
      for (var i = 0; i < this.data.zhouji_checkbox_cache.length; i ++) {
        if(close_value==this.data.zhouji_checkbox_cache[i].value){
            changed['zhouji_checkbox_cache['+i+'].checked'] = false
        }
      }
      this.setData(changed)
    }else{
      if(i>0){
        data_area.push(this.data.area_condition[i].value)
      }
    }
  }
  
  ///////////////删除时间
  for(var i=0;i<this.data.match_recent_info_cache.length;i++){
    if(close_value==this.data.match_recent_info_cache[i].value){
        this.data.match_recent_info_cache[i].checked=false
        this.data.time_condition.splice(i, 1)
        this.setData({ time_condition: this.data.time_condition})
    }
  }
  for(var i=0;i<this.data.match_year_cache.length;i++){
    if(close_value==this.data.match_year_cache[i].value){
        this.data.match_year_cache[i].checked=false
        this.setData({time_condition:time_condition})
        for(var i=0;i<this.data.match_mounth_cache.length;i++){
          this.data.match_mounth_cache[i].checked=false
        }
    }
  }
  for(var i=0;i<this.data.time_condition.length;i++){
    if(close_value==this.data.time_condition[i].value){
      this.data.time_condition.splice(i,1)
      this.setData({time_condition:this.data.time_condition})
    }
  }
  for(var i=0;i<this.data.match_mounth_cache.length;i++){
    if(close_value==this.data.match_mounth_cache[i].value){
      this.data.match_mounth_cache[i].checked=false
    }
  }

  var data_time = []
  if (this.data.time_condition.length > 0) {
    if (this.data.time_condition.length == 1 || this.data.time_condition[0].value == '未来三周' || this.data.time_condition[0].value == '未来三个月') {
      for (var i = 0; i < this.data.time_condition.length; i++) {
        data_time.push(this.data.time_condition[i].value)
      }
    } else {
      if (this.data.time_condition.length > 0) {
        for (var i = 0; i < this.data.time_condition.length; i++) {
          if (i > 0) {
            if (parseInt(this.data.time_condition[i].value) < 10) {
              data_time.push(this.data.time_condition[0].value + '-0' + this.data.time_condition[i].value)
            } else {
              data_time.push(this.data.time_condition[0].value + '-' + this.data.time_condition[i].value)
            }
          }
        }
      }
    }
  }
  search_data.search_coming_times = data_time
  search_data.search_area_bar = data_area
  search_data.search_type_bar = data_type
  search_data.lat = this.data.latitude
  search_data.lng = this.data.longitude
  this.ajax(this, search_data)
  this.show_condition()
},
show_condition:function(){
  if(this.data.type_condition.length<=0 && this.data.area_condition.length<=0 && this.data.time_condition.length<=0){
    this.setData({show_condition:false})
  }else{
    this.setData({show_condition:true})
  }
},
clear_condition:function(){
  var search_data={}
  search_data.lat = this.data.latitude
  search_data.lng = this.data.longitude
  this.clear_all()
  this.save_data()
  this.setData({type_condition:[],area_condition:[],time_condition:[]})
  this.show_condition()
  this.ajax(this, search_data)
},
drop_hid:function(){
  this.setData({select_show:{_type:false,_area:false,_time:false,search_ws:false}})
},
////////////////////倒计时///
countdown:function(){
  var that = this

    var flag = setInterval(function () {
      var arr=[]
      var arr_day=[]
      var countdown = that.data.countdown
      for(var i=0;i<countdown.length;i++){
        var self_time = countdown[i]
          if (self_time < 0) {
            var arr_time = { day: '00', hour: '00', minute: '00', second: '00' }
            arr.push(self_time)
            arr_day.push(arr_time)
            break;
          } else {
            var minute, hour, day, second;
            day = Math.floor(self_time / 60 / 60 / 24) < 10 ? '0' + Math.floor(self_time / 60 / 60 / 24) : Math.floor(self_time / 60 / 60 / 24);
            hour = Math.floor(self_time / 60 / 60 % 24) < 10 ? '0' + Math.floor(self_time / 60 / 60 % 24) : Math.floor(self_time / 60 / 60 % 24);
            minute = Math.floor(self_time / 60 % 60) < 10 ? '0' + Math.floor(self_time / 60 % 60) : Math.floor(self_time / 60 % 60);
            second = Math.floor(self_time % 60) < 10 ? '0' + Math.floor(self_time % 60) : Math.floor(self_time % 60);
            //倒计时执行函数
            var arr_time={day:day,hour:hour,minute:minute,second:second}
            self_time--;
            arr_day.push(arr_time)
            arr.push(self_time)
          }
          that.data.countdown=arr
      }
      that.setData({ arr_day: arr_day })
    }, 1000);
},
/////////搜索弹出js开始///////
// keyward_focus:function(e){
//   if (e.detail.value != '') {
//     this.setData({ input_string: true })
//   } else {
//     this.setData({ input_string: false })
//   }
//     this.setData({input_place:{value:'搜索',focus:true}})
// },
// keyward_blur: function (e) {
//   if (e.detail.value != '') {
//     this.setData({ input_string: true })
//   } else {
//     this.setData({ input_string: false })
//   }
//   this.setData({ input_place: { value: '搜索全球跑步赛事', focus: false} })
// },
// keyward_input: function (e) {
//   if(e.detail.value!=''){
//     this.setData({ input_string: true, input_value: e.detail.value})
//   }else{
//     this.setData({ input_string: false, input_value:'' })
//   }
// },
// keyward_searchgo:function(){
//   var loc_search = this.data.loc_search
//   if (!loc_search){
//       var loc_search=[]
//   }
//   var ws=this.data.input_value
//   if(ws!=''){
//     for (var i = 0; i < loc_search.length;i++){
//       if (ws == loc_search[i]){
//             loc_search.splice(i,1)
//         }
//     }
//     loc_search.unshift(ws)
//     this.setData({ loc_search: loc_search})
//     wx.setStorageSync('loc_search', loc_search)
//     wx.redirectTo({
//       url: '/pages/search/search?ws='+ws,
//     })
//   }
// },
// delet_locsearch:function(){
//     wx.removeStorageSync('loc_search')
//     this.setData({loc_search:[]})
// },
// keyward_close:function(){
//   this.setData({ search_or_list: false })
// },
// clear_inputVal: function () {
//   this.setData({ search_value: '', input_value: '', input_string: false })
// },
// search:function(){
//   this.setData({search_or_list:true})
// },
/////////搜索弹出js结束///////
ajax:function(that,search_data){
  wx.showLoading({
    title: '加载中',
  })
  var data=search_data
  that.setData({ search_data: search_data,page:1})
  local.wx_request('https://api.h5.zx-tour.com/H5Match/lists', 'post', 'json', data, this, function(res,that){
      wx.hideLoading()
      var datalistArr = res.data.data
      that.setData({ datalistArr: datalistArr })
      that.dealwith_data(datalistArr, that)
      that.countdown()
  })
},
  dealwith_data: function (datalist,that){
  var length = datalist.length
  // datalist.splice(10,length)
  var now = new Date().getTime()
  var day_7 = 7 * 24 * 60 * 60 * 1000
  that.data.countdown = []
  for (var i = 0; i < datalist.length; i++) {
    var start = that.get_Date(datalist[i].m_signuptime).getTime()
    var stop = that.get_Date(datalist[i].m_untilTime).getTime()
    var gameStart = that.get_Date(datalist[i].m_GameTime).getTime()
    ///////////////计时器/////////////
    var time_arr = Math.floor((stop - now) / 1000)
    that.data.countdown.push(time_arr)
    var _that = that
    // that.countdown(start,stop,i)
    //////////////////把时间切掉//////////////
    datalist[i].stop = datalist[i].m_untilTime.substring(0, 10)
    ///////城市地点处理///////////
    var m_city = datalist[i].m_city.split('-')
    var city = '';
    if (datalist[i].m_country != '中国') {
      if (m_city.length > 1) {
        city = m_city[0];
      }
      if (m_city.length <= 1) {
        city = m_city[0]
      }
      if (datalist[i].m_country == m_city[0]) {
        city = m_city[0]
      } else {
        city = datalist[i].m_country + '-' + city;
      }
    } else {
      if (m_city.length > 1) {
        if (m_city[1] == m_city[0]) {
          city = m_city[1];
        } else {
          city = m_city[0] + '-' + m_city[1];
        }
      }
      if (m_city.length <= 1) {
        city = m_city[0]
      }
    }
    datalist[i].city = city
    ////////////////////////////赛事单独报名和套餐////////////////////
    var taocan = datalist[i].info
    var dandu_price = 1000000
    var taocan_price = 1000000
    var dandu_or_taocan = ''
    var dandu_m = ''
    var taocan_m = ''
    for (var m = 0; m < taocan.length; m++) {
      if (taocan[m]['g_type'] == 1 && parseFloat(taocan[m]['g_currprice']) > 0) {
        if (parseFloat(taocan[m]['g_currprice']) <= dandu_price) {
          dandu_price = parseFloat(taocan[m]['g_currprice'])
          dandu_m = m;
        }

      }
      if (taocan[m]['g_type'] == 2 && taocan[m]['g_name'] != "赛事单独报名") {
        if (parseFloat(taocan[m]['g_currprice']) <= taocan_price) {
          taocan_price = parseFloat(taocan[m]['g_currprice'])
          taocan_m = m
        }
      }
    }
    if (taocan_price == 1000000) {
      datalist[i].taocan_price = false
    } else {
      datalist[i].taocan_price = taocan_price
    }
    if (dandu_price == 1000000) {
      datalist[i].dandu_price = false
    } else {
      datalist[i].dandu_price = dandu_price
    }
    if (datalist[i].dandu_price != false && datalist[i].taocan_price != false) {
      if (datalist[i].dandu_price > datalist[i].taocan_price) {
        datalist[i].dandu_or_taocan = datalist[i].taocan_price
      } else {
        datalist[i].dandu_or_taocan = datalist[i].dandu_price
      }
    } else if (datalist[i].dandu_price != false && datalist[i].taocan_price == false) {
      datalist[i].dandu_or_taocan = datalist[i].dandu_price
    } else {
      datalist[i].dandu_or_taocan = datalist[i].taocan_price
    }


    if (dandu_m != '') {
      if (taocan[dandu_m]['g_stockleft'] <= 20 && taocan[dandu_m]['g_stockleft'] > 0) {
        datalist[i].dandu_m = true
      }
    }
    if (taocan_m != '') {
      if (taocan[taocan_m]['g_stockleft'] <= 20 && taocan[taocan_m]['g_stockleft'] > 0) {
        datalist[i].taocan_m = true
      }
    }

    //////////////时间状态/////////////
    if (now < start) {
      datalist[i].state = "未开始报名"
    } else if (now >= start && now < stop) {
      ////报名中/////
      if (datalist[i].m_placesleft <= 0) {
        datalist[i].state = "名额已满"
      } else {
        if ((now + day_7) >= stop) {
          datalist[i].state = "即将截止"
        } else {
          datalist[i].state = ""
        }
      }
    } else if (now >= stop && now < gameStart) {
      if (datalist[i].m_placesleft <= 0) {
        datalist[i].state = "名额已满"
      } else {
        datalist[i].state = "报名截止"
      }
    } else {
      datalist[i].state = "比赛结束"
    }

  }
  that.setData({ dataList: datalist })
},
get_Date:function(strDate){
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = a[1].split(":");
    var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])
            return date;
  },
  /////////////////切换列表////////////
qiehuan:function(){
  var qiehuan=this.data.qiehuan
    if(qiehuan){
      qiehuan=false
    }else{
      qiehuan=true
    }
    this.setData({qiehuan:qiehuan})
},
  onLoad:function(options){
    var a=getCurrentPages()

    var that=this
    var m_type=options.type
    var dif=''
    if(m_type=='0'){
        ///海外赛事
        dif='海外' 
    } else if (m_type == '1'){
       dif = '国内' 
    } else if (m_type == '2') {
       dif = '马拉松' 
    } else if (m_type == '3') {
       dif = '越野跑' 
    } else if (m_type == '4'){
       dif = '欢乐跑' 
    }
    var add_city=function(res,that){
      // guoji_checkbox
      if(dif!=''){
        for (var i = 0; i < that.data.title_radio.length;i++){
          if (that.data.title_radio[i].value==dif){
            that.data.title_radio[i].checked=true
            that.setData({ title_radio: that.data.title_radio})
          }
        }
        for (var i = 0; i < that.data.match_type.length; i++) {
          if (that.data.match_type[i].value == dif) {
            that.data.match_type[i].checked = true
            that.setData({ match_type: that.data.match_type })
          }
        }
      }
      //////国际
      var guoji = res.data.data.abroad
      var guoji_checkbox=[]
      for(var i=0;i<guoji.length;i++){
        guoji_checkbox.push({value:guoji[i]})
      }
      //////国内//
      var guonei = res.data.data.domestic
      var guonei_checkbox = []
      for (var i = 0; i < guonei.length; i++) {
          guonei_checkbox.push({ value: guonei[i] })
      }
      ////////////热门/////////////
      var hot = res.data.data.hotarea
      var hots_checkbox = []
      for (var i = 0; i < hot .length; i++) {
        hots_checkbox.push({ value: hot[i].n_title })
      }
      that.setData({ guoji_checkbox: guoji_checkbox, guonei_checkbox: guonei_checkbox, hots_checkbox: hots_checkbox})
      that.save_data()
      /////////////////拿位置///////////////
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // success
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          that.setData({ latitude: latitude, longitude: longitude })
          that.search_condition()
        },
        fail: function (res) {
          // wx.hideLoading()
          var latitude = ''
          var longitude = ''
          that.setData({ latitude: latitude, longitude: longitude })
          that.search_condition()
          // fail
        },
        complete: function (res) {
          // wx.hideLoading()
          // var latitude = ''
          // var longitude = ''
          // that.setData({ latitude: latitude, longitude: longitude })
          // that.search_condition()
          // wx.hideLoading()
          // complete
        }
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    local.wx_request('https://api.h5.zx-tour.com/h5Comon/hotcity', 'post', 'json', {},this,add_city)

    ////////热词搜索//////
    local.wx_request('https://api.h5.zx-tour.com/h5Comon/hotwd', 'post', 'json', {}, this, function(res,that){
        var data = res.data.data
        var hotwd = []
        for (var i = 0; i < data.length; i++) {
          hotwd.push(data[i].n_title)
        }
        that.setData({ hotwd: hotwd })
    })
    // wx.request({
    //   url: 'https://api.h5.zx-tour.com/h5Comon/hotwd',
    //   method: 'get',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   dataType: 'json',
    //   success: function (res) {
    //       var data=res.data.data
    //       var hotwd=[]
    //       for(var i=0;i<data.length;i++){
    //         hotwd.push(data[i].n_title)
    //       }
    //       that.setData({ hotwd: hotwd})
    //   }
    // })
    ///////搜索记录////
    var loc_search=wx.getStorageSync("loc_search")
    if (!loc_search){
        loc_search=[]
    }
    this.setData({loc_search:loc_search})

    // for(var i=0;i<test.length;i++){
    //   this.countdown()
    // }
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
    var search_data = this.data.search_data
    search_data.page=this.data.page+1
    var that=this
    local.wx_request('https://api.h5.zx-tour.com/H5Match/lists', 'post', 'json', search_data, this, function (res, that) {
      wx.hideLoading()
      var datalistArr = res.data.data
      var old_datalistArr = that.data.datalistArr
      var newArr = old_datalistArr.concat(datalistArr)
      that.dealwith_data(newArr, that)
      that.countdown()
      that.setData({ page: search_data.page, datalistArr: newArr })
    })
    // wx.request({
    //   url: 'https://api.h5.zx-tour.com/H5Match/lists',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   method: 'post',
    //   data: search_data,
    //   success: function (res) {
    //     wx.hideLoading()
    //     var datalistArr = res.data.data
    //     var old_datalistArr = that.data.datalistArr
    //     var newArr = old_datalistArr.concat(datalistArr)
    //     that.dealwith_data(newArr, that)
    //     that.countdown()
    //     that.setData({ page: search_data.page, datalistArr: newArr})
    //   }
    // })

  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '知行合逸', // 分享标题
      desc: '全球跑步赛事，一站直达', // 分享描述
      path: '/pages/run/run' // 分享路径
    }
  }
})