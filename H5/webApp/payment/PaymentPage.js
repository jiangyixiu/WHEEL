/**
 * Created by Administrator on 2016/8/23.
 */
//  微信登陆
var isGift;
var buySelf = request("buySelf");//大课判断自己是否购买 1自己  0别人
if(buySelf=='0'){isGift='1'}else if(buySelf=='1'){isGift='0'}

//var code = request("code");
var courseId;
var from=0;


// 线上还是线下
var courseType = 0;


// 微信支付
var orderCode; // 订单号
var sign;      // 签名
var nonceStr;  // 随机字符串
var appid;     // appid
var prepayId;
var apiKey;
var unionId ;  // 微信唯一标识
var openid ;    // id
var wxName;    // 微信昵称
var avatar ;   // 微信头像
// 个人信息
var sex;  //性别选择
var userName;
var userWeiXin;
var userPhone;
var userJob;
var userCompany;
// 参课原因
var joinReason = "自我提升";
// 购买意向
var buyIntentions = "单次课程";
// 发票信息
var invoiceType = "";

var isCrowd;    //是否开启众筹
var isHidden;
var weixinSex;
var ticketStatus = 0;     // 是否使用奖学金

// 变量
//$("#showPayDiv").hide();
$("#maindiv").hide();
$(".courseName").hide();



var name;       // 用户姓名
var sex;        // 性别
var weixin;     // 性别
var mobile;     // 手机
var invoiceTitle;       // 发票抬头
var invoiceAddress;     // 发票地址
var invoiceRemarks;     // 发票备注
var work;                     // 公司名字
var job;                     // 职位
var content;        // 提问


var seriesCourse;  //判断（1是系列课，0不是系列课）

