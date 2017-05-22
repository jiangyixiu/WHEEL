var companyId = request('companyId');
var app = angular.module('myApp', []);
app.controller('getList', function($http, $scope) {
//	$scope.curPage = 1;
//	$scope.nextPage = 1;
	$scope.listT = [];//初始化课程列表
	$scope.listF = [];//初始化课程列表
	getList($http, $scope, companyId, 1);
	//到培训详情页
	$scope.toMsg = function(catalogId, companyCultivateId){
		_czc.push(["_trackEvent", "1", "排行榜", "团队"]);
		window.location.href = 'ranking.html?companyId=' + companyId + '&catalogId=' + catalogId + '&companyCultivateId=' + companyCultivateId;
	};
//	//下拉加载下一页
//	$(document).on("scroll", function() {
//		var viewH = $(window).height(), //视口高度
//			contentH = $(this).height(), //内容高度
//			scrollTop = $(this).scrollTop(); //滚动高度
//		if(contentH <= (scrollTop + viewH) && $scope.nextPage >　$scope.curPage) { //到达底部100px时,加载新内容
//			getList($http, $scope, companyId, $scope.nextPage);
//		}
//	});
	
}).filter('formateDate', function(){
	return function(input){
		return new Date(input);
	}
});
//查询企业用户课程列表 
function getList($http, $scope, companyId, page){
	getCatalogListA($http, {
		data: {
			companyId: companyId
		}, success: function(res){
			if(!res.data){
				$scope.nolists = true;
				return;
			}
//			$scope.curPage = page;
//			var list = res.data;
			var listT = res.data.catalogList;
//			var listF = res.data.catalogList;
			var listF = res.data.catalogPastList;
			//接口分页:每页显示20条
//			if(list.length < 20){
//				
//			} else {
//				$scope.nextPage = page + 1;
//			}

//			var d, now = new Date().getTime();
//			for(var i in listT) {
//				d = listT[i];
//				var start = d.new_course_begin_time;
////				var studyend = d.company_study_end_at;
//				var catalogend = d.company_catalog_end_at;
////				var end = getOneyearLater(start);
//				var end = d.company_catalog_end_at;
//				if(now > time2timestamp(end)){
//					listT[i].classSts = '3';
//					listT[i].classStsTxt = '已过期';
//				} else if(now > time2timestamp(catalogend)){
//					listT[i].classSts = '2';
//					listT[i].classStsTxt = '已完成';
//				} else if(now > time2timestamp(start)){
//					listT[i].classSts = '1';
//					listT[i].classStsTxt = '进行中';
//				}
//				var percent = Math.round(Number(d.study_count) * 100 / d.all_count);
//				var study = Number(d.avg_study) * 100;
//				var score = Number(d.avg_score);
//				if(isNaN(percent)){
//					percent = 0;
//				}
//				percent = percent;
////				listT[i].percent = percent;
//				listT[i].study = study;
//				listT[i].score = score;
//			}
//			courseStatus(listT,1);//1未过期 0过期
//			$scope.listT.push.apply($scope.listT, listT);
//			$scope.listF.push.apply($scope.listF, listF);
			
			$scope.listT = courseStatus(listT, 1);
			$scope.listF = listF;
		}
	});
}
//添加课程状态
function courseStatus(obj,W){
	var d, now = new Date().getTime();
	for(var i in obj) {
		d = obj[i];
		var start = d.company_study_start_at;
//				var studyend = d.company_study_end_at;
		var catalogend = d.company_study_end_at;
//				var end = getOneyearLater(start);
		var end = d.company_catalog_end_at;
		if(W){
			if(now > time2timestamp(catalogend)){
				obj[i].classSts = '2';
				obj[i].classStsTxt = '任务已截止';
			} else if(now > time2timestamp(start)){
				obj[i].classSts = '1';
				obj[i].classStsTxt = '任务进行中';
			}
		}else{
			if(now > time2timestamp(catalogend)){
				obj[i].classSts = '2_';
				obj[i].classStsTxt = '已完成';
			} else if(now > time2timestamp(start)){
				obj[i].classSts = '1_';
				obj[i].classStsTxt = '未完成';
			}
		}
	}
	return obj;
}

//转换为1年后日期
function getOneyearLater(time){
	var str = time.toString();
	var time = new Date(Date.parse(str.replace(/-/g,"/")));
	var oneyearLater = (time.getFullYear() + 1) + '-' +
						(time.getMonth() + 1) + '-' +
						(time.getDate() - 1) + ' ' +
						time.getHours() + ':' +
						time.getMinutes() + ':' +
						time.getSeconds();
	return oneyearLater;
}
function time2timestamp(time){
	var str = time.toString();
	return new Date(Date.parse(str.replace(/-/g,"/"))).getTime();
}
