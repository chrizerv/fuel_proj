var dbConnection = require('../../config/db.config');

var Stations = {};

Stations.getByFuelTypeIDwithPrices = (fuelTypeID, result) => {

  dbConnection.query('\
  SELECT gasstations.gasStationID,gasstations.fuelCompNormalName,gasstations.gasStationOwner,\
  gasstations.gasStationAddress, gasstations.phone1,  gasStationLat ,gasStationLong,MIN(fuelPrice) as minFuelPrice \
  FROM gasstations,pricedata \
  WHERE gasstations.gasStationID=pricedata.gasStationID \
  AND pricedata.fuelTypeID=? GROUP BY gasstations.gasStationID', fuelTypeID, (err, res) => {

    if (err) {
      console.log("Error");
      result(null, err);
    } else
      result(null, res);

  });
}


Stations.getNumberWithFuelTypeStats = (fuelTypeID, result) => {

  dbConnection.query(' \
  SELECT count(gasStationID) as numOfStations,min(minFuelPrice) as minPrice,max(minFuelPrice) as maxPrice, CAST(AVG(minFuelPrice) AS DECIMAL(5,3)) as avgPrice \
  FROM  ( SELECT gasstations.gasStationID, MIN(fuelPrice) as minFuelPrice \
         FROM gasstations, pricedata \
         WHERE gasstations.gasStationID = pricedata.gasStationID \
         AND pricedata.fuelTypeID=?  GROUP BY gasstations.gasStationID) as stationsAndPrices \
  ;', fuelTypeID, (err, res) => {

    if (err) {
      result(null, err);
    } else
      result(null, res);

  });

}

module.exports = Stations;