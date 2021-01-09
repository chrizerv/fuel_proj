const express = require('express');
const router = express.Router();

const PriceDataController = require('../controllers/pricedata.controller');

router.get('/:gasStationID', PriceDataController.getStationPriceList);

module.exports = router;
