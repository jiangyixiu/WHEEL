/**
 * Created by Administrator on 2016/11/24.
 */

//测试环境
//var baseUrl = "http://test.chazuomba.com:8080/iserver/app/";
//var baseUrl = "http://192.168.1.24:8080/iserver/app/";
//var webAppUrl = 'http://www.chazuomba.com/files/hehe/webApp/';
////php
//var baseUrlphp = "http://testapi.chazuomba.com/ExamByHtml/";


//生产环境
var baseUrl = 'http://www.chazuomba.com/iserver/app/';
var webAppUrl = 'http://www.chazuomba.com/files/webApp/';
//php
var baseUrlphp = "http://api.chazuomba.com/ExamByHtml/";
//var appid        = 'wxa3069b403f0a23af';//////好多课
var appid        = 'wx1541ccc024a8e057';//////插坐学院
var appserct = '75d268f0c231302e9d70755116e16347';//////插坐学院
// 尺寸适配
(function(){
    function sy(){
        var Html = document.getElementsByTagName('html')[0];
        var w = document.documentElement.clientWidth;
        var scale = w / 375;
        if (scale >= 2) {scale = 2}
        Html.style.fontSize = 14*scale + 'px';
    }sy();
    window.onresize = function(){sy()};
})();

// 解决js url乱码问题
function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {};
    for (var i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}

//loading
function loading(judge){
    if(judge){
        $('div').hide();
        $('body').append('<img class="loading" src="http://www.chazuomba.com/files/webApp/images/loading.gif" style="width: 10rem; position: fixed; top:0; right: 0; bottom: 0; left: 0; margin: auto"/>');
    }else{
        $('div').show();
        $('.loading').remove();
    }
}

function getAjaxData(funcName, data, cb){
    $.ajax({
        type: "GET",
        url: baseUrlphp + funcName,
        data: data,
        async:true,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
        success: function(data){
            cb && cb(data);
        }
    });
}