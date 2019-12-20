const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./db/redis");
const sessionStore = new RedisStore({
  client: redisClient
});
// 引入博客路由模块
const blogRouter = require("./routes/blog");
// 引入用户路由模块
const userRouter = require("./routes/user");

const app = express();
console.log(process.env.NODE_ENV); // dev
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: `dxFENG_703$`,
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: "/", // 默认
      httpOnly: true, // 默认
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
);
// 注册博客路由
app.use("/api/blog", blogRouter);
// 注册用户路由
app.use("/api/user", userRouter);

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
  res.render("error");
});

module.exports = app;
