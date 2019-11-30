const http = require("http");
const querystring = require("querystring");
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];
  const query = querystring.parse(url.split("?")[1]);
  // 设置返回的数据格式为json
  res.setHeader("Content-type", "application/json");
  const resData = {
    method,
    url,
    path,
    query
  };
  if (method === "GET") {
    res.end(JSON.stringify(resData));
  } else if (method === "POST") {
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", chunk => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    });
  }
});

server.listen(3000, () => {
  console.log("server is listening port 3000");
});
