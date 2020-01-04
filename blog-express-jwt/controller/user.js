const { executeSql, escape } = require("../db/mysql");
const { SuccessModel, ErrorModel } = require("../model/resModel");

/**
 * @description 登录接口
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const loginCheck = (req, res, next) => {
  const data = formCheck(req, res);
  if (!data) return;
  const { username, password } = data;
  const sql = `
    select username, realname,id from users where username=${username} and password=${password}
  `;
  executeSql(sql).then(result => {
    if (result.length) {
      res.json(new SuccessModel(result[0]));
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
};

/**
 * @description 用户注册
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const userRegister = (req, res, next) => {
  const data = formCheck(req, res);
  if (!data) return;
  const { username, password } = data;
  const sql = `insert into users (username,password) values(${username}, ${password})`;
  executeSql(sql).then(insertRes => {
    res.json(
      new SuccessModel({
        id: insertRes.insertId
      })
    );
  });
};

/**
 * @description 表单字段验证
 * @param {*} req
 * @param {*} res
 * @returns
 */
const formCheck = (req, res) => {
  let { username, password } = req.body;
  username = escape(username);
  password = escape(password);
  if (!username || !password) {
    res.json(new ErrorModel("用户名或密码不能为空"));
    return false;
  }
  return { username, password };
};

module.exports = { loginCheck, userRegister };
