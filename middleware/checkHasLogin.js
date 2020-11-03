const jwt = require('jsonwebtoken');
const { JWT_key } = require('../config/secret_key');
const { ErrorModel } = global;
/**
 * 登录验证中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkHasLogin = (req, res, next) => {
	// 白名单不校验token
  const whiteList = ['/login', '/register'];
  if (whiteList.includes(req.url)) {
    next()
    return
  }
  const token = req.headers.authorization
  jwt.verify(token, JWT_key, (err, decoded) => {
    if (err) {
      res.json(new ErrorModel('登录已过期，请重新登录', null, 401));
      return
    } else {
      // 每次请求校验token通过后，重新签发新的token
      const token = jwt.sign({ username: 'developer' }, JWT_key,{ expiresIn: '5m' });
      res.setHeader('Authorization', token);
      console.log(decoded) // bar
      next()
    }
  });
};

module.exports = checkHasLogin;
