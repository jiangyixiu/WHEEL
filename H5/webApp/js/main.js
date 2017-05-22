/**
 * Created by Administrator on 2016/8/21.
 */
//清除alert和console.log
window.alert = function(){};
window.console.log = function(){};

////#############  生产  ################
var redirect_uri = 'http://api.chazuomba.com/manage/Web/PaymentPage/courseId/';//支付页面正式（PHP）
var paySuccess   = "http://www.chazuomba.com/files/webApp/payment/paySuccess.html";//支付成功回调页面
var baseUrl      = 'https://www.chazuomba.com/iserver/app/';//JAVA统一接口
var webAppUrl    = 'http://www.chazuomba.com/files/webApp/';//官网一级目录
var webAppUrlPhp = 'http://api.chazuomba.com/manage/Web/';//php页面目录
var fileBaseUrl  = 'http://www.chazuomba.com/files';//文件目录
var phpBaseUrl   = 'https://api.chazuomba.com';//PHP统一接口
var phpBaseUrlNew   = 'https://sslapi.chazuomba.com';//PHP统一接口(新版)
var appid        = 'wxa3069b403f0a23af';//appid
////大课选区授权页面（正式）
var dakeUrl0 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri=http://api.chazuomba.com/manage/Web/Constituency.html?buySelf=0&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
var dakeUrl1 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri=http://api.chazuomba.com/manage/Web/Constituency.html?buySelf=1&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
//已购课程页面
var orderListUrl = webAppUrlPhp + 'orderList.html';
//////#############  测试  ################
//var redirect_uri = 'http://api.chazuomba.com/ManageTest/Web/PaymentPage/courseId/';//支付页面测试（PHP）
//var paySuccess   = "http://www.chazuomba.com/files/hehe/webApp/payment/paySuccess.html";//支付成功回调页面
//var baseUrl    = 'http://192.168.1.31:8080/iserver/app/';(东阳本机)
//var webAppUrl    = 'http://www.chazuomba.com/files/hehe/webApp/';//官网一级目录
//var webAppUrlPhp = 'http://api.chazuomba.com/manageTest/Web/';//php页面目录
//var baseUrl      = 'http://test.chazuomba.com:8080/iserver/app/';//JAVA统一接口
//var phpBaseUrl   = 'http://testapi.chazuomba.com';//PHP统一接口
//var phpBaseUrlNew   = 'http://testapi.chazuomba.com';//PHP统一接口(新版)
//var appid        = 'wx1541ccc024a8e057';//appid
///////大课选区授权页面（测试）
//var dakeUrl0 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri=http://api.chazuomba.com/ManageTest/Web/Constituency.html?buySelf=0&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
//var dakeUrl1 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri=http://api.chazuomba.com/ManageTest/Web/Constituency.html?buySelf=1&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
////已购课程页面
//var orderListUrl = 'http://api.chazuomba.com/manageTest/Web/orderList.html';


//返回支付页面地址
function payPagePath(courseId){
	return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri=' + redirect_uri + courseId + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
}

$(function(){
    (function(){    // 尺寸适配
        function sy(){
            var Html = document.getElementsByTagName('html')[0];
            var w = document.documentElement.clientWidth;
            var scale = w / 375;
            if (scale >= 2) {scale = 2}
            Html.style.fontSize = 12*scale + 'px';
        }sy();
        window.onresize = function(){sy()};
    })();

   // 点击显示隐藏导航
    $('#reorder').click(function(){
        var navHeight = $(window).height();
        $('#nav').height(navHeight);
        $(this).next('ul').show();
        huaPing(false);
        $('#remove').click(function(){
            var navHeight = $(window).height();
            $('#nav').height(navHeight);
            $('#nav').hide();
            huaPing(true);
        })
    });

    // 关注微信号
	$('#followShow').click(function() {
		$('#followBg').show();
   		// 关闭滑屏事件
   		huaPing(false);
   	});
	$('#followBg').click(function() {
		$('#followBg').hide();
   		// 打开滑屏事件
   		huaPing(true);
	});

});

// 解决js url乱码问题
function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {};
    for (var i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}

//记录微信返回课程页面位置
function wxClassPageInit(){
	var ua = navigator.userAgent.toLowerCase();
	var isWeixin = ua.indexOf('micromessenger') != -1;
	var obj = {};
	if(isWeixin){
		var pageOffsetTop = localStorage.getItem("pageOffsetTop");
		var pageCurCount = localStorage.getItem("pageCurCount");
		localStorage.removeItem("pageOffsetTop");
		localStorage.removeItem("pageCurCount");
		if(pageOffsetTop && pageCurCount){
			obj.pageOffsetTop = pageOffsetTop;
			obj.pageCurCount = pageCurCount;
			obj.pageScroll = true;
		}
	}
	return obj;
}

