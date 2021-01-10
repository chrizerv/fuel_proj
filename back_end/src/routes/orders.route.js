const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT.middleware');
const authorizeOwner = require('../middlewares/authorizeOwner.middleware');
const OrdersController = require('../controllers/orders.controller');

router.get('/:gasStationID', OrdersController.getStationOrders);
router.post('/', OrdersController.addNewOrder);
router.delete('/:orderID', authenticateJWT, authorizeOwner, OrdersController.deleteOrder);


module.exports = router;