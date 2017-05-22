/**
 * Created by Administrator on 2016/8/25.
 */
var courseId = request('courseId');
var cover;
var courseName;

$(function(){
    loading(true);
    $.ajax({
        type: "get",
        url: baseUrl+"findSelfStudyContent?id=" + courseId,
        dataType: "json",
        success: function (data) {
            console.log(data)
            courseName = data.data.title
            cover = data.data.cover;
            $('#title').html(courseName);
            $('#content').html(data.data.content);
            loading(false);

            // 设置标题&分享图片
            var imageUrl = cover;
            var title = courseName;
            var descText = '插坐学院自学课程';
            var linkUrl = window.location.href;
            var linkUrl = linkUrl;
            courseShare(title, descText, linkUrl, imageUrl);
        }
    });

    if( isWeiXin() ){//微信里简章页面加头部导航
        $('.header').show();
        $('.title').css({"paddingTop":"6.8rem"});
    }
});
