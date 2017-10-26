var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');


router.get('/', function (req, res, next) {
  res.render('admin/index', {
    userInfo: req.userInfo
  })
})


/**
 * 用户管理
 */
router.get('/user', function (req, res, next) {
  /**
   * find()  获取数据库信息
   * limit() 限制获取的条数
   * skip()  忽略数据的条数
   * count() 
   */
  var page = Number(req.query.page || 1);
  var limit = 3;
  var pages = 0;

  User.count().then(function (count) {

    // 计算总页数
    pages = Math.ceil(count / limit);
    // 取值不大于总页数
    page = Math.min(page, pages);
    // 取值不小于1
    page = Math.max(page, 1)

    var skip = (page - 1) * limit;

    User.find().limit(limit).skip(skip).then(function (users) {
      res.render('admin/user_index', {
        userInfo: req.userInfo,
        users: users,
        pages: pages,
        page: page,
        limit: limit,
        count: count,
      })
    });
  })
});

/**
 * 分类首页
 */
router.get('/category', function (req, res, next) {
  /**
    * find()  获取数据库信息
    * limit() 限制获取的条数
    * skip()  忽略数据的条数
    * count() 
    */
  var page = Number(req.query.page || 1);
  var limit = 3;
  var pages = 0;

  Category.count().then(function (count) {

    // 计算总页数
    pages = Math.ceil(count / limit);
    // 取值不大于总页数
    page = Math.min(page, pages);
    // 取值不小于1
    page = Math.max(page, 1)

    var skip = (page - 1) * limit;

    /**
     *  1: 升序排列
     * -1: 降序排列
     */
    Category.find().sort({ _id: -1 }).limit(limit).skip(skip).then(function (categories) {
      res.render('admin/category_index', {
        userInfo: req.userInfo,
        categories: categories,
        pages: pages,
        page: page,
        limit: limit,
        count: count,
      })
    });
  })
});

/**
 * 分类的添加
 */
router.get('/category/add', function (req, res, next) {
  res.render('admin/category_add', {
    userInfo: req.userInfo
  })
});

/**
 * 分类保存
 */
router.post('/category/add', function (req, res) {
  var name = req.body.name || '';
  if (name == '') {
    res.render('admin/error', {
      userInfo: req.userInfo,
      msg: '名称不能为空！'
    })
    return;
  }

  // 数据库中是否已存在同名分类名称
  Category.findOne({
    name: name
  }).then(function (rs) {
    if (rs) {
      // 数据库已存在此分类
      res.render('admin/error', {
        userInfo: res.userInfo,
        msg: '此分类已存在'
      })
      return Promise.reject();
    } else {
      // 数据库中不存在此分类，可以保存
      return new Category({
        name: name
      }).save();
    }
  }).then(function (newCategory) {
    res.render('admin/success', {
      userInfo: req.userInfo,
      msg: '分类保存成功',
      url: '/admin/category'
    })

  })

});

/**
 * 分类修改页面
 */
router.get('/category/edit', function (req, res, next) {
  // 获取要修改的分类信息，并且以表单的形式展现出来
  var id = req.query.id || '';
  // 获取要修改的分类信息
  Category.findOne({
    _id: id
  }).then(function (category) {
    if (!category) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        msg: '分类不存在'
      })
    } else {
      res.render('admin/category_edit', {
        userInfo: req.userInfo,
        category: category
      })
    }
  })
});

/**
 * 分类修改
 */
router.post('/category/edit', function (req, res) {
  var id = req.query.id || '';
  // 获取post提交过来的name
  var name = req.body.name || '';

  // 获取要修改的分类信息
  Category.findOne({
    _id: id
  }).then(function (category) {
    if (!category) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        msg: '分类信息不存在'
      })
      return Pramise.reject();
    } else {
      // 用户提交的分类名字和要修改的分类名字相同
      if (name == category.name) {
        res.render('admin/success', {
          userInfo: req.userInfo,
          msg: '修改成功',
          url: '/admin/category'
        })
        return Pramise.reject();
      } else {
        // 
        return Category.findOne({
          _id: { $ne: id },
          name: name
        })
      }
    }
  }).then(function (sameCategory) {
    if (sameCategory) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        msg: '数据库中已经存在同名分类'
      })
      return Pramise.reject();
    } else {
      // 修改分类
      return Category.update({
        _id: id
      }, {
          name: name
        })
    }
  }).then(function () {
    res.render('admin/success', {
      userInfo: req.userInfo,
      msg: '修改成功',
      url: '/admin/category'
    })
  })
});

/**
 * 分类删除
 */
router.get('/category/delete', function (req, res) {
  // 获取要删除的分类id
  var id = req.query.id || '';
  Category.remove({
    _id: id
  }).then(function () {
    res.render('admin/success', {
      userInfo: req.userInfo,
      msg: '删除成功',
      url: '/admin/category'
    })
  })
});

/**
 * 内容首页
 */
router.get('/content', function (req, res) {
  res.render('admin/content_index', {
    userInfo: req.userInfo
  })
});

/**
 * 内容添加页
 */
router.get('/content/add', function (req, res) {
  Category.find().sort({_id: -1}).then(function (categories) {
    res.render('admin/content_add', {
      userInfo: req.userInfo,
      categories: categories
    })
  })

});

module.exports = router;