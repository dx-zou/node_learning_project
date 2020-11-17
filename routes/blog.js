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
router.get('/query', getBlogList);
router.post('/query', addBlog);
router.get('/query/:id', getBlogDetail);
router.patch('/query', updateBlog);
router.delete('/query/:id', deleteBlog);

module.exports = router;
