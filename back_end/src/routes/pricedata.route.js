const express = require('express');
const router = express.Router();

const PriceDataController = require('../controllers/pricedata.controller');


router.get('/:gasStationID', PriceDataController.getStationPriceList);
router.put('/:productID', PriceDataController.changeFuelPrice);

module.exports = router;
