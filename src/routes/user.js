const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleUserRouter = req => {
  if (req.method === "POST" && req.path === "/api/user/login") {
    return loginCheck(req.body).then(res => {
      if (res.username) {
        return new SuccessModel(res);
      }
      return new ErrorModel("用户名或密码错误，登录失败");
    });
  }
};

module.exports = handleUserRouter;
