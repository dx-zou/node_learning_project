const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { setRedis } = require("../db/redis");
const handleUserRouter = req => {
  if (req.method === "GET" && req.path === "/api/user/login") {
    return loginCheck(req.query).then(res => {
      if (res.username) {
        // 设置 session
        req.session.username = res.username;
        req.session.realname = res.realname;
        // 同步到 redis
        setRedis(req.sessionId, req.session);
        return new SuccessModel(res);
      }
      return new ErrorModel("用户名或密码错误，登录失败");
    });
  }
  // if (method === "GET" && req.path === "/api/user/login-test") {
  //   if (req.session.username) {
  //     return Promise.resolve(
  //       new SuccessModel({
  //         session: req.session
  //       })
  //     );
  //   }
  //   return Promise.resolve(new ErrorModel("尚未登录"));
  // }
};

module.exports = handleUserRouter;
