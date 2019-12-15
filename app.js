const querystring = require("querystring");
const handleBlogRouter = require("./src/routes/blog");
const handleUserRouter = require("./src/routes/user");
const { getRedis, setRedis } = require("./src/db/redis");
const { access } = require("./src/utils/log");
// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log("d.toGMTString() is ", d.toGMTString());
  return d.toGMTString();
};
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
  access(
    `${req.method}  --- ${req.url} -- ${
      req.headers["user-agent"]
    } -- ${Date.now()} `
  );
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";

  cookieStr.split(";").forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0];
    const value = arr[1];
    req.cookie[key] = value;
  });

  // 解析session ，使用redis
  let needSetCookie = false;
  let userId = req.cookie.userId;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    setRedis(userId, {});
  }
  req.sessionId = userId;
  getRedis(req.sessionId)
    .then(sessionData => {
      if (sessionData == null) {
        // 初始化 redis 中的 session 值
        setRedis(req.sessionId, {});
        // 设置 session
        req.session = {};
      } else {
        // 设置 session
        req.session = sessionData;
      }
      // 处理 post data
      return getPostData(req);
    })
    .then(postData => {
      req.body = postData;
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }

          res.end(JSON.stringify(blogData));
        });
        return;
      }
      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }

          res.end(JSON.stringify(userData));
        });
        return;
      }

      // 未命中路由，返回 404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 Not Found\n");
      res.end();
    });
  // 设置返回的数据格式为json
  res.setHeader("Content-type", "application/json");
};

module.exports = handleServer;
