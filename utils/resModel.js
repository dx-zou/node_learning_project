// 基本数据模型
// 要求第一个参数对象类型，第二个参数字符串类型
class BaseModel {
	constructor(data, msg, code) {
		this.code = code;
		if (typeof data === 'string') {
			this.msg = data;
			data = null;
			msg = null;
		}
		if (data) {
			this.data = data;
		}
		if (msg) {
			this.msg = msg;
		}
	}
}

// 请求成功的数据模型
class SuccessModel extends BaseModel {
	constructor(data, msg) {
		super(data, msg, 200);
	}
}

// 请求失败的数据模型
class ErrorModel extends BaseModel {
	constructor(data, msg, code = 400) {
		super(data, msg, code);
	}
}
global.SuccessModel = SuccessModel
global.ErrorModel = ErrorModel
module.exports = {
	SuccessModel,
	ErrorModel,
};
