/**
 * Created by Administrator on 2016/8/25.
 */
var courseId = request('id');
var from = request('from');
$(function(){
    getUserIp(courseId,3,from);  //统计简章打开次数
    // 设置标题
    if( isWeiXin() ){
        $('.header').show();
        $('.title').css({"paddingTop":"6.8rem"});
    }

    loading(true);
    $.ajax({
        type:"get",
        url:baseUrl+"findOfflineCourseContent?page=1&courseType=1&newtype=0&courseId="+courseId,
        data:{},
        async:true,
        dataType:"json",
        success:function(data){
            console.log(data)
            $('#content').css({
                'max-width':'640px',
                'margin':'auto'
            })
            $('#content').html(data.data);
            loading(false);
        }
    });

    // $.ajax({
    //     type:"get",
    //     url:baseUrl+"getOnlineCourseCode?courseName="+courseName+"&id="+courseId,
    //     data:{},
    //     async:true,
    //     dataType:"json",
    //     success:function(data){
            $.ajax({    // 设置标题&分享图片
                type: "get",
                url: baseUrl + "findWebOfflineCourseInfo",
                data: {
                    'client_version': '1',
                    'device_id': '1',
                    'platform': 'web',
                    'courseId': courseId
                },
                dataType: "json",
                success: function (data) {
                    if (data.data.isOver == '1'||courseId == '765') {
                        $("#enroll").html("已没有名额").css('background-color', '#B8B8B8');
                        return;
                    }else{
                        // var url = payPagePath(courseId);
                        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri=' + redirect_uri + courseId + encodeURIComponent("?from="+from)+ '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
                        ;
                        //console.log(url)
                        $("#enroll span").html(data.data.price+"元<i>/</i>年&nbsp;&nbsp;&nbsp;立即报名").css('background-size', '14%');
                        // 点击报名
                        $('#enroll').click(function(event){
                            getUserIp(courseId,2,from);    //统计点击次数
                            if( !isWeiXin() ){
                                huaPing(false);// 阻止滑屏
                                $('#newQrcode').html('<i class="icon-remove"></i><div class="pointQR">请截取二维码<br/>使用微信扫一扫进行支付</div>').show();
                                $('#newQrcode').css({'backgroundColor':'#fff'})
                                var _url = utf16to8(url);
                                jQuery('#newQrcode').qrcode({
                                    text: _url,              //设置二维码内容
                                    width: 200,             //设置宽度
                                    height: 200,            //设置高度
                                    correctLevel: 0,        //纠错等级,
                                    render: "canvas",       //设置渲染方式
                                    background: "#ffffff",  //背景颜色
                                    foreground: "#000000"   //前景颜色
                                });
                                $('#newQrcode').click(function(){
                                    $(this).hide();
                                    huaPing(true);
                                });
                            } else {
                                window.location.href = url;
                            }
                        });



                    }
                }
            });
        // }
    // });
});
