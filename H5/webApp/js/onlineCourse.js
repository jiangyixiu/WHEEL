/**
 * Created by Administrator on 2016/8/22.
 */
UserIp()//添加getUserIp库
// 记录数据
var filterPager = {size: 6, offset: 0, total: 0, Single: true};
if($(window).width() >= 750) {
	filterPager.size = 8;
}
$(function() {
    scrolls($('#buyButton'),220);

	var pastid = '826';//全部课程id
	$.getJSON(baseUrl + "findWebOfflineCourseInfo", {
		'client_version': '1',
		'device_id': '1',
		'platform': 'web',
		'courseId': pastid
	}, function(data) {
		// 展示信息上
		var data = data.data;
		$("#buyButton .price").html(" ¥" + data.price + "/年");
	});

	//单节课程
	$.ajax({
		type: "get",
		url: baseUrl + "findOfflineCourseV2?page=1&courseType=3&newtype=1",
		data: {},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data);
			filterPager.total = data.data.length;
			filterPager.size = filterPager.size <= data.data.length ? filterPager.size : data.data.length;
			var obj = wxClassPageInit();
			showPager(0, obj.pageCurCount || filterPager.size);
			$(".onlineCourse").loadNextPage();
			function showPager(s, e) {
				var htmlStr = '';
				filterPager.offset = e;
				if(s >= e){
					filterPager.Single = false;
					return;
				}
				for(var i = s; i < e; i++) {
					var synopsis = data.data[i].synopsis;
					var teachers = data.data[i].teachers;
					var cover = data.data[i].cover;
					var price = data.data[i].price;
					var content = data.data[i].content;
					var id = data.data[i].id;
					var courseAdd = data.data[i].station;

					htmlStr += '<div class="courseBoxMin onlineCourseBoxMin" id="' + data.data[i].id + '">';
					htmlStr += '<div class="photo" style="background-image: url(' + cover + ');background-size: cover"></div>';
					htmlStr += '<div class="title">';
					htmlStr += '<p class="date">' + synopsis + '</p>';
					htmlStr += '<span class="teachers">' + teachers + '</span>';
					htmlStr += '<span class="courseAdd">' + courseAdd + '</span>';
					htmlStr += '<span class="price">¥' + price + '/人</span>';
					htmlStr += '</div></div>';
				}
				$('#onlineCourseBox').append(htmlStr);
				//处理页面到记录位置
				if(s == 0 && obj.pageScroll) {
					$("body").animate({
						'scrollTop': obj.pageOffsetTop
					}, 300);
				}
				filterPager.Single = true; //scroll事件防止多次触发
			}
			//    线上课程点击
			$("#onlineCourseBox").on('click', '.onlineCourseBoxMin', function(){
                var courseId = $(this).attr("id");
                getUserIp(courseId,2);    //统计点击次数
                localStorage.setItem("pageOffsetTop", $("body").scrollTop());
                localStorage.setItem("pageCurCount", filterPager.offset);
                var url = 'onlineCourseContent.html?id='+$(this).attr("id");
                window.open(url);
			});
			$(document).on("scroll", function() {
				var viewH = $(window).height(), //可见高度
					contentH = $(this).height(), //内容高度
					scrollTop = $(this).scrollTop(); //滚动高度
				if(contentH <= (scrollTop + viewH) && filterPager.Single) { //到达底部100px时,加载新内容
					scroll();
					return false;
				}
			});
			function scroll() {
				if(filterPager.Single) {
					$(".loadding").show();
					$("#moreText").hide();
					setTimeout(function() {
						var s = filterPager.offset,
							e = filterPager.offset + filterPager.size;
						e = e > filterPager.total ? filterPager.total : e;
						//console.log(s,e)
						showPager(s, e);
						if(e < filterPager.total) {
							$(".loadding").hide();
							$("#moreText").show();
						} else {
							$(".loadding").remove();
							$("#moreText").remove();
						}
					}, 400);
					filterPager.Single = false;
					return;
				}
			}
		}
	});
	// 点击报名
	$('#buyButton').click(function(event) {
		var url = webAppUrl + "onlineCourseContent.html?id=765";
        window.location.href = url;
	});
});