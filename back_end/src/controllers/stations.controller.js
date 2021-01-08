const { reset } = require('nodemon');
const StationsModel = require('../models/stations.model');




exports.getStationsAndPricesBySelectedFuel = (req, res) => {

 StationsModel.getByFuelTypeIDwithPrices(req.params.fuelTypeID, (err, stations) => {
  if (err)
   res.send(err);
  res.send(stations);
 });

}