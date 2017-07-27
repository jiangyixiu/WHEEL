var express = require('express');
var router = express.Router();

/* 用户注册 */
router.post('/user/register', function (req, res, next) {
  res.render('main/index', req.body, function(err, html){
    console.log(html)
  });
});

module.exports = router;
