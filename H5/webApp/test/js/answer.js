/**
 * Created by Administrator on 2016/11/24.
 */
var unionId = localStorage.getItem('unionId');
var topParentId = request("topParentId");// 读取父级 id
var childId = request("childId");//题id
var number = request("number");//题数量
var ticket_status = request("ticket_status");// 1 答过题了 2 没答过题
var nickname = localStorage.getItem("nickname")
var parentName = localStorage.getItem("parentName" + childId);
var yesColor = {"background-color": "#8BCE44","color": "#FFFFFF","borderColor": "#8BCE44"};
var noColor = {"background-color": "#F05F70","color": "#FFFFFF","borderColor": "#F05F70"};
var selectColor = {"background-color": "#F5F5F5","color": "#333333","borderColor": "#E0E0E0"};
var initialColor = {"background-color": "#FFFFFF","color": "#333","borderColor": "#E0E0E0"};
$(function(){
    // loading(true);
    //  外面判断没有答题
    if (ticket_status == "1") {
        lociy(unionId);
    } else if(ticket_status == "2"){
        allQuestion();
    } else if(ticket_status == "3"){    //继续答题
        allQuestion();
    }

    //  判断有没有答题
    function lociy(unionId) {
        $.getJSON(baseUrlphp + "queryTicketHave", {
            'client_version': '1',
            'device_id': '1',
            'platform': 'web',
            'unionId': unionId,
            'topParentId':topParentId,
            'parentId':childId
        }, function (data) {
            console.log(data)
            var id = data.data;
            if (id > 0){
                window.location.href = "score.html?id=" + id;  // 答过题
            }else {
                allQuestion();  //没答过
            }
        });
    };

    //   没有答题
    var answerArray = new Array();//存储题
    var several;        //问题数量
    var answer;         // 本次问题答案
    var nowQuestion = 0;    // 当前问题
    var score = 0;      // 分数
    function allQuestion(){
        $("#nickname").text(nickname);
        $.getJSON(baseUrlphp + "getChildQuestionsById", {
            'parentId': childId,
            'topParentId': topParentId,
            'unionId': unionId,
            'number':number
        }, function (data) {
            console.log(data);
            answerArray = data.data;
            // 设置数据
            var nowQuestion = skip(answerArray)//跳过之前答过的
            getContent(answerArray,nowQuestion);//开始答题
            loading(false);
        });
    };

    // 预选择
    function selectAnswer(answerArray){
        $(".style").on('touchstart',function () {
            clickStyle($(this));
            next(answerArray, $(this).attr('name'));
        });
    }

    // 预选择颜色
    function clickStyle(index){
        $(index).css(selectColor).siblings().css(initialColor);
        $('#submit').css("background-color",'#225D9B');
    }

    // 提交选择后 如果选对则标蓝&选错则标红并把正确答案标出来
    function setRightSelectColor(select,colorBg){
        $(".style" + select).css(colorBg);
    }
    // 重置样式
    function setNormalColor(){
        $(".style").css(initialColor);
        $('#submit').text("提交").css("background-color","#E0E0E0");
    }

    //  提交选择
    function selectRightAnswer(num,several,isRight) {
        if(isRight == '1'){//正确加分
            var singleScore = 100/parseInt(number);
            score += singleScore;
        }
        //提交本次答题信息
        $.getJSON(baseUrlphp + "answerSaveByNum",{
            'parentId': childId,
            'topParentId': topParentId,
            'unionId': unionId,
            'num': num,
            'answer': answer,
            'isRight': isRight
        },function(data){
            console.log("answerSaveByNum:"+data)
        });
    };

    //  切换下一题
    function selectErrorAnswer(answerArray ,i) {
        nowQuestion = i;
        nowQuestion++;
        getContent(answerArray, nowQuestion);
    }

    //  点击提交
    function next(answerArray, index) {
        several = answerArray.length;
        console.log("预选择：" + index);
        $('#submit').unbind("click");	// 清除提交点击事件
        $('#submit').click(function () {
            $(".style").unbind("touchstart");		// 清除ABCD点击事件
            if ($(this).html() == "提交") {
                $(this).addClass("btnActive");
                console.log("提交选择：" + index);
                setRightSelectColor(answer, yesColor); 	// 正确选项标绿
                if (answer != index) {
                    setRightSelectColor(index, noColor); // 标红
                    selectRightAnswer(nowQuestion+1,several,2); 		// 2答错
                } else {
                    selectRightAnswer(nowQuestion+1,several,1); 		// 1答对
                }
                if(nowQuestion == several-1){
                    $(this).text("完成");
                }else{
                    $(this).text("下一题");
                }
            } else if ($(this).text() == "下一题"|$(this).text() == "完成") {
                $(this).removeClass("btnActive");
                $(this).unbind("click")// 清除提交点击事件
                selectErrorAnswer(answerArray, nowQuestion);
            }
        })
    }

    // 跳过之前答过的
    function skip(answerArray){
        if(answerArray[0].is_right != '0'){
            //跳过上次答过的
            for(var x=0; x<answerArray.length; x++){
                var is_right = answerArray[x].is_right;
                if(is_right != '0'){
                    nowQuestion += 1;
                }
                if(is_right == '1'){//上次答对
                    var singleScore = 100/parseInt(number);
                    score += singleScore;
                }
                if(is_right == '2'){//上次答错

                }
            }
        }else{nowQuestion = 0}
        return nowQuestion;
    }
    //读取新题数据
    function getContent(answerArray,i){
        if (i < answerArray.length) {
            answer = answerArray[i].answer;
            //拉取题目
            if(answerArray[i].question_type == "1"){    //单选
                $("#optionBox").attr('class','optionBox');
                $("#answerTitle").attr('class','answerTitle');
                var answerTitle = answerArray[i].title;
                answerTitle = answerTitle.replace(/\n/g, "<br/>");
                $("#answerTitle").html(answerTitle);
            }else if(answerArray[i].question_type == "2"){  //多选
                $("#optionBox").attr('class','optionBoxCheckbox');
                $("#answerTitle").attr('class','answerTitleCheckbox');
                var answerTitle = answerArray[i].title;
                var answerMultiple_choice = answerArray[i].multiple_choice;
                    answerMultiple_choice = answerMultiple_choice.replace(/\n/g, "<br/>");
                $("#answerTitle").html(answerTitle + '<div id="checkbox" class="checkbox">'+answerMultiple_choice+'</div>');
            }else if(answerArray[i].question_type == "3"){  //判断

            }
            $("#answerCount").text(i+1+ "/" + answerArray.length);
            $("#answerA").html('A、' + answerArray[i].a);
            $("#answerB").html('B、' + answerArray[i].b);
            $("#answerC").html('C、' + answerArray[i].c);
            // 判断是否有d选项
            if (answerArray[i].d != "") {
                $("#answerD").show().html('D、' + answerArray[i].d);
            } else {
                $("#answerD").hide()
            }

            setNormalColor();   //初始化颜色
            selectAnswer(answerArray);     //添加点击选择事件
            console.log(score)
        }else{
            console.log(score)
            //  发送分数
            var unionId = localStorage.getItem("unionId");
            var avatar = localStorage.getItem("avatar");
            var nickname = localStorage.getItem("nickname");
            var parentName = localStorage.getItem("parentName" + childId);
            $.getJSON(baseUrlphp + "saveScore", {
                'client_version': '1',
                'device_id': '1',
                'platform': 'web',
                'score': parseInt(score),
                'unionId': unionId,
                'avatar': avatar,
                'nickName': nickname,
                'topParentId':topParentId,
                'parentId':childId,
                'parentName':parentName
            }, function (data) {
                if (data.status == 200) {
                    console.log(data)
                    window.location.href = "score.html?id=" + data.data.id;
                }
            });
        }
    }
});