var navigateTo = function (param) {
	var message = { 
					'method' : 'navigateTo',
					'param'  : param
				   };
    invokeNative(message);
}

var navigateBack = function (param) {
	var message = { 
					'method' : 'navigateBack',
					'param'  : param
				   };
    invokeNative(message);
}

var showModal_completionHandler;
var showModal = function (param) {
	showModal_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'showModal_completionHandler';
	var message = { 
					'method' : 'showModal',
					'param'  : param
				   };
    invokeNative(message);
}

var showToast = function (param) {
	var message = { 
					'method' : 'showToast',
					'param'  : param
				   };
    invokeNative(message);
}

var showActionSheet_completionHandler;
var showActionSheet = function (param) {
	showActionSheet_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'showActionSheet_completionHandler';
	var message = { 
					'method' : 'showActionSheet',
					'param'  : param
				   };
    invokeNative(message);
}

var setStorage_completionHandler;
var setStorage = function (param) {
	setStorage_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'setStorage_completionHandler';
	var message = { 
					'method' : 'setStorage',
					'param'  : param
				   };
    invokeNative(message);
}

var getStorage_completionHandler;
var getStorage = function (param) {
	getStorage_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'getStorage_completionHandler';
	var message = { 
					'method' : 'getStorage',
					'param'  : param
				   };
    invokeNative(message);
}

var removeStorage_completionHandler;
var removeStorage = function (param) {
	removeStorage_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'removeStorage_completionHandler';
	var message = { 
					'method' : 'removeStorage',
					'param'  : param
				   };
    invokeNative(message);
}

var clearStorage_completionHandler;
var clearStorage = function (param) {
	clearStorage_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'clearStorage_completionHandler';
	var message = { 
					'method' : 'clearStorage',
					'param'  : param
				   };
    invokeNative(message);
}

var dictionaryRepresentation_completionHandler;
var dictionaryRepresentation = function (param) {
	dictionaryRepresentation_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'dictionaryRepresentation_completionHandler';
	var message = { 
					'method' : 'dictionaryRepresentation',
					'param'  : param
				   };
    invokeNative(message);
}

var getSystemInfo_completionHandler;
var getSystemInfo = function (param) {
	getSystemInfo_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'getSystemInfo_completionHandler';
	var message = { 
					'method' : 'getSystemInfo',
					'param'  : param
				   };
    invokeNative(message);
}

var getNetworkType_completionHandler;
var getNetworkType = function (param) {
	getNetworkType_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'getNetworkType_completionHandler';
	var message = { 
					'method' : 'getNetworkType',
					'param'  : param
				   };
    invokeNative(message);
}

var makePhoneCall_completionHandler;
var makePhoneCall = function (param) {
	makePhoneCall_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'makePhoneCall_completionHandler';
	var message = { 
					'method' : 'makePhoneCall',
					'param'  : param
				   };
    invokeNative(message);
}

var setWindowColor_completionHandler;
var setWindowColor = function (param) {
	setWindowColor_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'setWindowColor_completionHandler';
	var message = { 
					'method' : 'setWindowColor',
					'param'  : param
				   };
    invokeNative(message);
}

var chaZuoApp_invoked_completionHandler;
var chaZuoApp_invoked = function (method_name,param) {
	callNative_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'chaZuoApp_invoked_completionHandler';
	var message = { 
					'method' : method_name,
					'param'  : param
				   };
    invokeNative(message);
}
var removeAllWebsiteDataTypes_completionHandler;
var removeAllWebsiteDataTypes = function (param) {
	removeAllWebsiteDataTypes_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'removeAllWebsiteDataTypes_completionHandler';
	var message = { 
					'method' : 'removeAllWebsiteDataTypes',
					'param'  : param
				   };
    invokeNative(message);
}
var invokeNative = function (message) {
	var isIos = false;
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/iPhone\sOS/i) == "iphone os" || navigator.userAgent.indexOf("iPad") != -1) {
		isIos = true;
	}
	if(isIos){
		window.webkit.messageHandlers.chaZuoApp.postMessage(message);
	}
}

// 业务代码
var toPay_completionHandler;
var toPay = function (method_name,param) {
	toPay_completionHandler = param['completionHandler'];
	param['completionHandler'] = 'toPay_completionHandler';
	var message = { 
					'method' : method_name,
					'param'  : param
				   };
    invokeNative(message);
}

