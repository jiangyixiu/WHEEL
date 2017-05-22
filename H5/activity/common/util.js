//定义常量，接口主机
var webAppUrl = 'http://www.chazuomba.com/files/';
//var webAppUrlPhp = 'http://api.chazuomba.com/manage/Web/'; //php页面目录
//var webAppUrlPhp = 'http://api.chazuomba.com/manageTest/Web/';//php测试页面目录
var webAppUrlPhp = 'http://sslapi.chazuomba.com/';//php测试页面目录测试
//var webAppUrlPhp = 'http://testapi.chazuomba.com/';//php测试页面目录测试
var baseUrl = 'https://www.chazuomba.com/iserver/app/';//JAVA统一接口

/**
 * @name jQuery ajax请求封装（请求JAVA接口）
 * @param {String} funcName 请求接口名称
 * @param {Object} data 接口参数
 * @param {Function} cb 请求成功回调
 */
function getAjaxData(funcName, data, cb){
	$.ajax({
		type: "GET",
		url: baseUrl + funcName,
		data: data,
		async: true,
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
		success: function(data){
			cb && cb(data);
		}
	});
}
//Ajax请求接口
var phpRequest = function(params, url) {
	$.ajax({
		type: params.method || 'GET',
		url: url,
		data: params.data || {},
		cache: params.cache || false,
		success: function(res) {
			params.success && params.success(res);
		}
	});
};
//Angular请求接口
var phpRequestA = function($http, params, url) {
	$http({
		method:  params.method || 'GET',
		url: url,
		params: params.data || {}
	}).success(function(res){
		params.success && params.success(res);
	}).error(function(res){
		params.error && params.error(res);
	});
};
(function() { // 尺寸适配
	function sy() {
		var Html = document.getElementsByTagName('html')[0];
		var w = document.documentElement.clientWidth;
		var scale = w / 375;
		if(scale >= 2) {
			scale = 2
		}
		Html.style.fontSize = 12 * scale + 'px';
	}
	sy();
	window.onresize = function() {
		sy()
	};
})();
// 截取url参数
function request(paras, url) {
    url = url || location.href;
    var index = url.indexOf("?");
    if(index == -1){
    	return "";
    }
    var paraString = url.substring(index + 1).split("&");
    var paraObj = {};
    for(var i in paraString){
    	j = paraString[i];
    	paraObj[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1);
    }
    var returnValue = paraObj[paras];
    if(typeof(returnValue) == "undefined"){
    	returnValue = "";
    }
    return returnValue;
}