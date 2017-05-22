$(function() {
	var courseId = request('id');

	var isWX = isWeiXin();
//	if(isWX) {
//		$('.header').show();
//		$('.title').css({
//			"paddingTop": "6.8rem"
//		});
//	}
	$('#loading').show();
	//获取简章详情
	getContent(courseId, isWX);
});
//获取简章详情
function getContent(courseId, isWX) {
	var params = {
		page: '1',
		type: '1',
		courseType: '1',
		newtype: '0',
		courseId: courseId
	}
	getAjaxData('findOfflineCourseContent', params, function(data) {
        _czc.push(["_trackEvent", "1", "分享", data.data.courseName, courseId]);
		var ifVideo = data.data.ifVideo;
		if(ifVideo == '0' || ifVideo == '1') {
			ifVideo = '0';
		} else if(ifVideo == '2' || ifVideo == '3') {
			ifVideo = '1';
		}
		if(data.data.newType == '2'){
			new Mlink({
				mlink: "Aamv",
				button: $("a#IOS")[0],
				params: {
					key: 'hdk_main'
				}
			});
		} else {
			new Mlink({
				mlink: "Aamw",
				button: $("a#IOS")[0],
				params: {
					key: 'hdk_special'
				},
				cparams: {
					ifVideo: parseInt(ifVideo),
					catalogId: data.data.catalogId,
					flag: data.data.flag
				}
			});
		}
		$('#content').css({
			'max-width': '640px',
			'margin': 'auto'
		})
		$('#content').html(data.data.content);
		if (data.data.payStatus=='0'){//系列课
            $('#enroll span').text('申请企业课程');
            //type 1系列可2公开课
            var url = 'http://www.chazuomba.com/files/webApp/app/applyCpClass.html?4=4&type=1&id='+data.data.catalogId;
            //微信分享
            wxSharePage(courseId, isWX, url);
        } else {
            $("#enroll span").html(data.data.price+"元<i>/</i>年&nbsp;&nbsp;&nbsp;立即报名").css('background-size', '14%');
            //微信分享
            wxSharePage(courseId, isWX);
        }
		$('#loading').hide();
		//微信内添加图片点击查看大图功能
		if(!isWeiXin()) return;
		var lists = $("#content section>img");
		var imgs = [];
		for(var i=0,len=lists.length; i < len; i++){
			imgs.push($(lists[i]).attr("src"));
		}
		$("#content").on('click', 'section>img', function(){
			imagePreview($(this).attr("src"), imgs);
		});
	});
}
//微信分享
function wxSharePage(courseId, isWX, url) {
	var params = {
		'client_version': '1',
		'device_id': '1',
		'platform': 'web',
		'courseId': courseId
	};
	getAjaxData('findWebOfflineCourseInfo', params, function(data) {
		var courseName;
		if(data.data.newType == '2'){
			courseName = data.data.title;
		} else {
			courseName = data.data.synopsis.split("｜")[0];
		}
		var avatar = data.data.avatar;
		$('#title').html(courseName);
		var descText = '插坐学院线上课程';
//		var descText = '你快来看看吧';
		var linkUrl = webAppUrl + 'app/shareCourseContent.html?id=' + courseId;
//		//报名
//		enroll(courseId, courseName, isWX);
		if(isWX){
			courseShare("推荐一门好课：" + courseName, descText, linkUrl, avatar);
		}

		if (url){//申请企业课程
			$("#enroll").show();
            $('#enroll').click(function(e) {
                window.location.href = url;
			});
			return;
		};
		
		if(data.data.price == 0){
			$("#enroll").hide();
		} else if(data.data.isOver == '1'){
		    $("#enroll").html("已没有名额").css({
                'backgroundColor': '#B8B8B8',
                'lineHeight': '5rem',
                'padding': '0'
		    }).show();

		    return;
		} else {
			$("#enroll").show();
			//报名
			enroll(courseId, isWX);
		}
	});
}
//生成二维码报名
//function enroll(courseId, courseName, isWX) {
function enroll(courseId, isWX) {
	getAjaxData('getOnlineCourseCode', {
		id: courseId
	}, function(data) {
		//var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri=http://api.chazuomba.com/manage/Web/PaymentPage/courseId/" + courseId + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
		var url = data.msg;
		// 点击报名
		$('#enroll').click(function(e) {
			if(isWX) {
				window.location.href = url;
			} else {
//				localStorage.setItem('_courseName', courseName);
//				localStorage.setItem('_pastid', courseId);
				// 阻止滑屏
				huaPing(false);
				$('#newQrcode').html('<i class="icon-remove"></i><div class="pointQR">请截取二维码<br/>使用微信扫一扫进行支付</div>').show();
				//生成二维码
				jQuery('#newQrcode').qrcode({
					text: utf16to8(url), //设置二维码内容
					width: 200, //设置宽度
					height: 200, //设置高度
					correctLevel: 0 //纠错等级
				});
				//隐藏二维码
				$('#newQrcode').click(function() {
					$(this).hide();
					huaPing(true);
				});
			}
		});
	});
}
// 是否在微信里
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
//utf16转utf8，解决二维码中文乱码
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for(i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if(c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}
//调用微信图片展示
function imagePreview(curImg, imgList) {
	if (!imgList) {
		imgList = [];
		imgList.push(curImg);
	}
	WeixinJSBridge.invoke("imagePreview", {
		"urls": imgList,
		"current": curImg
	});
}