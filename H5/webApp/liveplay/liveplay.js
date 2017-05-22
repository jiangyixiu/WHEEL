localStorage.removeItem('msgtop'); //移除记录聊天记录位置


var socket = null;
var videoPlayer = null; //播放器
var ip = ''; // 本机ip地址

//获取并处理页面参数，所有字段存在params里边，通过授权回调页面返回
var params = request('params') || '{}';
params = decodeURIComponent(params);
params = JSON.parse(params);

var courseId = params.courseId;
var unionId = params.unionId;
var openid = params.openid;

var chatHost = 'http://chat.polyv.net:8000', //socket连接地址
	chatHost2 = 'http://api.chat.polyv.net:80', //获取聊天内容地址
	chatHost3 = 'http://live.polyv.cn', //获取点赞数
	chatToken = '', //登录token
	roomId, //房间号，频道号
	employeeId = params.employeeId || 0, //好多课用户id，没有的话传0
	userId = params.unionId || parseInt(Math.random() * 10000000), //自定义用户id,或者填写自己的userid
	nickname = params.nickname || '微信用户', //自定义用户名
	avatar = params.avatar || 'http://live.videocc.net/assets/wimages/pc_images/logo.png', //用户头像
	alink = 'http://live.videocc.net';

//var params = {
//	redirect: 'http://www.chazuomba.com/files/webApp/liveplay/index.html',
//	courseId: '1743'
//};
//params = JSON.stringify(params);
//params = encodeURIComponent(params);
//window.location.href = 'http://api.chazuomba.com/oauth/authorize.html?params=' + params;

$(function() {
//	var ua = navigator.userAgent.toLowerCase();
//  var isWeixin = ua.indexOf('micromessenger') != -1;
//  var isAndroid = ua.indexOf('android') != -1;
//  var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
//  if (!isWeixin) {
//      document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
//      document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请在微信客户端打开链接</h4></div></div>';
//  	return;
//  }
	//获取直播课程详细信息
	getCourseMsg(courseId, unionId);
	
	//定时同步点赞数信息(随机3~8分钟同步一次)，离开页面时再同步一次
//	var likeRandom = (Math.random() * 5 + 3) * 60;
//	likeRandom = Math.round(likeRandom) * 1000;
//	setInterval(function(){
//		saveLikeCount();
//	}, likeRandom);
//	window.onunload = window.onbeforeunload = function(){
//		saveLikeCount();
//	}
	//点赞
	$('.likeFuc, .liketime').click(function(){
		//控制赞在1s内只能点一次
		if($('.likeFuc').attr('enable') == '0'){
			return;
		}
		$('.likeFuc').attr('enable', '0');
		setTimeout(function(){
			$('.likeFuc').attr('enable', '1');
		}, 1000);
		
		likeLive();
	});
	
	//导航切换
	$('.tab_nav').on('click', 'li', function(){
		var _s = $(this);
		var _index = $(this).data('index');
		_s.addClass('active').siblings().removeClass('active');
		$('.tab_ctnr').css({
			transform: 'translate3d(' + -(_index * 50) + '%, 0, 0)'
		});
	});
	//关闭管理员通知
	$('.adminCtn').on('click', '.adminTips>div', function(){
		$('.adminTips').fadeOut();
	});
	//分享
//	$('.shareFuc').click(function(){
//		$('.shareTips').show();
//	});
//	$('.shareTips').click(function(){
//		$(this).hide();
//	});
	//输入框事件
	$('.msgInput').on('focus', function(){
		$('.sendFuc').css('margin', '0 1.25rem');
		$('.shareFuc, .likeFuc, .tipFuc').hide();
	}).on('blur', function(){
		//解决点击发送按钮输入框失去焦点时，先执行失去焦点事件，不执行发送事件
		setTimeout(function(){
			$('.sendFuc').css('margin', '0 0.75rem 0 0');
			$('.shareFuc, .likeFuc, .tipFuc').show();
		}, 10);
	});
});

//初始化页面各模块高度
function autoHeight(opt){
	//计算页面高度
	var hh = $('.header').height(); //头部高度
	var wh = $(window).height(); //窗口高度
	var playerH = $('#player').height(); //播放器高度
	var navH = $('.tab_nav').height(); //导航高度
	var _ctnH = (wh - playerH - navH) + 'px';
	if(opt && opt.header){ //存在头部
		$('.header').show();
		_ctnH = (wh - playerH - navH - hh) + 'px';
	}
	if(opt && opt.chat){ //有聊天权限
		$('.sendBox').removeClass('uhide');
		$('.MsgBox').css('margin-bottom', '5rem');
	}
	$('.tab_ctnr').height(_ctnH);
}

