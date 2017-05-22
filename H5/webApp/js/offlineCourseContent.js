/**
 * Created by Administrator on 2016/8/25.
 */
var courseId   = request('id');
var from       = request('from');
if(courseId=='951'){var type= '1'}else{var type= '0'}//大课传值
var isfull;
var cover;
var courseName;
var isOver;
var buySelf;//购买 1自己  0别人
$(function(){
    getUserIp(courseId,3,from);  //统计简章打开次数

    if( isWeiXin() ){
        $('.header').show();
        $('.title').css({"paddingTop":"6.8rem"});
    }
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
            if((courseId == 951||courseId == 1030||courseId == 1031||courseId == 1032||courseId == 1029) && data.data.synopsis!=''){
                courseName = data.data.synopsis;
                $('#title').html(courseName);
            }else{
                // courseName = data.data.title.split("｜")[0];
                courseName = data.data.title;
                $('#title').html(courseName);
            }
            avatar = data.data.avatar;


            $("#enrollSelf span").html(data.data.price +"元<i>/</i>人&nbsp;&nbsp;&nbsp;立即报名").css('background-size', '14%');

            isOver = data.data.isOver;// 判断有没有名额    1”课程已没有名额  “0”有名额

            loading(false);
            $("#enroll1").show();
            // $("#enroll").show();
            // var isOver = request("isOver");// 判断有没有名额    1”课程已没有名额  “0”有名额

            if(isOver == "1" || courseId == '1002'){
                $("#enroll1").remove();
                $("#enroll").show();
                $("#enroll").html("已没有名额").css({
                    'backgroundColor': '#B8B8B8',
                    'lineHeight': '5rem',
                    'padding': '0'
                });
            }else{
                // var url = payPagePath(courseId);
                // 点击报名

                $('#enrollFriend').on('click',function(){
                    buySelf = 0;
                    enroll();
                });
                $("#enrollSelf").on('click',function(){
                    buySelf = 1;
                    enroll();
                });
                function enroll(){
                    getUserIp(courseId,2,from);    //统计点击次数
                    var redirect_uri = 'http://api.chazuomba.com/manage/Web/PaymentPage/courseId/';//支付页面正式（PHP）
                    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri=" + redirect_uri + courseId + encodeURIComponent("?buySelf="+buySelf+"&from="+from)+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";

                    if( !isWeiXin() ){
                        huaPing(false);
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
                        $("#newQrcode").click(function(){
                            $(this).hide();
                            huaPing(true);
                        });
                    } else {
                        window.location.href = url;
                    }
                };
                // $('#enroll').click(function(event){
                //     getUserIp(courseId,2);    //统计点击次数
                //     if( !isWeiXin() ){
                //         huaPing(false);
                //         $('#newQrcode').html('<i class="icon-remove"></i><div class="pointQR">请截取二维码<br/>使用微信扫一扫进行支付</div>').show();
                //         $('#newQrcode').css({'backgroundColor':'#fff'})
                //         var _url = utf16to8(url);
                //         jQuery('#newQrcode').qrcode({
                //             text: _url,              //设置二维码内容
                //             width: 200,             //设置宽度
                //             height: 200,            //设置高度
                //             correctLevel: 0,        //纠错等级,
                //             render: "canvas",       //设置渲染方式
                //             background: "#ffffff",  //背景颜色
                //             foreground: "#000000"   //前景颜色
                //         });
                //         $("#newQrcode").click(function(){
                //             $(this).hide();
                //             huaPing(true);
                //         });
                //     } else {
                //         window.location.href = url;
                //     }
                // });
            }
            if(courseId == '2162'){
                $('#enroll, #enroll1').remove();
            }


            //分享初始化
            var imageUrl = avatar;
            var title = courseName;
            var descText = '插坐学院线下课程';
            var linkUrl = window.location.href;
            var linkUrl = linkUrl;
            courseShare(title, descText, linkUrl, imageUrl);
        }
    });
    loading(true);

    // 获取html页面内容
    $.ajax({
        type:"get",
        url:baseUrl+"findOfflineCourseContent?page=1&courseType=1&newtype=0&courseId="+courseId+'&type='+type,
        data:{},
        async:true,
        dataType:"json",
        success:function(data){
            console.log(data)
            isfull = data.data.isfull;
            console.log("findOfflineCourseContent",data)
            $('#content').css({
                'max-width':'640px',
                'margin':'auto'
            })
            if(courseId=='951'){
                $('#content').html(data.data.content);//大课简章内容
            }else{
                $('#content').html(data.data);
            }

        }
    });
});
