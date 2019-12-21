const { executeSql } = require("../db/mysql");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginCheck = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json(new ErrorModel("用户名或密码不能为空"));
    return;
  }
  const sql = `
    select username, realname from users where username='${username}' and password='${password}'
  `;
  executeSql(sql).then(result => {
    if (result.username) {
      req.session.username = result.username;
      req.session.realname = result.realname;
      res.json(new SuccessModel(result));
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
};
module.exports = { loginCheck };
