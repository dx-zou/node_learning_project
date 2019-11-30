// 基本数据模型
// 要求第一个参数对象类型，第二个参数字符串类型
class BaseModel {
  constructor(data, message) {
    if (typeof data === "string") {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

// 请求成功的数据模型
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.code = 1;
  }
}

// 请求失败的数据模型
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.code = 0;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};
