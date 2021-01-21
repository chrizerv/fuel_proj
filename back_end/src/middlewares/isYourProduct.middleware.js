const PriceDataModel = require('../models/pricedata.model');


function isYourProduct(req, res, next) {

  const urlParams = {
    productID: parseInt(req.params.productID, 10)
  }

  if (!(urlParams.hasOwnProperty('productID') &&
    Number.isInteger(urlParams.productID) &&
    urlParams.productID > 0)
  ) {
    res.status(400).send({ message: "Bad url parameters" });
    return;
  }

  PriceDataModel.getByIdThatBelongsToOwner(urlParams.productID, req.user, (err, rows) => {


    if ((rows.length === 1) && (rows[0].productID === parseInt(urlParams.productID, 10))) {
      next();
    } else
      res.status(401).send({ message: "Unauthorized" });

  });
}

module.exports = isYourProduct;