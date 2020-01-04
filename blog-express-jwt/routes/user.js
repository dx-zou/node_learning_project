const express = require("express");
const router = express.Router();
const { loginCheck, userRegister } = require("../controller/user");

router.post("/login", loginCheck);
router.post("/register", userRegister);

module.exports = router;
