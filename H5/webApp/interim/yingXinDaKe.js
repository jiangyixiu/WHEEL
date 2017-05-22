/**
 * Created by Administrator on 2016/10/21.
 */
UserIp()//添加getUserIp库

$(function(){

    scrolls($('#enroll'),220);
    
    //点击简章
    $('.btn-primary').click(function(){
        getUserIp(951,1);    //统计点击次数
        var url = webAppUrl+'offlineCourseContent.html?id=951&isOver=1'
        window.location.href = url;
    });
    //获取嘉宾
    $.ajax({
        type:"get",
        url: baseUrl+"getTeacherListForDaKe?page=1&employeeId=1",
        data:{},
        async:true,
        dataType:"json",
        success:function(data){
            console.log(data)
            var length = data.data.length;
                var htmlStr = '';
                for (var i=0; i<length; i++){
                    var imgUrl = data.data[i].cover;
                    var name = data.data[i].name;
                    var job = data.data[i].job;
                    var bewrite = data.data[i].bewrite!=null ? data.data[i].bewrite.replace(/\n/g,"<br />"):" ";
                    //console.log(bewrite)

                    htmlStr += '<span class="lecturerShow">';
                    htmlStr += '<span class="photo" style="background-image: url('+imgUrl+');">';
                    htmlStr += '</span><br/><span class="name">'+name+'</span><br/>';
                    htmlStr += '<span class="job">'+job+'</span>';
                    htmlStr += '<span class="bewrite">'+bewrite+'</span></span>';
                }
                htmlStr +='<span class="lecturerShow"><span class="photo" style="background-image: url(../images/additional/pic_teacher_00.png);"></span><br/><span class="name">神秘嘉宾</span><br/><span class="job">Mystery Guest</span><span class="bewrite"><center>-</center></span></span>';
                $('#lecturerBox').append(htmlStr);

                //    讲师点击
                $('#lecturerBox').on('click','.lecturerShow',function(event){
                    event.preventDefault();

                    $("#profile").hide();
                    $(".lecturerClickBox .job").css('color','#000');
                    var photo = $(this).find('.photo').css('background-image');
                    var name = $(this).find('.name').text();
                    var job = $(this).find('.job').text();
                    var bewrite = $(this).find('.bewrite').html();
                    // 关闭滑屏事件
                    $('body').attr('onmousewheel',"return false;").on('touchmove',function(event) { event.preventDefault(); }, false);

                    $("#shade").find('.photo').css('background-image',photo);
                    $("#shade").find('.name').text(name);
                    $("#shade").find('.job').text(job);
                    $("#shade").find(".achieve").html(bewrite);
                    $("#shade").show().animate({
                        'opacity':'1'
                    },300);

                    $(".lecturerClickBox").css('top',middle($(".lecturerClickBox")));
                    $('.lecturerClickBox').css({'transform':'rotate(360deg)'});

                    $('#shade').click(function(){
                        $('.lecturerClickBox').css({'transform':'rotate(0deg)'});

                        $('#shade').animate({
                            'opacity':'0',
                            'transform':'rotate(0deg)'
                        },1);
                        setTimeout(function(){
                            $('#shade').hide();
                        },400);
                        // 打开滑屏事件
                        $('body').removeAttr('onmousewheel',"return false;").unbind('touchmove');
                    });
                });
        }
    });

    $.ajax({
        type: "get",
        url: baseUrl + "findOfflineCourseContent?page=1&courseType=1&newtype=0&courseId=951",
        data: {},
        async: true,
        dataType: "json",
        success: function (data) {
            isfull = data.data.isfull;
            console.log("findOfflineCourseContent", data)
            if(isfull == '0'){
                $("#enroll").html("已没有名额").css('background-color','#B8B8B8');
            }else{
                $('#enrollFriend').click(function(){
                    getUserIp(951,2);    //统计点击次数
                    window.location.href = dakeUrl0;
                });
                $("#enrollSelf").click(function(){
                    getUserIp(951,2);    //统计点击次数
                    window.location.href = dakeUrl1;
                });
            }
        }
    });

    // 弹框居中
    function middle(obj){
        var objH = $(obj).height();
        var winH = $(window).height();
        var mid = (winH-objH)/2-40;
        return mid;
    }

});