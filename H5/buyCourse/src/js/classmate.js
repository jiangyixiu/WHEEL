/**
 * Created by Administrator on 2016/8/22.
 */
// 记录数据
if($(window).width() < 750){
    var filterPager = {size:6,offset:0,total:0,Single:true};
}else{
    var filterPager = {size:8,offset:0,total:0,Single:true};
}

$(function(){
    // 同学录
    $.ajax({
        type:"get",
        url: baseUrl+"getStudentsList?page=1&courseType=1&newtype=0&employeeId=33",
        data:{},
        async:true,
        dataType:"json",
        success:function(data) {
            filterPager.total = data.data.length;
            showPager(0,filterPager.size);
            function showPager(s,e){
                var htmlStr = '';
                filterPager.offset = e;
                for (var i=s; i<e; i++) {
                    var imgUrl = data.data[i].cover;
                    var name = data.data[i].name;
                    var job = data.data[i].job;
                    var content = data.data[i].content;
                    var city = data.data[i].city;
                    var industry = data.data[i].industry;
                    var bewrite = data.data[i].bewrite;
                    var bewrite = (data.data[i].bewrite).replace(/\n/g,"<br />");

                    htmlStr += '<div class="classmateBoxMin">';
                    htmlStr += '<span class="photo" style="background-image: url(' + imgUrl + ');">';
                    htmlStr += '</span><br/><span class="name">' + name + '</span><br/>';
                    htmlStr += '<span class="profile">' + city + ' | ' + industry + '</span>';
                    htmlStr += '<span class="title">' + bewrite + '</span>';
                    htmlStr += '</div>';
                }
                $('#classmateBox').append(htmlStr);
                filterPager.Single = true;//scroll事件防止多次触发
            }
 			//    点击同学
            $("#classmateBox").on('click', '.classmateBoxMin', function() {
            	$("#profile").show();
                $(".lecturerClickBox .job").css('color', '#3573B3');
                var photo = $(this).find('.photo').css('background-image');
                var name = $(this).find('.name').text();
                var profile = $(this).find('.profile').text();
                var bewrite = $(this).find('.title').html();
                // 关闭滑屏事件
                huaPing(false);
                //console.log(photo,name,job);
                $("#shade").find('.photo').css('background-image', photo);
                $("#shade").find('.name').text(name);
                $("#shade").find('.profile').text(profile);
                $("#shade").find('.job').text(profile);
                $("#shade").find(".achieve").html(bewrite);
                $("#shade").show().animate({
               		'opacity': '1'
               	}, 300);
               	$(".lecturerClickBox").css('top', middle($(".lecturerClickBox")));
               	$('.lecturerClickBox').css({
               		'transform': 'rotate(360deg)'
               	});
            });
            $(document).on("scroll",function(){
                var viewH = $(window).height(),      //可见高度
                    contentH = $(this).height() - ($('.footer').height()/1.5),     //内容高度
                    scrollTop = $(this).scrollTop(); //滚动高度
                if(contentH <= scrollTop + viewH){ //到达底部100px时,加载新内容
                    scroll();
                    return false;
                }
            });
            //点击上拉刷新
            $('#moreText').click(function(){
                scroll();
            });

            function scroll(){
                if(filterPager.Single){
                    $(".loadding").show();
                    $("#moreText").hide();
                    setTimeout(function(){
                        var s = filterPager.offset, e = filterPager.offset+filterPager.size;
                        e = e > filterPager.total ? filterPager.total : e;
                        showPager(s,e);
                        if(e < filterPager.total){
                            $(".loadding").hide();
                            $("#moreText").show();
                        }else{
                            $(".loadding").remove();
                            $("#moreText").remove();
                        }
                    },400);
                    filterPager.Single = false;
                    return;
                }
            }
        }
    });
    // 弹框居中
    function middle(obj){
        var objH = $(obj).height();
        var winH = $(window).height();
        //console.log(objH,winH)
        var mid = (winH-objH)/2-40;
        return mid;
    }
    //同学信息弹出框隐藏事件
	$('#shade').click(function() {
		$('.lecturerClickBox').css({
			'transform': 'rotate(0deg)'
		});
		$('#shade').animate({
			'opacity': '0',
			'transform': 'rotate(0deg)'
		}, 1);
		setTimeout(function() {
			$('#shade').hide();
		}, 400);
		// 打开滑屏事件
		huaPing(true);
	});
});