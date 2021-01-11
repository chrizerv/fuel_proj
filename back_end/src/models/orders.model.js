var dbConnection = require('../../config/db.config');

var Orders = {};


Orders.createNew = (productID, username, quantity, result) => {

  dbConnection.query('\
 INSERT INTO orders (productID, username, quantity) \
 VALUES(?, ?, ?); \
 ', [productID, username, quantity], (err, res) => {

    if (err) {
      console.log("Error");
      result(null, err);
    } else
      result(null, res);

  });


}

Orders.getByIdThatBelongsToOwner = (orderID, username, result) => {

  dbConnection.query('\
  SELECT orderID \
  FROM gasstations, pricedata, orders\
  WHERE gasstations.username=? AND \
  gasstations.gasStationID = pricedata.gasStationID AND \
  pricedata.productID = orders.productID AND \
  orders.orderID=?; \
 ', [username, orderID], (err, res) => {

    if (err) {
      console.log("Error");
      result(null, err);
    } else
      result(null, res);

  });

}


Orders.deleteById = (orderID, result) => {

  dbConnection.query('\
  DELETE FROM orders \
  WHERE orderID=?; \
 ', orderID, (err, res) => {

    if (err) {
      console.log("Error");
      result(null, err);
    } else
      result(null, res);

  });

}


Orders.getAllFromStationOwner = (username, result) => {

  dbConnection.query('\
  SELECT orders.orderID, orders.username, orders.quantity, \
  pricedata.productID, pricedata.fuelName, gasstations.gasStationID, gasstations.fuelCompNormalName \
  FROM gasstations, pricedata, orders\
  WHERE gasstations.username=? AND \
  gasstations.gasStationID = pricedata.gasStationID AND \
  pricedata.productID = orders.productID; \
 ', [username], (err, res) => {

    if (err) {
      console.log("Error");
      result(null, err);
    } else
      result(null, res);

  });

}

Orders.getAllFromFuelConsumer = (username, result) => {

  dbConnection.query('\
  SELECT orders.orderID, orders.quantity, \
  pricedata.productID, pricedata.fuelName, gasstations.gasStationID, gasstations.fuelCompNormalName \
  FROM orders,pricedata,gasstations \
  WHERE orders.username=? AND \
  pricedata.productID = orders.productID AND \
  gasstations.gasStationID = pricedata.gasStationID; \
 ', [username], (err, res) => {

    if (err) {
      console.log("Error");
      result(null, err);
    } else
      result(null, res);

  });

}



module.exports = Orders;