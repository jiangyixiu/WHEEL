var baseUrl = 'http://www.chazuomba.com/iserver/app/'
var ip, audit='0';
var employeeId = request('employeeId');
var courseId = request('courseId');
var	unionId,
	openid,
	nickname,
	headimgurl;

$(function() {
	checkHasBuy(); //判断是否购买过
	$('#showPayDiv').click(function(){
		checkRights(); //资格查询
	});
	
	// 验证表单填写格式是否正确
    $('#userName').on('blur input',function(){            // 姓名
        cue($(this).val(),$(this));
    });
    $('#userPhone').on('blur input', function(){           // 手机号
        var regMobile = /^[0|2-9]\d{4,16}$/;
        var regMobile11 = /^1\d{10}$/;
        if (regMobile.test($(this).val())) {
            cue(regMobile.test($(this).val()),$(this));
        }else if (regMobile11.test($(this).val())) {
            cue(regMobile11.test($(this).val()),$(this));
        }else{
            cue(false,$(this));
        };
    });
    $('#userEmail').on('blur input',function () {      //邮箱
        var regEmail = /^\S{1,255}@\S{1,255}\.\S{2,255}$/;
        if (regEmail.test($(this).val())) {
            cue(regEmail.test($(this).val()),$(this));
        } else{
            cue(false,$(this));
        };
    });
    
});
//判断是否购买
function checkHasBuy() {
	// 判断有没有买过
	$.getJSON(baseUrl + "getIfBuyOfflineCourseByEmployeeId", {
		'employeeId': employeeId,
		'courseId': courseId
	}, function(data) {
		var orderCode = data.code;
		var courseType = '0';//线下
		if(data.status == "200") { // 已购此课
			audit = data.msg;
			var url = 'audit.html?' + encodeURI("audit=" + audit + "&unionId=" + unionId + "&orderCode=" + orderCode + "&openid=" + openid + "&courseId=" + courseId + "&type=0" + "&courseType=" + courseType);
			window.location.href = url;
		} else {
			//没购买过，获取用户信息
			getUserInfo();
			getCourseInfo();
		}
	});
}
// 获取个人信息
function getUserInfo() {
	if(employeeId == '33'){
		unionId = 'App未登录报名unionid';
		openid = 'App未登录报名openid';
		return;
	}
	$.getJSON(baseUrl + "findEmployeeInfoByEmployeeId", {
		'employeeId': employeeId
	}, function(data) {
		var data = data.data;
		if(data){
			// 初始化信息
			$("#userName").attr("value", data.name);
			$("#userPhone").attr("value", data.mobile);
			unionId = data.unionid || 'App报名unionid';
			openid = data.openid || 'App报名openid';
			nickname = data.name;
			headimgurl = data.avatar;
//			$("#userEmail").attr("value", data.email);
//			$("#userCompany").attr("value", data.company);
//			$("#_userJob").attr("value", data.job);
		}
	});
}

//获取课程信息
function getCourseInfo(){
	$.getJSON(baseUrl + "findWebOfflineCourseInfo", {
        'client_version': '1',
        'device_id': '1',
        'platform': 'web',
        'courseId': courseId
    }, function (data) {
        var data = data.data;
        $(".title").html(data.title);
    });
}

// 资格查询
function checkRights() {
	if( check()==false ){return false;}
	$.ajax({
		type: "get",
		url: baseUrl + '/queryOrderListByMobile',
		data: {
			mobile: $("#userPhone").val()
		},
		success: function(data){
			var price = 0;
			var orderList = '[]';
			var free = 0;
			if(data.status == '200'){
				price = Number(data.code); //订单总价
				orderList = data.data; //线上课程订单列表
				orderList = JSON.stringify(orderList);
			}
			if(price >= 598){ //加个大于598可以免费
				free = 1;
			}
			saveUserInfo();
			localStorage.setItem('giftClassOrderList', orderList);
			window.location.href = 'giftClassApply.html?free=' + free + '&money=' + Math.floor(price) + '&title=' + $(".title").text();
		}
	});
}
//保存用户数据
function saveUserInfo(){
	var userInfo = {
		mobile: $('#userPhone').val(),
		name: $('#userName').val(),
		email: $('#userEmail').val(),
		courseId: courseId,
		unionid: unionId,
		openid: openid,
		avatar: headimgurl,
		nickName: nickname,
		ip: ip,
		from: 0,
		content: $('#ask').val(),
		company: $('#userCompany').val(),
		work: $('#_userJob').val()
	}
	userInfo = JSON.stringify(userInfo);
	localStorage.setItem('giftClassUserInfo', userInfo);
}

// 查询ip网址
$.getJSON('http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random(), function(data) {
	ip = data.Ip;
});

// 标红标绿函数
function cue(Boolean,obj){
    if(Boolean) {
        obj.parent().find('i').attr('class','icon-ok').css('color','#7ed321').show();
    } else {
        obj.parent().find('i').attr('class','icon-exclamation-sign').attr('wrong','wrong').css('color','red').show();
    }
}
// 检测信息
function check(){
    var judge = ($('#userName').val()  != ''   &            // 用户姓名
    $('#weixin').val()  != ''   &                           // weixin
    $('#userEmail').val() != '' &
    $('#userPhone').val() != ''   ? true:false);            // 手机 // 职位
    var regMobile = /^[0|2-9]\d{4,16}$/;
    var regMobile11 = /^1\d{10}$/;
    if (regMobile.test($('#userPhone').val())) {
        cue(regMobile.test($('#userPhone').val()),$(this));
    }else if (regMobile11.test($('#userPhone').val())) {
        cue(regMobile11.test($('#userPhone').val()),$(this));
    }else{
        cue(false,$('#userPhone'));
    };
    cue($("#userName").val(), $("#userName"));
    //console.log(judge)
    //模拟触发
    $("#userName").trigger('blur');
    $("#userPhone").trigger('blur');
    $("#userEmail").trigger('blur');
    if( !judge ){     //  判断是否有空项
        if($("#userName").val() == ''){
        	showTip('请输入姓名');
        } else if($('#userPhone').val() == ''){
        	showTip('请输入手机号');
        } else if($('#userEmail').val() == ''){
        	showTip('请输入邮箱');
        }
        return false;
    } else if($('.icon-exclamation-sign').hasClass('icon-exclamation-sign')){  //是否有错误标志
        showTip('请填写正确信息！');
        return false;
    }

    name = $('#userName').val();        // 用户姓名
    sex = $('#_sex .blue').attr("sex");       // 性别
    weixin = $('#userWeiXin').val();    // weixin
    mobile = $('#userPhone').val();     // 手机
    job = $('#_userJob').val();                     // 职位
    // 获取表单信息
    userName = $('#userName').val();        // 用户姓名
    weixinSex = $('#_sex .blue').attr("sex");       // 性别
    userPhone = $('#userPhone').val();     // 手机
    userEmail = $('#userEmail').val();     // 邮箱
    work = $('#userCompany').val();                     // 公司名字
    userJob = $('#_userJob').val();                     // 职位
    joinReason = $('#cause .selectBlue').text();    // 参课原因
    content = $('#ask').val();                      // 提问
}
