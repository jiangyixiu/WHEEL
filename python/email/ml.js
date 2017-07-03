/**
 * Created by xyloveqx on 2017/4/14.
 */
var fs = require('fs');
var gm = require('gm');

// var imageMagick = gm.subClass({ imageMagick : true });
// imageMagick(224, 144, "#fff")
//     .fontSize(18)
//     .drawText(10, 25, "GMagick!")
//     .write('ImgNumber.png',function(e){
//         console.log(e)
//     }); // bug point

gm('yzl.png')
    .size(function (err, size) {
        console.log(err)
        if (!err)
            console.log(size.width > size.height ? 'wider' : 'taller than you');
    });
// // annotate an image
// gm('yzl.png')
//     // .stroke("#ffffff")
//     // .drawCircle(10, 10, 20, 10)
//     // .font("Helvetica.ttf", 12)
//     .drawText(30, 20, "GMagick!")
//     .write("drawing.jpg", function (err) {
//         if (!err) console.log('done');
//     });