const express = require('express');
const router = express.Router();
const { userLogin, userRegister, testApi } = require('../controller/user');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.post('/test', testApi);

module.exports = router;
