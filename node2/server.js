var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var app = require('./lib/app.js')
var gm = require('gm').subClass({ imageMagick: true });


// 配置个路由
var route = {
    '/': "/",
    'invitationCard': '/invitationCard',
};

// 判断路由是否存在
var isValid = function (reqPath) {
    for (var key in route) {
        if (route[key] == reqPath) {
            return true;
        }
    }
    return false;
};

// 生成邀请卡，输出数据
var writeOut = function (query, res) {
    fs.exists('public/poster/' + query.courseId + '/', function (exists) {
        if (!exists) {
            console.log('课程目录不存在')
            fs.mkdir('public/poster/' + query.courseId, function () {
                console.log('创建成功课程目录')
            })
        }
    })
    fs.exists('public/poster/' + query.courseId + '/' + query.key + '.png', function (exists) {
        if (!exists) {
            query.code = parseInt(Math.random() * 100000000 + 10000);
            // var rectangle_base_x = 555 - (query.nickname.length*30);
            if (query.nickname.length <= '5') {
                var rectangle_base_x = 417;
                var rectangle_base_x_ = 417 + 240;
            } else if (query.nickname.length < '10') {
                var rectangle_base_x = 334;
                var rectangle_base_x_ = 334 + 420;
            } else if (query.nickname.length < '15') {
                var rectangle_base_x = 307;
                var rectangle_base_x_ = 307 + 470;
            } else {
                var rectangle_base_x = 267;
                var rectangle_base_x_ = 267 + 550;
            }
            var rectangle_base_y = 713;
            var circle_base_x = 541;
            var circle_base_y = 559;
            console.log(query.nickname.length)

            var lenth = parseInt(Math.random() * 5000 + 10000);

            console.log(query.code)
            // 生成邀请卡
            app.getPoster(query);
            // 邀请卡添加username
            app.getPoster.prototype.poster = function () {
                // var data = {
                //     employeeId: query.key,
                //     catalogId: '71'
                // };

                // var qHref = "http://sslapi.chazuomba.com/Web/getCommentByEmployee?employeeId=" + query.key + '&catalogId=71';//设置被查询的目标网址
                // var req = http.get(qHref, function (res) {
                //     var pageData = "";
                //     res.setEncoding('utf8');
                //     res.on('error', function (errget) {
                //         //出错处理
                //     });
                //     res.on('data', function (chunk) {
                //         pageData += chunk;
                //     });
                //     console.log(pageData)
                //     res.on('end', function () {
                //         var content = JSON.parse(pageData);//获取到网页内容

                //         console.log(content.data)
                //         var lenth = content.data.lenth;
                //         // var count = content.data.count;

                gm('public/poster/output' + query.key + '.jpg')
                    .fill('#FFFAE2')
                    .font('public/commons/font/msyh.ttf', 30)
                    .drawText(0, -213, query.nickname, 'center')
                    .font('public/commons/font/PingFang.ttc', 34)
                    .fill('#f2c852')
                    .drawText(242, 90, lenth, 'center')
                    .fill("#ffffff00")
                    // .stroke("#283451", 10)
                    .stroke("#f2c852", 3)
                    .drawCircle(circle_base_x, circle_base_y, circle_base_x + 70, circle_base_y + 70)
                    .stroke("#f2c852", 2)
                    .drawRectangle(rectangle_base_x, rectangle_base_y, rectangle_base_x_, rectangle_base_y + 70, 36)
                    .stroke()
                    .fill('#ffffff')
                    .font('public/commons/font/PingFang.ttc', 32)
                    .drawText(0, 890, 'NO: NM17-' + query.code, 'center')
                    .write('public/poster/' + query.courseId + '/' + query.key + ".png", function (err) {
                        if (!err) {
                            console.log('邀请卡 ===> 创建成功：' + this.outname);
                            // fs.createReadStream(this.outname).pipe(res);   // 输出数据
                            console.log('======= 返回邀请卡 ======')
                            app.getPoster.prototype.upload(query.courseId, query.key, query.code);
                        }
                        else
                            console.log(err)
                    });

                //         });

                //     });

            }
            // else
            // fs.createReadStream('public/poster/' + query.courseId + '/' + query.key + '.png').pipe(res);

            // console.log('=======================================>返回邀请卡')
            // console.log(exists ? "邀请卡 ===> 存在" : "邀请卡 ===> 不存在");



        } else {
            console.log('已存在' + query.key);
        }
    })
    res.write('ok');
    res.end();
}

// 启用http创建端口为8080的服务 createServer为回调函数
http.createServer(function (req, res) {

    if (!isValid(url.parse(req.url).pathname)) {
        res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.write("{'status':404,'msg':'请求的资源不可用'}");
        res.end();
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        if (req.method.toUpperCase() == 'POST') {
            var postData = "";
            /**
             * 因为post方式的数据不太一样可能很庞大复杂，
             * 所以要添加监听来获取传递的数据
             * 也可写作 req.on("data",function(data){});
             */
            req.addListener("data", function (data) {
                postData += data;
            });

            // 这个是如果数据读取完毕就会执行的监听方法
            req.addListener("end", function () {
                var query = qs.parse(postData);
                writeOut(query, res);
            });
        }
        else if (req.method.toUpperCase() == 'GET') {
            /**
             * 也可使用var query=qs.parse(url.parse(req.url).query);
             * 区别就是url.parse的arguments[1]为true：
             * ...也能达到‘querystring库’的解析效果，而且不使用querystring
             */
            var query = url.parse(req.url, true).query;
            writeOut(query, res);
        } else {
            //head put delete options etc.
        }
    }

}).listen(9076, function () {
    console.log("listen on port 9076");
});