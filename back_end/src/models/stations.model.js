var dbConnection = require('../../config/db.config');

var Stations = {};

Stations.getByFuelTypeIDwithPrices = (fuelTypeID, result) => {

 dbConnection.query('SELECT \
  pricedata.gasStationID,gasStationLat ,gasStationLong,fuelNormalName,fuelPrice \
  FROM gasstations,pricedata \
  WHERE gasstations.gasStationID=pricedata.gasStationID \
  AND pricedata.fuelTypeID=?', fuelTypeID, (err, res) => {

  if (err) {
   console.log("Error");
   result(null, err);
  }
  result(null, res);

 });
}

module.exports = Stations;