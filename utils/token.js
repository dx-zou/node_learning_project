const jwt = require('jsonwebtoken');
const { JWT_key } = require('../config/secret_key');
const { ErrorModel } = global;
const path = require('path');
const fs = require('fs');

// openssl 生成私钥公钥
//  openssl genrsa -out rsa_private_key.pem 1024
//  openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
/**
 * token类
 */
class Token {
	constructor() {}
	// 生成token
	generateToken(data, res) {
		const cert = fs.readFileSync(
			path.join(__dirname, '../config/rsa_private_key.pem')
		);
		const token = jwt.sign(data, cert, {
			expiresIn: '100m',
			algorithm: 'RS256',
		});
		res.setHeader('Authorization', token);
		return token;
	}
	// 校验token
	verifyToken(token, req, res, next) {
		const cert = fs.readFileSync(
			path.join(__dirname, '../config/rsa_public_key.pem')
		);
		jwt.verify(token, cert, { algorithms: ['RS256'] }, (err, decoded) => {
			if (err) {
				res.json(new ErrorModel('登录已过期，请重新登录', null, 401));
				return;
			} else {
				// 每次请求校验token通过后，重新签发新的token
				this.generateToken({ username: 'developer' }, res);
				next();
			}
		});
	}
}
/**
 * 设置token
 * @param {*} payload
 * @param {*} res
 */
const setToken = (payload, res) => {
	const cert = fs.readFileSync(
		path.join(__dirname, '../config/rsa_private_key.pem')
	);
	const token = jwt.sign(payload, cert, {
		expiresIn: '1d',
		algorithm: 'RS256',
	});
	res.setHeader('Authorization', token);
};

/**
 * 校验token有效性
 * @param {*} token
 * @param {*} res
 */
const verifyToken = (token, req, res, next) => {
	const cert = fs.readFileSync(
		path.join(__dirname, '../config/rsa_public_key.pem')
	);
	jwt.verify(token, cert, { algorithms: ['RS256'] }, (err, decoded) => {
		if (err) {
			console.log(err);
			res.json(new ErrorModel('登录已过期，请重新登录', null, 401));
			return;
		} else {
			// 每次请求校验token通过后，重新签发新的token
			setToken({ username: 'developer' }, res);
			next();
		}
	});
};
// module.exports = {
// 	setToken,
// 	verifyToken,
// };

module.exports = Token;
