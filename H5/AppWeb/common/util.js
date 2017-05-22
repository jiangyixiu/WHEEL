var protocol = document.location.protocol;
//定义常量，接口主机
var webAppUrl = 'http://www.chazuomba.com/files/webApp/'; //官网一级目录
//var webAppUrlPhp = 'http://api.chazuomba.com/manage/Web/'; //php页面目录
//var webAppUrlPhp = 'http://api.chazuomba.com/manageTest/Web/';//php测试页面目录
var webAppUrlPhp = protocol+'//sslapi.chazuomba.com/';//php测试页面目录测试
//var webAppUrlPhp = 'http://testapi.chazuomba.com/';//php测试页面目录测试
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
}
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
}
//查询企业用户课程列表 
var getCatalogListA = function($http, params) {
	phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyCatalogList')
}
//根据课程id查询信息图表
var getChartData = function(params) {
	phpRequest(params, webAppUrlPhp + 'CompanyAdmin/companyStatChartByCatalog')
}
var getChartDataA = function($http, params) {
	phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyStatChartByCatalog')
}
//根据课程id查询每日学习数据
var getListeningData = function(params) {
	phpRequest(params, webAppUrlPhp + 'CompanyAdmin/companyStatParticularByCatalog')
}
var getListeningDataA = function($http, params) {
	phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyStatParticularByCatalog')
}
// 根据课程id查询排行榜详细
var getRankingA = function ($http, params) {
    phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyRankingListByCatalog')
}
//查询排行榜 前三名
var getTopThree = function (params) {
    phpRequest(params,webAppUrlPhp + 'CompanyAdmin/companyRankingListByCatalogLimit')
}
var getTopThreeA = function($http, params) {
	phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyRankingListByCatalogLimit')
}
// 根据培训id查询排行榜中某一个用户的详情
var getPersonalA = function ($http, params) {
    phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyStudyParticularEmployeeByCatalog')
}
// 查询企业用户培训列表
var getTrainingListA = function ($http, params) {
    phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyCultivateList')
}
// 根据课程id查询用户时间轴列表
var getTimeAxisA = function ($http, params) {
    phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyEmployeeStudyInfoByCultivate')
}
// 吸收率
var getAbsorb = function ($http, params) {
    phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyTicketRankingListByCultivate')
}
//平均学习进度
var getAverageLearning = function ($http, params) {
    phpRequestA($http, params, webAppUrlPhp + 'CompanyAdmin/companyRankingListByCultivate')
}
/**
 * 时间转换展示
 * @param {Date} tm
 * 展示规则：
 * 不满 1小时显示“x 分钟前更新”
 * 不满 1天显示“x 小时前更新”
 * 不满 30天显示“x 天前更新”
 * 满整月则显示“ x 个月前更新”
 * 当课程更新完成时
 */
function showUpdateTime(tm) {
	var time = new Date(tm).getTime();
	if(isNaN(time)) {
		console.log('传入日期格式有误：' + tm);
		return;
	}
	var nowTime = new Date().getTime();
	var ntime = (nowTime - time) / 1000;
	var day = Math.floor(ntime / 86400);
	var hour = Math.floor(ntime % 86400 / 3600);
	var minute = Math.floor(ntime % 3600 / 60);
	var second = Math.floor(ntime % 60);
	var showTime = '';
	if(day > 30) {
		showTime = day % 30 + '个月前更新';
	} else if(day > 0) {
		showTime = day + '天前更新';
	} else {
		if(hour > 0) {
			showTime = hour + '小时前更新';
		} else {
			if(minute == 0) {
				minute = 1;
			}
			showTime = minute + '分钟前更新';
		}
	}
	return showTime;
}
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

//canvas百分比圆
function drawRing(opts, speed, canvasWidth, canvasRadius, canvasRadius2, canvasArc) {
    var _opts = {
        parent: document.body,
        width: canvasWidth,
        radius: canvasRadius,
        arc: canvasArc,
        perent: 40,
        color: ['#F5F5F5','#3573B3','#DCE7F8'],
        textColor: '#000',
        textSize: '10px',
        animated: true,
        after: function() {}
    }, k;
    for (k in opts) _opts[k] = opts[k];

    var parent = _opts.parent,
        width = _opts.width,
        radius = _opts.radius,
        arc = _opts.arc,
        perent = parseFloat(_opts.perent),
        color = _opts.color,
        textSize = _opts.textSize,
        textColor = _opts.textColor,
        c = document.createElement('canvas'),
        ctx = null,
        x = 0,
        animated = _opts.animated,
        after = _opts.after;

    parent.appendChild(c);
    ctx = c.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = width;

    function clearFill() {
        ctx.clearRect(0, 0, width, width);
    }

    function fillBG() {
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.lineWidth = arc;
        ctx.strokeStyle = color[0];
        ctx.arc(width / 2, width / 2, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function fillArc(x) {
        ctx.beginPath();
        ctx.lineWidth = arc;
        ctx.strokeStyle = color[1];
        ctx.arc(width / 2, width / 2, radius, -90 * Math.PI / 180, (x * 3.6 - 90) * Math.PI / 180);
        ctx.stroke();
    }

    // function fillSector(x) {
    // 	var ss= x*3.6-90;
    //     var x = canvasWidth/2, y=canvasWidth/2, radius=canvasRadius2, sDeg=-90*Math.PI/180, eDeg = Math.PI/180*ss;
		// ctx.fillStyle = color[2];
		// // 初始保存
		// ctx.save();
		// // 位移到目标点
		// ctx.translate(x, y);
		// ctx.beginPath();
		// // 画出圆弧
		// ctx.arc(0,0,radius,sDeg, eDeg);
		// // 再次保存以备旋转
		// ctx.save();
		// // 旋转至起始角度
		// ctx.rotate(eDeg);
		// // 移动到终点，准备连接终点与圆心
		// ctx.moveTo(radius,0);
		// // 连接到圆心
		// ctx.lineTo(0,0);
		// // 还原
		// ctx.restore();
		// // 旋转至起点角度
		// ctx.rotate(sDeg);
		// // 从圆心连接到起点
		// ctx.lineTo(radius,0);
		// ctx.closePath();
		// // 还原到最初保存的状态
		// ctx.restore();
		// ctx.fill();
    // }

    var circleText = document.body;
    function fillText(x) {
        circleText.innerHTML = '&nbsp;' + x + '<i>%</i>';
    }

    function fill(x) {
        fillBG();
        fillArc(x);
        // fillSector(x);
        // fillText(x);
    }

    if (!animated) return fill(perent);

    fill(x);
    !function animate() {
        if (++x > perent) return after && after();
        setTimeout(animate, speed);
        clearFill();
        fill(x);
    }();
}