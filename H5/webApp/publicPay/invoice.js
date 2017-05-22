/**
 * Created by Administrator on 2016/8/23.
 */
var orderNo = request('orderNo');
var unionId = request('unionId');


// 开票要传的的信息
var userName;
var userPhone;
var invoiceType;
var invoiceTitle;
var invoiceAddress;
var invoiceRemarks;


$(function(){
    //查看开票状态
    $.getJSON(baseUrl + 'findInvoiceDetailByUnionId',{
        'unionId': unionId,
        'orderNo': orderNo
    },function (data) {
        //console.log("findInvoiceDetailByUnionId",data)

        if (data.status == '200' && data.msg == '未填写') {// 200未填写发票
            // 填写信息
            handle(data);

            // 获取表单信息
            $('#userName').val( data.data.name );        // 收件人姓名
            $('#userPhone').val( data.data.mobile );     // 手机
            $('#invoiceTitle').val( data.data.invoiceTitle );        // 发票抬头
            $('#invoiceAddress').val( data.data.invoiceAddress );    // 发票地址

            // 发票类型
            if(data.data.invoiceType == "服务费"){
                $("#invoiceFw").attr('class','icon-circle blue').siblings().attr('class','icon-circle');
            }else{
                $("#invoiceZx").attr('class','icon-circle blue').siblings().attr('class','icon-circle');
            }
        } else if (data.status == '200' && data.msg == '已填写') {
            // 获取表单信息
            readInfo(data);

        } else if (data.status == '777') {
            // 填写信息
            handle(data);
        } else if (data.status == '500') {
            // 填写信息
            handle(data)
        } else {
            // 填写信息
            handle(data)
        }
    });

    // 个人信息读取
    function readInfo(data){
        // 获取表单信息
        $('#userName').val( data.data.name );        // 收件人姓名
        $('#userPhone').val( data.data.mobile );     // 手机
        $('#invoiceTitle').val( data.data.invoiceTitle );        // 发票抬头
        $('#invoiceAddress').val( data.data.invoiceAddress );    // 发票地址

        // 发票类型
        if(data.data.invoiceType == "服务费"){
            $("#invoiceFw").attr('class','icon-circle blue').siblings().attr('class','icon-circle');
        }else{
            $("#invoiceZx").attr('class','icon-circle blue').siblings().attr('class','icon-circle');
        }

        // 禁止再次提交
        $('#enroll span').html('已开出').css({"color":'#b8b8b8','backgroundColor':'#e0e0e0'});
        $('input').attr("readonly","true");
    }

    //填写信息
    function handle(data){
        $('.select i').each(function(){
            $(this).click(function(){
                $(this).addClass('blue').siblings().attr('class','icon-circle');
            });
        });
        // 验证表单填写格式是否正确
        $('#userName').blur(function(){            // 姓名
            cue($(this).val(),$(this));
        });

        $('#userPhone').blur(function(){           // 手机号

            var regMobile = /^[0|2-9]\d{4,16}$/;
            var regMobile11 = /^1\d{10}$/;
            if (regMobile.test($(this).val())) {
                cue(regMobile.test($(this).val()),$(this));
            }else if (regMobile11.test($(this).val())) {
                cue(regMobile11.test($(this).val()),$(this));
            }else{
                cue(false,$(this));
            };
        });

        //$('#userEmail').blur(function(){            // 邮箱
        //    var regMobile= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //    cue(regMobile.test($(this).val()),$(this));
        //});

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
            $('#userPhone').val() != ''   &                         // 手机
            $('#invoiceTitle').val() != ''   &                         // 发票抬头
            $('#invoiceAddress').val()   != ''  )? false:true;           // 邮箱

            if($('.icon-exclamation-sign').hasClass('icon-exclamation-sign')){  //是否有错误标志
                //showTip('请填写正确信息！');
                return false;
            } else if( judge ){     //  判断是否有空项
                //showTip('请输入空缺信息！');
                return false;
            }

            // 获取表单信息
            userName = $('#userName').val();        // 收件人姓名
            userPhone = $('#userPhone').val();     // 手机
            invoiceType = $("#invoiceType .blue").html(); // 发票类型
            invoiceTitle = $('#invoiceTitle').val();        // 发票抬头
            invoiceAddress = $('#invoiceAddress').val();    // 发票地址
            invoiceRemarks = $('#invoiceRemarks').val();            // 发票备注
        };

        $('#enroll').click(function(){
            //检测填写信息
            if( check()==false ){return false;}

            if(confirm("确认提交信息")){
                $.getJSON(baseUrl + 'updateOrderByOrderNo',{
                    'orderNo':orderNo,
                    'invoiceType': invoiceType,
                    'invoiceAddress': invoiceAddress,
                    'invoiceTitle': invoiceTitle,
                    'invoiceRemarks': invoiceRemarks,
                    'name': userName,
                    'mobile': userPhone
                },function(data){
                    if(data.msg == '索要成功' && data.status == '200'){
                        //console.log(data)
                        $('#enroll').click(function(){return false;});
                        showTip('提交成功^_^');
                        // 禁止再次提交
                        $('#enroll').html('已开出').css({"color":'#b8b8b8','backgroundColor':'#e0e0e0'});
                        $('input').attr("readonly","true");
                        location.reload();
                    } else {
                        showTip(data.msg);
                    }
                });
            }


        });
    }


    // 提示信息
    function showTip(title){
        if( $('#dialog') ){$('#dialog').remove();}
        var body = "";
        body += "<div class='weui_dialog_alert' id='dialog' style='display: none;' >";
        body += "<div class='weui_mask'></div>";
        body += "<div class='weui_dialog'>";
        body += "<div class='weui_dialog_hd'><strong class='weui_dialog_title'>温馨提示</strong></div>";
        body += "<div class='weui_dialog_bd'>" + title + "</div>";
        body += "<div class='weui_dialog_ft'>";
        body += " <a href='javascript:;' class='weui_btn_dialog primary' style='color: #3573B3'>确定</a>";
        body += "</div>";
        body += "</div>";
        body += "</div>";
        $("body").append(body);
        var $dialog = $('#dialog');
        $dialog.show();
        $dialog.find('.weui_btn_dialog').one('click', function () {
            $dialog.hide();
        });
    };

});
