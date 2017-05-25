/**
 * Created by Administrator on 2016/9/7.
 */

$(function(){
    var title = ' 插坐学院2017迎新大课';
    var descText = '我们再次拿出所有诚意把最具代表性的 20 位老师，请到上海用 2 整天的时间，高浓度畅聊我们新媒体人的2017热烈欢迎你新同学与老同学';
    var linkUrl = window.location.href;
    var imageUrl = 'http://www.chazuomba.com/files/webApp/images/additional/logo-01.png';

    publicShare(title,descText,linkUrl,imageUrl);
    function publicShare(title,descText,linkUrl,imageUrl){
        // 课程名字
        $.getJSON(baseUrl + "getAccessToken",{'client_version':'1','device_id':'2','platform':'2','url':window.location.href},function(data){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx46b392bf3bf15522', // 必填，公众号的唯一标识
                timestamp: data.data.time,   // 必填，生成签名的时间戳
                nonceStr: data.data.uuid,    // 必填，生成签名的随机串
                signature: data.data.digest, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });

        wx.error(function(res){
            //alert(res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res、数中查看，对于SPA可以在这里更新签名。
        });

        wx.ready(function() {
            // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: linkUrl,
                imgUrl: imageUrl, // 分享图标
                success: function () {

                },
                cancel: function () {


                    // 用户取消分享后执行的回调函数
                    //alert("分享到朋友圈失败！");
                }
            });
            // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: descText, // 分享描述
                link: linkUrl,
                imgUrl: imageUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link

                success: function () {
                    //alert("分享微信好友成功！");


                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    //alert("分享微信好友失败！");


                }
            });
            //QQ好友
            wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: descText, // 分享描述
                link: linkUrl, // 分享链接
                imgUrl: imageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数


                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数

                }
            });
        });
    };




});