const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
	// 设置文件存放位置
	destination: (req, file, cb) => {
		const date = new Date();
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate();
		const dir = path.join(__dirname, '../public/uploads-' + year + month + day);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		cb(null, dir);
	},
	// 设置文件名称
	filename: (req, file, cb) => {
		const fileName = Date.now() + path.extname(file.originalname);
		cb(null, fileName);
	},
});

const upload = multer({ storage });

module.exports = upload;
