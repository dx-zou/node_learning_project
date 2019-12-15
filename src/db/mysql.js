const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

// 创建连接对象
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dx&ser703",
  port: "3306",
  database: "my_blog"
});

// 开始连接mysql
connection.connect();

// 创建sql统一执行的方法
function execSql(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

module.exports = { execSql };
