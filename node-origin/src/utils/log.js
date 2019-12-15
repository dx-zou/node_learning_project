const fs = require("fs");
const path = require("path");

// 生成write stream
const createWriteStream = fileName => {
  const fullFileName = path.join(__dirname, "../", "../", "logs", "access.log");
  const writeStream = fs.createWriteStream(fullFileName, { flags: "a" });
  return writeStream;
};

// 写入访问日志
const accessWriteStream = createWriteStream("access.log");
// 写日志方法
const writeLog = (writeStream, log) => {
  writeStream.write(log + "\n");
};
const access = log => {
  writeLog(accessWriteStream, log);
};

module.exports = {
  access
};
