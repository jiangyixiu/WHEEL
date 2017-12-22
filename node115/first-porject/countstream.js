var Writable = require('stream').Writable;
var util = require('util');

module.exports = CountStream;

util.inherits(CountStream, Writable);  // 继承可写流

function CountStream(matchText, options) {
  Writable.call(this, options);
  this.count = 0;
  this.matcher = new RegExp(matchText, 'ig');   // 创建一个全局且忽略大小写的正则对象
}

CountStream.prototype._write = function (chunk, encoding, cb) {
  var matches = chunk.toString().match(this.matcher);   // 把当前的输入数据转化为字符串并进行匹配
  if (matches) {
    this.count += matches.length;
  }
  cb();
}

CountStream.prototype.end = function () {
  this.emit('total', this.count);   // 当输入流结束时，触发total事件
}