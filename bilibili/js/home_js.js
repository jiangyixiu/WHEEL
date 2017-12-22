$(function(){
	//	↓↓↓自适应屏幕
//	window.onresize = function(){
//		var wid = document.documentElement.clientWidth;
//		var x = wid/1920; 
//		document.body.style.zoom = x;
//	}
	//	↓↓↓获取行内样式
	var go = document.getElementById("GO");
	go.onfocus = function(){
		if(go.style.color!='rgb(51, 51, 51)'){
			this.value = "";
			this.style.color = '#333';
		}
	}
	go.onblur = function(){
		if(go.value==""){
			go.style.color = "";  //  ←←←和下面这行效果一样
			//go.removeAttribute('style');	//	←←←清除单个选择器的所有"非"行内样式
			go.value = "你好，请问你听过彩虹小马吗?";
		}
	}
	
	//	↓↓↓上面第二个菜单里按标签的hover效果
	$('.h_num li').each(function(){
		$('.h_num li').hover(
			function(){
				$(this).find('i').css({'right':'0'})
			},
			function(){
				$(this).find('i').css({'right':'-100px'})
			}
		);
	})
	
	// 二维码事件
	$('.app_link').hover(function(){
		$('.client .box').css('display','block');
	},function(){
		$('.client .box').css('display','none');
	})
	$('.client .box').hover(function(){
		$('.client .box').css('display','block');
	},function(){
		$('.client .box').css('display','none');
	})
	
	
	//大图滚动
	var rollInner = document.getElementById('rollInner');
	var roll = document.getElementById('roll');
	var P = document.getElementById('P');
	var Ps = P.getElementsByTagName('span');
	var main=null,slide=null;
	var speed=10;
	var i=0;
	
	var maxW = rollInner.offsetWidth-roll.offsetWidth;
	main = setInterval(auto,4000);
	function auto(num){
		if(num!=undefined){
			i=num;
			color(i);
			console.log(i)			
		}else{
			i++;color(i)//页码颜色
			clearInterval(slide);
			slide = setInterval(move,6);		
		};
		
	}
	// ↓↓↓大图滚动
	function move(){
		roll.scrollLeft += speed; 
		if(roll.scrollLeft==maxW){
			roll.scrollLeft = 0;
		}
		if (roll.scrollLeft%roll.clientWidth==0) {
			clearInterval(slide);
		}			
	}
	// ↓↓↓页码页码跟随
	function color(num){

		for (var j = 0; j < Ps.length; j++) {
			Ps[j].setAttribute('class','hover');
		};		
		if(i==Ps.length){
			i = 0;
		}
		console.log(i)
		Ps[i].setAttribute('class','yeMa');
	}
	
	// ↓↓↓下面是鼠标放在页码上可以切换图
	function YeMa(){
		for (var i = 0; i < Ps.length; i++) {
			Ps[i].onclick = function(){
				for (var i = 0; i < Ps.length; i++) {
					Ps[i].setAttribute('class','hover');
					if(this==Ps[i]){
						console.log(i)
						this.setAttribute('class','yeMa');
						auto(i)
						roll.scrollLeft = roll.clientWidth*i
						color(i);
					}
				}
			}
		};
	}YeMa();
	
});





