//获取直播课程详细信息
function getCourseMsg(courseId, unionId){
	getAjaxData('getLivingCourseDetail', {
		courseId: courseId,
		unionId: unionId
	}, function(data){
		if(data.status == 200){//查询成功
			initPage(data.data);
		}
	});
}
//初始化页面信息
function initPage(data){
	roomId = data.vid;
	
	//获取在线人数
	getOnlineUserList();
	
	//获取50条过往的聊天内容
	getHistoryContent(0, 49);
	
	//获取登录token，登录聊天室
	getToken();
	
	//聊天室公告
	if(data.liveNotice) {
		$('.noticeMsg').text(data.liveNotice).show();
	}
	//点赞数
	var liketimes = data.praiseNumber;
	$('.liketime').text(formateLikesNum(liketimes)).attr('num', liketimes);
	
	//去购买
	$('.goSign').click(function(){
		var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri=' + redirect_uri + courseId + encodeURIComponent("?from=")+ '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
//		var url = '../onlineCourseContent.html?id=' + courseId;
		window.location.href = url;
	});
	
	//顶部课程购买状态及直播状态判断
	$('#tab_msg>div').html(data.courseContent); //课程信息
	
//	setTimeout(function(){
//		new Swiper('.swiper-container', {
//			direction: 'vertical',
//			slidesPerView: 'auto',
//	        mousewheelControl: true,
//	        freeMode: true,
//	        freeModeMomentumRatio: 0.17,
//	        resistanceRatio: 0 //禁止反弹
//		});
//	}, 100);
	var ifBuy = data.ifBuy; //是否购买过该课程：0未购买，1已购买
	var beginTime = data.beginTime; //直播开始时间
	var livingStatus = data.livingStatus; //直播状态：直播中、已结束（包含未开始和已结束）
	var now = new Date();
	
	beginTime = beginTime.substring(0, beginTime.length - 2);
	
	var time = new Date(Date.parse(beginTime.replace(/-/g,"/")));
	var stmp = time.getTime() / 1000;
	var nowtmp = now.getTime() / 1000;
	var tmp = stmp - nowtmp;//直播开始时间距现在的时间差
	
	var uid = data.uid; //管理员uid
	var vid = data.vid; //课程号
	if(ifBuy == '0'){ //未报名默认显示课程信息
		$('.tab_nav>li').eq(1).addClass('active').siblings().removeClass('active');
		$('.tab_ctnr').css({
			transform: 'translate3d(-50%, 0, 0)'
		});
	}
	if(livingStatus == '直播中')  { //直播中
		$('.countMsg').fadeIn(); //直播中展示在线人数个点赞数
		//初始化页面各模块高度
		var opts = {
			header: false,
			chat: true
		}
		if(ifBuy == '0'){ //未报名
			opts.chat = false;
		}
		autoHeight(opts);
		
		//是否已报名
		if(ifBuy == '0'){ //未报名
			$('.noAccess').show();
			$('.living').show();
		} else {
			//播放器
			videoPlayer = polyvObject('#player').livePlayer({
				'width': '100%',
				'height': '100%',
				'uid': uid,
				'vid': vid,//频道号
				'is_auto_replay': true,
				'hasControl': true
			});
			setTimeout(function(){
				$('.countMsg').fadeOut(400);
			}, 5000);
			$('#player').click(function(){
				if($('.countMsg').is(':visible')){
					$('.countMsg').fadeOut(400);
				} else {
					$('.countMsg').fadeIn(400);
					setTimeout(function(){
						$('.countMsg').fadeOut(400);
					}, 5000);
				}
			});
		}
		//20s刷新直播状态
		var checkSts = setInterval(function(){
			//判断直播状态
			$.get('http://api.live.polyv.net/live_status/query?stream=' +　data.stream, function(sts){
				sts = $.trim(sts);
				if(sts == 'end'){
					$('.countMsg').fadeIn();
					livingEnd();
					clearInterval(checkSts);
				}
			});
		}, 20000);
	} else if(tmp > 0){ //直播尚未开始
		//初始化页面各模块高度
		var opts = {
			header: true,
			chat: true
		}
		$('.liveplayStatus').show();
		//是否已报名
		if(ifBuy == '0'){ //未报名
			$('.noAccess').show();
			opts.chat = false;
		} else {
			$('#player').css({
				'background': 'url(' + data.cover + ') no-repeat center center',
				'background-size': '100% 100%'
			});
		}
		//初始化页面各模块高度
		autoHeight(opts);
		
		var tmpl;//倒计时显示时间格式
		if(tmp > 3 * 86400){ //三天以上
			var formateNum = function(num){
				if(num < 10){
					num = '0' + num;
				}
				return num;
			};
			var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
			var ft = (time.getMonth() + 1) + '月' + time.getDate() + '日' + formateNum(time.getHours()) + ':' + formateNum(time.getMinutes()) + ' ' + weeks[time.getDay()];
			$('.liveplay>span').text(ft);
			$('.liveplay').show();
			return;
		} else if(tmp > 86400){ //1-3天
			tmpl = '%D天%H小时%M分';
		} else if(tmp > 3600){ //一小时以上
			tmpl = '%H小时%M分';
		} else if(tmp > 60){ //一分钟以上
			tmpl = '%M分';
		} else { //不到一分钟
			tmpl = '%S秒';
		}
		$('.countdown>span').countdown(time, function(event) {
			$(this).text(event.strftime(tmpl));
		});
		$('.countdown').show();
	} else if(livingStatus == '已结束') { //直播已结束
		//初始化页面各模块高度
		var opts = {
			header: true,
			chat: true
		}
		if(ifBuy == '0'){ //未报名
			opts.chat = false;
		}
		autoHeight(opts);
		
		livingEnd();
	}
	
	//微信分享
	var imageUrl = data.avatar || 'http://www.chazuomba.com/files/webApp/images/logo-01.png';
    var title = data.courseName;
    var descText = data.synopsis;
    var params = {
		redirect: webAppUrl + 'liveplay/index.html',
		courseId: courseId
	};
	params = JSON.stringify(params);
	params = encodeURIComponent(params);
	var linkUrl = 'http://api.chazuomba.com/oauth/authorize.html?params=' + params;
    courseShare(title, descText, linkUrl, imageUrl);
}
//直播结束处理
function livingEnd(){
	$('.countMsg').fadeOut();
	//隐藏播放器
	if(videoPlayer){
		videoPlayer.width = 0;
		videoPlayer.heig = 0;
		$(".plwrap").remove();
	}
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/iPhone\sOS/i) == "iphone os" || navigator.userAgent.indexOf("iPad") != -1) {
		$(".liveEnd, #IOS").show();
		$("#Android").hide();
		new Mlink({
			mlink: "Aamv",
			button: $("a#IOS")[0],
			params: {
				key: 'hdk_main'
			}
		});
	} else if(ua.match(/Android/i) == "android") {
		$("#Android, .liveEnd").show();
		$("#IOS").hide();
	}
}
//获取登录token
function getToken() {
	getAjaxData('getWatchtoken', {}, function(data){
		chatToken = data.msg;
		connectRoom();
	});
}
//获取过往的聊天内容
function getHistoryContent(start, end) {
	var startIndex = start || 0,
		endIndex = end || startIndex + 9;
	var url = chatHost2 + '/front/history';
	$.ajax({
		url: url,
		dataType: 'jsonp',
		data: {
			roomId: roomId,
			start: startIndex, //开始位置
			end: endIndex //结束位置
		},
		success: function(data) {
			addChatList(data);
		}
	});
}
////展示历史聊天信息
function addChatList(data) {
	data = data.reverse();
	var html = '';
	for(var i = 0, l = data.length; i < l; i++) {
		var content = data[i].content;
		var nick = data[i].user.nick;
		var isAdminTip = false;
		if(data[i].user.userType == 'manager') { //管理员信息
			isAdminTip = true;
		}
		var reg = /^(CZREWARD).*(CZREWARD)$/;
		if(reg.test(content)) { //打赏消息
			content = content.replace(/CZREWARD/g, '');
			html += '<div class="tipMsg"><div>' +
						'<span>' + nick + '</span>打赏了<span>' + content + '</span>元' +
					'</div></div>';
		} else if(isAdminTip){ //管理员消息
			html += '<div class="txtMsg dbox isAdminTip">' +
						'<div>' + nick + '：</div>' +
						'<div class="dbflex-1">' + content + '</div>' +
					'</div>';
		} else { //普通文本消息
			html += '<div class="txtMsg dbox">' +
						'<div class="dbox"><div class="dbflex-1">' + nick + '</div><div>：</div></div>' +
						'<div class="dbflex-1">' + content + '</div>' +
					'</div>';
		}
	}
	$('.MsgBox').prepend(html);
	showLatestMsg(); //滚动到消息底部
}
//实时聊天信息展示
function addNowChat(data, self){
	var html = '', nick;
	var isAdminTip = false;
	if(self){ //自己发送的消息
		nick = nickname;
	} else {
		nick = data.user.nick;
		if(data.user.userType == 'manager') { //管理员信息
			isAdminTip = true;
			showAdminTip(data.values[0]);
		}
	}
//	for(var i = 0, l = data.values.length; i < l; i++) {
//		html += '<div class="txtMsg dbox">' +
//			'<div>' + nick + '：</div>' +
//			'<div class="dbflex-1">' + data.values[i] + '</div>' +
//			'</div>';
//	}
	var content = data.values[0];
	var reg = /^(CZREWARD).*(CZREWARD)$/;
	if(reg.test(content)) { //打赏消息
		content = content.replace(/CZREWARD/g, '');
		html = 	'<div class="tipMsg"><div>' +
					'<span>' + nick + '</span>打赏了<span>' + content + '</span>元' +
				'</div></div>';
	} else if(isAdminTip){ //管理员消息
		html = '<div class="txtMsg dbox isAdminTip">' +
					'<div>' + nick + '：</div>' +
					'<div class="dbflex-1">' + content + '</div>' +
				'</div>';
	} else { //普通文本消息
		html = '<div class="txtMsg dbox">' +
					'<div class="dbox"><div class="dbflex-1">' + nick + '</div><div>：</div></div>' +
					'<div class="dbflex-1">' + content + '</div>' +
				'</div>';
	}
	$('.MsgBox').append(html);
	var tobottom = $('.newMsgTips').is(':visible');
	var _st = $('#tab_chat').scrollTop();
	var msgtop = localStorage.getItem('msgtop') || 0;
	if((_st >= msgtop && !tobottom) || self){
		showLatestMsg();
	} else {
		$('.newMsgTips').show();
	}
}
//展示管理员公告
function showAdminTip(data){
	$('.adminTips').remove();
	var adminTip = 	'<div class="adminTips">' +
						'<div class="marquee">' + data + '</div>' +
						'<div></div>' +
					'</div>';
	$('.adminCtn').append(adminTip);
//	$('.adminTips').fadeIn(); //展示系统公告
	$('.marquee').marquee({speed: 5000});
	setTimeout(function(){
		$('.adminTips').remove();
	}, 30000);
}
//初始化连接聊天室
function connectRoom() {
	var supportsWebSockets = 'WebSocket' in window || 'MozWebSocket' in window;
    if(supportsWebSockets){
      socket = io.connect(chatHost, {
        'query': 'token=' + chatToken,
        'transports' : ['websocket']
      });
    } else {
      socket = io.connect(chatHost, {
        'query': 'token=' + chatToken,
        'transports' : ['polling']
      });
    }
//	socket = io.connect(chatHost, {
//		'query': 'token=' + chatToken //连接socket
//	});
	//连接服务器成功
	socket.on('connect', function() {
		socket.emit('message', JSON.stringify({ //用户登录
			'EVENT': 'LOGIN',
			'values': [nickname, avatar, userId], //昵称、头像地址、用户id
			'roomId': roomId
		}));
		likeLive('auto');
	});
	//接收信息事件
	socket.on('message', function(message) {
		var data = JSON.parse(message);
		console.log(data);
		if(data && data.EVENT) { //根据返回的不同事件类型作相应处理
			switch(data.EVENT) {
				case 'CLOSEROOM': // room closed
					break;
				case 'GONGGAO': //系统公告
					showAdminTip(data.content);
					break;
				case 'SPEAK': // 用户发言
					addNowChat(data); //将用户发言生成dom添加到页面
					break;
				case 'REWARD': //奖励信息
					break;
				case 'QUESTION':
					break;
				case 'CLOSE_QUESTION':
					break;
				case 'ANSWER':
					break;
				case 'ERROR': // 出错了
					break;
				case 'KICK': // 用户被踢
//					if(user.userId == currentUserId) {
//						setCookie("ban_user_room", user.roomId, 1);
//						socket.disconnect();
//					}
					break;
				case 'REMOVE_HISTORY': //清空聊天记录
					break;
				case 'CLOSE_DANMU': //关闭弹幕
					break;
				case 'LIKES': //点赞消息
					addLikeMsg(data);
					break;
				default:
					break;
			}
		}
	});
	socket.on('disconnect', function(e) {
//		if('ftlMode' == 'ppt') {
//			alert('网络已断开，请检查您的网络！');
//			location.reload();
//		}
	});
	socket.on('error', function(e) {
		console.log(e);
	});
	//发送消息
	$('.sendMsg').click(function(){
		var _that = $('.msgInput');
		var value = _that.val().trim();
		if(value == ''){
			alert('发送内容为空');
			return;
		}
		var data = {
			'EVENT': 'SPEAK',
			'values': [value],
			'roomId': roomId
		};
		socket.emit('message', JSON.stringify(data)); //发送消息
		addNowChat(data, 'self');//展示自己发送的消息
		_that.val('');
	});
	//滑动
	$('#tab_chat').scroll(function(){
		var index = $('.txtMsg').length - 1;
		if(index < 0){ //无消息
			return;
		}
		var top = ($('.txtMsg').eq(index))[0].getBoundingClientRect().top; //元素距窗口顶部的距离
		var clientHeight = $(window).height(); //窗口高度
		if(clientHeight > (top + 60)){
			$('.newMsgTips').hide();
		}
	});
	//底部有新消息
	$('.newMsgTips>div').click(function(){
		showLatestMsg(function(){
			$('.newMsgTips').fadeOut();
		});
	});
	//打赏
	$('.tipFuc').click(function(){
		//初始化打赏模块
		initTipModel();
		$('.feecount, .wxPay').removeClass('checked');
		$('.tipLayer').show();
	});
}
//滚动到消息底部
function showLatestMsg(cb){
	var st = $('.MsgBox').height() - $('#tab_chat').height() + 1000;
	$('#tab_chat').animate({
		scrollTop: st
	}, 100, function(){
		//保存页面位置，若收到新消息时距顶部位置小于此位置，则表示用户滑动，不滚动到底部
		localStorage.setItem('msgtop', $('#tab_chat').scrollTop());
		cb&&cb();
	});
}
//发送打赏信息
function sendRewardMsg(price){
	var data = {
		'EVENT': 'SPEAK',
		'values': ['CZREWARD' + price + 'CZREWARD'],
		'roomId': roomId
	};
	socket.emit('message', JSON.stringify(data)); //发送消息
	addNowChat(data, 'self');//展示自己发送的消息
}

