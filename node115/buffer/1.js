var fs = require('fs');
fs.readFile('./names.txt', function(er, buf){
  Buffer.isBuffer(buf); // true
  console.log(Buffer.isBuffer(buf))
  console.log(buf)
  console.log(buf.toString());
  console.log(buf.toString('ascii'));
});