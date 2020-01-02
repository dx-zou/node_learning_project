const express = require("express");
const router = express.Router();
// 登录检测中间件
const checkHasLogin = require("../middleware/checkHasLogin");

const {
  getBlogList,
  getBlogDetail,
  addBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");

// 获取列表
router.get("/list", checkHasLogin, getBlogList);
router.post("/add-blog", checkHasLogin, addBlog);
router.get("/blog-detail/:id", checkHasLogin, getBlogDetail);
router.patch("/update-blog", checkHasLogin, updateBlog);
router.delete("/delete-blog/:id", checkHasLogin, deleteBlog);

module.exports = router;
