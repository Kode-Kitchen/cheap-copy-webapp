/**!
 * Created by guochenguang on 2016/11/21.at nsccsz shenzhen
 */

// 实现与MySQL的交互

var mysql = require('mysql');
var $conf = require('../conf/conf');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升链接性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向客户端返回JSON的简单封装
var jsonWrite = function(res, ret) {
    if( typeof res === 'undefined' ) {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection){

            if(err){
                console.log(err);
                return;
            }

            // 获取http请求的参数
            var param = req.query || req.params;

            console.log('param====='+param.name);

            // 建立数据库连接，向表中插入值
            // INSERT INTO user(id, name, age) VALUE(0,?,?)
            connection.query($sql.insert, [param.name, param.age], function(err, result){
                if(result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    }
                }

                // 以json形式，把操作结果返回给客户端
                jsonWrite(res, result);

                connection.release();
            });
        });
    },

    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, request) {
                if(request.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    }
                } else {
                    result = null;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    update: function(req, res, next) {
        var param = req.body;
        if( param.name == null || param.age == null || param.id == null ) {
            jsonWrite(res, undefined);
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                if( result.affectedRows > 0 ) {
                    res.render('suc', {
                        result: result
                    });
                } else {
                    res.render('fail', {
                        result: result
                    });
                }

                connection.release();
            });
        });
    },

    queryById: function(req, res, next) {
        var id = +req.query.id;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                if(result.length == 0){
                    result = {
                        code: 201,
                        msg:'没有查询到数据',
                        result: []
                    };
                } else {
                    result = {
                        code: 200,
                        msg:'查询成功',
                        result: result
                    };
                }

                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                result = {
                    code: 200,
                    msg:'查询成功',
                    result: result
                };
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
};