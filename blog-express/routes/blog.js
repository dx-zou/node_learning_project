const express = require("express");
const router = express.Router();
const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 获取列表
router.get("/list", (req, res, next) => {
  getBlogList(req).then(result => {
    res.json(new SuccessModel(result));
    next();
  });
});

module.exports = router;
