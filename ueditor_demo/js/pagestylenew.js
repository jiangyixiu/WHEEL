/**
 * Created by xyloveqx on 2017/5/25.
 */
var user_vip = 2;

/*选择的样式----------Title-----------进入文本编辑器*/
function shifuMouseDown(style_id){

    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }
    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }
    //进行文字替换
    if(style_id=='shifu_t_002'||style_id=='shifu_t_003'){
        styleContent = currentStyle.replace('大标题',selectedText);
    }else if(style_id=='shifu_t_004'){
        styleContent = currentStyle.replace('请输入标题文字',selectedText);
    }else{
        styleContent = currentStyle.replace('标题',selectedText);
    }
    //插入到当前编辑器中
    UE.getEditor('editor').execCommand('insertHtml',styleContent);
}

/*选择的样式--------Card----------进入文本编辑器*/
function shifuMouseDownCard(style_id){

    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }
    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        //获取到的样式中的要替换的文字
        var styleText = map.get(style_id);
        //进行文字替换
        var styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }
}


/*选择的样式----------Other-----------进入文本编辑器*/
function shifuMouseDownOther(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }
    //插入到当前编辑器中
    if(style_id =="shifu_o_007"||style_id =="shifu_o_008"||style_id =="shifu_o_009"||style_id =="shifu_o_014"||style_id =="shifu_o_015"||style_id =="shifu_o_016"){
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
    }else{
        var tempCurrentStyle = currentStyle.replace("230px;","100%; ");
        UE.getEditor('editor').execCommand('insertHtml',tempCurrentStyle);
    }
}



/*选择的样式----------Pic-----------进入文本编辑器*/
function shifuMouseDownPic(style_id){

    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    if(style_id =="shifu_p_001"||style_id =="shifu_p_002"||style_id =="shifu_p_003"||style_id =="shifu_p_004"||style_id =="shifu_p_005"||style_id =="shifu_p_006"||style_id =="shifu_p_007"||style_id =="shifu_p_008"||style_id =="shifu_p_009"||style_id =="shifu_p_009"||style_id =="shifu_p_010"||style_id =="shifu_p_011"||style_id =="shifu_p_012"||style_id =="shifu_p_013"||style_id =="shifu_p_014"||style_id =="shifu_p_016"||style_id =="shifu_p_017"||style_id =="shifu_p_018"||style_id =="shifu_p_019"||style_id =="shifu_p_020"||style_id =="shifu_p_021"||style_id =="shifu_p_022"||style_id =="shifu_p_023"){
        var tempCurrentStyle = currentStyle.replace("100%;","320px;");
        UE.getEditor('editor').execCommand('insertHtml',tempCurrentStyle);
    }else{
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
    }
}

/*选择的样式----------Mark-----------进入文本编辑器*/
function shifuMouseDownMark(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).innerHTML;
    UE.getEditor('editor').execCommand('insertHtml',currentStyle);
}


/*选择的样式----------White-----------进入文本编辑器*/
function shifuMouseDownWhite(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    UE.getEditor('editor').execCommand('insertHtml',currentStyle);

}

/*选择的样式----------spring-----------进入文本编辑器*/
function shifuMouseDownSpring(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    UE.getEditor('editor').execCommand('insertHtml',currentStyle);

}

/*选择的样式----------summer-----------进入文本编辑器*/
function shifuMouseDownSummer(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        // 修改内容
        if(style_id=='shifu_sum_002'){
            //获取到的样式中的要替换的文字
            var styleText = map.get(style_id);
            //进行文字替换
            styleContent = currentStyle.replace(styleText,selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);

        }else if(style_id=='shifu_sum_003'||style_id=='shifu_sum_004'||style_id=='shifu_sum_005'){
            UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        }else{
            // 修改标题
            //进行文字替换
            styleContent = currentStyle.replace('标题',selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);
        }

    }
}
/*选择的样式----------childhood-----------进入文本编辑器*/
function shifuMouseDownChildhood(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        // 修改内容
        if(style_id=='shifu_chi_002'||style_id=='shifu_chi_003'){
            //获取到的样式中的要替换的文字
            var styleText = map.get(style_id);
            //进行文字替换
            styleContent = currentStyle.replace(styleText,selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);

        }else if(style_id=='shifu_chi_004'){
            UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        }else{
            // 修改标题
            //进行文字替换
            styleContent = currentStyle.replace('标题',selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);
        }

    }
}
/*选择的样式----------graduation-----------进入文本编辑器*/
function shifuMouseDownGraduation(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        // 修改内容
        if(style_id=='shifu_gra_005'){
            //获取到的样式中的要替换的文字
            var styleText = map.get(style_id);
            //进行文字替换
            styleContent = currentStyle.replace(styleText,selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);

        }else if(style_id=='shifu_gra_003'||style_id=='shifu_gra_006'){
            UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        }else{
            // 修改标题
            //进行文字替换
            styleContent = currentStyle.replace('标题',selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);
        }

    }
}

/*选择的样式----------dragon-----------进入文本编辑器*/
function shifuMouseDownDragon(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        // 修改内容
        if(style_id=='shifu_dra_003'||style_id=='shifu_dra_007'){
            //获取到的样式中的要替换的文字
            var styleText = map.get(style_id);
            //进行文字替换
            styleContent = currentStyle.replace(styleText,selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);

        }else if(style_id=='shifu_dra_004'||style_id=='shifu_dra_005'){
            UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        }else{
            // 修改标题
            //进行文字替换
            styleContent = currentStyle.replace('端午节',selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);
        }

    }
}
/*选择的样式----------father-----------进入文本编辑器*/
function shifuMouseDownFather(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        // 修改内容
        if(style_id=='shifu_fat_004'||style_id=='shifu_fat_005'||style_id=='shifu_fat_006'){
            //获取到的样式中的要替换的文字
            var styleText = map.get(style_id);
            //进行文字替换
            styleContent = currentStyle.replace(styleText,selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);

        }else if(style_id=='shifu_fat_003'){
            UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        }else{
            // 修改标题
            //进行文字替换
            styleContent = currentStyle.replace('父亲节',selectedText);
            //插入到当前编辑器中
            UE.getEditor('editor').execCommand('insertHtml',styleContent);
        }

    }
}

/*选择的样式----------signature-----------进入文本编辑器*/
function shifuMouseDownSignature(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    UE.getEditor('editor').execCommand('insertHtml',currentStyle);
}

/*选择的样式----------newest-----------进入文本编辑器*/
function shifuMouseDownNewest(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    UE.getEditor('editor').execCommand('insertHtml',currentStyle);

}
/*选择的样式----------magpie-----------进入文本编辑器*/
function shifuMouseDownMagpie(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        var styleText = map.get(style_id);
        //进行文字替换
        styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }

}

