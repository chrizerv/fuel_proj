const OrdersModel = require('../models/orders.model');


function isYourOrder(req, res, next) {

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

  OrdersModel.getByIdThatBelongsToOwner(urlParams.orderID, req.user, (err, rows) => {

    if (err) {
      console.log('getByIdThatBelongsToOwner Error!');
      res.status(500).send({ message: "Internal Error" });

    } else {

      if ((rows.length === 1) && (rows[0].orderID === urlParams.orderID))
        next();
      else
        res.status(401).send({ message: "Unauthorized" });
    }



  });
}

module.exports = isYourOrder;