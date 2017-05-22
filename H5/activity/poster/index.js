loadModel()

// 加载所有模板
function loadModel() {
	$.getJSON('index.json', function(res) {
		var html = '';
		for(var i=0,l=res.length;i<l;i++) {
			html += '<div class="poster_model_item" style="background-image: url(' + res[i].demo + ')" index="' + i + '"></div>';
		}
		$('.poster_model_list').append(html);
		
		// 模板处理
		setModel(res);
	});
}
// 模板处理
function setModel(models){
	// 渲染模板
	var showModel = function(model) {
		var html = '';
		html += '<img src="' + model.bg + '" class="poster_demo_bg" />';
		for(var i=0,l=model.ele.length;i<l;i++){
			html += '<img src="' + model.ele[i].src + '" class="poster_demo_ele" style="' + model.ele[i].style + '" />'
		}
		html += '<div class="poster_demo_text"><p>按照公历，北半球的春季为3月、4月和5月。公历于1912年开始在中国正式采用，取代农历。     ——维基百科</p></div>'
		$('#poster_demo').html(html);
	};
	
	showModel(models[0]);
	// 切换模板
	$('.poster_model_list').on('click', '.poster_model_item', function(){
		var index = $(this).attr('index');
		showModel(models[index]);
	});
	
	// 输入海报文字
	$('#poster_text').on('input change', function(){
		$('.poster_demo_text>p').text($(this).val());
	});
	// 生成海报
	$('#poster_create').click(function(){

		var dom = $("#poster_demo"); //你要转变的dom
		
		html2canvas(dom, {
			onrendered: function (canvas) {
				var datauRL = canvas.toDataURL("image/png");
				$("#poster_output").append(Canvas2Image.convertToImage(canvas));//这是放大了很3倍的图片
//				$("#poster_output").html('<img src="' + datauRL + '" width="100%"/>');
			}
		});
	});
}


(function() { // 尺寸适配
	function sy() {
		var Html = document.getElementsByTagName('html')[0];
		var w = document.documentElement.clientWidth;
		var scale = w / 375;
		if(scale >= 2) {
			scale = 2
		}
		Html.style.fontSize = 12 * scale + 'px';
	}
	sy();
	window.onresize = function() {
		sy()
	};
})();




function ajax(params){
	// XHR创建对象
	var xmlhttp;
	if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	var method = (params.method).toUpperCase() || 'GET';
	var url = params.url;
	var data = params.data;
	
	// XHR 请求
	if(method == "GET") {
		url = url + '?' + data;
		data = null;
		xmlhttp.open(method, url, true);
	} else {
		xmlhttp.open(method, url, true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	}
	xmlhttp.send(data);
}

