// 环境参数
const ENV = process.env.NODE_ENV;

let MYSQL_CONF;

if (ENV === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "dx&ser703",
    port: "3306",
    database: "myblog"
  };
}
if (ENV === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "dx&ser703",
    port: "3306",
    database: "myblog"
  };
}

module.exports = {
  MYSQL_CONF
};
