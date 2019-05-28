// stream 用到自定义事件
const fs = require('fs')
const readStream = fs.createReadStream('./data/file.txt')

var length = 0

readStream.on('data', function(chunk) {
    let len = chunk.toString().length
    console.log(len)
    length += len
})

readStream.on('end', function() {
    console.log('length', length)
})