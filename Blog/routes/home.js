var express = require('express');
var router = express.Router();
var Category = require('../models/Category')

router.get('/', function (req, res, next) {
  if (req.userInfo._id) {
    // 读取所有分类信息
    Category.find().then(function (categories) {
      // console.log(categories)
      res.render('main/index', {
        userInfo: req.userInfo,
        categories: categories
      });
    })
  } else {
    res.send('<a href="/">请登陆</a>');
  }
});

module.exports = router;