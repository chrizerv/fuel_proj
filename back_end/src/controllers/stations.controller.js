
const StationsModel = require('../models/stations.model');




exports.getStationsAndPricesBySelectedFuel = (req, res) => {

  const urlParams = {
    fuelTypeID: parseInt(req.params.fuelTypeID, 10)
  }

  if (!(urlParams.hasOwnProperty('fuelTypeID') &&
    Number.isInteger(urlParams.fuelTypeID) &&
    urlParams.fuelTypeID > 0)
  ) {
    res.status(400).send({ message: "Bad url parameters" });
    return;
  }

  StationsModel.getByFuelTypeIDwithPrices(urlParams.fuelTypeID, (err, rows) => {
    if (err) {
      console.log('getByFuelTypeIDwithPrices error');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(200).send(rows);
  });

}

exports.getNumberOfStationsAndFuelStats = (req, res) => {

  const urlParams = {
    fuelTypeID: parseInt(req.params.fuelTypeID)
  }

  if (!(urlParams.hasOwnProperty('fuelTypeID') &&
    Number.isInteger(urlParams.fuelTypeID) &&
    urlParams.fuelTypeID > 0)
  ) {
    res.status(400).send({ message: "Bad url parameters" });
    return;
  }


  StationsModel.getNumberWithFuelTypeStats(urlParams.fuelTypeID, (err, rows) => {
    if (err) {
      console.log('getNumberWithFuelTypeStats error');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(200).send(rows);
  });

}

exports.getOwnerStations = (req, res) => {

  const authenticatedUser = req.user;

  StationsModel.getByUser(authenticatedUser, (err, rows) => {
    if (err) {
      console.log('getByUser error');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(200).send(rows);
  });


}