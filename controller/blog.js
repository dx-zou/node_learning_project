const { SuccessModel, ErrorModel } = global;
const xss = require('xss');
const models = require('../db/models');
const { Op } = require('sequelize');

/**
 * @description 生成博客列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getBlogList = async (req, res, next) => {
	const { title, pageSize = 10, pageNum = 1 } = req.query;
	console.log(title);
	try {
		const { count, rows } = await models.blogs.findAndCountAll({
			where: {
				isDelete: 0,
				[Op.and]: [
					{
						title: {
							[Op.like]: `%${title}%`,
						},
					},
				],
			},
			offset: (pageNum - 1) * pageSize,
			limit: Number(pageSize),
		});
		res.json(
			new SuccessModel({
				rows,
				total: count,
			})
		);
	} catch (error) {
		res.json(new ErrorModel('查询失败'));
	}
};

/**
 * @description 获取博客详情
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getBlogDetail = async (req, res, next) => {
	const { id } = req.params;
	try {
		const result = await models.blogs.findByPk(id);
		res.json(new SuccessModel(result.dataValues));
	} catch (error) {
		res.json('查询失败');
	}
};
/**
 * @description 新增博客
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addBlog = async (req, res, next) => {
	let { title, content, isTop } = req.body;
	title = xss(title);
	content = xss(content);
	try {
		await models.blogs.create({
			title,
			content,
			isTop,
			author: '匿名',
		});
		res.json(new SuccessModel('新增成功'));
	} catch (error) {
		res.json(new ErrorModel('新增失败'));
	}
};

/**
 * @description 更新博客
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateBlog = async (req, res, next) => {
	let { title, content, id, isTop } = req.body;
	title = xss(title);
	content = xss(content);
	try {
		const result = await models.blogs.update(
			{ title, content, isTop },
			{
				where: {
					id,
				},
			}
		);
		if (result[0] > 0) {
			res.json(new SuccessModel('更新成功'));
		} else {
			res.json(new ErrorModel('更新失败'));
		}
	} catch (error) {
		res.json(new ErrorModel('更新失败'));
	}
};
/**
 * @description 删除博客
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteBlog = async (req, res, next) => {
	const { id } = req.params;
	try {
		const result = await models.blogs.update(
			{ isDelete: 1 },
			{
				where: {
					id,
				},
			}
		);
		if (result[0] > 0) {
			res.json(new SuccessModel('删除成功'));
		} else {
			res.json(new ErrorModel('删除失败'));
		}
	} catch (error) {
		res.json(new ErrorModel('删除失败'));
	}
};
module.exports = {
	getBlogList,
	getBlogDetail,
	addBlog,
	updateBlog,
	deleteBlog,
};
