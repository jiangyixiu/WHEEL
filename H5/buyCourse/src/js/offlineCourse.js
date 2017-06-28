/**
 * Created by Administrator on 2016/8/22.
 */
UserIp()//添加getUserIp库
// 记录数据
var filterPager = {size: 6, offset: 0, total: 0, Single: true};
if($(window).width() >= 750) {
	filterPager.size = 8;
}
$(function(){
    //线下课程
    $.ajax({
        type:"get",
        url: baseUrl+"findOfflineCourseV2?page=1&courseType=0&newtype=0",
        data:{},
        async:true,
        dataType:"json",
        success:function(data){
            console.log(data);
            var dataY = [];
            var dataN = [];

            //过期课程
            for(var i in data.data){
                if(data.data[i].deLate == '1'){
                    dataN.push(data.data[i]);
                } else {
                    dataY.push(data.data[i]);
                }
            }

            filterPager.total = dataN.length;

            if (dataY[0]){
                $("#speechBox").show();
            }

            //没过期&名额已满
            showDataY(dataY)

            //过期课程
            filterPager.size = filterPager.size <= dataN.length ? filterPager.size : dataN.length;
            var obj = wxClassPageInit();
            showPager(0, obj.pageCurCount || filterPager.size);
            $(".speech").loadNextPage();
            function showPager(s,e){
                filterPager.offset = e;
                if(s >= e){
					filterPager.Single = false;
					return;
				}
                var dataInfo = dataN;
                for(var i=s; i<e; i++){
                    var _id = dataInfo[i].id;
                    var courseTime = dataInfo[i].courseTime.split('年')[1];
                    var cityName = dataInfo[i].cityName;
                    var cover = dataInfo[i].cover;
                    var courseName = dataInfo[i].courseName;
                    var courseAdd = dataInfo[i].station;
                    if(courseAdd == null){
                        courseAdd = "";
                    }
                    var teachers = dataInfo[i].teachers;
                    var job = dataInfo[i].userList[0];
                    var price = dataInfo[i].price;
                    var content = dataInfo[i].content;

                    var htmlStr = '';
                    //结束课程
                    htmlStr += '<div class="courseBoxMin offlineCourseBoxMin" id="' + dataInfo[i].id + '" isOver="' + dataInfo[i].isOver + '">';
                    htmlStr += '<img class="courseEnd" src="images/pic_seminars_end.png" />';
                    htmlStr += '<div class="photo" style="background-image: url('+cover+');background-size: cover"></div>';
                    htmlStr += '<div class="title">';
                    htmlStr += '<p class="date">'+courseTime+'｜'+courseName+'</p>';
                    htmlStr += '<span class="teachers">'+ teachers +'</span>';
                    htmlStr += '<span class="courseAdd">'+ courseAdd +'</span>';
                    if(_id == '1002'){

                    } else if(_id == '951'){
                        htmlStr += '<span class="price">¥698起/人</span>';
                    } else if(price == "0") {
                        htmlStr += '<span class="price">免费</span>';
                    } else {
                        htmlStr += '<span class="price">¥'+price+'/人</span>';
                    }
                    htmlStr += '</div></div>';
                    $('#courseEndBox').append(htmlStr);
                };
                //处理页面到记录位置
                if(s == 0 && obj.pageScroll){
                	$("body").animate({
                		'scrollTop': obj.pageOffsetTop
                	}, 300);
                }
                filterPager.Single = true;//scroll事件防止多次触发
            }
			//    线下课程点击
			$(".speech").on('click', '.offlineCourseBoxMin', function(){
                //统计点击次数
                var courseId = $(this).attr("id");
                getUserIp(courseId,1);

				localStorage.setItem("pageOffsetTop", $("body").scrollTop());
                localStorage.setItem("pageCurCount", filterPager.offset);

                var url = 'offlineCourseContent.html?id='+$(this).attr("id");
                window.open(url);
			});

            $(document).on("scroll",function(){
                var viewH =$(window).height(),      //可见高度
                    contentH =$(this).height() - ($('.footer').height()/1.5),     //内容高度
                    scrollTop =$(this).scrollTop(); //滚动高度
                if(contentH <= (scrollTop + viewH) && filterPager.Single){ //到达底部100px时,加载新内容
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
            };


            function showDataY(data) {
                for(i in data){
                    var _id = data[i].id;
                    var courseTime = data[i].courseTime.split('年')[1];
                    var cityName = data[i].cityName;
                    var cover = data[i].cover;
                    var courseName = data[i].courseName;
                    var courseAdd = data[i].station;
                    if(courseAdd == null){
                        courseAdd = "";
                    }
                    var teachers = data[i].teachers;
                    var job = data[i].userList[0];
                    var price = data[i].price;
                    var content = data[i].content;

                    if(data[i].isOver == '1') {
                        var htmlStr = '';
                        //名额已满
                        htmlStr += '<div class="courseBoxMin offlineCourseBoxMin" id="' + data[i].id + '" isOver="' + data[i].isOver + '">';
                        htmlStr += '<img class="courseEnd" src="images/pic_seminars_none.png" />';
                        htmlStr += '<div class="photo" style="background-image: url('+cover+');background-size: cover"></div>';
                        htmlStr += '<div class="title">';
                        htmlStr += '<p class="date">'+courseTime+'｜'+courseName+'</p>';
                        htmlStr += '<span class="teachers">'+ teachers +'</span>';
                        htmlStr += '<span class="courseAdd">'+ courseAdd +'</span>';
                        if(_id == '1002'){

                        } else if(_id == '951'){
                            htmlStr += '<span class="price">¥698起/人</span>';
                        } else if(price == "0") {
                            htmlStr += '<span class="price">免费</span>';
                        } else {
                            htmlStr += '<span class="price">¥'+price+'/人</span>';
                        }
                        htmlStr += '</div></div>';
                        $('#speechBox2').append(htmlStr);

                    } else {
                        var htmlStr = '';
                        //未结束课程
                        htmlStr += '<div class="courseBoxMin offlineCourseBoxMin" id="' + data[i].id + '" isOver="' + data[i].isOver + '">';
                        htmlStr += '<div class="photo" style="background-image: url('+cover+');background-size: cover"></div>';
                        htmlStr += '<div class="title">';
                        htmlStr += '<p class="date"><strong>'+courseTime+'</strong>｜'+courseName+'</p>';
                        htmlStr += '<span class="teachers">'+ teachers +'</span>';
                        htmlStr += '<span class="courseAdd">'+ courseAdd +'</span>';
                        if(_id == '1002'){

                        }
                        else if(_id == '951'){
                            htmlStr += '<span class="price">名额已满</span>';
                        } else if(price == "0") {
                            htmlStr += '<span class="price">免费</span>';
                        } else {
                            htmlStr += '<span class="price">¥'+price+'/人</span>';
                        }
                        htmlStr += '</div></div>';
                        $('#speechBox1').append(htmlStr);
                    }
                }

            }
        }
    });
});