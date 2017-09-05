var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log(req.userInfo)
  if (req.userInfo._id) {
    res.render('main/index', { userInfo: req.userInfo });
  } else {
    res.send('<a href="/">请登陆</a>');
  }
});

module.exports = router;