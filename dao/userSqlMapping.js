/**!
 * Created by guochenguang on 2016/11/21.at nsccsz shenzhen
 */

//- MySQL 增删改查 SQL语句

var user = {
    insert:'INSERT INTO cheap_user(id, name, age) VALUES(0,?,?)',
    update:'update cheap_user set name=?, age=? where id=?',
    delete: 'delete from cheap_user where id=?',
    queryById: 'select * from cheap_user where id=?',
    queryAll: 'select * from cheap_user'
};

module.exports = user;