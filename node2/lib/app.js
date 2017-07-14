/**
 * Created by xyloveqx on 2017/6/28.
 */

var request = require("request");
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var qr = require('qr-image');
var im = require('images');
var gm = require('gm').subClass({ imageMagick: true });

exports.getPoster = getPoster;

var app = {
    srcPath: 'public/poster/',
}

// 获取图片资源
function getPoster(query) {

    var nickname = query.nickname;
    var avatar = query.avatar;
    var courseId = query.courseId;
    var code = query.code;
    var key_ = query.key;


    request(avatar)
        .pipe(fs.createWriteStream(app.srcPath + 'avatar'+key_+'.png')
            .on('close', () => {
                getPoster.prototype.drawing(key_,code)
            }));

    return exports.getPoster;
}

// 生成二维码
getPoster.prototype.drawing = function (key_,code) {

    var url = 'http://www.chazuomba.com/files/AppWeb/certificate/index.html?code=NM17_' + code;
    qr.image(url, {
        ec_level: 'L',  //error correction level. One of L, M, Q, H. Default M.
        type: 'png',
        margin: 2,
        size: 4
    }).pipe(fs.createWriteStream(app.srcPath + "qr_course"+key_+".png")
        .on('close', () => {
            im("public/images/jyzs_zzl.png")
                .size(1080)      //等比缩放图像到750像素宽
                .draw(im(app.srcPath + "avatar"+key_+".png").size(196), 441, 461)   // 在(x,y)处绘制
                .draw(im("public/images/shade.png").size(212), 436, 452)   // 在(x,y)处绘制
                .draw(im(app.srcPath + "qr_course"+key_+".png").size(181), 279, 1625)
                .save(app.srcPath + "output"+key_+".jpg", {
                    quality: 72   // 保存图片到文件,图片质量为72
                });
            getPoster.prototype.poster()
        }));
}


// 图片上传七牛云
getPoster.prototype.upload = function upload(courseId, _key, code) {

    var qiniu = require('qiniu');
    var util = require('../public/commons/js/util.js');

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

    var localFile = "./" + app.srcPath + courseId + '/' + _key + ".png";
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var key = 'jyzs' + util.randomWord(false, 43) + '.png';

    // 文件上传
    
    formUploader.putFile(uploadToken, key, localFile, putExtra,
        (respErr, respBody, respInfo) => {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
                var poster_url = 'https://sslfile.ichazuo.cn/' + respBody.key;

                saveCompletion(_key, courseId, code, poster_url);

            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });
}

function saveCompletion(employeeId, courseId, code, poster_url) {
    var data = {
        employeeId: employeeId,
        courseId: courseId,
        code: 'NM17_' + code,
        imgAddress: poster_url
    };
    console.log(data)
    // data = JSON.stringify(data);
    data = require('querystring').stringify(data);
    console.log(data)
    var opt = {
        host: 'www.chazuomba.com',
        port: '8082',
        method: 'POST',
        path: '/iserver/app/saveCompletion',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": data.length
        }
    }

    var body = '';
    var req = http.request(opt, function (res) {
        console.log("response: " + res.statusCode);
        res.on('data', function (data) {
            body += data;
        }).on('end', function () {
            var content = JSON.parse(body);//获取到网页内容
            console.log(content)
        });
    }).on('error', function (e) {
        console.log("error: " + e.message);
    })
    req.write(data);
    req.end();
}