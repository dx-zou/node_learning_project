const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONF);

// 开始连接mysql
connection.connect();

// 创建sql统一执行的方法
function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(err, res => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

module.exports = exec;
