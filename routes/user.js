const express = require('express');
const router = express.Router();
const { userLogin, userRegister } = require('../controller/user');

const { sequelize_test } = require('../controller/test');
router.get('/test', sequelize_test);
router.post('/login', userLogin);
router.post('/register', userRegister);

module.exports = router;
