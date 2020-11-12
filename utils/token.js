const jwt = require('jsonwebtoken');
const { JWT_key } = require('../config/secret_key');
const { ErrorModel } = global;

/**
 * 设置token
 * @param {*} payload
 * @param {*} res
 */
const setToken = (payload, res) => {
	const token = jwt.sign(payload, JWT_key, {
		expiresIn: '1d',
	});
	res.setHeader('Authorization', token);
};

/**
 * 校验token有效性
 * @param {*} token
 * @param {*} res
 */
const verifyToken = (token, req, res, next) => {
	jwt.verify(token, JWT_key, (err, decoded) => {
		if (err) {
			res.json(new ErrorModel('登录已过期，请重新登录', null, 401));
			return;
		} else {
			// 每次请求校验token通过后，重新签发新的token
			setToken({ username: 'developer' }, res);
			next();
		}
	});
};
module.exports = {
	setToken,
	verifyToken,
};
