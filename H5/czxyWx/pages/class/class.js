import api from '../../api/api.js'
Page({
  //分享
//onShareAppMessage: function (e) {
//  return {
//    title: '好多课',
//    desc: '企业新媒体学习第一站',
//    path: 'pages/class/class?id=' + e.id
//  }
//},
  onLoad: function(e) {
    console.log('onload');
    var that = this;
    var id = e.id;
    that.setData({
      teacherId: id
    });
    api.getTeacherDetail({
      data: {
        id: id
      },
      success: function(res) {
        if(res.data && res.data.status == "200") {
          var data = res.data.data;
          that.setData({
            _t: data,
            bewrite: data.bewrite.replace(/\n/g, "；"),
            teacherName: data.teacher_name
          })
        } else {
          that.setData({
            _t: {},
            bewrite: '',
            teacherName: ''
          })
        }
      }
    })
  }
})