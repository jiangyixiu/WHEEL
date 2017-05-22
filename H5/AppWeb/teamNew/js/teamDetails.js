var companyId = request('companyId');
var companyCultivateId = request('companyCultivateId');

var app = angular.module('myApp',[]);
app.controller('rankingList',function($http, $scope){
	//获取数据
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
//获取数据
function getDate($http, $scope, companyId, companyCultivateId){
	getTimeAxisA( $http, {
		data: {
			companyId: companyId,
			companyCultivateId: companyCultivateId
		}, success: function(data){
			scopeOn($scope, data);
			pageJump();
			
			$scope.bars = data.data;
			//累计学习天数
			var past = new Date();
			var index = Date.parse(data.data.companyCultivate.study_start_at.replace(/-/g,'/'));
			var current = new Date(index);
			$scope.days = Math.ceil((past-current) / 1000 / 60 / 60 /24) < 0 ? "0" : Math.ceil((past-current) / 1000 / 60 / 60 /24);
//			$scope.days = Math.ceil((past-current) / 1000 / 60 / 60 /24);
		}
	});
}

function scopeOn($scope, data){
	
	
	$scope.$on('ngBarFinished', function () {
		
	});
	
	var avg_study = Math.round(data.data.avg_study*100);
	var avg_ticket = Math.round(data.data.avg_ticket);
	
    var avCircle = document.getElementsByClassName('avCircle')[0];
    var abCircle = document.getElementsByClassName('abCircle')[0];
    if($('.average').attr('id') >= 50){
    		var avColor = ['#DCE7F8','#95CAFD','#DCE7F8'];
    }else{
    		var avColor = ['#F5F5F5','#D6D6D6','#F5F5F5'];
    }
    if($('.absorb').attr('id') >= 50){
    		var abColor = ['#DCE7F8','#95CAFD','#DCE7F8'];
    }else{
    		var abColor = ['#F5F5F5','#D6D6D6','#F5F5F5'];
    }
	pieChart(avg_study, avCircle, avColor)
	pieChart(avg_ticket, abCircle, abColor)
}

//canvas画圆
function pieChart(avg, obj, colors){
		var clientWidth = document.documentElement.clientWidth;
	    var canvasWidth = Math.floor(clientWidth/375*100);
	    var canvasRadius = Math.floor(clientWidth/375*44);
	    var canvasRadius2 = Math.floor(clientWidth/375*40);
	    var canvasArc = Math.floor(clientWidth/375*10);
	    
	    var opts = {
				parent: obj,
				perent: avg,
				color: colors
			}
		drawRing(opts, 7, canvasWidth, canvasRadius, canvasRadius2, canvasArc);
};

//页面跳转
function pageJump() {
	$('.average').on('click', function(i){
		_czc.push(["_trackEvent", "1", "学习进度", "团队"]);
		window.location.href = 'teamPersonal.html?companyId=' + companyId +'&companyCultivateId=' + companyCultivateId;
	});
	$('.absorb').on('click', function(i){
		_czc.push(["_trackEvent", "1", "吸收率", "团队"]);
		window.location.href = 'absorb.html?companyId=' + companyId +'&companyCultivateId=' + companyCultivateId;
	});
}
