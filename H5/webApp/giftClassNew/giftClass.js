//个人信息
var userInfo = localStorage.getItem('giftClassUserInfo');
userInfo = JSON.parse(userInfo);

$(function(){
	//初始化页面信息
	initPage();
	
	//订单列表展示隐藏
	$('.classctn').on('click', '.ccIcon.ccMore', function(){
		$(this).removeClass('ccMore').addClass('ccUp');
		$('.classList').slideDown();
	});
	$('.classctn').on('click', '.ccIcon.ccUp', function(){
		$(this).removeClass('ccUp').addClass('ccMore');
		$('.classList').slideUp();
	});
	
	//继续选课
//	$('#goOnBuy').click(function(){
//		window.location.href = webAppUrl + 'onlineCourse.html';
//	});
	//索要线下课程
	$('#getGiftClass').click(function(){
		getClass();
	});
});

//初始化页面信息
function initPage(){
	var title = request('title');
	title = decodeURIComponent(title);
	$('.toper').text(title);
	//个人信息
	$('.avatar').attr('src', userInfo.avatar);
	$('.name').text(userInfo.name);
	
	//金额
	var free = request('free');
	var money = request('money');
	$('.money').text(money);
	if(free == '1'){ //有权限
		$('.moreMoney, #getGiftClass').show();
	} else {
//		$('.lessMoney, #goOnBuy').show();
		$('.lessMoney').show();
	}
	
	//订单列表
	var orderList = localStorage.getItem('giftClassOrderList');
	orderList = JSON.parse(orderList);
	var html = '';
	for(var i=0,j=orderList.length;i<j;i++){
		html += '<li class="classItem">' +
					'<div class="className">' + orderList[i].courseName + '</div>' +
					'<div class="classPrice">&yen;' + orderList[i].price + '</div>' +
				'</li>';
	}
	$('.classList').append(html);
}

//索要线下课
function getClass(){
	$.ajax({
		type: "get",
		url: baseUrl + '/freeAccess',
		data: userInfo,
		success: function(data){
			if(data.status == '200' || data.status == '600'){ //报名成功 || 已报名
				var orderCode = data.msg;
				var url = 'audit.html?' + encodeURI("unionId="+ userInfo.unionid + "&orderCode=" + orderCode + "&openid=" + userInfo.openid + "&courseId=" + userInfo.courseId + "&type=0" + "&courseType=0");
				window.location.href = url;
			} else {
				$('.moreMoney, #getGiftClass').hide();
//				$('.lessMoney, #goOnBuy').show();
				$('.lessMoney').show();
			}
		}
	});
}
