const handleBlogRouter = (req, res) => {
  if (req.method === "GET" && req.path === "/api/blog/list") {
    return {
      msg: "博客列表接口"
    };
  }
  if (req.method === "GET" && req.path === "/api/blog/detail") {
    return {
      msg: "博客详情接口"
    };
  }
  if (req.method === "POST" && req.path === "/api/blog/new") {
    return {
      msg: "博客新增接口"
    };
  }
  if (req.method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "博客修改接口"
    };
  }
  if (req.method === "post" && req.path === "/api/blog/del") {
    return {
      msg: "博客删除接口"
    };
  }
};

module.exports = handleBlogRouter;
