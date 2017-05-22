$(function() {
	var orderNo = request('out_trade_no');
	getAjaxData('getOrderByOrderNo', {
		orderNo: orderNo
	}, function(res) {
		if(res.status == '200') {
			data = res.data[0];
		} else {
			alert(res.msg);
			return;
		}
		var fee = parseInt(data.price) - parseInt(data.number) * 68;
		fee = parseInt(fee);
		$('.shName').text(data.name);
		$('.shTel').text(data.mobile);
		$('.shAdd').text('收货地址：' + data.province + data.city + data.address);
		$('.bookTip').text('x' + data.number);
		$('.bookTotalPrice').html('&yen;' + data.price);
		$('.feePrice').text(fee)
	});
});