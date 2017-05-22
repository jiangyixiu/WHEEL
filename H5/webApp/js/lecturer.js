/**
 * Created by Administrator on 2016/8/21.
 */
// 记录数据
var filterPager = {size:8,offset:0,total:0,Single:true};
if($(window).width() < 750){
    filterPager.size = 6;
}
$(function(){
    // 优秀讲师团队
    $.ajax({
        type:"get",
        url: baseUrl+"getTeacherListForWeb?page=1&employeeId=1",
        data:{},
        async:true,
        dataType:"json",
        success:function(data){
            filterPager.total = data.data.length;
            showPager(0,filterPager.size);
            $(".lecturer").loadNextPage();
            function showPager(s,e){
                filterPager.offset = e;
                var htmlStr = '';
                for (var i=s; i<e; i++){
                    var float = null;
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
                $('#lecturerBox').append(htmlStr);
                filterPager.Single = true;//scroll事件防止多次触发
            }
            //    讲师点击
			$("#lecturerBox").on('click', '.lecturerShow', function(e) {
				e.preventDefault();
				$("#profile").hide();
				$(".lecturerClickBox .job").css('color', '#000');
				var photo = $(this).find('.photo').css('background-image');
				var name = $(this).find('.name').text();
				var job = $(this).find('.job').text();
				var bewrite = $(this).find('.bewrite').html();
				// 关闭滑屏事件
				huaPing(false);
			
				//console.log(photo,name,job);
				$("#shade").find('.photo').css('background-image', photo);
				$("#shade").find('.name').text(name);
				$("#shade").find('.job').text(job);
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
                var viewH =$(window).height(),      //可见高度
                    contentH =$(this).height() - ($('.footer').height()/1.5),     //内容高度
                    scrollTop =$(this).scrollTop(); //滚动高度
                if(contentH <= scrollTop + viewH){ //到达底部100px时,加载新内容
                    scroll();
                    return false;
                }
            });
            //点击上拉刷新
            $('#moreText').click(function(){
                scroll();
            });
            //加载下一页
            function scroll(){
                if(filterPager.Single){
                    $(".loadding").show();
                    $("#moreText").hide();
                    setTimeout(function(){
                        var s = filterPager.offset, e = filterPager.offset+filterPager.size;
                        e = e > filterPager.total ?  filterPager.total : e;
                        showPager(s,e);
                        //console.log(s,e)
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
        var mid = (winH-objH)/2-40;
        return mid;
    }
	//讲师信息弹出框隐藏事件
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