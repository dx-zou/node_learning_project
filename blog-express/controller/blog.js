const { SuccessModel, ErrorModel } = require("../model/resModel");
const { executeSql } = require("../db/mysql");
const xss = require("xss");
// 获取博客列表
const getBlogList = (req, res, next) => {
  const { author, keyword, pageSize = 10, page = 1 } = req.query;
  const pageNo = page - 1;
  let sql = `select * from blogs where 1=1 limit ${pageNo},${pageSize}`;
  let totalSql = `select count(1) as total from blogs where 1=1`;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  // sql += `order by createTime desc;`;
  executeSql(sql).then(result => {
    executeSql(totalSql).then(totalRes => {
      res.json(
        new SuccessModel({
          rows: result,
          total: totalRes[0].total
        })
      );
    });
  });
};
// 获取博客详情
const getBlogDetail = (req, res, next) => {
  const { id } = req.query;
  let sql = `select * from blogs where id = '${id}'`;
  executeSql(sql).then(rows => {
    res.json(new SuccessModel(rows[0]));
  });
};
// 新增博客
const addBlog = (req, res, next) => {
  let { title, content } = req.body;
  title = xss(title);
  content = xss(content);
  const author = req.session.username;
  const createTime = Date.now();
  const sql = `
    insert into blogs (title,content,author,createTime) 
    values('${title}', '${content}', '${author}', '${createTime}');
  `;
  executeSql(sql).then(insertData => {
    res.json(
      new SuccessModel({
        id: insertData.insertId
      })
    );
  });
};
const updateBlog = (req, res, next) => {
  const { title, content, id } = req.body;
  const sql = `update blogs set title='${title}', content='${content}' where id = ${id}`;
  executeSql(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      res.json(new SuccessModel("编辑成功"));
      return;
    }
    res.json(new ErrorModel("编辑失败"));
  });
};
const deleteBlog = (req, res, next) => {
  const { id } = req.body;
  const sql = `DELETE FROM blogs WHERE id=${id}`;
  executeSql(sql).then(delData => {
    if (delData.affectedRows > 0) {
      res.json(new SuccessModel("删除成功"));
      return;
    }
    res.json(new ErrorModel("删除失败"));
  });
};
module.exports = {
  getBlogList,
  getBlogDetail,
  addBlog,
  updateBlog,
  deleteBlog
};