// 滑屏开启和关闭
function huaPing(judge){
    if(judge){
        $('body').removeAttr('onmousewheel').unbind('touchmove');
    } else{
        $('body').attr('onmousewheel',"return false;")
            .on('touchmove',function(event) {
                event.preventDefault();
            });
    }
}

//上滑加载下一页
$.fn.loadNextPage = function() {
	var html = 	'<div id="moreText">上拉加载更多</div>' +
				'<div class="loadding"><div class="spinner">';
	for(var i = 1; i < 13; i++) {
		html += '<div class="bar' + i + '"></div>';
	}
	html += 	'</div><p>奋力加载中</p></div>';
	$(this).append(html);
}
/**
 * @name jQuery ajax请求封装（请求JAVA接口）
 * @param {String} funcName 请求接口名称
 * @param {Object} data 接口参数
 * @param {Function} cb 请求成功回调
 */
function getAjaxData(funcName, data, cb){
	$.ajax({
		type: "GET",
		url: baseUrl + funcName,
		data: data,
		async:true,
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
		success: function(data){
			cb && cb(data);
		}
	});
}

//请求PHP接口
function getAjaxDataByPhp(funcName, data, cb){
	$.ajax({
		type: "GET",
		url: phpBaseUrl + funcName,
		data: data,
		async:true,
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
		success: function(data){
			cb && cb(data);
		}
	});
}
//请求PHP接口(新版)
function getAjaxDataByPhpNew(funcName, data, cb){
	$.ajax({
		type: "GET",
		url: phpBaseUrlNew + funcName,
		data: data,
		async:true,
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
		success: function(data){
			cb && cb(data);
		}
	});
}
//请求示例
//getAjaxData('getUserInfo',{userId: '123'}, function(data){
//	console.log('name:' + data.name);
//});

//loading
function loading(judge){
    if(judge){
        $('body').append('<img class="loading" src="http://www.chazuomba.com/files/webApp/images/loading.gif" style="width: 10rem; position: fixed; top:0; right: 0; bottom: 0; left: 0; margin: auto"/>');
    }else{
        $('.loading').remove();
    }
}

//获取客户端IP地址  //统计点击次数
function UserIp(){
    var oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.async = true;
        oScript.src = "https://pv.sohu.com/cityjson?ie=utf-8";
    $("head").append(oScript);
    return;
}
function getUserIp(courseId,type,from){
    var city = returnCitySN["cname"];
    var ip = returnCitySN["cip"];
    $.ajax({
        type:"get",
        url: baseUrl+"saveClickDetail",
        data:{
            "courseId": courseId,
            "city": city,
            "ip": ip,
            "type": type,
            "from": from
        },
        async:true,
        dataType:"json",
        success:function(data) { }
    })
}

//scroll超出多少显示隐藏
function scrolls(obj,topMax){
    window.onscroll = touch;
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', touch, false);
    document.addEventListener('touchend', touch, false);
    function touch() {
        var top = $(this).scrollTop();
        if (top >= topMax){
            obj.show();
        } else {
            obj.hide();
        }
    }
}

// 是否在微信里
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

// 生成二维码函数
function utf16to8(str) {   //二维码包含的内容，默认只支持英文内容,中文会乱码，通过utf16to8转码可支持中文
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
};

// 提示信息
function showTip(title){
    if( $('#dialog') ){$('#dialog').remove();}
    var body = "";
    body += "<div class='weui_dialog_alert' id='dialog' style='display: none;' >";
    body += "<div class='weui_mask'></div>";
    body += "<div class='weui_dialog'>";
    body += "<div class='weui_dialog_hd'><strong class='weui_dialog_title'>温馨提示</strong></div>";
    body += "<div class='weui_dialog_bd'>" + title + "</div>";
    body += "<div class='weui_dialog_ft'>";
    body += " <a href='javascript:;' class='weui_btn_dialog primary' style='color: #3573B3'>确定</a>";
    body += "</div>";
    body += "</div>";
    body += "</div>";
    $("body").append(body);
    var $dialog = $('#dialog');
    $dialog.show();
    $dialog.find('.weui_btn_dialog').one('click', function () {
        $dialog.hide();
    });
};