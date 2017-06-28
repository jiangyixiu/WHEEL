/**
 * Created by xyloveqx on 2017/6/28.
 */

// var Img = require('images');
// var Img = require('imagemagick');

// Img("./images/WechatIMG357.jpeg")
// //Load image from file
// //加载图像文件
//     .size(750)      //等比缩放图像到400像素宽
//     .draw(0,0,'江晓咏','Center')   // 在(10,10)处绘制Logo
//     // .draw(Img("./images/pay_logo.png"), 10,10)   // 在(10,10)处绘制Logo
//     .save("output.jpg", {   // 保存图片到文件,图片质量为50
//         quality: 72
//     });
// Img("./images/pay_logo.png")


var fs = require('fs')
var gm = require('gm');

gm(200, 400, "#ddff99f3")
    .drawText(10, 50, "江晓咏")
    .write("brandNewImg.jpg", function (err) {
        if (!err) console.log('done')
        else
            console.log(err)
    });

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
