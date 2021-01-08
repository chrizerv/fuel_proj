const express = require('express');
const router = express.Router();

const StationsController = require('../controllers/stations.controller');


router.get('/listandprices/:fuelTypeID', StationsController.getStationsAndPricesBySelectedFuel);

//router.get('/numberofandstats/:fuelTypeID', StationsController.getStationsAndPricesBySelectedFuel);

module.exports = router;
