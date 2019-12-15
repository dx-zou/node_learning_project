const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const checkIsLogin = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("请先登录"));
  }
};
const handleBlogRouter = req => {
  // 博客列表
  if (req.method === "GET" && req.path === "/api/blog/list") {
    // 先验证登录
    const loginCheckData = checkIsLogin(req);
    if (loginCheckData) {
      // 未登录
      return loginCheckData;
    }
    // 解构出查询参数
    const { author = "", keyword = "" } = req.query;
    return getBlogList(author, keyword).then(res => {
      return new SuccessModel(res);
    });
  }

  // 博客详情
  if (req.method === "GET" && req.path === "/api/blog/detail") {
    // 先验证登录
    const loginCheckData = checkIsLogin(req);
    if (loginCheckData) {
      // 未登录
      return loginCheckData;
    }
    const { id } = req.query;
    return getBlogDetail(id).then(data => {
      return new SuccessModel(data);
    });
  }

  // 博客新增
  if (req.method === "POST" && req.path === "/api/blog/new") {
    // 先验证登录
    const loginCheckData = checkIsLogin(req);
    if (loginCheckData) {
      // 未登录
      return loginCheckData;
    }
    // 新增请求结束后返回的数据
    req.body.author = req.session.username;
    return newBlog(req.body).then(blogData => {
      return new SuccessModel(blogData);
    });
  }

  // 博客编辑
  if (req.method === "POST" && req.path === "/api/blog/update") {
    const loginCheckData = checkIsLogin(req);
    if (loginCheckData) {
      // 未登录
      return loginCheckData;
    }

    return updateBlog(req.body).then(blogData => {
      return new SuccessModel(blogData);
    });
  }

  // 博客删除
  if (req.method === "post" && req.path === "/api/blog/del") {
    const loginCheckData = checkIsLogin(req);
    if (loginCheckData) {
      // 未登录
      return loginCheckData;
    }
    const { id } = req.body;
    const author = req.session.username;
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
