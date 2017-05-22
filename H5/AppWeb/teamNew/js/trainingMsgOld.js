/**
 * 返回学习时间单位为s
 * 时间计算采取除以60后四舍五入，转换为分钟
 */
var companyId = request('companyId');
var catalogId = request('catalogId');
var companyCultivateId = request('companyCultivateId');
//已完成课程结束日期
var endyear = request('endyear');
var endmonth = request('endmonth');
var app = angular.module('myApp', []);
app.controller('getMsg', function($http, $scope) {
	//获取当前日期
	var date = new Date();
	var nowyear = date.getFullYear();
	var nowmonth = date.getMonth() + 1;
	var nowday = date.getDate();
	$(".tmttitle").text(nowmonth + '月');
	nowmonth = (nowmonth > 9) ? nowmonth : ('0' + nowmonth);
	$scope.nowyear = nowyear;
	$scope.nowmonth = nowmonth;
	$scope.nowday = nowday;
//	$scope.year = nowyear;
//	$scope.month = nowmonth;
	$scope.day = nowday;
	if(endyear && endmonth){
		$scope.nowyear = endyear;
		$scope.nowmonth = endmonth;
		if(endyear == nowyear && endmonth == nowmonth){
			//如果是当月已结束，数据卡片只显示到当天
			$scope.nowday = nowday;
		} else {
			$scope.nowday = 31;
		}
		$(".tmttitle").text(Number(endmonth) + '月');
		$scope.day = 1;
	}
	
//	$scope.monthCount = 0;//存在数据的月份
	
	//柱状图
	showChart($http, $scope, $scope.nowyear, $scope.nowmonth);
	//查询排行榜
	showRanking($http, $scope, $scope.nowyear, $scope.nowmonth);
	//每日学习数据
	showListening($http, $scope, $scope.nowyear, $scope.nowmonth);
//	var cms = countMonth($scope.startTime, $scope.endTime);
	//点击选择月份
//	$(".tmtitle").click(function(){
//		if($scope.monthCount < 2){
//			$(".tmtmonth").hide();			
//			return;
//		}
//		//销毁Swiper
//		$scope.swiperBar.destroy(false);
//		$scope.swiperBar1.destroy(false);
//		swiper4 && swiper4.destroy(false);
//		
//		$(".dateSelectCtr").show();
//		var swiper4 = new Swiper('.swiper-container4', {
//			direction: 'vertical',
//			slidesPerView: 'auto',
//			freeMode: true
//		});
//		huaPing(false);
//	});
//	$('.dateSelectCtn').on('click', '.mtMonth', function(){
//		var _s = $(this);
//		$('.tmttitle').text(_s.text());
//		var chooseY = _s.parent().attr('year');
//		var chooseM = _s.attr('month');
//		$scope.year = chooseY;
//		$scope.month = chooseM;
//		$('.dateSelectCtr').hide();
//		huaPing(true);
//		//柱状图
//		showChart($http, $scope, chooseY, chooseM);
//		//每日学习数据
//		showListening($http, $scope, chooseY, chooseM);
//	});
	//隐藏月份
//	$('.dateSelectCtr').click(function(){
//		$(this).hide();
//		huaPing(true);
//	});
//	$('.dateSelectCtn').click(function(e){
//		e.preventDefault();
//		e.stopPropagation();
//	});
	//到排行榜页面
	$scope.toRanking = function(){
		_czc.push(["_trackEvent", "1", "排行榜", "管理员"]);
		window.location.href = 'ranking.html?companyId=' + companyId + '&catalogId=' + catalogId + '&companyCultivateId=' + companyCultivateId;
	}
}).directive('onFinishRenderFilters', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			if (scope.$last === true) {
				var module = "ng" + attr.onFinishRenderFilters + "Finished";
				$timeout(function() {
					scope.$emit(module);
				});
			}
		}
	};
}).filter('formateNum1', function(){
	return function(input){
		//格式化学习时间，为0时不显示，其他四舍五入
		input = Number(input);
		input = Math.round(input);
		if(isNaN(input)){
			return '';
		} else if(input > 0){
			return input;
		} else {
			return '';
		}
	}
}).filter('formateDate', function(){
	//返回标准日期格式
	return function(input){
		input = Date.parse(input.replace(/-/g,"/"));
		return new Date(input)
	}
}).filter('formateDate1', function(){
	//返回日期和周几
	return function(input, param){
		input = Date.parse(input.replace(/-/g,"/"));
		input = new Date(input);
		var week = input.getDay();
		var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		
		var weekTxt = function(){
			var today = new Date();
			if(input.getDate() == today.getDate() && input.getMonth() == today.getMonth() && input.getFullYear() == today.getFullYear()){
				return '今天';
			} else {
				return weeks[week];
			}
		};
		
		var output = {
			day: input,
			week: weekTxt()
		}
		return output[param];
	}
});
//展示图表
function showChart($http, $scope, year, month) {
	getChartDataA($http, {
		cache: true,
		data: {
			companyId: companyId,
			catalogId: catalogId,
			companyCultivateId: companyCultivateId,
			year: year,
			month: month
		},
		success: function(res) {
			chartAnimate($scope, res.data);
		}
	});
}
//展示每日学习数据
function showListening($http, $scope, year, month){
	getListeningDataA($http, {
		cache: true,
		data: {
			companyId: companyId,
			catalogId: catalogId,
			companyCultivateId: companyCultivateId,
			year: year,
			month: month
		},
		success: function(res) {
			listeningAnimate($scope, res.data, year, month);
		}
	});
}
//查询排行榜
function showRanking($http, $scope, nowyear, nowmonth){
	getTopThreeA($http, {
		cache: true,
		data: {
			companyId: companyId,
			catalogId: catalogId,
			companyCultivateId: companyCultivateId
		},
		success: function(res) {
			$scope.topthree = res.data;
		}
	});
}
//渲染图表效果
function chartAnimate($scope, data){
	$scope.bars = data.arrtime;
	var html = '', list = data.arrtime;
	var height = [];
	for(var i=0,l=list.length;i<l;i++){
		if(Math.round(data.max_study_time / 60) == 0){
			height.push(0);
		} else {
			height.push(Math.round(list[i].studyTime / 60) * 100 / Math.round(data.max_study_time / 60));
		}
	}
	var ave = (Math.round(data.max_study_time / 60) - Math.round(data.avgStudyTime / 60)) / Math.round(data.max_study_time / 60);
	if(isNaN(ave)){
		ave = 1;
	}
	var _l = 3 - (data.arrtime.length - $scope.nowday);
	var nullBar = [];
	if(_l > 0 && _l < 4){
		for(var _i = 0; _i < _l; _i++){
			nullBar.push(_i);
		}
	}
	$scope.nullBar = nullBar;
	$scope.$on('ngBarFinished', function () {
//		$(".listenCtn").show();
		$(".wrapper1 .swiper-slide").eq($scope.day - 1).addClass('curbar');
		var w = document.documentElement.clientWidth;
		var scale = w / 375;
		if(scale >= 2) {
			scale = 2;
		}
		var swiperBar = new Swiper('.swiper-container1', {
			roundLengths : false,
			slidesPerView: 7,
			spaceBetween: 20 * scale
		});
		swiperBar.slideTo($scope.day - 4, 0);
		$scope.swiperBar = swiperBar;
//		$(".tmweek").eq($scope.day - 1).text('今天');
		//平均值
//		var baseHeight = $(".barCtn").eq(0).height();
//		ave = ave * baseHeight + 'px';
//		$('.average').show().height(ave);
		$scope.height = height;
		//每日学习数据绑定单击事件
		$(".wrapper2").on('click', '.swiper-slide', function(){
			var _t = $(this);
			_t.addClass('curcard').siblings().removeClass('curcard');
			var index = _t.attr('index');
			swiperBar.slideTo(index - 3);
			$scope.swiperBar1.slideTo(index);
			$(".wrapper1 .swiper-slide").eq(index).addClass('curbar').siblings().removeClass('curbar');
		});
	});
	//统计月份选择
//	countMonth($scope, data.start_time, data.end_time);
}
//统计月份选择
function countMonth($scope, starttime, endtime){
	starttime = Date.parse(starttime.replace(/-/g,"/"));
	endtime = Date.parse(endtime.replace(/-/g,"/"));
	var monthCount = 0;
	var _s = new Date(starttime), _e = new Date(endtime);
	var sy = _s.getFullYear(),
		ey = _e.getFullYear(),
		sm = _s.getMonth() + 1,
		em = _e.getMonth() + 1;
	var jd = [];
	if($scope.nowyear >= ey && ey > sy){
		if($scope.nowmonth < em){
			em = $scope.nowmonth;
		}
		var ms1 = [], ms2=[];
		for(var i=sm;i<13;i++){
			j = (i > 9) ? i : ('0' + i);
			ms1.push(j);
		}
		for(var i=1;i<=em;i++){
			j = (i > 9) ? i : ('0' + i);
			ms2.push(j);
		}
		var d1 = {
			year: sy,
			month: ms1
		};
		var d2 = {
			year: ey,
			month: ms2
		};
		jd.push(d1);
		jd.push(d2);
		monthCount = 13 - sm + em;
	} else {
		if($scope.nowmonth < em){
			em = $scope.nowmonth;
		}
		var ms = [];
		for(var i=sm;i<=em;i++){
			j = (i > 9) ? i : ('0' + i);
			ms.push(j);
		}
		var d = {
			year: ey,
			month: ms
		}
		jd.push(d);
		monthCount = 1 - sm + em;
	}
	if(monthCount < 2){
		$(".tmtmonth").hide();			
	}
	$scope.yearmonth = jd;
	$scope.monthCount = monthCount;
//	return jd;
}
//渲染每日学习数据
function listeningAnimate($scope, data, year, month) {
	if(year == $scope.nowyear && month == $scope.nowmonth){
		$scope.cards = data.arrtime.slice(0, $scope.nowday);
	} else {
		$scope.cards = data.arrtime;
	}
	$scope.$on('ngCardFinished', function () {
		//一号的时候只有一张卡片，居左显示
		var isCardCenter = true;
		if($scope.nowday == 1){
			isCardCenter = false;
		}
		var w = document.documentElement.clientWidth;
		var scale = w / 375;
		if(scale >= 2) {
			scale = 2;
		}
		var swiperBar1 = new Swiper('.swiper-container2', {
			slidesPerView: 'auto',
			centeredSlides: isCardCenter,
//			slidesOffsetBefore: 12 * scale
		});
		$(".wrapper2 .swiper-slide").eq($scope.day - 1).addClass('curcard').siblings().removeClass('curcard');
		swiperBar1.slideTo($scope.day - 1, 0);
		$scope.swiperBar1 = swiperBar1;
		//柱状图绑定单击事件
		$(".wrapper1").on('click', '.swiper-slide', function(){
			var _t = $(this);
			if(_t.hasClass('noclick')){
				return;
			}
			_t.addClass('curbar').siblings().removeClass('curbar');
			var index = _t.attr('index');
			swiperBar1.slideTo(index);
			$(".swiper-container2 .msgCard").eq(index).addClass('curcard').siblings().removeClass('curcard');
		});
	});
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
