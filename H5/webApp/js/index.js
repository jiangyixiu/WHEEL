/**
 * Created by Administrator on 2016/8/18.
 */
UserIp()//添加getUserIp库
$(function() {

	// 优秀讲师团队
	$.ajax({
		type: "get",
		url: baseUrl + "getTeacherListForWeb?page=1&employeeId=1",
		data: {},
		async: true,
		dataType: "json",
		success: function(data) {
			//console.log(data);
			var length = data.data.length;
			if(document.body.clientWidth < 750) {
				var maxLength = length > 6 ? 6 : length;
			} else {
				var maxLength = length > 8 ? 8 : length;
			}
			//console.log(maxLength)
			var htmlStr = '';
			for(var i = 0; i < maxLength; i++) {
				//console.log(11)
				var float = null;
				var imgUrl = data.data[i].cover;
				var name = data.data[i].name;
				var job = data.data[i].job;
				var bewrite = data.data[i].bewrite != null ? data.data[i].bewrite.replace(/\n/g, "<br />") : " ";
				//console.log(bewrite);
				htmlStr += '<span class="lecturerShow">';
				htmlStr += '<span class="photo" style="background-image: url(' + imgUrl + ');">';
				htmlStr += '</span><br/><span class="name">' + name + '</span><br/>';
				htmlStr += '<span class="job">' + job + '</span>';
				htmlStr += '<span class="bewrite">' + bewrite + '</span></span>';

			}
			htmlStr += '<div class="more"><a href="lecturer.html">查看更多讲师</a></div>';
			$('#lecturerBox').append(htmlStr);

			//讲师点击
			$("#lecturerBox").on('click', '.lecturerShow', function() {
				$("#profile").hide();
				$(".lecturerClickBox .job").css('color', '#000');
				var photo = $(this).find('.photo').css('background-image');
				var name = $(this).find('.name').text();
				var job = $(this).find('.job').text();
				var bewrite = $(this).find('.bewrite').html();
				// 关闭滑屏事件
				$('body').attr('onmousewheel', "return false;").on('touchmove', function(event) {
					event.preventDefault();
				}, false);

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
		}
	});

	//线下课程
	$.ajax({
		type: "get",
		url: baseUrl + "findOfflineCourseV2?page=1&courseType=0&newtype=0",
		data: {},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			var length = data.data.length;
			if(document.body.clientWidth < 750) {
				var maxLength = length > 6 ? 6 : length;
			} else {
				var maxLength = length > 8 ? 8 : length;
			}
			var htmlStr = '';
			for(var i = 0; i < maxLength; i++) {
				var courseTime = data.data[i].courseTime.split('年')[1];
				var cityName = data.data[i].cityName;
				var cover = data.data[i].cover;
				var courseName = data.data[i].courseName;
				var teachers = data.data[i].teachers;
				var job = data.data[i].userList[0];
				var price = data.data[i].price;
				var content = data.data[i].content;
				//console.log(data.data[i].userList[0].jobName);
				if(data.data[i].deLate == '1') {
					var courseTime = "已结束";
				}
                htmlStr += '<div class="courseBoxMin offlineCourseBoxMin" id="' + data.data[i].id + '" isOver="' + data.data[i].isOver + '">';
				htmlStr += '<div class="photo" style="background-image: url(' + cover + ');background-position:center;">';
				htmlStr += '<div class="btm">';
				htmlStr += '<span class="teachers">' + teachers + '</span>';
				if(data.data[i].id == '951') {
                    htmlStr += '<span class="price">¥698起/人</span>';
                } else if(price == "0"){
                    htmlStr += '<span class="price">免费</span>';
				} else {
					htmlStr += '<span class="price">¥' + price + '/人</span>';
				}
				htmlStr += '</div>';
				htmlStr += '</div>';
				htmlStr += '<div class="title">';
				htmlStr += '<div class="date">' + courseTime + '</div><div class="titleText">' + courseName + '</div></div>';
				htmlStr += '</div>';

			}
			htmlStr += '<div class="more"><a href="offlineCourse.html">查看更多课程</a></div>';
			$('#speechBox').append(htmlStr);

			//    线下课程点击
			$('#speechBox').on("click",".offlineCourseBoxMin",function(index) {
                var courseId = $(this).attr("id");
                getUserIp(courseId,1);    //统计点击次数
                var isOver = $(this).attr("isOver");
                if(isOver == '1'){ //“1”课程已没有名额  “0”有名额
                    isOver = "1";
                }else{
                    isOver = "0";
                }
                var url = 'offlineCourseContent.html?id=' + courseId + '&isOver=' + isOver;
                window.open(url);
			});
		}
	});

	//线上课程
	$.ajax({
		type: "get",
		url: baseUrl + "findOfflineCourseV2?page=1&courseType=3&newtype=1",
		data: {},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			var length = data.data.length;
			if(document.body.clientWidth < 750) {
				var maxLength = length > 6 ? 6 : length;
			} else {
				var maxLength = length > 8 ? 8 : length;
			}
			var htmlStr = '';
			for(var i = 0; i < maxLength; i++) {
				var courseName = data.data[i].courseName;
				var teachers = data.data[i].teachers;
				var avatar = data.data[i].avatar;
				var price = data.data[i].price;
				var content = data.data[i].content;

				htmlStr += '<div class="courseBoxMin onlineCourseBox" id="'+data.data[i].id+'">';
				htmlStr += '<span class="photo" style="background-image: url(' + avatar + ');">';
				htmlStr += '<span class="btm">';
				htmlStr += '<span class="teachers">' + teachers + '</span>';
				htmlStr += '<span class="price">¥' + price + ' / 人</span>';
				htmlStr += '</span>';
				htmlStr += '</span>';
				htmlStr += '<span class="title">' + courseName + '</span>';
				htmlStr += '</div>';
			}
			htmlStr += '<div class="more"><a href="onlineCourse.html">查看更多课程</a></div>';
			$('#onlineCourseBox').append(htmlStr);

			//    线上课程点击
			$('#onlineCourseBox').on('click','.onlineCourseBox',function(index) {
                var courseId = $(this).attr("id");
                getUserIp(courseId,1);    //统计点击次数
                var url = 'onlineCourseContent.html?id=' + courseId;
                window.open(url);
                return;
			});
		}
	});

	//自学课程
	$.ajax({
		type: "get",
		url: baseUrl + "findSelfStudyList?page=1&courseType=0&newtype=1",
		data: {},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			var length = data.data.length;
			var htmlStr = '';
			if(document.body.clientWidth < 750) {
				var maxLength = length > 6 ? 6 : length;
			} else {
				var maxLength = length > 8 ? 8 : length;
			}
			for(var i = 0; i < maxLength; i++) {
				//console.log(data.data[i])
				var title = data.data[i].title;
				var cover = data.data[i].cover;
				var subtitle = data.data[i].subtitle;

				htmlStr += '<div class="courseBoxMin selfCourseBoxMin" id="'+data.data[i].id+'">';
				htmlStr += '<span class="photo" style="background-image: url(' + cover + ');background-size: 100% 100%">';
				htmlStr += '</span>';
				htmlStr += '<span class="title">' + title + '</span>';
				htmlStr += '</div>';
			}
			htmlStr += '<div class="more"><a href="selfLearning.html">查看更多教程</a></div>';
			$('#selfLearningBox').append(htmlStr);

			//   自学课程点击
			$('#selfLearningBox').on('click','.selfCourseBoxMin',function(index) {
                var courseId = $(this).attr("id");
                getUserIp(courseId,1);    //统计点击次数
                var id = $(this).attr('id');
                var url = 'selfLearningContent.html?courseId=' + id;
                window.open(url);
			});
		}
	});

	// 同学录
	$.ajax({
		type: "get",
		url: baseUrl + "getStudentsList?page=1&courseType=1&newtype=0&employeeId=33",
		data: {},
		async: true,
		dataType: "json",
		success: function(data) {
			//console.log(data)
			var length = data.data.length;
			var imgUrl = "";
			var name = "";
			var job = "";

			if(document.body.clientWidth < 750) {
				var maxLength = length > 6 ? 6 : length;
			} else {
				var maxLength = length > 8 ? 8 : length;
			}
			var htmlStr = '';
			for(var i = 0; i < maxLength; i++) {
				var imgUrl = data.data[i].cover;
				var name = data.data[i].name;
				var job = data.data[i].job;
				var content = data.data[i].content;
				var city = data.data[i].city;
				var industry = data.data[i].industry;
				var bewrite = data.data[i].bewrite;
				var bewrite = (data.data[i].bewrite).replace(/\n/g, "<br />");

				htmlStr += '<div class="classmateBoxMin">';
				htmlStr += '<span class="photo" style="background-image: url(' + imgUrl + ');">';
				htmlStr += '</span><br/><span class="name">' + name + '</span><br/>';
				htmlStr += '<span class="profile">' + city + ' | ' + industry + '</span>';
				htmlStr += '<span class="title">' + bewrite + '</span>';
				htmlStr += '</div>';
			}
			$('#classmateBox').append(htmlStr);
			// 点击同学
			$(".classmate").on('click', '.classmateBoxMin', function() {
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
		}
	});

	// 弹框居中
	function middle(obj) {
		var objH = $(obj).height();
		var winH = $(window).height();
		var mid = (winH - objH) / 2 - 40;
		return mid;
	}
	//讲师、同学信息弹出框隐藏事件
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