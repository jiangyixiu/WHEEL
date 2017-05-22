/**
 * Created by Administrator on 2016/11/24.
 */
var id = request("id");
var unionId;
var avatar;
var nickname;
//拉取用户信息
var code = request("code");
if(code){
    $.ajax({
        type: "get",
        url: "http://api.chazuomba.com/manage/Web/getUserInfoByCodeChazuo",
        data: {"code": code},
        dataType: "json",
        success: function (data) {
            console.log(data)
            unionId = data.data.unionid;
            avatar = data.data.headimgurl;
            nickname = data.data.nickname;
            if (unionId) {
                localStorage.setItem("unionId", unionId);
                localStorage.setItem("avatar", avatar);
                localStorage.setItem("nickname", nickname);
            }
        }
    });
}else{
    var url = webAppUrl + "test/testList.html?id=" + id;
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+encodeURIComponent(url)+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
}

unionId = localStorage.getItem("unionId");
avatar = localStorage.getItem("avatar");
nickname = localStorage.getItem("nickname");
//渲染页面
$.getJSON(baseUrlphp + "getQuestionChildList", {
    'id': id,
    'unionId': unionId
}, function (data) {
    console.log(data);
    var contentHtml = "";
    $.each(data.data, function (i, n) {
        contentHtml = addTest(contentHtml, n);
    });
    $("#testList").html(contentHtml);
});

//添加测试题列表
function addTest(html, data) {
    saveInfo(data.id,data.title);
    html += '<ul class="testBox" onclick="clickTestDiv('+ data.id +','+ data.number +','+ data.ticket_status +')">';
    html +=     '<li class="title">'+ data.title +'</li>';
    html +=     '<li class="tagging">';
    html +=         '<span>共'+ data.number +'题</span>';
    html +=         '<span>满分100分</span>';
    if(data.ticket_status == '1'){
        html +=         '<i class="ticket1">'+ data.score +'</i>';
    }else if(data.ticket_status == '2'){
        html +=         '<img class="ticket2" src="images/Rectangle.png"></i>';
    }else if(data.ticket_status == '3'){
        html +=         '<span style="color: #F7A90C;font-size: 0.7142rem;float: right;margin-right: 1rem">继续答题</span>';
    }
    html +=     '</li>';
    html += '</ul>';
    return html;
};

function  saveInfo(id,title){
    localStorage.setItem("parentName" + id, title);
};

//  点击
function clickTestDiv(childId, number, ticket_status){
    //localStorage.setItem("childId", childId);
    //console.log(childId)
    //var url = "answer.html";
    //window.location.href = url;
    window.location.href = webAppUrl + "test/answer.html?childId=" + childId + "&number=" + number + "&topParentId=" + id +"&ticket_status=" + ticket_status;
};
