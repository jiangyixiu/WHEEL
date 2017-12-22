var http = require('http');
var fs = require('fs');

// http.createServer(function (req, res) {
//   fs.readFile(__dirname + '/index.html', function (err, data) {
//     if (err) {
//       res.statusCode = 500;
//       res.end(String(err));
//     } else {
//       res.end(data);
//     }
//   })
// }).listen(8001);


// http.createServer(function(req, res){
//   fs.createReadStream(__dirname + '/index.html').pipe(res);
// }).listen(8001);

var zlib = require('zlib');

http.createServer(function (req, res) {
  res.writeHead(200, { 'content-encoding': 'gzip' });
  fs.createReadStream(__dirname + '/index.html')
    .pipe(zlib.createGzip())
    .pipe(res);
}).listen(8001);