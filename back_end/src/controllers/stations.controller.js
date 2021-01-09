
const StationsModel = require('../models/stations.model');




exports.getStationsAndPricesBySelectedFuel = (req, res) => {

  StationsModel.getByFuelTypeIDwithPrices(req.params.fuelTypeID, (err, rows) => {
    if (err) {
      console.log('WRONG');
      res.send(err);
    }
    else
      res.status(200).send(rows);
  });

}

exports.getNumberOfStationsAndFuelStats = (req, res) => {

  StationsModel.getNumberWithFuelTypeStats(req.params.fuelTypeID, (err, rows) => {
    if (err) {
      console.log('WRONG');
      res.send(err);
    }
    else
      res.status(200).send(rows);
  });

}