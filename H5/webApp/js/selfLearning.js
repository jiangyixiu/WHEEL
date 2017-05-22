/**
 * Created by Administrator on 2016/8/22.
 */
UserIp()//添加getUserIp库
// 记录数据
if($(window).width() < 750){
    var filterPager = {size:6,offset:0,total:0,Single:true};
}else{
    var filterPager = {size:8,offset:0,total:0,Single:true};
}

$(function(){
    //自学课程
    $.ajax({
        type:"get",
        url:baseUrl+"findSelfStudyList?page=1&courseType=0&newtype=1",
        data:{},
        async:true,
        dataType:"json",
        success:function(data){
            console.log(data)
            filterPager.total = data.data.length;
            filterPager.size = filterPager.size <= data.data.length ? filterPager.size : data.data.length;
            var obj = wxClassPageInit();
            showPager(0, obj.pageCurCount || filterPager.size);
            $(".selfLearning").loadNextPage();
            function showPager(s,e){
                var htmlStr='';
                filterPager.offset = e;
                for (var i=s; i<e; i++){
                    var title = data.data[i].title;
                    var cover = data.data[i].cover;
                    var subtitle = data.data[i].subtitle;

                    htmlStr += '<div class="courseBoxMin selfCourseBoxMin" id="'+ data.data[i].id +'">';
                    htmlStr += '<span class="photo" style="background-image: url('+cover+');background-size: 100% 100%">';
                    htmlStr += '</span>';
                    htmlStr += '<span class="title">'+title+'</span>';
                    htmlStr += '</div>';
                }
                $('#selfLearningBox').append(htmlStr);
                //处理页面到记录位置
                if(s == 0 && obj.pageScroll){
                	$("body").animate({
                		'scrollTop': obj.pageOffsetTop
                	}, 300);
                }
                filterPager.Single = true;//scroll事件防止多次触发

                $('#selfLearningBox').on('click','.selfCourseBoxMin',function(index){
                    var courseId = $(this).attr('id');
                    getUserIp(courseId,1);    //统计点击次数
                    localStorage.setItem("pageOffsetTop", $("body").scrollTop());
                    localStorage.setItem("pageCurCount", e);
                    var url = 'selfLearningContent.html?courseId='+ courseId;
                    window.open(url);
                });
            }

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

            //
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
});
