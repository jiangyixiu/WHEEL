var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/login', { userInfo: req.userInfo });
});

module.exports = router;
