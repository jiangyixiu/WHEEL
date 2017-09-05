// video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayPause: "1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
    console.log(this.videoContext)
  },

  inputValue: '测试弹幕',

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },

  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  playPause: function (e) {
    let that = this;
    if (e.target.dataset.name === "1") {
      that.videoContext.play()
      that.setData({
        isPlayPause: "0"
      })
    } else {
      that.videoContext.pause()
      that.setData({
        isPlayPause: "1"
      })
    }
  },

  playbackRate: function (){
    this.videoContext.playbackRate(1.5)
  },

  requestFullScreen: function () {
    this.videoContext.requestFullScreen()
  },

  exitFullScreen: function () {
    this.videoContext.exitFullScreen()
  }

})

function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}