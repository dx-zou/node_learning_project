const loginCheck = loginData => {
  const { username = "", password = "" } = loginData;
  if (username === "feng" && password === "123") {
    return true;
  } else {
    return false;
  }
};

module.exports = { loginCheck };
