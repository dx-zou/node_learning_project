const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
// const stream = fs.createWriteStream(path.join(__dirname, './test.txt'))
// for (let i = 0; i < 100000; i++) {
//   stream.write(`这是第${i}行内容\n`);
// }

// stream.end()

app.use('/', (req, res, next) => {
  const stream = fs.createReadStream(path.join(__dirname, './test.txt'))
  stream.pipe(res)
  res.send({
    data: res
  })
})
app.listen(3000)

// process.stdin.on('data', function (chunk) {
//   console.log('stream by stdin', chunk.toString())
// })