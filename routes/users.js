var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 新增用户
router.get('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
  userDao.queryAll(req, res, next);
});

router.get('/queryById', function(req, res, next) {
  userDao.queryById(req, res, next);
});

module.exports = router;
