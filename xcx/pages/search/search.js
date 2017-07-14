// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loc_search: [],
    input_place: { value: "搜索全球跑步赛事", focus: false },
    emputy:true,
    clear_input:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  keyward_focus: function (e) {
    if (e.detail.value != '') {
      this.setData({ input_string: true })
    } else {
      this.setData({ input_string: false })
    }
    this.setData({ input_place: { value: '搜索', focus: true } })
  },
  keyward_blur: function (e) {
    if (e.detail.value != '') {
      this.setData({ input_string: true, clear_input:true})
    } else {
      this.setData({ input_string: false, clear_input:false })
    }
    this.setData({ input_place: { value: '搜索全球跑步赛事', focus: false } })
  },
  keyward_input: function (e) {
    if (e.detail.value != '') {
      this.setData({ input_string: true, clear_input:true, input_value: e.detail.value })
    } else {
      this.setData({ input_string: false, clear_input:false, input_value: '' })
    }
  },
  keyward_searchgo: function () {
    var loc_search = this.data.loc_search
    if (!loc_search) {
      var loc_search = []
    }
    var ws = this.data.input_value
    if (ws != '') {
      for (var i = 0; i < loc_search.length; i++) {
        if (ws == loc_search[i]) {
          loc_search.splice(i, 1)
        }
      }
      loc_search.unshift(ws)
      this.setData({ loc_search: loc_search })
      wx.setStorageSync('loc_search', loc_search)
      wx.redirectTo({
        url: '/pages/search/search?ws=' + ws,
      })
    }
  },
  keyward_close:function(){
    wx.navigateBack({
      
    })
    // wx.redirectTo({
    //   url: '/pages/run/run',
    // })
  },
  clear_inputVal:function(){
    this.setData({ search_value: '', input_value: '', input_string: false, clear_input: false})
  },
  dealwith_data: function (res, that) {
    var datalist = res.data.data
    var length = datalist.length
    // datalist.splice(10,length)
    var now = new Date().getTime()
    var day_7 = 7 * 24 * 60 * 60 * 1000
    for (var i = 0; i < datalist.length; i++) {
      var start = that.get_Date(datalist[i].m_signuptime).getTime()
      var stop = that.get_Date(datalist[i].m_untilTime).getTime()
      var gameStart = that.get_Date(datalist[i].m_GameTime).getTime()
      ///////////////计时器/////////////
      var time_arr = Math.floor((stop - now) / 1000)
      // that.data.countdown.push(time_arr)
      // console.log(start, stop, i)
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
        if (taocan[m]['g_type'] == 1 && parseFloat(taocan[m]['g_currprice']) != 0) {
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
  get_Date: function (strDate) {
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = a[1].split(":");
    var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])
    return date;
  },
  onLoad: function (options) {
    var ws = options.ws
    this.setData({ search_value: ws, input_value:ws,ws:ws})
    this.data.loc_search=wx.getStorageSync('loc_search')
    var loc_search = this.data.loc_search
    if (loc_search==''){
      loc_search=[]
    }
    for(var i=0;i<loc_search.length;i++){
      if (ws == loc_search[i]) {
        loc_search.splice(i, 1)
      }
    }
    loc_search.unshift(ws)
    wx.setStorageSync('loc_search', loc_search)
    var that=this

      wx.request({
        url: 'https://api.h5.zx-tour.com/H5Match/lists?ws='+ws,
        method:'post',
        dataType:'json',
        success:function(res){
          if(res.data.error==1){
            wx.hideLoading()
            that.setData({emputy:false})
          }else{
            wx.hideLoading()
            that.dealwith_data(res, that)
          }
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
    console.log(this)
    return {
      title: '知行合逸', // 分享标题
      desc: '全球跑步赛事，一站直达', // 分享描述
      path: '/pages/search/search?ws='+this.data.ws // 分享路径
    }
  }
})