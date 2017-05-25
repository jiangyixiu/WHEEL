$(function() {
	initCount($('.countDown').eq(0), $('.countUp').eq(0), $('.bookCount').eq(0));
	initAddrSelect($('#province'), $('#city'));
	getPrice();
	validateForm();
});

/*表单验证*/
function validateForm() {
	$('#company, #userName, #addr').on('blur input', function() {
		cue($.trim($(this).val()), $(this));
	});
	$('#tel').on('blur input', function() {
		var regMobile = /^[0|2-9]\d{4,16}$/;
		var regMobile11 = /^1\d{10}$/;
		var val = $.trim($(this).val());
		if(!val) {
			cue(false, $(this));
		} else if(regMobile.test(val)) {
			cue(regMobile.test(val), $(this));
		} else if(regMobile11.test(val)) {
			cue(regMobile11.test(val), $(this));
		} else {
			cue(false, $(this));
		};
	});
	//发票信息验证
	$('.invoiceTitle').on('blur input', function() {
		var needInvoice = $('.icbox').hasClass('checked');
		if(needInvoice) {
			cue($.trim($(this).val()), $(this));
		}
	});

	// 索要发票
	$('.icbox').click(function() {
		$(this).toggleClass('checked');
		if($(this).hasClass('checked')) {
			$('.invoiceCtn').slideDown();
		} else {
			$('.invoiceCtn').slideUp();
		}
	});
	//发票类型
	$('.iradio').click(function() {
		$('.iradio').removeClass('checked');
		$(this).addClass('checked');
	});

	// 点击支付
	$('#AliPay').click(function() {
		$('#company, #userName, #addr, #tel, .invoiceTitle').trigger('blur');

		var company = $.trim($('#company').val());
		var userName = $.trim($('#userName').val());
		var tel = $.trim($('#tel').val());
		var province = $.trim($('#province').val());
		var city = $.trim($('#city').val());
		var addr = $.trim($('#addr').val());

		var err = $('.icon-exclamation-sign:not(#invoiceIcon)');
		if($('.icbox').hasClass('checked')) {
			err = $('.icon-exclamation-sign');
		}
		if(err.length > 0) { //是否有错误标志
			showTips('请填写正确信息！');
			return false;
		} else if(province == '请选择' || city == '请选择') {
			showTips('请填写完整地址！');
			return false;
		}
		
		var params = {
			bookId: '2270', // 书籍Id
		    company: company, // 公司
		    name: userName, // 姓名,
		    mobile: tel, // 手机号,
		    province: province, // 省份,
		    city: city, // 城市,
		    address: addr, // 地址,
		    number: $('.bookCount').val(), // 购买数量,
		    price: $('.totalPrice>span').text(),// 金额,
//		    price: 0.01,// 金额,
		    from: '0', // 渠道,
		    content: $.trim($('#feedBack').val()) // 购买备注
		}
		var needInvoice = $('.icbox').hasClass('checked');
		if(needInvoice) {
			params.invoiceType = $('.iradio.checked>span').text(); // 发票类型,
		    params.invoiceAddress = province + city + addr; // 收票地址,
		    params.invoiceTitle = $.trim($('.invoiceTitle').val()); // 发票抬头,
//		    params.invoiceRemarks = ''; // 发票备注,
		}
		callAliPay(params);
	});
}
// 唤起支付宝支付
function callAliPay(params) {
	getAjaxData('saveAlipayOrder', params, function(res){
		var form = res.data.form;
//		var url = form.substring(form.indexOf('action="') + 8, form.indexOf('"', form.indexOf('action="') + 8))
		$('body').append(form);
	});
}

