//定义常量，接口主机
const host = 'https://sslapi.chazuomba.com/'
//微信请求接口
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

// Index
//获取教师列表
const getTeacherList = (params) => wxRequest(params, host + 'WXRoutine/teacherList')

//Class
//获取教师课程
const getTeacherDetail = (params) => wxRequest(params, host + 'WXRoutine/teacherDetail')

module.exports = {
	getTeacherList,
	getTeacherDetail
}
