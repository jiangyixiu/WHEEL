const xlsx = require("node-xlsx");
const fs = require('fs');
const xlsx_data = xlsx.parse("Camp.xlsx");

let data = {
	"status": 200,
	"msg": "作业题目列表",
	"data": {}
};

xlsx_data['0']['data'].forEach(item => {
	let key = item[0];
	let val = item[1];
	data['data'][key] = val;
});

writeFile("all.json", JSON.stringify(data));
function writeFile(fileName, data) {
	fs.writeFile(fileName, data, 'utf-8', complete);
	function complete(err) {
		if (!err) {
			console.log("文件生成成功");
		}
	}
}