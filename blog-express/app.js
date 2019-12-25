const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./db/redis");
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
app.use((request, response, next) => {
  let { origin } = request.headers;
  if (allowOrigin.includes(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Credentials", true);
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
    );
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, HEAD, DELETE, OPTIONS"
    );
    // response.setHeader("X-Powered-By", "3.2.1");
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("FENG_123456$"));
// 托管静态文件
// app.use(express.static(path.join(__dirname, "public")));
const sessionStore = new RedisStore({
  client: redisClient
});
app.use(
  session({
    secret: `FENG_123456$`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: "/", // 默认
      httpOnly: true, // 默认
      maxAge: 60 * 60 * 1000
    },
    store: sessionStore
  })
);

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
