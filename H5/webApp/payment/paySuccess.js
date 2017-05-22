/**
 * Created by Administrator on 2016/10/17.
 */
var unionId = request('unionId');
var orderCode = request('orderCode');
var courseId = request('courseId');
var courseType = request('courseType'); //判断（1线上，0线下）
var isDake = false;
var sharePage = 'http://api.chazuomba.com/manage/Web/shareFriend.html?orderCode='+orderCode;
$(function (){
	var params = {
		'unionId': unionId,
        'orderNo': orderCode
	}
	if(courseId == '951' || courseId == '1029' || courseId == '1030' || courseId == '1031' || courseId == '1032'){
		params.type = '1';
		isDake = true;
	}
    $.getJSON(baseUrl + 'findInvoiceDetailByUnionId',params,function (data){
        console.log(data);

        if(data.status == '200' && (data.msg == '无信息' || data.msg == '未填写')){// 200未填写发票
            var company = data.data.company;
            var email = data.data.email;
            var invoiceAddress = data.data.invoiceAddress;
            var invoiceTitle = data.data.invoiceTitle;
            var invoiceType = data.data.invoiceType;
            var mobile = data.data.mobile;
            var name = data.data.name;
            var sex = data.data.sex;
            var weixin = data.data.weixin;
            var ifPurchaser = data.data.ifPurchaser;//是否本人打开
            var isGift = data.data.isGift;//是否赠送
            isGift = isGift == '1' ? '1' : '0';
            receiptShow();
            // if(ifPurchaser == "1" && isGift == "0"){//自己为自己购买
            //     $('#notice, #receipt').show();
            // } else if(ifPurchaser == "1" && isGift == "1") {//自己为别人购买
             //    $('#receipt').hide();
            // } else {
            // 	$("#notice").show();
            // }

        } else if(data.status == '200' && data.msg == '已填写'){
            $('#receipt').hide();
        } else if(data.status == '777'){
            receiptShow();
        } else if(data.status == '500'){
            receiptShow();
        }
    });

    $("#notice").show();

    $('#receipt').click(function(){
        var url = '../publicPay/invoice.html?orderNo='+ orderCode + '&unionId=' + unionId;
        window.location.href = url;
    });

    $("#notice").click(function(){
        var url = "notice.html?courseId=" + courseId + "&unionId=" + unionId;
        window.location.href = url;
    });
    $("#shareFriend").click(function(){
    	window.location.href = accessPage();
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

    if(courseType == '1'){
        // 线上展示二维码联系工作人员
        $.getJSON(baseUrl + "findQRCode", {
            'client_version': '1',
            'device_id': '1',
            'platform': 'web',
            'id': courseId
        }, function (data) {
            var QRsrc = data.data;
            if (QRsrc){
                $("#QR").attr("src",QRsrc);
            } else {
                $("#QRbox").hide();
            }
        });
    }else{
        $("#QRbox").hide();
    }

});

function accessPage(){
	return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri='+ encodeURIComponent(sharePage) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
}