const { getBlogList, getBlogDetail, newBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleBlogRouter = req => {
  // 博客列表
  if (req.method === "GET" && req.path === "/api/blog/list") {
    // 解构出查询参数
    const { author = "", keyword = "" } = req.query;
    const list = getBlogList(author, keyword);
    return new SuccessModel(list);
  }

  // 博客详情
  if (req.method === "GET" && req.path === "/api/blog/detail") {
    const { id } = req.query;
    const info = getBlogDetail(id);
    return new SuccessModel(info);
  }

  // 博客新增
  if (req.method === "POST" && req.path === "/api/blog/new") {
    // 新增请求结束后返回的数据
    const newResData = newBlog(req.body);
    return new SuccessModel(newResData);
  }

  // 博客编辑
  if (req.method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "博客修改接口"
    };
  }

  // 博客删除
  if (req.method === "post" && req.path === "/api/blog/del") {
    return {
      msg: "博客删除接口"
    };
  }
};

module.exports = handleBlogRouter;
