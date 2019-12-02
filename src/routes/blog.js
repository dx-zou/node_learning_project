const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleBlogRouter = req => {
  // 博客列表
  if (req.method === "GET" && req.path === "/api/blog/list") {
    // 解构出查询参数
    const { author = "", keyword = "" } = req.query;
    return getBlogList(author, keyword).then(res => {
      return new SuccessModel(res);
    });
  }

  // 博客详情
  if (req.method === "GET" && req.path === "/api/blog/detail") {
    const { id } = req.query;
    return getBlogDetail(id).then(data => {
      return new SuccessModel(data);
    });
  }

  // 博客新增
  if (req.method === "POST" && req.path === "/api/blog/new") {
    // 新增请求结束后返回的数据
    req.body.author = "feeng";
    return newBlog(req.body).then(blogData => {
      return new SuccessModel(blogData);
    });
  }

  // 博客编辑
  if (req.method === "POST" && req.path === "/api/blog/update") {
    return updateBlog(req.body).then(blogData => {
      return new SuccessModel(blogData);
    });
  }

  // 博客删除
  if (req.method === "post" && req.path === "/api/blog/del") {
    const { id, author } = req.body;
    console.log(req.body);
    return deleteBlog(id, author).then(blogData => {
      if (blogData) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除失败");
      }
    });
  }
};

module.exports = handleBlogRouter;