// 数量操作
function initCount($reduce, $add, $num, min) {
	min = min || $num.attr('min'); // 下限
	min = parseInt(min);

	var reduceNum = function(num) {
		num = parseInt(num);
		if(isNaN(num)) {
			num = 1;
		}
		num = num - 1;
		if(min && num <= min) {
			$reduce.addClass('disabled');
			num = min;
		}
		$num.val(num);
		getPrice();
	};
	var addNum = function(num) {
		num = parseInt(num);
		if(isNaN(num)) {
			num = 1;
		}
		num = num + 1;
		if(min) {
			if(num > min) {
				$reduce.removeClass('disabled');
			} else {
				num = min;
			}
		}
		$num.val(num);
		getPrice();
	};

	$reduce.bind('click', function() {
		reduceNum($num.val());
	});
	$add.bind('click', function() {
		addNum($num.val());
	});
	$num.on('change', function() {
		this.value = this.value.replace(/\D+/g, '');
		var num = parseInt(this.value);
		if(isNaN(num) || num <= min) {
			this.value = min;
		} else {
			$reduce.removeClass('disabled');
		}
		getPrice();
	});
	$num.on('input', function() {
		this.value = this.value.replace(/\D+/g, '');
		getPrice();
	});

}
//计算价格
function getPrice() {
	var num = $('.bookCount').val();
	if(isNaN(num)) {
		num = 5;
		$('.bookCount').val(5)
	}

	var province = $('#province').val();
	var afee = 4; // 每本运费
	var feeList = {
		"请选择": 0,
		"北京": 2,
		"海南省": 6,
		"云南省": 6,
		"青海省": 6,
		"西藏": 6,
		"新疆": 6
	};
	if(typeof(feeList[province]) != 'undefined') {
		afee = feeList[province];
	}

	var fee = parseInt(afee * num);
	var totalPrice = fee + parseInt(68 * num);

	$('.totalPrice>span').text(totalPrice);
	$('.fee>span').text(fee);

}

