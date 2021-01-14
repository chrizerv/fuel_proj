const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT.middleware');

const UsersController = require('../controllers/users.controller');

router.post('/auth/token', UsersController.loginAndGetUserToken);

router.get('/info', authenticateJWT, UsersController.getUserInfo);

module.exports = router;