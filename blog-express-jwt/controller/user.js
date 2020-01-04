const { executeSql, escape } = require("../db/mysql");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { genPassword } = require("../utils/crypto");
/**
 * @description 用户登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const userLogin = (req, res, next) => {
  const data = formCheck(req, res);
  if (!data) return;
  const { username, password } = data;
  const sql = `
    select username, realname,id from users where username=${username} and password=${password}
  `;
  const sql1 = `select username from users where username=${username}`;
  executeSql(sql).then(result => {
    if (result.length) {
      res.json(new SuccessModel(result[0]));
      return;
    }
    executeSql(sql1).then(row => {
      if (!row.length) {
        res.json(new ErrorModel("用户名不存在"));
      } else {
        res.json(new ErrorModel("密码错误"));
      }
    });
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
  if (!username || !password) {
    res.json(new ErrorModel("用户名或密码不能为空"));
    return false;
  }
  // 加密密码
  password = genPassword(password);
  // 防xss攻击
  username = escape(username);
  password = escape(password);
  return { username, password };
};

module.exports = { userLogin, userRegister };
