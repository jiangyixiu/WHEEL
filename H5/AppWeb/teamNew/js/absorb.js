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
	//获排行列表
	getAbsorb( $http, {
		data: {
			companyId: companyId,
			companyCultivateId: companyCultivateId
		}, success: function(data){
			$scope.first = data.data[0].sum_study_time;
			pieChart($scope, data);
		}
	});
	//获取平均值
	getTimeAxisA( $http, {
		data: {
			companyId: companyId,
			companyCultivateId: companyCultivateId
		}, success: function(data){
			$scope.average = data.data.avg_ticket;
		}
	});
}
function pieChart($scope, data){
	$scope.bars = data.data;
	var widths = [];
	var circle = [];
	for (var i=0; i<$scope.bars.length; i++) {
		widths.push($scope.bars[i].sum_study_time / $scope.first * 100);
		circle.push($scope.bars[i].avg_score*1.58);
	}
	$scope.$on('ngBarFinished', function () {
		$scope.widths = widths;
		$scope.circle = circle;

		//皇冠
		$('.list:eq(0) > .lsPhoto').html('<img class="no1" src="images/icon_manage_chart_no1.png">');
		$('.list:eq(1) > .lsPhoto').html('<img class="no1" src="images/icon_manage_chart_no2.png">');
		$('.list:eq(2) > .lsPhoto').html('<img class="no1" src="images/icon_manage_chart_no3.png">');

		//超过50%标亮
		console.log($('.lsCircle').size());
		var lsCircleSize = $('.lsCircle').size();
		for (var i=0; i<lsCircleSize; i++) {
			console.log($('.lsCircle').eq(i).attr('id'));
			if($('.lsCircle').eq(i).attr('id') >= 50){
				$('.lsCircle').eq(i).css('color','#3573B3');
			} 
			
		}

		//画圆
		var clientWidth = document.documentElement.clientWidth;
	    var canvasWidth = Math.floor(clientWidth/375*70);
	    var canvasRadius = Math.floor(clientWidth/375*32);
	    var canvasRadius2 = Math.floor(clientWidth/375*29);
	    var canvasArc = Math.floor(clientWidth/375*6);
	    var lsCircle = document.getElementsByClassName('lsCircle');
		for (var i=0; i<lsCircle.length; i++) {
			if(lsCircle[i].getAttribute('id') >= 50){
				var colors = ['#DCE7F8','#95CAFD','#DCE7F8'];
			} else {
				var colors = ['#F5F5F5','#D6D6D6','#F5F5F5'];
			}
			var opts = {
				parent: lsCircle[i],
				perent: lsCircle[i].	getAttribute('id'),
				color: colors
			}
			drawRing(opts, (-lsCircle[i].getAttribute('id')+60), canvasWidth, canvasRadius, canvasRadius2, canvasArc);
		}
	});
};
