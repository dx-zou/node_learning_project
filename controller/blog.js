const { SuccessModel, ErrorModel } = global;
const { mysql_query } = require('../db/mysql');
const xss = require('xss');
const models = require('../db/models');

/**
 * @description 生成博客列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getBlogList = async (req, res, next) => {
	const { author, keyword, pageSize = 10, pageNum = 1 } = req.query;
	// const pageStart = (pageNum - 1) * pageSize;
	// let sql = `select * from blogs where isDelete=0 order by id limit ${pageStart},${pageSize}`;
	// let totalSql = `select count(1) as total from blogs where isDelete=0`;
	// if (author) {
	// 	sql += `and author='${author}' `;
	// }
	// if (keyword) {
	// 	sql += `and title like '%${keyword}%' `;
	// }
	// const result = await mysql_query(sql);
	// const totalRes = await mysql_query(totalSql);
	const { count, rows } = await models.blogs.findAndCountAll({
		order: [['id']],
		// offset: pageNum,
		// limit: pageSize,
	});
	res.json(
		new SuccessModel({
			rows,
			total: count,
		})
	);
};

/**
 * @description 获取博客详情
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getBlogDetail = (req, res, next) => {
	const { id } = req.params;
	let sql = `select * from blogs where id = '${id}'`;
	mysql_query(sql).then(rows => {
		res.json(new SuccessModel(rows[0]));
	});
};
/**
 * @description 新增博客
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const addBlog = (req, res, next) => {
	let { title, content, isTop } = req.body;
	title = xss(title);
	content = xss(content);
	const author = req.session.username;
	const createTime = Date.now();
	const sql = `
    insert into blogs (title,content,author,createTime,isTop)
    values('${title}', '${content}', '${author}', '${createTime}', '${isTop}');
  `;
	mysql_query(sql).then(insertData => {
		res.json(
			new SuccessModel({
				id: insertData.insertId,
			})
		);
	});
};

/**
 * @description 更新博客
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateBlog = (req, res, next) => {
	const { title, content, id, isTop } = req.body;
	const sql = `update blogs set title='${title}', content='${content}', isTop='${isTop}' where id = ${id}`;
	mysql_query(sql).then(updateData => {
		if (updateData.affectedRows > 0) {
			res.json(new SuccessModel('编辑成功'));
			return;
		}
		res.json(new ErrorModel('编辑失败'));
	});
};
/**
 * @description 删除博客
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteBlog = (req, res, next) => {
	const { id } = req.params;
	// const sql = `DELETE FROM blogs WHERE id=${id}`;
	const sql = `update blogs set isDelete=1 WHERE id=${id}`;
	mysql_query(sql).then(delData => {
		if (delData.affectedRows > 0) {
			res.json(new SuccessModel('删除成功'));
			return;
		}
		res.json(new ErrorModel('删除失败'));
	});
};
module.exports = {
	getBlogList,
	getBlogDetail,
	addBlog,
	updateBlog,
	deleteBlog,
};
