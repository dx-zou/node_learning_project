const express = require("express");
const router = express.Router();
const { loginCheck } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.post("/login", (req, res, next) => {
  return loginCheck(req.body).then(result => {
    if (result.username) {
      req.session.username = result.username;
      req.session.realname = result.realname;
      res.json(new SuccessModel(result));
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
});

module.exports = router;