/*选择的样式----------minions-----------进入文本编辑器*/
function shifuMouseDownMinions(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        var styleText = map.get(style_id);
        //进行文字替换
        styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }

}

/*选择的样式----------teacher-----------进入文本编辑器*/
function shifuMouseDownTeacher(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        var styleText = map.get(style_id);
        //进行文字替换
        styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }

}
/*选择的样式----------iphone-----------进入文本编辑器*/
function shifuMouseDownIphone(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        var styleText = map.get(style_id);
        //进行文字替换
        styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }

}
/*选择的样式----------样式点击事件-----------进入文本编辑器*/
function shifuMouseDownStyle(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终,本样式来自i排版</p>';
    }

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        var styleText = map.get(style_id);
        //进行文字替换
        styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }

}
/*选择的样式----------样式点击事件-----------进入文本编辑器*/
function shifuMouseDownPayStyle(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');
    currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;
    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);
        return;
    }else{
        var styleText = map.get(style_id);
        //进行文字替换
        styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }

}
/*选择的付费样式样式----------样式点击事件-----------进入文本编辑器*/
function shifuMouseDownVipPayStyle(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');
    currentStyle = currentStyle+'<p class="shifubrush"></br></p>';

    var username = getCookie('username');
    if(username==null || username==""){
        $("#LoginModal").modal('show');
    }else{
        $('#xhr_modal').show()
    }

}
/*选择的样式----------样式点击事件-----------进入文本编辑器*/
function shifuMouseDownPayStyleAutokol(style_id){
    //获取当前的式样
    var currentStyle = document.getElementById(style_id).outerHTML;
    currentStyle = currentStyle.replace('onmousedown','donone');
    currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    if(style_id == 'shifu_auto_005'){
        currentStyle = currentStyle.replace('24em','20em');
    }
    //获取当前选中的文字-做为全局变量
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    selectedText = UE.getEditor('editor').selection.getText();
    var styleContent;

    //如果选中的内容为空则空式样插入
    if (selectedText == null || selectedText == undefined || selectedText == ''){
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',currentStyle);

        return;
    }else{
        var styleText = map.get(style_id);
        //进行文字替换
        styleContent = currentStyle.replace(styleText,selectedText);
        //插入到当前编辑器中
        UE.getEditor('editor').execCommand('insertHtml',styleContent);
    }

}
/*根据颜色的不同进行选择*/
function changeColorValue(color_value,hex){
    //标题
    $('#shifu_t_001 .color').css({'background-color':color_value});
    $('#shifu_t_001 .wihudong').css('color',hex);
    $('#shifu_t_002 .color').css({'border-color':color_value});
    $('#shifu_t_002 .color2').css({'background-color':color_value});
    $('#shifu_t_002 .wihudong').css('color',hex);
    $('#shifu_t_003 .color').css({'border-color':color_value});
    $('#shifu_t_005 span').css({'border-color':color_value, 'color':color_value});
    $('#shifu_t_005 p').css({'border-color':color_value,'color':color_value});
    $('#shifu_t_006 .color1').css('color',color_value);
    $('#shifu_t_006 .color1').css('border-color',color_value);
    $('#shifu_t_006 .color').css('border-color',color_value);
    $('#shifu_t_006 .color').css('background-color',color_value);
    $('#shifu_t_006 .wihudong').css('color',hex);
    $('#shifu_t_007 span').css('color',color_value);
    $('#shifu_t_008 .color').css('background-color',color_value);
    $('#shifu_t_008 span').css('color',color_value);
    $('#shifu_t_009 .color').css('background-color',color_value);//
    $('#shifu_t_009 .wihudong').css('color',hex);
    $('#shifu_t_010 .color').css({'border-color':color_value,'color':'color_value'});
    $('#shifu_t_011 section').css('background-color',color_value);
    $('#shifu_t_011 .wihudong').css('color',hex);
    $('#shifu_t_012 .color').css('color',color_value);//
    $('#shifu_t_013 section:first').css({'border-color':color_value,'color':color_value});
    $('#shifu_t_014').css('color',color_value);//
    $('#shifu_t_015').css('border-color',color_value);
    $('#shifu_t_016').css('border-color',color_value);
    $('#shifu_t_017').css('color',color_value);
    $('#shifu_t_018 .color').css('background-color',color_value);
    $('#shifu_t_018 .wihudong').css('color',hex);
    $('#shifu_t_018 span').css({'border-color':color_value,'background-color':color_value});
    $('#shifu_t_19 > section > span').css('background-color',color_value);//
    $('#shifu_t_19 .wihudong').css('color',hex);
    $('#shifu_t_020 span').css('color',color_value);
    $('#shifu_t_020 > section > section').css('background-color',color_value);
    $('#shifu_t_020 .wihudong').css('color',hex);
    $('#shifu_t_021 section').css('border-top-color',color_value);
    $('#shifu_t_021 .color').css('background-color',color_value);
    $('#shifu_t_022 .color2').css('border-bottom-color',color_value);
    $('#shifu_t_022 .color1').css('background-color',color_value);
    $('#shifu_t_025 .color').css('background-color',color_value);
    $('#shifu_t_025 .wihudong').css('color',hex);
    $('#shifu_t_026 .color').css('background-color',color_value);
    $('#shifu_t_026 .ipaiban').css('border',hex);
    $('#shifu_t_026 .wihudong').css('color',hex);
    $('#shifu_t_027 .color').css('border-color',color_value);
    $('#shifu_t_028 .color1').css('background-color',color_value);
    $('#shifu_t_028 .color2').css('border-color',color_value);
    $('#shifu_t_028 .color3').css('border-top-color',color_value);
    $('#shifu_t_029 .color').css('color',color_value);
    $('#shifu_t_030 .color1').css('background-color',color_value);
    $('#shifu_t_030 .color1').css('color',color_value);
    $('#shifu_t_030 .color2').css('color',color_value);
    $('#shifu_t_031 .color1').css('background-color',color_value);
    $('#shifu_t_031 .color2').css('border-color',color_value);
    $('#shifu_t_031 .wihudong').css('color',hex);
    $('#shifu_t_032 .color').css('background-color',color_value);
    $('#shifu_t_033 .xhr').css('background-color',color_value);
    $('#shifu_t_033 .wihudong').css('color',hex);
    $('#shifu_t_034 .xhr').css('background-color',color_value);
    $('#shifu_t_034 .wihudong').css('color',hex);
    $('#shifu_t_035 .xhr').css('background-color',color_value);
    $('#shifu_t_036 .xhr').css('background-color',color_value);
    $('#shifu_t_036 .wihudong').css('color',hex);
    $('#shifu_t_037 .xhr').css('background-color',color_value);
    $('#shifu_t_041 .xhr').css('background-color',color_value);
    $('#shifu_t_041 .wihudong').css('color',hex);
    $('#shifu_t_042 .xhr').css('background-color',color_value);
    $('#shifu_t_043 .xhr').css('background-color',color_value);
    $('#shifu_t_044 .xhr').css('border-top-color',color_value);
    $('#shifu_t_044 .xhr').css('border-bottom-color',color_value);
    $('#shifu_t_045 .xhr').css('border-bottom-color',color_value);
    $('#shifu_t_046 .xhr').css('border-top-color',color_value);
    $('#shifu_t_046 .xhr').css('border-bottom-color',color_value);
    $('#shifu_t_047 .xhr').css('border-bottom-color',color_value);
    $('#shifu_t_048 .xhr').css('border-left-color',color_value);
    $('#shifu_t_049 .xhr').css('border-bottom-color',color_value);
    $('#shifu_t_049 .wihudong').css('color',hex);
    $('#shifu_t_050 .border').css('border-top-color',color_value);
    $('#shifu_t_050 .xhr').css('border-right-color',color_value);
    $('#shifu_t_050 .ipaiban').css('border-color',color_value);
    $('#shifu_t_050 .xhr').css('border-left-color',color_value);
    $('#shifu_t_051 .xhr').css('background-color',color_value);
    $('#shifu_t_051 .wihudong').css('color',hex);
    $('#shifu_t_052 .ipaiban').css('border-color',color_value);
    $('#shifu_t_052 .wihudong').css('color',color_value);
    $('#shifu_t_053 .ipaiban').css('border-color',color_value);
    $('#shifu_t_054 .ipaiban').css('border-color',color_value);
    //卡片
    $('#shifu_c_002 section').css('border-color',color_value);
    $('#shifu_c_002 .color').css({'background':color_value});
    $('#shifu_c_002 .wihudong').css('color',hex);
    $('#shifu_c_003 .color').css({'background':color_value});
    $('#shifu_c_003 .wihudong').css('color',hex);
    $('#shifu_c_004 .color').css('background',color_value);
    $('#shifu_c_004 .wihudong').css('color',hex);
    $('#shifu_c_005 section').css('border-color',color_value);
    $('#shifu_c_005 .color').css('border-top-color',color_value);
    $('#shifu_c_006 section').css('border-color',color_value);
    $('#shifu_c_007 .color').css('color',color_value);
    $('#shifu_c_008 .color').css('color',color_value);
    $('#shifu_c_009').css('border-color',color_value);
    $('#shifu_c_010').css('border-color',color_value);
    $('#shifu_c_011').css('border-color',color_value);
    $('#shifu_c_014').css('border-color',color_value);
    $('#shifu_c_015,#shifu_c_013 section').css('border-color',color_value);
    $('#shifu_c_015 .color').css('border-color',color_value);
    $('#shifu_c_016,#shifu_c_014 section').css('border-color',color_value);
    $('#shifu_c_016 > section').css('border-color',color_value);
    $('#shifu_c_017').css('border-color',color_value);
    $('#shifu_c_018').css('border-color',color_value);
    $('#shifu_c_038 .color').css('color',color_value);
    $('#shifu_c_039 .color').css('color',color_value);
    $('#shifu_c_040 .color').css('border-color',color_value);
    $('#shifu_c_019  .color-border').css('border-color',color_value);
    $('#shifu_c_020 .color-border').css('border-color',color_value);
    $('#shifu_c_021').css('border-color',color_value);
    $('#shifu_c_022').css({'background-color':color_value,'color':'#fff','text-shadow':'rgb(118, 118, 118) 0px 1px 0px'});
    $('#shifu_c_022 .wihudong').css('color',hex);
    $('#shifu_c_023').css('border-color',color_value);
    $('#shifu_c_024').css('border-color',color_value);
    $('#shifu_c_025').css('border-color',color_value);
    $('#shifu_c_025 .wihudong').css('color',hex);
    $('#shifu_c_025 section:first').css({'background-color':color_value,'color':'#fff'});
    $('#shifu_c_026 .color').css('background-color',color_value);
    $('#shifu_c_026 .wihudong').css('color',hex);
    $('#shifu_c_027 .color').css('background-color',color_value);
    $('#shifu_c_027 .wihudong').css('color',hex);
    $('#shifu_c_028 section:first').css('background-color',color_value);
    $('#shifu_c_028 .wihudong').css('color',hex);
    $('#shifu_c_029 span:first').css('background-color',color_value);
    $('#shifu_c_029 .color').css('border-color',color_value);
    $('#shifu_c_029 .wihudong').css('color',hex);
    $('#shifu_c_030 span:first').css('background-color',color_value);
    $('#shifu_c_030 .color').css('border-color',color_value);
    $('#shifu_c_030 .wihudong').css('color',hex);
    $('#shifu_c_031 span:first').css('background-color',color_value);
    $('#shifu_c_031 .wihudong').css('color',hex);
    $('#shifu_c_032 section:first').css('background-color',color_value);
    $('#shifu_c_032 .wihudong').css('color',hex);
    $('#shifu_c_033 section:first').css('border-color',color_value);
    $('#shifu_c_034').css('background-color',color_value);
    $('#shifu_c_034').css({'color':color_value,'color':'#fff'});
    $('#shifu_c_034 .wihudong').css('color',hex);
    $('#shifu_c_035 section').css({'color':'#fff','background-color':color_value});
    $('#shifu_c_037 .xhr').css('background-color',color_value);
    $('#shifu_c_037 .wihudong').css('color',hex);
    $('#shifu_car_001 .xhr').css('background-color',color_value);
    $('#shifu_car_001 .ipaiban').css('border-top-color',color_value);
    $('#shifu_car_001 .wihudong').css('color',hex);
    $('#shifu_car_002 .xhr').css('background-color',color_value);
    $('#shifu_car_002 .wihudong').css('color',hex);
    $('#shifu_car_004 .xhr').css('background-color',color_value);
    $('#shifu_car_004 .wihudong').css('color',hex);
    $('#shifu_car_005 .xhr').css('background-color',color_value);
    $('#shifu_car_005 .ipaiban').css('border-color',color_value);
    $('#shifu_car_005 .wihudong').css('color',hex);
    $('#shifu_car_006 .xhr').css('background-color',color_value);
    $('#shifu_car_006 .ipaiban').css('border-color',color_value);
    $('#shifu_car_006 .wihudong').css('color',hex);
    $('#shifu_car_007 .xhr').css('background-color',color_value);
    $('#shifu_car_007 .ipaiban').css('border-color',color_value);
    $('#shifu_car_007 .wihudong').css('color',hex);
    $('#shifu_car_008 .xhr').css('background-color',color_value);
    $('#shifu_car_008 .ipaiban').css('border-color',color_value);
    $('#shifu_car_008 .wihudong').css('color',hex);
    $('#shifu_car_010 .xhr').css('background-color',color_value);
    $('#shifu_car_011 .xhr').css('background-color',color_value);
    $('#shifu_car_011 .wihudong').css('color',hex);

    //其它
    $('#shifu_o_005 .border').css('border-bottom-color',color_value);
    $('#shifu_o_005 .color').css('background-color',color_value);
    $('#shifu_o_006 .border').css('border-top-color',color_value);
    $('#shifu_o_006 .color').css('background-color',color_value);
    $('#shifu_o_007 .border').css('border-bottom-color',color_value);
    $('#shifu_o_007 .color').css('border-color',color_value);
    $('#shifu_o_008 .border').css('border-top-color',color_value);
    $('#shifu_o_008 .color').css('border-color',color_value);
    $('#shifu_o_009 section').css('background-color',color_value);
    $('#shifu_o_009 section').css('background-color',color_value);
    $('#shifu_o_010 section').css('background-color',color_value);
    $('#shifu_o_011 section').css('background-color',color_value);
    $('#shifu_o_012 .color').css('background-color',color_value);
    $('#shifu_o_012 .border').css('border-top-color',color_value);
    $('#shifu_o_013 section,#shifu_o_014 section,#shifu_o_015 section,#shifu_o_016 section').css('background-color',color_value);
    $('.the-icons td span').css('color',color_value);
    $('#shifu_o_032 .color').css('border-bottom-color',color_value);
    $('#shifu_o_033 .color').css('border-bottom-color',color_value);
    $('#shifu_o_040 .color').css('border-bottom-color',color_value);
    $('#shifu_o_041 .color').css('border-bottom-color',color_value);
    $('#shifu_o_042 .color').css('border-bottom-color',color_value);

    $('#shifu_o_001 .color').css('background-color',color_value);
    $('#shifu_o_002 .color').css('background-color',color_value);
    $('#shifu_o_003 .color').css('background-color',color_value);
    $('#shifu_o_004 .color').css('background-color',color_value);
    $('#shifu_o_023 .color').css('background-color',color_value);
    $('#shifu_o_024 .color').css('background-color',color_value);
    $('#shifu_o_025 .color').css('background-color',color_value);
    $('#shifu_o_034 .color').css('background-color',color_value);
    $('#shifu_o_035 .color').css('background-color',color_value);
    $('#shifu_o_043 .color').css('background-color',color_value);
    $('#shifu_o_044 .color').css('background-color',color_value);
    $('#shifu_o_045 .color').css('background-color',color_value);
    $('#shifu_o_047 .color').css('background-color',color_value);
    $('#shifu_o_048 .color').css('background-color',color_value);
    $('#shifu_o_049 .color').css('background-color',color_value);
    $('#shifu_o_049 .wihudong').css('color',color_value);
    $('#shifu_o_050 .color').css('background-color',color_value);
    $('#shifu_o_053 .color').css('background-color',color_value);
    $('#shifu_pay_019 .color').css('background-color',color_value);
    $('#shifu_pay_021 .color').css('background-color',color_value);
    //最新
    $('#shifu_new_001 .color').css('background-color',color_value);
    $('#shifu_new_002 .color1').css('border-color',color_value);
    $('#shifu_new_002 .color2').css('background-color', color_value);
    //图文
    $('#shifu_p_023 .color').css('color',color_value);
    $('#shifu_p_022 .color').css('color',color_value);
    $('#shifu_p_025 .color').css('color',color_value);
    $('#shifu_p_027 .color').css('color',color_value);
    $('#shifu_p_031 .color').css('border-color',color_value);
    $('#shifu_p_032 .color').css('border-color',color_value);
    $('#shifu_p_033 .color').css('border-color',color_value);
    $('#shifu_p_034 .color').css('border-color',color_value);
    $('#shifu_p_035 .color').css('border-top-color',color_value);
    $('#shifu_p_035 .color1').css('border-color',color_value);
    $('#shifu_p_036 .color1').css('border-bottom-color',color_value);
    $('#shifu_p_036 .color').css('border-color',color_value);
    $('#shifu_p_036 .color').css('color',color_value);
    $('#shifu_p_037 .color1').css('border-top-color',color_value);
    $('#shifu_p_037 .color').css('color',color_value);
    $('#shifu_p_040 .color').css('background-color',color_value);

    //小黄人
    $('#shifu_min_005 .color').css('background-color',color_value);
    //教师节
    $('#shifu_tea_002 .color').css('border-color',color_value);
    $('#shifu_tea_003 .color').css('border-color',color_value);
    //中秋节
    $('#shifu_moo_002 .color').css('border-color',color_value);
    $('#shifu_moo_004 .color').css('background-color',color_value);
    $('#shifu_moo_006 .color').css('background-color',color_value);
    $('#shifu_moo_006 .color1').css('border-color',color_value);
    $('#shifu_mid_005 .ipaiban').css('border-color',color_value);
    $('#shifu_mid_006 .ipaiban').css('border-color',color_value);
    // 秋季
    $('#shifu_aut_002 .color').css('border-color',color_value);
    $('#shifu_aut_005 .color').css('border-color',color_value);
    $('#shifu_aut_008 .color').css('border-color',color_value);
    $('#shifu_atq_002 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_atq_002 .ipaiban').css('border-right-color',color_value);
    $('#shifu_atq_002 .xhr').css('background-color',color_value);
    $('#shifu_atq_002 .wihudong').css('color',color_value);
    $('#shifu_atq_003 .xhr').css('background-color',color_value);
    $('#shifu_atq_003 .ipaiban').css('border-color',color_value);
    $('#shifu_atq_004 .xhr').css('background-color',color_value);
    $('#shifu_atq_004 .ipaiban').css('border-right-color',color_value);
    $('#shifu_atq_004 .wihudong').css('color',color_value);
    $('#shifu_atq_005 .xhr').css('background-color',color_value);
    $('#shifu_atq_006 .xhr').css('background-color',color_value);
    $('#shifu_atq_006 .ipaiban').css('border-color',color_value);
    $('#shifu_atq_007 .xhr').css('background-color',color_value);
    $('#shifu_atq_007 .ipaiban').css('border-top-color',color_value);
    $('#shifu_atq_007 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_atq_008 .ipaiban').css('border-top-color',color_value);
    $('#shifu_atq_008 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_atq_008 .xhr').css('background-color',color_value);
    // 万圣节
    $('#shifu_hal_001 .color').css('background-color',color_value);
    $('#shifu_hal_002 .color').css('background-color',color_value);
    $('#shifu_hal_003 .color').css('border-color',color_value);
    $('#shifu_hal_004 .color').css('border-color',color_value);
    $('#shifu_hal_009 .color').css('background-color',color_value);
    // 商务范
    $('#shifu_bus_001 .color').css('background-color',color_value);
    $('#shifu_bus_001 .wihudong').css('color',hex);
    $('#shifu_bus_001 .color1').css('border-bottom-color',color_value);
    $('#shifu_bus_001 .color2').css('border-bottom-color',color_value);
    $('#shifu_bus_002 .color1').css('border-color',color_value);
    $('#shifu_bus_002 .color2').css('background-color',color_value);
    $('#shifu_bus_003 .color1').css('background-color',color_value);
    $('#shifu_bus_003 .color2').css('border-left-color',color_value);
    $('#shifu_bus_003 .wihudong').css('color',hex);
    $('#shifu_bus_004 .color1').css('background-color',color_value);
    $('#shifu_bus_004 .color2').css('border-top-color',color_value);
    $('#shifu_bus_004 .wihudong').css('color',hex);
    $('#shifu_bus_005 .color1').css('border-color',color_value);
    $('#shifu_bus_005 .color2').css('background-color',color_value);
    $('#shifu_bus_005 .color3').css('border-left-color',color_value);

    // 付费样式
    $('#shifu_pay_001 .color').css('background-color',color_value);
    $('#shifu_pay_001 .color1').css('border-color',color_value);
    $('#shifu_pay_002 .color1').css('background-color',color_value);
    $('#shifu_pay_002 .wihudong').css('color',hex);
    $('#shifu_pay_003 .color').css('color',color_value);
    $('#shifu_pay_003 .color1').css('border-color',color_value);
    $('#shifu_pay_004 .color1').css('border-right-color',color_value);
    $('#shifu_pay_004 .color2').css('background-color',color_value);
    $('#shifu_pay_004 .color3').css('border-top-color',color_value);
    $('#shifu_pay_004 .wihudong').css('color',hex);
    $('#shifu_pay_005 .color').css('background-color',color_value);
    $('#shifu_pay_007 .color').css('color',color_value);
    $('#shifu_pay_009 .color').css('background-color',color_value);
    $('#shifu_pay_010 .color').css('background-color',color_value);
    $('#shifu_pay_010 .color1').css('border-color',color_value);
    $('#shifu_pay_012 .color_b').css('border-color',color_value);
    $('#shifu_pay_012 .color_back').css('background-color',color_value);
    $('#shifu_pay_016 .ipaiban').css('border-color',color_value);


    // 感恩节
    $('#shifu_tha_001 .color').css('border-color',color_value);
    $('#shifu_tha_002 .color').css('border-color',color_value);
    $('#shifu_tha_003 .color').css('background-color',color_value);
    $('#shifu_tha_004 .color').css('border-color',color_value);
    // 微信公开课
    $('#shifu_wxc_001 .xhr').css('background-color',color_value);
    $('#shifu_wxc_003 .wihudong').css('background-color',color_value);
    $('#shifu_wxc_005 .ipaiban').css('border-color',color_value);
    $('#shifu_wxc_006 .xhr').css('border-color',color_value);
    $('#shifu_wxc_007 .wihudong').css('border-color',color_value);
    $('#shifu_wxc_008 .ipaiban').css('background-color',color_value);
    $('#shifu_wxc_009 .ipaiban').css('border-color',color_value);
    $('#shifu_wxc_009 .xhr').css('background-color',color_value);
    $('#shifu_wxc_010 .color').css('background-color',color_value);
    $('#shifu_wxc_010 .color1').css('border-color',color_value);
    $('#shifu_wxc_010 .xhr').css('color',color_value);
    $('#shifu_wxc_010 .ipaiban').css('background-color',color_value);
    $('#shifu_wxc_011 .ipaiban').css('border-color',color_value);
    $('#shifu_wxc_011 .xhr').css('border-top-color',color_value);
    $('#shifu_wxc_011 .wihudong').css('border-bottom-color',color_value);
    $('#shifu_wxc_012 .xhr').css('background-color',color_value);
    $('#shifu_wxc_013 .xhr').css('background-color',color_value);
    $('#shifu_wxc_014 .xhr').css('border-color',color_value);
    $('#shifu_wxc_014 .xhr').css('color',color_value);
    $('#shifu_wxc_015 .ipaiban').css('border-color',color_value);
    //圣诞节
    $('#shifu_chr_001 .xhr').css('background-color',color_value);
    $('#shifu_chr_001 .xhr').css('background-color',color_value);
    $('#shifu_chr_007 .ipaiban').css('background-color',color_value);
    $('#shifu_chr_007 .ipaiban').css('border-color',color_value);
    $('#shifu_chr_010 .wihudong').css('background-color',color_value);
    $('#shifu_chr_011 .wihudong').css('background-color',color_value);
    // 元旦
    $('#shifu_year_001 .xhr').css('background-color',color_value);
    $('#shifu_year_002 .wihudong').css('background-color',color_value);
    $('#shifu_year_003 .wihudong').css('background-color',color_value);
    $('#shifu_year_004 .ipaiban').css('background-color',color_value);
    $('#shifu_year_005 .xhr').css('background-color',color_value);
    $('#shifu_year_009 .ipaiban').css('border-left-color',color_value);
    $('#shifu_year_009 .ipaiban').css('border-right-color',color_value);
    $('#shifu_year_009 .xhr').css('background-color',color_value);
    $('#shifu_year_011 .ipaiban').css('border-left-color',color_value);
    $('#shifu_year_011 .xhr').css('background-color',color_value);
    $('#shifu_year_015 .ipaiban').css('border-color',color_value);

    // 鳌头样式
    $('#shifu_auto_001 .xhr').css('color',color_value);
    $('#shifu_auto_002 .wihudong').css('border-color',color_value);
    $('#shifu_auto_002 .ipaiban').css('color',color_value);
    $('#shifu_auto_003 .xhr').css('background-color',color_value);
    $('#shifu_auto_005 .wihudong').css('color',color_value);
    $('#shifu_auto_006 .xhr').css('background-color',color_value);
    $('#shifu_auto_006 .ipaiban').css('border-top-color',color_value);
    $('#shifu_auto_007 .xhr').css('background-color',color_value);
    $('#shifu_auto_007 .ipaiban').css('border-top-color',color_value);
    $('#shifu_auto_008 .wihudong').css('border-color',color_value);
    $('#shifu_auto_009 .xhr').css('border-top-color',color_value);
    $('#shifu_auto_010 .xhr').css('background-color',color_value);
    $('#shifu_auto_010 .ipaiban').css('color',color_value);
    $('#shifu_auto_011 .xhr').css('background-color',color_value);
    $('#shifu_auto_011 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_auto_012 .wihudong').css('border-color',color_value);
    $('#shifu_auto_013 .xhr').css('border-color',color_value);
    $('#shifu_auto_014 .ipaiban').css('background-color',color_value);
    $('#shifu_auto_014 .wihudong').css('border-bottom-color',color_value);
    $('#shifu_auto_015 .xhr').css('background-color',color_value);
    $('#shifu_auto_015 .ipaiban').css('border-color',color_value);
    $('#shifu_auto_016 .wihudong').css('color',color_value);
    $('#shifu_auto_017 .ipaiban').css('border-left-color',color_value);
    $('#shifu_auto_018 .ipaiban').css('border-left-color',color_value);
    $('#shifu_auto_019 .xhr').css('background-color',color_value);
    $('#shifu_auto_020 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_auto_022 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_auto_023 .ipaiban').css('background-color',color_value);
    $('#shifu_auto_024 .ipaiban').css('border-color',color_value);
    $('#shifu_auto_025 .xhr').css('background-color',color_value);
    $('#shifu_auto_025 .ipaiban').css('border-top-color',color_value);
    $('#shifu_auto_026 .xhr').css('background-color',color_value);
    $('#shifu_auto_026 .ipaiban').css('border-top-color',color_value);
    // 维新派
    $('#shifu_wxp_001 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_wxp_001 .xhr').css('background-color',color_value);
    $('#shifu_wxp_002 .xhr').css('background-color',color_value);
    $('#shifu_wxp_003 .xhr').css('background-color',color_value);
    $('#shifu_wxp_004 .xhr').css('background-color',color_value);
    $('#shifu_wxp_005 .xhr').css('background-color',color_value);
    $('#shifu_wxp_006 .ipaiban').css('border-left-color',color_value);
    $('#shifu_wxp_006 .wihudong').css('color',color_value);
    $('#shifu_wxp_007 .xhr').css('background-color',color_value);
    $('#shifu_wxp_008 .wihudong').css('color',color_value);
    $('#shifu_wxp_009 .xhr').css('background-color',color_value);
    $('#shifu_wxp_010 .xhr').css('background-color',color_value);
    $('#shifu_wxp_011 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_wxp_012 .wihudong').css('color',color_value);
    $('#shifu_wxp_012 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_wxp_013 .xhr').css('background-color',color_value);
    $('#shifu_wxp_013 .ipaiban').css('border-top-color',color_value);
    // 情人节
    $('#shifu_val_001 .ipaiban').css('border-color',color_value);
    $('#shifu_val_002 .ipaiban').css('border-color',color_value);
    $('#shifu_val_003 .ipaiban').css('border-color',color_value);
    $('#shifu_val_004 .ipaiban').css('border-color',color_value);
    // 春节
    $('#shifu_mon_001 .ipaiban').css('border-color',color_value);
    $('#shifu_mon_002 .ipaiban').css('border-color',color_value);
    $('#shifu_mon_003 .xhr').css('background-color',color_value);
    $('#shifu_mon_006 .xhr').css('background-color',color_value);
    $('#shifu_mon_007 .xhr').css('background-color',color_value);
    $('#shifu_mon_008 .xhr').css('background-color',color_value);
    $('#shifu_mon_009 .xhr').css('background-color',color_value);
    $('#shifu_mon_013 .xhr').css('background-color',color_value);
    $('#shifu_mon_014 .ipaiban').css('border-color',color_value);
    $('#shifu_mon_014 .xhr').css('background-color',color_value);
    $('#shifu_mon_016 .xhr').css('background-color',color_value);
    $('#shifu_mon_018 .ipaiban').css('border-color',color_value);
    // 元宵节
    $('#shifu_lan_002 .ipaiban').css('border-color',color_value);
    $('#shifu_lan_003 .ipaiban').css('border-color',color_value);
    $('#shifu_lan_004 .ipaiban').css('border-color',color_value);
    $('#shifu_lan_005 .xhr').css('background-color',color_value);
    $('#shifu_lan_006 .xhr').css('background-color',color_value);
    $('#shifu_lan_007 .ipaiban').css('border-color',color_value);
    // 弹幕
    $('#shifu_bar_001 .xhr').css('background-color',color_value);
    $('#shifu_bar_002 .xhr').css('background-color',color_value);
    $('#shifu_bar_003 .xhr').css('background-color',color_value);
    $('#shifu_bar_004 .xhr').css('background-color',color_value);
    $('#shifu_bar_005 .xhr').css('background-color',color_value);
    $('#shifu_bar_006 .xhr').css('background-color',color_value);
    $('#shifu_bar_007 .xhr').css('background-color',color_value);
    $('#shifu_bar_008 .xhr').css('background-color',color_value);
    $('#shifu_bar_009 .xhr').css('background-color',color_value);
    $('#shifu_bar_010 .xhr').css('background-color',color_value);
    $('#shifu_bar_011 .xhr').css('background-color',color_value);
    $('#shifu_bar_012 .xhr').css('background-color',color_value);
    // 模板一
    $('#shifu_tem_001 .xhr').css('background-color',color_value);
    $('#shifu_tem_001 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem_001 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem_001 .wihudong').css('color',color_value);
    $('#shifu_tem_002 .xhr').css('background-color',color_value);
    $('#shifu_tem_002 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem_002 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem_003 .xhr').css('background-color',color_value);
    $('#shifu_tem_004 .xhr').css('background-color',color_value);
    $('#shifu_tem_005 .xhr').css('background-color',color_value);
    $('#shifu_tem_005 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem_005 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem_006 .xhr').css('background-color',color_value);
    $('#shifu_tem_007 .ipaiban').css('border-left-color',color_value);
    $('#shifu_tem_008 .xhr').css('background-color',color_value);
    $('#shifu_tem_009 .xhr').css('background-color',color_value);
    $('#shifu_tem_009 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem_010 .ipaiban').css('border-bottom-color',color_value);
    // 模板二
    $('#shifu_tem1_001 .xhr').css('background-color',color_value);
    $('#shifu_tem1_001 .ipaiban').css('border-left-color',color_value);
    $('#shifu_tem1_002 .xhr').css('background-color',color_value);
    $('#shifu_tem1_002 .ipaiban').css('border-right-color',color_value);
    $('#shifu_tem1_003 .xhr').css('background-color',color_value);
    $('#shifu_tem1_003 .ipaiban').css('border-left-color',color_value);
    $('#shifu_tem1_004 .xhr').css('background-color',color_value);
    $('#shifu_tem1_004 .ipaiban').css('border-right-color',color_value);
    $('#shifu_tem1_005 .xhr').css('background-color',color_value);
    $('#shifu_tem1_005 .ipaiban').css('border-left-color',color_value);
    $('#shifu_tem1_006 .xhr').css('background-color',color_value);
    $('#shifu_tem1_006 .ipaiban').css('border-right-color',color_value);
    $('#shifu_tem1_007 .xhr').css('background-color',color_value);
    $('#shifu_tem1_007 .ipaiban').css('border-left-color',color_value);
    // 模板三
    $('#shifu_tem2_001 .wihudong').css('color',color_value);
    $('#shifu_tem2_003 .ipaiban').css('border-color',color_value);
    $('#shifu_tem2_003 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem2_004 .wihudong').css('color',color_value);
    $('#shifu_tem2_004 .ipaiban').css('border-left-color',color_value);
    $('#shifu_tem2_004 .ipaiban').css('border-right-color',color_value);
    $('#shifu_tem2_005 .wihudong').css('color',color_value);
    $('#shifu_tem2_005 .ipaiban').css('border-left-color',color_value);
    $('#shifu_tem2_005 .ipaiban').css('border-right-color',color_value);
    $('#shifu_tem2_005 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem2_006 .wihudong').css('color',color_value);
    $('#shifu_tem2_006 .ipaiban').css('border-left-color',color_value);
    $('#shifu_tem2_006 .ipaiban').css('border-bottom-color',color_value);
    // 模板四
    $('#shifu_tem3_001 .xhr').css('background-color',color_value);
    // 模板五
    $('#shifu_tem4_001 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem4_002 .xhr').css('background-color',color_value);
    $('#shifu_tem4_004 .ipaiban').css('border-right-color',color_value);
    $('#shifu_tem4_004 .xhr').css('background-color',color_value);
    $('#shifu_tem4_005 .xhr').css('background-color',color_value);
    $('#shifu_tem4_007 .xhr').css('background-color',color_value);
    $('#shifu_tem4_008 .xhr').css('background-color',color_value);
    $('#shifu_tem4_008 .ipaiban').css('border-right-color',color_value);
    $('#shifu_tem4_010 .ipaiban').css('border-right-color',color_value);
    // 模板六
    $('#shifu_tem5_001 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem5_001 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem5_002 .xhr').css('background-color',color_value);
    $('#shifu_tem5_004 .xhr').css('background-color',color_value);
    $('#shifu_tem5_005 .wihudong').css('color',color_value);
    $('#shifu_tem5_007 .xhr').css('background-color',color_value);
    $('#shifu_tem5_007 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem5_007 .ipaiban').css('border-bottom-color',color_value);
    // 模板八
    $('#shifu_tem8_001 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem8_002 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem8_002 .xhr').css('background-color',color_value);
    $('#shifu_tem8_003 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_tem8_003 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem8_004 .xhr').css('background-color',color_value);
    $('#shifu_tem8_004 .ipaiban').css('border-top-color',color_value);
    $('#shifu_tem8_005 .wihudong').css('color',color_value);
    $('#shifu_tem8_006 .wihudong').css('color',color_value);

    // 微名片
    $('#shifu_sig_015 .ipaiban').css('border-color',color_value);
    $('#shifu_sig_015 .xhr').css('background-color',color_value);
    $('#shifu_sig_020 .ipaiban').css('border-color',color_value);
    $('#shifu_sig_020 .xhr').css('background-color',color_value);
    $('#shifu_sig_022 .xhr').css('background-color',color_value);
    $('#shifu_sig_024 .xhr').css('background-color',color_value);
    $('#shifu_sig_025 .xhr').css('background-color',color_value);
    $('#shifu_sig_028 .xhr').css('background-color',color_value);
    $('#shifu_sig_023 .ipaiban').css('border-color',color_value);
    $('#shifu_sig_025 .ipaiban').css('border-top-color',color_value);

    // 付费模板
    $('#shifu_bri_001 .ipaiban').css('border-top-color',color_value);
    $('#shifu_bri_001 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_bri_002 .ipaiban').css('border-top-color',color_value);
    $('#shifu_bri_002 .ipaiban').css('border-color',color_value);
    $('#shifu_bri_002 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_bri_003 .ipaiban').css('border-top-color',color_value);
    $('#shifu_bri_003 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_bri_004 .ipaiban').css('border-top-color',color_value);
    $('#shifu_bri_004 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_bri_004 .ipaiban').css('border-left-color',color_value);
    $('#shifu_bri_004 .ipaiban').css('border-right-color',color_value);
    $('#shifu_ews_001 .xhr').css('background-color',color_value);
    $('#shifu_ews_001 .wihudong').css('color',color_value);
    $('#shifu_ews_002 .wihudong').css('color',color_value);
    $('#shifu_ews_003 .wihudong').css('color',color_value);
    $('#shifu_ews_004 .wihudong').css('color',color_value);
    $('#shifu_ews_005 .wihudong').css('color',color_value);
    $('#shifu_ews_006 .wihudong').css('color',color_value);
    $('#shifu_ews_006 .xhr').css('background-color',color_value);
    $('#shifu_ews_007 .xhr').css('background-color',color_value);
    $('#shifu_ews_007 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_onl_001 .wihudong').css('color',color_value);
    $('#shifu_onl_002 .ipaiban').css('border-left-color',color_value);
    $('#shifu_onl_003 .ipaiban').css('border-left-color',color_value);
    $('#shifu_onl_004 .xhr').css('background-color',color_value);
    $('#shifu_onl_005 .ipaiban').css('border-color',color_value);
    $('#shifu_onl_006 .ipaiban').css('border-color',color_value);
    $('#shifu_onl_006 .ipaiban').css('border-top-color',color_value);
    $('#shifu_onl_006 .wihudong').css('color',color_value);
    $('#shifu_onl_006 .xhr').css('background-color',color_value);
    $('#shifu_onl_007 .ipaiban').css('border-color',color_value);
    $('#shifu_onl_007 .ipaiban').css('border-top-color',color_value);
    $('#shifu_onl_007 .xhr').css('background-color',color_value);
    $('#shifu_onl_007 .wihudong').css('color',color_value);
    $('#shifu_spri_001 .wihudong').css('color',color_value);
    $('#shifu_onl_001 .wihudong').css('color',color_value);
    //十二星座
    $('#shifu_xin_001 .xhr').css('background-color',color_value);
    $('#shifu_xin_002 .xhr').css('background-color',color_value);
    $('#shifu_xin_003 .xhr').css('background-color',color_value);
    $('#shifu_xin_004 .xhr').css('background-color',color_value);
    $('#shifu_xin_005 .xhr').css('background-color',color_value);
    $('#shifu_xin_006 .xhr').css('background-color',color_value);
    $('#shifu_xin_007 .xhr').css('background-color',color_value);
    $('#shifu_xin_008 .xhr').css('background-color',color_value);
    $('#shifu_xin_009 .xhr').css('background-color',color_value);
    $('#shifu_xin_010 .xhr').css('background-color',color_value);
    $('#shifu_xin_011 .xhr').css('background-color',color_value);
    $('#shifu_xin_012 .xhr').css('background-color',color_value);
    //旅行
    $('#shifu_tou_003 .ipaiban').css('border-color',color_value);
    $('#shifu_tou_005 .wihudong').css('color',color_value);
    //按钮素材
    $('#shifu_uix_001 .xhr').css('background-color',color_value);
    $('#shifu_uix_001 .wihudong').css('color',hex);
    $('#shifu_uix_001 .ipaiban').css('border-color',color_value);
    $('#shifu_uix_002 .xhr').css('background-color',color_value);
    $('#shifu_uix_002 .ipaiban').css('border-color',color_value);
    $('#shifu_uix_003 .xhr').css('background-color',color_value);
    $('#shifu_uix_003 .wihudong').css('color',hex);
    $('#shifu_uix_004 .ipaiban').css('border-color',color_value);
    $('#shifu_uix_005 .xhr').css('background-color',color_value);
    $('#shifu_uix_005 .wihudong').css('color',hex);
    $('#shifu_uix_006 .ipaiban').css('border-color',color_value);
    $('#shifu_uix_007 .xhr').css('background-color',color_value);
    $('#shifu_uix_007 .wihudong').css('color',hex);
    $('#shifu_uix_008 .ipaiban').css('border-color',color_value);
    //文学类样式
    $('#shifu_lit_001 .ipaiban').css('border-color',color_value);
    $('#shifu_lit_002 .xhr').css('background-color',color_value);
    $('#shifu_lit_003 .xhr').css('background-color',color_value);
    $('#shifu_lit_003 .ipaiban').css('border-color',color_value);
    $('#shifu_lit_004 .xhr').css('background-color',color_value);
    $('#shifu_lit_005 .wihudong').css('color',color_value);
    $('#shifu_lit_006 .ipaiban').css('border-color',color_value);
    $('#shifu_lit_007 .ipaiban').css('border-color',color_value);


    $('#shifu_chr_024 .xhr').css('background-color',color_value);

    // 春节
    $('#shifu_roo_003 .whudong').css('color',color_value);
    $('#shifu_roo_004 .whudong').css('color',color_value);
    $('#shifu_roo_005 .whudong').css('color',color_value);
    $('#shifu_roo_007 .whudong').css('color',color_value);
    $('#shifu_roo_014 .whudong').css('color',color_value);
    $('#shifu_roo_019 .whudong').css('color',color_value);

    // 情人节
    $('#shifu_val_009 .ipaiban').css('border-color',color_value);
    $('#shifu_val_010 .ipaiban').css('border-color',color_value);
    $('#shifu_val_011 .ipaiban').css('border-color',color_value);
    $('#shifu_val_012 .ipaiban').css('border-color',color_value);
    $('#shifu_val_013 .ipaiban').css('border-color',color_value);
    $('#shifu_val_017 .ipai0ban').css('border-right-color',color_value);
    $('#shifu_val_018 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_val_022 .ipaiban').css('border-color',color_value);

    // 线条感样式
    $('#shifu_lin_001 .ipaiban').css('border-color',color_value);
    $('#shifu_lin_001 .xhr').css('background-color',color_value);
    $('#shifu_lin_001 .ipaibanb').css('border-top-color',color_value);
    $('#shifu_lin_002 .ipaiban').css('border-color',color_value);
    $('#shifu_lin_003 .ipaiban').css('border-left-color',color_value);
    $('#shifu_lin_005 .xhr').css('background-color',color_value);
    $('#shifu_lin_007 .xhr').css('background-color',color_value);
    $('#shifu_lin_008 .xhr').css('background-color',color_value);
    $('#shifu_lin_010 .ipaiban').css('border-color',color_value);
    $('#shifu_lin_010 .xhr').css('background-color',color_value);
    $('#shifu_lin_010 .ipaibanb').css('border-top-color',color_value);
    $('#shifu_lin_013 .xhr').css('background-color',color_value);
    $('#shifu_lin_018 .ipaiban').css('border-left-color',color_value);
    $('#shifu_lin_018 .ipaiban').css('border-right-color',color_value);
    $('#shifu_lin_019 .ipaiban').css('border-top-color',color_value);
    $('#shifu_lin_019 .xhr').css('background-color',color_value);
    $('#shifu_lin_020 .xhr').css('background-color',color_value);
    $('#shifu_lin_021 .xhr').css('background-color',color_value);
    $('#shifu_lin_021 .ipaiban').css('border-color',color_value);
    $('#shifu_lin_022 .ipaiban').css('border-top-color',color_value);
    $('#shifu_lin_023 .xhr').css('background-color',color_value);
    $('#shifu_lin_024 .xhr').css('background-color',color_value);
    $('#shifu_lin_025 .ipaiban').css('border-color',color_value);

    // 手撕风
    $('#shifu_pap_003 .ipaiban').css('border-left-color',color_value);
    $('#shifu_pap_003 .ipaiban').css('border-bottom-color',color_value);
    $('#shifu_pap_005 .ipaiban').css('border-color',color_value);
    $('#shifu_pap_006 .ipaiban').css('border-right-color',color_value);
    $('#shifu_pap_007 .ipaiban').css('border-left-color',color_value);
    $('#shifu_pap_008 .xhr').css('background-color',color_value);

    // 协鑫订制
    $('#shifu_gcl_003 .xhr').css('background-color',color_value);
    $('#shifu_gcl_005 .xhr').css('background-color',color_value);
    $('#shifu_gcl_005 .ipaiban').css('border-color',color_value);
    $('#shifu_gcl_008 .ipaiban').css('border-color',color_value);
    $('#shifu_gcl_010 .ipaiban').css('border-color',color_value);
    $('#shifu_gcl_010 .xhr').css('background-color',color_value);
    $('#shifu_gcl_011 .xhr').css('background-color',color_value);
    $('#shifu_gcl_011 .ipaiban').css('border-top-color',color_value);


}