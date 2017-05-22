$(function() {
	//获取并处理页面参数，所有字段存在params里边，通过授权回调页面返回
	var params = request('params');
	if(!params) {
		window.location.href = accessPage();
	}
	params = decodeURIComponent(params);
	params = JSON.parse(params);
	
	var avatar = params.avatar;
	var unionid = params.unionId;
	var openid = params.openid;
	var nickName = params.nickname;
	
	$('#getGift').click(function(){
    		var params = {
	    		nickName: nickName,
	    		openid: openid,
	    		unionid: unionid,
	    		avatar: avatar
	    };
	    getGift(params);
    });
	
	// 分享
	var title = '插坐学院 | 新同学超级礼包';
    var descText = '53节精品视频课，免费领取。';
    var linkUrl = accessPage();
    var imageUrl = 'http://www.chazuomba.com/files/activity/newStudentGift/img/7.png?v=1';
	courseShare(title, descText, linkUrl, imageUrl);
	// 下载
	new Mlink({
		mlink: "Aamv",
		button: $("a#IOS")[0],
		params: {
			key: 'hdk_main'
		}
	});
});

// 领取新生礼包
function getGift(params){
	var mobile = $.trim($("#mobile").val());
	var regMobile = /^1\d{10}$/;
	if(!mobile) {
		showTips('请输入手机号码', function(){
			$('#mobile').focus();
		});
		return;
	} else if(!regMobile.test(mobile)) {
		showTips('手机号码格式有误', function(){
			$('#mobile').focus();
		});
		return;
	}
	params.mobile = mobile;
	getAjaxData('weixinGift', params, function(res){
		if(res.status == '200') {
			$('#getGiftPage').hide();
			$('#getSuccessPage').show();
			_IsIOS(); // 展示下载按钮
		} else {
			showTips(res.msg);
		}
	});
}
//若未获取到微信信息，则重新拉取授权
function accessPage() {
	var redirect = webAppUrl + 'activity/newStudentGift/index.html';
	var params = {
		redirect: redirect
	};
	params = JSON.stringify(params);
	params = encodeURIComponent(params);
	return 'http://api.chazuomba.com/manage/Web/authorize.html?params=' + params;
}
function _IsIOS() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iPhone\sOS/i) == "iphone os"||navigator.userAgent.indexOf("iPad") != -1) {
        $("#IOS").show();
        $("#Android").hide();
    } else if (ua.match(/Android/i) == "android"){
        $("#IOS").hide();
        $("#Android").show();
    }
}