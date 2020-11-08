const { SuccessModel, ErrorModel } = global;
const env = process.env.NODE_ENV;
const BASE_URL =
	env === 'development' ? 'http://127.0.0.1:3000' : 'http://47.95.1.121:3000';
/**
 * 文件上传
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const upload = (req, res, next) => {
	const filePath = req.file.path.split('staticfile')[1];
	const fileUrl = `${BASE_URL}${filePath}`;
	res.json(new SuccessModel(fileUrl));
};

module.exports = {
	upload,
};
