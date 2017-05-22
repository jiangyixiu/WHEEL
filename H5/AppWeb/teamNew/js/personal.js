var companyId = request('companyId');
var catalogId = request('catalogId');
var companyCultivateId = request('companyCultivateId');
var employeeId = request('employeeId');
var app = angular.module('myApp',[]);
var list={},listPage=[],nn=[],page=1,s = [];
app.controller('getList', function($http, $scope) {
    getList($http, $scope, companyId, employeeId, companyCultivateId, catalogId, page)
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
//查询排行榜中某一个用户的详情
function getList($http, $scope, companyId, employeeId, companyCultivateId, catalogId, page){
    getPersonalA($http,{
        data: {
            companyId: companyId,
            employeeId: employeeId,
            companyCultivateId: companyCultivateId,
            catalogId: catalogId,
            page: page
        }, success: function (res){
            list = res.data;
         	$scope.data = list;
//		 	$scope.list = list.list;
         	if(list.list[0]){
         		$scope.nolists= false;
                paging($http, $scope, companyId, employeeId, companyCultivateId, catalogId, page, list);
         	}else{
         		if(page == 1){
         			$scope.nolists= true;
         		}
         	}
        }
    });
}
//下拉加载下一页
function paging($http, $scope, companyId, employeeId, companyCultivateId, catalogId, page, data) {
    function kk(data, i) {
        return data.list[i].time;
    }
    for(var i = 0; i < data.list.length; i++) {
//		console.log(nn[i])
        if(nn[i]) {
            if(nn[i].indexOf(data.list[i].time) == -1) {
                listPage.push(data.list[i]);
//				console.log(data.list[i].time)
//				console.log(nn[i])
            } else {
//				console.log(listPage[listPage.length - 1])
//				console.log(data.list[i].data)
                listPage[listPage.length - 1].data = listPage[listPage.length - 1].data.concat(data.list[i].data);
            }
        } else {
            for(var i = 0; i < data.list.length; i++) {
                nn.unshift(kk(data, i));
                listPage.push(data.list[i]);
            }
        }
    }
    $scope.lists = listPage;
    $(document).on("scroll", function() {
        var viewH = $(window).height(), //视口高度
            contentH = $(this).height(), //内容高度
            scrollTop = $(this).scrollTop(); //滚动高度
        if(contentH <= (scrollTop + viewH) && s.indexOf(page) == -1 && list.list[0]) { //到达底部100px时,加载新内容
            s.push(page);
            getList($http, $scope, companyId, employeeId, companyCultivateId, catalogId, ++page);
            return false;
        }
    });
}