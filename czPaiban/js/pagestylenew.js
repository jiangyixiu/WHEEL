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
        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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
    // currentStyle = currentStyle.replace('onmousedown','donone');
    currentStyle = currentStyle.replace('shifuMouseDownCard','wrap_node');

    if(user_vip==2||user_vip==3){
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
    }else{
        currentStyle = currentStyle+'<p class="shifubrush"></br></p>';
        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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

        // currentStyle = currentStyle+'<p style="color:#ccc; font-size: 12px;" class="shifubrush">不忘初心方得始终</p>';
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