const express = require("express");
const router = express.Router();
const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");

// 获取列表
router.get("/list", getBlogList);

module.exports = router;
