var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var URL = require('url');
var qs = require('querystring');
var gm = require('gm').subClass({ imageMagick: true });

var PBill = require('../public/javascripts/playbill')
var Card = require('../public/javascripts/card')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST Invitation card. */
router.get('/invitationCard', function (req, res, next) {
  var query = URL.parse(req.url, true).query;
  var app = {
    srcPath: '../public/images/card/'
  }
  if (query.courseId && query.key && query.nickname && query.avatar && query.share) {
    fs.exists(app.srcPath + query.courseId + '/', function (exists) {
      if (!exists) {
        console.log('课程目录不存在')
        fs.mkdir(app.srcPath + query.courseId, function () {
          console.log('创建成功课程目录')
        })
      }
    })
    fs.exists(app.srcPath + query.courseId + '/' + query.key + '.png', function (exists) {
      if (exists) {
        // 生成邀请卡
        var avatar = Card.getPoster(query);
        avatar.avatar.on('close', function () {
          avatar.avatar = this.path;
          var output = Card.getPoster.prototype.drawing(query, avatar);
          Card.getPoster.prototype.poster(query, avatar, output);
        })

        Card.getPoster.prototype.saveCompletion = function (that, poster_url) {
          var data = {
            employeeId: that.employeeId,
            courseId: that.courseId,
            code: 'NM17_' + that.code,
            imgAddress: poster_url
          };
          console.log(data)
          data = require('querystring').stringify(data);
          var opt = {
            host: 'www.chazuomba.com',
            port: '8082',
            method: 'POST',
            path: '/iserver/app/saveCompletion',
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded',
              "Content-Length": data.length
            }
          }
          var body = '';
          var req = http.request(opt, function (res) {
            console.log("response: " + res.statusCode);
            res.on('data', function (data) {
              body += data;
            }).on('end', function () {
              var content = JSON.parse(body);//获取到网页内容
              console.log(content)
            });
          }).on('error', function (e) {
            console.log("error: " + e.message);
          })
          // req.write(poster_url);
          req.end();


          var userPoster = {
            user_poster: poster_url
          }
          var response = { status: 200, msg: '生成成功', data: userPoster };
          res.send(JSON.stringify(response));
          res.end();
        }
        var userPoster = {
          user_poster: 'poster_url'
        }
        var response = { status: 200, msg: '生成成功', data: userPoster };
        res.send(JSON.stringify(response));
        res.end();

      } else {
        var response = { status: 200, msg: '此用户已拥有结业证书' };
        res.send(JSON.stringify(response));
        res.end();
        console.log('已存在' + query.key);
      }
    })
  } else {
    var response = { status: 500, msg: '信息缺失' };
    res.send(JSON.stringify(response));
    res.end();
  }
});

/* POST Graduation certificate. */
router.post('/graduationCertificate', function (req, res, next) {

  var query = URL.parse(req.url, true).query;

  if (query.courseId && query.key && query.nickname && query.avatar) {
    fs.exists('../public/images/poster/' + query.courseId + '/', function (exists) {
      if (!exists) {
        console.log('课程目录不存在')
        fs.mkdir('../public/images/poster/' + query.courseId, function () {
          console.log('创建成功课程目录')
        })
      }
    })
    fs.exists('../public/images/poster/' + query.courseId + '/' + query.key + '.png', function (exists) {
      if (!exists) {
        query.code = parseInt(Math.random() * 100000000 + 10000);
        // 生成邀请卡
        var avatar = PBill.getPoster(query);
        avatar.avatar.on('close', function () {
          avatar.avatar = this.path;
          var output = PBill.getPoster.prototype.drawing(query, avatar);
          PBill.getPoster.prototype.poster(query, avatar, output);
        })
      } else {
        var response = { status: 200, msg: '此用户已拥有结业证书' };
        res.send(JSON.stringify(response));
        res.end();
        console.log('已存在' + query.key);
      }
    })

    PBill.getPoster.prototype.saveCompletion = function (that, poster_url) {
      var data = {
        employeeId: that.employeeId,
        courseId: that.courseId,
        code: 'NM17_' + that.code,
        imgAddress: poster_url
      };
      console.log(data)
      data = require('querystring').stringify(data);
      var opt = {
        host: 'www.chazuomba.com',
        port: '8082',
        method: 'POST',
        path: '/iserver/app/saveCompletion',
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
          "Content-Length": data.length
        }
      }
      var body = '';
      var req = http.request(opt, function (res) {
        console.log("response: " + res.statusCode);
        res.on('data', function (data) {
          body += data;
        }).on('end', function () {
          var content = JSON.parse(body);//获取到网页内容
          console.log(content)
        });
      }).on('error', function (e) {
        console.log("error: " + e.message);
      })
      // req.write(poster_url);
      req.end();


      var userPoster = {
        user_poster: poster_url
      }
      var response = { status: 200, msg: '生成成功', data: userPoster };
      res.send(JSON.stringify(response));
      res.end();
    }
  } else {
    var response = { status: 500, msg: '信息缺失' };
    res.send(JSON.stringify(response));
    res.end();
  }
});

module.exports = router;
