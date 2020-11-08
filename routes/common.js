const express = require('express');
const router = express.Router();
const ImageUpload = require('../utils/upload');
const { upload } = require('../controller/common');
router.post('/api/upload', ImageUpload.single('file'), upload);

module.exports = router;
