const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT.middleware');
const authorizeOwner = require('../middlewares/authorizeOwner.middleware');

const StationsController = require('../controllers/stations.controller');


router.get('/ownerstations', authenticateJWT, authorizeOwner, StationsController.getOwnerStations);

router.get('/listandprices/:fuelTypeID', StationsController.getStationsAndPricesBySelectedFuel);

router.get('/numandstats/:fuelTypeID', StationsController.getNumberOfStationsAndFuelStats);



module.exports = router;
