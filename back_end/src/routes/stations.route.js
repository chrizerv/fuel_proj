const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT.middleware');

const StationsController = require('../controllers/stations.controller');


router.get('/ownerstations', authenticateJWT, StationsController.getOwnerStations);

router.get('/listandprices/:fuelTypeID', StationsController.getStationsAndPricesBySelectedFuel);

router.get('/numandstats/:fuelTypeID', StationsController.getNumberOfStationsAndFuelStats);



module.exports = router;
