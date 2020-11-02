const { SuccessModel, ErrorModel } = global;
const { genPassword } = require('../utils/crypto');
const jwt = require('jsonwebtoken');
const { JWT_key } = require('../config/secret_key');
const models = require('../db/models');

const testApi = async (req, res, next) => {
	res.json(new SuccessModel('token校验成功，允许访问'));
};
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
	const { username, password } = data;
	const hasOne = await checkUnique(username);
	if (hasOne) {
		// 用户名存在，校验密码
		const result = await models.users.findOne({
			where: {
				username,
				password,
			},
		});
		if (result) {
			const token = jwt.sign({ userId: result.dataValues.id }, JWT_key,{ expiresIn: '5m' });
			res.setHeader('Authorization', token);
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
	// const sql = `insert into users (username,password) values(${username}, ${password})`;
	const data = checkInputForm(req, res);
	if (!data) return;
	const { username, realName, password } = data;
	// 用户名是否存在
	const hasOne = await checkUnique(username);
	if (hasOne) {
		res.json(new ErrorModel('用户名已存在'));
		return;
	}
	const user = await models.users.create({
		username,
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
	let { username, password } = req.body;
	if (!username || !password) {
		res.json(new ErrorModel('用户名或密码不能为空'));
		return false;
	}
	// 加密密码
	const pass = genPassword(password);
	// // 防xss攻击
	// username = escape(username);
	// password = escape(password);
	return { username, password: pass };
};

/**
 * @description 查询用户名是否存在
 * @param {*} req
 * @param {*} res
 * @returns promise<pending>
 */
const checkUnique = async username => {
	return await models.users.findOne({
		where: {
			username,
		},
	});
};
module.exports = { userLogin, userRegister, testApi };
