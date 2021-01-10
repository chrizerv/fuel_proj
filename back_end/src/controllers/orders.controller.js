const Orders = require('../models/orders.model');
const OrdersModel = require('../models/orders.model');


exports.addNewOrder = (req, res) => {

  const orderData = req.body;

  OrdersModel.createNew(orderData.productID, orderData.username, orderData.quantity, (err, rows) => {

    if (err) {
      console.log('WRONG');
      res.send(err);
    }
    else
      res.status(200).send(rows);
  });

}

exports.getStationOrders = (req, res) => {

  OrdersModel.getByStationWhichBelongsToUsername(req.params.gasStationID, (err, rows) => {

    if (err) {
      console.log('WRONG');
      res.send(err);
    }
    else
      res.status(200).send(rows);
  });

}

exports.deleteOrder = (req, res) => {

  OrdersModel.deleteById(req.params.orderID, (err, rows) => {

    if (err) {
      console.log('WRONG');
      res.send(err);
    }
    else
      res.status(200).send(rows)
  });
}