/*省市数据*/
var province = [{
	"id": "000000",
	"name": "请选择",
	"city": []
}, {
	"id": "340000",
	"name": "安徽省",
	"city": [{
		"id": "340800",
		"name": "安庆市"
	}, {
		"id": "340300",
		"name": "蚌埠市"
	}, {
		"id": "341600",
		"name": "亳州市"
	}, {
		"id": "340200",
		"name": "芜湖市"
	}, {
		"id": "341000",
		"name": "黄山市"
	}, {
		"id": "340500",
		"name": "马鞍山市"
	}, {
		"id": "340700",
		"name": "铜陵市"
	}, {
		"id": "340600",
		"name": "淮北市"
	}, {
		"id": "341200",
		"name": "阜阳市"
	}, {
		"id": "341800",
		"name": "宣城市"
	}, {
		"id": "341300",
		"name": "宿州市"
	}, {
		"id": "341500",
		"name": "六安市"
	}, {
		"id": "341700",
		"name": "池州市"
	}, {
		"id": "340400",
		"name": "淮南市"
	}, {
		"id": "340100",
		"name": "合肥市"
	}, {
		"id": "341100",
		"name": "滁州市"
	}]
}, {
	"id": "110000",
	"name": "北京",
	"city": [{
		"id": "110100",
		"name": "北京市"
	}]
}, {
	"id": "500000",
	"name": "重庆",
	"city": [{
		"id": "500100",
		"name": "重庆市"
	}]
}, {
	"id": "350000",
	"name": "福建省",
	"city": [{
		"id": "350400",
		"name": "三明市"
	}, {
		"id": "350900",
		"name": "宁德市"
	}, {
		"id": "350600",
		"name": "漳州市"
	}, {
		"id": "350300",
		"name": "莆田市"
	}, {
		"id": "350700",
		"name": "南平市"
	}, {
		"id": "350200",
		"name": "厦门市"
	}, {
		"id": "350100",
		"name": "福州市"
	}, {
		"id": "350800",
		"name": "龙岩市"
	}, {
		"id": "350500",
		"name": "泉州市"
	}]
}, {
	"id": "620000",
	"name": "甘肃省",
	"city": [{
		"id": "620500",
		"name": "天水市"
	}, {
		"id": "623000",
		"name": "甘南藏族"
	}, {
		"id": "620200",
		"name": "嘉峪关市"
	}, {
		"id": "620700",
		"name": "张掖市"
	}, {
		"id": "620600",
		"name": "武威市"
	}, {
		"id": "621200",
		"name": "陇南市"
	}, {
		"id": "620400",
		"name": "白银市"
	}, {
		"id": "621000",
		"name": "庆阳市"
	}, {
		"id": "620900",
		"name": "酒泉市"
	}, {
		"id": "622900",
		"name": "临夏回族"
	}, {
		"id": "620800",
		"name": "平凉市"
	}, {
		"id": "620300",
		"name": "金昌市"
	}, {
		"id": "620100",
		"name": "兰州市"
	}, {
		"id": "621100",
		"name": "定西市"
	}]
}, {
	"id": "440000",
	"name": "广东省",
	"city": [{
		"id": "440400",
		"name": "珠海市"
	}, {
		"id": "441600",
		"name": "河源市"
	}, {
		"id": "440600",
		"name": "佛山市"
	}, {
		"id": "445200",
		"name": "揭阳市"
	}, {
		"id": "440100",
		"name": "广州市"
	}, {
		"id": "441700",
		"name": "阳江市"
	}, {
		"id": "441900",
		"name": "东莞市"
	}, {
		"id": "440200",
		"name": "韶关市"
	}, {
		"id": "441500",
		"name": "汕尾市"
	}, {
		"id": "445300",
		"name": "云浮市"
	}, {
		"id": "440800",
		"name": "湛江市"
	}, {
		"id": "440300",
		"name": "深圳市"
	}, {
		"id": "441300",
		"name": "惠州市"
	}, {
		"id": "440900",
		"name": "茂名市"
	}, {
		"id": "442000",
		"name": "中山市"
	}, {
		"id": "441400",
		"name": "梅州市"
	}, {
		"id": "440500",
		"name": "汕头市"
	}, {
		"id": "441200",
		"name": "肇庆市"
	}, {
		"id": "445100",
		"name": "潮州市"
	}, {
		"id": "440700",
		"name": "江门市"
	}, {
		"id": "441800",
		"name": "清远市"
	}]
}, {
	"id": "450000",
	"name": "广西",
	"city": [{
		"id": "450400",
		"name": "梧州市"
	}, {
		"id": "450900",
		"name": "玉林市"
	}, {
		"id": "451100",
		"name": "贺州市"
	}, {
		"id": "451400",
		"name": "崇左市"
	}, {
		"id": "451000",
		"name": "百色市"
	}, {
		"id": "450700",
		"name": "钦州市"
	}, {
		"id": "450500",
		"name": "北海市"
	}, {
		"id": "450800",
		"name": "贵港市"
	}, {
		"id": "451200",
		"name": "河池市"
	}, {
		"id": "450200",
		"name": "柳州市"
	}, {
		"id": "451300",
		"name": "来宾市"
	}, {
		"id": "450100",
		"name": "南宁市"
	}, {
		"id": "450300",
		"name": "桂林市"
	}, {
		"id": "450600",
		"name": "防城港市"
	}]
}, {
	"id": "520000",
	"name": "贵州省",
	"city": [{
		"id": "520200",
		"name": "六盘水市"
	}, {
		"id": "520400",
		"name": "安顺市"
	}, {
		"id": "520300",
		"name": "遵义市"
	}, {
		"id": "522300",
		"name": "黔西南布依族苗族"
	}, {
		"id": "520100",
		"name": "贵阳市"
	}, {
		"id": "522600",
		"name": "黔东南苗族侗族"
	}, {
		"id": "520500",
		"name": "毕节市"
	}, {
		"id": "522700",
		"name": "黔南布依族苗族"
	}, {
		"id": "520600",
		"name": "铜仁市"
	}]
}, {
	"id": "460000",
	"name": "海南省",
	"city": [{
		"id": "460100",
		"name": "海口市"
	}, {
		"id": "469021",
		"name": "定安县"
	}, {
		"id": "469024",
		"name": "临高县"
	}, {
		"id": "469023",
		"name": "澄迈县"
	}, {
		"id": "469025",
		"name": "白沙黎族自治县"
	}, {
		"id": "460300",
		"name": "三沙市"
	}, {
		"id": "469003",
		"name": "儋州市"
	}, {
		"id": "469002",
		"name": "琼海市"
	}, {
		"id": "469001",
		"name": "五指山市"
	}, {
		"id": "469026",
		"name": "昌江黎族自治县"
	}, {
		"id": "469005",
		"name": "文昌市"
	}, {
		"id": "469027",
		"name": "乐东黎族自治县"
	}, {
		"id": "469022",
		"name": "屯昌县"
	}, {
		"id": "469028",
		"name": "陵水黎族自治县"
	}, {
		"id": "469029",
		"name": "保亭黎族苗族自治县"
	}, {
		"id": "460200",
		"name": "三亚市"
	}, {
		"id": "469006",
		"name": "万宁市"
	}, {
		"id": "469030",
		"name": "琼中黎族苗族自治县"
	}, {
		"id": "469007",
		"name": "东方市"
	}]
}, {
	"id": "130000",
	"name": "河北省",
	"city": [{
		"id": "131100",
		"name": "衡水市"
	}, {
		"id": "130800",
		"name": "承德市"
	}, {
		"id": "130100",
		"name": "石家庄市"
	}, {
		"id": "130300",
		"name": "秦皇岛市"
	}, {
		"id": "130700",
		"name": "张家口市"
	}, {
		"id": "131000",
		"name": "廊坊市"
	}, {
		"id": "130500",
		"name": "邢台市"
	}, {
		"id": "130900",
		"name": "沧州市"
	}, {
		"id": "130200",
		"name": "唐山市"
	}, {
		"id": "130600",
		"name": "保定市"
	}]
}, {
	"id": "410000",
	"name": "河南省",
	"city": [{
		"id": "410800",
		"name": "焦作市"
	}, {
		"id": "419001",
		"name": "济源市"
	}, {
		"id": "410900",
		"name": "濮阳市"
	}, {
		"id": "411500",
		"name": "信阳市"
	}, {
		"id": "410200",
		"name": "开封市"
	}, {
		"id": "411300",
		"name": "南阳市"
	}, {
		"id": "410100",
		"name": "郑州市"
	}, {
		"id": "410500",
		"name": "安阳市"
	}, {
		"id": "410700",
		"name": "新乡市"
	}, {
		"id": "411700",
		"name": "驻马店市"
	}, {
		"id": "410600",
		"name": "鹤壁市"
	}, {
		"id": "411400",
		"name": "商丘市"
	}, {
		"id": "410400",
		"name": "平顶山市"
	}, {
		"id": "411200",
		"name": "三门峡市"
	}, {
		"id": "411000",
		"name": "许昌市"
	}, {
		"id": "411600",
		"name": "周口市"
	}, {
		"id": "411100",
		"name": "漯河市"
	}, {
		"id": "410300",
		"name": "洛阳市"
	}]
}, {
	"id": "230000",
	"name": "黑龙江省",
	"city": [{
		"id": "230900",
		"name": "七台河市"
	}, {
		"id": "230500",
		"name": "双鸭山市"
	}, {
		"id": "230400",
		"name": "鹤岗市"
	}, {
		"id": "230100",
		"name": "哈尔滨市"
	}, {
		"id": "230200",
		"name": "齐齐哈尔市"
	}, {
		"id": "231200",
		"name": "绥化市"
	}, {
		"id": "231000",
		"name": "牡丹江市"
	}, {
		"id": "230800",
		"name": "佳木斯市"
	}, {
		"id": "230700",
		"name": "伊春市"
	}, {
		"id": "231100",
		"name": "黑河市"
	}, {
		"id": "230300",
		"name": "鸡西市"
	}, {
		"id": "230600",
		"name": "大庆市"
	}]
}, {
	"id": "420000",
	"name": "湖北省",
	"city": [{
		"id": "429004",
		"name": "仙桃市"
	}, {
		"id": "429005",
		"name": "潜江市"
	}, {
		"id": "420700",
		"name": "鄂州市"
	}, {
		"id": "420500",
		"name": "宜昌市"
	}, {
		"id": "421200",
		"name": "咸宁市"
	}, {
		"id": "429021",
		"name": "神农架"
	}, {
		"id": "421100",
		"name": "黄冈市"
	}, {
		"id": "420900",
		"name": "孝感市"
	}, {
		"id": "421300",
		"name": "随州市"
	}, {
		"id": "429006",
		"name": "天门市"
	}, {
		"id": "421000",
		"name": "荆州市"
	}, {
		"id": "420300",
		"name": "十堰市"
	}, {
		"id": "420600",
		"name": "襄阳市"
	}, {
		"id": "420800",
		"name": "荆门市"
	}, {
		"id": "420100",
		"name": "武汉市"
	}, {
		"id": "420200",
		"name": "黄石市"
	}]
}, {
	"id": "430000",
	"name": "湖南省",
	"city": [{
		"id": "431100",
		"name": "永州市"
	}, {
		"id": "430100",
		"name": "长沙市"
	}, {
		"id": "430200",
		"name": "株洲市"
	}, {
		"id": "431300",
		"name": "娄底市"
	}, {
		"id": "433100",
		"name": "湘西土家族苗族"
	}, {
		"id": "430300",
		"name": "湘潭市"
	}, {
		"id": "430400",
		"name": "衡阳市"
	}, {
		"id": "430700",
		"name": "常德市"
	}, {
		"id": "430500",
		"name": "邵阳市"
	}, {
		"id": "431200",
		"name": "怀化市"
	}, {
		"id": "430600",
		"name": "岳阳市"
	}, {
		"id": "431000",
		"name": "郴州市"
	}, {
		"id": "430800",
		"name": "张家界市"
	}]
}, {
	"id": "220000",
	"name": "吉林省",
	"city": [{
		"id": "220200",
		"name": "吉林市"
	}, {
		"id": "220300",
		"name": "四平市"
	}, {
		"id": "220100",
		"name": "长春市"
	}, {
		"id": "220600",
		"name": "白山市"
	}, {
		"id": "220500",
		"name": "通化市"
	}, {
		"id": "220800",
		"name": "白城市"
	}, {
		"id": "220400",
		"name": "辽源市"
	}, {
		"id": "220700",
		"name": "松原市"
	}]
}, {
	"id": "320000",
	"name": "江苏省",
	"city": [{
		"id": "321200",
		"name": "泰州市"
	}, {
		"id": "320300",
		"name": "徐州市"
	}, {
		"id": "320500",
		"name": "苏州市"
	}, {
		"id": "320100",
		"name": "南京市"
	}, {
		"id": "320400",
		"name": "常州市"
	}, {
		"id": "320900",
		"name": "盐城市"
	}, {
		"id": "320800",
		"name": "淮安市"
	}, {
		"id": "320700",
		"name": "连云港市"
	}, {
		"id": "321000",
		"name": "扬州市"
	}, {
		"id": "320200",
		"name": "无锡市"
	}, {
		"id": "321300",
		"name": "宿迁市"
	}, {
		"id": "320600",
		"name": "南通市"
	}, {
		"id": "321100",
		"name": "镇江市"
	}]
}, {
	"id": "360000",
	"name": "江西省",
	"city": [{
		"id": "360100",
		"name": "南昌市"
	}, {
		"id": "360400",
		"name": "九江市"
	}, {
		"id": "360800",
		"name": "吉安市"
	}, {
		"id": "361000",
		"name": "抚州市"
	}, {
		"id": "360200",
		"name": "景德镇市"
	}, {
		"id": "360300",
		"name": "萍乡市"
	}, {
		"id": "360900",
		"name": "宜春市"
	}, {
		"id": "360500",
		"name": "新余市"
	}, {
		"id": "360700",
		"name": "赣州市"
	}, {
		"id": "361100",
		"name": "上饶市"
	}, {
		"id": "360600",
		"name": "鹰潭市"
	}]
}, {
	"id": "210000",
	"name": "辽宁省",
	"city": [{
		"id": "210600",
		"name": "丹东市"
	}, {
		"id": "210400",
		"name": "抚顺市"
	}, {
		"id": "210500",
		"name": "本溪市"
	}, {
		"id": "211300",
		"name": "朝阳市"
	}, {
		"id": "211000",
		"name": "辽阳市"
	}, {
		"id": "211200",
		"name": "铁岭市"
	}, {
		"id": "210200",
		"name": "大连市"
	}, {
		"id": "210700",
		"name": "锦州市"
	}, {
		"id": "210900",
		"name": "阜新市"
	}, {
		"id": "210100",
		"name": "沈阳市"
	}, {
		"id": "211400",
		"name": "葫芦岛市"
	}, {
		"id": "210800",
		"name": "营口市"
	}, {
		"id": "210300",
		"name": "鞍山市"
	}, {
		"id": "211100",
		"name": "盘锦市"
	}]
}, {
	"id": "150000",
	"name": "内蒙古",
	"city": [{
		"id": "150400",
		"name": "赤峰市"
	}, {
		"id": "150900",
		"name": "乌兰察布市"
	}, {
		"id": "150200",
		"name": "包头市"
	}, {
		"id": "150300",
		"name": "乌海市"
	}, {
		"id": "150700",
		"name": "呼伦贝尔市"
	}, {
		"id": "150600",
		"name": "鄂尔多斯市"
	}, {
		"id": "150500",
		"name": "通辽市"
	}, {
		"id": "150100",
		"name": "呼和浩特市"
	}, {
		"id": "150800",
		"name": "巴彦淖尔市"
	}]
}, {
	"id": "640000",
	"name": "宁夏",
	"city": [{
		"id": "640100",
		"name": "银川市"
	}, {
		"id": "640300",
		"name": "吴忠市"
	}, {
		"id": "640500",
		"name": "中卫市"
	}, {
		"id": "640200",
		"name": "石嘴山市"
	}, {
		"id": "640400",
		"name": "固原市"
	}]
}, {
	"id": "630000",
	"name": "青海省",
	"city": [{
		"id": "632200",
		"name": "海北藏族"
	}, {
		"id": "632300",
		"name": "黄南藏族"
	}, {
		"id": "630200",
		"name": "海东市"
	}, {
		"id": "632800",
		"name": "海西蒙古族藏族"
	}, {
		"id": "630100",
		"name": "西宁市"
	}, {
		"id": "632700",
		"name": "玉树藏族"
	}, {
		"id": "632600",
		"name": "果洛藏族"
	}, {
		"id": "632500",
		"name": "海南藏族"
	}]
}, {
	"id": "370000",
	"name": "山东省",
	"city": [{
		"id": "371000",
		"name": "威海市"
	}, {
		"id": "370600",
		"name": "烟台市"
	}, {
		"id": "370900",
		"name": "泰安市"
	}, {
		"id": "371300",
		"name": "临沂市"
	}, {
		"id": "370400",
		"name": "枣庄市"
	}, {
		"id": "370500",
		"name": "东营市"
	}, {
		"id": "371400",
		"name": "德州市"
	}, {
		"id": "370300",
		"name": "淄博市"
	}, {
		"id": "371500",
		"name": "聊城市"
	}, {
		"id": "371200",
		"name": "莱芜市"
	}, {
		"id": "371600",
		"name": "滨州市"
	}, {
		"id": "370700",
		"name": "潍坊市"
	}, {
		"id": "371100",
		"name": "日照市"
	}, {
		"id": "370200",
		"name": "青岛市"
	}, {
		"id": "370100",
		"name": "济南市"
	}, {
		"id": "370800",
		"name": "济宁市"
	}, {
		"id": "371700",
		"name": "菏泽市"
	}]
}, {
	"id": "140000",
	"name": "山西省",
	"city": [{
		"id": "140500",
		"name": "晋城市"
	}, {
		"id": "141000",
		"name": "临汾市"
	}, {
		"id": "141100",
		"name": "吕梁市"
	}, {
		"id": "140400",
		"name": "长治市"
	}, {
		"id": "140700",
		"name": "晋中市"
	}, {
		"id": "140100",
		"name": "太原市"
	}, {
		"id": "140800",
		"name": "运城市"
	}, {
		"id": "140600",
		"name": "朔州市"
	}, {
		"id": "140300",
		"name": "阳泉市"
	}, {
		"id": "140900",
		"name": "忻州市"
	}, {
		"id": "140200",
		"name": "大同市"
	}]
}, {
	"id": "610000",
	"name": "陕西省",
	"city": [{
		"id": "610800",
		"name": "榆林市"
	}, {
		"id": "610700",
		"name": "汉中市"
	}, {
		"id": "610600",
		"name": "延安市"
	}, {
		"id": "610300",
		"name": "宝鸡市"
	}, {
		"id": "610200",
		"name": "铜川市"
	}, {
		"id": "610400",
		"name": "咸阳市"
	}, {
		"id": "610500",
		"name": "渭南市"
	}, {
		"id": "610900",
		"name": "安康市"
	}, {
		"id": "610100",
		"name": "西安市"
	}, {
		"id": "611000",
		"name": "商洛市"
	}]
}, {
	"id": "310000",
	"name": "上海",
	"city": [{
		"id": "310100",
		"name": "上海市"
	}]
}, {
	"id": "510000",
	"name": "四川省",
	"city": [{
		"id": "511100",
		"name": "乐山市"
	}, {
		"id": "513400",
		"name": "凉山彝族"
	}, {
		"id": "512000",
		"name": "资阳市"
	}, {
		"id": "511900",
		"name": "巴中市"
	}, {
		"id": "510300",
		"name": "自贡市"
	}, {
		"id": "513300",
		"name": "甘孜藏族"
	}, {
		"id": "511600",
		"name": "广安市"
	}, {
		"id": "510800",
		"name": "广元市"
	}, {
		"id": "511800",
		"name": "雅安市"
	}, {
		"id": "511700",
		"name": "达州市"
	}, {
		"id": "510600",
		"name": "德阳市"
	}, {
		"id": "510700",
		"name": "绵阳市"
	}, {
		"id": "511500",
		"name": "宜宾市"
	}, {
		"id": "513200",
		"name": "阿坝藏族羌族"
	}, {
		"id": "511000",
		"name": "内江市"
	}, {
		"id": "510100",
		"name": "成都市"
	}, {
		"id": "510500",
		"name": "泸州市"
	}, {
		"id": "510900",
		"name": "遂宁市"
	}, {
		"id": "510400",
		"name": "攀枝花市"
	}, {
		"id": "511300",
		"name": "南充市"
	}, {
		"id": "511400",
		"name": "眉山市"
	}]
}, {
	"id": "120000",
	"name": "天津",
	"city": [{
		"id": "120100",
		"name": "天津市"
	}]
}, {
	"id": "650000",
	"name": "新疆",
	"city": [{
		"id": "650200",
		"name": "克拉玛依市"
	}, {
		"id": "654200",
		"name": "塔城地区"
	}, {
		"id": "654000",
		"name": "伊犁哈萨克"
	}, {
		"id": "659003",
		"name": "图木舒克市"
	}, {
		"id": "652800",
		"name": "巴音郭楞蒙古"
	}, {
		"id": "659002",
		"name": "阿拉尔市"
	}, {
		"id": "652700",
		"name": "博尔塔拉蒙古"
	}, {
		"id": "659001",
		"name": "石河子市"
	}, {
		"id": "652100",
		"name": "吐鲁番地区"
	}, {
		"id": "653100",
		"name": "喀什地区"
	}, {
		"id": "659004",
		"name": "五家渠市"
	}, {
		"id": "654300",
		"name": "阿勒泰地区"
	}, {
		"id": "652300",
		"name": "昌吉回族"
	}, {
		"id": "652200",
		"name": "哈密地区"
	}, {
		"id": "653200",
		"name": "和田地区"
	}, {
		"id": "652900",
		"name": "阿克苏地区"
	}, {
		"id": "653000",
		"name": "克孜勒苏柯尔克孜"
	}, {
		"id": "650100",
		"name": "乌鲁木齐市"
	}]
}, {
	"id": "540000",
	"name": "西藏",
	"city": [{
		"id": "542100",
		"name": "昌都地区"
	}, {
		"id": "542600",
		"name": "林芝地区"
	}, {
		"id": "542500",
		"name": "阿里地区"
	}, {
		"id": "542200",
		"name": "山南地区"
	}, {
		"id": "540100",
		"name": "拉萨市"
	}, {
		"id": "540200",
		"name": "日喀则市"
	}, {
		"id": "542400",
		"name": "那曲地区"
	}]
}, {
	"id": "530000",
	"name": "云南省",
	"city": [{
		"id": "530500",
		"name": "保山市"
	}, {
		"id": "532500",
		"name": "红河哈尼族彝族"
	}, {
		"id": "530100",
		"name": "昆明市"
	}, {
		"id": "533400",
		"name": "迪庆藏族"
	}, {
		"id": "532900",
		"name": "大理白族"
	}, {
		"id": "530700",
		"name": "丽江市"
	}, {
		"id": "530900",
		"name": "临沧市"
	}, {
		"id": "532800",
		"name": "西双版纳傣族"
	}, {
		"id": "530300",
		"name": "曲靖市"
	}, {
		"id": "530800",
		"name": "普洱市"
	}, {
		"id": "530600",
		"name": "昭通市"
	}, {
		"id": "532300",
		"name": "楚雄彝族"
	}, {
		"id": "532600",
		"name": "文山壮族苗族"
	}, {
		"id": "530400",
		"name": "玉溪市"
	}, {
		"id": "533100",
		"name": "德宏傣族景颇族"
	}, {
		"id": "533300",
		"name": "怒江傈僳族"
	}]
}, {
	"id": "330000",
	"name": "浙江省",
	"city": [{
		"id": "331100",
		"name": "丽水市"
	}, {
		"id": "330600",
		"name": "绍兴市"
	}, {
		"id": "330100",
		"name": "杭州市"
	}, {
		"id": "330200",
		"name": "宁波市"
	}, {
		"id": "330900",
		"name": "舟山市"
	}, {
		"id": "330400",
		"name": "嘉兴市"
	}, {
		"id": "330800",
		"name": "衢州市"
	}, {
		"id": "331000",
		"name": "台州市"
	}, {
		"id": "330300",
		"name": "温州市"
	}, {
		"id": "330700",
		"name": "金华市"
	}, {
		"id": "330500",
		"name": "湖州市"
	}]
}];
/*初始化省市联动*/
function initAddrSelect($province, $city) {
	var $provinceHtml = '',
		$cityHtml = '',
		index = 0;

	//城市联动
	var citySelect = function(index) {
		var city = province[index].city;
		city.unshift({
			"id": "",
			"name": "请选择"
		});
		for(var i = 0, j = city.length; i < j; i++) {
			var name = city[i].name;
			$cityHtml += '<option value="' + name + '" index="' + i + '">' + name + '</option>';
		}
		$city.html($cityHtml);
	}

	//填充省市数据
	for(var i = 0, j = province.length; i < j; i++) {
		var name = province[i].name;
		$provinceHtml += '<option value="' + name + '" index="' + i + '">' + name + '</option>';
	}
	$province.html($provinceHtml);
	citySelect(index);

	//绑定省份变动事件
	$province.on('change', function() {
		var val = $(this).val();
		$('.provinceCtr>div').text(val);
		$('.cityCtr>div').text('请选择').addClass('placeholder');
		if(val == '请选择') {
			$('.provinceCtr>div').addClass('placeholder');
		} else {
			$('.provinceCtr>div').removeClass('placeholder');
		}
		getPrice();
		$cityHtml = '';
		index = $(this).find("option:selected").attr('index');
		citySelect(index);
	});
	$city.on('change click', function() {
		var val = $(this).val();
		$('.cityCtr>div').text(val);
		if(val == '请选择') {
			$('.cityCtr>div').addClass('placeholder');
		} else {
			$('.cityCtr>div').removeClass('placeholder');
		}
	});
}

// 表单验证样式
function cue(Boolean, obj) {
	if(Boolean) {
		obj.parent().find('i').attr('class', 'icon-ok').css('color', '#7ed321').show();
	} else {
		obj.parent().find('i').attr('class', 'icon-exclamation-sign').attr('wrong', 'wrong').css('color', 'red').show();
	}
}
// 提示信息
function showTips(title, cb) {
	if($('#dialog')) {
		$('#dialog').remove();
	}
	var body = "";
	body += "<div class='weui_dialog_alert' id='dialog' style='display: none;' >";
	body += "<div class='weui_mask'></div>";
	body += "<div class='weui_dialog'>";
	body += "<div class='weui_dialog_hd'><strong class='weui_dialog_title'>温馨提示</strong></div>";
	body += "<div class='weui_dialog_bd'>" + title + "</div>";
	body += "<div class='weui_dialog_ft'>";
	body += " <a href='javascript:;' class='weui_btn_dialog primary' style='color: #3573B3'>确定</a>";
	body += "</div>";
	body += "</div>";
	body += "</div>";
	$("body").append(body);
	var $dialog = $('#dialog');
	$dialog.show();
	$dialog.find('.weui_btn_dialog').one('click', function() {
		$dialog.hide();
		cb && cb();
	});
}