const { SuccessModel, ErrorModel } = global;
const { users, sequelize } = require('../db/models');
const { Op } = require('sequelize');
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const sequelize_test = async (req, res, next) => {
	const { pageNum = 1, pageSize = 2 } = req.query;
	// TODO 原生查询
	const [results, metadata] = await sequelize.query('select * from users');
	// console.log(metadata);
	res.json(
		new SuccessModel({
			rows: results,
		})
	);
	// TODO 查找全部
	// const result = await users.findAll({
	// 	attributes: ['id', 'userName', 'realName'],
	// 	offset: pageNum,
	// 	limit: pageSize,
	// 	// where: {
	// 	// 	id: [1],
	// 	// },
	// 	order: [['id', 'DESC']],
	// 	// order: sequelize.col('id'),
	// 	// group: sequelize.col('userName'),
	// });
	// TODO 按主键查找一个
	// const result = await users.findByPk(2);
	// TODO 查找总条数
	// const count = await users.count();
	// TODO 分页并查找总数
	// try {
	// 	const result = await users.findAndCountAll({
	// 		attributes: ['id', 'userName', 'realName', 'fullName'],
	// 		offset: Number(pageNum) - 1,
	// 		limit: Number(pageSize),
	// 		// where: {
	// 		// 	realName: {
	// 		// 		[Op.like]: '李%',
	// 		// 	},
	// 		// },
	// 		// order: [['id', 'DESC']],
	// 		// order: sequelize.col('id'),
	// 		// group: sequelize.col('userName'),
	// 	});
	// 	const { rows, count } = result;
	// 	res.json(
	// 		new SuccessModel({
	// 			rows,
	// 			total: count,
	// 		})
	// 	);
	// } catch (error) {
	// 	res.json(new ErrorModel('参数异常'));
	// }
	// const u = await users.update(
	// 	{
	// 		realName: '二娃 Li',
	// 	},
	// 	{
	// 		where: {
	// 			id: 3,
	// 		},
	// 	}
	// );
	// TODO 删除一个
	// try {
	// 	const d = await users.destroy({
	// 		where: {
	// 			userName: 'john',
	// 		},
	// 	});
	// 	console.log(d);
	// 	if (d) {
	// 		res.json(new SuccessModel('success'));
	// 	} else {
	// 		res.json(new ErrorModel('failed'));
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// }
	// TODO 批量创建
	// try {
	// 	const c = await users.bulkCreate([
	// 		{ userName: '小草', realName: '李二妮', password: genPassword('123') },
	// 		{ userName: '萝莉', realName: '王二单', password: genPassword('123') },
	// 	]);
	// 	console.log(c.length);
	// 	res.json(new SuccessModel('well done'));
	// } catch (error) {
	// 	res.json(new ErrorModel('filed'));
	// }
};

module.exports = {
	sequelize_test,
};
