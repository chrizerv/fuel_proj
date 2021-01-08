const express = require('express');
const router = express.Router();

const StationsController = require('../controllers/stations.controller');


router.get('/:fuelTypeID', StationsController.getStationsAndPricesBySelectedFuel);

module.exports = router;
