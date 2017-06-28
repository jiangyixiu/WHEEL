/**
 * Created by jiangxiaoyong on 2017/2/6.
 * 线下课程支付成功页面
 */
var courseId = request("courseId");
var unionId = request("unionId");
var orderNo = request("orderCode");
var courseType = request('courseType');

$(function () {


    $.getJSON(baseUrl + "getOrderByOrderNo",{'orderNo':orderNo}, function(data) {
        // $.getJSON("http://192.168.1.29:8080/iserver/app/checkCrowdfunding",{'unionId':'oRXZFwY0U6hhxMZ9OnBq6_GjR-kI','courseId':1734}, function(data) {
        var audit = data.data[0].reviewStatus;
        var isGift = data.data[0].isGift; // 1赠送 0自己
        isGift = isGift && isGift=="1";
        var letter = '';

        if(audit == "0"){    //0审核中；
            if (isGift == "1"){
                letter = '本门课程采取<span style="color: #F7A90C;">审核招生制</span>，支付成功后，工作人员会在1个工作日内与您的朋友联系，评估课程与TA的匹配度，如果课程不适合TA，学费将全额退回。';
            } else if (isGift == "0") {
                letter = '本门课程采取<span style="color: #F7A90C;">审核招生制</span>，支付成功后，工作人员会在1个工作日内与您联系，评估课程与您的匹配度，如果课程不适合您，学费将全额退回。';
            }
        }else if(audit == "1"){  //1审核通过；

            // alert('1审核通过')
            $('.logo').attr('src','images/offline/pic_pay_sucess.png');
            $('.title').attr('src','images/offline/pic_pay_chart_sucess.png');
            if (isGift == "1"){
                letter = '您的朋友已通过审核，感谢您对TA向好之心的支持！<br><span style="color:#F7A90C">开课前一周</span> 将发送短信提醒开课，还请您朋友注意查收。';
            } else if (isGift == "0"){
                letter = '＊ 请在 <span style="color:#F7A90C">开课前一周</span> 注意查收短信，获取开课通知。';
                $('#through').show();
            }
                $('.bodyer .text').css({
                'padding': 0,
                'border': 0,
                'font-family': 'PingFangSC-Medium,"microsoft yahei"'
            });

            $('body').css('background','#F5F5F5');

            $('#receipt').click(function(){
                var url = '../publicPay/invoice.html?orderNo='+ orderNo + '&unionId=' + unionId;
                window.location.href = url;
            });

            $("#notice").click(function(){
                var url = "notice.html?courseId=" + courseId + "&unionId=" + unionId + "&courseType=" + courseType;
                window.location.href = url;
            });
            receiptShow();
        }
        else if(audit == "2"){   //2审核未通过
            // alert('2审核未通过')
            $('.logo').attr('src','images/offline/pic_pay_defeat.png');
            $('.title').attr('src','images/offline/pic_pay_chart_defeat.png')
            if (isGift == "1"){
                letter = '很遗憾，本次课程不符合您朋友的听课需求。<br>感谢您对插坐学院的关注，我们将持续提供更合适的课程。';
            } else if (isGift == "0") {
                letter = '<span style="font-size:1.333rem">亲爱的同学：</span><span style="display: block;height:1.6rem;"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family: PingFangSC-Regular,microsoft yahei">很高兴与您电话沟通，遗憾的是，本次课程不符合您的听课需求。<span style="display: block;height:1.6rem;"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢您对插坐学院的关注，我们将为您持续提供更合适的课程。</span><span style="display: block;height:1.1rem;"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '<img src="images/offline/icon_defeat_go.png?v=1.1" alt="" style="width:1.3rem;"> &nbsp;' +
                    '<a href="http://www.chazuomba.com/files/webApp/offlineCourse.html" style="font-size:1.1rem;">更多课程</a>';
            }
        }

        $('.bodyer .text').html(letter);


        $('body').show();

    });

    //如果金额>=900展示发票按钮
    function receiptShow(){
        $.getJSON(baseUrl + "findWebOfflineCourseInfo", {
            'client_version': '1',
            'device_id': '1',
            'platform': 'web',
            'courseId': courseId
        }, function (data) {
            if (data.data.price >= 900){
                $('#receipt').show();
            } else {
                $('#receipt').hide();
            }
        });
    }

    //微信初始化
    function onBridgeReady(){
        WeixinJSBridge.call('hideOptionMenu');
    }

    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        onBridgeReady();
    }
})