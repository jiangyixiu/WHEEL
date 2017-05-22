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
	nowmonth = (nowmonth > 9) ? nowmonth : ('0' + nowmonth);
	//保存当前的日期
	$scope.nowyear = nowyear;
	$scope.nowmonth = nowmonth;
	$scope.nowday = nowday;
	//如果课程已结束，则查询课程结束当月数据
	if(endyear && endmonth){
		$scope.datayear = endyear;
		$scope.datamonth = endmonth;
		$scope.isFinish = true;//课程已完成
	} else {
		$scope.datayear = nowyear;
		$scope.datamonth = nowmonth;
		$scope.isFinish = false;//课程未完成
	}
	//每日学习数据
	showListening($http, $scope, $scope.datayear, $scope.datamonth);
	//查询排行榜
	showRanking($http, $scope);
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
//		var date = new Date();
//		var y = date.getFullYear();
//		var m = date.getMonth() + 1;
//		var d = date.getDate();
		input = new Date(Date.parse(input.replace(/-/g,"/")));
//		var iy = input.getFullYear();
		var im = input.getMonth() + 1;
		var id = input.getDate();
//		if(y == iy && m == im && d == id){
//			return '今天';
//		} else {
//			return im + '月' + id + '日';
//		}
		return im + '月' + id + '日';
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
function showRanking($http, $scope){
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
//渲染每日学习数据
function listeningAnimate($scope, data, year, month) {
	var st = formateJsonDate(data.starttime);//课程开始时间
	var et = formateJsonDate(data.endtime);//课程结束时间
	var index;//卡片位置
	if($scope.isFinish){ //课程已完成
//		if(et.year == year && et.month == month){//当月结束的课程
//			if(st.year == year && st.month == month){//当月开始的课程，从开始日期显示到结束日期
//				$scope.cards = data.arrtime.slice(st.day - 1, et.day);
//			} else {//其他月份开始的课程，从当月1号显示到结束日期
//				$scope.cards = data.arrtime.slice(0, et.day);
//			}
//		} else {//其他月份结束的课程
//			if(st.year == year && st.month == month){//结束当月开始的课程
//				$scope.cards = data.arrtime.slice(st.day - 1, et.day);
//			} else {//非结束当月开始的课程，从结束月份1号显示到结束日期
//				$scope.cards = data.arrtime.slice(0, et.day);
//			}
//		}
		if(st.year == year && st.month == month){//结束当月开始的课程
			$scope.cards = data.arrtime.slice(st.day - 1, et.day);
			index = et.day - st.day;
		} else {//非结束当月开始的课程，从结束月份1号显示到结束日期
			$scope.cards = data.arrtime.slice(0, et.day);
			index = et.day - 1;
		}
	} else { //课程未完成
		if(st.year == year && st.month == month){//当月开始课程，只展示开始日期到几天的数据
			$scope.cards = data.arrtime.slice(st.day - 1, $scope.nowday);
			index = $scope.nowday - st.day;
		} else {//以前开始的课程，展示到今天的数据
			$scope.cards = data.arrtime.slice(0, $scope.nowday);
			index = $scope.nowday - 1;
		}
	}
	
	$scope.$on('ngCardFinished', function () {
		var w = document.documentElement.clientWidth;
		var scale = w / 375;
		if(scale >= 2) {
			scale = 2;
		}
		var swiperBar = new Swiper('.swiper-container2', {
			slidesPerView: 'auto',
			centeredSlides: true,
//			spaceBetween: 20 * scale,
			effect: 'coverflow'
		});
		swiperBar.slideTo(index, 0);
	});
}
//格式化日期为json格式
function formateJsonDate(date){
	date = new Date(Date.parse(date.replace(/-/g,"/")));
	var month = date.getMonth() + 1;
	month = (month > 9) ? month : ('0' + month);
	return {
		year: date.getFullYear(),
		month: month,
		day: date.getDate()
	};
}
