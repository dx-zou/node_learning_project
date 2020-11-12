const crypto = require('crypto');
const { PASSWORD_KEY } = require('../config/secret_key');

// md5加密
function md5(content) {
	const domd5 = crypto.createHash('md5');
	return domd5.update(content).digest('hex');
}

// 加密函数
function genPassword(password) {
	const str = `password=${password}&key=${PASSWORD_KEY}`;
	return md5(str);
}

module.exports = {
	genPassword,
};
