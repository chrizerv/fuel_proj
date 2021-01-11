const PriceDataModel = require('../models/pricedata.model');


function isYourProduct(req, res, next) {

 PriceDataModel.getByIdThatBelongsToOwner(req.params.productID, req.user, (err, rows) => {


  if ((rows.length > 0) && (rows[0].productID === parseInt(req.params.productID, 10))) {
   next();
  } else
   res.sendStatus(403);

 });
}

module.exports = isYourProduct;