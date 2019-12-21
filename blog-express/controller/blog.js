const { SuccessModel, ErrorModel } = require("../model/resModel");
const { executeSql } = require("../db/mysql");
// 获取博客列表
const getBlogList = (req, res, next) => {
  console.log("session:", req.session);
  const { author, keyword } = req.query;
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  // sql += `order by createTime desc;`;
  return executeSql(sql).then(result => {
    res.json(new SuccessModel(result));
  });
};
// 获取博客详情
const getBlogDetail = id => {
  let sql = `select * from blogs where id = '${id}'`;
  return executeSql(sql).then(rows => {
    return rows[0];
  });
};
// 新增博客
const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData;
  const createTime = Date.now();
  const sql = `
    insert into blogs (title,content,author,createTime) 
    values('${title}', '${content}', '${author}', '${createTime}');
  `;
  return executeSql(sql).then(insertData => {
    return {
      id: insertData.insertId
    };
  });
};
const updateBlog = (blogData = {}) => {
  const { title, content, id } = blogData;
  const sql = `update blogs set title='${title}', content='${content}' where id = ${id}`;
  return executeSql(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
const deleteBlog = (id, author) => {
  const sql = `DELETE FROM blogs WHERE id=${id};`;
  return executeSql(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
};
