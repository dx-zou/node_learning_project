const { ErrorModel } = require("../model/resModel");
/**
 * 登录验证中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkHasLogin = (req, res, next) => {
  if (req.session.sessionId) {
    next();
    return;
  }
  res.json(new ErrorModel("请登录系统"));
};

module.exports = checkHasLogin;
