const http = require('http');

const homePage = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Nodejs 部署线上实例（随时失效）</title>
  <style lang="">
    *{margin: 0;padding: 0;}
    body{padding: 30px 0;text-align: center;font-size: 16px;background-color: #333;}
    h1,h2{color: #fff;}
    nav{margin-top: 20px;}
    a{color: #ccc;text-decoration: none;}
    a:hover{text-decoration: underline;}
  </style>
</head>

<body>
  <h1>慕课网 Nodejs 高级课程</h1>
  <h2>项目部署上线示例</h2>
  <nav>
    <ul>
      <li><a href="/a" target="_blank">Nodejs 电影网站</a></li>
      <li><a href="/b" target="_blank">狗狗说 后台</a></li>
      <li><a href="/c" target="_blank">微信小程序后台</a></li>
      <li><a href="/d" target="_blank">微信公众号后台</a></li>
    </ul>
  </nav>
</body>

</html>
`

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(homePage);
})
  .listen(3000, () => {
    console.log('Server Running At 3000')
  });