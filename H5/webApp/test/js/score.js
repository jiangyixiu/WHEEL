/**
 * Created by chazuo on 15/10/9.
 */
var id = request("id");
var testName = "";
var a;
var b;
var aImg;
var bImg;
var nickName ;
var nickName1 ;
var topParentId;

$(document).ready(function() {

    console.log(id,baseUrlphp)
    // 获取本页数据
    $.getJSON(baseUrlphp + "findTicket",{
        'client_version': '1',
        'device_id': '1',
        'platform': 'web',
        'id': id
    }, function(data) {
        console.log(data);
         // 隐藏
        $("div").show();
        $(".backView").hide();
        nickName = data.data.nickName;
        nickName1 = data.data.nickName;
        topParentId = data.data.topParentId;
        avatar = data.data.avatar;
        title = data.data.title;
        parentName = data.data.parentName
        $(".nameBorder").html("<span class='name'>" + nickName +"</span>");

        var parentName = parentName.split("|");
        $(".subject").html("《"+ parentName[0] +"》");
        if(parentName[1] == undefined){
            $(".title").html("—— 成绩单 ——");
        } else{
            $(".title").html("——"+ parentName[1] +"——");
        }
        var parentName = parentName[0];
        var parentName = parentName.substr(0,7);

        if(nickName.length >5){
          $(".name").css("width","51%");
        }else{
          $(".name").css("width","");
        }
        $(".headPhoto").attr('src',avatar);//头像
        $("#chengHao").html(title)

        //
        var score = data.data.score;
        var scoreString = score.toString();
        console.log(scoreString)
        if(scoreString.length == 1){
            a = score;
            aImg = a +".png";
            $("#scoreImg").html("<img src='images/"+aImg+"' class='img' /> <span class='score'></span>");
        }else if(scoreString.length == 2){
             a = scoreString.substring(0,1);
             aImg = a +".png";
             b = scoreString.substring(1,2);
             bImg = b +".png";
             console.log(aImg)
             $("#scoreImg").html("<img src='images/"+aImg+"' class='img' /> <img src='images/"+bImg+"' class='img' /> <span class='score'></span>");
        }else{
            $("#scoreImg").html("<img src='images/1.png' class='img' /> <img src='images/0.png' class='img1' /> <img src='images/0.png' class='img' /> <span class='score'></span>");
        }
	$('img').each(function(){
		var rand = Math.random();
		var imgUrl= $(this).attr('src');
		$(this).attr("src",imgUrl+"?v="+rand);
	});		
        testName = data.data.parentName;
        share(data.data.score);


        //var alsoBtn = request("alsoBtn");
        //if(alsoBtn == '1'){
        //    $('.comeBtn').hide();
        //    $('.alsoBtn').show();
        //    //alert(1)
        //}else{
        //    $('.comeBtn').show();
        //    $('.alsoBtn').hide();
        //    //alert(2)ip
        //}
        // 继续答题
        $(".comeBtn").click(function(){
            window.location.href = "../test/testChildList.html?id=" + topParentId;
        });

        // 我也答题
        $(".alsoBtn").click(function(){
            window.location.href = "../test/testChildList.html?id=" + topParentId;
        });

        function share(title){
            var  title     = nickName+"刚刚在《 "+parentName+"... 》测试中，获得“"+title+"”分！";
            var  descText  = "快来挑战吧!";
            var  linkUrl   = window.location.href;
            var  imageUrl  = avatar;
            courseShare(title,descText,linkUrl,imageUrl);
        }
    });


});
