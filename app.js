const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// 结果模型
require('./utils/responseModel');
// 登录检测中间件
const checkHasLogin = require('./middleware/checkHasLogin');
// 公共方法模块
const commonRouter = require('./routes/common');
// 博客模块
const blogRouter = require('./routes/blog');
// 用户模块
const userRouter = require('./routes/user');
// 写入日志
const logger = require('morgan');
const ENV = process.env.NODE_ENV;
if (ENV === 'production') {
	app.use(logger('development'));
} else {
	const logFileName = path.join(__dirname, 'logs', 'access.log');
	const writeStream = fs.createWriteStream(logFileName, { flags: 'a' });
	app.use(
		logger('combined', {
			stream: writeStream,
		})
	);
}
// 处理跨域请求
const allowOrigin = ['http://127.0.0.1:8080', 'http://127.0.0.1:8081'];
app.use((req, res, next) => {
	let { origin } = req.headers;
	if (allowOrigin.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.setHeader('Access-Control-Allow-Credentials', true);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
		);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, PATCH, HEAD, DELETE, OPTIONS'
		);
		res.setHeader('X-Powered-By', 'express');
		// res.setHeader("Cache-Control", "max-age=10000");
		res.setHeader('Pragma', 'no-cache');
	}
	next();
});

// 处理json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 托管静态文件
app.use(express.static(path.join(__dirname, 'public')));
// 登录状态校验
app.use(checkHasLogin);
// 注册公共模块
app.use(commonRouter);
// 注册博客路由
app.use('/api/blog', blogRouter);
// 注册用户路由
app.use(userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
	res.json({
		status: 404,
		message: 'api not found',
	});
});
// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	// res.render("error");
});

module.exports = app;
