'use strict';

$(function() {

    //获取分享讲师信息
    var groupId = request("groupId");



    getLecturerMsg(groupId);


    // tab滑倒顶部悬浮
    var w = document.documentElement.clientWidth;
    var scale = w / 375;
    if (scale >= 2) {
        scale = 2
    }
    var fontSize = 12 * scale;
    scrolls($('.tab'), 18.5 * fontSize)
});

//scroll超出多少显示隐藏
function scrolls(obj, topMax) {
    window.onscroll = touch;
    console.log(topMax, touch);
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', touch, false);
    document.addEventListener('touchend', touch, false);

    function touch() {
        var top = $(this).scrollTop();
        if (top >= topMax) {
            if (!obj.hasClass('tabScrolls')) {
                obj.addClass('tabScrolls')
                $('.main').css('marginTop', '4.166667rem')
            }
        } else {
            obj.removeClass('tabScrolls')
            $('.main').css('marginTop', '')
        }
    }
}


//获取分享系列课信息
function getLecturerMsg(groupId) {
    $('.main').hide();
    loading(true);
    getAjaxDataByPhpNew('/Web/groupInfo', { groupId: groupId }, function(data) {

        if (data.status == 200) {
            $('.main').show();
            loading(false);
            //设置分享
            var title = '推荐一门好课：' + data.data.name;
            var descText = '你也来看看吧';
            var linkUrl = 'http://www.chazuomba.com/files/webApp/app/publicClassShare.html?groupId=' + groupId;
            var imageUrl = data.data.list_cover;
            courseShare(title, descText, linkUrl, imageUrl);

            _czc.push(["_trackEvent", "1", "分享", data.data.name, groupId]);
            // banner
            bannerIofo(data.data);
            // 系列课列表
            classList(data.data);
            // 讲师列表
            teacherList(data.data.teacherList);
            // 课程包简章
            $('.courseList').html(data.data.content);

            // 初始化tab
            var classListH = $('#classList').height();
            var teacherListH = $('.teacherList').height();
            var courseListH = $('.courseList').height();
            $('.info').height('auto');
            tabInfo(classListH, teacherListH, courseListH);

            if (
                data.data.price == 0 ||
                data.data.price == "0" ||
                data.data.price == ""
            ) {
                $('#enroll').remove();
            } else if(
                data.data.pay_status == "0"
            ){
                $('#enroll span').text('申请企业课程');
                var url = data.data.payStatusAddress;
            } else {
                $('#enroll span').html(data.data.price+"元<i>/</i>年&nbsp;&nbsp;&nbsp;立即报名");
                // console.log(data.data.price)
                // 购买
                var courseId = data.data.id;
                var course_id = data.data.course_id;
                // var course_id = '2310';
                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + course_id + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
            }
            $('#enroll').show();
            $('#enroll').click(function() {
                open(url);
                _czc.push(["_trackEvent", "分享", "公开课", "1"]);
            })

        }
    });
}

// 初始化banner
function bannerIofo(data) {
    $('.bannerWrap h2').text(data.name);
    $('.bannerWrap p').text(data.subtitle);
    $('.bannerWrap span').eq(0).text('含' + data.catalogList.length + '门课程');
    $('.bannerWrap span').eq(1).text('共' + data.course_count + '节');
    $('.bannerWrap span').eq(2).text(data.study_sum + '人已学');
    $('.bannerWrap').css({
        'visibility': 'inherit',
        'background-image': 'url(' + data.cover + ')',
        'background-size': '100%'
    });
}

// 初始化tab
function tabInfo(classListH, teacherListH, courseListH) {
    console.log(classListH);
    $('.tab li').on('click', function() {
        $(this).addClass('tab-selected').siblings().removeClass();
        var mark = $(this).attr('mark');
        var info = $('.info');

        switch (mark) {
            case '1':
                info.css('transform', 'translate3d(0, 0, 0)').height(classListH)
                break;
            case '2':
                info.css('transform', 'translate3d(-33.33%, 0, 0)').height(teacherListH)
                break;
            case '3':
                info.css('transform', 'translate3d(-66.66%, 0, 0)').height("auto")
                break;
        }
    });
}

//展示页面信息
function classList(obj) {
    var data = obj.catalogList; //课程列表信息
    var html = '',
        type = '';
    var courseCount = 0; //教师课程数
    var listenCount = 0; //听课数量
    for (var i in data) {
        type = data[i].type;
        html += '<li class="classListItem" id="' + data[i].course_id + '">';
        if (type == '0' || type == '1') { //0音频系列课，1音频教师课程包
            html += '<div class="classItemImg audio" style="background: url(' + data[i].list_cover + ') no-repeat center;background-size:cover;"></div>';
        } else if (type == '2' || type == '3') { //0视频系列课，1视频教师课程包
            html += '<div class="classItemImg video" style="background: url(' + data[i].list_cover + ') no-repeat center;background-size:cover;"></div>';
        } else {
            html += '<div class="classItemImg" style="background: url(' + data[i].list_cover + ') no-repeat center;background-size:cover;"></div>';
        }
        html += '<div class="classItemCtn">' +
            '<div class="classItemTitle">' + data[i].name + '</div>' +
            '<div class="classItemSubTitle"><span style="margin-right:1rem;">' + obj.name + '</span><span>' + data[i].subtitle + '</span></div>';
        // if (formateNumber(data[i].course_count) > 0) {
        html += '<div class="classItemCount">更新至' + formateNumber(data[i].course_count) + '节</div>';
        // }
        html += '<div class="cisCount">' + formateNumber(data[i].study_sum) + '人已学</div>';
        // html += '<div class="briefing">查看详情</div>'
        html += '</li>';
    }
    $("#classList").append(html);

    //绑定课程点击事件
    // $("#classList").on('click', '.classListItem', function() {
    //     var courseId = $(this).attr("id");
    //     var url = 'shareCourseContent.html?id=' + courseId;
    //     window.open(url);
    // });
}

// 讲师列表
function teacherList(data) {
    var html = '',
        courseUpdate, currentTime;
    for (var i in data) {
        courseUpdate = new Date(Date.parse(data[i].course_begin_time.replace(/-/g, '/')));
        currentTime = new Date();
        courseUpdate = Math.ceil((currentTime - courseUpdate) / 1000 / 60 / 60 / 24);

        html += '<li class="teacherItem" id="' + data[i].teacher_id + '">'
        html += '<div class="avatar" style="background-image:url(' + data[i].list_cover + ')"></div>'
        html += '<ul class="teacherCtn">'
        html += '<li class="tName">' + data[i].name + '</li>'
        html += '<li class="tJob">' + data[i].job + '</li>'
        html += '<li class="tEffect">' + data[i].info + '</li>'
        html += '<li class="tTime">' + courseUpdate + '天前 | ' + data[i].course_name + '</li>'
        html += '<li class="tAngle"></li>'
        html += '</ul>'
        html += '</li>'
    }
    $('.teacherList').html(html);

    $('.teacherList').on('click', '.teacherItem', function() {
        var tName = $(this).find('.tName').text();
        var id = $(this).attr('id');
        open('http://www.chazuomba.com/files/webApp/app/lecturerShare.html?teacherId=' + id + '&teacherName=' + tName);
    });
}

//格式化金额
function formatPrice(str) {
    str = Number(str);
    str = isNaN(str) ? '' : ('<span style="font-size:1rem;vertical-align: top;">&yen; </span>' + str);
    return str;
}
//格式化数字
function formateNumber(num) {
    num = parseInt(num);
    return isNaN(num) ? 0 : num;
}
