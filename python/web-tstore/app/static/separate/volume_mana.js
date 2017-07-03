$(document).ready(function(){
	var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	function generateMixed(n) {
	    var res = "";
	    for(var i = 0; i < n ; i ++) {
	        var id = Math.ceil(Math.random()*35);
	        res += chars[id];
	    }
	    return res;
	}//生成随机字符串当做用户id
	
	$("li div#volumeMNav div#VolumeList").addClass("active");
	$("li div#volumeMNav div").click(function(){
		$(this).addClass("active").siblings("div").removeClass("active");
	})
		
	function get_volumedata() {
		var defer = $.Deferred();
	    var url = $SCRIPT_ROOT + '/overview/volumeData';
	    $.getJSON(url, null, function (data) {
	      //volume_Data = data;
	      defer.resolve(data);
	    });
	    //return volume_Data;
	    return defer.promise();
	}//获取volume_Data
	$.when(get_volumedata()).done(function(data){  //使用的deferred避免ajax同步，但和ajax同步效果一样
 	var table = $('#volumeList');       //系统概要里磁盘卷信息列表 	
	var vCapacity;
	var getCData = function(data){
		vCapacity = data.from;
	};
	
	var volumeData = data;
	//var volumeData = get_volumedata();
	var globalVolumeData = {};
  	//初始化全局数据,name->status
  	for (i = 0; i < volumeData.length; i++){
    	var tmpName = volumeData[i]["name"];
    	globalVolumeData[tmpName] = volumeData[i]["status"];
  	}

	jQuery(document).ready(function ($)  {
		$("[rel='tooltip']").tooltip();//打开jquery ui里的提示工具
		//创建volume--------------------------------   	
		
		$("#subVolumeC").click(function() {  
			var volume_name = $('#cVolumeName').val();
			if(volume_name==""){
    			alert("请填写存储卷名称"); 
    			return false;//判断是否填写存储卷名称，如果没有填写结束函数
    		}          
			////////    loading层
			$("#loadingPage").css("display","block");//让loading层显示出来，表示正在加载
			$('body').css("overflow","hidden");
			formSubmit();  			      		
			function formSubmit(){
				//创建volume         	
		    	var volume_name = $('#cVolumeName').val();//获取存储卷名称
		    	var volume_capacity = vCapacity;//获取存储卷容量
		    	var Redundancy = $('#Redundancy').val();//获取存储卷冗余比       
		    	var user = generateMixed(4);
		    	//console.log(user);
		    	function createajax(){
					var defer = $.Deferred();
					$.ajax({
						url:$SCRIPT_ROOT + '/volume/add', 
						data:{
	        				name:volume_name,
	        				capacity:volume_capacity,
	        				redundancy_ratio:Redundancy,
	        				username:user
	     				}, 
	     				success:function (data) {
	     					defer.resolve(data);
	     				}
	     			});//ajax结束
	     			return defer.promise();
				}	
				function createsuccess(volumeIData){
					$("#loadingPage").css("display","none");
					$('body').css("overflow","auto");
	  				$("#status").html("");
	  				$('#cVolumeName').val("");
	    			//alert("创建成功");
	    			//判断是否为唯一一个volume
	    			if (Object.keys(globalVolumeData).length == 0){
	      				$("#noVolume").css('display','none');
	    			}
		    		var toString = Object.prototype.toString;
		    		addSingleVolume(volumeIData, Object.keys(globalVolumeData).length);
		    		globalVolumeData[volume_name] = "Started";
		    		//添加新条目到table
		    		var formatData = [];
		    		var tmp = {};
		    		tmp["volumeName"] = volumeIData["name"];
		    		if (volumeIData["status"] == "Started"){
			     	 	tmp["status"] = "<span class='label label-success' data-lang='running'>运行中</span>";
			    	} else{
			      		tmp["status"] = "<span class='label label-danger' data-lang='status_stop'>停止</span>";
			    	}
				    	tmp["capacity"] = volumeIData["capacity"];
				    if (volumeIData["nfs"]){
				      	tmp["NFS"] = "<span style='color:green'><i class='fa fa-fw fa-circle'></i></span>";
				    } else{
				      	tmp["NFS"] = "<span style='color:red'><i class='fa fa-fw fa-circle-o'></i></span>";
				    }
				    if (volumeIData["samba"]){
				      	tmp["Samba"] = "<span style='color:green'><i class='fa fa-fw fa-circle'></i></span>";
				    } else{
				      	tmp["Samba"] = "<span style='color:red'><i class='fa fa-fw fa-circle-o'></i></span>";
				    }
				    if (volumeIData["iscsi"]){
				      	tmp["iSCSI"] = "<span style='color:green'><i class='fa fa-fw fa-circle'></i></span>";
				    } else{
				      	tmp["iSCSI"] = "<span style='color:red'><i class='fa fa-fw fa-circle-o'></i></span>";
				    }
				    if (volumeIData["swift"]){
				      	tmp["Swift"] = "<span style='color:green'><i class='fa fa-fw fa-circle'></i></span>";
				    } else{
				      	tmp["Swift"] = "<span style='color:red'><i class='fa fa-fw fa-circle-o'></i></span>";
				    }
				    formatData.push(tmp);
				    table.bootstrapTable('append', formatData);
				}
				
				$.when(createajax()).done(function(data){
					var result1 = data['success'];
					var message1 = data['message'];
					if(result1){
						var get_status = setInterval(getstatus,500);
						var web_lang=$('#menuClick').attr('data-language');
						console.log(web_lang);
						if(web_lang=='zh'){
							var line_up="正在排队";
							var ready="请求发送成功，准备创建";
							var create1="正在添加存储卷";
							var create2="添加成功，正在启动";
							var create3="正在配置限额";
							var fail="创建失败";
						}else if(web_lang=='en'){
							var line_up="line up";
							var ready="请求发送成功，准备创建";
							var create1="creating volume";
							var create2="添加成功，正在启动";
							var create3="正在配置限额";
							var fail="failed";
						}
						function getstatus(){
							$.ajax({
								url:$SCRIPT_ROOT + '/create/getStatus',
								data:{
									username:user
								},
								success:function(data){
									///console.log(data);
									var result = data["success"];
									var status = data["status"];
			  						var message = data["message"];
									var volumeIData = message;
									if(result){
										
										if(status == "wait"){
											if(message == "line_up"){
												$("#status").html(line_up+"...");
											}
											else if(message == "ready"){
												$("#status").html(ready+"...");
											}else if(message == "create1"){
												$("#status").html(create1+"...");
											}else if(message == "create2"){
												$("#status").html(create2+"...");
											}else if(message == "create3"){
												$("#status").html(create3+"...");
											}
										}
										else if(status == "true"){
											createsuccess(volumeIData);
											clearInterval(get_status);
										} 
									}else{
									  	$("#loadingPage").css("display","none");
									  	$('body').css("overflow","auto");
									  	clearInterval(get_status);
									  	$("#status").html("");
									  	$('#cVolumeName').val("");
									    alert(fail+":" + message);
									}//if(result)判断结束
								}
							});
						}
					}else{
						$("#loadingPage").css("display","none");
					  	$('body').css("overflow","auto");
					  	$("#status").html("");
					  	$('#cVolumeName').val("");
					    alert(fail+":" + message1);
					}
		        });

  				$("#addVolumeM").modal("hide");
			};//formSubmit函数结束
		});//click事件结束
  		$("#vCapacity").ionRangeSlider({
	  		min: 1,
		  	max: 1344,
		  	from: 15,
		  	postfix: "TB",//设置数值后缀
		  	onStart : function(data){
		    	getCData(data);
		  	},
		  	onChange : getCData,//每一次改变滑块的时候都会触发
		  	onFinish : getCData	//滑动结束时触发
		});//ionRangeSlider结束。添加存储卷时，设置冗余度的滑块范围插件

		$("#tabs").tab();//bootstrap里的标签页插件
  		$('.nav-stacked').click(function (e) {  			  			 			
			var target = $(e.target).attr("href");
			//判断状态确定删除键是否可以使用
			var volumeID = target.replace("#tabContent","");			
			if (globalVolumeData[volumeID] == "Started"){
			   //$('#removeVolume').prop("disabled", true);
			   $("#"+volumeID+"remove").prop("disabled", true);
			}else{
			   //$('#removeVolume').prop("disabled", false);
			   $("#"+volumeID+"remove").prop("disabled", false);
			} //如果存储卷的状态不是停止状态，禁用删除按钮。
//			var rwSpeedIDt = '#' + volumeID + 'rwSpeed';
			setTimeout(function(){
//				$(rwSpeedIDt).highcharts().reflow();
				$('#' + volumeID + 'Usage').highcharts().reflow();
			},180);
		});//$('.nav-stacked').click函数结束

  		$('.menu-item.volume').click(function (e) {//左侧菜单栏tab切换
  			var ifVolume = $('#noVolume').css('display');
  			if(ifVolume=="none"){
  				var currentVolume = $('.nav-stacked .active').text();
		    	setTimeout(function(){
		    		//$("#" + currentVolume + "rwSpeed").highcharts().reflow();
		    		$('#' + currentVolume + 'Usage').highcharts().reflow();
		    	},180);
  			}
	  		
	    	    
    		var monitorMNav_hide = $("#monitorMNav").css("height");
    		if(monitorMNav_hide != "0px"){
	    		$(".menu-item.monitor.fa.fa-chevron-down").removeClass("fa-chevron-UP");
	    		$("#monitorMNav").stop().animate({
	    			height:"0"
	    		},500)
    		}
    	   	
	    	if($(this).width()>100){
	    		var volumeMNav_show = $("#volumeMNav").css("height");
		    	var volume_list_show = $("#volumeTabs").css("height");
		    	var hei_length = $("#volumeTabs li").length;
				var Vshow_height = Math.round($("#volumeTabs li:eq(0)").outerHeight()*hei_length+$("#volumeMNav div:eq(0)").outerHeight()*2);
				var Vshow_height_div = Math.round($("#volumeMNav div:eq(0)").outerHeight()*2)
				$(".menu-item.volume .fa.fa-chevron-down").toggleClass("fa-chevron-UP");
				if (volumeMNav_show == "0px" && volume_list_show == "0px") {
					$("#volumeMNav").stop().animate({
					 	height:Vshow_height_div+6+"px"
					 },500);
				}else if(volumeMNav_show == "0px" && volume_list_show != "0px"){
					$("#volumeMNav").stop().animate({
					 	height:Vshow_height+6+"px"
					 },500);
				}else if(volumeMNav_show != "0px"){
					$("#volumeMNav").stop().animate({
					 	height:"0"
					 },500);
				};   	
	    	}
    	
  		});//$('.menu-item').click函数结束
  	
  		$("#VolumeList").click(function(){
	  		var volume_list_show = $("#volumeTabs").css("height");
	  		var hei_length = $("#volumeTabs li").length;
	  		var V_list_show_height = Math.round($("#volumeTabs li:eq(0)").outerHeight()*hei_length);
	  		var Vshow_height = Math.round($("#volumeTabs li:eq(0)").outerHeight()*hei_length+$("#volumeMNav div:eq(0)").outerHeight()*2);
	  		var Vshow_height_div = Math.round($("#volumeMNav div:eq(0)").outerHeight()*2);
  			$("#VolumeList .fa.fa-chevron-down").toggleClass("fa-chevron-UP");
	    	if(volume_list_show == "0px"){
	    		$("#volumeTabs").stop().animate({
	    			height:V_list_show_height+6+"px"
	    		},500);
	    		$("#volumeMNav").stop().animate({
					height:Vshow_height+6+"px"
				},500);
	    	}else{
	    		$("#volumeTabs").stop().animate({
	    			height:"0"
	    		},500);
	    		$("#volumeMNav").stop().animate({
					height:Vshow_height_div+6+"px"
				},500);
	    	}
	  	});
  	  	
  		$("#addVolume").click(function(){
  			var Vshow_height_div = Math.round($("#volumeMNav div:eq(0)").outerHeight()*2);
  			$("#volumeTabs").stop().animate({
				height:"0"
			},500);
			$("#volumeMNav").stop().animate({
				height:Vshow_height_div+6+"px"
			},500);
	  })

  		$("#removeConfirm").click(function(){
  			//删除当前的volume
			$("#loadingPage").css("display","block");
			$('body').css("overflow","hidden");
			var web_lang=$('#menuClick').attr('data-language');
			console.log(web_lang);
			if(web_lang=='zh'){
				var removing="正在删除";
			}else if(web_lang=='en'){
				var removing="removing";
			}
			$("#status").html(removing+"...")
  			var volumeID = $('.nav-stacked .active').text();
  			$.getJSON($SCRIPT_ROOT + '/volume/remove', {
    			name: volumeID
  				}, function (data) {
	    			var result = data["success"];
	    			var message = data["message"];
	    			if (result){
	    				$("#loadingPage").css("display","none");
	    				$('body').css("overflow","auto");
	    				$("#status").html("");
		      			table.bootstrapTable('removeByUniqueId', volumeID);
		      			//删除nav tab以及对应的content
				      	var volumeTab = $('#tabList' + volumeID);
				      	var volumeContent = $('#tabContent' + volumeID);
				      	volumeTab.remove();
				      	volumeContent.remove();
				      	delete globalVolumeData[volumeID];
				      	var hei_length = $("#volumeTabs li").length;
			  		  	var V_list_show_height = Math.round($("#volumeTabs li:eq(0)").outerHeight()*hei_length);
			  		  	var Vshow_height = Math.round($("#volumeTabs li:eq(0)").outerHeight()*hei_length+$("#volumeMNav div:eq(0)").outerHeight()*2);
					  	$("#volumeTabs").css("height",V_list_show_height+"px");
			    	  	$("#volumeMNav").css("height",Vshow_height+6+"px");
		      			if (Object.keys(globalVolumeData).length > 0){
			        		//显示第一个为active
			        		var firstVolume = Object.keys(globalVolumeData)[0];
			        		if (globalVolumeData[firstVolume] == "Started"){
		          				//$('#removeVolume').prop("disabled", true);
		          				$("#"+firstVolume+"remove").prop("disabled", true);
		        			}
		        			$('.nav-stacked a[href="#tabContent' + firstVolume + '"]').tab('show');
	      				} else {
	        				$("#noVolume").css('display','block');
	        				//$('#removeVolume').prop("disabled", true);
	      				}//如果存储卷一栏剩余存储卷没被删除，则显示列表里的第一个为active，如果全部删除，则显示没有存储卷，请添加。
	    			} else {
	      				//删除失败
						$("#loadingPage").css("display","none");
						$('body').css("overflow","auto");
						$("#status").html("");
	      				alert(message);
	   	  			}
  				}
  			);//getJSON函数结束
  			$("#removeConfirmM").modal("hide");
		});//$("#removeConfirm").click函数结束
	});//jQuery(document).ready函数结束

	$(function () {	             
  	/*------------------------------------------存储卷管理tab------------------------*/
		var volumeTabs = $('#volumeTabs');//存储卷菜单栏
		var volumeContent = $('#volumeContent');//存储卷信息
		//var removeButton = $('#removeVolume');//删除按钮
		for (i = 0; i < volumeData.length; i++) {
		  	if (i == 0) {
		    	$("#noVolume").css('display', 'none');
		  	}
  			addSingleVolume(volumeData[i], i);
		}
		$("[data-toggle='toggle']").bootstrapToggle();         
		var nfsClient = $('#test1nfsClient');
		nfsClient.change(function() {
  			if (nfsClient.prop("checked")){
    			alert("checked");
	  		} else {
	    		alert("unchecked");//-------------------------------------------------to do
	  		}
		});//nfsClient.change函数结束
        /*--------------------------tabcontent-----------------*/
		Highcharts.setOptions({
		  	global: {
		    	useUTC: false
		  	},
		  	colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
		});

		$('#rwSpeed').highcharts({
		  	credits: {
		   		enabled: false
		  	},
		  	chart: {
		    	type: 'line',
		    	reflow:true,
		    	animation: false, // don't animate in old IE
		    	events: {
			      	load: function (event) {
			        	var series = this.series[0];
			        	var series1 = this.series[1];
			        	setInterval(function () {
			          		var x = (new Date()).getTime(),y = Math.random();//y get from background
			          		series.addPoint([x, y], true, true);
			          		series1.addPoint([x, Math.random()], true, true);
			        	}, 1000);
			      	}
		    	}
		  	},
		  	
		  	
		  	xAxis: {
			    type: 'datetime',
			    tickPixelInterval: 150,
			    minPadding: 0,
			    maxPadding: 0
			},
		  	yAxis: {
		    	title: {
		      	text: 'MB/s'
		    	},
		    	plotLines: [{
		      	value: 0,
		      	width: 1,
		      	color: '#808080'
		    	}]
		  	},
		  	tooltip: {
		    	formatter: function () {
		      	return '<b>' + this.series.name + '</b><br/>' +
		              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
		              Highcharts.numberFormat(this.y, 2);
		    	},
		    	crosshairs: true
		  	},
		  	plotOptions: {
		    	series: {
		      	dataLabels: {
		        	allowOverlap: true
		      	}
		    	}
		  	},
		  	legend: {
		    	enabled: true
		  	},
		  	title : {
            	text : ''
        	},
		  	exporting: {
		    	enabled: false
		  	},
	  		series: [{
	    		name: '读',
	    		data: (function () {
	      				var data = [],time = (new Date()).getTime(),i;		
			      		for (i = -19; i <= 0; i += 1) {
				        	data.push({
				          		x: time + i * 1000,
				          		y: Math.random()
				        	});
			      		}
	      				return data;
	    			}())
	  			}, {
	    		name: '写',
	    		data: (function () {
	      				var data = [], time = (new Date()).getTime(), i;		
	      				for (i = -19; i <= 0; i += 1) {
	        				data.push({
	          					x: time + i * 1000,
	          					y: Math.random()
	        				});
	      				}
	      				return data;
	    			}()),
	    		color : '#6FDB4B'
	 	 	}]
		});//$('#rwSpeed').highcharts函数结束		
	});//$function函数结束
  
  	function getData(serverId, cpuId){}

  	function addSingleVolume(volumeData, i){ 
    	var volumeTabs = $('#volumeTabs');
    	var volumeContent = $('#volumeContent');
    	var read_seri = [];
    	var write_seri = [];
	    for (var rw_i = 0; rw_i < volumeData["read"].length; rw_i++){
	    	read_seri.push(parseFloat(volumeData["read"][rw_i]));
	    	write_seri.push(parseFloat(volumeData["write"][rw_i]));
	    }
    	volumeTabs.append(volumeTabFormat(volumeData["name"], i));
    	volumeContent.append(volumeContentFormat(volumeData, i));
    	// 初始化启动停止功能
	    const vStartButton = $('#' + volumeData["name"] + "Start");
	    const vStopButton = $('#' + volumeData["name"] + "Stop");
	    const vRestartButton = $('#' + volumeData["name"] + "Restart");
	    const removeButton = $('#' + volumeData["name"] + "remove");
	    const cVolumeName = volumeData["name"];
	    const table = $("#volumeList");   
		//  重启功能
		vRestartButton.click(function (){	
			$("#loadingPage").css("display","block");	  
			$('body').css("overflow","hidden");
			function restarted(){
				var defer = $.Deferred();
				$.ajax({
					type:"get",
					url:$SCRIPT_ROOT + '/volume/self/restart',
					data:{
						volume_name: cVolumeName
					},
					success:function(data){
						defer.resolve(data);
					}
				});
				return defer.promise();
		    };
		    
		    function restartSuccess(){
		    	//restart成功,按钮变灰
		    	$("#status").html("");
	          	$("#loadingPage").css("display","none");	
	          	$("#status").html("");
	          	$('body').css("overflow","auto");
	          	//alert("重启成功!");
	          	vStartButton.prop("disabled", true);
	          	vStopButton.prop("disabled", false);
	          	//不能删除
	         	removeButton.prop("disabled", true);
	          	globalVolumeData[cVolumeName] = "Started";
	          	//改变table状态
	          	var rowData = table.bootstrapTable('getRowByUniqueId', cVolumeName);
	          	rowData["status"] = "<span class='label label-success' data-lang='running'>运行中</span>";
	          	table.bootstrapTable('updateByUniqueId', {id: cVolumeName, row:rowData});
		    }
		    $.when(restarted()).done(function(data){
		    	var restart_status = setInterval(getStatus,2000);
		    	var web_lang=$('#menuClick').attr('data-language');
				console.log(web_lang);
				if(web_lang=='zh'){
					var ready="请求发送成功，准备停止";
					var stoping="正在停止";
					var starting="停止成功，正在重启";
					var fail="启动失败";
				}else if(web_lang=='en'){
					var ready="请求发送成功，准备停止";
					var stoping="stoping volume";
					var starting="停止成功，正在重启";
					var fail="failed";
				}
		    	function getStatus(){
		    		$.ajax({
		    			type:"get",
		    			url:$SCRIPT_ROOT + "/restart/get_status",
		    			success:function(data){
		    				var status = data["success"];
		    				var message = data["message"];
		    				if(status == "wait"){
		    					if(message == "ready"){
									$("#status").html(ready+"...");
								}else if(message == "stop"){
									$("#status").html(stoping+"...");
								}else if(message == "start"){
									$("#status").html(starting+"...");
								}
		    				}
					        else if(status == "true"){
					          	restartSuccess();
					          	clearInterval(restart_status);
					        } else if(status == "false"){
					        	$("#status").html("");
					        	$("#loadingPage").css("display","none");	
					        	$('body').css("overflow","auto");
					          	alert(fail+": " + message);
					        }
		    			}
		    		});	
		    	}
	
		    })
		});//重启函数结束
		
		vStartButton.click(function() {	
			$("#loadingPage").css("display","block");
			$('body').css("overflow","hidden");
			var web_lang=$('#menuClick').attr('data-language');
			console.log(web_lang);
			if(web_lang=='zh'){
				var starting="正在启动";
				var fail="启动失败";
			}else if(web_lang=='en'){
				var starting="starting";
				var fail="failed";
			}
			$("#status").html(starting+"...")
			function startStatus(){
				var defer = $.Deferred();
				$.ajax({
					type:"get",
					url:$SCRIPT_ROOT + '/volume/self/start',
					data:{
						volume_name: cVolumeName
					},
					success:function(data){
						defer.resolve(data);
					}
				});
				return defer.promise();
		 	};

		 	$.when(startStatus()).done(function(data){
		 		var status = data["success"];
		        if (status){
		          	//start成功,按钮变灰
		          	$("#loadingPage").css("display","none");
		          	$('body').css("overflow","auto");
		          	$("#status").html("");
		          	//alert("启动成功!");
		          	vStartButton.prop("disabled", true);
		          	vStopButton.prop("disabled", false);
		          	vRestartButton.prop("disabled", false);
		          	//不能删除
		          	removeButton.prop("disabled", true);
		          	globalVolumeData[cVolumeName] = "Started";
		          	//更改前面Table的状态				
		          	var rowData = table.bootstrapTable('getRowByUniqueId', cVolumeName);
		          	rowData["status"] = "<span class='label label-success' data-lang='running'>运行中</span>";
		          	table.bootstrapTable('updateByUniqueId', {id: cVolumeName, row:rowData});
		        } else {
		        	$("#loadingPage").css("display","none");
		        	$('body').css("overflow","auto");
		        	$("#status").html("");
		          	alert(fail+": " + data["message"]);
		        }
		 	})
		});//click函数结束
	
		vStopButton.click(function (){
			$("#loadingPage").css("display","block");
			$('body').css("overflow","hidden");
			var web_lang=$('#menuClick').attr('data-language');
			console.log(web_lang);
			if(web_lang=='zh'){
				var stoping="正在停止";
				var fail="停止失败";
			}else if(web_lang=='en'){
				var stoping="stoping";
				var fail="failed";
			}
			$("#status").html(stoping+"...");
			function stoped(){  
				var defer = $.Deferred();
				$.ajax({
					type:"get",
					url:$SCRIPT_ROOT + '/volume/self/stop',
					data:{
						volume_name: cVolumeName
					},
					success:function(data){
						defer.resolve(data);
					}
				});
				return defer.promise();
			}//stopStatus函数结束
			
			$.when(stoped()).done(function(data){
				var status = data["success"];
	      		if (status){
	        		//start成功,按钮变灰
	        		$("#loadingPage").css("display","none");
	        		$('body').css("overflow","auto");
	        		$("#status").html("");
	        		//alert("停止成功!");
	        		vStartButton.prop("disabled", false);
	        		vStopButton.prop("disabled", true);
	        		vRestartButton.prop("disabled", true);
	        		//删除变可点击        		
	        		removeButton.prop("disabled", false);				
	        		globalVolumeData[cVolumeName] = "Stopped";
	        		//更改Table的状态
	        		var rowData = table.bootstrapTable('getRowByUniqueId', cVolumeName);
	        		rowData["status"] = "<span class='label label-danger' data-lang='status_stop'>停止</span>";
	        		table.bootstrapTable('updateByUniqueId', {id: cVolumeName, row:rowData});
	      		} else {
	      			$("#loadingPage").css("display","none");
	      			$('body').css("overflow","auto");
	      			$("#status").html("");
	        		alert(fail+": " + data["message"]);
	      		}//if判断结束
			})			
		});//停止按钮函数结束


		//存储设备
		
//		var web_lang=$('#selectLanguageDropdown').attr('data-language');
//	    console.log(web_lang);
//		if(web_lang=='zh'){
//			var address="地址：";
//			var disk_status="状态：";
//			var used="使用(%):";
//		}else if(web_lang=='en'){
//			var address="address：";
//			var disk_status="status：";
//			var used="used(%):";
//		}
//		for (var i = 0; i < bricksI.length; i++){
//		    var spliceB = bricksI[i]["address"].split('/');
//		    var brickName = spliceB[spliceB.length - 1];
//		    var brickStatus = bricksI[i]["online"];
//		    
//		    if(brickStatus == "Y"){
//		    	var formatBrick = '<a class="btn btn-app" rel="tooltip" title="'+address + bricksI[i]["address"] + disk_status + bricksI[i]["online"] + used+ bricksI[i]["usage"] + '" data-html="true"> '
//		    	+'<b style="font-weight:500;position:absolute;top:0px;left:18px;">'+bricksI[i]["address"].split(":")[0]+'</b><i class="fa fa-database text-success" style="padding-top:5px;"></i>' + brickName + ' </a>';
//		    }else if(brickStatus == "N"){
//		    	var formatBrick = '<a class="btn btn-app" rel="tooltip" title="'+address + bricksI[i]["address"] + disk_status + bricksI[i]["online"] + used+ bricksI[i]["usage"] + '" data-html="true"> '
//		    	+'<b style="font-weight:500;position:absolute;top:0px;left:18px;">'+bricksI[i]["address"].split(":")[0]+'</b><i class="fa fa-database text-danger" style="padding-top:5px;"></i>' + brickName + ' </a>';
//		    }		    
//		    bricksBox.append(formatBrick);
//  	}
		
		var bricksBox = $("#" + cVolumeName + "Bricks");
		var bricksI = volumeData["bricks"];
  		for (var i = 0; i < bricksI.length; i++){
		    var spliceB = bricksI[i]["address"].split('/');
		    var brickName = spliceB[spliceB.length - 1];
		    var brickStatus = bricksI[i]["online"];
		    //console.log();
		    if(brickStatus == "Y"){
		    	var formatBrick = '<a class="btn btn-app" rel="tooltip" title="address: ' + bricksI[i]["address"] + ' status: ' + bricksI[i]["online"] + ' usage(%):' + bricksI[i]["usage"] + '" data-html="true"> '
		    	+'<b style="font-weight:500;position:absolute;top:0px;left:18px;">'+bricksI[i]["address"].split(":")[0]+'</b><i class="fa fa-database text-success" style="padding-top:5px;"></i>' + brickName + ' </a>';
		    }else if(brickStatus == "N"){
		    	var formatBrick = '<a class="btn btn-app" rel="tooltip" title="address: ' + bricksI[i]["address"] + ' status: ' + bricksI[i]["online"] + ' usage(%): ' + bricksI[i]["usage"] + '" data-html="true"> '
		    	+'<b style="font-weight:500;position:absolute;top:0px;left:18px;">'+bricksI[i]["address"].split(":")[0]+'</b><i class="fa fa-database text-danger" style="padding-top:5px;"></i>' + brickName + ' </a>';
		    }		    
		    bricksBox.append(formatBrick);
    	}
   
    	//快照初始化
    	var snapShotTable = $('#' + cVolumeName + "Snapshot");
    	snapShotTable.bootstrapTable();
    	var snapShotData = volumeData["snapshots"];
    	var tmpTabSR = [];
    	for (var sI = 0; sI < snapShotData.length; sI++){
		    var snapshot = snapShotData[sI];
		    var tmpTabSD = {};
		    tmpTabSD["snapshotName"] = snapshot["Snapshot"];
		    tmpTabSD["createTime"] = snapshot["Created"];
		    tmpTabSD["snapshotOp"] = '<button type="button" class="btn btn-success btn-sm" style="margin-right: 10px"><i class="fa fa-reply"></i></button> <button type="button" class="btn btn-danger btn-sm" style="margin-left: 10px"><i class="fa fa-times"></i></button>';
		    tmpTabSR.push(tmpTabSD);
    	}
		snapShotTable.bootstrapTable('append', tmpTabSR);

    	//初始化表格----------------------
    	var vClientTableID = '#' + volumeData["name"] + 'ClientTable';
    	$(vClientTableID).bootstrapTable();
    	$(vClientTableID).on('check.bs.table', function (e, row, $element) {
      		alert(row["client"]);
    	});
    	$(vClientTableID).on('uncheck.bs.table', function (e, row, $element) {
      		alert(row["client"]);
    	});

	    var clientList = ["nfs", "samba", "iscsi", "swift"];
	  	var clientIndex = {"nfs" : 0, "samba" : 1, "iscsi" : 2, "swift" : 3};
		for (var j = 0; j < 4; j++){
	  		var clientString = clientList[j];
	  		if (volumeData[clientString]){
		    	//start
		        var tmpTabClientInfo = clientString + "Info";
		        var tmpTabCR = [];
		        var tmpTabCD = {};
		        var metaDataClient = volumeData[tmpTabClientInfo];
		    	//nfs开启
		    	var ckClientID = volumeData["name"] + clientString + "Client";
		    	//tmpTabCD["ck"] = '<input id="' + ckClientID +'" type="checkbox" checked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
		        tmpTabCD["ck"] = true;
		        tmpTabCD["client"] = clientString;
		        tmpTabCD["address"] = metaDataClient["address"];
		        tmpTabCD["username"] = metaDataClient["username"];
		        tmpTabCD["password"] = metaDataClient["password"];
		        tmpTabCR.push(tmpTabCD);
		        $(vClientTableID).bootstrapTable('append', tmpTabCR);
	  		} else {
		        //off
		        var tmpTabClientInfo = clientString + "Info";
		        var tmpTabCR = [];
		        var tmpTabCD = {};
		        var metaDataClient = volumeData[tmpTabClientInfo];
		        //nfs开启
		        var ckClientID = volumeData["name"] + clientString + "Client";
		        //tmpTabCD["ck"] = '<input id="' + ckClientID +'" type="checkbox" unchecked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
		        tmpTabCD["ck"] = false;
		        tmpTabCD["client"] = clientString;
		        tmpTabCD["address"] = "--";
		        tmpTabCD["username"] = "--";
		        tmpTabCD["password"] = "--";
		        tmpTabCR.push(tmpTabCD);
		        $(vClientTableID).bootstrapTable('append', tmpTabCR);	
		  	}
		}
		//初始化bricks
		var brickContainer = $('#' + volumeData["name"] + "Bricks");
	
		//初始化饼图----------------------
	    var volumeUsageID = '#' + volumeData["name"] + 'Usage';
	    var usage = volumeData["usage"];
	
		$(volumeUsageID).highcharts({
	        credits:{
	          enabled: false
	        }, 
	        exporting:{
	          enabled:false
	        },
	        chart: {
	          backgroundColor:"#ECF0F5",
	          reflow:true,
	          plotBackgroundColor: null,
	          plotBorderWidth: null,
	          plotShadow: false,
	        },
	        title: {
	          text:""
	        },
	        tooltip: {
	          //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	   		  enabled: false
	        },
	        colors: ['#ED561B','#00C0EF','#64E572','#FF9655', '#FFF263', '#6AF9C4'],
	        plotOptions: {
	          	pie: {
	          		size:150,
	            	allowPointSelect: true,
	            	cursor: 'pointer',
					innerSize:"40%",
	            	dataLabels: {
	                  	enabled: true,
						distance:-30,
	                  	connectorColor: '#000000',
	                  	format: '<b>{point.name}</b>: {point.percentage:.2f} %',
	                  	style:{
		            		color:"#fff",
		            		fontWeight:"lighter",
		            		textShadow:"none"
		            	}
	            	}
	          	}
	        },
	        series:[{
	          	type:'pie',
	          	//name:"系统容量",
	          	data: [
	           		['使用', parseFloat(usage)],
	            	['未使用', parseFloat(100 - usage)]
	          	]
	        }]
	    });	
	    
	    $('.highcharts-label.highcharts-data-label text tspan:eq(0)').attr('data-lang','used');
		$('.highcharts-label.highcharts-data-label text tspan:eq(2)').attr('data-lang','not_used');

		//初始化曲线图
//		var rwSpeedID = '#' + volumeData["name"] + 'rwSpeed';	
//		$(rwSpeedID).highcharts({
//		  credits: {
//		    enabled: false
//		  },
//		  chart: {
//		  	backgroundColor:"#ECF0F5",
//		    type: 'line',
//		    reflow:true,
//		    animation: false, // don't animate in old IE
//		    events: {
//		      load: function (event) {
//		        var series = this.series[0];
//		        var series1 = this.series[1];
//		        setInterval(function () {
//		         var x = (new Date()).getTime(), // current time
//		              y = Math.random()*10;//y get from background
//		          series.addPoint([x, y], true, true);
//		          series1.addPoint([x, Math.random()*10], true, true);
//		          //setInterval(function () {
//					//const x = (new Date()).getTime(); // current time
//					//$.getJSON($SCRIPT_ROOT + '/volume/perf', {
//						//volume_name: volumeData["name"]
//						//}, function (data) {
//				            //var result = data["success"];
//				            //var message = data["message"];
//				            //var toString = Object.prototype.toString;
//							//if (result){
//				                //var y = message[0];
//				                //var y_1 = message[1];
//				                //series.addPoint([x, y], true, true);
//				                //series1.addPoint([x, y_1], true, true);
//							//} else {
//				                //series.addPoint([x, 0], true, true);
//				                //series1.addPoint([x, 0], true, true);
//							//}
//						//}
//					//);		          
//		        }, 2000);
//		      }
//		    }
//		  },
//		  xAxis: {
//		    type: 'datetime',
//		    tickPixelInterval:150
//		  },
//	  	yAxis: {
//	    	title: {
//	      		text: 'MB/s'
//	    	},
//	    	plotLines: [{
//	      	value: 0,
//	      	width: 1,
//	      	color: '#808080'
//	    	}]
//	  	},
//	  	tooltip: {
//	    	formatter: function () {
//	      	return '<b>' + this.series.name + '</b><br/>' +
//	              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
//	              Highcharts.numberFormat(this.y, 2);
//	    	},
//	    	crosshairs: true
//	  	},
//	  	plotOptions: {
//	    	series: {
//	      		dataLabels: {
//	        		allowOverlap: true
//	      		}
//	    	}
//	  	},
//		title : {
//		   text : ""
//		},
//		legend: {
//		   enabled: true
//		},
//		exporting: {
//		   enabled: false
//		},
//	  	series: [{
//	    	name: '读',
//	    	pointInterval: 600000,
//	    	data: (function () {
//	      	// generate an array of random data
//	      	var data = [],time = (new Date()).getTime(),i;		
//	      	for (i = -19; i <= 0; i += 1) {
//	        	data.push({
//	          	x: time + i * 1000,
//	          	y: Math.random()*10
//	        	});
//	      	}
//	      	return data;
//	    	}())
//	  	}, {
//	    	name: '写',
//	    	pointInterval: 600000,
//	    	data: (function () {
//	      	// generate an array of random data
//	      	var data = [], time = (new Date()).getTime(), i;		
//	      	for (i = -19; i <= 0; i += 1) {
//	        	data.push({
//	          	x: time + i * 1000,
//	          	y: Math.random()*10
//	        	});
//	      	}
//	      	return data;
//	    	}()),
//	    	color : '#6FDB4B'
//	 	 	}]
//		});//$('#rwSpeed').highcharts函数结束	
		
		
		//初始化clinetTable
		var clientData = [];
		var tmpClientData = {};
		//NFS
		if (volumeData["nfs"]){
      		var nfsData = volumeData["nfsInfo"];
      		//nfs开启
		    tmpClientData["ck"] = '<input id="' + volumeData["name"] +'nfsClient" type="checkbox" checked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
		    tmpClientData["client"] = "nfs";
		    tmpClientData["address"] = nfsData["address"];
		    tmpClientData["username"] = nfsData["username"];
		    tmpClientData["password"] = nfsData["password"];
    	} else {
		    tmpClientData["ck"] = '<input id="' + volumeData["name"] +'nfsClient" type="checkbox" unchecked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
		    tmpClientData["client"] = "nfs";
		    tmpClientData["address"] = "--";
		    tmpClientData["username"] = "--";
		    tmpClientData["password"] = "--";
    	}
		clientData.push(tmpClientData);
		tmpClientData = {};
		//Samba
    	if (volumeData["samba"]){
      		var sambaData = volumeData["sambaInfo"];
      		//nfs开启
      		tmpClientData["ck"] = '<input id="' + volumeData["name"] +'sambaCient" type="checkbox" checked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
      		tmpClientData["client"] = "samba";
      		tmpClientData["address"] = sambaData["address"];
      		tmpClientData["username"] = sambaData["username"];
      		tmpClientData["password"] = sambaData["password"];
    	} else {
      		tmpClientData["ck"] = '<input id="' + volumeData["name"] +'sambaCient" type="checkbox" unchecked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
      		tmpClientData["client"] = "samba";
      		tmpClientData["address"] = "--";
      		tmpClientData["username"] = "--";
      		tmpClientData["password"] = "--";
    	}
		clientData.push(tmpClientData);
		tmpClientData = {};
		//iSCSI
    	if (volumeData["iscsi"]){
      		var iscsiData = volumeData["iscsiInfo"];
      		//nfs开启
      		tmpClientData["ck"] = '<input id="' + volumeData["name"] +'iscsiClient" type="checkbox" checked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
      		tmpClientData["client"] = "iscsi";
      		tmpClientData["address"] = iscsiData["address"];
      		tmpClientData["username"] = iscsiData["username"];
      		tmpClientData["password"] = iscsiData["password"];
    	} else {
      		tmpClientData["ck"] = '<input id="' + volumeData["name"] +'iscsiClient" type="checkbox" unchecked data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger" data-size="mini">';
      		tmpClientData["client"] = "iscsi";
      		tmpClientData["address"] = "--";
      		tmpClientData["username"] = "--";
      		tmpClientData["password"] = "--";
    	}
		clientData.push(tmpClientData);
		tmpClientData = {};
		//swift
		if (volumeData["swift"]){
      		var swiftData = volumeData["swiftInfo"];
      		//nfs开启
      		tmpClientData["ck"] = "<input id=\" " + volumeData["name"] +"swiftClient\" type=\"checkbox\" checked data-toggle=\"toggle\" data-on=\"On\" data-off=\"Off\" data-onstyle=\"success\" data-offstyle=\"danger\" data-size=\"mini\">";
      		tmpClientData["client"] = "swift";
      		tmpClientData["address"] = swiftData["address"];
      		tmpClientData["username"] = swiftData["username"];
      		tmpClientData["password"] = swiftData["password"];
    	} else {
      		tmpClientData["ck"] = "<input id=\" " + volumeData["name"] +"swiftClient\" type=\"checkbox\" unchecked data-toggle=\"toggle\" data-on=\"On\" data-off=\"Off\" data-onstyle=\"success\" data-offstyle=\"danger\" data-size=\"mini\">";
      		tmpClientData["client"] = "swift";
      		tmpClientData["address"] = "--";
      		tmpClientData["username"] = "--";
      		tmpClientData["password"] = "--";
    	}
		clientData.push(tmpClientData);
		if (i == 0){
  			$('#table_test').bootstrapTable('append', clientData);
		}
		if (i == 0 && volumeData["status"] == "Stopped") {
  			removeButton.prop("disabled", false);
		}
	}//addSingleVolume函数结束

	function labelFormatter(label, series) {
    	return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
            + label
            + "<br>"
            + series.percent.toFixed(2) + "\%</div>";
	}
	function volumeTabFormat(volumeName, i){
		//console.log(i);
	    if (i == 0){
	      return '<li role="presentation" id ="tabList' + volumeName + '" class ="active"><a href="#tabContent' + volumeName + '" data-toggle="tab">' + volumeName + '</a></li>';
	    }else {
	      return '<li role="presentation" id ="tabList' + volumeName + '"><a href="#tabContent' + volumeName + '" data-toggle="tab">' + volumeName + '</a></li>';
	    }
	}
	function volumeContentFormat(volumeData, i){
	    if (i == 0){
	     	//return '<div id="tabContent' + volumeData["name"] + '" class="tab-pane active">' + contentFirstRow(volumeData) + contentSecondRow(volumeData) + contentThirdRow(volumeData["name"]) + contentForthRow(volumeData["name"]) + '</div>';
	      	//return '<div id="tabContent' + volumeData["name"] + '" class="tab-pane active">' + contentFirstRow(volumeData) + contentSecondRow(volumeData) + contentThirdRow(volumeData["name"]) + '</div>';
	      	return '<div id="tabContent' + volumeData["name"] + '" class="tab-pane active">' + contentFirstRow(volumeData) + contentThirdRow(volumeData["name"]) + '</div>';
	    } else {
	      	//return '<div id="tabContent' + volumeData["name"] + '" class="tab-pane">' + contentFirstRow(volumeData) + contentSecondRow(volumeData) + contentThirdRow(volumeData["name"]) + contentForthRow(volumeData["name"]) + '</div>';
	      	//return '<div id="tabContent' + volumeData["name"] + '" class="tab-pane">' + contentFirstRow(volumeData) + contentSecondRow(volumeData) + contentThirdRow(volumeData["name"]) + '</div>';	    	
	      	return '<div id="tabContent' + volumeData["name"] + '" class="tab-pane">' + contentFirstRow(volumeData) + contentThirdRow(volumeData["name"]) + '</div>';
	    }
	}

  	function contentFirstRow(volumeData){
    	var firstRow = '<div class="row"><div class="col-md-5">' + formatUsage(volumeData["name"]) + '</div>' + '<div class="col-md-7">' + formatOperation(volumeData["name"], volumeData["status"]) + '</div></div>';
    	return firstRow;
  	}

  	function formatUsage(volumeName){
    	return '<div class="box box-primary">'
    				+'<div class="box-header">'
    					+'<i class="fa fa-bar-chart-o"></i>'
    					+'<h3 class="box-title" data-lang="volume_capacity"></h3>'
    					+'<div class="box-tools pull-right">'
    						+'<button type="button" class="btn btn-box-tool" data-widget="collapse">'
    							+'<i class="fa fa-minus"></i>'
    						+'</button>'
    					+'</div>'
    				+'</div>'
    				+'<div class="box-body" style="width:100%;">'
    					+'<div id="' + volumeName + 'Usage" style="min-height: 150px;width:100%;"></div>'
    				+'</div>'
    			+'</div>'
  	}

  	function formatRWSpeed(volumeName){
    	return '<div class="box box-primary"><div class="box-header"><i class="fa fa-bar-chart-o"></i><h3 class="box-title">IO读写速度</h3><div class="box-tools pull-right"><button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button></div></div><div class="box-body" id="rwBox"><div id="' + volumeName + 'rwSpeed" style="height: 150px"></div></div></div>';
  	}

  	function contentSecondRow(volumeData){
    	return '<div class="row"><div class="col-md-5">' + formatOperation(volumeData["name"], volumeData["status"]) + '</div><div class="col-md-7">' + formatClientTable(volumeData["name"]) + '</div></div>';
  	}

  	function formatOperation(volumeName, status){
    	if (status == 'Started'){
      		return '<div class="box box-primary"><div class="box-header">'
      			+'<i class="fa fa-bar-chart-o"></i><h3 class="box-title">存储卷操作</h3></div><div class="box-body table-responsive no-padding"  style="color: black;height: 170px">'
  				+'<div class="row" style="text-align: center;margin-top: 39px;width: 100%;margin-left:-6px">'
  				+'<button class="btn btn-app btn-bigger" id="' + volumeName +'Start" disabled data-lang="start"><i class="fa fa-play"></i> 启动</button>'
  				+'<button class="btn btn-app btn-bigger" id="' + volumeName + 'Restart" data-lang="restart"><i class="fa fa-repeat"></i> 重启</button>'
  				+'<button class="btn btn-app btn-bigger" id="' + volumeName + 'Stop" data-lang="stop"><i class="fa fa-pause"></i> 停止</button>'
  				+'<button class="btn btn-app btn-danger btn-bigger" id="' + volumeName + 'remove" data-toggle="modal" data-target="#removeConfirmM" disabled data-lang="delete"><i class="fa fa-remove"></i> 删除</button>'
  				+'</div></div></div>';
    	} else {
		    return '<div class="box box-primary"><div class="box-header with-border"><h3 class="box-title">存储卷操作'
			    +'</h3></div><div class="box-body table-responsive no-padding" style="color: black;height: 170px">'
			    +'<div class="row" style="text-align: center;margin-top: 39px;width: 100%;margin-left:-6px">'
			    +'<button class="btn btn-app btn-bigger" id="' + volumeName +'Start" data-lang="start"><i class="fa fa-play"></i> 启动</button>'
			    +'<button class="btn btn-app btn-bigger" id="' + volumeName + 'Restart" disabled data-lang="restart"><i class="fa fa-repeat"></i> 重启</button>'
			    +'<button class="btn btn-app btn-bigger" id="' + volumeName + 'Stop" disabled data-lang="stop"><i class="fa fa-pause"></i> 停止</button>'
			    +'<button class="btn btn-app btn-danger btn-bigger" id="' + volumeName + 'remove" data-toggle="modal" data-target="#removeConfirmM" data-lang="delete"><i class="fa fa-remove"></i> 删除</button>'
			    +'</div></div></div>';
    	}
  	}

  	function formatClientTable(volumeName){
    	return '<table data-toggle="table" data-unique-id="client" id="' + volumeName + 'ClientTable"><thead><tr><th data-align="center" data-field="ck" data-checkbox = "true"></th><th data-align="center" data-field="client">客户端</th><th data-align="center" data-field="address">网址</th><th data-align="center" data-field="username">用户名</th><th data-align="center" data-field="password">密码</th></tr></thead><tbody></tbody></table>';
  	}

  	function contentThirdRow(volumeName){
    	return '<div class="row"><div class="col-md-12"><div class="box box-primary"><div class="box-header"><i class="fa fa-bar-chart-o"></i><h3 class="box-title">存储设备</h3><div class="box-body" id="' + volumeName + 'Bricks" style="min-height:300px;"></div></div></div></div></div>';
  	}

  	function contentForthRow(volumeName){
    	return '<div class="row"><div class="col-md-12"><div class="box box-primary">'
    	+'<div class="box-header"><i class="ion ion-clipboard"></i><h3 class="box-title">快照</h3>'
    	+'</div><div class="box-body"><table data-toggle="table" id="' + volumeName + 'Snapshot" data-unique-id="snapshotName"><thead>'
    	+'<tr><th data-align="center" data-field="snapshotName">快照名称</th><th data-align="center" data-field="createTime">创建时间</th>'
    	+'<th data-align="center" data-field="snapshotOp">操作</th></tr></thead><tbody></tbody></div>'
    	+'<div class="box-footer clearfix no-border"><button id="' + volumeName + 'Create" type="button" class="btn btn-default pull-right">'
    	+'<i class="fa fa-plus"></i>添加快照</button></div></div></div></div></div>';
  	}
  	function formatBrick(brickData){
	    var address = brickData["address"];
	    var strList = address.splice('/');
	    var name = strList[strList.length - 1];
	    return '<a class="btn btn-app" rel="tooltip" title="存储设备名称: ' + brickData["address"] + '状态: ' + brickData["online"] + '" data-html="true"><i class="fa fa-database text-danger"></i>' + name + '</a>';
  	}
  	});

//	function appendNewVolume(newVolumeData, i){
//	    var volumeTabs = $('#volumeTabs');
//	    var volumeContent = $('#volumeContent');
//	    var removeButton = $('#removeVolume');
//	    volumeTabs.append(volumeTabFormat(newVolumeData["volumeName"], i));
//	}
});//$(document)函数结束
