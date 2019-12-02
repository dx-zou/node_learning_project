const querystring = require("querystring");
const handleBlogRouter = require("./src/routes/blog");
const handleUserRouter = require("./src/routes/user");

// 处理post请求的data
const getPostData = req => {
  return new Promise((resolve, reject) => {
    // 如果不是post请求
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    // 如果不是json格式
    if (req.headers["content-type"] !== "application/json") {
      console.log(req.headers);
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
};
// 处理请求的入口函数
const handleServer = (req, res) => {
  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  // 设置返回的数据格式为json
  res.setHeader("Content-type", "application/json");
  getPostData(req).then(postData => {
    req.body = postData;
    // 处理博客路由
    const blogResult = handleBlogRouter(req);

    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 处理用户路由
    const userData = handleUserRouter(req);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }

    // 未命中路由，返回404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found \n");
    res.end();
  });
};

module.exports = handleServer;
