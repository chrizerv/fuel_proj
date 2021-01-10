const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders.controller');

router.get('/:gasStationID', OrdersController.getStationOrders);
router.post('/', OrdersController.addNewOrder);
router.delete('/:orderID', OrdersController.deleteOrder);


module.exports = router;