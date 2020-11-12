const { SuccessModel, ErrorModel } = global;
const { genPassword } = require('../utils/crypto');
const Token = require('../utils/token');
const { users, sequelize } = require('../db/models');
const { Op } = require('sequelize');

/**
 * @description 用户登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const userLogin = async (req, res, next) => {
	// 校验表单信息，加密密码，防xss
	const data = checkInputForm(req, res);
	if (!data) return;
	const { userName, password } = data;
	const hasOne = await checkUnique(userName);
	if (hasOne) {
		// 用户名存在，校验密码
		const result = await users.findOne({
			where: {
				userName,
				password,
			},
		});
		if (result) {
			// 设置token
			new Token().generateToken({ userId: result.dataValues.id }, res);
			res.json(new SuccessModel('登录成功'));
			return;
		}
		res.json(new ErrorModel('密码错误'));
		return;
	}
	res.json(new ErrorModel('用户名不存在'));
};

/**
 * @description 用户注册
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const userRegister = async (req, res, next) => {
	// const sql = `insert into users (userName,password) values(${userName}, ${password})`;
	const data = checkInputForm(req, res);
	if (!data) return;
	const { userName, realName, password } = data;
	// 用户名是否存在
	const hasOne = await checkUnique(userName);
	if (hasOne) {
		res.json(new ErrorModel('用户名已存在'));
		return;
	}
	const user = await users.create({
		userName,
		realName,
		password: genPassword(password),
	});
	res.json(
		new SuccessModel({
			user,
		})
	);
};

/**
 * @description 表单字段验证
 * @param {*} req
 * @param {*} res
 * @returns
 */
const checkInputForm = (req, res) => {
	let { userName, password } = req.body;
	if (!userName || !password) {
		res.json(new ErrorModel('用户名或密码不能为空'));
		return false;
	}
	// 加密密码
	const pass = genPassword(password);
	// // 防xss攻击
	// userName = escape(userName);
	// password = escape(password);
	return { userName, password: pass };
};

/**
 * @description 查询用户名是否存在
 * @param {*} req
 * @param {*} res
 * @returns promise<pending>
 */
const checkUnique = async userName => {
	return await users.findOne({
		where: {
			userName,
		},
	});
};
module.exports = {
	userLogin,
	userRegister,
};
