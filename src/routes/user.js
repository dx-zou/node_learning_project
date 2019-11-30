const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleUserRouter = req => {
  if (req.method === "POST" && req.path === "/api/user/login") {
    const loginStatus = loginCheck(req.body);

    return loginStatus
      ? new SuccessModel("登录成功")
      : new ErrorModel("用户名或密码错误，登录失败");
  }
};

module.exports = handleUserRouter;
