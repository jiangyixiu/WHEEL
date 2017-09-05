var express = require('express');
var router = express.Router();
var User = require('../models/User');

// 统一返回格式
var responseData;
router.use(function (rep, res, next) {
  responseData = {
    code: 0,
    message: ''
  }
  next();
});

/* 用户注册 */
router.post('/user/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;

  // 用户是否为空
  if (username === '' || username === undefined) {
    responseData.code = 1;
    responseData.message = '用户名不能为空';
    res.json(responseData);
    return;
  }
  // 密码不能为空
  if (password === '' || password === undefined) {
    responseData.code = 2;
    responseData.message = '密码不能为空';
    res.json(responseData);
    return;
  }
  // 两次输入的密码不一致
  if (password !== repassword) {
    responseData.code = 3;
    responseData.message = '密码不一致';
    res.json(responseData);
    return;
  }

  // 从数据库查询用户名是否已经被注册
  User.findOne({
    username: username
  }).then(function (userInfo) {
    // console.log(userInfo)
    if (userInfo) {
      // 数据库中有该记录
      responseData.code = '4';
      responseData.message = '用户名已被注册';
      res.json(responseData);
      return;
    } else {
      // 保存数据到数据库
      var user = new User({
        username: username,
        password: password
      });
      return user.save();
    }
  }).then(function (newUserInfo) {
    responseData.message = '恭喜你，注册成功！';
    res.json(responseData);
  });
});

// 用户登录
router.post('/user/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (username == '' || password == '') {
    responseData.message = '用户名和密码不能为空';
    res.json(responseData);
    return;
  }

  // 查询数据库
  User.findOne({
    username: username,
    password: password
  }).then(function(userInfo){
    if(!userInfo){
      responseData.code = '2';
      responseData.message = '用户名或密码错误';
      res.json(responseData);
      return;
    } else {
      // 用户名密码正确
      responseData.message = '登陆成功';
      responseData.userInfo = {
        _id: userInfo._id,
        isAdmin: userInfo.isAdmin
      };
      res.cookie('userInfo', JSON.stringify({
        _id: userInfo._id,
        isAdmin: userInfo.isAdmin,
        username: userInfo.username
      }));
      res.json(responseData);
      return;
    }
  })

});

module.exports = router;
