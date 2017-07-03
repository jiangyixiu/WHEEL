/**
 * Created by xyloveqx on 2017/6/28.
 */
var qr = require('qr-image');
var im = require('images');
var fs = require('fs')
// var gm = require('gm');

var url = 'http://www.chazuomba.com/files/activity/fenxiao/card.html?2=2&id=2488&key=3401&from=20170000'
var avatar = "http://wx.qlogo.cn/mmopen/SWjyVRS5k2qSWUawoWlHk6e3icrCgYAR3XNtN8ausjf7axjswNyfyjVOkqTUeGx5mO3kVwpHcGXtypAnHkZxZR1V5nmsCVy84/0";
var nickname = "江晓咏";

var qr_png = qr.image(url, {
    ec_level: 'L',  //error correction level. One of L, M, Q, H. Default M.
    type: 'png',
    margin: 2,
    size: 3
}).pipe(fs.createWriteStream('poster/qr_course.png')
    .on('close', () => {
        im("images/poster_bg.png")
            .size(750)      //等比缩放图像到400像素宽
            .draw(im("images/timg.jpeg").size(80), 335, 390)   // 在(x,y)处绘制Logo
            .draw(im("poster/qr_course.png").size(155), 150, 1050)
            .save("poster/output.jpg", {
                quality: 72   // 保存图片到文件,图片质量为72
            });
    }));




// im("/images/WechatIMG357.jpeg")
// //Load image from file
// //加载图像文件
//     .size(750)      //等比缩放图像到400像素宽
//     .draw(im("/images/timg.png"), 10,10)   // 在(10,10)处绘制Logo
//     .save("output.jpg", {   // 保存图片到文件,图片质量为50
//         quality: 72
//     });


// var fs = require('fs')
// var gm = require('gm');

// gm(200, 400, "#ddff99f3")
//     .drawText(10, 50, "江晓咏")
//     .write("brandNewImg.jpg", function (err) {
//         if (!err) console.log('done')
//         else
//             console.log(err)
//     });

// gm('/images/WechatIMG357.jpeg')
//     .stroke("#ffffff")
//     .drawCircle(10, 10, 20, 10)
//     // .font("Helvetica.ttf", 12)
//     .drawText(30, 20, "GMagick!")
//     .write("drawing.png", function (err) {
//         if (!err) console.log('done')
//         else
//             console.log('err')
//     });

// gm(200, 400, "#ddff99f3")
//     .drawText(10, 50, "from scratch")
//     .write("brandNewImg.jpg", function (err) {
//         if (!err) console.log('done')
//         else
//             console.log('err')
//     });
