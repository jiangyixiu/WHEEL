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
    // 生成邀请卡
    app.getPoster(query);
    // 邀请卡添加username
    app.getPoster.prototype.poster = function () {

        fs.exists('public/poster/' + query.courseId + '/', function (exists) {
            if (!exists) {
                console.log('课程ID目录 ===> 不存在')
                fs.mkdir('public/poster/' + query.courseId, function () {
                    console.log('课程ID目录 ===> 创建成功')
                })
            } else {
                console.log('课程ID目录 ===> 存在')
            }
        })

        fs.exists('public/poster/' + query.courseId + '/' + query.key + '.png', function (exists) {
            if (!exists) {
                gm('public/poster/output.jpg')
                    .fill('#FFFAE2')
                    .font('public/commons/font/msyh.ttf', 26)
                    .drawText(0, -160, query.nickname, 'center')
                    .fontSize(37)
                    .drawText(0, -30, '《 ' + query.synopsis + ' 》', 'center')
                    .fontSize(30)
                    .drawText(0, 180, query.share.replace(/\\n/g, '\n'), 'center')
                    .write('public/poster/' + query.courseId + '/' + query.key + ".png", function (err) {
                        if (!err) {
                            console.log('邀请卡 ===> 创建成功：' + this.outname);
                            fs.createReadStream(this.outname).pipe(res);   // 输出数据
                            console.log('======= 返回邀请卡 ======')
                        }
                        else
                            console.log(err)
                    });
            }
            else
                fs.createReadStream('public/poster/' + query.courseId + '/' + query.key + '.png').pipe(res);
                console.log('=======================================>返回邀请卡')
            console.log(exists ? "邀请卡 ===> 存在" : "邀请卡 ===> 不存在");
        })


    }

    // res.write(JSON.stringify(query));
    //res.end();
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