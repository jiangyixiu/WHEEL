var companyId = request('companyId');
var catalogId = request('catalogId');
var companyCultivateId = request('companyCultivateId');
var app = angular.module('myApp',[]);
app.controller('rankingList',function($http, $scope){
	getDate($http, $scope, companyId, catalogId, companyCultivateId);
	//到个人信息页面
	$scope.toPersonal = function(employeeId){
		_czc.push(["_trackEvent", "1", "个人培训详细", "管理员"]);
		window.location.href = 'personal.html?catalogId=' + catalogId + '&companyId=' + companyId + '&companyCultivateId=' + companyCultivateId + '&employeeId=' + employeeId;
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
});
function getDate($http, $scope, companyId, catalogId, companyCultivateId){
	getRankingA( $http, {
		data: {
			companyId: companyId,
			catalogId: catalogId,
			companyCultivateId: companyCultivateId
		}, success: function(data){
			$scope.first = data.data[0].sum_study_time / 60;
			pieChart($scope, data);
		}
	});
}
function pieChart($scope, data){
	$scope.bars = data.data;
	var widths = [];
	var circle = [];
	for (var i=0; i<$scope.bars.length; i++) {
		if(i>0){
			widths.push($scope.bars[i].sum_study_time / 60);	
		} else {
			if($scope.bars[i].sum_study_time / 60 > 1) {
				widths.push($scope.bars[i].sum_study_time / 60);	
			} else {
				widths.push(0);	
			}
		}
		circle.push($scope.bars[i].avg_score*1.58);
	}
	for (var i=0; i<widths.length; i++) {
		if(widths[i] < 0){
			widths[i] = 0
		} else {
			widths[i] = widths[i] / $scope.first * 100;
		}
	}
	$scope.$on('ngBarFinished', function () {
		$scope.widths = widths;
		$scope.circle = circle;

		//前三名
		$('.list:lt(3) > .lsNumber').css('color','#3573B3');
		$('.midTop:lt(3) > .name').css('color','#3573B3');

		$('.lsCircle:lt(3)').find('span,i').css('color','#3573B3');
		$('.lsCircle:gt(2)').find('span,i').css('color','#B8B8B8');
		$('.default:lt(3)').css('background','#F3F8FF');
		$('.default:lt(3)').find('i').addClass('light_blue');
		$('.midTop:lt(3)').find('.tm').css('color','#3573B3');
		$('.midTop:lt(3)').find('.tm_text').css('color','#3573B3');

		//皇冠

		$('.list:lt(3) > .lsPhoto').append('<img class="no1" src="images/icon_manage_chart_no1.png">');


		//画圆
		var clientWidth = document.documentElement.clientWidth;
	    var canvasWidth = Math.floor(clientWidth/375*70);
	    var canvasRadius = Math.floor(clientWidth/375*32);
	    var canvasRadius2 = Math.floor(clientWidth/375*29);
	    var canvasArc = Math.floor(clientWidth/375*6);
	    var lsCircle = document.getElementsByClassName('lsCircle');
		for (var i=0; i<lsCircle.length; i++) {
			if(i>2){
				var colors = ['#DCE7F8','#95CAFD','#DCE7F8'];
			}
			var colors = i>2 ? ['#F5F5F5','#D6D6D6','#F5F5F5'] : ['#DCE7F8','#7bbcfa','#f3f8ff'];
			var opts = {
				parent: lsCircle[i],
				perent: lsCircle[i].	getAttribute('id'),
				color: colors
			}
			//生成百分比圆
			drawRing(opts, (-lsCircle[i].getAttribute('id')+60), canvasWidth, canvasRadius, canvasRadius2, canvasArc);
		}
	});
};

