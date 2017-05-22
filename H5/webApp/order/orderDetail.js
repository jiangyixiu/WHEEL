var orderNo = request('orderNo'),
	unionId = request('unionId');
$(function(){
	getOrderDetails(orderNo);
});

//根据订单号获取订单详情
function getOrderDetails(orderNo){
	getAjaxData('getOrderByOrderNo', {orderNo: orderNo}, function(data){
		if(data.status == 200){
			showDetail(data.data[0]);
		} else {
			alert(data.msg);
			return;
		}
	});
}
//页面渲染
function showDetail(data){
	var area = {
		1032: 'D区',
		1031: 'B区',
		1030: 'A区',
		1029: 'VIP区',
		951: 'C区'
	}
	var courseId = data.courseId;
	var courseName = data.courseName;
	if(area[courseId]){//大课去掉区域
		$(".dtsArea").show();
		courseName = '插坐学院2017迎新大课';
//		courseName = courseName.substring(0, courseName.indexOf("｜") - 1);
	}
	var isGift = data.isGift;//是否是赠送，大课需判断
	var invoice = data.invoiceTitle;//若存在，表示已开发票
	var invoiceStatus = data.invoiceStatus;
	var newtype = data.newtype == '线下课程' ? true : false;
	if(isGift == '1'){//赠送好友
		$(".detailTop").addClass("hasGift");
		$(".isGift").show();
		$(".dtsName>.dtsLeft").text("好友姓名");
		$(".dtsTel>.dtsLeft").text("好友手机");
	}
	$(".className").text(courseName);
	$(".classTag>span").eq(0).text(data.newtype);
	$(".classTag>span").eq(1).text(data.teachers);
	$(".dtsPrice>.ub-f1").html("&yen;&nbsp;"+data.price+"/人");
	$(".dtsArea>.ub-f1").text(area[courseId] || '无');
	$(".dtsName>.ub-f1").text(data.name || '无');
	$(".dtsTel>.ub-f1").text(data.mobile || '无');
	$(".dtsEmail>.ub-f1").text(data.email || '无');
//	$(".dtlAddr>.ub-f1").text(data.invoiceAddress || '无');
	$(".dtlCompany>.ub-f1").text(data.work || '无');
	$(".dtlQs>.ub-f1").text(data.content || '无');
	$(".dtlJob>.ub-f1").text(data.job || '无');
	
	//直播课程判断
	var isLiveplay = data.newtype == '直播课程' ? true : false;; //是否是直播课程
	var enableToRoom = false; //是否显示进入直播间按钮，默认false
	
	if(isLiveplay){ //直播课程新增直播状态和开播时间标签
		if(data.liveStatus == '直播中'){
			enableToRoom = true;
			$('.classTag').prepend('<span style="color:#F7A90C;">直播中…</span>');
		} else {
			var now = new Date();
			var beginTime = data.beginTime;
			beginTime = beginTime.substring(0, beginTime.length - 2);
			var time = new Date(Date.parse(beginTime.replace(/-/g,"/")));
			var stmp = time.getTime() / 1000;
			var nowtmp = now.getTime() / 1000;
			var tmp = stmp - nowtmp;//直播开始时间距现在的时间差
			if(tmp >= 0){ //未开播
				enableToRoom = true;
				var days = Math.floor(tmp / 86400);
				var hours =  Math.floor(tmp%86400/3600);
				var minutes = Math.floor(tmp%3600/60);
				var dt;
				if(tmp > 3 * 86400){ //三天以上
					dt = beginTime.substring(0, 10);
					$('.classTag').prepend('<span>于 <ss style="color:#F7A90C;">' + dt + '</ss> 开播</span>');
				} else if(tmp > 86400){
					dt = days + '天' + hours + '小时' + minutes + '分';
					$('.classTag').prepend('<span>于 <ss style="color:#F7A90C;">' + dt + '</ss> 后开播</span>');
				} else if(tmp > 3600){
					dt = hours + '小时' + minutes + '分';
					$('.classTag').prepend('<span>于 <ss style="color:#F7A90C;">' + dt + '</ss> 后开播</span>');
				} else if(tmp > 60){
					dt = minutes + '分';
					$('.classTag').prepend('<span>于 <ss style="color:#F7A90C;">' + dt + '</ss> 后开播</span>');
				} else {
					dt = '1分';
					$('.classTag').prepend('<span>于 <ss style="color:#F7A90C;">' + dt + '</ss> 后开播</span>');
				}
			} else {
				var dt = beginTime.substring(0, 10);
				$('.classTag').prepend('<span>' + dt + ' 开播</span>');
				$('.classTag').prepend('<span>已结束</span>');
			}
		}
	}
	
	if(newtype){
		var reviewStatus = data.reviewStatus;
	}
	if(newtype && reviewStatus == '0'){//审核中
		$(".ckxq, .shzIcon").show();
	} else if(newtype && reviewStatus == '2'){//审核未通过
		$(".ckxq, .shsbIcon").show();
	} else if(data.price < 900){//不可开发票
		if(newtype && reviewStatus == '1') {
			if(area[courseId]){
				$(".bnkfp").show();
			} else {
				$(".ckxq").show();
			}
		} else if(isLiveplay) {
			if(enableToRoom){
				$('.jrzbj').show();
			} else {
				$('.ckhf').show();
			}
		} else {
			$(".bnkfp").show();
		}
	} else if(invoice && invoiceStatus == '1'){//发票处理中
		if(newtype && reviewStatus == '1') { //线下课
			if(area[courseId]){
				$(".ckfpjd, .tzs").show();
			} else {
				$(".ckfpjd, .ckxq1").show();
			}
		} else if(isLiveplay) { //直播课
			if(enableToRoom){
				$('.ckfpjd, .jrzbj1').show();
			} else {
				$('.ckfpjd, .ckhf1').show();
			}
		} else { //线上课
			$(".ckfpjd, .tzs").show();
		}
	} else if(invoice && invoiceStatus == '2'){//发票已开出
		if(newtype && reviewStatus == '1') {
			if(area[courseId]){
				$(".ckfpxx, .tzs, .billready").show();
			} else {
				$(".ckfpxx, .ckxq1, .billready").show();
			}
		} else if(isLiveplay) { //直播课
			if(enableToRoom){
				$('.ckfpxx, .billready, .jrzbj1').show();
			} else {
				$('.ckfpxx, .billready, .ckhf1').show();
			}
		} else {
			$(".ckfpxx, .tzs, .billready").show();
		}
	} else {//未开发票
		if(newtype && reviewStatus == '1') {
			if(area[courseId]){
				$(".syfp, .tzs").show();
			} else {
				$(".syfp, .ckxq1").show();
			}
		} else if(isLiveplay) { //直播课
			if(enableToRoom){
				$('.syfp, .jrzbj1').show();
			} else {
				$('.syfp, .ckhf1').show();
			}
		} else {
			$(".syfp, .tzs").show();
		}
	}
	
	//查看发票信息、进度
	$(".ckfpjd, .ckfpxx").click(function(){
		window.location.href = 'invoiceMsg.html?orderNo=' + orderNo + "&unionId=" + unionId;
	});
	//索要发票
	$(".syfp").on('click', function(){
		window.location.href = '../publicPay/invoice.html?orderNo=' + orderNo + "&unionId=" + unionId;
	});
	//查看录取通知
	$(".tzs, .bnkfp").click(function(){
		var url = '../payment/notice.html?courseId=' + courseId + '&unionId='+unionId;
//		if(isGift == '1') {
		if(area[courseId]){
			var sharePage = 'http://api.chazuomba.com/manage/Web/shareFriend.html?orderCode='+orderNo;
			url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri='+ encodeURIComponent(sharePage) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
		}
		window.location.href = url;
	});
	//线下课程查看详情
	$(".ckxq, .ckxq1").click(function(){
		var url = '../payment/audit.html?audit=' +　reviewStatus + '&unionId=' + unionId + '&courseId=' + courseId + '&orderCode=' + orderNo;
		if(area[courseId]){
			var sharePage = 'http://api.chazuomba.com/manage/Web/shareFriend.html?orderCode='+orderNo;
			url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3069b403f0a23af&redirect_uri='+ encodeURIComponent(sharePage) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
		}
		window.location.href = url;
	});
	
	//进入直播间
	$('.jrzbj, .jrzbj1').click(function(){
		var params = {
			redirect: webAppUrl + 'liveplay/index.html',
			courseId: courseId
		};
		params = JSON.stringify(params);
		params = encodeURIComponent(params);
		window.location.href = 'http://api.chazuomba.com/oauth/authorize.html?params=' + params;
	});
	
	//查看回放
	$('.ckhf, .ckhf1').click(function(){
		$('.ckhfLayer').show();
	});
	
	$('.ckhfLayer').click(function(){
		$(this).hide();
	});
	$('.ckhfCth').click(function(e){
		e.preventDefault();
		e.stopPropagation();
	});
}
