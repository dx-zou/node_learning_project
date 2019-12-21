const express = require("express");
const router = express.Router();
// 登录检测中间件
const checkHasLogin = require("../middleware/checkHasLogin");

const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");

// 获取列表
router.get("/list", checkHasLogin, getBlogList);

module.exports = router;
