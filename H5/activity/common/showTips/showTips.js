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