//点赞
function likeLive(auto){
	if(!auto){ //初始化自动点赞不做处理
		var html = '<div class="likeAnimate"></div>';
		$('.likeFuc').append(html);
		$('.likeAnimate').css({
			'right': 0,
			'top': '-2.5rem',
			'width': '2.5rem',
			'height': '2.5rem',
			'opacity': 0.8
		});
		$('.likeAnimate').show().animate({
			'right': '0.5rem',
			'top': '-4.5rem',
			'width': '1.5rem',
			'height': '1.5rem',
			'opacity': '0'
		}, 666);
	}
	var likesnum = $('.liketime').attr('num') || 0;
	likesnum = parseInt(likesnum) + 1;
	var data = JSON.stringify({
		'EVENT': 'LIKES',
		'nick': nickname,
		'count': likesnum,
		'roomId': roomId
	});
	if(socket) {
		socket.emit('message', data);
		$('.liketime').attr('num', likesnum);
		$('.liketime').text(formateLikesNum(likesnum));
	}
}
//同步点赞数量
function saveLikeCount(){
	var count = $('.liketime').attr('num') || 0;
	if(count <= 0){
		return;
	}
	getAjaxDataByPhpNew('/Live/saveZanCount', {
		'course_id': courseId,
		'count': count
	}, function(data){
		
	});
}
//处理点赞数
function formateLikesNum(likesnum){
	if(likesnum >= 10000 && likesnum < 100000) {
		likesnum = (likesnum / 10000).toFixed(2);
		likesnum = likesnum.substring(0, likesnum.length - 1) + 'w';
	} else {
		if(likesnum >= 100000) {
			likesnum = Math.floor(likesnum / 10000) + 'w';
		}
	}
	return likesnum;
}
//接收到点赞消息
function addLikeMsg(data){
	var historyCount = $('.liketime').attr('num') || 0;
	historyCount = parseInt(historyCount);
	var likesnum = data.count;
	if(historyCount > likesnum){
		likesnum = historyCount + 1;
		$('.liketime').attr('num', likesnum);
		$('.liketime').text(formateLikesNum(likesnum));
	} else {
		$('.liketime').attr('num', likesnum);
		$('.liketime').text(formateLikesNum(likesnum));
	}
}
//获取当前用户列表
function getOnlineUserList() {
	getAjaxData('getLivingWhatchNumber', {
		channelId: roomId
	}, function(data){
		if(data.status == 'success'){
			var count = data.result[0].count;
			$('.realtime').text(count);
		}
	});
}
//在自己项目打开的不记录用户数，待处理
//function getOnlineUserList() {
//	$.ajax({
//		url: chatHost2 + '/front/listUsers',
//		dataType: 'jsonp',
//		data: {
//			roomId: roomId,
//			page: 1,
//			len: 1 //获取用户数目
//		},
//		success: function(users) {
//			var count = users.count; //当前用户数
//			$('.realtime').text(count);
//		}
//	});
//}
setInterval(getOnlineUserList, 20000); //每20秒刷新一次

