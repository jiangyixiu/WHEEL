var request = require("request");
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var qr = require('qr-image');
var im = require('images');
var gm = require('gm').subClass({ imageMagick: true });
var util = require('../../public/commons/js/util');

var app = {
    srcPath: '../public/images/poster/',
    aidPath: '../public/images/poster/aid/',
}

// 获取图片资源
function getPoster(query) {
    var url = 'http://www.chazuomba.com/files/AppWeb/certificate/index.html?code=NM17_' + query.code;
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
    im("../public/images/jyzs_zzl.png")
        .size(1080)      //等比缩放图像到750像素宽
        .draw(im(avatar.avatar).size(196), 441, 461)   // 在(x,y)处绘制
        .draw(im("../public/images/shade.png").size(212), 436, 452)   // 在(x,y)处绘制
        .draw(im(avatar.qr_course).size(181), 279, 1625)
        .save(app.aidPath + "output" + that.key + ".jpg", {
            quality: 72   // 保存图片到文件,图片质量为72
        });
    return app.aidPath + "output" + that.key + ".jpg";
}

// 邀请卡添加username
getPoster.prototype.poster = function (that) {

    if (that.nickname.length <= '5') {
        var rectangle_base_x = 417;
        var rectangle_base_x_ = 417 + 240;
    } else if (that.nickname.length < '10') {
        var rectangle_base_x = 337;
        var rectangle_base_x_ = 337 + 420;
    } else if (that.nickname.length < '15') {
        var rectangle_base_x = 307;
        var rectangle_base_x_ = 307 + 470;
    } else {
        var rectangle_base_x = 267;
        var rectangle_base_x_ = 267 + 550;
    }
    var rectangle_base_y = 713;
    var circle_base_x = 541;
    var circle_base_y = 559;
    var lenth = parseInt(Math.random() * 5000 + 10000);

    gm(app.aidPath + 'output' + that.key + '.jpg')
        .fill('#FFFAE2')
        .font('../public/commons/font/msyh.ttf', 30)
        .drawText(0, -213, that.nickname, 'center')
        .font('../public/commons/font/PingFang.ttc', 34)
        .fill('#f2c852')
        .drawText(242, 90, lenth, 'center')
        .fill("#ffffff00")
        .stroke("#f2c852", 3)
        .stroke("#f2c852", 2)
        .drawRectangle(rectangle_base_x, rectangle_base_y, rectangle_base_x_, rectangle_base_y + 70, 36)
        .stroke()
        .fill('#ffffff')
        .font('../public/commons/font/PingFang.ttc', 32)
        .drawText(0, 890, 'NO: NM17-' + that.code, 'center')
        .write(app.srcPath + that.courseId + '/' + that.key + ".png", function (err) {
            if (!err) {
                console.log('邀请卡 ===> 创建成功：' + this.outname);
                // fs.createReadStream(this.outname).pipe(res);   // 输出数据
                getPoster.prototype.upload(that);
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