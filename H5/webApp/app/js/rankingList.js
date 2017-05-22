var protocol = document.location.protocol;
var baseUrl  = protocol + '//www.chazuomba.com/iserver/app/';//JAVA统一接口
var phpBaseUrl   = protocol + '//api.chazuomba.com';//PHP统一接口
var phpBaseUrlNew   = protocol + '//sslapi.chazuomba.com';//PHP统一接口（新版）

var type = request("type"); //排行类型：week周排行，total总排行
var avatar = decodeURIComponent(request("avatar"));//头像
var nickName = decodeURIComponent(request("niceName"));//名字，
var time = formateNumber(request("time"));//学习时间
var ranking = formateNumber(request("ranking"));//排名，0未上榜
function formateNumber(num){
	num = Number(num);
	if(isNaN(num)){
		num = 0;
	}
	return num;
}
$(function() {
	//分享
	var title = '好多课：学霸排行榜';
	var descText = '';
	if(type == 'week'){//周排行
		descText += '我本周学习了' + time + '分钟，';
		if(ranking == 0){
			descText += "暂未上榜，继续努力。";
		} else {
			descText += '周榜排行第' + ranking + '名。'
		}
	} else if(type == 'total'){//总排行
		descText += '我总共学习了' + time + '分钟，';
		if(ranking == 0){
			descText += "暂未上榜，继续努力。";
		} else {
			descText += '总榜排行第' + ranking + '名。'
		}
	}
	var linkUrl = 'http://www.chazuomba.com/files/webApp/app/html/rankingList.html?type=' + type + '&avatar=' + avatar + '&niceName=' + nickName + '&time=' + time + '&ranking=' + ranking;
	courseShare(title, descText, linkUrl, avatar);
	//下载链接
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/iPhone\sOS/i) == "iphone os" || navigator.userAgent.indexOf("iPad") != -1) {
		$("#IOS").show();
		$("#Android").hide();
	} else if(ua.match(/Android/i) == "android") {
		$("#IOS").hide();
		$("#Android").show();
	}
	initPage();
});
//页面信息渲染
function initPage() {
	$('.userAvatar').html('<img src="' + avatar + '" />');
    $('.userName').text(decodeURI(decodeURI(nickName))); //名字
	if(type == 'week'){//周排行
		$(".totalTime>.cmiTitle").text('周时长');
		$(".totalRanking>.cmiTitle").text('周排行');
	} else if(type == 'total'){//总排行
		$(".totalTime>.cmiTitle").text('总时长');
		$(".totalRanking>.cmiTitle").text('总排行');
	}
	//学习时长
	$(".totalTime>.cmiCount").html(time + '<span>分</span>');
	//名次
	if(ranking == 0) { //未上榜
		$(".totalRanking>.cmiCount").addClass('noRanking').text('未上榜');
		$(".item>.txt").each(function($index){
			$(this).text($index + 1);
		});
	} else {
		$(".totalRanking>.cmiCount").html(ranking + '<span>名</span>');
		if(ranking < 5){
			$(".item>.txt").each(function($index){
				$(this).text($index + 1);
			});
			$('.item' + ranking).addClass('cur').siblings().removeClass('cur');
		} else {
			$(".item>.txt").each(function($index){
				$(this).text(ranking + $index - 3);
			});
			$('.item4').addClass('cur').siblings().removeClass('cur');
		}
//		$('.item.cur>.rect:before').css({
//			'background': 'url(' + avatar + ') no-repeat center',
//			'background-size': '100% 100%'
//		});
		var curCss = '<style>.item.cur>.rect:before{background: url(' + avatar + ') no-repeat center;background-size: 100% 100%;}</style>';
		$("head").append(curCss);
	}
	//排行榜动画
	rankingAnimate();
}
//排行榜动画
function rankingAnimate() {
	$('.item1>.rect').height('9.583333rem');
	$('.item2>.rect').height('7.5rem');
	$('.item3>.rect').height('6.25rem');
	$('.item4>.rect').height('5rem');
	$('.item5>.rect').height('3.75rem');
	$('.item6>.rect').height('2.5rem');
	$('.item7>.rect').height('1.25rem');
}