//初始化打赏模块
function initTipModel(){
	var wh = $(window).height(); //窗口高度
	var playerH = $('#player').height(); //播放器高度
//	var navH = $('.tab_nav').height(); //导航高度
	var _height = (wh - playerH) +　'px';
	if($('.header').is(':visible')){
		_height = (wh - playerH - $('.header').height()) +　'px';
	}
	$('.tipLayer').height(_height);
	$('.tipctClose').click(function(){
		$('.tipLayer').hide();
	});
	//选择打赏金额
	$('.feecount').click(function(){
		$('.feecount').removeClass('checked');
		$(this).addClass('checked');
		$('.wxPay').addClass('checked');
	});
	
	//点击微信支付
	$('.tipcCtn').on('click', '.wxPay.checked', function(){
		var money = $('.feecount.checked').attr('price');
		payTip(money);
	});
}
//打赏生成微信订单,调用微信支付
function payTip(money) {
	//控制赞在3s内只能点一次
	if($('.wxPay').attr('enable') == '0'){
		return;
	}
	$('.wxPay').attr('enable', '0');
//	setTimeout(function(){
//		$('.wxPay').attr('enable', '1');
//	}, 3000);
	$.ajax({
        type: "POST",
        url:baseUrl + "saveRewardOrder",
        data: {
            price: money,
			ip: ip,
			employeeId: employeeId,
			weixinType: 0,
			liveCatalogId: 0, //直播课程包id
			liveCourseId: courseId, //直播课程id,
			unionId: unionId,
			openid: openid,
			avatar: avatar,
			nickName: nickname,
			payWay: 2, //购买渠道：1、PC官网，2、手机官网，3、App
        },
        success: function(data){
            var data = data.data;
			orderCode = data.orderCode;
			sign = data.sign;
			nonceStr = data.nonceStr;
			appid = data.appid;
			prepayId = "prepay_id=" + data.prepayId;
			apiKey = data.apiKey;
			// 判断浏览器是否加载完成
			if(typeof WeixinJSBridge == "undefined") {
				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if(document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			} else {
				onBridgeReady();
			}
        },
        complete: function(){
        	$('.wxPay').attr('enable', '1');
        }
    })
}
function onBridgeReady() {
	//console.log(new Date());
	// 当前时间戳
	var time = new Date().getTime();
	var timeStamp = "" + parseInt(time / 1000);
	var string = "appId=" + appid + "&nonceStr=" + nonceStr + "&package=" + prepayId + "&signType=MD5" + "&timeStamp=" + timeStamp + "&key=" + apiKey;
	var paySign = MD5(string).toUpperCase();
	WeixinJSBridge.invoke('getBrandWCPayRequest', {
		"appId": appid, //公众号名称，由商户传入
		"timeStamp": timeStamp, //"1395712654",
		"nonceStr": nonceStr, //随机串
		"package": prepayId,
		"signType": "MD5", //微信签名方式：
		"paySign": paySign //微信签名
	}, function(res) {
		//使按钮能够被点击
		if(res.err_msg == "get_brand_wcpay_request:ok") {
			// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
			setTimeout(function() {
				//支付成功隐藏打赏页面,发送打赏信息
				$('.tipLayer').hide();
				var money = $('.feecount.checked').attr('price');
				sendRewardMsg(money);
			}, 100);
		} else {}
	});
}
// 查询ip网址
var getIpUrl = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random();
$.getJSON(getIpUrl, function(data){
    ip = data.Ip;
});
function MD5(instring){
    var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
    function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
    function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
    function hex_hmac_md5(k, d)
    { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function b64_hmac_md5(k, d)
    { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function any_hmac_md5(k, d, e)
    { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    function md5_vm_test()
    {
        return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
     * Calculate the MD5 of a raw string
     */
    function rstr_md5(s)
    {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    function rstr_hmac_md5(key, data)
    {
        var bkey = rstr2binl(key);
        if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

        var ipad = Array(16), opad = Array(16);
        for(var i = 0; i < 16; i++)
        {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
     * Convert a raw string to a hex string
     */
    function rstr2hex(input)
    {
        try { hexcase } catch(e) { hexcase=0; }
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for(var i = 0; i < input.length; i++)
        {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
            +  hex_tab.charAt( x        & 0x0F);
        }
        return output;
    }

    /*
     * Convert a raw string to a base-64 string
     */
    function rstr2b64(input)
    {
        try { b64pad } catch(e) { b64pad=''; }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for(var i = 0; i < len; i += 3)
        {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
            for(var j = 0; j < 4; j++)
            {
                if(i * 8 + j * 6 > input.length * 8) output += b64pad;
                else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
            }
        }
        return output;
    }

    /*
     * Convert a raw string to an arbitrary string encoding
     */
    function rstr2any(input, encoding)
    {
        var divisor = encoding.length;
        var i, j, q, x, quotient;

        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for(i = 0; i < dividend.length; i++)
        {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }

        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. All remainders are stored for later
         * use.
         */
        var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for(j = 0; j < full_length; j++)
        {
            quotient = Array();
            x = 0;
            for(i = 0; i < dividend.length; i++)
            {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if(quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }

        /* Convert the remainders to the output string */
        var output = "";
        for(i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);

        return output;
    }

    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    function str2rstr_utf8(input)
    {
        var output = "";
        var i = -1;
        var x, y;

        while(++i < input.length)
        {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
            {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }

            /* Encode output as utf-8 */
            if(x <= 0x7F)
                output += String.fromCharCode(x);
            else if(x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                    0x80 | ( x         & 0x3F));
            else if(x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                    0x80 | ((x >>> 6 ) & 0x3F),
                    0x80 | ( x         & 0x3F));
            else if(x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3F),
                    0x80 | ((x >>> 6 ) & 0x3F),
                    0x80 | ( x         & 0x3F));
        }
        return output;
    }

    /*
     * Encode a string as utf-16
     */
    function str2rstr_utf16le(input)
    {
        var output = "";
        for(var i = 0; i < input.length; i++)
            output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    }

    function str2rstr_utf16be(input)
    {
        var output = "";
        for(var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                input.charCodeAt(i)        & 0xFF);
        return output;
    }

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    function rstr2binl(input)
    {
        var output = Array(input.length >> 2);
        for(var i = 0; i < output.length; i++)
            output[i] = 0;
        for(var i = 0; i < input.length * 8; i += 8)
            output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
        return output;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr(input)
    {
        var output = "";
        for(var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
        return output;
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binl_md5(x, len)
    {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a =  1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d =  271733878;

        for(var i = 0; i < x.length; i += 16)
        {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t)
    {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
    }
    function md5_ff(a, b, c, d, x, s, t)
    {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t)
    {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t)
    {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t)
    {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y)
    {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt)
    {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    return hex_md5(instring);
}

var showBtn = $("#showB");
var hideBtn = $("#hideB");
var sendBtn = $("#sendB");
var input = $("#msgB");
var playBtn = $("#play");

/* 设置弹幕 */
function j2s_setBarrage() {
	return true;
}

/* 显示弹幕 */
showBtn.bind("click", function(e) {
	player.j2s_showBarrage();
});

/* 隐藏弹幕 */
hideBtn.bind("click", function(e) {
	player.j2s_hideBarrage();
});

/* 发送弹幕 */
sendBtn.bind("click", function(e) {
	var str = '[{"msg":"' + input.val() + '","fontSize":"24","fontColor":"0xCCCC00","fontMode":"roll"}]';
	player.j2s_addBarrageMessage(str);
	input.val("");
});