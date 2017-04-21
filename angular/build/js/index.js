'use strict';

angular.module('app', ['ui.router']);

'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
}).state('position', {
    url: '/position/:id',
    templateUrl: 'view/position.html',
    controller: 'positionCtrl'
});
  $urlRouterProvider.otherwise('main');
}]);

'use strict';

angular.module('app').controller('mainCtrl', ['$scope', function($scope) {
    $scope.list = [{
            id: '123',
            name: '销售',
            imgSrc: 'images/postman.jpg',
            companyName: 'postman',
            city: '上海',
            industry: '互联网',
            time: '2016-06-1 11:6'
        },
        {
            id: '124',
            name: 'web前端',
            imgSrc: 'images/timg.jpeg',
            companyName: 'html,css,js',
            city: '北京',
            industry: '互联网',
            time: '2016-03 11:6'
        }
    ];
}]);

'use strict';

angular.module('app').controller('positionCtrl', ['$scope', function($scope) {

}]);

'use strict';
angular.module('app').directive('appFoot', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}]);

'use strict';

angular.module('app').directive('appHead', [function() {
  return {
    restrict: 'A',
    replacr: true,
    templateUrl: 'view/template/head.html'
  };
}]);

'use strict';

angular.module('app').directive('appHeadBar', [function() {
  return {
    restrict: 'A',
    replacr: true,
    templateUrl: 'view/template/headBar.html',
    scope: {
        text: '@'
    },
    link: function ($scope) {
        $scope.back = function () {
            window.history.back();
        }
    }
  };
}]);

'use strict';
angular.module('app').directive('appPositionInfo', [function () {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionInfo.html'
  }
}]);

'use strict';
angular.module('app').directive('appPositionList', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionList.html',
    scope: {
      data: '='
    }
  };
}]);
