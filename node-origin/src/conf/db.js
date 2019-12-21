// 环境参数
const ENV = process.env.NODE_ENV;

let MYSQL_CONF, REDIS_CONF;

if (ENV === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "dx&ser703",
    port: "3306",
    database: "my_blog"
  };

  REDIS_CONF = {
    host: "127.0.0.1",
    port: "6379"
  };
}
if (ENV === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "my_blog"
  };
  REDIS_CONF = {
    host: "127.0.0.1",
    port: "6379"
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};