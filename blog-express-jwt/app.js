const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const logger = require("morgan");
// 引入博客路由模块
const blogRouter = require("./routes/blog");
// 引入用户路由模块
const userRouter = require("./routes/user");
// 写入日志
const ENV = process.env.NODE_ENV;
if (ENV === "production") {
  app.use(logger("dev"));
} else {
  const logFileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, { flags: "a" });
  app.use(
    logger("combined", {
      stream: writeStream
    })
  );
}
// 处理跨域请求
let allowOrigin = ["http://127.0.0.1:8080", "http://127.0.0.1:8081"];
app.use((req, res, next) => {
  let { origin } = req.headers;
  if (allowOrigin.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, HEAD, DELETE, OPTIONS"
    );
    // res.setHeader("X-Powered-By", "3.2.1");
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 托管静态文件
app.use(express.static(path.join(__dirname, "public")));
// 注册博客路由
app.use("/pc_blog/blog", blogRouter);
// 注册用户路由
app.use("/pc_blog/user", userRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
