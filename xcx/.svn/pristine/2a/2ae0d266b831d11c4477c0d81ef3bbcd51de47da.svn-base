var app = getApp()
Page({
    data:{
		field: [],
		usermsg: [],
		racemsg: [],
        no_imgsrc:'http://weixin.zx-tour.com/static/xcx_img/no_uppic.png',
        no_imgsize:'width:150rpx;height:125rpx;margin-top:75rpx;margin-bottom:50rpx'
    },
    onLoad:function(options){
        var that = this;
        app.wx_request('https://api.h5.zx-tour.com/H5Order/getorderenrollinfo?orderid='+options.orderid,'post','json',{},that,function(res,that){
            that.setData({
                field:JSON.parse(res.data.data.field),
                usermsg: res.data.data.userinfo,
                racemsg: res.data.data.orderinfo
            })
        },function(_res,that){
            console.log(_res);
        });
        wx.setNavigationBarTitle({
            title: '参赛人信息'
        })
       
    }
})