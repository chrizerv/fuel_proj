const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');

router.post('/auth/token', UsersController.loginAndGetUserToken);

module.exports = router;