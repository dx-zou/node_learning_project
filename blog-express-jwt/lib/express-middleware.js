const http = require('http');

class MyExpress {
  constructor() {
    this.routes = {
      use: [],
      get: [],
      post: []
    }
  }
  register(...args) {
    const res = {}
    if (typeof args[0] === 'string') {
      res.path = args[0];
      res.stack = args.slice(1)
    } else {
      res.path = '/'
      res.stack = args
    }
    return res
  }
  use(...args) {
    const res = this.register.apply(this, args)
    this.routes.use.push(res)
    console.log(this.routes)
  }
  get() {
    const res = this.register.apply(this, args)
    this.routes.get.push(res)
  }
  post() {
    const res = this.register.apply(this, args)
    this.routes.post.push(res)
  }
  callback() { }
  listen(...args) {
    const serve = http.createServer(this.callback)
    serve.listen(...args)
  }
}
const express = new MyExpress()
express.use('/api/getList', (req) => { })
module.exports = () => {
  return new MyExpress()
}