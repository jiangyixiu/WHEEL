$(function(){
	//获取分享讲师信息
	var teacherId = request("teacherId");
	var teacherName = request("teacherName");
	getLecturerMsg(teacherId, teacherName);

    _czc.push(["_trackEvent", "1", "分享", teacherName]);

});
//获取分享讲师信息
function getLecturerMsg(teacherId, teacherName){
    var params = {
        teacherId: teacherId,
        teacherName: teacherName
    };
    getAjaxDataByPhpNew('/Web/TeacherDetail', params, function(data){
    	if(data.status == 200){
    		//分享
    		var title = '我正在学习' + data.data.name + '老师的最新课程';
    		if(data.data.catalogList[0]){
    			title += '：' + data.data.catalogList[0].name;
    		}
            var descText = '你也来看看吧';
            var linkUrl = 'http://www.chazuomba.com/files/webApp/app/lecturerShare.html?teacherId=' + teacherId + '&teacherName=' + teacherName;
            var imageUrl = data.data.cover;
            courseShare(title, descText, linkUrl, imageUrl);
           	appendClassList(data.data);
        }
    });
}
//展示页面信息
function appendClassList(obj){
	$(".lecturerName").text(obj.name);
	$(".lecturerItdItem").html(obj.bewrite.replace(/\n/g, "<br>"));
//	$(".lecturerPic").attr('style','background:url(' + fileBaseUrl + obj.cover + ') no-repeat center;background-size:cover;')
	$(".lecturerPic").attr('style','background:url(' + obj.cover1 + ') no-repeat center;background-size:cover;')

	var data = obj.catalogList;//课程列表信息
	var html = '', type = '';
	var courseCount = 0;//教师课程数
	var listenCount = 0;//听课数量
	for(var i in data){
		type = data[i].type;
		html += '<li class="classListItem" id="' + data[i].course_id + '">';
		if(type == '0' || type == '1') {//0音频系列课，1音频教师课程包
			html += '<div class="classItemImg audio" style="background: url(' + data[i].list_cover + ') no-repeat center;background-size:cover;"></div>';
		} else if(type == '2' || type == '3') {//0视频系列课，1视频教师课程包
			html += '<div class="classItemImg video" style="background: url(' + data[i].list_cover + ') no-repeat center;background-size:cover;"></div>';
		} else {
			html += '<div class="classItemImg" style="background: url(' + data[i].list_cover + ') no-repeat center;background-size:cover;"></div>';
		}
		html +=	'<div class="classItemCtn">' +
					'<div class="classItemTitle">' + data[i].name + '</div>' +
					'<div class="classItemSubTitle"><span style="margin-right:1rem;">' + obj.name + '</span><span>' + data[i].subtitle + '</span></div>';
		if(formateNumber(data[i].course_count) > 0){
			html += '<div class="classItemCount">更新至' + formateNumber(data[i].course_count) + '节</div>';
		}
		html +=	'<div class="classItemStudy"><div class="cisCount">' +formateNumber(data[i].listen_count) + '人已学</div>';
		if(data[i].pay_status == '0'){//企业课程
			html += '<div class="cisSts">企业课程</div>';
		} else if(data[i].price == '0'){
			html += '<div class="cisPrice">免费</div>';
		} else {
            html += '<div class="cisPrice">' + formatPrice(data[i].price) + '</div>';
		}
//		if(data[i].flag == '0'){
//			html += '<div class="cisStatus nor">加入学习</div>';
//		} else {
//			html += '<div class="cisStatus sel">已加入</div>';
//		}
		html +=	'</div></li>';
		courseCount += formateNumber(data[i].course_count);
		listenCount += formateNumber(data[i].listen_count);
	}
	$("#classList").append(html);
	$(".classCount").text(courseCount + '节');
	$(".viewCount").text(listenCount + '人');
	//查看剩余讲师信息
	var line = obj.bewrite.split("\n").length;
	if(line > 2){
		$(".loadMoreItd").show().on('click', function(){
			var _t = $(this);
			var down = _t.hasClass("down");
			if(down){
				$(".lecturerItdItem").css("height", line * 1.84 + 'rem');
				_t.addClass("up").removeClass("down");
			} else {
				$(".lecturerItdItem").css("height","3.68rem");
				_t.addClass("down").removeClass("up");
			}
		});
	}
	//绑定课程点击事件
	$("#classList").on('click', '.classListItem', function(){
//		var deLate = $(this).attr("deLate");//1没有名额，0有名额
		var courseId = $(this).attr("id");
//      var courseName = $(".classItemTitle", this).text();
//      var avatar = $(".avatar", this).val();
        var url = 'shareCourseContent.html?id='+courseId;
		window.open(url);
	});
	//加入学习事件绑定
//	$("#classList").on('click', '.cisStatus', function(e){
//		e.stopPropagation();
//		var _s = $(this);
//		var status = _s.hasClass("sel");
//		if(status){//已加入学习
//			_s.text("加入学习").addClass("nor").removeClass("sel");
//		} else {
//			_s.text("已加入").addClass("sel").removeClass("nor");
//		}
//	});
}
//格式化金额
function formatPrice(str){
	str = Number(str);
	str = isNaN(str) ? '' : ('<span style="font-size:1rem;vertical-align: top;">&yen; </span>' + str);
	return str;
}
//格式化数字
function formateNumber(num){
	num = parseInt(num);
	return isNaN(num) ? 0 : num;
}
