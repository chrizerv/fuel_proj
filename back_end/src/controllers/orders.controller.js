const OrdersModel = require('../models/orders.model');
const UsersModel = require('../models/users.model');

exports.addNewOrder = (req, res) => {

  const orderData = {
    productID: parseInt(req.body.productID, 10),
    quantity: parseInt(req.body.quantity, 10)
  };
  const authenticatedUser = req.user;

  if (!(orderData.hasOwnProperty('productID') &&
    orderData.hasOwnProperty('quantity') &&
    Number.isInteger(orderData.productID) &&
    Number.isInteger(orderData.quantity) &&
    orderData.productID > 0 &&
    orderData.quantity > 0)
  ) {
    res.status(400).send({ message: "Bad body parameters" });
    return;
  }

  OrdersModel.createNew(orderData.productID, authenticatedUser, orderData.quantity, (err, rows) => {

    if (err) {
      console.log('CreateOrder Error!');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(201).send({ message: "Order Created" });
  });

}

exports.getUserOrders = (req, res) => {

  const authenticatedUser = req.user;

  UsersModel.getRole(authenticatedUser, (err, rows) => {

    if (err) {
      console.log('Get orders Error');
      res.status(500).send({ message: "Internal Error" });
    }
    else {

      if (rows[0].role === 'stationOwner') {
        OrdersModel.getAllFromStationOwner(authenticatedUser, (err, rows) => {

          if (err) {
            console.log('getAllFromStationOwner error');
            res.status(500).send({ message: "Internal Error" });
          }
          else
            res.status(200).send(rows);

        });
      }
      if (rows[0].role === 'fuelConsumer') {
        OrdersModel.getAllFromFuelConsumer(authenticatedUser, (err, rows) => {

          if (err) {
            console.log('getAllFromFuelConsumer error');
            res.status(500).send({ message: "Internal Error" });
          }
          else
            res.status(200).send(rows);

        });
      }



    }

  });

}

exports.deleteOrder = (req, res) => {

  const urlParams = {
    orderID: parseInt(req.params.orderID, 10)
  }

  if (!(urlParams.hasOwnProperty('orderID') &&
    Number.isInteger(urlParams.orderID) &&
    urlParams.orderID > 0)
  ) {
    res.status(400).send({ message: "Bad url parameters" });
    return;
  }

  OrdersModel.deleteById(urlParams.orderID, (err, rows) => {

    if (err) {
      console.log('deleteByid error');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(200).send({ message: "Order deleted" })
  });
}
