const { ErrorModel } = require("../model/resModel");

module.exports = (req, res, next) => {
  if (req.session.sessionId) {
    next();
    return;
  }
  res.json(new ErrorModel("请登录系统"));
};
