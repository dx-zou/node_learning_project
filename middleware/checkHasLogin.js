const Token = require('../utils/token');

/**
 * 登录验证中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkHasLogin = (req, res, next) => {
	// 白名单不校验token
	const whiteList = ['/api/user/login', '/api/user/register'];
	if (whiteList.includes(req.url)) {
		next();
		return;
	}
	const token = req.headers.authorization;
	new Token().verifyToken(token, req, res, next);
};

module.exports = checkHasLogin;
