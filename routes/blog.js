const express = require('express');
const router = express.Router();
const {
	getBlogList,
	getBlogDetail,
	addBlog,
	updateBlog,
	deleteBlog,
} = require('../controller/blog');

// 获取列表
router.get('/list', getBlogList);
router.post('/add', addBlog);
router.get('/detail/:id', getBlogDetail);
router.patch('/update', updateBlog);
router.delete('/delete/:id', deleteBlog);

module.exports = router;
