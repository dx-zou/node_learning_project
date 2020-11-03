const express = require("express");
const router = express.Router();
const {
  getBlogList,
  getBlogDetail,
  addBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");

// 获取列表
router.get("/list", getBlogList);
router.post("/add-blog", addBlog);
router.get("/blog-detail/:id", getBlogDetail);
router.patch("/update-blog", updateBlog);
router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
