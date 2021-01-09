var dbConnection = require('../../config/db.config');

var PriceData = {};


PriceData.getByStationID = (gasStationID, result) => {

 dbConnection.query('\
 SELECT productID, fuelTypeID, fuelSubTypeID, fuelName, fuelPrice \
 FROM pricedata \
 WHERE gasStationID=?; \
', gasStationID, (err, res) => {

  if (err) {
   console.log("Error");
   result(null, err);
  } else
   result(null, res);

 });

}

module.exports = PriceData;