const OrdersModel = require('../models/orders.model');


function isYourOrder(req, res, next) {

  OrdersModel.getByIdThatBelongsToOwner(req.params.orderID, req.user, (err, rows) => {


    if ((rows.length > 0) && (rows[0].orderID === parseInt(req.params.orderID, 10))) {
      next();
    } else
      res.sendStatus(403);

  });
}

module.exports = isYourOrder;