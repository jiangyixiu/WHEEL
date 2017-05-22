function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function postData(options, data, callback) {
  wx.request({
    url: options, //仅为示例，并非真实的接口地址
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method : 'POST',
    success: function(res) {
      console.log(res.data)
      callback && callback(res);
    }
  })
}

module.exports = {
  formatTime: formatTime
}
