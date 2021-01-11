const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT.middleware');
const authorizeOwner = require('../middlewares/authorizeOwner.middleware');
const isYourOrder = require('../middlewares/isYourOrder.middleware');
const OrdersController = require('../controllers/orders.controller');

router.get('/', authenticateJWT, OrdersController.getUserOrders);
router.post('/', authenticateJWT, OrdersController.addNewOrder);
router.delete('/:orderID', authenticateJWT, authorizeOwner, isYourOrder, OrdersController.deleteOrder);


module.exports = router;