$(function(){
    if(buySelf == "0"){
//      $(".userinfoBg1").prepend('<li class="remind" style="color: #999;height: 2.2rem">＊下列类目请填写被赠送人的信息</li>');
        $(".nickname>span").text("好友姓名");
        $(".mobile>span").text("好友手机");
    }
    // 本地读取信息
    readInfo();
    showInfo();
    // 个人信息读取
    function readInfo(){
        unionId = $("#unionId").val();
        openid =  $("#openid").val();
        wxName =  $("#wxName").val();
        courseId = $("#courseId").val();
        weixinSex = $("#weixinSex").val();
        avatar = $("#avatar").val();
    };

    // 查询线下课程
    var URL = location.href.split('?')[1];
    function getQueryString(name,str) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = str.match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    courseId = $("#courseId").val();
    console.log(courseId)
    function showInfo(){
        $.getJSON(baseUrl + "findWebOfflineCourseInfo", {
            'client_version': '1',
            'device_id': '1',
            'platform': 'web',
            'courseId': courseId        // 线下课程id
        }, function (data) {

            // 展示信息
            //alert(data);
            var data = data.data;
            $(".title").html(data.title);

            //系列课发票隐藏
            if(data.title.indexOf("系列课") > 0){
                seriesCourse = 1;
            }else{
                seriesCourse = 0;
            }


            if(courseId != 951&&courseId != 1030&&courseId != 1031&&courseId != 1032&&courseId != 1029){
                //  判断有没有发起众筹
                $.getJSON(baseUrl + "checkCrowdfunding",{'client_version':'1','device_id':'1','platform':'web','unionId':unionId,'courseId':courseId}, function(data) {
                    if(data.data == "false"){

                    }else if(data.data == "have1"){
                        // 购买成功
                        var url = encodeURI("http://www.chazuomba.com/files/webApp/payment/paySuccess.html?unionId="+ unionId + "&orderCode=" + orderCode + "&openid=" + openid + "&courseId=" + courseId + "&type=0" + "&seriesCourse=" + seriesCourse);
                        window.location.href = url;
                    }
                    else if(data.data == "have2"){//通过众筹支付成功
                        var url = encodeURI("http://www.chazuomba.com/files/webApp/payment/paySuccess.html?unionId="+ unionId + "&orderCode=" + orderCode + "&openid=" + openid + "&courseId=" + courseId + "&type=1" + "&seriesCourse=" + seriesCourse);
                        window.location.href = url;
                    }
                });
            }else{
                var invoiceAddressHtml = '<li class="invoiceAddress"><span class="item">寄票地址</span><input type="text" name="invoiceAddress" id="invoiceAddress"></li>';
                $(".userinfoBg1").append(invoiceAddressHtml);
            }




            $("#showPayDiv").html("确认支付  ¥"+data.price);
            // 获取个人信息
            $.getJSON(baseUrl + "findUserInfoByUnionId", {
                'client_version': '1',
                'device_id': '1',
                'platform': 'web',
                'unionId': unionId        // 线下课程id
                //'unionId':'o-j8As3xI5VyNkRXUlUXMfo1QqTs'        // 线下课程id
            }, function (data) {
                var data = data.data;
                //console.log(data);
                //console.log(data.sex); 
                // 初始化信息
                initUserInfo(data);

            });

            if(data.newType == '1') {
                courseType = 1;
            }
        });
    };

    // 初始化用户信息
    function initUserInfo(data){
        // 设置性别
        if(data.sex == "男"){
            $("#sexMan").addClass('blue').siblings().attr('class','icon-circle');;
        }else{
            $("#sexWoman").addClass('blue').siblings().attr('class','icon-circle');;
        }
        $("#userName").attr("value",data.name);
        $("#userWeiXin").attr("value",data.weixin);
        $("#userPhone").attr("value",data.mobile);
        $("#userCompany").attr("value",data.company);
        $("#_userJob").attr("value",data.job);
        $("#invoiceAddress").attr("value",data.invoiceAddress);
    };

    // 查询ip网址
    var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random();
    $.getJSON(url, function(data){
        $("#ip").attr("value",data.Ip);
    });





    $('.select i').each(function(){
        $(this).click(function(){
            $(this).addClass('blue').siblings().attr('class','icon-circle');
        });
    });
    $('#cause>span').each(function(){
        $(this).click(function(){
            $(this).attr('class','selectBlue').siblings().attr('class','option');
        })
    });

    // 验证表单填写格式是否正确
    $('#userName').blur(function(){            // 姓名
        cue($(this).val(),$(this));
    });

    $('#userPhone').blur(function(){           // 手机号
        //var regMobile=/^0?1(3|5|7|8)\d{9}$/;
        //var regMobile = /^\d{11}$/;
        //var regMobile = /^\d|(1\d{10})$/;
        //cue(regMobile.test($(this).val()),$(this));

        var regMobile = /^[0|2-9]\d{4,16}$/;
        var regMobile11 = /^1\d{10}$/;
        if (regMobile.test($(this).val())) {
            console.log(11)
            cue(regMobile.test($(this).val()),$(this));
        }else if (regMobile11.test($(this).val())) {
            console.log(22)
            cue(regMobile11.test($(this).val()),$(this));
        }else{
            cue(false,$(this));
        };
    });



    // 标红标绿函数
    function cue(Boolean,obj){
        if(Boolean)
        {
            obj.parent().find('i').attr('class','icon-ok').css('color','#7ed321').show();
        } else {
            obj.parent().find('i').attr('class','icon-exclamation-sign').attr('wrong','wrong').css('color','red').show();

        }
        return false;
    }




    // 检测信息
    function check(){
        var judge = ($('#userName').val()  != ''   &            // 用户姓名
        $('#weixin').val()  != ''   &                           // weixin
        $('#invoiceAddress').val() != '' &
        $('#userPhone').val() != ''   ? true:false);            // 手机 // 职位
        var regMobile = /^[0|2-9]\d{4,16}$/;
	    var regMobile11 = /^1\d{10}$/;
	    if (regMobile.test($('#userPhone').val())) {
	        cue(regMobile.test($('#userPhone').val()),$(this));
	    }else if (regMobile11.test($('#userPhone').val())) {
	        cue(regMobile11.test($('#userPhone').val()),$(this));
	    }else{
	        cue(false,$('#userPhone'));
	    };
	    cue($("#userName").val(), $("#userName"));
        //console.log(judge)
        if( !judge ){     //  判断是否有空项
            if($("#userName").val() == ''){
            	showTip('请输入姓名', function(){
            		$("#userName").focus();
            	});
            } else if($('#userPhone').val() == ''){
            	showTip('请输入手机号', function(){
            		$("#userPhone").focus();
            	});
            } else if($('#invoiceAddress').val() == ''){
            	showTip('请输入寄票地址', function(){
            		$("#invoiceAddress").focus();
            	});
            }
            return false;
        } else if($('.icon-exclamation-sign').hasClass('icon-exclamation-sign')){  //是否有错误标志
            showTip('请填写正确信息！');
            return false;
        }

        name = $('#userName').val();        // 用户姓名
        sex = $('#_sex .blue').attr("sex");       // 性别
        weixin = $('#userWeiXin').val();    // weixin
        mobile = $('#userPhone').val();     // 手机
        job = $('#_userJob').val();                     // 职位
        // 获取表单信息
        userName = $('#userName').val();        // 用户姓名
        weixinSex = $('#_sex .blue').attr("sex");       // 性别
        userPhone = $('#userPhone').val();     // 手机
        invoiceAddress = $('#invoiceAddress').val();     // 邮寄地址
        work = $('#userCompany').val();                     // 公司名字
        userJob = $('#_userJob').val();                     // 职位
        joinReason = $('#cause .selectBlue').text();    // 参课原因
        content = $('#ask').val();                      // 提问
    };




    var mask = $('#mask');
    var weuiActionsheet = $('#weui_actionsheet');
    // 点击支付按钮
//  $('#showPayDiv').click(function(){
//  });
    // 隐藏函数
    function hideActionSheet(weuiActionsheet, mask) {
        weuiActionsheet.removeClass('weui_actionsheet_toggle');
        mask.removeClass('weui_fade_toggle');
        weuiActionsheet.on('transitionend', function () {
            mask.hide();
        }).on('webkitTransitionEnd', function () {
            mask.hide();
        })
    }

    // 微信支付
    //$("#wxPay").click(function(){
    $("#showPayDiv").click(function(){
        //检测填写信息
        if( check()==false ){return false;}

        $('#actionSheet_wrap').show();
        //getInvoiceInfo();
        // 添加内容
        weuiActionsheet.addClass('weui_actionsheet_toggle');
        mask.show().addClass('weui_fade_toggle').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
        });
        //  隐藏底部菜单
        $('#actionsheet_cancel').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
        });
        weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');
        $("#loadingToast").show();
        $.ajax({
            type: "POST",
            url:baseUrl + "saveWebCourseOrderNew",
            data: {
                "nickname":wxName,
                "avatar":avatar,
                "weixinSex":"man",
                "from":from,
                "ticketStatus":0,
                "invoiceType":invoiceType,
                "job":userJob,
                "name":name,
                "invoiceAddress": invoiceAddress,
                "sex":"man",
                "weixin":"moren",
                "mobile":mobile,
                "work":work,
                "content":content,
                "courseId":courseId,
                "unionid":unionId,
                "openid":openid,
                "weixinType":0,
                "isGift":isGift
            },
            success: function(data){
                beginPay(data);
            }
        })
    });
    // 进行支付
    function beginPay(data){
        //console.log(new Date());
        $("#loadingToast").hide();
        // 返回数据
        //alert(data.status);
        if(data.status == 800){
            if(data.data == 0){
                showTip("没有名额");
            }else{
                showTip("仅剩"+data.data+"个名额啦");
            }
        }else if(data.status == 900){
            showTip("众筹结束了哦，你咋进来的！！！");
        }else if(data.status == 700) {
            showTip(""+data.msg);
        }else if(data.status == 500){
            showTip("缺少信息了，重新报名一下试试吧^_^");
        }else if(data.status == 600){
            showTip(data.data + "已经报过这节课程啦^_^");

        }else if(data.status == 200){
            var data = data.data;
            orderCode = data.orderCode;
            sign = data.sign;
            nonceStr = data.nonceStr;
            appid = data.appid;
            prepayId = "prepay_id="+data.prepayId;
            apiKey = data.apiKey;
            // 判断浏览器是否加载完成
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        }
    };
    function onBridgeReady(){
        //console.log(new Date());
        // 当前时间戳
        var time=new Date().getTime();
        var timeStamp = ""+parseInt(time/1000);
        var string = "appId="+appid+"&nonceStr="+nonceStr+"&package="+prepayId+"&signType=MD5"+"&timeStamp="+timeStamp+"&key="+apiKey;
        var  paySign =  MD5(string).toUpperCase();
        WeixinJSBridge.invoke('getBrandWCPayRequest',{
            "appId" : appid,                           //公众号名称，由商户传入
            "timeStamp": timeStamp,                    //"1395712654",
            "nonceStr" : nonceStr,                    //随机串
            "package" : prepayId,
            "signType" : "MD5",                       //微信签名方式：
            "paySign" : paySign                       //微信签名
        },function(res){
            //使按钮能够被点击
            if(res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                setTimeout(function(){
                    if(courseType == 0){ // 线下
                        var url = encodeURI("http://www.chazuomba.com/files/webApp/payment/paySuccess.html?unionId="+ unionId + "&orderCode=" + orderCode + "&openid=" + openid + "&courseId=" + courseId + "&type=0" + "&seriesCourse=" + seriesCourse);
                    }else{
                        var url = encodeURI("http://www.chazuomba.com/files/webApp/payment/paySuccess.html?unionId="+ unionId + "&orderCode=" + orderCode + "&openid=" + openid + "&courseId=" + courseId + "&type=1" + "&seriesCourse=" + seriesCourse);
                    }

                    window.location.href = url;
                },100);
            }else {
				//$("#loadingToast").show();
				$.ajax({
					type: "POST",
					url:baseUrl + "saveWebCourseOrderNew",
					data: {
                        "nickname":wxName,
                        "avatar":avatar,
                        "weixinSex":"man",
                        "from":from,
                        "ticketStatus":0,
                        "invoiceType":invoiceType,
                        "job":userJob,
                        "name":name,
                        "sex":"man",
                        "weixin":"jyx41867",
                        "mobile":mobile,
                        "work":work,
                        "content":content,
                        "courseId":courseId,
                        "unionid":unionId,
                        "openid":openid,
						"weixinType":1
					},
					success: function(data){
                        if(data.status == 200){
                            var data = data.data;
                            var codeUrl = data.codeUrl;
                            //code_url  生成二维码
                            $("#additional").show();
							var str = "http://api.chazuomba.com/manage/Web/qrcode?url="+codeUrl;
							var imgurl = "<img src='"+str+"' />";
							$("#newQrcode").html(imgurl);
							
							  //显示二维码
                            var maxTop = $(document).height()-$(window).height()+200;
                            console.log(maxTop,$(document).height(),$(window).height())
                            $('html, body').animate({
                                scrollTop: maxTop
                            },111);

                        }
					}
				})
            }
        });
    };

    // 百度钱包支付
    $("#bdPay").click(function(){
        hideActionSheet(weuiActionsheet, mask);
        $("#loadingToast").show();

        var htmlUrl = encodeURI( paySuccess );
        //alert(htmlUrl);
        var options = {
            url:baseUrl + "saveBaiduOrder?url=" + htmlUrl + "&nickname=" + wxName + "&avatar=" + avatar + "&weixinSex=" + weixinSex + "&from=" + from + "&ticketStatus=0" + "&weixinType=0" +"&buyIntentions=" + "&invoiceType=" + invoiceType + "&name="+name+"&sex="+sex+"&weixin=" + weixin +"&mobile"+mobile+"&work="+work+"&joinReason="+joinReason+"&content="+content,
            success: function (data) {
                // 返回数据
                //alert(data.status);
                if(data.status == 800){
                    if(data.data == 0){
                        showTip("没有名额");
                    }else{
                        showTip("仅剩"+data.data+"个名额啦");
                    }
                }else if(data.status == 900){
                    showTip("众筹结束了哦，你咋进来的！！！");
                }else if(data.status == 700) {
                    showTip(data.msg);
                }else if(data.status == 500){
                    showTip("缺少信息了，重新报名一下试试吧^_^");
                }else if(data.status == 600){
                    showTip(data.data + "已经报过这节课程啦^_^");
                }else if(data.status == 200){
                    $("#loadingToast").hide();
                    window.location.href = data.data;
                }
            }
        };
        $("#loadingToast").hide();
        $("#form").ajaxSubmit(options);
    });

    // 发起众筹
    $("#zcPay").click(function(){
        hideActionSheet(weuiActionsheet, mask);
        $.getJSON(baseUrl+"checkCrowdfunding",{'client_version':'1','device_id':'1','platform':'web','unionId':unionId,'courseId':courseId}, function(data) {
            if(data.data == "false"){
                submitPay();
            }else{
                $("#loadingToast").hide();
                var url = encodeURI("publicPay.html?publicPayId=" + data.data + "&unionId="+ unionId + "&openid=" + openid +"&courseId=" + courseId);
                window.location.href = url;
            }
        });
    });
    function submitPay(){

        var options = {
            url:baseUrl + "saveCrowdfunding?nickname="  + wxName + "&weixinInfo="+ userName+ "&phone="+ userPhone + "&avatar=" + avatar + "&weixinSex=" + weixinSex + "&invoiceAddress=" + invoiceAddress ,
            success: function (data) {
                // 返回数据
                if(data.status == 800){
                    if(data.data == 0){
                        showTip("没有名额");
                    }else{
                        showTip("仅剩"+data.data+"个名额啦");
                    }
                }else if(data.status == 500){
                    showTip("缺少信息了，重新报名一下试试吧^_^");
                }else if(data.status == 600){
                    showTip(data.data + "已经报过这节课程啦^_^");
                }else if(data.status == 200){
                    $("#loadingToast").hide();
                    var url = encodeURI("html/publicPay/startPublicPay.html?publicPayId=" + data.data + "&unionId="+ unionId + "&openid=" + openid +  "&courseId=" + courseId);
                    window.location.href = url;
                }
            }
        };
        $("#form").ajaxSubmit(options);
    };

    function MD5(instring){
        var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
        var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

        /*
         * These are the functions you'll usually want to call
         * They take string arguments and return either hex or base-64 encoded strings
         */
        function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
        function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
        function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
        function hex_hmac_md5(k, d)
        { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
        function b64_hmac_md5(k, d)
        { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
        function any_hmac_md5(k, d, e)
        { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

        /*
         * Perform a simple self-test to see if the VM is working
         */
        function md5_vm_test()
        {
            return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        }

        /*
         * Calculate the MD5 of a raw string
         */
        function rstr_md5(s)
        {
            return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
        }

        /*
         * Calculate the HMAC-MD5, of a key and some data (raw strings)
         */
        function rstr_hmac_md5(key, data)
        {
            var bkey = rstr2binl(key);
            if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

            var ipad = Array(16), opad = Array(16);
            for(var i = 0; i < 16; i++)
            {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }

            var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
            return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
        }

        /*
         * Convert a raw string to a hex string
         */
        function rstr2hex(input)
        {
            try { hexcase } catch(e) { hexcase=0; }
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for(var i = 0; i < input.length; i++)
            {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                +  hex_tab.charAt( x        & 0x0F);
            }
            return output;
        }

        /*
         * Convert a raw string to a base-64 string
         */
        function rstr2b64(input)
        {
            try { b64pad } catch(e) { b64pad=''; }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for(var i = 0; i < len; i += 3)
            {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
                for(var j = 0; j < 4; j++)
                {
                    if(i * 8 + j * 6 > input.length * 8) output += b64pad;
                    else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
                }
            }
            return output;
        }

        /*
         * Convert a raw string to an arbitrary string encoding
         */
        function rstr2any(input, encoding)
        {
            var divisor = encoding.length;
            var i, j, q, x, quotient;

            /* Convert to an array of 16-bit big-endian values, forming the dividend */
            var dividend = Array(Math.ceil(input.length / 2));
            for(i = 0; i < dividend.length; i++)
            {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }

            /*
             * Repeatedly perform a long division. The binary array forms the dividend,
             * the length of the encoding is the divisor. Once computed, the quotient
             * forms the dividend for the next step. All remainders are stored for later
             * use.
             */
            var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for(j = 0; j < full_length; j++)
            {
                quotient = Array();
                x = 0;
                for(i = 0; i < dividend.length; i++)
                {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if(quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }

            /* Convert the remainders to the output string */
            var output = "";
            for(i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);

            return output;
        }

        /*
         * Encode a string as utf-8.
         * For efficiency, this assumes the input is valid utf-16.
         */
        function str2rstr_utf8(input)
        {
            var output = "";
            var i = -1;
            var x, y;

            while(++i < input.length)
            {
                /* Decode utf-16 surrogate pairs */
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
                {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }

                /* Encode output as utf-8 */
                if(x <= 0x7F)
                    output += String.fromCharCode(x);
                else if(x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                        0x80 | ( x         & 0x3F));
                else if(x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                        0x80 | ((x >>> 6 ) & 0x3F),
                        0x80 | ( x         & 0x3F));
                else if(x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                        0x80 | ((x >>> 12) & 0x3F),
                        0x80 | ((x >>> 6 ) & 0x3F),
                        0x80 | ( x         & 0x3F));
            }
            return output;
        }

        /*
         * Encode a string as utf-16
         */
        function str2rstr_utf16le(input)
        {
            var output = "";
            for(var i = 0; i < input.length; i++)
                output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                    (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        }

        function str2rstr_utf16be(input)
        {
            var output = "";
            for(var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                    input.charCodeAt(i)        & 0xFF);
            return output;
        }

        /*
         * Convert a raw string to an array of little-endian words
         * Characters >255 have their high-byte silently ignored.
         */
        function rstr2binl(input)
        {
            var output = Array(input.length >> 2);
            for(var i = 0; i < output.length; i++)
                output[i] = 0;
            for(var i = 0; i < input.length * 8; i += 8)
                output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
            return output;
        }

        /*
         * Convert an array of little-endian words to a string
         */
        function binl2rstr(input)
        {
            var output = "";
            for(var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
            return output;
        }

        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length.
         */
        function binl_md5(x, len)
        {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;

            var a =  1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d =  271733878;

            for(var i = 0; i < x.length; i += 16)
            {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;

                a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
                d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
                b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
                d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
                c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
                d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
                d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

                a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
                d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
                c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
                b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
                d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
                c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
                d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
                c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
                a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
                d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
                c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
                b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

                a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
                d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
                b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
                d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
                c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
                d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
                a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
                d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
                b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

                a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
                d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
                c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
                d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
                d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
                a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
                d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
                b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);
        }

        /*
         * These functions implement the four basic operations the algorithm uses.
         */
        function md5_cmn(q, a, b, x, s, t)
        {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
        }
        function md5_ff(a, b, c, d, x, s, t)
        {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        function md5_gg(a, b, c, d, x, s, t)
        {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        function md5_hh(a, b, c, d, x, s, t)
        {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5_ii(a, b, c, d, x, s, t)
        {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y)
        {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        function bit_rol(num, cnt)
        {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        return hex_md5(instring);
    };

});