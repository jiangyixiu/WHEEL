'use strict';

angular.module('app').directive('appHead', [function() {
  return {
    restrict: 'A',
    replacr: true,
    templateUrl: 'view/template/head.html'
  };
}]);
