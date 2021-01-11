const Orders = require('../models/orders.model');
const OrdersModel = require('../models/orders.model');
const UsersModel = require('../models/users.model');

exports.addNewOrder = (req, res) => {

  const orderData = req.body;
  const authenticatedUser = req.user;

  OrdersModel.createNew(orderData.productID, authenticatedUser, orderData.quantity, (err, rows) => {

    if (err) {
      console.log('WRONG');
      res.send(err);
    }
    else
      res.status(200).send(rows);
  });

}

exports.getUserOrders = (req, res) => {

  const authenticatedUser = req.user;

  UsersModel.getRole(authenticatedUser, (err, rows) => {

    if (err) {
      console.log('WRONG');
      res.send(err);
    }
    else {

      if (rows[0].role === 'stationOwner') {
        OrdersModel.getAllFromStationOwner(authenticatedUser, (err, rows) => {

          if (err) {
            console.log('WRONG');
            res.send(err);
          }
          else
            res.status(200).send(rows)

        });
      }
      if (rows[0].role === 'fuelConsumer') {
        OrdersModel.getAllFromFuelConsumer(authenticatedUser, (err, rows) => {

          if (err) {
            console.log('WRONG');
            res.send(err);
          }
          else
            res.status(200).send(rows)

        });
      }



    }

  })

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
