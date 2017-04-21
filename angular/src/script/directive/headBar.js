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
