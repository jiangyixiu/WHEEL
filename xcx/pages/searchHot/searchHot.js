// /pages/searchHot/searchHot.js
var local = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /////搜索记录///
    loc_search: [],
    clear_input: true,
    input_string:false
  },
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
      this.setData({ input_string: true })
    } else {
      this.setData({ input_string: false })
    }
    this.setData({ input_place: { value: '搜索全球跑步赛事', focus: false } })
  },
  keyward_input: function (e) {
    if (e.detail.value != '') {
      this.setData({ input_string: true, input_value: e.detail.value })
    } else {
      this.setData({ input_string: false, input_value: '' })
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
  delet_locsearch: function () {
    wx.removeStorageSync('loc_search')
    this.setData({ loc_search: [] })
  },
  keyward_close: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  clear_inputVal: function () {
    this.setData({ search_value: '', input_value: '', input_string: false })
  },
  search: function () {
    this.setData({ search_or_list: true })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ////////热词搜索//////
    local.wx_request('https://api.h5.zx-tour.com/h5Comon/hotwd', 'post', 'json', {}, this, function (res, that) {
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
    var loc_search = wx.getStorageSync("loc_search")
    if (!loc_search) {
      loc_search = []
    }
    this.setData({ loc_search: loc_search })
  
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
  
  }
})