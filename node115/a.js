var group = require('./group');
group.one();
group.tow();

var path = require('path');
console.log(path.join(__dirname,'views','view.html'))
console.log('__dirname:', __dirname)
console.log('__filename:', __filename)