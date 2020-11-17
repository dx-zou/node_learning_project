const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
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
const whitelist = ['http://127.0.0.1:8080', 'http://127.0.0.1:8081'];
const corsOptions = {
	origin(origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	allowedHeaders:
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
	exposedHeaders: 'Authorization',
	methods: 'GET, POST, PUT, PATCH, HEAD, DELETE',
	preflightContinue: false,
	credentials: false,
	optionsSuccessStatus: 204,
};
// app.use(cors(corsOptions));

// 处理json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 托管静态文件
app.use(express.static(path.join(__dirname, '../staticfile')));
// 登录状态校验
app.use(checkHasLogin);
// 注册公共模块
app.use(commonRouter);
// 注册博客路由
app.use('/api/blog', blogRouter);
// 注册用户路由
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
	res.json({
		status: 404,
		message: 'API Not Found',
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
