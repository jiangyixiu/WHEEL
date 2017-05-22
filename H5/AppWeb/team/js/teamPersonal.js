var companyId = request('companyId');
var companyCultivateId = request('companyCultivateId');


var app = angular.module('myApp',[]);
app.controller('rankingList',function($http, $scope){
	getDate($http, $scope, companyId, companyCultivateId);
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
});
function getDate($http, $scope, companyId, companyCultivateId){
	getAverageLearning( $http, {
		data: {
			companyId: companyId,
			companyCultivateId: companyCultivateId
		}, success: function(data){
			pieChart($scope, data);
		}
	});
	//获取平均值
	getTimeAxisA( $http, {
		data: {
			companyId: companyId,
			companyCultivateId: companyCultivateId
		}, success: function(data){
			$scope.aberage = data.data.avg_study;
		}
	});
}
//
function pieChart($scope, data){
	$scope.data = data.data;
	$scope.bars = data.data.list;
	var widths = [];
	var circle = [];
	for (var i=0; i<$scope.bars.length; i++) {
		widths.push($scope.bars[i].count / $scope.data.catalogCourseCount * 100);
		circle.push($scope.bars[i].avg_score*1.58);
	}
	$scope.$on('ngBarFinished', function () {
		$scope.widths = widths;
		$scope.circle = circle;

		//前三名
		$('.list:lt(3) > .lsNumber').css('color','#333333');
		//皇冠
		$('.list:eq(0) > .lsPhoto').html('<img class="no1" src="images/icon_manage_chart_no1.png">');
		$('.list:eq(1) > .lsPhoto').html('<img class="no1" src="images/icon_manage_chart_no2.png">');
		$('.list:eq(2) > .lsPhoto').html('<img class="no1" src="images/icon_manage_chart_no3.png">');
		
		
		
		//超过50%标亮
		console.log($('.percen').size());
		var lsCircleSize = $('.percen').size();
		for (var i=0; i<lsCircleSize; i++) {
			console.log($('.percen').eq(i).attr('id'));
			if($('.percen').eq(i).attr('id') >= 50){
				$('.percen').eq(i).css('color','#3573B3');
				$('.default').eq(i).css('background','#F3F8FF');
				$('.default').eq(i).find('i').addClass('light_blue');
				$('.midTop').eq(i).find('.tm').css('color','#3573B3');
			} else {
				$('.percen').eq(i).css('color','#B8B8B8');
				$('.percen').eq(i).find('i').css('color','#b8b8b8 ');
			}
			
		}
	});
};
