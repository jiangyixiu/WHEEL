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

// var url = 'http://www.chazuomba.com/files/activity/fenxiao/card.html?2=2&id=2488&key=3401&from=20170000'
// var key = '3401';
// var avatar = "http://wx.qlogo.cn/mmopen/SWjyVRS5k2qSWUawoWlHk6e3icrCgYAR3XNtN8ausjf7axjswNyfyjVOkqTUeGx5mO3kVwpHcGXtypAnHkZxZR1V5nmsCVy84/0";
// var nickname = "江晓咏";

exports.getPoster = getPoster;

var app = {
    srcPath: 'public/poster/',
}

// 获取图片资源
function getPoster(query) {

    var nickname = query.nickname;
    var synopsis = query.synopsis;
    var avatar = query.avatar;
    var share = query.share;
    var url = query.url;
    var key = query.key;

    request(avatar)
        .pipe(fs.createWriteStream(app.srcPath + 'avatar.png')
            .on('close', () => {
                getPoster.prototype.qr_png(url)
            }));

    return exports.getPoster;
}

// 生成二维码
getPoster.prototype.qr_png = function (url) {
    qr.image(url, {
        ec_level: 'L',  //error correction level. One of L, M, Q, H. Default M.
        type: 'png',
        margin: 2,
        size: 3
    }).pipe(fs.createWriteStream(app.srcPath + "qr_course.png")
        .on('close', () => {
            im("public/images/poster_bg.png")
                .size(750)      //等比缩放图像到750像素宽
                .draw(im(app.srcPath + "avatar.png").size(80), 335, 390)   // 在(x,y)处绘制
                .draw(im(app.srcPath + "qr_course.png").size(155), 150, 1050)
                .save(app.srcPath + "output.jpg", {
                    quality: 72   // 保存图片到文件,图片质量为72
                });
            getPoster.prototype.poster()
        }));
}


//// 图片上传七牛云
// function upload() {

//     var qiniu = require('qiniu');
//     var util = require('./public/commons/js/util.js');

//     // 上传凭证
//     var accessKey = '-X5dFx3g2b5RmH0kErVLdtP5dFwyGDg-fmJ6TDWX';
//     var secretKey = 'O2ygLYUxRSP26wHqqdBNDq5zJCNyvgIHQc78Hwd0';
//     var bucket = 'ichazuo';

//     var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//     var options = {
//         scope: bucket,
//         expires: 7200
//     };
//     var putPolicy = new qiniu.rs.PutPolicy(options);
//     var uploadToken = putPolicy.uploadToken(mac);

//     var config = new qiniu.conf.Config();
//     // 空间对应的机房
//     config.zone = qiniu.zone.Zone_z0;
//     // 是否使用https域名
//     //config.useHttpsDomain = true;
//     // 上传是否使用cdn加速
//     //config.useCdnDomain = true;

//     var localFile = "./" + app.srcPath + "poster.png";
//     var formUploader = new qiniu.form_up.FormUploader(config);
//     var putExtra = new qiniu.form_up.PutExtra();
//     var key = 'poster_' + util.randomWord(false, 43) + '.png';

//     // 文件上传
//     formUploader.putFile(uploadToken, key, localFile, putExtra,
//         (respErr, respBody, respInfo) => {
//             if (respErr) {
//                 throw respErr;
//             }
//             if (respInfo.statusCode == 200) {
//                 console.log(respBody);
//                 var poster_url = 'http://file.ichazuo.cn/' + respBody.key;
//                 return 'http://file.ichazuo.cn/' + respBody.key;
//             } else {
//                 console.log(respInfo.statusCode);
//                 console.log(respBody);
//             }
//         });
// }



// var server = http.createServer(function (req, res) {
//     var url_info = require('url').parse(req.url, true);
//     // 检查是不是给/test的request
//     if (url_info.pathname === '/test') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         var arg = querystring.parse(require('url').parse(req.url).query);
//         var url = arg.url
//         var key = arg.key;
//         var avatar = arg.avatar;
//         var nickname = arg.nickname;
//         console.log(arg)
//         fs.createReadStream('./public/poster/3401.png').pipe(res);
//     }
//     else {  // 这个是用来回复上面那个post的，显示post的数据以表示成功了。你要是有别的目标，自然不需要这一段。
//         req.pipe(res);
//     }
// });
// // server.listen(9000, '127.0.0.1');
// server.on('close', function () {
//     // server关闭
// });
// console.log('listening on port  9000');

















// var fs = require('fs'),
//     PNG = require('pngjs').PNG;
// fs.createReadStream('images/avatar.png')
//     .pipe(new PNG({
//         filterType: 4
//     }))
//     .on('parsed', function() {

//         for (var y = 0; y < this.height; y++) {
//             for (var x = 0; x < this.width; x++) {
//                 var idx = (this.width * y + x) << 2;

//                 // invert color 
//                 this.data[idx] = 255 - this.data[idx];
//                 this.data[idx+1] = 255 - this.data[idx+1];
//                 this.data[idx+2] = 255 - this.data[idx+2];

//                 // and reduce opacity 
//                 this.data[idx+3] = this.data[idx+3] >> 1;
//             }
//         }

//         this.pack().pipe(fs.createWriteStream('out.png'));
//     });