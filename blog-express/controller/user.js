const { executeSql, escape } = require("../db/mysql");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginCheck = (req, res, next) => {
  let { username, password } = req.body;
  username = escape(username);
  password = escape(password);
  if (!username || !password) {
    res.json(new ErrorModel("用户名或密码不能为空"));
    return;
  }
  const sql = `
    select username, realname,id from users where username=${username} and password=${password}
  `;
  executeSql(sql).then(result => {
    if (result.length) {
      req.session.username = result[0].username;
      req.session.sessionId = result[0].id;
      res.json(new SuccessModel(result[0]));
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
};
module.exports = { loginCheck };
