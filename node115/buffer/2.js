// var mime = 'image/png';
// var encoding = 'base64';
// var uri = 'data:' + mime + ':' + encoding + ';'
// console.log(uri)


var fs = require('fs');
var mime = 'image/png';
var encoding = 'base64';
var data = fs.readFileSync('./timg.png').toString(encoding);
var uri = 'data:' + mime + ';' + encoding + ',' + data;
var data = uri.split(',')[1];
var buf = Buffer(data, encoding);

fs.writeFileSync('./haizei.png', buf);