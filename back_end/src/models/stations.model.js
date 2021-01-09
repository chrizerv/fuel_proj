var dbConnection = require('../../config/db.config');

var Stations = {};

Stations.getByFuelTypeIDwithPrices = (fuelTypeID, result) => {

  dbConnection.query('SELECT \
  gasstations.gasStationID,gasStationLat ,gasStationLong,MIN(fuelPrice) as minFuelPrice \
  FROM gasstations,pricedata \
  WHERE gasstations.gasStationID=pricedata.gasStationID \
  AND pricedata.fuelTypeID=? GROUP BY gasstations.gasStationID,gasStationLat ,gasStationLong;', fuelTypeID, (err, res) => {

    if (err) {
      console.log("Error");
      result(null, err);
    } else
      result(null, res);

  });
}


Stations.getNumberWithFuelTypeStats = (fuelTypeID, result) => {


}

module.exports = Stations;