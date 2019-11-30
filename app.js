const querystring = require("querystring");
const handleBlogRouter = require("./src/routes/blog");
const handleUserRouter = require("./src/routes/user");
const handleServer = (req, res) => {
  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  // 设置返回的数据格式为json
  res.setHeader("Content-type", "application/json");

  // 处理博客路由
  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  // 处理用户路由
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  // 未命中路由，返回404
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("404 Not Found \n");
  res.end();
};

module.exports = handleServer;
