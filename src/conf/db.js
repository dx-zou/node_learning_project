// 环境参数
const ENV = process.env.NODE_ENV;

let MYSQL_CONF;

if (ENV === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "my_blog"
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
}

module.exports = {
  MYSQL_CONF
};
