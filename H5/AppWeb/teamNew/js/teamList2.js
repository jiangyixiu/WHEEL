var companyId = request('companyId');
//var companyId = 1;

var app = angular.module('myApp',[]);
app.controller('teamList',function($http, $scope){
	//查询企业用户培训列表
	getDate($http, $scope);
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
}).filter('dateFormat',function(date){
	return new Date(date);
});

//Angular 调企业用户培训列表接口
function getDate($http, $scope){
	getTrainingListA($http, {
		data: {
			companyId: companyId
		}, success: function(data){
			var data = data;
			$scope.bars = data.data;
			listRender($scope, data);
		}
	});
};
//列表渲染
function listRender($scope, data){
	var data = data.data;
	$scope.$on('ngBarFinished',function(){
		for (var i=0; i<data.length; i++) {
			var Html = '';
			var avatarList = data[i].avatarList;
			for(var x=0; x<4; x++){
				if (avatarList[x])
				Html += '<img src='+avatarList[x].avatar+'>';
			}
		 	$('.avatarList').eq(i).html(Html);
		}
		filtering(data);
	});	
};
//列表过滤和筛选
function filtering(data){
	var imgs = $('.avatarList');
	var imgLength = imgs.length;
//	for (var i=0; i<data.length; i++) {
//		console.log($('.avatarList').eq(i).find('img').length)
//		var num = $('.avatarList').eq(i).find('img').length;
//		if (num == 2){
//			$('.avatarList').eq(i).find('img').css({bottom:0, margin:'auto'})
//		}
//		if (num == 3){
//			$('.avatarList').eq(i).find('img').eq(0).css({right:0, margin:'auto'})
//			$('.avatarList').eq(i).find('img').eq(1).css({bottom:0,top:'inherit',})
//		}
//	}

	for (var i=0; i<data.length; i++) {
		console.log($('.avatarList').eq(i).find('img').length);
		var num = $('.avatarList').eq(i).find('img').length;
		if (num == 2){
			$('.avatarList').eq(i).find('img').eq(0).css({margin:'1.0625rem 1px 1.0625rem 0'});
			$('.avatarList').eq(i).find('img').eq(1).css({margin:'1.0625rem 0'});
		}
		if (num == 3){
			$('.avatarList').eq(i).find('img').eq(0).css({margin:'0 1.0625rem 1px'});
			$('.avatarList').eq(i).find('img').eq(1).css({margin:'0 1px 0 0',clear: 'left'});
			$('.avatarList').eq(i).find('img').eq(2).css({margin:'0 0 0 0',clear: 'inherit'});
		}
	}

	$('.teamList:last').css('border','none');
	$('.teamList').on('click',function(){
		_czc.push(["_trackEvent", "1", "团队详情", "团队"]);
		var companyCultivateId = $(this).attr('no');
		window.location.href = 'teamDetails.html?companyId='+ companyId + '&companyCultivateId=' + companyCultivateId;
	});
}
