/**
 * Created by Administrator on 2016/8/25.
 */
var protocol = document.location.protocol;
var baseUrl  = protocol + '//www.chazuomba.com/iserver/app/';//JAVA统一接口
var catalogId = request('catalogId');
$(function(){


    loading(true);
    // 获取html页面内容
    $.ajax({
        type:"get",
        url:baseUrl+"findCatalogContent?catalogId="+catalogId,
        data:{},
        async:true,
        dataType:"json",
        success:function(data){
            $('#content').css({
                'max-width':'640px',
                'margin':'auto'
            })
            var data = data.data+'<div style="height: 4.1666666rem;width: 100%;"></div>';
            $('body').append(data);
            loading(false);
        }
    });
});
