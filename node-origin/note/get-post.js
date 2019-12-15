const http = require("http");
const querystring = require("querystring");
const server = http.createServer((req, res) => {
  console.log(req.method);
  const url = req.url;
  if (req.method === "GET") {
    // 处理get请求
    req.query = querystring.parse(url.split("?")[1]);
    res.end(JSON.stringify(req.query));
  } else if (req.method === "POST") {
    // 处理post请求
    console.log(req.headers);
    let postData = "";
    // 监听数据流
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      res.end(postData);
    });
  }
});

server.listen(3000, () => {
  console.log("server is listening port 3000");
});
