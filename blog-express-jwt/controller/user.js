const { executeSql, escape } = require("../db/mysql");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { genPassword } = require("../utils/crypto");
const jwt = require("jsonwebtoken");
const { JWT_key } = require("../conf/secret_key");
/**
 * @description 用户登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const userLogin = async (req, res, next) => {
  // 校验表单信息，加密密码，防xss
  const data = formCheck(req, res);
  if (!data) return;
  const { username, password } = data;
  // 用户名是否存在
  const hasOne = await findOne(username);
  if (hasOne) {
    const sql = `
      select username, realname,id from users where username=${username} and password=${password}
    `;
    executeSql(sql).then(result => {
      if (result.length) {
        const token = jwt.sign({ userId: result[0].id }, JWT_key);
        res.setHeader("Authorization", token, { expiresIn: 5 * 60 });
        res.json(new SuccessModel(result[0]));
        return;
      }
      res.json(new ErrorModel("密码错误"));
    });
  } else {
    res.json(new ErrorModel("用户名不存在"));
  }
};

/**
 * @description 用户注册
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const userRegister = async (req, res, next) => {
  const data = formCheck(req, res);
  if (!data) return;
  const { username, password } = data;
  // 用户名是否存在
  const hasOne = await findOne(username);
  if (hasOne) {
    res.json(new ErrorModel("用户名已存在"));
    return;
  }
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

/**
 * @description 查询用户名唯一性
 * @param {*} req
 * @param {*} res
 * @returns promise<pending>
 */
const findOne = username => {
  const sql = `select username from users where username=${username}`;
  return executeSql(sql).then(row => !!row.length);
};
module.exports = { userLogin, userRegister };
