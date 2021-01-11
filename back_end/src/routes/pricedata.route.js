const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT.middleware');
const authorizeOwner = require('../middlewares/authorizeOwner.middleware');
const isYourProduct = require('../middlewares/isYourProduct.middleware');

const PriceDataController = require('../controllers/pricedata.controller');


router.get('/:gasStationID', PriceDataController.getStationPriceList);
router.put('/:productID', authenticateJWT, authorizeOwner, isYourProduct, PriceDataController.changeFuelPrice);

module.exports = router;
