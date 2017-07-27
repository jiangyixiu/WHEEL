var request = require("request");
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var qr = require('qr-image');
var im = require('images');
var gm = require('gm').subClass({ imageMagick: true });
var util = require('../../public/commons/js/util');

var app = {
	srcPath: '../public/images/card/',
	aidPath: '../public/images/card/aid/',
}

// 获取图片资源
function getPoster(query) {
	var url = "http://www.chazuomba.com/files/webApp/onlineCourseContent.html?id=" + query.courseId + "&key=" + query.key + "&v=" + Math.random();
	var avatar = request(query.avatar)
		.pipe(fs.createWriteStream(app.aidPath + 'avatar' + query.key + '.png'));

	var qr_course = qr.image(url, {
		ec_level: 'L',  //error correction level. One of L, M, Q, H. Default M.
		type: 'png',
		margin: 2,
		size: 4
	}).pipe(fs.createWriteStream(app.aidPath + "qr_course" + query.key + ".png"));

	return {
		"avatar": avatar,
		"qr_course": qr_course
	}
}

// 生成二维码
getPoster.prototype.drawing = function (that, avatar) {
	im("../public/images/yqk_bg.png")
		.size(1080)      //等比缩放图像到750像素宽
		.draw(im(avatar.avatar).size(115), 482, 597)   // 在(x,y)处绘制
		.draw(im(avatar.qr_course.path).size(223), 184.3, 1513.4)
		.save(app.aidPath + "output" + that.key + ".jpg", {
			quality: 72   // 保存图片到文件,图片质量为72
		});
	return app.aidPath + "output" + that.key + ".jpg";
}

// 邀请卡添加username
getPoster.prototype.poster = function (that) {
	var circle_base_x = 539;
	var circle_base_y = 654;
	gm(app.aidPath + 'output' + that.key + '.jpg')
		.fill('#ffffff00')
		.stroke("#f2c852", 4)
		.drawCircle(circle_base_x, circle_base_y, circle_base_x + 41.5, circle_base_y + 41.5)
		.stroke("#293145", 40)
		.drawCircle(circle_base_x, circle_base_y, circle_base_x + 56.5, circle_base_y + 56.5)
		.fill('#FFFAE2')
		.stroke()
		.font('../public/commons/font/msyh.ttf', 40)
		.drawText(0, -206, that.nickname, 'center')
		.font('../public/commons/font/msyh.ttf', 54)
		.drawText(0, -40, '《 品牌公关 · 从业指南 》', 'center')
		.font('../public/commons/font/msyh.ttf', 44)
		.drawText(0, 266, that.share.replace(/\\n/g, '\n'), 'center')
		.write(app.srcPath + that.courseId + '/' + that.key + ".png", function (err) {
			if (!err) {
				console.log('邀请卡 ===> 创建成功：' + this.outname);
				// fs.createReadStream(this.outname).pipe(res);   // 输出数据
				// getPoster.prototype.upload(that);
			}
			else
				console.log(err)
		})
}


// 图片上传七牛云
getPoster.prototype.upload = function upload(that) {

	var qiniu = require('qiniu');
	console.log(1)

	// 上传凭证
	var accessKey = '-X5dFx3g2b5RmH0kErVLdtP5dFwyGDg-fmJ6TDWX';
	var secretKey = 'O2ygLYUxRSP26wHqqdBNDq5zJCNyvgIHQc78Hwd0';
	var bucket = 'ichazuo';

	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	var options = {
		scope: bucket,
		expires: 7200
	};
	var putPolicy = new qiniu.rs.PutPolicy(options);
	var uploadToken = putPolicy.uploadToken(mac);

	var config = new qiniu.conf.Config();
	// 空间对应的机房
	config.zone = qiniu.zone.Zone_z0;
	// 是否使用https域名
	config.useHttpsDomain = true;
	// 上传是否使用cdn加速
	config.useCdnDomain = true;

	var localFile = "./" + app.srcPath + that.courseId + '/' + that.key + ".png";
	var formUploader = new qiniu.form_up.FormUploader(config);
	var putExtra = new qiniu.form_up.PutExtra();
	var key = 'jyzs' + util.randomWord(false, 43) + '.png';

	// 文件上传
	console.log(this);
	console.log(this);
	formUploader.putFile(uploadToken, key, localFile, putExtra,
		(respErr, respBody, respInfo) => {
			if (respErr) {
				throw respErr;
			}
			if (respInfo.statusCode == 200) {
				console.log(respBody);
				var poster_url = 'https://sslfile.ichazuo.cn/' + respBody.key;
				// 保存
				getPoster.prototype.saveCompletion(that, poster_url);
			} else {
				console.log(respInfo.statusCode);
				console.log(respBody);
			}
		});

}

module.exports.getPoster = getPoster;