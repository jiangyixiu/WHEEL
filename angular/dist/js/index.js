"use strict";angular.module("app",["ui.router"]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}),e.otherwise("main")}]),angular.module("app").controller("mainCtrl",["$scope",function(t){t.list=[{id:"123",name:"销售",imgSrc:"images/postman.jpg",companyName:"postman",city:"上海",industry:"互联网",time:"2016-06-1 11:6"},{id:"124",name:"web前端",imgSrc:"images/timg.jpeg",companyName:"html,css,js",city:"北京",industry:"互联网",time:"2016-03 11:6"}]}]),angular.module("app").controller("positionCtrl",["$scope",function(t){}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replacr:!0,templateUrl:"view/template/head.html"}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replacr:!0,templateUrl:"view/template/headBar.html",scope:{text:"@"},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionInfo",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html"}}]),angular.module("app").directive("appPositionList",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"="}}}]);