const { SuccessModel, ErrorModel } = global;
const upload = (req, res, next) => {
	const filePath = req.file.path.split('public')[1];
	const fileUrl = `http:127.0.0.1:3000${filePath}`;
	res.json(new SuccessModel(fileUrl));
};

module.exports = {
	upload,
};
