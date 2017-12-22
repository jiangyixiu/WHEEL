var CountStream = require('./CountStream');   // 加载countstream.js
var countStream = new CountStream('Python');    // 创建一个CountStream的示例用于匹配“Pyrhon”的文本技术
var http = require('http');
http.get('http://coding.imooc.com/', function (res) {   // 下载www.manning.com页面
  res.pipe(countStream);    // 从网站中以管道的方式把数据传给countStream用于文本计数
});

countStream.on('total', function (count) {
  console.log('Total matches', count);
});