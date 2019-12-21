const express = require("express");
const router = express.Router();
const { loginCheck } = require("../controller/user");

router.post("/login", loginCheck);

module.exports = router;
